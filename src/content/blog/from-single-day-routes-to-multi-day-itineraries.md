---
title: "From Single-Day Routes to Multi-Day Itineraries"
date: 2026-04-18
permalink: /blog/from-single-day-routes-to-multi-day-itineraries/
tags:
  - project log
  - optimization
  - travel planning
  - gurobi
---

One of the most satisfying parts of my itinerary optimization project has been watching it evolve from a **single-day attraction-routing prototype** into a **multi-day planning system** with hotel selection, traveler profiles, and route visualization. The original version already handled utility, waiting time, and travel cost, but it still assumed the trip began and ended within one day.

The newer extension changes the problem in an important way: hotels become part of the decision process. Instead of asking only which attractions should be visited, the model also has to decide where a traveler should stay, how daily outings are organized, and whether switching hotels is worth the extra cost and coordination. That turns the project into something closer to a practical tourist trip design problem rather than a simple ranked route recommendation.

I also found it useful to separate different traveler styles. A relaxed traveler should not receive the same itinerary as someone trying to see everything possible. That led to the current **relaxed**, **balanced**, and **explorer** profiles, each with different tradeoffs between utility, waiting time, and trip intensity.

The visualization side became much more meaningful after this extension. The original HTML map still matters because it shows the first single-day route idea clearly. But the newer Gurobi map captures what I actually wanted from the beginning: a planning tool that can compare multi-day behavior, hotel choices, and outing structure in one place.

This project also shaped how I think about optimization software more broadly. Itinerary planning uses a modeling layer and a solver as a system-building tool; my newer Summer 2026 optimization work asks a related but lower-level question: what happens when solver-style update machinery is translated directly into Torch/PyTorch for experimentation?

My next step is to keep improving the realism of the model. The current system already combines Yelp, Open-Meteo, and OpenStreetMap data, but there is still room to make the travel-time assumptions, crowd modeling, and multi-city road-trip settings more adaptive.
