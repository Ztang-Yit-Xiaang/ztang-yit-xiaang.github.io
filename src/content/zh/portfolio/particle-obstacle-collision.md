---
title: "粒子與障礙物碰撞"
date: 2026-10-29
---

## 從課程實作到互動實驗
原始 Processing／Java 課程實作處理重力下的粒子與圓形障礙物接觸。作品集將這個概念帶入瀏覽器：新增或刪除障礙物、拖曳圓形、調整粒子數，以及向後拉再放開以發射粒子。也支援方向鍵與原始加減鍵操作。

## 瀏覽器實際計算的內容
互動 Canvas 採固定時間步長、重疊投影、沿碰撞法線反射速度，以及阻尼。它根據原始粒子與障礙物程式改寫，並非嵌入 Processing 或逐影格重現。暫停、重設與單步控制方便檢視運動。重力與彈性控制會改變瀏覽器的實際動力學。

## 原始碼與限制
改寫時對照了原始作業目錄的 `Particle.java` 與 `Obstacle.java`。確定性的瀏覽器模型與碰撞檢查支持這個展示，但不代表重現所有原始場景、精確能量守恆或一般模擬準確度。

[GitHub ↗](https://github.com/Ztang-Yit-Xiaang/Particle-Obstacle-Collision-Animation-SimulationProjects)
