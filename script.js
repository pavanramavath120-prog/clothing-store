/* =========================================================
   RN FASHIONHUB — script.js
   All interactive behaviour for the storefront frontend.
   Data below is DEMO data for layout/testing only and should
   be replaced by a real product feed / backend API later.
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     DEMO PRODUCT DATA
     Replace this array with data from a real backend/API.
     All prices/discounts are illustrative demo values only.
     --------------------------------------------------------- */
  const PRODUCTS = [
    { id: "p1", name: "Classic Crew T-Shirt", category: "T-Shirts", price: 499, originalPrice: 799, rating: 4.3, isNew: true },
    { id: "p2", name: "Oxford Cotton Shirt", category: "Shirts", price: 999, originalPrice: 1499, rating: 4.6, isNew: false },
    { id: "p3", name: "Slim Fit Jeans", category: "Jeans", price: 1299, originalPrice: 1899, rating: 4.4, isNew: true },
    { id: "p4", name: "Tailored Chino Trousers", category: "Trousers", price: 1099, originalPrice: null, rating: 4.2, isNew: false },
    { id: "p5", name: "Everyday Polo Shirt", category: "Casual Wear", price: 699, originalPrice: 999, rating: 4.1, isNew: false },
    { id: "p6", name: "Textured Henley Tee", category: "T-Shirts", price: 599, originalPrice: 899, rating: 4.0, isNew: true },
    { id: "p7", name: "Formal Check Shirt", category: "Shirts", price: 1149, originalPrice: 1599, rating: 4.5, isNew: false },
    { id: "p8", name: "Straight Fit Denim", category: "Jeans", price: 1399, originalPrice: null, rating: 4.3, isNew: false },
    { id: "p9", name: "Comfort Fit Trousers", category: "Trousers", price: 949, originalPrice: 1299, rating: 3.9, isNew: true },
    { id: "p10", name: "Weekend Overshirt", category: "Casual Wear", price: 1249, originalPrice: 1699, rating: 4.4, isNew: true },
    { id: "p11", name: "Linen Blend Shirt", category: "Shirts", price: 1199, originalPrice: null, rating: 4.2, isNew: false },
    { id: "p12", name: "Graphic Print Tee", category: "T-Shirts", price: 549, originalPrice: 799, rating: 4.0, isNew: false },
  ];

  const state = {
    filter: "all",
    sort: "popular",
    cart: [],       // { id, qty }
    wishlist: [],   // ids
    qvProduct: null,
    qvQty: 1,
  };

  const rupee = (n) => "\u20B9" + n.toLocaleString("en-IN");

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $all = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* ---------------------------------------------------------
     HEADER: sticky compact state + mobile menu + search
     --------------------------------------------------------- */
  const header = $("#siteHeader");
  const onScrollHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
    toggleBackToTop();
  };
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  const hamburgerBtn = $("#hamburgerBtn");
  const mobileMenu = $("#mobileMenu");
  const menuOverlay = $("#menuOverlay");

  function openMobileMenu() {
    mobileMenu.hidden = false;
    menuOverlay.hidden = false;
    hamburgerBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMobileMenu() {
    mobileMenu.hidden = true;
    menuOverlay.hidden = true;
    hamburgerBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  hamburgerBtn.addEventListener("click", () => {
    const isOpen = hamburgerBtn.getAttribute("aria-expanded") === "true";
    isOpen ? closeMobileMenu() : openMobileMenu();
  });
  menuOverlay.addEventListener("click", () => {
    closeMobileMenu();
    closePanels();
  });
  $all(".mobile-nav-link").forEach((link) => link.addEventListener("click", closeMobileMenu));

  /* Search */
  const searchToggle = $("#searchToggle");
  const searchPanel = $("#searchPanel");
  const searchInput = $("#searchInput");
  const searchClose = $("#searchClose");
  const searchResults = $("#searchResults");

  function openSearch() {
    searchPanel.hidden = false;
    searchToggle.setAttribute("aria-expanded", "true");
    searchInput.focus();
  }
  function closeSearch() {
    searchPanel.hidden = true;
    searchToggle.setAttribute("aria-expanded", "false");
    searchResults.hidden = true;
    searchInput.value = "";
  }
  searchToggle.addEventListener("click", () => {
    searchPanel.hidden ? openSearch() : closeSearch();
  });
  searchClose.addEventListener("click", closeSearch);

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      searchResults.hidden = true;
      return;
    }
    const matches = PRODUCTS.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    searchResults.hidden = false;
    if (!matches.length) {
      searchResults.innerHTML = '<p class="search-no-results">No products found for "' + escapeHtml(searchInput.value) + '".</p>';
      return;
    }
    searchResults.innerHTML = matches
      .slice(0, 6)
      .map((p) => `
        <a class="search-result-item" href="#shop" data-id="${p.id}">
          <span>${escapeHtml(p.name)}</span>
          <span>${rupee(p.price)}</span>
        </a>
      `)
      .join("");
  });
  searchResults.addEventListener("click", (e) => {
    const item = e.target.closest(".search-result-item");
    if (!item) return;
    e.preventDefault();
    closeSearch();
    document.querySelector("#shop").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => openQuickView(item.dataset.id), 400);
  });

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---------------------------------------------------------
     ACTIVE NAV LINK ON SCROLL
     --------------------------------------------------------- */
  const navLinks = $all(".nav-link");
  const sectionIds = navLinks.map((l) => l.getAttribute("href")).filter((h) => h.startsWith("#"));
  const sections = sectionIds.map((id) => document.querySelector(id)).filter(Boolean);

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("is-active"));
          const active = navLinks.find((l) => l.getAttribute("href") === "#" + entry.target.id);
          if (active) active.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );
  sections.forEach((s) => navObserver.observe(s));

  /* ---------------------------------------------------------
     SCROLL REVEAL
     --------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  function observeReveal(el) {
    el.classList.add("reveal");
    revealObserver.observe(el);
  }

  /* ---------------------------------------------------------
     PRODUCT CARD RENDERING
     --------------------------------------------------------- */
  function starString(rating) {
    const full = Math.round(rating);
    return "\u2605".repeat(full) + "\u2606".repeat(5 - full);
  }

  function productCardHtml(p) {
    const discount = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : null;
    const isWished = state.wishlist.includes(p.id);
    return `
      <article class="product-card" data-id="${p.id}" data-category="${p.category}">
        <div class="product-media">
          ${p.isNew ? '<span class="product-badge">New</span>' : ""}
          ${discount ? `<span class="product-badge badge-gold" style="${p.isNew ? "top:44px;" : ""}">-${discount}%</span>` : ""}
          <button type="button" class="wishlist-btn ${isWished ? "is-active" : ""}" data-action="wishlist" aria-label="${isWished ? "Remove from wishlist" : "Add to wishlist"}" aria-pressed="${isWished}">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.8-9.1C.6 8 2 4.6 5.3 3.8c2-.5 3.9.3 5 1.9 1.1-1.6 3-2.4 5-1.9 3.3.8 4.7 4.2 3.1 7.6C19.5 15.9 12 20.5 12 20.5z" stroke-width="1.6" stroke-linejoin="round"/></svg>
          </button>
          <div class="placeholder-label" aria-hidden="true">Product Image Placeholder</div>
          <button type="button" class="quickview-btn" data-action="quickview">Quick View</button>
        </div>
        <div class="product-info">
          <span class="demo-tag">Demo product</span>
          <h3 class="product-name">${escapeHtml(p.name)}</h3>
          <div class="product-rating"><span class="stars">${starString(p.rating)}</span><span>${p.rating.toFixed(1)}</span></div>
          <div class="product-price-row">
            <span class="price-current">${rupee(p.price)}</span>
            ${p.originalPrice ? `<span class="price-original">${rupee(p.originalPrice)}</span>` : ""}
            ${discount ? `<span class="price-discount">${discount}% off</span>` : ""}
          </div>
          <button type="button" class="add-to-cart-btn" data-action="add-to-cart">Add to Cart</button>
        </div>
      </article>
    `;
  }

  const productGrid = $("#productGrid");
  const productEmpty = $("#productEmpty");
  const newArrivalsGrid = $("#newArrivalsGrid");

  function getFilteredSorted() {
    let list = state.filter === "all" ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === state.filter);
    switch (state.sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      default: break; // popularity = original order
    }
    return list;
  }

  function renderProductGrid() {
    const list = getFilteredSorted();
    productGrid.innerHTML = list.map(productCardHtml).join("");
    productEmpty.hidden = list.length > 0;
    $all(".product-card", productGrid).forEach(observeReveal);
  }

  function renderNewArrivals() {
    const list = PRODUCTS.filter((p) => p.isNew);
    newArrivalsGrid.innerHTML = list.map(productCardHtml).join("");
  }

  renderProductGrid();
  renderNewArrivals();

  /* Filter chips */
  $all(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      $all(".filter-chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      state.filter = chip.dataset.filter;
      renderProductGrid();
    });
  });

  /* Sort */
  $("#sortSelect").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderProductGrid();
  });

  /* Category grid -> pre-filter shop section */
  $all(".category-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const cat = card.dataset.category;
      if (!cat || cat === "New Arrivals") return;
      e.preventDefault();
      const chip = $all(".filter-chip").find((c) => c.dataset.filter === cat) || $all('.filter-chip[data-filter="all"]')[0];
      chip.click();
      document.querySelector("#shop").scrollIntoView({ behavior: "smooth" });
    });
  });

  /* Delegate product card actions (grid + new arrivals) */
  function handleGridClick(e) {
    const card = e.target.closest(".product-card");
    if (!card) return;
    const id = card.dataset.id;
    const action = e.target.closest("[data-action]");
    if (!action) return;
    const type = action.dataset.action;
    if (type === "wishlist") toggleWishlist(id, action);
    if (type === "add-to-cart") addToCart(id, 1, action);
    if (type === "quickview") openQuickView(id);
  }
  productGrid.addEventListener("click", handleGridClick);
  newArrivalsGrid.addEventListener("click", handleGridClick);

  /* ---------------------------------------------------------
     WISHLIST
     --------------------------------------------------------- */
  function toggleWishlist(id, btn) {
    const idx = state.wishlist.indexOf(id);
    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      showToast("Removed from wishlist");
    } else {
      state.wishlist.push(id);
      showToast("Added to wishlist");
    }
    if (btn) {
      const active = state.wishlist.includes(id);
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    }
    updateWishlistUI();
  }

  function updateWishlistUI() {
    const count = state.wishlist.length;
    const badge = $("#wishlistCount");
    badge.hidden = count === 0;
    badge.textContent = String(count);

    const body = $("#wishlistBody");
    if (!count) {
      body.innerHTML = '<p class="panel-empty">Your wishlist is empty. Tap the heart icon on a product to save it here.</p>';
      return;
    }
    body.innerHTML = state.wishlist
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter(Boolean)
      .map(
        (p) => `
        <div class="wishlist-item" data-id="${p.id}">
          <div class="wishlist-item-media"></div>
          <div class="wishlist-item-info">
            <span class="item-name">${escapeHtml(p.name)}</span>
            <span>${rupee(p.price)}</span>
            <div class="cart-item-row">
              <button type="button" class="add-to-cart-btn" style="width:auto;padding:8px 14px;" data-action="move-to-cart">Add to Cart</button>
              <button type="button" class="remove-btn" data-action="remove-wishlist">Remove</button>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  $("#wishlistBody").addEventListener("click", (e) => {
    const item = e.target.closest(".wishlist-item");
    if (!item) return;
    const id = item.dataset.id;
    if (e.target.closest('[data-action="remove-wishlist"]')) {
      toggleWishlist(id, null);
    }
    if (e.target.closest('[data-action="move-to-cart"]')) {
      addToCart(id, 1, null);
    }
  });

  /* ---------------------------------------------------------
     CART
     --------------------------------------------------------- */
  function addToCart(id, qty, btn) {
    const existing = state.cart.find((c) => c.id === id);
    if (existing) existing.qty += qty;
    else state.cart.push({ id, qty });
    updateCartUI();
    showToast("Added to cart");
    if (btn) {
      btn.classList.add("is-added");
      const original = btn.textContent;
      btn.textContent = "Added ✓";
      setTimeout(() => {
        btn.classList.remove("is-added");
        btn.textContent = original;
      }, 1200);
    }
  }

  function removeFromCart(id) {
    state.cart = state.cart.filter((c) => c.id !== id);
    updateCartUI();
  }

  function changeCartQty(id, delta) {
    const item = state.cart.find((c) => c.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    updateCartUI();
  }

  function updateCartUI() {
    const count = state.cart.reduce((sum, c) => sum + c.qty, 0);
    const badge = $("#cartCount");
    badge.hidden = count === 0;
    badge.textContent = String(count);

    const body = $("#cartBody");
    if (!state.cart.length) {
      body.innerHTML = '<p class="panel-empty">Your cart is empty. Explore the collection and add something you like.</p>';
      $("#cartSubtotal").textContent = rupee(0);
      return;
    }
    let subtotal = 0;
    body.innerHTML = state.cart
      .map((c) => {
        const p = PRODUCTS.find((prod) => prod.id === c.id);
        if (!p) return "";
        subtotal += p.price * c.qty;
        return `
          <div class="cart-item" data-id="${p.id}">
            <div class="cart-item-media"></div>
            <div class="cart-item-info">
              <span class="item-name">${escapeHtml(p.name)}</span>
              <span>${rupee(p.price)}</span>
              <div class="cart-item-row">
                <div class="qty-control">
                  <button type="button" class="qty-btn" data-action="decrease" aria-label="Decrease quantity">&minus;</button>
                  <span class="qty-value">${c.qty}</span>
                  <button type="button" class="qty-btn" data-action="increase" aria-label="Increase quantity">+</button>
                </div>
                <button type="button" class="remove-btn" data-action="remove">Remove</button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
    $("#cartSubtotal").textContent = rupee(subtotal);
  }

  $("#cartBody").addEventListener("click", (e) => {
    const item = e.target.closest(".cart-item");
    if (!item) return;
    const id = item.dataset.id;
    if (e.target.closest('[data-action="increase"]')) changeCartQty(id, 1);
    if (e.target.closest('[data-action="decrease"]')) changeCartQty(id, -1);
    if (e.target.closest('[data-action="remove"]')) removeFromCart(id);
  });

  $("#checkoutBtn").addEventListener("click", () => {
    if (!state.cart.length) {
      showToast("Your cart is empty");
      return;
    }
    showToast("Checkout preview only — payments not yet connected");
  });

  updateWishlistUI();
  updateCartUI();

  /* ---------------------------------------------------------
     SIDE PANELS (cart / wishlist) open/close
     --------------------------------------------------------- */
  const panelOverlay = $("#panelOverlay");
  const cartPanel = $("#cartPanel");
  const wishlistPanel = $("#wishlistPanel");

  function openPanel(panel, toggleBtn) {
    closePanels();
    panel.hidden = false;
    panelOverlay.hidden = false;
    toggleBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closePanels() {
    cartPanel.hidden = true;
    wishlistPanel.hidden = true;
    panelOverlay.hidden = true;
    $("#cartToggle").setAttribute("aria-expanded", "false");
    $("#wishlistToggle").setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  $("#cartToggle").addEventListener("click", () => openPanel(cartPanel, $("#cartToggle")));
  $("#wishlistToggle").addEventListener("click", () => openPanel(wishlistPanel, $("#wishlistToggle")));
  $("#cartClose").addEventListener("click", closePanels);
  $("#wishlistClose").addEventListener("click", closePanels);
  panelOverlay.addEventListener("click", closePanels);

  /* ---------------------------------------------------------
     QUICK VIEW MODAL
     --------------------------------------------------------- */
  const qvModal = $("#quickViewModal");

  function openQuickView(id) {
    const p = PRODUCTS.find((prod) => prod.id === id);
    if (!p) return;
    state.qvProduct = p;
    state.qvQty = 1;
    $("#qvTitle").textContent = p.name;
    $("#qvPrice").textContent = rupee(p.price) + (p.originalPrice ? "  " : "");
    $("#qvQty").textContent = "1";
    $("#qvMedia").innerHTML = '<div class="product-media" style="aspect-ratio:3/4;"><div class="placeholder-label">Product Image Placeholder</div></div>';
    qvModal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeQuickView() {
    qvModal.hidden = true;
    document.body.style.overflow = "";
  }
  $("#qvClose").addEventListener("click", closeQuickView);
  qvModal.addEventListener("click", (e) => {
    if (e.target === qvModal) closeQuickView();
  });
  $("#qvQtyControl").addEventListener("click", (e) => {
    const btn = e.target.closest(".qty-btn");
    if (!btn) return;
    if (btn.dataset.action === "increase") state.qvQty++;
    if (btn.dataset.action === "decrease") state.qvQty = Math.max(1, state.qvQty - 1);
    $("#qvQty").textContent = String(state.qvQty);
  });
  $("#qvAddToCart").addEventListener("click", () => {
    if (!state.qvProduct) return;
    addToCart(state.qvProduct.id, state.qvQty, null);
    closeQuickView();
  });

  /* ---------------------------------------------------------
     FOOTER POLICY MODALS
     --------------------------------------------------------- */
  const POLICY_CONTENT = {
    shipping: {
      title: "Shipping",
      body: "Shipping details for RN FASHIONHUB will be published here once delivery partners and timelines are finalised.",
    },
    returns: {
      title: "Returns",
      body: "Our returns process will be listed here soon. For now, please contact the store directly for any return requests.",
    },
    privacy: {
      title: "Privacy Policy",
      body: "This privacy policy placeholder will be replaced with RN FASHIONHUB's full policy on how customer information is collected and used.",
    },
    terms: {
      title: "Terms & Conditions",
      body: "Terms and conditions for shopping with RN FASHIONHUB will be added here.",
    },
  };
  const policyModal = $("#policyModal");
  $all("[data-modal]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const content = POLICY_CONTENT[link.dataset.modal];
      if (!content) return;
      $("#modalTitle").textContent = content.title;
      $("#modalBody").textContent = content.body;
      policyModal.hidden = false;
    });
  });
  $("#modalClose").addEventListener("click", () => (policyModal.hidden = true));
  policyModal.addEventListener("click", (e) => {
    if (e.target === policyModal) policyModal.hidden = true;
  });

  /* Close any overlay-based UI with Escape */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeMobileMenu();
    closeSearch();
    closePanels();
    closeQuickView();
    policyModal.hidden = true;
  });

  /* ---------------------------------------------------------
     CONTACT FORM VALIDATION
     --------------------------------------------------------- */
  const contactForm = $("#contactForm");
  const formSuccess = $("#formSuccess");

  function setFieldError(fieldId, message) {
    const field = $("#" + fieldId);
    const errorEl = $("#" + fieldId + "Error");
    const row = field.closest(".form-row");
    if (message) {
      row.classList.add("has-error");
      errorEl.textContent = message;
    } else {
      row.classList.remove("has-error");
      errorEl.textContent = "";
    }
  }

  function validateContactForm() {
    let valid = true;
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const phone = $("#phone").value.trim();
    const message = $("#message").value.trim();

    if (!name) {
      setFieldError("name", "Please enter your name.");
      valid = false;
    } else setFieldError("name", "");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      setFieldError("email", "Please enter a valid email address.");
      valid = false;
    } else setFieldError("email", "");

    if (phone && !/^[0-9+\-\s()]{7,15}$/.test(phone)) {
      setFieldError("phone", "Please enter a valid phone number.");
      valid = false;
    } else setFieldError("phone", "");

    if (!message || message.length < 5) {
      setFieldError("message", "Please enter a short message (min. 5 characters).");
      valid = false;
    } else setFieldError("message", "");

    return valid;
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formSuccess.hidden = true;
    if (!validateContactForm()) return;

    // NOTE: no backend is connected yet. Wire this up to a real
    // endpoint (email service / CRM / API) when one is available.
    formSuccess.hidden = false;
    contactForm.reset();
    showToast("Message sent");
  });

  ["name", "email", "phone", "message"].forEach((id) => {
    $("#" + id).addEventListener("blur", validateContactForm);
  });

  /* ---------------------------------------------------------
     TOAST
     --------------------------------------------------------- */
  let toastTimer = null;
  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add("is-visible"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => (toast.hidden = true), 300);
    }, 2200);
  }

  /* ---------------------------------------------------------
     BACK TO TOP
     --------------------------------------------------------- */
  const backToTop = $("#backToTop");
  function toggleBackToTop() {
    const show = window.scrollY > 600;
    backToTop.hidden = false;
    backToTop.classList.toggle("is-visible", show);
    if (!show) setTimeout(() => { if (!backToTop.classList.contains("is-visible")) backToTop.hidden = true; }, 300);
  }
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------------------------------------------------------
     SCROLL REVEAL for static sections
     --------------------------------------------------------- */
  $all(".category-card, .feature-card").forEach(observeReveal);

  /* ---------------------------------------------------------
     LOADING STATE simulation for initial content
     (kept minimal since content renders client-side instantly;
     placeholder for future async product loading)
     --------------------------------------------------------- */
  window.addEventListener("load", () => {
    document.body.classList.add("is-loaded");
  });
})();
