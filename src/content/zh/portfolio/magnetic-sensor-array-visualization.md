---
title: "磁感測器陣列視覺化"
collection: portfolio
permalink: /portfolio/magnetic-sensor-visualization
date: 2025-08-15
---

這項專案建立用於磁性位姿估計與觸覺感測實驗的**即時磁感測器陣列視覺化系統**。

系統透過序列介面，處理 **85 個磁感測器組成的陣列（17×5）**串流資料。

主要功能包括：

- 即時磁場視覺化
- 感測器陣列校準
- 地磁背景補償
- 使用 Python 與 PyQt GUI 進行資料擷取
- 支援柔性線狀磁體與 MIMMS 位姿估計實驗的除錯

這套視覺化系統協助研究人員分析磁場分布、檢視背景補償，並在連接逆向建模流程前，先對位姿估計演算法進行除錯。

## GitHub 原始碼庫
<i class="fab fa-github"></i> [在 GitHub 檢視](https://github.com/Ztang-Yit-Xiaang/NeuroMagIK-Reverse-Neural-Modeling-3D-Magnetic-Pose-Reconstruction)
