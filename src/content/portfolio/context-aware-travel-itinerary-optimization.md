---
title: "Context-Aware Travel Itinerary Optimization"
collection: portfolio
permalink: /portfolio/weather-aware-travel-itinerary-optimization
redirect_from:
  - /portfolio/weather-aware-attraction-optimization/
date: 2026-07-04
---

<div class="case-study weather-case">

  <section class="case-hero route-hero">
    <p class="case-eyebrow">Flagship project / context-aware planning system</p>
    <h2>Context-aware itinerary planning with routes, hotels, preferences, evidence, and inspectable map dashboards.</h2>
    <p class="case-lede">
      This project turns a travel itinerary into a decision system: gather places, hotels, weather, nature regions, travel time, user preferences, and evidence quality; score the tradeoffs; optimize or repair route choices; then export maps that a traveler or researcher can inspect.
    </p>
    <div class="chip-row">
      <span class="dash-chip">Python 3.12</span>
      <span class="dash-chip dash-chip--ink">Gurobi</span>
      <span class="dash-chip dash-chip--amber">Folium / Leaflet</span>
      <span class="dash-chip dash-chip--rose">Context-aware repair</span>
    </div>
    <div class="profile-actions route-actions">
      <a class="ui-button" href="/images/weather_dashboard/customer.html">Open Customer Dashboard</a>
      <a class="ui-button ui-button--secondary" href="/images/lightweight_share_map.html">Open Lightweight Map</a>
      <a class="ui-button ui-button--secondary" href="https://github.com/Ztang-Yit-Xiaang/weather-aware-travel-itinerary-optimization">GitHub</a>
    </div>
  </section>

  <section class="route-preview-panel route-preview-panel--feature">
    <div class="route-preview-copy">
      <p class="ui-kicker">Current generated demo</p>
      <h3>California Statewide Nature route dashboard</h3>
      <p>
        The latest local export focuses on a nature-heavy California trip using a hierarchical + bandit + small Gurobi repair workflow. Weather remains one context signal, but the research direction is broader: user-specific, conflict-aware, explainable repair for multi-day itineraries.
      </p>
      <div class="route-fact-strip">
        <div><strong>33</strong><span>route records</span></div>
        <div><strong>8</strong><span>customer options</span></div>
        <div><strong>97</strong><span>validation passes</span></div>
      </div>
    </div>
    <figure class="route-preview-image">
      <img src="/images/weather_dashboard_preview.png" alt="Preview of the context-aware travel dashboard">
    </figure>
  </section>

  <section class="metric-grid">
    <div class="metric-card">
      <span class="metric-label">Share artifact</span>
      <span class="metric-value">0.02 MB</span>
      <p>Compact selected-route map for fast loading and sharing.</p>
    </div>
    <div class="metric-card">
      <span class="metric-label">Production map</span>
      <span class="metric-value">21 MB</span>
      <p>Refreshed large Folium artifact kept for compatibility and deep inspection.</p>
    </div>
    <div class="metric-card">
      <span class="metric-label">Dashboard files</span>
      <span class="metric-value">156</span>
      <p>Static HTML, CSS, JavaScript, route GeoJSON, POI JSON, and file-mode fallbacks.</p>
    </div>
    <div class="metric-card">
      <span class="metric-label">Context scenarios</span>
      <span class="metric-value">4</span>
      <p>Weather, hotels, nature regions, base cities, travel time, and evidence quality.</p>
    </div>
  </section>

  <section class="ui-section">
    <div class="ui-section__header">
      <p class="ui-kicker">Best way to view it</p>
      <h2>Start small, then open the research dashboard</h2>
    </div>
    <div class="project-preview-grid">
      <article class="project-preview">
        <p class="ui-card__label">Recommended first look</p>
        <h3><a href="/images/lightweight_share_map.html">Lightweight route map</a></h3>
        <p>Small standalone map for the selected/default route, essential markers, and a quick visual read.</p>
      </article>
      <article class="project-preview">
        <p class="ui-card__label">Traveler view</p>
        <h3><a href="/images/weather_dashboard/customer.html">Customer dashboard</a></h3>
        <p>Clean trip-planner surface with route playback, active stops, selected hotels, and route details.</p>
      </article>
      <article class="project-preview">
        <p class="ui-card__label">Research view</p>
        <h3><a href="/images/weather_dashboard/research.html">Layer workspace</a></h3>
        <p>Route variants, city details, candidate layers, nature exploration, and debug summaries.</p>
      </article>
      <article class="project-preview">
        <p class="ui-card__label">Evaluation view</p>
        <h3><a href="/images/weather_dashboard/evaluation.html">Method comparison</a></h3>
        <p>Compares hierarchical Gurobi, greedy baselines, and hybrid bandit + repair outputs.</p>
      </article>
    </div>
  </section>

  <section class="route-map-callout">
    <div class="route-map-callout__copy">
      <p class="ui-kicker">Embedded preview</p>
      <h3>Lightweight share map</h3>
      <p>
        This is the preferred public artifact: it loads quickly and shows the selected route without research-only candidate layers. The larger production map is still linked below for compatibility.
      </p>
    </div>
    <div class="artifact-frame artifact-frame--large">
      <iframe src="/images/lightweight_share_map.html" title="Lightweight context-aware route map"></iframe>
    </div>
  </section>

  <section class="ui-section">
    <div class="ui-section__header">
      <p class="ui-kicker">Current planning model</p>
      <h2>Context-aware routing without confusing pace, interest, and evidence</h2>
    </div>
    <div class="system-grid">
      <article class="system-card">
        <h3>Pace is separate</h3>
        <p>The traveler profile controls relaxed, balanced, or explorer pacing, so time budgets and route density stay interpretable.</p>
      </article>
      <article class="system-card">
        <h3>Interest is explicit</h3>
        <p>The interest profile is a bar over nature, city, culture, and history; changing it changes scoring, not the definition of the traveler.</p>
      </article>
      <article class="system-card">
        <h3>Nature is regional</h3>
        <p>Yosemite, Sequoia, Joshua Tree, Death Valley, Lake Tahoe, Redwood, and similar areas can be planned as regions, not just single POIs.</p>
      </article>
      <article class="system-card">
        <h3>Skipped places are explained</h3>
        <p>The audit can preserve why-not-selected reasons such as excessive detour, weather risk, insufficient days, or lower interest fit.</p>
      </article>
      <article class="system-card">
        <h3>Repairs preserve intent</h3>
        <p>The research direction compares targeted itinerary repair against full replanning when context changes after an initial route is built.</p>
      </article>
      <article class="system-card">
        <h3>Evidence stays visible</h3>
        <p>Weather, closure, hotel, and source-confidence conflicts should be surfaced as planning evidence rather than hidden inside a black-box score.</p>
      </article>
    </div>
  </section>

  <section class="ui-section">
    <div class="ui-section__header">
      <p class="ui-kicker">Research question</p>
      <h2>How should a planner repair trips when real context changes?</h2>
    </div>
    <div class="timeline-list">
      <div><strong>Primary RQ</strong><span>How can a planner repair multi-day itineraries under changing context while preserving user intent, feasibility, and explainability?</span></div>
      <div><strong>Pace vs interest</strong><span>How should the system separate traveler pace from interests such as nature, city, culture, and history?</span></div>
      <div><strong>Explanation</strong><span>How should selected, skipped, replaced, or moved stops be explained with compact evidence rather than opaque scores?</span></div>
      <div><strong>Repair vs replan</strong><span>When is targeted repair better than full replanning for preserving the original trip structure?</span></div>
      <div><strong>Uncertainty</strong><span>How should weather, closure, hotel, and source-confidence uncertainty appear in the dashboard and evaluation artifacts?</span></div>
    </div>
  </section>

  <section class="ui-section">
    <div class="ui-section__header">
      <p class="ui-kicker">Scenario coverage</p>
      <h2>Designed for more than one California route</h2>
    </div>
    <div class="scenario-grid">
      <article class="scenario-card">
        <span>California Coast</span>
        <strong>6 base cities</strong>
        <p>Coastal corridor planning with Big Sur, Central Coast beaches, and Santa Monica Mountains.</p>
      </article>
      <article class="scenario-card">
        <span>California Statewide Nature</span>
        <strong>11 nature regions</strong>
        <p>Statewide park planning with Yosemite, Sequoia, Joshua Tree, Death Valley, Tahoe, Redwood, and more.</p>
      </article>
      <article class="scenario-card">
        <span>Las Vegas + National Parks</span>
        <strong>6 nature regions</strong>
        <p>Gateway planning around Las Vegas, Zion, Bryce Canyon, Grand Canyon, Death Valley, and nearby scenic stops.</p>
      </article>
      <article class="scenario-card">
        <span>New York City + Nature</span>
        <strong>4 nature regions</strong>
        <p>Urban-plus-nature planning across Central Park, Hudson Valley, Catskills, and Adirondacks.</p>
      </article>
    </div>
  </section>

  <section class="ui-section">
    <div class="ui-section__header">
      <p class="ui-kicker">Pipeline architecture</p>
      <h2>Static exports, research traceability, and browser-safe previews</h2>
    </div>
    <div class="timeline-list">
      <div><strong>Collect</strong><span>Places, hotels, weather, closures, route context, social must-go stops, nature regions, and gateway/base-city candidates.</span></div>
      <div><strong>Score</strong><span>Base POI value, interest fit, park bonuses, weather sensitivity, seasonality risk, detour cost, and data confidence.</span></div>
      <div><strong>Repair</strong><span>Hierarchical Gurobi, greedy baselines, and hybrid bandit + small Gurobi repair produce comparable route artifacts.</span></div>
      <div><strong>Export</strong><span>Customer, research, evaluation, lightweight share, and legacy Folium map outputs are generated as static files.</span></div>
    </div>
  </section>

  <section class="ui-section">
    <div class="ui-section__header">
      <p class="ui-kicker">Model sketch</p>
      <h2>Utility balances attraction value, interest fit, context risk, and detour cost</h2>
    </div>
    <p>
      The earlier course version ranked attractions with rating, review count, waiting time, and travel penalties. The current version keeps that optimization spine but adds context-aware utility, nature-region planning, and repair-oriented evidence.
    </p>
    <div class="formula-panel formula-panel--split">
      <div>
        <p><strong>Interest profile</strong></p>
        <p>p = [p_nature, p_city, p_culture, p_history], with weights summing to 1.</p>
      </div>
      <div>
        <p><strong>Interest-adjusted utility</strong></p>
        <p>base value + interest fit + park bonus - weather/context risk - seasonality risk - detour penalty.</p>
      </div>
    </div>
  </section>

  <section class="ui-section">
    <div class="ui-section__header">
      <p class="ui-kicker">Published artifacts</p>
      <h2>Website demos and compatibility maps</h2>
    </div>
    <div class="artifact-grid">
      <article class="artifact-card">
        <div class="artifact-card__body">
          <p class="artifact-card__meta">Preferred public artifact</p>
          <h3>Lightweight route map</h3>
          <p>Selected route only, essential markers, compact dashboard, and no comparison/debug layers.</p>
          <p><a class="project-link" href="/images/lightweight_share_map.html">Open lightweight map</a></p>
        </div>
        <img class="artifact-image" src="/images/weather_lightweight_map_preview.png" alt="Lightweight share map preview">
      </article>
      <article class="artifact-card">
        <div class="artifact-card__body">
          <p class="artifact-card__meta">Full dashboard</p>
          <h3>Modular dashboard bundle</h3>
          <p>Customer, research, and evaluation pages backed by route GeoJSON, POI JSON, and JavaScript fallback assets.</p>
          <p><a class="project-link" href="/images/weather_dashboard/index.html">Open full dashboard</a></p>
        </div>
        <img class="artifact-image" src="/images/weather_dashboard_preview.png" alt="Full dashboard preview">
      </article>
    </div>
  </section>

  <section class="artifact-card artifact-card--standalone">
    <div class="artifact-card__body">
      <p class="artifact-card__meta">Compatibility artifact</p>
      <h3>Large production Folium map</h3>
      <p>The legacy production map remains available at the stable URL for readers who want the full generated Folium artifact.</p>
      <p><a class="project-link" href="/images/production_hierarchical_trip_map.html">Open production map</a></p>
    </div>
  </section>

  <section class="ui-section ui-section--compact">
    <div class="profile-actions">
      <a class="ui-button" href="https://github.com/Ztang-Yit-Xiaang/weather-aware-travel-itinerary-optimization">View GitHub Repository</a>
      <a class="ui-button ui-button--secondary" href="/images/weather_dashboard/customer.html">Customer Dashboard</a>
      <a class="ui-button ui-button--secondary" href="/images/weather_dashboard/evaluation.html">Evaluation Dashboard</a>
      <a class="ui-button ui-button--secondary" href="/research/working-papers/">Working Papers</a>
      <a class="ui-button ui-button--secondary" href="/posts/2026/06/from-weather-aware-to-context-aware-itinerary-repair/">Research Note</a>
    </div>
  </section>

</div>
