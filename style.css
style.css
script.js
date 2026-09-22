/* =========================================================
   RN FASHIONHUB — Stylesheet
   Token system: colors, type, spacing, radius, shadow
   ========================================================= */

:root {
  /* Brand colors */
  --color-black: #111111;
  --color-charcoal: #1F1F1F;
  --color-bg: #F7F7F5;
  --color-text: #111111;
  --color-text-muted: #666666;
  --color-gold: #B08D57;
  --color-gold-light: #C9A876;
  --color-white: #FFFFFF;
  --color-border: #E4E2DD;
  --color-danger: #B3261E;
  --color-success: #2F5D3A;

  /* Type */
  --font-heading: "Manrope", "Inter", -apple-system, sans-serif;
  --font-body: "Inter", -apple-system, sans-serif;

  /* Spacing scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  /* Layout */
  --container-w: 1240px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --header-h: 76px;
  --header-h-scrolled: 60px;

  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(17,17,17,0.06);
  --shadow-md: 0 8px 24px rgba(17,17,17,0.10);
  --shadow-lg: 0 16px 48px rgba(17,17,17,0.16);

  /* Motion */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --dur-fast: 160ms;
  --dur-med: 280ms;
}

/* =========================================================
   RESET
   ========================================================= */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; margin: 0; padding: 0; }
button { font-family: inherit; cursor: pointer; background: none; border: none; color: inherit; }
input, textarea, select { font-family: inherit; font-size: 1rem; }
h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: 800;
  line-height: 1.15;
  margin: 0;
  letter-spacing: -0.01em;
}
p { margin: 0; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}

:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--color-black);
  color: var(--color-white);
  padding: var(--space-3) var(--space-5);
  z-index: 200;
}
.skip-link:focus {
  left: var(--space-4);
  top: var(--space-4);
}

.container {
  max-width: var(--container-w);
  margin: 0 auto;
  padding: 0 var(--space-5);
}

/* =========================================================
   BUTTONS
   ========================================================= */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 14px 30px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: var(--radius-sm);
  transition: background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease);
  border: 1px solid transparent;
  min-height: 48px;
  white-space: nowrap;
}
.btn:active { transform: translateY(1px); }
.btn-primary {
  background: var(--color-black);
  color: var(--color-white);
}
.btn-primary:hover { background: #000; }
.btn-outline {
  border-color: rgba(255,255,255,0.6);
  color: var(--color-white);
}
.btn-outline:hover { background: rgba(255,255,255,0.12); }
.btn-outline-light {
  border-color: var(--color-gold);
  color: var(--color-white);
}
.btn-outline-light:hover { background: var(--color-gold); color: var(--color-black); }
.btn-gold {
  background: var(--color-gold);
  color: var(--color-black);
}
.btn-gold:hover { background: var(--color-gold-light); }
.btn-text {
  padding: 0;
  min-height: auto;
  color: var(--color-black);
  font-weight: 600;
  border-bottom: 1px solid var(--color-black);
  border-radius: 0;
  gap: var(--space-1);
}
.btn-block { width: 100%; }

/* =========================================================
   HEADER
   ========================================================= */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(247,247,245,0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  transition: box-shadow var(--dur-med) var(--ease);
}
.site-header.is-scrolled {
  box-shadow: var(--shadow-sm);
}
.header-inner {
  max-width: var(--container-w);
  margin: 0 auto;
  padding: 0 var(--space-5);
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5);
  transition: height var(--dur-med) var(--ease);
}
.site-header.is-scrolled .header-inner { height: var(--header-h-scrolled); }

.logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}
.logo-mark {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.1rem;
  background: var(--color-black);
  color: var(--color-gold);
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.logo-text {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.05rem;
  letter-spacing: 0.02em;
}

.main-nav ul {
  display: flex;
  gap: var(--space-6);
}
.nav-link {
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--color-text);
  position: relative;
  padding: var(--space-2) 0;
}
.nav-link::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 2px;
  background: var(--color-gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-fast) var(--ease);
}
.nav-link:hover::after,
.nav-link.is-active::after { transform: scaleX(1); }
.nav-link.is-active { color: var(--color-black); }

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.icon-btn {
  position: relative;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--color-text);
  transition: background var(--dur-fast) var(--ease);
}
.icon-btn:hover { background: rgba(17,17,17,0.06); }
.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: var(--color-gold);
  color: var(--color-black);
  font-size: 0.65rem;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.hamburger {
  display: none;
  width: 40px;
  height: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 50%;
}
.hamburger span {
  width: 20px;
  height: 2px;
  background: var(--color-black);
  transition: transform var(--dur-fast) var(--ease), opacity var(--dur-fast) var(--ease);
}
.hamburger[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.hamburger[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Search panel */
.search-panel {
  border-top: 1px solid var(--color-border);
  background: var(--color-white);
  padding: var(--space-4) var(--space-5);
}
.search-form {
  max-width: var(--container-w);
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  border-bottom: 2px solid var(--color-black);
  padding-bottom: var(--space-2);
}
.search-form input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.05rem;
  background: transparent;
}
.search-close {
  font-size: 1.4rem;
  line-height: 1;
  color: var(--color-text-muted);
}
.search-results {
  max-width: var(--container-w);
  margin: var(--space-3) auto 0;
  display: grid;
  gap: var(--space-2);
  max-height: 300px;
  overflow-y: auto;
}
.search-result-item {
  display: flex;
  justify-content: space-between;
  padding: var(--space-3);
  border-radius: var(--radius-sm);
}
.search-result-item:hover { background: var(--color-bg); }
.search-no-results { color: var(--color-text-muted); padding: var(--space-3); }

/* Mobile menu */
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: min(320px, 85vw);
  height: 100%;
  background: var(--color-white);
  z-index: 150;
  padding: calc(var(--header-h) + var(--space-5)) var(--space-5) var(--space-5);
  transform: translateX(100%);
  transition: transform var(--dur-med) var(--ease);
  box-shadow: var(--shadow-lg);
}
.mobile-menu:not([hidden]) { transform: translateX(0); }
.mobile-menu ul { display: flex; flex-direction: column; gap: var(--space-2); }
.mobile-nav-link {
  display: block;
  padding: var(--space-3) var(--space-2);
  font-size: 1.05rem;
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(17,17,17,0.5);
  z-index: 140;
}

/* =========================================================
   HERO
   ========================================================= */
.hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  color: var(--color-white);
}
.hero-media {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-placeholder {
  width: 100%;
  height: 100%;
  background:
    repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 26px),
    linear-gradient(160deg, #2b2b2b 0%, #171717 55%, #0c0c0c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-5);
}
.hero-placeholder span {
  color: rgba(255,255,255,0.35);
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  max-width: 320px;
  border: 1px dashed rgba(255,255,255,0.25);
  padding: var(--space-4);
  border-radius: var(--radius-sm);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.92) 100%);
  z-index: 1;
}
.hero-content {
  position: relative;
  z-index: 2;
  padding-bottom: var(--space-9);
  padding-top: var(--space-9);
}
.hero-kicker {
  font-size: 0.85rem;
  color: var(--color-gold-light);
  font-weight: 600;
  letter-spacing: 0.06em;
  margin-bottom: var(--space-4);
}
.hero-title {
  font-size: clamp(2.6rem, 7vw, 5.2rem);
  font-weight: 800;
  max-width: 12ch;
}
.hero-subtitle {
  margin-top: var(--space-4);
  font-size: clamp(1rem, 1.6vw, 1.25rem);
  color: rgba(255,255,255,0.85);
  max-width: 46ch;
  font-weight: 400;
}
.hero-actions {
  margin-top: var(--space-6);
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}
.scroll-cue {
  position: absolute;
  bottom: var(--space-5);
  right: var(--space-5);
  z-index: 2;
  width: 32px;
  height: 52px;
  border: 1.5px solid rgba(255,255,255,0.5);
  border-radius: 20px;
  display: none;
}
.scroll-cue span {
  display: block;
  width: 4px;
  height: 8px;
  background: var(--color-gold);
  border-radius: 2px;
  margin: 8px auto 0;
  animation: scrollcue 1.8s infinite var(--ease);
}
@keyframes scrollcue {
  0% { transform: translateY(0); opacity: 1; }
  70% { transform: translateY(18px); opacity: 0; }
  100% { opacity: 0; }
}
@media (min-width: 700px) { .scroll-cue { display: block; } }

/* =========================================================
   SECTIONS — shared
   ========================================================= */
.section { padding: var(--space-9) 0; }
.section-alt { background: var(--color-white); }
.section-dark { background: var(--color-black); color: var(--color-white); }
.section-head { max-width: 620px; margin-bottom: var(--space-7); }
.section-head-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-5);
  flex-wrap: wrap;
}
.section-head h2 { font-size: clamp(1.7rem, 3vw, 2.3rem); }
.section-sub { margin-top: var(--space-3); color: var(--color-text-muted); font-size: 1.02rem; }

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 600ms var(--ease), transform 600ms var(--ease);
}
.reveal.is-visible { opacity: 1; transform: translateY(0); }

/* =========================================================
   CATEGORY GRID
   ========================================================= */
.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
}
.category-card {
  display: block;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  transition: box-shadow var(--dur-med) var(--ease), transform var(--dur-med) var(--ease);
}
.category-card:hover { box-shadow: var(--shadow-md); transform: translateY(-4px); }
.category-media {
  aspect-ratio: 4 / 5;
  background: linear-gradient(150deg, #e9e7e1 0%, #dcd9d1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.category-media span {
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: 0.92rem;
  transition: transform var(--dur-med) var(--ease);
}
.category-card:hover .category-media span { transform: scale(1.06); }
.category-info {
  padding: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}
.category-info h3 { font-size: 1rem; font-weight: 700; }
.category-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-gold);
  white-space: nowrap;
}

/* =========================================================
   TOOLBAR — filter + sort
   ========================================================= */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-5);
  border-bottom: 1px solid var(--color-border);
}
.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.filter-chip {
  padding: 9px 18px;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  font-size: 0.85rem;
  font-weight: 500;
  transition: background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease);
  min-height: 40px;
}
.filter-chip:hover { border-color: var(--color-black); }
.filter-chip.is-active {
  background: var(--color-black);
  color: var(--color-white);
  border-color: var(--color-black);
}
.sort-group {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.88rem;
  color: var(--color-text-muted);
}
.sort-group select {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 8px 12px;
  background: var(--color-white);
  color: var(--color-text);
  min-height: 40px;
}

/* =========================================================
   PRODUCT GRID + CARD
   ========================================================= */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
}
.product-grid-scroll {
  grid-auto-flow: column;
  grid-auto-columns: minmax(240px, 1fr);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: var(--space-3);
  grid-template-columns: none;
}
.product-grid-scroll .product-card { scroll-snap-align: start; }

.empty-state {
  text-align: center;
  color: var(--color-text-muted);
  padding: var(--space-7) 0;
}

.product-card {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow var(--dur-med) var(--ease), transform var(--dur-med) var(--ease);
}
.product-card:hover { box-shadow: var(--shadow-md); transform: translateY(-4px); }

.product-media {
  position: relative;
  aspect-ratio: 3 / 4;
  background: linear-gradient(150deg, #efeeea 0%, #e2e0d9 100%);
  overflow: hidden;
}
.product-media .placeholder-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-4);
  font-size: 0.8rem;
  color: var(--color-text-muted);
  transition: transform var(--dur-med) var(--ease);
}
.product-card:hover .placeholder-label { transform: scale(1.06); }

.product-badge {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  background: var(--color-black);
  color: var(--color-white);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  z-index: 2;
}
.product-badge.badge-gold { background: var(--color-gold); color: var(--color-black); }

.wishlist-btn {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: transform var(--dur-fast) var(--ease);
}
.wishlist-btn:hover { transform: scale(1.08); }
.wishlist-btn svg { stroke: var(--color-black); transition: fill var(--dur-fast) var(--ease), stroke var(--dur-fast) var(--ease); }
.wishlist-btn.is-active svg { fill: var(--color-gold); stroke: var(--color-gold); }

.quickview-btn {
  position: absolute;
  left: var(--space-3);
  right: var(--space-3);
  bottom: var(--space-3);
  background: rgba(17,17,17,0.88);
  color: var(--color-white);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 10px;
  border-radius: var(--radius-sm);
  text-align: center;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease);
  z-index: 2;
}
.product-card:hover .quickview-btn,
.product-card:focus-within .quickview-btn { opacity: 1; transform: translateY(0); }

.product-info { padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); flex: 1; }
.product-name { font-size: 0.95rem; font-weight: 600; }
.product-rating {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.78rem;
  color: var(--color-text-muted);
}
.product-rating .stars { color: var(--color-gold); letter-spacing: 1px; }
.product-price-row {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  margin-top: auto;
}
.price-current { font-weight: 700; font-size: 1.05rem; }
.price-original { color: var(--color-text-muted); text-decoration: line-through; font-size: 0.85rem; }
.price-discount { color: var(--color-success); font-size: 0.8rem; font-weight: 600; }

.add-to-cart-btn {
  margin-top: var(--space-3);
  width: 100%;
  padding: 11px;
  border: 1px solid var(--color-black);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 600;
  transition: background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease);
  min-height: 44px;
}
.add-to-cart-btn:hover { background: var(--color-black); color: var(--color-white); }
.add-to-cart-btn.is-added { background: var(--color-success); border-color: var(--color-success); color: var(--color-white); }

.demo-tag {
  font-size: 0.68rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* =========================================================
   PROMO BANNER
   ========================================================= */
.promo-banner {
  background: var(--color-black);
  color: var(--color-white);
  padding: var(--space-9) 0;
  background-image: linear-gradient(120deg, var(--color-black) 0%, var(--color-charcoal) 100%);
}
.promo-inner { text-align: left; max-width: 640px; }
.promo-inner h2 { font-size: clamp(1.8rem, 3.4vw, 2.6rem); }
.promo-inner p { margin-top: var(--space-3); color: rgba(255,255,255,0.75); font-size: 1.05rem; }
.promo-inner .btn { margin-top: var(--space-6); }

/* =========================================================
   FEATURE GRID (why us)
   ========================================================= */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
}
.feature-card {
  padding: var(--space-6) var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-white);
}
.feature-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gold);
  margin-bottom: var(--space-4);
}
.feature-card h3 { font-size: 1.05rem; margin-bottom: var(--space-2); }
.feature-card p { color: var(--color-text-muted); font-size: 0.92rem; }

/* =========================================================
   ABOUT
   ========================================================= */
.about-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  align-items: center;
}
.about-placeholder {
  aspect-ratio: 4/3;
  border-radius: var(--radius-md);
  background: linear-gradient(150deg, #2b2b2b 0%, #171717 100%);
  border: 1px solid rgba(255,255,255,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-5);
}
.about-placeholder span { color: rgba(255,255,255,0.4); font-size: 0.85rem; }
.about-copy h2 { font-size: clamp(1.7rem, 3vw, 2.3rem); margin-bottom: var(--space-5); }
.about-copy p { color: rgba(255,255,255,0.75); margin-bottom: var(--space-4); max-width: 52ch; }
.about-copy .btn { margin-top: var(--space-3); }

/* =========================================================
   LOCATION
   ========================================================= */
.location-inner {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: var(--space-8);
  align-items: center;
}
.location-info h2 { margin-bottom: var(--space-5); }
.location-row {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}
.location-icon { color: var(--color-gold); flex-shrink: 0; margin-top: 2px; }
.location-info address { font-style: normal; color: var(--color-text-muted); line-height: 1.7; }
.location-map {
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  aspect-ratio: 4/3;
}
.location-map iframe { width: 100%; height: 100%; border: 0; }

/* =========================================================
   CONTACT
   ========================================================= */
.contact-inner {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: var(--space-8);
}
.contact-copy h2 { margin-bottom: var(--space-4); }
.contact-copy p { color: var(--color-text-muted); max-width: 44ch; margin-bottom: var(--space-6); }
.contact-details { display: flex; flex-direction: column; gap: var(--space-3); }
.contact-details li { display: flex; align-items: center; gap: var(--space-3); color: var(--color-text-muted); font-size: 0.95rem; }
.contact-details svg { color: var(--color-gold); flex-shrink: 0; }

.contact-form { background: var(--color-bg); padding: var(--space-6); border-radius: var(--radius-md); border: 1px solid var(--color-border); }
.form-row { margin-bottom: var(--space-5); display: flex; flex-direction: column; gap: var(--space-2); }
.form-row label { font-size: 0.85rem; font-weight: 600; }
.form-row input, .form-row textarea {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  background: var(--color-white);
  resize: vertical;
  min-height: 48px;
}
.form-row input:focus, .form-row textarea:focus { border-color: var(--color-gold); }
.form-row.has-error input, .form-row.has-error textarea { border-color: var(--color-danger); }
.form-error { color: var(--color-danger); font-size: 0.8rem; min-height: 1em; }
.form-success { margin-top: var(--space-4); color: var(--color-success); font-size: 0.9rem; font-weight: 600; }

/* =========================================================
   FOOTER
   ========================================================= */
.site-footer { background: var(--color-black); color: rgba(255,255,255,0.7); padding-top: var(--space-8); }
.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: var(--space-6);
  padding-bottom: var(--space-7);
  border-bottom: 1px solid rgba(255,255,255,0.12);
}
.logo-footer .logo-text, .logo-footer .logo-mark { color: var(--color-white); }
.logo-footer .logo-mark { background: rgba(255,255,255,0.1); }
.footer-brand p { margin-top: var(--space-3); font-size: 0.9rem; }
.social-icons { display: flex; gap: var(--space-2); margin-top: var(--space-5); }
.social-icons .icon-btn { color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.2); }
.social-icons .icon-btn:hover { background: rgba(255,255,255,0.1); color: var(--color-white); }
.footer-col h3 { color: var(--color-white); font-size: 0.9rem; margin-bottom: var(--space-4); }
.footer-col ul { display: flex; flex-direction: column; gap: var(--space-2); }
.footer-col a { font-size: 0.9rem; transition: color var(--dur-fast) var(--ease); }
.footer-col a:hover { color: var(--color-gold-light); }
.footer-col address { font-style: normal; font-size: 0.9rem; line-height: 1.7; }
.footer-bottom { text-align: center; padding: var(--space-5) 0; font-size: 0.82rem; }

/* =========================================================
   MODALS
   ========================================================= */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(17,17,17,0.55);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-5);
}
.modal {
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  max-width: 480px;
  width: 100%;
  position: relative;
  box-shadow: var(--shadow-lg);
  max-height: 85vh;
  overflow-y: auto;
}
.modal-close {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  font-size: 1.4rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.modal-close:hover { background: var(--color-bg); }
.modal h3 { margin-bottom: var(--space-4); padding-right: var(--space-6); }
.modal p { color: var(--color-text-muted); }

.modal-quickview { max-width: 720px; display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6); padding: var(--space-5); }
.qv-media { aspect-ratio: 3/4; border-radius: var(--radius-sm); overflow: hidden; }
.qv-info { display: flex; flex-direction: column; padding: var(--space-3) var(--space-3) var(--space-3) 0; }
.qv-price { font-size: 1.2rem; font-weight: 700; margin: var(--space-3) 0; }
.qv-desc { color: var(--color-text-muted); margin-bottom: var(--space-5); }
.qv-actions { display: flex; align-items: center; gap: var(--space-4); margin-top: auto; }
.qty-control { display: flex; align-items: center; border: 1px solid var(--color-border); border-radius: var(--radius-sm); }
.qty-btn { width: 38px; height: 44px; font-size: 1.1rem; }
.qty-value { width: 34px; text-align: center; font-weight: 600; }

/* =========================================================
   SIDE PANELS (cart / wishlist)
   ========================================================= */
.side-panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: min(400px, 92vw);
  background: var(--color-white);
  z-index: 210;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform var(--dur-med) var(--ease);
  box-shadow: var(--shadow-lg);
}
.side-panel:not([hidden]) { transform: translateX(0); }
.side-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5);
  border-bottom: 1px solid var(--color-border);
}
.side-panel-body { flex: 1; overflow-y: auto; padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-4); }
.side-panel-footer { padding: var(--space-5); border-top: 1px solid var(--color-border); }
.cart-total-row { display: flex; justify-content: space-between; margin-bottom: var(--space-4); font-size: 1.05rem; }
.panel-note { font-size: 0.78rem; color: var(--color-text-muted); text-align: center; margin-top: var(--space-3); }

.cart-item, .wishlist-item {
  display: flex;
  gap: var(--space-3);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}
.cart-item-media, .wishlist-item-media {
  width: 72px;
  height: 90px;
  border-radius: var(--radius-sm);
  background: linear-gradient(150deg, #efeeea 0%, #e2e0d9 100%);
  flex-shrink: 0;
}
.cart-item-info, .wishlist-item-info { flex: 1; display: flex; flex-direction: column; gap: var(--space-2); }
.cart-item-info .item-name, .wishlist-item-info .item-name { font-weight: 600; font-size: 0.9rem; }
.cart-item-row { display: flex; align-items: center; justify-content: space-between; }
.remove-btn { font-size: 0.78rem; color: var(--color-text-muted); text-decoration: underline; }
.remove-btn:hover { color: var(--color-danger); }
.panel-empty { color: var(--color-text-muted); text-align: center; padding: var(--space-7) 0; }

/* =========================================================
   TOAST
   ========================================================= */
.toast {
  position: fixed;
  bottom: var(--space-6);
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: var(--color-black);
  color: var(--color-white);
  padding: 14px 24px;
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  z-index: 300;
  opacity: 0;
  transition: opacity var(--dur-med) var(--ease), transform var(--dur-med) var(--ease);
}
.toast.is-visible { opacity: 1; transform: translateX(-50%) translateY(0); }

/* =========================================================
   BACK TO TOP
   ========================================================= */
.back-to-top {
  position: fixed;
  bottom: var(--space-5);
  right: var(--space-5);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--color-black);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 90;
  box-shadow: var(--shadow-md);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease);
}
.back-to-top.is-visible { opacity: 1; transform: translateY(0); }
.back-to-top:hover { background: var(--color-gold); color: var(--color-black); }

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 1080px) {
  .category-grid { grid-template-columns: repeat(3, 1fr); }
  .product-grid:not(.product-grid-scroll) { grid-template-columns: repeat(3, 1fr); }
  .feature-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 900px) {
  .main-nav { display: none; }
  .hamburger { display: flex; }
  .about-inner, .location-inner, .contact-inner { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 700px) {
  :root { --header-h: 68px; --header-h-scrolled: 56px; }
  .category-grid { grid-template-columns: repeat(2, 1fr); gap: var(--space-4); }
  .product-grid:not(.product-grid-scroll) { grid-template-columns: repeat(2, 1fr); gap: var(--space-4); }
  .feature-grid { grid-template-columns: 1fr; }
  .section { padding: var(--space-8) 0; }
  .hero { min-height: 84vh; }
  .modal-quickview { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
  .toolbar { flex-direction: column; align-items: flex-start; }
  .promo-inner { text-align: left; }
}

@media (max-width: 480px) {
  .container { padding: 0 var(--space-4); }
  .hero-actions { flex-direction: column; align-items: stretch; }
  .hero-actions .btn { width: 100%; }
}
