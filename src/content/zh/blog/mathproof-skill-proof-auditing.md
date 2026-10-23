---
title: "MathProof Skill：接受證明之前，先審查推理"
description: "一套可重用的數學論證審查流程，明確列出假設、進行反向質疑，並限定 Lean 檢查所支持的範圍。"
date: 2026-10-22
tags:
  - tools
  - mathematical reasoning
---

我開發 MathProof Skill，想處理一個問題：當 AI 產生的證明看起來很有說服力時，每一步究竟憑甚麼成立？

## 停在第一個缺乏依據的步驟

流程先記錄命題與假設，再質疑論證、梳理各步驟之間的依賴。如果某一步無法成立，審查便停在它之前；後續的代數整理，不能補足缺失的前提。

例如，$f'(x)>0$ 說明函數遞增，並不代表 $f(x)>0$。取定義在 $(-2,-1)$ 上的 $f(x)=x$，便是一個簡單反例。

## 區分任務，也說清楚檢查範圍

這個 Skill 支援建構證明、審查既有論證、解釋推理依賴，以及核對外部結果。非形式化審查仍可能出錯。Lean 4／Mathlib 檢查只有在實際通過，而且形式化陳述對應原命題時，才提供相應的證據；若只涵蓋較弱的命題，就必須明確說明範圍。

程式庫包含完整範例、評估案例，以及拒絕證明佔位符與不受允許公理的檢查器。這些檢查並不保證未來每一份論證都正確。

## 試用與查看原始碼

可以先挑一個簡短命題或既有證明，以審查模式開始，再檢視第一個受到質疑的步驟及其假設。

[MathProof Skill 原始碼](https://github.com/Ztang-Yit-Xiaang/mathproof-skill)・[完整範例](https://github.com/Ztang-Yit-Xiaang/mathproof-skill/tree/main/examples)・[我的其他 Skills 與工具](https://github.com/Ztang-Yit-Xiaang?tab=repositories)
