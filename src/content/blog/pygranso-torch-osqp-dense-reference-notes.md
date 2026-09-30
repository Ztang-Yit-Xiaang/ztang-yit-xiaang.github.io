---
title: "PyGRANSO Torch OSQP Dense Reference Notes"
date: 2026-06-26
permalink: /blog/pygranso-torch-osqp-dense-reference-notes/
tags:
  - research note
  - PyGRANSO
  - OSQP
  - optimization
---

This note records the current shape of my PyGRANSO Torch OSQP work. The project is not just an OSQP rewrite in Torch; it is a **dense reference adapter** for PyGRANSO's internal quadprog-compatible QP subproblems.

The branch I am using as the public reference is [`feature/torch-osqp-dense-reference`](https://github.com/Ztang-Yit-Xiaang/PyGRANSO/tree/feature/torch-osqp-dense-reference). PyGRANSO itself is a PyTorch-enabled port of GRANSO for nonsmooth, nonconvex constrained optimization. The adapter work sits inside that system, so the interesting question is not only whether a QP solve can run through Torch, but how backend policy, fallback behavior, and validation evidence should be exposed.

The branch supports three OSQP algebra modes:

- `auto`: follows the configured Torch device when the route is supported, otherwise falls back visibly.
- `builtin`: forces the builtin CPU OSQP path.
- `torch`: explicitly requests the dense Torch reference route.

The Torch route is intentionally conservative. It is a correctness-first dense implementation with a replaceable linear-solver boundary, not a sparse large-scale solver. The documented KKT and memory envelope includes the `n + m <= 2400` limit, and unsupported or unsuccessful Torch solves should keep diagnostics rather than silently pretending a different backend was used.

The CUDA story is also deliberately cautious. Current evidence says fixed-seed correctness buckets pass, but representative end-to-end workloads are still slower than builtin CPU OSQP. So CUDA remains unpromoted. That is a useful result: a research system should say when an accelerator is not yet a win.

One boundary I want to keep clear is differentiation. PyGRANSO uses autograd to compute objective and constraint gradients before the QP is constructed, but it does **not** differentiate through the OSQP QP solve itself.

For the portfolio version, I want this project to read as optimization software research: backend contracts, fallback behavior, numerical envelopes, and evidence gates.
