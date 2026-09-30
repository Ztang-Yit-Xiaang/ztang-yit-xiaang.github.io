---
title: "Context-aware travel itinerary optimization"
date: 2026-09-29
---

## The problem
A travel plan is more than an ordered list of attractions. Weather changes, lodging choices, driving limits, and personal commitments all affect what remains feasible. Repairing a trip should preserve what the traveler cares about and explain what changed.

## What I built
The project combines Python planning components, optimization, route data, and interactive map dashboards. Its current architecture records parent plans, typed changes, owned constraints, and the evidence supporting route choices. A repair controller searches progressively broader changes, while an independent evaluator checks candidate plans.

The application work connects those pieces to conversational planning and inspectable route views. My focus is on making a suggested change traceable from user intent through constraints to the resulting itinerary.

## Why independent evaluation matters
A planner's own success flag is not enough. Route coverage, feasibility, utility units, preservation of commitments, and plan lineage need independent checks. Failed and incomplete attempts remain part of the evidence.

## Current result and limits
Planning, repair, evaluation, and dashboard components are implemented. The full research comparison remains incomplete: the current manifest records unresolved lodging semantics and exact-search limits. I do not present the available demo as proof of a completed benchmark or publication-ready system.

Recent local work extends beyond the public repository snapshot. The map exports below are **archived demonstrations**, not live booking tools or current travel recommendations.

- [Open the archived route dashboard](/images/weather_dashboard/customer.html)
- [Open the lightweight map](/images/lightweight_share_map.html)
- [Inspect the public repository](https://github.com/Ztang-Yit-Xiaang/weather-aware-travel-itinerary-optimization)

![Archived travel-planner dashboard with route choices and a map](/images/weather_dashboard_preview.png)
