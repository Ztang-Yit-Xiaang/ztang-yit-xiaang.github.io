---
title: "What I Look for in Attention Maps for Facial Expression Recognition"
date: 2026-04-09
permalink: /blog/what-i-look-for-in-attention-maps/
tags:
  - experiment note
  - computer vision
  - facial expression recognition
  - interpretability
---

In facial expression recognition, it is easy to stop at accuracy and say a model works. I have become more interested in a second question: **what visual evidence is the model actually using** when it predicts an emotion?

That is where attention maps and Grad-CAM-style methods become useful. A good explanation is not just a colorful heatmap. What I want to know is whether the model focuses on facial regions that make semantic sense for the task, such as the mouth, eyebrows, or eyes, instead of latching onto background artifacts or lighting patterns.

This is one reason I like comparing models with different training histories. A CNN trained from scratch, an ImageNet-initialized model, and a Vision Transformer may all reach reasonable performance, but they can distribute attention very differently. Transfer learning can help a model focus faster, but it can also carry in biases from pretraining that are not ideal for expression understanding.

That motivated the attention-analysis part of the project. Rather than relying only on visual inspection, I want a quantitative way to say how much mass is assigned to facial landmarks versus irrelevant regions. Once that is measurable, interpretability becomes something we can compare, stress test, and potentially improve during training.

For me, the broader goal is simple: an FER model should not only be correct, it should also be correct for the right visual reasons.
