---
title: "PDEBench-Lang: representation and reasoning"
date: 2026-09-29
---

## The question
Does a language model recognize the same physical equation when its representation changes? PDEBench-Lang compares Postfix, LaTeX, Prefix, and natural-language forms of partial differential equations.

## My contribution
I was responsible for **cross-dialect evaluation and benchmarking** in the Token Efforts team, as documented in the project repository. My work helped separate performance on a familiar representation from transfer to an unfamiliar one.

## How the study is structured
The team generates symbolic equations and converts them into multiple representations. Sequence-to-sequence modeling then connects an input representation to a family label and structured reasoning or operator predictions.

The evaluation asks two separate questions: is the predicted family correct, and is the reasoning structurally consistent with the equation? A correct label alone can hide a brittle representation shortcut.

## What this demonstrates
The project connects machine-learning evaluation with scientific structure. It emphasizes controlled comparisons, explicit team contributions, and diagnosis of transfer behavior. The public repository contains the team's methods and report context; this page does not recast hypotheses or external-paper results as my own measured gains.
