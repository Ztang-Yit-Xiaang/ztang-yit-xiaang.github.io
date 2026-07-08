---
title: "PDEBench-Lang: Representation Effects in Neural Symbolic PDE Reasoning"
collection: portfolio
permalink: /portfolio/pdebench-lang-neural-symbolic-reasoning
date: 2026-04-18
---

This project studies whether the **representation format of a partial differential equation** changes how well a language model can reason about it. Instead of treating PDEs only as numerical objects, the project frames them as **structured symbolic language** and asks whether formats such as **Postfix, LaTeX, Prefix, and natural language** lead to different reasoning behavior.

The current benchmark, **PDEBench-Lang**, contains **12,000 synthetic PDE instances** spanning six canonical PDE families: **Heat, Wave, Burgers, Advection, Laplace, and Klein-Gordon**. For each generated equation instance, the system converts the same PDE into four symbolic dialects and trains sequence-to-sequence models to predict:

- a structured reasoning chain
- the PDE family label
- a pruned symbolic operator subset for downstream solving

The core research question is whether representation choice affects **symbolic pruning quality**, **family classification accuracy**, and **reasoning fidelity**. To evaluate this, the project introduces a metric called **Trash Score**, which measures how often a model gives the correct family label while relying on structurally incorrect reasoning.

An example PDE such as

$$
u_t = 0.5\,u_{xx}
$$

is represented in four different forms:

- Postfix: `u t d 0.5 u x x d d * =`
- Raw LaTeX: `u_{t}=0.5\,u_{xx}`
- Prefix: `= d(u,t) * (0.5, d(d(u,x),x))`
- Natural language: "The time derivative of u equals one-half the second spatial derivative of u."

The modeling pipeline fine-tunes encoder-decoder language models to map a PDE representation into structured outputs that describe the underlying dynamics. The later report adds a controlled cross-dialect evaluation: BART models reach perfect in-dialect family classification but cross-dialect generalization drops sharply, while curriculum pre-training improves overall cross-dialect family accuracy from 21% to 30.1%. Contrary to the original expectation, Postfix becomes the strongest transfer dialect in the reported experiments.

My contribution to this team project focused on **cross-dialect evaluation and benchmarking**, helping compare representation formats and analyze how closely model reasoning aligned with the true symbolic structure of the equation.

Main components include:

- synthetic dataset generation across multiple PDE families
- conversion of each PDE into four symbolic dialects
- sequence-to-sequence fine-tuning for reasoning and operator prediction
- BART/T5 comparison under controlled symbolic-dialect settings
- curriculum pre-training across all four dialects before dialect-specific fine-tuning
- benchmarking of pruning quality, label accuracy, and reasoning fidelity
- analysis of representation alignment between symbolic format and LLM pretraining

**GitHub repository:**  
https://github.com/RaghavKrishn/Nlp-group-final-project
