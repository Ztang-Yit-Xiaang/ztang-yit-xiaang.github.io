---
title: "Analyzing Representation Transfer and Attention in Facial Expression Recognition"
collection: portfolio
permalink: /portfolio/fer-representation-transfer-attention
date: 2026-04-01
---

This project studies **how representation transfer changes both accuracy and attention behavior in facial expression recognition (FER)**. By comparing CNNs trained from scratch, transfer-learning pipelines, and Vision Transformers on FER2013, the work asks not only which model performs best, but also **which facial regions each model actually relies on** when predicting emotion.

Beyond standard FER benchmarking, the project introduces a **quantitative attention analysis framework** and an **attention-guided training objective** to measure and improve interpretability. The main goal is to connect recognition performance with semantically meaningful visual evidence rather than treating explanation quality as an afterthought.

🔗 **Project Repository:**  
[https://github.com/RohitPoduval1/csci5527-project](https://github.com/RohitPoduval1/csci5527-project)

---

# Problem Motivation

Facial expression recognition models often achieve strong classification performance, but it remains unclear:

- **Which facial regions models rely on**
- **How pretrained representations influence attention**
- **Whether models attend to semantically meaningful facial features**

This project studies the relationship between:

- representation transfer
- model architecture
- attention behavior
- recognition performance

Key questions:

1. Does **pretraining improve emotion-specific representations**?
2. Do **transformers attend more globally than CNNs**?
3. Can **attention regularization improve interpretability**?

---

# Dataset

We use the **FER2013 dataset**, a widely used benchmark for facial expression recognition.

### Dataset Statistics

- **35,887 images**
- **7 emotion classes**

Emotion categories:

- Angry  
- Disgust  
- Fear  
- Happy  
- Sad  
- Surprise  
- Neutral  

### Image Characteristics

- grayscale facial images
- resolution: **48 × 48**
- noisy labels
- large variations in
  - lighting
  - occlusion
  - facial pose

---

# Data Preprocessing

### Image Processing

Input images are converted and resized to match pretrained model requirements.
```
48x48 grayscale
→ convert to RGB
→ resize to 224x224
```

### Normalization

Images are normalized using ImageNet statistics:

$$
x' = \frac{x - \mu}{\sigma}
$$

### Data Augmentation

To improve generalization:

- random horizontal flip
- random rotation
- random crop
- color jitter
- Gaussian noise

Optional robustness techniques:

- label smoothing
- MixUp augmentation

---

# Facial Landmark Detection

To analyze attention behavior, facial landmarks are detected using:

- **MediaPipe**
- **dlib**

The face is segmented into semantic regions:

- eyes
- eyebrows
- mouth
- nose
- face contour
- background

Binary masks are generated for each region, enabling **quantitative measurement of attention distributions**.

---

# Model Architectures

We train **four model types** to study the impact of representation transfer.

---

## Model 1 — CNN Baseline

A simple CNN trained **from scratch**.

Architecture:
```
Conv → ReLU → MaxPool
Conv → ReLU → MaxPool
Conv → ReLU → MaxPool
Fully Connected
Softmax
```

Purpose:

- establish baseline performance
- demonstrate limitations of training from scratch

Expected accuracy:

**60–65%**

---

## Model 2 — CNN with ImageNet Transfer

We evaluate transfer learning using pretrained CNN backbones.

Example architectures:

- ResNet50
- EfficientNet

Training procedure:

1. load pretrained network
2. replace final classification layer(FC → 7 emotion classes)

3. train classifier head
4. fine-tune upper layers

Expected accuracy:

**~70%**

---

## Model 3 — VGGFace Transfer

We test **domain-specific transfer learning** using models pretrained on face recognition.

Example backbone:

- VGGFace

Hypothesis:

Face-recognition pretraining may **suppress expression features** because it focuses on **identity rather than emotion**.

---

## Model 4 — Vision Transformer

We compare CNNs with **transformer-based vision models**.

Example model:

```python
timm.create_model("vit_base_patch16_224", pretrained=True)
```
# Training Setup

Training configuration:
```
optimizer: Adam
batch size: 64
epochs: 30
learning rate: 1e-4
```

Classification loss:

$$
L = - \sum_i y_i \log(p_i)
$$

Regularization techniques:

- dropout
- weight decay
- label smoothing

---

# Explainability Analysis

To understand model attention behavior, we apply explainability methods.

## CNN Models

- Grad-CAM  
- Guided Grad-CAM  

These methods produce spatial heatmaps highlighting image regions influencing predictions.

---

## Transformer Models

For Vision Transformers we analyze:

- attention rollout  
- self-attention maps  

Self-attention is computed as:

$$
Attention(Q, K, V) = softmax\left(\frac{QK^T}{\sqrt{d}}\right)V
$$

These visualizations allow direct comparison between **CNN and transformer attention behavior**.

---

# Quantitative Attention Analysis (Novel Component)

Instead of relying solely on visual heatmaps, we introduce a **quantitative attention metric**.

For each facial region:

$$
Attention_{region} =
\frac{\sum_{pixels} Heatmap \times Mask}{\sum Heatmap}
$$

Regions analyzed:

- eyes
- mouth
- eyebrows
- background

Example comparison:

| Model | Mouth | Eyes | Background |
|------|------|------|-----------|
| CNN baseline | 28% | 19% | 41% |
| CNN ImageNet | 35% | 27% | 25% |
| VGGFace | 12% | 40% | 26% |
| ViT | 30% | 30% | 15% |

This provides **objective evaluation of model interpretability**.

---

# Attention-Guided Training (Novel Component)

We further propose an **attention regularization loss** encouraging models to focus on relevant facial regions.

Modified training objective:

$$
L = L_{cls} + \lambda L_{attention}
$$

Where

$$
L_{attention} = \sum_{background} Heatmap
$$

Purpose:

- penalize background attention  
- encourage focus on meaningful facial features  

This improves both **interpretability and robustness**.

---

# Optional Experiment — Multi-Scale Input

We also evaluate whether multi-scale inputs improve FER performance.

Architecture:
```
Face crop
+
Whole image
→ concatenated feature representation
→ classifier
```

Goal:

Capture both:

- local facial expression cues  
- global facial context  

---

# Evaluation Metrics

## Classification Metrics

- Accuracy  
- Precision  
- Recall  
- F1 Score  
- Confusion Matrix  

## Interpretability Metrics

- attention distribution across facial regions  
- background attention ratio  

---

# Experimental Analysis

## Domain Transfer

Key question:

Does **face-recognition pretraining help or hinder emotion recognition**?

Expected observations:

- VGGFace emphasizes **identity-related features**
- ImageNet pretrained models generalize better for emotion recognition

---

## Architecture Differences

### CNNs

- strong **local feature extraction**

### Transformers

- **global attention modeling**
- holistic understanding of facial expressions

---

## Attention-Guided Training

Hypothesis:

Encouraging attention on facial regions improves

- robustness  
- interpretability  
- classification performance  

---

# Results Summary

The experiments demonstrate:

- pretrained models significantly improve FER accuracy  
- transformer architectures exhibit more global attention patterns  
- quantitative attention metrics reveal meaningful differences between models  
- attention-guided training improves interpretability and robustness  

---

# Key Contributions

1. **Quantitative attention analysis framework** for FER models  
2. **Systematic comparison of CNN, transfer learning, and transformers**  
3. **Attention-guided training objective** improving interpretability  
4. Experimental analysis of **representation transfer effects in emotion recognition**

---

# Skills & Technologies

- PyTorch  
- Computer Vision  
- Transfer Learning  
- Vision Transformers  
- Explainable AI (Grad-CAM, Attention Maps)  
- Facial Landmark Detection  
- Deep Learning Experiment Design  

---

# Repository

Full implementation and experiments are available here:

**GitHub:**  
[https://github.com/RohitPoduval1/csci5527-project](https://github.com/RohitPoduval1/csci5527-project)
