export type Vec3 = [number, number, number];
export type FrozenMagnetModel = { weights: Record<string, number[] | number[][]>; initial: number[]; checkpointBlob: string };
export type PoseState = { parameters: number[]; dipoles: Vec3[]; directions: Vec3[]; sensors: Vec3[]; fields: Vec3[]; residual: number };
export type PoseFrame = { frame: number; trace: PoseState[]; final: PoseState; solver: { success: boolean; status: number; nfev: number; message: string } };
export type PoseReplay = { capture: string; frames: PoseFrame[]; sourceMethod: string };
const sigmoid = (value: number) => 1 / (1 + Math.exp(-value));

// Active MLPWithAttention.forward: the defined attention module is not called by the source.
export function magneticForward(model: FrozenMagnetModel, parameters: number[], mt: number) {
  const w = (name: string) => model.weights[name + ".weight"] as number[][];
  const dense = (name: string, input: number[]) => w(name).map((row, i) => sigmoid(row.reduce((sum, weight, j) => sum + weight * input[j], (model.weights[name + ".bias"] as number[])[i])));
  const input = [[mt / 120], parameters.slice(1, 4).map(value => (value - 5) / 45), parameters.slice(4, 7).map(value => value / 30), [(parameters[0] - .5) / 1.5]];
  const names = ["fc_mt", "fc_E", "fc_L", "fc_cs"];
  const branches = input.map((values, i) => dense(names[i], values));
  const embedding = branches.flat(), hidden = dense("fc", embedding), prediction = dense("fc_out", hidden)[0];
  const hiddenDerivative = hidden.map((value, i) => prediction * (1 - prediction) * w("fc_out")[0][i] * value * (1 - value));
  const embeddingDerivative = embedding.map((value, j) => value * (1 - value) * hiddenDerivative.reduce((sum, derivative, i) => sum + derivative * w("fc")[i][j], 0));
  const derivatives = names.map((name, group) => input[group].map((_, j) => branches[group].reduce((sum, _value, i) => sum + embeddingDerivative[group * 20 + i] * w(name)[i][j], 0)));
  const gradient = [derivatives[3][0] / 1.5, ...derivatives[1].map(value => value / 45), ...derivatives[2].map(value => value / 30)];
  return { prediction, gradient, branches, hidden };
}
export type InverseState = { parameters: number[]; first: number[]; second: number[]; step: number };
export function initialInverse(model: FrozenMagnetModel): InverseState { return { parameters: [...model.initial], first: Array(7).fill(0), second: Array(7).fill(0), step: 0 }; }
export function magneticAdam(model: FrozenMagnetModel, state: InverseState, target: number, mt: number): InverseState {
  const { prediction, gradient } = magneticForward(model, state.parameters, mt), sign = Math.sign(prediction - target), step = state.step + 1;
  const first = state.first.map((value, i) => .9 * value + .1 * gradient[i] * sign);
  const second = state.second.map((value, i) => .999 * value + .001 * gradient[i] ** 2 * sign ** 2);
  const parameters = state.parameters.map((value, i) => {
    const next = value - .01 * (first[i] / (1 - .9 ** step)) / (Math.sqrt(second[i] / (1 - .999 ** step)) + 1e-8);
    const lower = i === 0 ? .5 : i < 4 ? 5 : 0, upper = i === 0 ? 2 : i < 4 ? 50 : 30;
    return Math.max(lower, Math.min(upper, next));
  });
  return { parameters, first, second, step };
}

function solve(matrix: number[][], values: number[]) {
  const rows = matrix.map((row, i) => [...row, values[i]]), n = rows.length;
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let row = col + 1; row < n; row++) if (Math.abs(rows[row][col]) > Math.abs(rows[pivot][col])) pivot = row;
    [rows[col], rows[pivot]] = [rows[pivot], rows[col]];
    const divisor = rows[col][col];
    if (Math.abs(divisor) < 1e-14) throw new Error("Degenerate spline system");
    for (let j = col; j <= n; j++) rows[col][j] /= divisor;
    for (let row = 0; row < n; row++) if (row !== col) { const factor = rows[row][col]; for (let j = col; j <= n; j++) rows[row][j] -= factor * rows[col][j]; }
  }
  return rows.map(row => row[n]);
}
// Same uniform parameterization, degree 3, and not-a-knot boundary as make_interp_spline(t, xyz, k=3).
export function magneticSpline(points: Vec3[], samples = 200): Vec3[] {
  const n = points.length;
  if (n < 4) throw new Error("Cubic reconstruction needs at least four dipoles");
  const h = 1 / (n - 1), matrix = Array.from({ length: n }, () => Array(n).fill(0));
  matrix[0][0] = 1; matrix[0][1] = -2; matrix[0][2] = 1;
  matrix[n - 1][n - 3] = 1; matrix[n - 1][n - 2] = -2; matrix[n - 1][n - 1] = 1;
  for (let i = 1; i < n - 1; i++) { matrix[i][i - 1] = h; matrix[i][i] = 4 * h; matrix[i][i + 1] = h; }
  const second = [0, 1, 2].map(axis => solve(matrix, points.map((_, i) => i === 0 || i === n - 1 ? 0 : 6 * (points[i + 1][axis] - 2 * points[i][axis] + points[i - 1][axis]) / h)));
  return Array.from({ length: samples }, (_, j) => {
    const t = j / (samples - 1), i = Math.min(n - 2, Math.floor(t / h)), b = (t - i * h) / h, a = 1 - b;
    return [0, 1, 2].map(axis => a * points[i][axis] + b * points[i + 1][axis] + ((a ** 3 - a) * second[axis][i] + (b ** 3 - b) * second[axis][i + 1]) * h ** 2 / 6) as Vec3;
  });
}
export function dipoleField(sensor: Vec3, center: Vec3, direction: Vec3, strength: number): Vec3 {
  const delta = sensor.map((v, i) => v - center[i]), radius = Math.hypot(...delta);
  if (radius < 1e-6) return [0, 0, 0];
  const dot = delta.reduce((sum, value, i) => sum + value * direction[i], 0);
  return delta.map((value, i) => strength * (3 * dot * value / radius ** 5 - direction[i] / radius ** 3)) as Vec3;
}
export function reconstructedFields(state: PoseState, centers = state.dipoles): Vec3[] {
  return state.sensors.map(sensor => {
    const field = state.parameters.slice(7, 10) as Vec3;
    centers.forEach((center, i) => { const part = dipoleField(sensor, center, state.directions[i], state.parameters[6] / centers.length); part.forEach((value, axis) => { field[axis] += value; }); });
    return field;
  });
}
export function projectMagnetic(point: Vec3, angle: number): [number, number] {
  const cosine = Math.cos(angle), sine = Math.sin(angle);
  return [260 + (point[0] * cosine - point[1] * sine) * 650, 190 - (point[2] + (point[0] * sine + point[1] * cosine) * .35) * 650];
}
export function sourceRoundedParameters(parameters: number[]) {
  const scalar = (value: number, options: number[]) => options.find(option => Math.abs(value - option) / option <= .05) ?? value;
  const triple = (values: number[], options: number[][]) => options.find(option => option.every((value, i) => Math.abs(values[i] - value) / value <= .05)) ?? values;
  return [scalar(parameters[0], [.8, .97, 1.33]), ...triple(parameters.slice(1, 4), [[10, 15, 20], [8, 12, 16], [7.5, 10, 14]]), ...triple(parameters.slice(4, 7), [[10, 10, 10], [20, 5, 5], [5, 5, 20]])];
}
