---
title: "MathProof Skill"
date: 2026-10-29
---

## Inspect the implication before accepting the conclusion
A fluent proof can hide a single unsupported step. MathProof Skill asks the reviewer to state assumptions, number material dependencies, stop at the first failing implication, and test a minimal counterexample before proposing a repair.

## My contribution
I created and maintain the skill protocol, worked audits, evaluation cases, and Lean-checking workflow. The public project separates informal verdicts from machine-checked statements, including explicit partial or unverified labels. Formal checks also need a fidelity comparison: proving a different statement is not verification of the original claim.

## An example from the project
The implication “positive derivative implies positive values” fails for `f(x)=x`: at `x=-1`, the derivative is positive and the function value is negative. The embedded project website exposes the original worked examples. Browsing it does not invoke an agent or execute Lean. The repository contains the formal examples and checking instructions; this portfolio update did not rerun their full suite.

[GitHub ↗](https://github.com/Ztang-Yit-Xiaang/mathproof-skill)
