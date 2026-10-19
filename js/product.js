const FEATURE_ICONS = {
  wear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l7 3v6c0 5-3.4 8.4-7 9-3.6-.6-7-4-7-9V6l7-3z"/></svg>',
  thermal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 14.76V5a2 2 0 10-4 0v9.76a4 4 0 104 0z"/></svg>',
  conductivity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M13 2L4 14h7l-1 8 10-14h-7l0-6z"/></svg>',
  sizes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 6H3M21 12H8M21 18H12"/></svg>',
  chemical: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 3h6M10 3v5.4L5.2 16a4 4 0 003.4 6h6.8a4 4 0 003.4-6L14 8.4V3"/></svg>',
  custom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8 2 2 0 11-2.8 2.8 1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.2a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3 2 2 0 11-2.8-2.8 1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.2a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8 2 2 0 112.8-2.8 1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.2a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3 2 2 0 112.8 2.8 1.7 1.7 0 00-.3 1.8V9c.3.6.9 1 1.5 1H21a2 2 0 110 4h-.2a1.7 1.7 0 00-1.5 1z"/></svg>',
};

const CATEGORY_GALLERY = {
  escobillas: [
    "assets/catalog-escobilla-carbon.jpg",
    "assets/catalog-escobilla-single.jpg",
    "assets/catalog-escobilla-angle.jpg",
    "assets/catalog-escobilla-industrial.jpg",
    "assets/catalog-escobilla-resorte.jpg",
  ],
  sellos: ["assets/catalog-bocina-grafito.jpg", "assets/catalog-sello-mecanico.jpg"],
  anillos: ["assets/catalog-anillo-rozante.jpg", "assets/catalog-anillo-segmentado.jpg"],
  portaescobillas: ["assets/catalog-portaescobillas.jpg"],
  especiales: [
    "assets/catalog-placa-grafito.jpg",
    "assets/catalog-barra-grafito.jpg",
    "assets/catalog-bloque-grafito.jpg",
    "assets/catalog-pieza-mecanizada.jpg",
  ],
};

const PRODUCT_RECORDS = {
  "eg-14": {
    slug: "escobilla-de-carbon-eg-14",
    longDesc: "Escobilla de carbón de alta calidad, diseñada para motores eléctricos y generadores, con excelente desempeño en condiciones de alta exigencia.",
    features: [
      ["wear", "Alta resistencia al desgaste"],
      ["thermal", "Estabilidad térmica"],
      ["conductivity", "Excelente conductividad"],
      ["sizes", "Disponible en diferentes medidas"],
    ],
    medidas: [{ code: "EG-14", a: 12, b: 25, l: 40 }],
    especificaciones: {
      Material: "Carbón / Grafito de alta pureza",
      Densidad: "1,6 – 1,8 g/cm³",
      Dureza: "Media – Alta",
      "Temperatura de trabajo": "Hasta 350 °C",
      "Tipo de terminal": "Cable de cobre trenzado",
      Aplicación: "Motores eléctricos, generadores, equipos industriales",
    },
    aplicaciones: ["Motores eléctricos industriales", "Generadores", "Equipos de tracción"],
    material: "Carbón y grafito de alta pureza, seleccionado para baja fricción y buena conmutación.",
    modelo3d: true,
  },
  "eg-25": {
    slug: "escobilla-industrial-eg-25",
    longDesc: "Escobilla industrial de carbón para servicio continuo, con alta resistencia al desgaste en generadores y máquinas de mayor régimen.",
    features: [
      ["wear", "Alta resistencia al desgaste"],
      ["thermal", "Estabilidad en operación continua"],
      ["conductivity", "Buena conmutación"],
      ["sizes", "Medidas estándar y especiales"],
    ],
    medidas: [{ code: "EG-25", a: 16, b: 32, l: 50 }],
    especificaciones: {
      Material: "Carbón industrial",
      Densidad: "1,7 – 1,8 g/cm³",
      Dureza: "Alta",
      "Temperatura de trabajo": "Hasta 320 °C",
      "Tipo de terminal": "Cable de cobre trenzado",
      Aplicación: "Generadores e industria pesada",
    },
    aplicaciones: ["Generadores", "Turbinas", "Maquinaria industrial"],
    material: "Grado de carbón de alta densidad para desgaste controlado.",
    modelo3d: true,
  },
  "eg-32": {
    slug: "escobilla-con-resorte-eg-32",
    longDesc: "Escobilla con resorte para aplicaciones de alta rotación, con presión constante sobre el colector.",
    features: [
      ["wear", "Contacto constante"],
      ["thermal", "Estabilidad térmica"],
      ["conductivity", "Excelente conductividad"],
      ["sizes", "Resorte según especificación"],
    ],
    medidas: [{ code: "EG-32", a: 10, b: 20, l: 32 }],
    especificaciones: {
      Material: "Carbón con resorte de cobre",
      Densidad: "1,6 – 1,7 g/cm³",
      Dureza: "Media",
      "Temperatura de trabajo": "Hasta 280 °C",
      "Tipo de terminal": "Resorte y cable de cobre",
      Aplicación: "Motores de alta rotación",
    },
    aplicaciones: ["Motores eléctricos", "Herramientas rotativas"],
    material: "Carbón de grado motor con resorte metálico.",
    modelo3d: true,
  },
};

const CATEGORY_DEFAULTS = {
  escobillas: {
    features: [
      ["wear", "Alta resistencia al desgaste"],
      ["thermal", "Estabilidad térmica"],
      ["conductivity", "Excelente conductividad"],
      ["sizes", "Disponible en diferentes medidas"],
    ],
    especificaciones: {
      Material: "Carbón / Grafito",
      "Tipo de terminal": "Cable de cobre trenzado",
    },
    material: "Carbón y grafito para conmutación eléctrica.",
    modelo3d: true,
  },
  sellos: {
    features: [
      ["thermal", "Resistencia a alta temperatura"],
      ["chemical", "Excelente resistencia química"],
      ["wear", "Baja fricción"],
      ["custom", "Medidas según equipo"],
    ],
    especificaciones: {
      Material: "Grafito / Carbón",
      "Temperatura de trabajo": "Hasta 400 °C",
    },
    material: "Grafito de alta densidad para sellado y deslizamiento.",
  },
  anillos: {
    features: [
      ["conductivity", "Transmisión estable de corriente"],
      ["wear", "Larga vida útil"],
      ["thermal", "Estabilidad dimensional"],
      ["custom", "Diseño estándar o segmentado"],
    ],
    especificaciones: {
      Material: "Grafito / Cobre-grafito",
    },
    material: "Grafito o combinación cobre-grafito según corriente.",
    modelo3d: true,
  },
  portaescobillas: {
    features: [
      ["custom", "Diseño estándar y personalizado"],
      ["wear", "Soporte preciso de la escobilla"],
      ["conductivity", "Buen contacto eléctrico"],
      ["sizes", "Simple o doble"],
    ],
    especificaciones: {
      Material: "Bronce / aleación con aislación",
    },
    material: "Cuerpo metálico con aislación según diseño.",
    modelo3d: true,
  },
  especiales: {
    features: [
      ["custom", "Fabricación según plano o muestra"],
      ["thermal", "Alta resistencia térmica"],
      ["chemical", "Estabilidad química"],
      ["sizes", "Dimensiones a medida"],
    ],
    especificaciones: {
      Material: "Grafito / Carbón",
    },
    material: "Grafito industrial para mecanizado y piezas especiales.",
  },
};

const unique = (items) => [...new Set(items.filter(Boolean))];

const slugify = (item) =>
  `${item.name}-${item.code}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const galleryFor = (item) => {
  const extras = CATEGORY_GALLERY[item.category] || [];
  return unique([item.image, ...extras]).slice(0, 5);
};

const relatedFor = (item) => {
  const same = CATALOG_PRODUCTS.filter((product) => product.id !== item.id && product.category === item.category);
  const more = CATALOG_PRODUCTS.filter((product) => product.id !== item.id && product.category !== item.category);
  return unique([...same, ...more].map((product) => product.id)).slice(0, 4);
};

const getProduct = (key) => {
  const item = CATALOG_PRODUCTS.find((product) => product.id === key || product.slug === key || slugify(product) === key);
  if (!item) return null;

  const record = PRODUCT_RECORDS[item.id] || {};
  const defaults = CATEGORY_DEFAULTS[item.category] || {};

  return {
    ...item,
    slug: record.slug || slugify(item),
    longDesc: record.longDesc || `${item.name}. ${item.desc} Fabricación y suministro según requerimiento industrial.`,
    images: record.images || galleryFor(item),
    features: record.features || defaults.features || [],
    medidas: record.medidas || [],
    especificaciones: record.especificaciones || defaults.especificaciones || {},
    aplicaciones: record.aplicaciones || [APPLICATION_LABELS[item.application]].filter(Boolean),
    materialText: record.material || defaults.material || MATERIAL_LABELS[item.material],
    descargas: record.descargas || [],
    modelo3d: Boolean(record.modelo3d ?? defaults.modelo3d),
    related: record.related || relatedFor(item),
    precio: record.precio ?? null,
  };
};

const findProductKey = (key) => getProduct(key)?.id;

const arrowSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const quoteButton = (label = "Solicitar cotización") => `
  <button class="btn btn--primary pdp-quote__btn" type="button" data-open-modal="cotizacion">
    ${label}
    ${arrowSvg}
  </button>
`;

const techDrawing = (product) => {
  if (!product.medidas.length) {
    return `<div class="pdp-drawing pdp-drawing--empty"><p>Las dimensiones se definen según plano o muestra.</p></div>`;
  }

  const { a, b, l } = product.medidas[0];
  if (product.category === "anillos" || product.category === "sellos") {
    return `
      <svg class="pdp-drawing" viewBox="0 0 320 180" aria-hidden="true">
        <circle cx="110" cy="90" r="48" fill="none" stroke="#1b2430" stroke-width="8"/>
        <circle cx="110" cy="90" r="18" fill="none" stroke="#1b2430" stroke-width="6"/>
        <path d="M58 90h-16M178 90h16" stroke="#8b97a8" />
        <text x="110" y="168" text-anchor="middle" fill="#8b97a8" font-size="11">Ø A ${a} · B ${b} · L ${l}</text>
      </svg>
    `;
  }

  return `
    <svg class="pdp-drawing" viewBox="0 0 360 210" aria-hidden="true">
      <rect x="88" y="70" width="70" height="92" rx="2" fill="#2b3038"/>
      <path d="M108 70 V34 M138 70 V28" stroke="#c4a07a" stroke-width="1.8"/>
      <path d="M104 28 h12 M134 22 h12" stroke="#9aa3ad" stroke-width="1.6"/>
      <path d="M86 70 V162 M86 162 H160" stroke="#9aa3ad" stroke-width="1"/>
      <path d="M82 70 H90 M82 162 H90 M86 166 V158 M160 166 V158" stroke="#9aa3ad" stroke-width="1"/>
      <text x="123" y="184" text-anchor="middle" fill="#7b8694" font-size="12">A</text>
      <text x="74" y="120" text-anchor="end" fill="#7b8694" font-size="12">L</text>
      <rect x="230" y="78" width="26" height="84" rx="2" fill="#2b3038"/>
      <path d="M230 166 H256 M243 166 V174" stroke="#9aa3ad" stroke-width="1"/>
      <text x="243" y="190" text-anchor="middle" fill="#7b8694" font-size="12">B</text>
    </svg>
  `;
};

const renderTabs = (product, tab) => {
  const specsRows = Object.entries(product.especificaciones)
    .map(([label, value]) => `<div><strong>${label}</strong><span>${value}</span></div>`)
    .join("");

  const measureRows = product.medidas.map((row) => `
    <tr>
      <td>${row.code}</td>
      <td>${row.a}</td>
      <td>${row.b}</td>
      <td>${row.l}</td>
    </tr>
  `).join("");

  const panels = {
    especificaciones: `
      <p class="pdp-spec__kicker">Dimensiones estándar (mm)</p>
      ${techDrawing(product)}
      ${product.medidas.length ? `
        <table class="pdp-table">
          <thead><tr><th>Código</th><th>A (mm)</th><th>B (mm)</th><th>L (mm)</th></tr></thead>
          <tbody>${measureRows}</tbody>
        </table>
        <p class="pdp-spec__note">* También fabricamos medidas especiales según requerimiento.</p>
      ` : `<p class="pdp-spec__note">Las medidas se confirman según plano, muestra o requerimiento.</p>`}
      ${specsRows ? `<p class="pdp-spec__kicker">Especificaciones técnicas</p><div class="pdp-specs">${specsRows}</div>` : ""}
    `,
    aplicaciones: `
      <ul class="pdp-apps">${product.aplicaciones.map((item) => `<li>${item}</li>`).join("")}</ul>
    `,
    material: `
      <p class="pdp-material">${product.materialText}</p>
    `,
    descargas: product.descargas.length
      ? `<ul class="pdp-apps">${product.descargas.map((file) => `<li>${file}</li>`).join("")}</ul>`
      : `<p class="pdp-material">No hay archivos cargados para este ítem. Puede solicitar la ficha técnica al cotizar.</p>`,
  };

  return panels[tab] || panels.especificaciones;
};

const PDP = {
  product: null,
  imageIndex: 0,
  tab: "especificaciones",
};

const bindQuoteButtons = (root) => {
  root.querySelectorAll("[data-open-modal='cotizacion']").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("modalCotizacion")?.classList.add("is-open");
    });
  });
};

const setQuoteMessage = (product) => {
  const message = document.querySelector("#formCotizacion textarea[name='mensaje']");
  if (message) {
    message.placeholder = `Necesito cotizar ${product.name} (cód. ${product.code}).`;
  }
};

const renderProductPage = () => {
  const page = document.getElementById("productPage");
  const product = PDP.product;
  if (!page || !product) return;

  const image = product.images[PDP.imageIndex] || product.image;
  const related = product.related.map((id) => getProduct(id)).filter(Boolean);

  page.innerHTML = `
    <div class="pdp__inner">
      <nav class="pdp-crumb" aria-label="Miga de pan">
        <a href="#inicio" data-view="inicio">Inicio</a>
        <span>/</span>
        <a href="#productos" data-view="productos">Productos</a>
        <span>/</span>
        <a href="#productos" data-view="productos" data-category="${product.category}">${CATEGORY_LABELS[product.category]}</a>
        <span>/</span>
        <strong>${product.name} ${product.code}</strong>
      </nav>

      <div class="pdp__grid">
        <section class="pdp-gallery">
          <div class="pdp-thumbs">
            <button type="button" class="pdp-thumbs__nav" data-gallery-step="-1" aria-label="Miniatura anterior">⌃</button>
            <div class="pdp-thumbs__list">
              ${product.images.map((src, index) => `
                <button type="button" class="pdp-thumb${index === PDP.imageIndex ? " is-active" : ""}" data-gallery-index="${index}">
                  <img src="${src}" alt="">
                </button>
              `).join("")}
            </div>
            <button type="button" class="pdp-thumbs__nav" data-gallery-step="1" aria-label="Miniatura siguiente">⌄</button>
          </div>
          <div class="pdp-stage">
            <button class="pdp-stage__arrow pdp-stage__arrow--prev" type="button" data-gallery-step="-1" aria-label="Anterior">‹</button>
            <button class="pdp-stage__photo" type="button" data-zoom-image>
              <img src="${image}" alt="${product.name}">
            </button>
            <button class="pdp-stage__arrow pdp-stage__arrow--next" type="button" data-gallery-step="1" aria-label="Siguiente">›</button>
            ${product.modelo3d ? `<button class="pdp-3d-btn" type="button" data-open-3d>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/></svg>
              Vista 3D
            </button>` : ""}
          </div>
        </section>

        <section class="pdp-info">
          <p class="pdp-info__cat">${CATEGORY_LABELS[product.category]}</p>
          <h1 class="pdp-info__title">${product.name}<br>${product.code}</h1>
          <p class="pdp-info__lead">${product.longDesc}</p>
          <ul class="pdp-features">
            ${product.features.map(([icon, text]) => `<li>${FEATURE_ICONS[icon] || ""}${text}</li>`).join("")}
          </ul>
          <div class="pdp-meta">
            <div><em>Código</em><strong>${product.code}</strong></div>
            <div><em>Categoría</em><strong>${CATEGORY_LABELS[product.category]}</strong></div>
          </div>
          <div class="pdp-quote">
            <p class="pdp-quote__title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/></svg>
              Solicita tu cotización
            </p>
            <p>El precio varía según medida, cantidad y aplicación.</p>
            ${quoteButton()}
          </div>
        </section>

        <aside class="pdp-side">
          <div class="pdp-tabs" role="tablist">
            <button type="button" class="${PDP.tab === "especificaciones" ? "is-active" : ""}" data-pdp-tab="especificaciones">Especificaciones</button>
            <button type="button" class="${PDP.tab === "aplicaciones" ? "is-active" : ""}" data-pdp-tab="aplicaciones">Aplicaciones</button>
            <button type="button" class="${PDP.tab === "material" ? "is-active" : ""}" data-pdp-tab="material">Material</button>
            <button type="button" class="${PDP.tab === "descargas" ? "is-active" : ""}" data-pdp-tab="descargas">Descargas</button>
          </div>
          <div class="pdp-panel">${renderTabs(product, PDP.tab)}</div>
          <article class="pdp-custom">
            <span class="pdp-custom__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>
            </span>
            <h2>¿Necesitas una medida especial?</h2>
            <p>Fabricamos escobillas según plano o muestra.</p>
            ${quoteButton("Solicitar pieza personalizada")}
          </article>
        </aside>
      </div>

      ${related.length ? `
        <section class="pdp-related">
          <h2>Productos relacionados</h2>
          <div class="pdp-related__grid">
            ${related.map((item) => `
              <button class="pdp-related__card" type="button" data-open-product="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div>
                  <strong>${item.name}</strong>
                  <span>Cód. ${item.code}</span>
                </div>
                <i>${arrowSvg}</i>
              </button>
            `).join("")}
          </div>
        </section>
      ` : ""}
    </div>
  `;

  bindQuoteButtons(page);
};

const showCatalogPage = () => {
  document.getElementById("catalogMain")?.removeAttribute("hidden");
  const page = document.getElementById("productPage");
  if (page) page.hidden = true;
  document.body.classList.remove("is-ficha");
};

const openProductPage = (key, { replaceHash = true } = {}) => {
  const product = getProduct(key);
  const page = document.getElementById("productPage");
  if (!product || !page) return false;

  PDP.product = product;
  PDP.imageIndex = 0;
  PDP.tab = "especificaciones";

  document.getElementById("catalogMain")?.setAttribute("hidden", "");
  page.hidden = false;
  document.body.classList.add("is-ficha");
  renderProductPage();
  setQuoteMessage(product);
  window.scrollTo(0, 0);

  if (replaceHash) {
    history.replaceState(null, "", `#productos/${product.slug}`);
  }
  return true;
};

const closeProductPage = () => {
  PDP.product = null;
  showCatalogPage();
};

const stepGallery = (step) => {
  if (!PDP.product) return;
  const total = PDP.product.images.length;
  PDP.imageIndex = (PDP.imageIndex + step + total) % total;
  renderProductPage();
};

const openZoom = () => {
  if (!PDP.product) return;
  const modal = document.getElementById("modalZoom");
  const image = document.getElementById("pdpZoomImage");
  if (!modal || !image) return;
  image.src = PDP.product.images[PDP.imageIndex];
  image.alt = PDP.product.name;
  modal.classList.add("is-open");
};

const open3d = () => {
  if (!PDP.product?.modelo3d) return;
  const modal = document.getElementById("modal3d");
  const image = document.getElementById("pdp3dImage");
  if (!modal || !image) return;
  image.src = PDP.product.images[PDP.imageIndex];
  image.alt = `${PDP.product.name} vista 3D`;
  modal.classList.add("is-open");
};

const initProductPage = () => {
  const page = document.getElementById("productPage");
  if (!page || page.dataset.ready) return;
  page.dataset.ready = "true";

  page.addEventListener("click", (e) => {
    const thumb = e.target.closest("[data-gallery-index]");
    if (thumb) {
      PDP.imageIndex = Number(thumb.dataset.galleryIndex);
      renderProductPage();
      return;
    }

    const step = e.target.closest("[data-gallery-step]");
    if (step) {
      stepGallery(Number(step.dataset.galleryStep));
      return;
    }

    if (e.target.closest("[data-zoom-image]")) {
      openZoom();
      return;
    }

    if (e.target.closest("[data-open-3d]")) {
      open3d();
      return;
    }

    const tab = e.target.closest("[data-pdp-tab]");
    if (tab) {
      PDP.tab = tab.dataset.pdpTab;
      renderProductPage();
      return;
    }

    const related = e.target.closest("[data-open-product]");
    if (related) {
      openProductPage(related.dataset.openProduct);
    }
  });

  document.querySelectorAll("[data-close-zoom]").forEach((el) => {
    el.addEventListener("click", () => document.getElementById("modalZoom")?.classList.remove("is-open"));
  });
  document.querySelectorAll("[data-close-3d]").forEach((el) => {
    el.addEventListener("click", () => document.getElementById("modal3d")?.classList.remove("is-open"));
  });

  document.getElementById("pdp3dPrev")?.addEventListener("click", () => {
    stepGallery(-1);
    const image = document.getElementById("pdp3dImage");
    if (image && PDP.product) image.src = PDP.product.images[PDP.imageIndex];
  });
  document.getElementById("pdp3dNext")?.addEventListener("click", () => {
    stepGallery(1);
    const image = document.getElementById("pdp3dImage");
    if (image && PDP.product) image.src = PDP.product.images[PDP.imageIndex];
  });
};

window.CatalogApp = {
  ...window.CatalogApp,
  getProduct,
  findProductKey,
  openProductPage,
  closeProductPage,
  showCatalogPage,
  initProductPage,
};
