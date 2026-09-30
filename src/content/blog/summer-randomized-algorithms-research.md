---
title: "Summer Research Notes: Randomized Algorithms and Scalable Linear Algebra"
date: 2026-05-24
permalink: /blog/summer-randomized-algorithms-research/
tags:
  - research note
  - randomized algorithms
  - numerical linear algebra
  - sketching
---

This summer, I am continuing my randomized algorithms work as a **research assistant with Swati Padmanabhan**. The direction grows naturally out of my independent study on sketching and sampling methods, but the framing is becoming more research-focused: when can we replace a large linear-algebra problem with a smaller randomized surrogate while still preserving the structure that matters?

The questions I am most interested in are not only implementation questions. CountSketch, leverage score sampling, subspace embeddings, and Hutch++ all have practical value, but their usefulness depends on the guarantees behind them. A sketch is useful only if the downstream task still behaves correctly after compression.

That makes the project a nice bridge between theory and computation. On one side, I want to understand probability bounds, norm preservation, regression error, and trace-estimation guarantees. On the other side, I want to build experiments that make the accuracy-efficiency tradeoff visible on real or realistic data.

The broader theme is scalability. Many modern machine-learning and scientific-computing problems are too large for exact matrix computations to be comfortable. Randomized numerical linear algebra offers a way to ask what information is essential, what can be compressed, and how much uncertainty we are willing to trade for speed.

