// Browser adaptation of the user's 2024 CSCI 2081 Processing/Java collision sketch.
// Source: Particle-Obstacle-Collision-Animation-SimulationProjects, HW2/HomeworkSketch/HomeworkSketch/Particle.java
// f0d260b2d0c0701e74a21cc19c348ba22e5c2291: gravity 9.8, floor damping .8, obstacle damping .75.
// Browser additions: side walls, deterministic respawning, editable obstacles, and adjustable gravity/bounce.
// The adjustable bounce applies to both floor and circle collisions; the original floor used .8.
export type Particle = { x: number; y: number; vx: number; vy: number; radius: number };
export type Obstacle = { x: number; y: number; radius: number };
export const SCENE_WIDTH = 1.8;
export const FIXED_STEP = .01;
export const GROUND_Y = .98;

export function seedParticles(count = 28): Particle[] {
  return Array.from({ length: count }, (_, index) => ({
    x: .08 + ((index * .61803398875) % 1) * 1.64,
    y: .04 + (index % 7) * .065,
    vx: ((index % 5) - 2) * .09,
    vy: -(index % 4) * .12,
    radius: .011 + (index % 3) * .003,
  }));
}

export function collide(particle: Particle, obstacle: Obstacle, bounce = .75) {
  const dx = particle.x - obstacle.x;
  const dy = particle.y - obstacle.y;
  const distance = Math.hypot(dx, dy);
  const radius = particle.radius + obstacle.radius;
  if (distance > radius) return;
  const nx = distance > 1e-10 ? dx / distance : 0;
  const ny = distance > 1e-10 ? dy / distance : -1;
  particle.x = obstacle.x + nx * radius;
  particle.y = obstacle.y + ny * radius;
  const normalSpeed = particle.vx * nx + particle.vy * ny;
  if (normalSpeed < 0) {
    particle.vx = (particle.vx - 2 * normalSpeed * nx) * bounce;
    particle.vy = (particle.vy - 2 * normalSpeed * ny) * bounce;
  } else if (Math.hypot(particle.vx, particle.vy) < .2) {
    particle.vx = nx * .5;
    particle.vy = ny * .5;
  }
}

export function stepParticles(particles: Particle[], obstacles: Obstacle[], tilt: number, gravity = 9.8, bounce = .75) {
  for (const particle of particles) {
    particle.vx += Math.max(-1, Math.min(1, tilt)) * 2.4 * FIXED_STEP;
    particle.vy += gravity * FIXED_STEP;
    particle.x += particle.vx * FIXED_STEP;
    particle.y += particle.vy * FIXED_STEP;
    for (const obstacle of obstacles) collide(particle, obstacle, bounce);
    if (particle.x < particle.radius || particle.x > SCENE_WIDTH - particle.radius) {
      particle.x = Math.max(particle.radius, Math.min(SCENE_WIDTH - particle.radius, particle.x));
      particle.vx *= -.8;
    }
    if (particle.y > GROUND_Y - particle.radius) {
      particle.y = GROUND_Y - particle.radius;
      particle.vy = -Math.abs(particle.vy) * bounce;
      if (Math.abs(particle.vy) < .28) {
        particle.y = .03;
        particle.vy = 0;
      }
    }
  }
}
