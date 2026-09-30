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

The leverage-score track includes benchmark artifacts for **YearPrediction**, **HIGGS**, and **SUSY**. The useful comparisons are not only final error numbers. I also want to see runtime scaling, fixed-budget behavior, ranked leverage distributions, and where approximate methods start to become practically attractive.

This connects naturally to CountSketch and subspace embeddings. A sketch is only useful if the downstream task still behaves correctly after compression. That means the experiment needs to show both speed and structural preservation.

Hutch++ remains part of the same story from the trace-estimation side. It asks a related question in a matrix-vector query model: how much matrix information can we recover without forming the full matrix?

The newer implementation thread is **TurboQuant**. I am treating it as an active implementation and reading project, not as a finished paper claim. The goal is to understand where quantization-style ideas fit into the broader scalable linear algebra picture, and what evidence would be needed before making stronger claims.

For the website, I want the randomized algorithms page to show all three layers: leverage-score benchmarks, the classic sketching/Hutch++ foundations, and the newer TurboQuant implementation experiments.
