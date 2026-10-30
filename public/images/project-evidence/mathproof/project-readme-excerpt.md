## Ten-second example

**Proposed reasoning**

$
f'(x)>0 \quad\Longrightarrow\quad f(x)>0.
$

**Audit: `INVALID`**

The premise establishes that $f$ is increasing, not that its values are positive. Let $f(x)=x$ on $(-2,-1)$. Then $f'(x)=1>0$, while $f(x)<0$ throughout the domain.

## Examples

Each example below is an evaluation case. The Lean code is the file in `lean/MathProofSkill/Evals/`, and the output is from a real run of `skill/scripts/lean_check.py` (paths shortened).

### 1. Refuting a plausible claim: `INVALID` · `LEAN-CHECKED`

> *Claim.* Every continuous function on $(0,1)$ attains a maximum.

**First unsupported step:** applying the extreme value theorem, which needs a compact domain; $(0,1)$ is bounded but not closed. **Counterexample:** $f(x)=x$ has no maximum on $(0,1)$.

```lean
def Claim : Prop :=
  ∀ f : ℝ → ℝ, ContinuousOn f (Ioo 0 1) → ∃ x ∈ Ioo (0 : ℝ) 1, IsMaxOn f (Ioo 0 1) x

theorem claim_false : ¬ Claim := by
  intro h
  obtain ⟨x, ⟨hx0, hx1⟩, hmax⟩ := h id continuousOn_id
  have hy : (x + 1) / 2 ∈ Ioo (0 : ℝ) 1 := ⟨by linarith, by linarith⟩
  have : (x + 1) / 2 ≤ x := hmax hy
  linarith
```

```text
PASS: lean/MathProofSkill/Evals/Analysis001.lean
  MathProofSkill.Evals.Analysis001.Claim : Prop
    := ∀ (f : ℝ → ℝ), ContinuousOn f (Set.Ioo 0 1) → ∃ x ∈ Set.Ioo 0 1, IsMaxOn f (Set.Ioo 0 1) x
  MathProofSkill.Evals.Analysis001.claim_false : ¬MathProofSkill.Evals.Analysis001.Claim
    axioms: propext, Classical.choice, Quot.sound
```

The checker prints the full body of `Claim`, so the reader can confirm that the refuted statement is the informal one and not a weaker look-alike.
