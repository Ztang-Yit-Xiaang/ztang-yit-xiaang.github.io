---
title: "PyGRANSO Torch OSQP Dense Reference Adapter"
collection: portfolio
permalink: /portfolio/osqp-method-in-torch
date: 2026-05-24
mathjax: true
---

This active Summer 2026 research assistant project studies a **Torch OSQP dense reference adapter for PyGRANSO**, a PyTorch-enabled port of GRANSO for nonsmooth, nonconvex constrained optimization.

The work is based on the `feature/torch-osqp-dense-reference` branch of my PyGRANSO fork. The branch adds a correctness-first dense Torch reference route for PyGRANSO's internal quadprog-compatible OSQP subproblems. It is designed as a readable reference and validation path, not as a sparse large-scale Torch solver.

This work is supervised by **Ju Sun** and is framed as an implementation and research translation effort: taking ideas from numerical optimization and rebuilding them in a form that can support experiments with nonconvex objectives, tensor operations, and modern ML tooling.

The adapter exposes three backend choices through `opts.osqp_algebra`: `auto`, `builtin`, and `torch`. The Torch route is validated inside a dense KKT and memory envelope, including the `n + m <= 2400` KKT limit described in the branch documentation. Unsupported or unsuccessful Torch solves should fall back visibly to builtin OSQP with diagnostics rather than silently changing behavior.

Main directions include:

- Building a dense Torch OSQP reference path for PyGRANSO QP subproblems
- Preserving builtin CPU OSQP as the reliable fallback route
- Testing KKT solves, backend agreement, randomized cases, and failure contracts
- Documenting backend policy for CPU, CUDA, MPS, and future accelerators
- Keeping CUDA unpromoted until representative workloads beat the builtin CPU route

The current evidence is intentionally conservative: CUDA fixed-seed correctness buckets pass, but representative end-to-end workloads remain slower than builtin CPU OSQP, so CUDA is not claimed as promoted. PyGRANSO also does **not** differentiate through the OSQP QP solve; autograd computes objective and constraint gradients before QP construction.

**Links**

- <a href="https://github.com/Ztang-Yit-Xiaang/PyGRANSO/tree/feature/torch-osqp-dense-reference">PyGRANSO Torch OSQP dense-reference branch</a>
- <a href="https://github.com/sun-umn/PyGRANSO">Upstream PyGRANSO context</a>
- <a href="/research/">Research overview</a>
- <a href="/research/working-papers/">Working papers</a>
- <a href="/posts/2026/06/pygranso-torch-osqp-dense-reference-notes/">Related build note</a>
