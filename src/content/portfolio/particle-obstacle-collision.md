---
title: "Particle–obstacle collisions"
date: 2026-10-29
---

## From coursework to a tactile experiment
The original Processing/Java coursework implements particles under gravity and resolves contact against circular obstacles. The portfolio brings that idea into the browser: add or erase obstacles, drag a circle, change the particle count, and launch particles by pulling back and releasing. Arrow keys and the original plus/minus shortcuts are supported.

## What the browser computes
The interactive canvas uses fixed time steps, overlap projection, reflected velocity along the collision normal, and damping. It adapts the original particle and obstacle code; it is not an embedded Processing runtime or a frame-for-frame reproduction. Pause, reset, and single-step controls let the motion be inspected. The gravity and bounce controls change the actual browser dynamics.

## Source and limits
The adaptation was checked against `Particle.java` and `Obstacle.java` in the original homework tree. A deterministic browser model and focused collision checks support this demonstration. They do not establish fidelity to every original scene, physically exact energy conservation, or general simulation accuracy.

[GitHub ↗](https://github.com/Ztang-Yit-Xiaang/Particle-Obstacle-Collision-Animation-SimulationProjects)
