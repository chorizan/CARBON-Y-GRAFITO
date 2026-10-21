const CATALOG = {
  pageSize: 4,
  page: 1,
  search: "",
  sort: "relevant",
  category: "todos",
};

const CATEGORY_LABELS = {
  todos: "Todos",
  escobillas: "Escobillas",
  sellos: "Sellos y bocinas",
  anillos: "Anillos rozantes",
  portaescobillas: "Portaescobillas",
  especiales: "Productos especiales",
};

const APPLICATION_LABELS = {
  motores: "Motores eléctricos",
  generadores: "Generadores",
  equipos: "Equipos industriales",
  bombas: "Bombas",
  transmision: "Sistemas de transmisión",
  otros: "Otros",
};

const MATERIAL_LABELS = {
  carbon: "Carbón",
  grafito: "Grafito",
  combinado: "Combinado",
};

const STOCK_LABELS = {
  todos: "Todos",
  stock: "En stock",
  pedido: "A pedido",
};

const CATALOG_PRODUCTS = [
  { id: "eg-14", code: "EG-14", name: "Escobilla de carbón", category: "escobillas", application: "motores", material: "carbon", stock: "stock", image: "assets/catalog-escobilla-carbon.jpg", desc: "Para motores eléctricos y generadores." },
  { id: "eg-25", code: "EG-25", name: "Escobilla industrial", category: "escobillas", application: "generadores", material: "carbon", stock: "stock", image: "assets/catalog-escobilla-industrial.jpg", desc: "Alta resistencia al desgaste." },
  { id: "eg-32", code: "EG-32", name: "Escobilla con resorte", category: "escobillas", application: "motores", material: "carbon", stock: "stock", image: "assets/catalog-escobilla-resorte.jpg", desc: "Para aplicaciones de alta rotación." },
  { id: "bg-01", code: "BG-01", name: "Bocina de grafito", category: "sellos", application: "bombas", material: "grafito", stock: "stock", image: "assets/catalog-bocina-grafito.jpg", desc: "Para alta temperatura y corrientes exigentes." },
];

const filteredProducts = () => {
  const query = CATALOG.search.trim().toLowerCase();

  const items = CATALOG_PRODUCTS.filter((item) => {
    if (CATALOG.category !== "todos" && item.category !== CATALOG.category) return false;
    if (query) {
      const haystack = `${item.name} ${item.code} ${item.desc} ${CATEGORY_LABELS[item.category]}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  if (CATALOG.sort === "name") {
    items.sort((a, b) => a.name.localeCompare(b.name, "es"));
  } else if (CATALOG.sort === "code") {
    items.sort((a, b) => a.code.localeCompare(b.code, "es"));
  }

  return items;
};

const renderChips = () => {
  const chips = document.getElementById("catalogChips");
  if (!chips) return;

  chips.innerHTML = Object.entries(CATEGORY_LABELS).map(([value, label]) => `
    <button type="button" class="catalog-chip${CATALOG.category === value ? " is-active" : ""}" data-category="${value}">${label}</button>
  `).join("");
};

const renderCatalog = () => {
  const grid = document.getElementById("catalogGrid");
  const count = document.getElementById("catalogCount");
  const pages = document.getElementById("catalogPages");
  if (!grid) return;

  const items = filteredProducts();
  const totalPages = Math.max(1, Math.ceil(items.length / CATALOG.pageSize));
  CATALOG.page = Math.min(CATALOG.page, totalPages);
  const start = (CATALOG.page - 1) * CATALOG.pageSize;
  const visible = items.slice(start, start + CATALOG.pageSize);
  const from = items.length ? start + 1 : 0;
  const to = start + visible.length;

  count.textContent = `Mostrando ${from}-${to} de ${items.length} productos`;

  grid.innerHTML = visible.length
    ? visible.map((item) => `
      <article class="catalog-card">
        <button class="catalog-card__media" type="button" data-open-product="${item.id}" aria-label="Ver ${item.name}">
          <img src="${item.image}" alt="${item.name}">
        </button>
        <div class="catalog-card__body">
          <p class="catalog-card__cat">${CATEGORY_LABELS[item.category]}</p>
          <h3>${item.name}</h3>
          <p class="catalog-card__desc">${item.desc}</p>
          <div class="catalog-card__foot">
            <span>Cód. ${item.code}</span>
            <button type="button" data-open-product="${item.id}">
              Ver producto
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>
        </div>
      </article>
    `).join("")
    : `<p class="catalog-empty">No encontramos productos. Prueba otra búsqueda o categoría.</p>`;

  const buttons = [];
  for (let i = 1; i <= totalPages; i += 1) {
    buttons.push(`<button type="button" class="catalog-page${i === CATALOG.page ? " is-active" : ""}" data-page="${i}">${i}</button>`);
  }
  if (CATALOG.page < totalPages) {
    buttons.push(`<button type="button" class="catalog-page catalog-page--next" data-page="${CATALOG.page + 1}" aria-label="Siguiente">›</button>`);
  }
  pages.innerHTML = items.length && totalPages > 1 ? buttons.join("") : "";
};

const openProduct = (id) => {
  window.CatalogApp?.openProductPage?.(id);
};

const closeProduct = () => {
  window.CatalogApp?.closeProductPage?.();
};

const setCatalogCategory = (category) => {
  CATALOG.category = CATEGORY_LABELS[category] ? category : "todos";
  CATALOG.page = 1;
  renderChips();
  renderCatalog();
};

const initCatalog = () => {
  const root = document.getElementById("view-productos");
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "true";

  renderChips();
  renderCatalog();

  root.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-category]");
    if (chip && chip.classList.contains("catalog-chip")) {
      setCatalogCategory(chip.dataset.category);
      return;
    }

    const pageBtn = e.target.closest("[data-page]");
    if (pageBtn) {
      CATALOG.page = Number(pageBtn.dataset.page);
      renderCatalog();
      document.querySelector(".catalog-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const productBtn = e.target.closest("[data-open-product]");
    if (productBtn) {
      e.preventDefault();
      openProduct(productBtn.dataset.openProduct);
    }
  });

  root.addEventListener("change", (e) => {
    const input = e.target;
    if (!(input instanceof HTMLSelectElement)) return;

    if (input.id === "catalogSort") {
      CATALOG.sort = input.value;
      CATALOG.page = 1;
      renderCatalog();
    }
  });

  document.getElementById("catalogSearch")?.addEventListener("input", (e) => {
    CATALOG.search = e.target.value;
    CATALOG.page = 1;
    renderCatalog();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    document.getElementById("modalZoom")?.classList.remove("is-open");
    document.getElementById("modal3d")?.classList.remove("is-open");
  });
};

window.CatalogApp = { initCatalog, setCatalogCategory, closeProduct };
