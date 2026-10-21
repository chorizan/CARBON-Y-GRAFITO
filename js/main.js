document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalCotizacion");
  const form = document.getElementById("formCotizacion");
  const nav = document.getElementById("mainNav");
  const navNosotros = document.getElementById("mainNavNosotros");
  const navProductos = document.getElementById("mainNavProductos");
  const viewInicio = document.getElementById("view-inicio");
  const viewNosotros = document.getElementById("nosotros");
  const viewProductos = document.getElementById("view-productos");
  const slides = [...document.querySelectorAll(".home__slide")];
  const currentEl = document.getElementById("slideCurrent");
  const quoteButtons = ["btnCotizacionHeader", "btnSolicitarPieza"];

  let index = 0;
  let timer;
  let impactPlayed = false;
  let impactObserver;

  const openModal = () => modal.classList.add("is-open");
  const closeModal = () => modal.classList.remove("is-open");

  quoteButtons.forEach((id) => {
    document.getElementById(id)?.addEventListener("click", openModal);
  });

  document.querySelectorAll("[data-open-modal='cotizacion']").forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  document.getElementById("modalClose").addEventListener("click", closeModal);
  modal.querySelector(".modal__overlay").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  const buildWhatsAppQuoteUrl = (phone, data) => {
    const text = [
      "Hola, solicito una cotización:",
      "",
      `Nombre: ${data.nombre}`,
      `Correo: ${data.email}`,
      `Teléfono: ${data.telefono}`,
      "",
      "Requerimiento:",
      data.mensaje,
    ].join("\n");
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const phone = form.dataset.whatsapp || "51914673502";
    const fd = new FormData(form);
    const url = buildWhatsAppQuoteUrl(phone, {
      nombre: fd.get("nombre")?.toString().trim() || "",
      email: fd.get("email")?.toString().trim() || "",
      telefono: fd.get("telefono")?.toString().trim() || "",
      mensaje: fd.get("mensaje")?.toString().trim() || "",
    });

    window.open(url, "_blank", "noopener,noreferrer");
    form.reset();
    closeModal();
  });

  document.querySelectorAll("[data-nav-toggle]").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const headerNav = toggle.closest(".header")?.querySelector(".nav");
      headerNav?.classList.toggle("is-open");
    });
  });

  document.getElementById("menuToggle")?.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });

  const showSlide = (next) => {
    if (!slides.length) return;
    slides[index].classList.remove("is-active");
    index = (next + slides.length) % slides.length;
    slides[index].classList.add("is-active");
    if (currentEl) currentEl.textContent = String(index + 1).padStart(2, "0");
  };

  const startTimer = () => {
    clearInterval(timer);
    if (!slides.length) return;
    timer = setInterval(() => showSlide(index + 1), 8000);
  };

  const stopTimer = () => clearInterval(timer);

  document.getElementById("slidePrev")?.addEventListener("click", () => {
    showSlide(index - 1);
    startTimer();
  });

  document.getElementById("slideNext")?.addEventListener("click", () => {
    showSlide(index + 1);
    startTimer();
  });

  startTimer();

  const setActiveNav = (view) => {
    document.querySelectorAll(".nav__link").forEach((link) => {
      const linkView = link.dataset.view;
      const href = link.getAttribute("href");
      const isActive =
        (view === "nosotros" && (linkView === "nosotros" || href === "#nosotros")) ||
        (view === "productos" && (linkView === "productos" || href === "#productos" || href?.startsWith("#productos/"))) ||
        (view === "inicio" && href === "#inicio");
      link.classList.toggle("nav__link--active", isActive);
    });
  };

  const resetImpactCounters = () => {
    impactPlayed = false;
    impactObserver?.disconnect();
    viewNosotros?.querySelectorAll(".nosotros-impact__value[data-count]").forEach((el) => {
      el.textContent = "+0";
    });
  };

  const setupImpactCounters = () => {
    const impactSection = viewNosotros?.querySelector(".nosotros-impact");
    const impactValues = impactSection
      ? [...impactSection.querySelectorAll(".nosotros-impact__value[data-count]")]
      : [];

    const formatImpact = (value) =>
      `+${new Intl.NumberFormat("es-PE").format(value)}`;

    const animateImpactValue = (el, target, delay) =>
      new Promise((resolve) => {
        const duration = 1600;
        const startAt = performance.now() + delay;

        const tick = (now) => {
          if (now < startAt) {
            requestAnimationFrame(tick);
            return;
          }

          const progress = Math.min((now - startAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = formatImpact(Math.round(target * eased));

          if (progress < 1) {
            requestAnimationFrame(tick);
            return;
          }

          el.textContent = formatImpact(target);
          resolve();
        };

        requestAnimationFrame(tick);
      });

    const runImpactCounters = () =>
      Promise.all(
        impactValues.map((el) => {
          const target = Number(el.dataset.count);
          if (!Number.isFinite(target)) return Promise.resolve();
          return animateImpactValue(el, target, 0);
        })
      );

    if (!impactSection || !impactValues.length) return;

    const playImpact = () => {
      if (impactPlayed) return;
      impactPlayed = true;
      runImpactCounters();
    };

    impactObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          playImpact();
          observer.disconnect();
        });
      },
      { threshold: 0.35 }
    );

    impactObserver.observe(impactSection);
    if (impactSection.getBoundingClientRect().top < window.innerHeight * 0.92) {
      playImpact();
      impactObserver.disconnect();
    }
  };

  const showView = (view, { scrollTarget = null, replaceHash = true, category = null, product } = {}) => {
    const isNosotros = view === "nosotros";
    const isProductos = view === "productos";

    viewInicio.hidden = isNosotros || isProductos;
    viewNosotros.hidden = !isNosotros;
    if (viewProductos) viewProductos.hidden = !isProductos;
    viewInicio.classList.toggle("is-active", !isNosotros && !isProductos);
    viewNosotros.classList.toggle("is-active", isNosotros);
    viewProductos?.classList.toggle("is-active", isProductos);
    document.body.classList.toggle("is-nosotros", isNosotros);
    document.body.classList.toggle("is-productos", isProductos);

    nav?.classList.remove("is-open");
    navNosotros?.classList.remove("is-open");
    navProductos?.classList.remove("is-open");

    if (isNosotros) {
      stopTimer();
      window.CatalogApp?.closeProduct?.();
      window.scrollTo(0, 0);
      if (replaceHash) history.replaceState(null, "", "#nosotros");
      setActiveNav("nosotros");
      resetImpactCounters();
      setupImpactCounters();
      return;
    }

    if (isProductos) {
      stopTimer();
      window.scrollTo(0, 0);
      setActiveNav("productos");
      window.CatalogApp?.initCatalog?.();
      window.CatalogApp?.initProductPage?.();

      const hashProduct = location.hash.startsWith("#productos/")
        ? decodeURIComponent(location.hash.slice("#productos/".length))
        : null;
      const productKey = typeof product === "string" && product
        ? product
        : (product === undefined ? hashProduct : null);

      if (productKey) {
        const opened = window.CatalogApp?.openProductPage?.(decodeURIComponent(productKey), { replaceHash });
        if (opened) return;
      }

      window.CatalogApp?.showCatalogPage?.();
      if (replaceHash) history.replaceState(null, "", "#productos");
      if (category) window.CatalogApp?.setCatalogCategory?.(category);
      return;
    }

    startTimer();
    window.CatalogApp?.closeProduct?.();
    setActiveNav("inicio");

    if (replaceHash) {
      history.replaceState(null, "", scrollTarget ? scrollTarget : "#inicio");
    }

    if (scrollTarget && scrollTarget.startsWith("#") && !["#inicio", "#nosotros", "#productos"].includes(scrollTarget)) {
      requestAnimationFrame(() => {
        document.querySelector(scrollTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-view], a[href^='#']");
    if (!trigger) return;

    const href = trigger.getAttribute("href");
    const view = trigger.dataset.view;

    if (view === "nosotros" || href === "#nosotros") {
      e.preventDefault();
      showView("nosotros");
      return;
    }

    if (href && href.startsWith("#productos/")) {
      e.preventDefault();
      showView("productos", { product: decodeURIComponent(href.slice("#productos/".length)) });
      return;
    }

    if (view === "productos" || href === "#productos") {
      e.preventDefault();
      showView("productos", { category: trigger.dataset.category || null, product: null });
      return;
    }

    if (href === "#inicio") {
      e.preventDefault();
      showView("inicio");
      return;
    }

    if (view === "inicio" && href && href.startsWith("#")) {
      e.preventDefault();
      showView("inicio", { scrollTarget: href });
      return;
    }

    if (!viewInicio.hidden && href && href.startsWith("#") && href !== "#nosotros" && href !== "#productos") {
      const section = document.querySelector(href);
      if (section && viewInicio.contains(section)) {
        e.preventDefault();
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        nav?.classList.remove("is-open");
        navNosotros?.classList.remove("is-open");
      }
    }
  });

  window.addEventListener("hashchange", () => {
    if (location.hash === "#nosotros") {
      showView("nosotros", { replaceHash: false });
      return;
    }
    if (location.hash.startsWith("#productos/")) {
      showView("productos", { replaceHash: false, product: decodeURIComponent(location.hash.slice("#productos/".length)) });
      return;
    }
    if (location.hash === "#productos") {
      showView("productos", { replaceHash: false });
      return;
    }
    if (!location.hash || location.hash === "#inicio") {
      showView("inicio", { replaceHash: false });
    }
  });

  if (location.hash === "#nosotros") {
    showView("nosotros", { replaceHash: false });
  } else if (location.hash.startsWith("#productos")) {
    showView("productos", { replaceHash: false });
  } else {
    showView("inicio", { replaceHash: false });
  }

  const statsSection = document.getElementById("homeStats");
  const statValues = statsSection
    ? [...statsSection.querySelectorAll(".home-stats__value")]
    : [];

  const formatStat = (value) => new Intl.NumberFormat("es-PE").format(value);

  const STAT_DURATION = 1400;

  const animateStat = (el, target, delay = 0, duration = STAT_DURATION) =>
    new Promise((resolve) => {
      const startAt = performance.now() + delay;

      const tick = (now) => {
        if (now < startAt) {
          requestAnimationFrame(tick);
          return;
        }

        const progress = Math.min((now - startAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = formatStat(Math.round(target * eased));

        if (progress < 1) {
          requestAnimationFrame(tick);
          return;
        }

        el.textContent = formatStat(target);
        resolve();
      };

      requestAnimationFrame(tick);
    });

  const runStats = () => {
    const animations = statValues.map((el) => {
      const target = Number(el.dataset.count);
      if (!Number.isFinite(target)) return Promise.resolve();
      return animateStat(el, target, 0, STAT_DURATION);
    });
    return Promise.all(animations);
  };

  if (statsSection && statValues.length) {
    let statsPlayed = false;
    const playStats = () => {
      if (statsPlayed) return;
      statsPlayed = true;
      runStats();
    };

    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          playStats();
          observer.disconnect();
        });
      },
      { threshold: 0.35 }
    );
    statsObserver.observe(statsSection);
    if (statsSection.getBoundingClientRect().top < window.innerHeight * 0.9) {
      playStats();
      statsObserver.disconnect();
    }
  }

  const links = document.querySelectorAll("#view-inicio .nav__link:not(.nav__link--dropdown)");
  const sections = ["inicio", "esencia", "contacto"];

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;
    const observer = new IntersectionObserver((entries) => {
      if (viewInicio.hidden) return;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("nav__link--active", link.getAttribute("href") === `#${id}`);
        });
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    observer.observe(section);
  });
});
