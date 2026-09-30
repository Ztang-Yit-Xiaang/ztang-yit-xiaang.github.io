---
title: "Torch-OSQP for PyGRANSO"
date: 2026-09-29
---

## The problem
PyGRANSO solves constrained, nonsmooth optimization problems. Its inner quadratic programs are a useful place to study how a mature numerical algorithm translates into tensor-based software. A translation must preserve the solver's behavior as well as its equations.

## What I built and studied
Working with **Ju Sun**, I developed and audited a dense PyTorch reference route for OSQP subproblems. The work covers ADMM update steps, dense KKT systems, factorization reuse, scaling, residuals, stopping rules, adaptive penalty updates, and the interface to PyGRANSO.

I compared behavior against the original C implementation and separated mathematical equivalence from differences caused by sparse ordering and factorization. The retained implementation uses dense tensors and LU; it does not claim identical sparse QDLDL trajectories.

## Why the engineering matters
Small decisions about residual scaling, failure handling, and polishing can change whether a solver accepts a result. The project makes those contracts explicit and tests boundary cases alongside ordinary solves. The engineering contribution is a readable implementation with evidence that can be inspected.

## Current result and limits
The local completion audit closes a defined translation scope, while **explicit-polishing float64 numerical acceptance and broader release readiness remain open**. Passing fixture tests does not establish universal numerical agreement or an accelerator speedup. Recent local audits also extend beyond the older public branch snapshot.

PyGRANSO uses autograd for objective and constraint gradients before forming the QP. **The OSQP solve itself is not an automatically differentiable layer.**

[Read the validation note](/blog/solver-validation-and-release-readiness/) · [Public reference branch](https://github.com/Ztang-Yit-Xiaang/PyGRANSO/tree/feature/torch-osqp-dense-reference)
