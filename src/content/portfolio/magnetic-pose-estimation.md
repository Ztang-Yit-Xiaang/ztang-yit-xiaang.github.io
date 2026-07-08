---
title: "Magnetic Pose Estimation Using Distributed Dipole Models"
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

## GitHub Repository

<i class="fab fa-github"></i> [View on GitHub](https://github.com/Ztang-Yit-Xiaang/CUHK-SURP-2025)
