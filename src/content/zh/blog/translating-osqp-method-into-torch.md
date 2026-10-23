---
title: "將 OSQP 類最佳化流程轉寫為 Torch 的初期筆記"
date: 2026-05-24
permalink: /blog/translating-osqp-method-into-torch/
tags:
  - research note
  - optimization
  - torch
  - nonconvex optimization
---

這個夏天，我也以 **Ju Sun 指導的研究助理**身分，將 OSQP 類型的最佳化流程轉寫為 **Torch／PyTorch**。目前公開版本的定位更具體：具有明確後端策略與回退行為的 PyGRANSO Torch OSQP 稠密參考介接器。

我覺得這是一種有意思的轉寫。它不只是把程式從一種語言搬到另一種語言，而是將數值最佳化程序轉化為現代機器學習系統的計算形式：張量運算、稠密線性代數、數值契約，以及能貼近模型程式進行的實驗。

這項工作尤其與非凸最佳化研究有關，因為許多機器學習問題已使用 PyTorch，而成熟最佳化方法往往來自另一套軟體生態。Torch 實作能讓演算法構想測試、更新規則比較，以及求解器流程在非凸實驗中的行為研究更容易進行。

現階段，我將其視為實作與研究轉寫工作，而非已完成通用求解器的主張。直接價值在於讓方法能以可讀的 Torch 程式呈現、理解哪些部分適合映射為張量運算，並辨認數值最佳化與機器學習軟體設計之間的張力。

本機研究資料夾目前包含 Torch 原生 OSQP 提案與 OSQP 參考筆記，而公開 PyGRANSO 分支提供了更合適的實作依據。我保留這篇較早文章，作為初始動機的快照；更新後的實作筆記見 [PyGRANSO Torch OSQP 稠密參考實作筆記](/blog/pygranso-torch-osqp-dense-reference-notes/)。

## 2026 年 9 月更新
QP 求解本身不參與微分。關於實作一致性、數值品質與發布準備的區別，請參閱[目前的驗證筆記](/blog/solver-validation-and-release-readiness/)。
