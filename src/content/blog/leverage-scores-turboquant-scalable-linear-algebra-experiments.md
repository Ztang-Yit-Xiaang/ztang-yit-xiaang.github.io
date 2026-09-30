---
title: "Leverage Scores, TurboQuant, and Scalable Linear Algebra Experiments"
date: 2026-06-26
permalink: /blog/leverage-scores-turboquant-scalable-linear-algebra-experiments/
tags:
  - research note
  - randomized algorithms
  - leverage scores
  - TurboQuant
---

My randomized algorithms work is becoming more experimental this summer. The theory thread is still the backbone: sketching, sampling, subspace embeddings, and trace estimation. But the current local work also asks how those ideas behave in benchmark settings where runtime and approximation quality are both visible.

The leverage-score track includes a local notebook with generalized leverage scores, sample-and-rescale operations, SVD-based sampling, repeated halving, and refinement sampling. I want the experiments to make runtime scaling, fixed-budget behavior, and approximation quality visible. This note does not establish completed dataset-level benchmark results.

This connects naturally to CountSketch and subspace embeddings. A sketch is only useful if the downstream task still behaves correctly after compression. That means the experiment needs to show both speed and structural preservation.

Hutch++ remains part of the same story from the trace-estimation side. It asks a related question in a matrix-vector query model: how much matrix information can we recover without forming the full matrix?

**TurboQuant** is a related reading direction. The September file review found reference materials, but did not establish a completed implementation or measured TurboQuant results. The goal is to understand the ideas and determine what experiments would support a useful comparison.

The current work therefore has three distinct parts: a local leverage-score implementation, a separate adaptive Hutch++ experimental project, and TurboQuant reading.

*Status clarified September 29, 2026, following a review of the current project files.*

[Leverage-score case study](/portfolio/randomized-sketching/) · [Adaptive Hutch++ case study](/portfolio/matrix-vector-trace-estimation/)
