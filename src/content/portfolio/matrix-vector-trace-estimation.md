---
title: "Adaptive Hutch++ trace estimation"
date: 2026-09-29
---

## The problem
For a matrix too large to form explicitly, even a basic statistic such as its trace can be expensive. Matrix–vector access gives a different interface: ask for products and estimate the statistic under a fixed query budget.

## My implementation
The project started with Hutchinson, Hutch++, Gaussian-Hutch++, and a non-adaptive variant. It now includes **adaptive allocation**, soft adaptation, model-averaged allocation, and a sequential-pilot variant.

A pilot sketch estimates useful spectral structure. The method then allocates the remaining work between a low-rank trace contribution and stochastic residual probes. Explicit query counting makes the total cost visible, including the pilot itself.

1. Probe the matrix through a matrix–vector oracle.
2. Use a pilot to choose a low-rank allocation.
3. Estimate the remaining trace with residual probes.
4. Compare error and variability at the same total query budget.

## What can be inspected
The repository contains estimator source, diagnostic tests, proof notes, and archived CSV results for synthetic spectra and real-data experiments. These include adaptive, sequential-pilot, and held-out benchmark tables. This portfolio review checked those artifacts; it did not rerun the full experiment campaign.

A graph example uses repeated sparse products to estimate the trace of an adjacency-matrix cube. For a **simple, undirected, loop-free graph**, the triangle count is one-sixth of that trace. The original directed Wiki-Vote data must be converted to the stated graph convention before applying the identity.

## What I learned
Adaptation is a budget decision, not a guarantee of improvement. A pilot consumes queries, estimated spectral structure can be misleading, and gains depend on the matrix and budget. The comparisons retain baseline methods and report error distributions rather than claiming a universal speedup.

[Read the query-budget note](/blog/adaptive-hutchpp-query-budget/) · [Source and experiment artifacts](https://github.com/Ztang-Yit-Xiaang/Matrix-vector_queries_estimation)
