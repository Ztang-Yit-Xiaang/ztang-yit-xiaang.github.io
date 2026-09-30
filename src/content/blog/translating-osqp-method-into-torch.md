---
title: "Early Notes on Translating OSQP-Style Optimization into Torch"
date: 2026-05-24
permalink: /blog/translating-osqp-method-into-torch/
tags:
  - research note
  - optimization
  - torch
  - nonconvex optimization
---

This summer, I am also working as a **research assistant with Ju Sun** on translating OSQP-style optimization machinery into **Torch/PyTorch**. The current public version of this thread is more specific: a PyGRANSO Torch OSQP dense reference adapter with explicit backend policy and fallback behavior.

I think this is an interesting kind of translation. It is not just translating code from one language to another. It is translating a numerical optimization routine into the computational style of modern ML systems: tensor operations, dense linear algebra, numerical contracts, and experiments that can live close to model code.

The project is especially relevant for nonconvex optimization research because many ML problems are already written in PyTorch, while many mature optimization methods come from a different software ecosystem. A Torch implementation can make it easier to test algorithmic ideas, compare update rules, and study how solver-like routines behave inside nonconvex experimental pipelines.

At this stage, I am treating the work as an implementation and research translation effort rather than a claim of a finished general-purpose solver. The immediate value is in making the method readable in Torch, understanding which pieces map naturally onto tensor code, and identifying where numerical optimization and ML software design push against each other.

The local research folder now includes a Torch-native OSQP proposal and OSQP reference notes, and the public PyGRANSO branch now provides the better source of truth. I keep this older post as a snapshot of the initial motivation; the updated build note is [PyGRANSO Torch OSQP Dense Reference Notes](/blog/pygranso-torch-osqp-dense-reference-notes/).

## September 2026 update
The QP solve itself is not differentiated through. See the [current validation note](/blog/solver-validation-and-release-readiness/) for the distinction between implementation fidelity, numerical quality, and release readiness.
