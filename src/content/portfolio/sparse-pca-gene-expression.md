---
title: "Sparse PCA for Gene Expression Analysis"
collection: portfolio
permalink: /portfolio/sparse-pca-gene-expression
date: 2026-03-23
---

This project compares **Principal Component Analysis (PCA)** and **Sparse PCA** for high-dimensional breast cancer gene expression data.

The central question is interpretability. Standard PCA can reduce dimensionality, but each component usually mixes information from nearly all genes. Sparse PCA adds an L1-style sparsity pressure so that the components depend on a smaller subset of genes, making the result easier to inspect.

The local analysis uses a breast cancer gene expression dataset with approximately **592 samples** and **17,814 gene features** after preprocessing.

Main components include:

- preprocessing and standardization of high-dimensional gene expression data
- PCA projection and Sparse PCA projection
- reconstruction-error comparison
- sparsity and gene-usage analysis
- visualization of PCA and Sparse PCA sample projections

The result is a compact statistical modeling project: PCA gives slightly lower reconstruction error, while Sparse PCA keeps similar reconstruction behavior with far fewer active genes. That tradeoff makes Sparse PCA more useful when the goal is not only compression, but also biological interpretability and candidate-gene inspection.

Applications include:

- bioinformatics
- genomics
- high-dimensional data analysis
- interpretable dimensionality reduction
