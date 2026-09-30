---
title: "Attention & transfer in facial expression recognition"
date: 2026-09-29
---

## The question
Recognition accuracy describes what a model predicts. Attention and visual explanations help investigate which parts of an image support that prediction. This team course project studies both questions using FER2013.

## Project scope
The shared codebase supports facial-expression data loading and model experiments. The broader study compares training from scratch with transferred representations and examines how architecture and pretraining affect visual evidence.

Our research questions include whether a model concentrates on facial regions, how much attention goes to background, and whether explanations remain useful across expression classes. Attention-guided objectives are an experimental direction; this page does not treat proposed improvements as established accuracy or robustness gains.

## Engineering lessons
A fair comparison needs consistent splits and preprocessing, a documented training setup, and metrics that distinguish recognition performance from explanation quality. Expected accuracy ranges are not substitutes for completed experimental results.

This was a **collaborative CSCI 5527 course project**. The linked repository credits the shared work; I do not claim sole ownership of the model or dataset pipeline.
