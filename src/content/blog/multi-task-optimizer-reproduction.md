---
title: "Designing a fair multi-task optimizer comparison"
date: 2026-09-29
tags:
  - research notes
---

My new Multi-Task Optimizer work starts with a reproducibility question: what has to stay fixed before a performance difference can reasonably be attributed to the optimization method?

## Start with the reference protocol
The current plan separates running an official baseline from evaluating methods in a shared implementation. That prevents a changed data pipeline or training schedule from silently becoming part of the claimed optimizer improvement.

The planned multi-task benchmarks are NYUv2, Cityscapes, CelebA, and QM9. Each has its own data, models, and metrics. Results should stay attached to the protocol that produced them.

## Check update semantics
Optimizer state matters. Probing a task update must not accidentally mutate state that changes the next task's comparison. Diagnostic checks and a small training smoke run belong before a large benchmark campaign.

## Extend carefully to unlearning
Language-model unlearning adds a different tradeoff: forgetting designated content while retaining useful capabilities. Forgetting, retention, privacy, and cost need separate evaluation. A single score can obscure an important failure.

This is an experiment-design and reproduction stage. The September plan did not execute model training, downloads, or cluster jobs, and I do not claim benchmark gains from it. The collaborator repository is private; the public case study explains my role and current scope.

[Multi-Task Optimizer case study](/portfolio/multi-task-optimizer/)
