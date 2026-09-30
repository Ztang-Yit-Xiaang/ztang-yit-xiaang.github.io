---
title: "When passing tests is not the same as solver readiness"
date: 2026-09-29
tags:
  - research notes
---

A numerical solver can pass a test suite while still failing a separate numerical-quality requirement. That distinction has become central to my Torch-OSQP work with PyGRANSO.

## Three questions I keep separate
**Implementation fidelity:** do the translated update steps and failure paths match the intended source behavior?

**Numerical quality:** do the returned solutions satisfy the independently checked tolerances on the cases that matter?

**Release readiness:** is the implementation suitable for its advertised users, workloads, and platforms?

These questions need different evidence. A source comparison can explain an update rule. A fixed-seed campaign can test a bounded set of cases. Neither automatically establishes general release readiness.

## What the current work supports
The local audit closes a defined dense translation scope. It also retains an unresolved explicit-polishing float64 numerical-acceptance gate. The useful outcome is a clearer account of what works, what was tested, and what remains unresolved.

Dense LU and sparse QDLDL can represent the same KKT equations without following identical floating-point trajectories. Comparing them requires care about scaling, ordering, stopping decisions, and output contracts.

## The engineering lesson
I want a solver to return an answer with an inspectable path to it. That includes visible failure behavior and numerical limitations. The QP solve here is not a differentiable layer; PyGRANSO computes objective and constraint gradients before constructing it.

[Project case study](/portfolio/osqp-method-in-torch/) · [Public reference branch](https://github.com/Ztang-Yit-Xiaang/PyGRANSO/tree/feature/torch-osqp-dense-reference)
