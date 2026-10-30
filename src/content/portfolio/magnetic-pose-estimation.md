---
title: "Magnetic sensing & pose reconstruction"
collection: portfolio
permalink: /portfolio/magnetic-pose-estimation
date: 2025-06-28
---

This project develops algorithms for estimating the **pose and deformation of flexible permanent magnets** using magnetic sensor arrays.

Instead of modeling a magnet as a single dipole, the system represents the magnet as **multiple distributed dipoles**, allowing reconstruction of bending and deformation.

The current public project context comes from my CUHK SURP 2025 work on tactile intelligence and magnetically induced metamorphic materials. It combines inverse neural modeling with magnetic field sensing: one branch studies reverse neural-network models for material/property inference, while the sensing branch reconstructs soft magnetic structures from array measurements.

Key components include:

- Distributed dipole magnetic modeling
- Nonlinear least-squares optimization
- Sensor array calibration
- Real-time magnetic field data processing
- Reverse neural modeling for MIMMS-related parameter inference
- Experimental support for AnySkin and soft magnetic sensing workflows

The algorithms are implemented in **Python** and designed for dense magnetic sensor arrays, including the 17×5 visualization pipeline and the 75-sensor ring-shaped array used in poster work.

Applications include:

- Soft robotics
- Tactile sensing systems
- Intelligent materials
- Shape reconstruction of flexible magnetic structures

## Sensor acquisition and visualization

The sensor workflow streams array measurements through Python and PyQt, supports calibration and geomagnetic background compensation, and provides spatial views for inspecting field patterns before inverse reconstruction. The 17×5 grid and the 75-sensor annular setup refer to distinct configurations described in the project materials, not a single combined array.

## GitHub Repository

<i class="fab fa-github"></i> [View on GitHub](https://github.com/Ztang-Yit-Xiaang/NeuroMagIK-Reverse-Neural-Modeling-3D-Magnetic-Pose-Reconstruction)


## Two implementation paths

The pose implementation estimates a distributed chain of magnetic dipoles using bounded nonlinear least squares (`trf`), then uses `make_interp_spline(..., k=3)` to form a smooth centerline through the dipole centers. The interactive view replays accepted states from the original local program on captured frames 200 and 201. Dragging a dipole recomputes the cubic centerline; it does not rerun the full pose optimizer.

The inverse material model uses the original trained checkpoint. Its active forward pass uses four sigmoid embedding branches for magnetic field, E, L, and cross-section, followed by concatenation and a sigmoid MLP. Although the class defines an attention module, that module is bypassed in the active `forward`. Reverse optimization freezes these weights and updates cs, E, and L with Adam, L1 error, and the source parameter bounds, keeping magnetic field fixed. Browser predictions, input gradients, early Adam updates, dipole fields, and cubic interpolation are checked against the original PyTorch/SciPy calculations; this does not establish new physical accuracy.
