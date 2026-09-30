---
title: "How adaptive Hutch++ spends a query budget"
date: 2026-09-29
tags:
  - research notes
---

Trace estimation offers a compact example of resource-aware algorithm design. If a large matrix is accessible only through matrix–vector products, every query is part of the cost.

## Two uses for the budget
Hutch++ combines a low-rank approximation with a stochastic estimate of the residual trace. More effort on the low-rank part may reduce residual variance, but it leaves fewer probes to estimate that residual.

My adaptive implementations use a pilot to estimate useful structure and then choose how to divide the remaining budget. The source also includes soft, model-averaged, and sequential-pilot variants.

## Count the pilot too
A comparison is misleading if one estimator gets a useful pilot for free. The matrix–vector oracle counts queries, and the adaptive paths check that the work stays consistent with the requested budget. Diagnostic outputs make allocation and fallback decisions inspectable.

## Why adaptation may lose
A pilot can be expensive relative to a small budget. A spectral estimate can be noisy. A matrix may not have enough exploitable low-rank structure. The archived result tables include these tradeoffs; they do not justify a claim that adaptation always improves accuracy.

I compare error and variability at equal budgets, retaining simple baselines. For graph applications, the graph convention matters too: the usual trace-of-the-cube triangle identity assumes a simple undirected graph.

[Case study](/portfolio/matrix-vector-trace-estimation/) · [Implementation and archived results](https://github.com/Ztang-Yit-Xiaang/Matrix-vector_queries_estimation)
