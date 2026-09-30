---
title: "Leverage-score sampling & sketching"
date: 2026-09-29
---

## The problem
Large linear-algebra problems often contain more rows than an algorithm can afford to use directly. Randomized sampling aims to build a smaller problem that preserves the structure needed for a useful answer.

## My work with Swati Padmanabhan
My independent study and research work combine theoretical reading with Python implementations. The current leverage-score notebook includes generalized leverage scores, sample-and-rescale operations, SVD-based sampling, repeated halving, and refinement sampling, together with dataset-loading and experiment code.

The practical question is how approximation error changes with sampling budget and runtime. The theoretical work helps identify the assumptions behind those comparisons rather than treating a faster notebook as a general algorithmic guarantee.

## Related directions
CountSketch and subspace embeddings form part of the wider study. Hutch++ has grown into a separate implementation and experimental project. TurboQuant is a related reading direction; this review found reference materials but did not establish a completed public TurboQuant implementation.

## Available code
The leverage-score notebook is currently local. The GitHub link on this page points to the **related trace-estimation repository**, not to a published leverage-score or TurboQuant package.

[Adaptive Hutch++ case study](/portfolio/matrix-vector-trace-estimation/)
