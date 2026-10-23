---
title: "槓桿分數、TurboQuant 與可擴展線性代數實驗"
date: 2026-06-26
permalink: /blog/leverage-scores-turboquant-scalable-linear-algebra-experiments/
tags:
  - research note
  - randomized algorithms
  - leverage scores
  - TurboQuant
---

這個夏天，我的隨機化演算法工作開始更重視實驗。理論主線仍是骨幹：草圖、取樣、子空間嵌入與跡估計。目前本機工作也在追問：當執行時間與近似品質都能清楚呈現時，這些想法在基準測試中的表現如何？

槓桿分數方向包含一份本機筆記本，涵蓋廣義槓桿分數、取樣與重新縮放、以 SVD 為基礎的取樣、重複減半及精煉取樣。我希望實驗能呈現執行時間的擴展性、固定預算下的行為與近似品質。本筆記並不代表已完成資料集層級的基準結果。

這自然連接到 CountSketch 與子空間嵌入。只有當下游任務在壓縮後仍能正確運作，草圖才有用。因此實驗需要同時呈現速度與結構保持能力。

Hutch++ 則從跡估計角度加入同一條主線：在矩陣－向量查詢模型中，不建立完整矩陣，我們能恢復多少資訊？

**TurboQuant** 是相關文獻閱讀方向。九月檔案檢視找到參考資料，但未確認已完成實作或量測過的 TurboQuant 結果。目標是理解其想法，並判斷哪些實驗能支持有意義的比較。

因此，目前工作有三個不同部分：本機槓桿分數實作、獨立的自適應 Hutch++ 實驗專案，以及 TurboQuant 文獻閱讀。

*狀態於 2026 年 9 月 29 日，依據當時專案檔案檢視結果釐清。*

[槓桿分數專案詳情](/portfolio/randomized-sketching/)・[自適應 Hutch++ 專案詳情](/portfolio/matrix-vector-trace-estimation/)
