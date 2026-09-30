---
title: "From Weather-Aware to Context-Aware Itinerary Repair"
date: 2026-06-26
permalink: /blog/from-weather-aware-to-context-aware-itinerary-repair/
tags:
  - research note
  - itinerary optimization
  - context-aware planning
  - decision systems
---

My itinerary project started with a simple weather-aware question: how should route planning change when outdoor stops have bad weather risk? That is still important, but it is no longer the whole research direction.

The current framing is **context-aware itinerary repair**. Weather is one context family. Hotels, route time, nature regions, base cities, evidence quality, closures, user pace, and interest profiles are all part of the same decision problem. The system should not only pick attractions; it should explain what changed, why it changed, and what was preserved from the original trip.

The research question I want to focus on is:

> How can a planner repair multi-day itineraries under changing context while preserving user intent, feasibility, and explainability?

That breaks into a few smaller questions. How do we separate traveler pace from interests like nature, city, culture, and history? How do we explain skipped, replaced, or moved stops without dumping raw optimization scores on the user? When is targeted repair better than full replanning? How should uncertainty from weather, hotel availability, closures, or source confidence show up in a dashboard?

I also found a supervisor for this itinerary/context-aware planner project with **Prof. Seongjin Choi**. That gives the project a clearer research home and a stronger path from course system to manuscript-scale work.

The website now keeps the existing weather-aware URL for continuity, but the public framing is shifting. Weather-aware planning is the first visible slice; context-aware repair is the research direction.
