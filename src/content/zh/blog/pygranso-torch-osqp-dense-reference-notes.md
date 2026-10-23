---
title: "PyGRANSO Torch OSQP 稠密參考實作筆記"
date: 2026-06-26
permalink: /blog/pygranso-torch-osqp-dense-reference-notes/
tags:
  - research note
  - PyGRANSO
  - OSQP
  - optimization
---

本筆記記錄我目前 PyGRANSO Torch OSQP 工作的樣貌。這不只是用 Torch 重寫 OSQP，而是為 PyGRANSO 內部相容 quadprog 的 QP 子問題建立**稠密參考介接器**。

我使用的公開參考分支是 [`feature/torch-osqp-dense-reference`](https://github.com/Ztang-Yit-Xiaang/PyGRANSO/tree/feature/torch-osqp-dense-reference)。PyGRANSO 本身是以 PyTorch 為基礎、用於非光滑與非凸受限最佳化的 GRANSO 移植版本。介接器位於這個系統內，因此有趣的問題不只是 QP 能否在 Torch 中求解，也包括應如何呈現後端策略、回退行為與驗證證據。

該分支支援三種 OSQP 代數模式：

- `auto`：路徑支援時遵循設定的 Torch 裝置，否則明確回退。
- `builtin`：強制使用內建 CPU OSQP 路徑。
- `torch`：明確要求稠密 Torch 參考路徑。

Torch 路徑刻意採取保守設計：它是正確性優先、具有可替換線性求解器邊界的稠密實作，而非大規模稀疏求解器。已記錄的 KKT 與記憶體範圍包含 `n + m <= 2400` 限制。對不支援或未成功的 Torch 求解，應保留診斷，而非悄悄假裝使用了另一個後端。

對 CUDA 的說明也同樣謹慎。目前證據顯示固定隨機種子的正確性案例組通過，但具代表性的端到端工作負載仍慢於內建 CPU OSQP，因此 CUDA 尚未被提升為建議路徑。這也是有用的結果：研究系統應明確說明加速器何時尚未帶來優勢。

另一個需要釐清的界線是微分。PyGRANSO 會在建立 QP 前，以 autograd 計算目標函數與限制條件的梯度，但**不會對 OSQP 的 QP 求解本身進行微分**。

在作品集中，我希望這項專案呈現的是最佳化軟體研究：後端契約、回退行為、數值適用範圍與證據關卡。
