---
title: "Randomized Algorithms: Leverage Scores and TurboQuant"
collection: portfolio
permalink: /portfolio/randomized-sketching
date: 2025-12-29
---

This project implements and studies **randomized numerical linear algebra algorithms** for scalable machine learning and large-scale data analysis.

The work is connected to my Summer 2026 research assistant work with **Swati Padmanabhan**, where I am studying sketching, sampling, trace estimation, quantization-related algorithms, and the theory behind scalable matrix computation.

The goal is to reduce computational cost while preserving important matrix properties such as subspace structure, regression accuracy, trace information, and practical benchmark behavior.

Algorithms implemented include:

- Leverage score sampling
- CountSketch
- Subspace embeddings
- Hutch++ trace estimation
- TurboQuant implementation experiments
- Dataset-backed leverage-score benchmarking

Experiments evaluate the **accuracy–efficiency trade-offs** of randomized algorithms for:

- linear regression
- low-rank approximation
- matrix trace estimation
- runtime scaling on real benchmark datasets
- approximation quality under fixed sketching budgets

The implementations are written in **Python** notebooks and scripts. Current local experiments include leverage-score benchmarks with YearPrediction, HIGGS, and SUSY result artifacts, plus a TurboQuant implementation notebook for the active summer research thread.

## Current Experiments

The active experimental track is split into three pieces:

- **Leverage-score benchmarking:** YearPrediction, HIGGS, and SUSY artifacts compare runtime scaling, approximation error, and fixed-budget behavior.
- **Sketching baselines:** CountSketch, subspace embeddings, and Hutch++ remain the conceptual backbone for studying accuracy-efficiency tradeoffs.
- **TurboQuant implementation:** the TurboQuant notebook is an active implementation and reading track, not a finished paper claim.

**Related links**

- <a href="/portfolio/hutchpp-trace-estimation">Hutch++ trace estimation project</a>
- <a href="/research/working-papers/">Working papers</a>
- <a href="/posts/2026/06/leverage-scores-turboquant-scalable-linear-algebra-experiments/">TurboQuant and leverage-score research note</a>
