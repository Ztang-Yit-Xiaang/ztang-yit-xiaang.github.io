---
title: "Matrix-Vector Trace Estimation with Hutch++"
collection: portfolio
permalink: /portfolio/hutchpp-trace-estimation
date: 2026-03-01
mathjax: true
---

This project implements **randomized trace estimation algorithms** for large matrices using the **matrix–vector query model**.

It is part of my broader randomized algorithms thread, including Summer 2026 research assistant work with **Swati Padmanabhan** on sketching, leverage-score sampling, quantization-related methods, and scalable numerical linear algebra.

In many large-scale problems, a matrix is too large to compute or store explicitly, but **matrix–vector products can still be evaluated efficiently**. This project explores how to estimate the **trace of such matrices** using randomized algorithms.

The implementation focuses on **Hutch++**, a modern stochastic trace estimator that improves the classical Hutchinson method by combining **low-rank approximation and randomized probing**, reducing the required number of matrix–vector queries.

The project also demonstrates an application to **triangle counting in large graphs** using the Wiki-Vote network dataset. Using the identity

$$
\text{Number of triangles} = \frac{1}{6}\operatorname{tr}(B^3)
$$

the algorithms estimate triangle counts without explicitly computing $B^3$, relying only on efficient **sparse matrix–vector operations**.

Main features include:

- Implementation of **Hutch++ stochastic trace estimation**
- Implementation of **NA-Hutch++ (non-adaptive variant)**
- Implementation of **Gaussian-Hutch++**
- Construction of **matrix–vector oracle representations** for large matrices
- Application to **triangle counting in large-scale graph datasets**
- Performance experiments comparing different estimators
- Connection to the newer leverage-score and TurboQuant experimental track

This project demonstrates how **randomized numerical linear algebra** enables scalable analysis of large datasets where traditional matrix computations would be computationally expensive.

**GitHub repository:**  

<i class="fab fa-github"></i> [View on GitHub](https://github.com/Ztang-Yit-Xiaang/Matrix-vector_queries_estimation)

```mermaid
flowchart LR
    A[Graph Dataset<br>Wiki-Vote] --> B[Build Sparse<br>Adjacency Matrix B]
    B --> C[Define Linear Operator<br>A = B^3]
    C --> D[Matrix-Vector Oracle<br>(A @ v)]
    D --> E[Hutch++ Sampling<br>(S, G)]
    E --> F[Low-Rank Approximation<br>Q = orth(AS)]
    F --> G[Exact Trace Part<br>tr(Qᵀ A Q)]
    D --> H[Residual Estimation<br>with G]
    H --> I[Combine Estimates]
    I --> J[Trace Estimate<br>tr(B^3)]
    J --> K[Triangles<br>= tr(B^3)/6]
```
