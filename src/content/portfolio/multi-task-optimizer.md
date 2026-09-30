---
title: "Multi-Task Optimizer: controlled reproduction"
date: 2026-09-29
---

## The question
When several tasks share a model, their training signals can compete. Multi-task optimization studies how to balance those signals without mistaking changes in data, architecture, or training budget for an optimizer improvement.

## My current contribution
I reviewed an existing collaborator codebase and prepared a reproduction plan that separates **official baseline reproduction** from **controlled comparisons in the shared implementation**. This is a collaborative research direction; I do not claim sole authorship of the repository or its optimizer methods.

The planned benchmark set covers **NYUv2, Cityscapes, CelebA, and QM9**. Within each comparison, data splits, models, metrics, and non-method training settings must be fixed. Update semantics and optimizer state also need checking before a large training run is meaningful.

## Extension under study
The plan considers language-model unlearning: removing specified knowledge while retaining useful model capabilities. It calls for separate measures of forgetting, retention, privacy, and compute cost. This extension is planned work, not a demonstrated result.

## Current status
The source checkout includes trainers, configurations, aggregation methods, diagnostic checks, and cluster-launch scripts. My September reproduction plan records that training, model downloads, and cluster submissions were **not executed as part of that planning work**. No new benchmark gain is claimed here.

The linked GitHub repository belongs to a collaborator and is **private**. Visitors without access will see GitHub's unavailable-page response. A public summary is provided here so the project's purpose and my role remain clear.

[Read the experiment-design note](/blog/multi-task-optimizer-reproduction/)
