---
title: "MathProof Skill: audit the proof before accepting it"
description: "A reusable workflow for reviewing mathematical arguments, with explicit assumptions, adversarial audits, and scoped Lean checks."
date: 2026-10-22
tags:
  - tools
  - mathematical reasoning
---

I built MathProof Skill around a question: when an AI-generated proof looks convincing, what actually justifies each step?

## Stop at the first unsupported step

The workflow records the claim and assumptions, challenges the argument, and maps its dependencies. If a step fails, the audit stops immediately before it. Later algebra cannot justify a missing premise.

For example, $f'(x)>0$ establishes that a function is increasing; it does not establish $f(x)>0$. The function $f(x)=x$ on $(-2,-1)$ is a small counterexample.

## Different tasks, explicit checks

The skill supports constructing proofs, auditing supplied arguments, explaining dependencies, and checking external results. Informal review is fallible. A Lean 4 / Mathlib check adds evidence only when it runs successfully and the formal statement matches the intended claim. A weaker formalization needs an explicit scope qualification.

The repository contains worked examples, evaluation cases, and a checker that rejects proof placeholders and unsupported axioms. These checks do not guarantee that every future argument is correct.

## Try it and inspect the source

Start with a short claim or an existing proof in audit mode, then inspect the first challenged step and its assumptions.

[MathProof Skill repository](https://github.com/Ztang-Yit-Xiaang/mathproof-skill) · [Worked examples](https://github.com/Ztang-Yit-Xiaang/mathproof-skill/tree/main/examples) · [More of my skills and tools](https://github.com/Ztang-Yit-Xiaang?tab=repositories)
