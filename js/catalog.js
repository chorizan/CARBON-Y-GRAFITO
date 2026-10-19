const CATALOG = {
  pageSize: 12,
  page: 1,
  search: "",
  sort: "relevant",
  category: "todos",
  applications: new Set(),
  materials: new Set(),
  stock: "todos",
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
  { id: "sm-03", code: "SM-03", name: "Sello mecánico de grafito", category: "sellos", application: "equipos", material: "grafito", stock: "stock", image: "assets/catalog-sello-mecanico.jpg", desc: "Excelente resistencia química." },
  { id: "ar-01", code: "AR-01", name: "Anillo rozante de grafito", category: "anillos", application: "generadores", material: "grafito", stock: "stock", image: "assets/catalog-anillo-rozante.jpg", desc: "Estabilidad y larga vida útil." },
  { id: "ar-25", code: "AR-25", name: "Anillo segmentado", category: "anillos", application: "transmision", material: "combinado", stock: "stock", image: "assets/catalog-anillo-segmentado.jpg", desc: "Para transmisión de corriente." },
  { id: "pe-01", code: "PE-01", name: "Portaescobillas", category: "portaescobillas", application: "motores", material: "combinado", stock: "stock", image: "assets/catalog-portaescobillas.jpg", desc: "Diseño estándar y personalizado." },
  { id: "pg-12", code: "PG-12", name: "Placa de grafito", category: "especiales", application: "otros", material: "grafito", stock: "pedido", image: "assets/catalog-placa-grafito.jpg", desc: "Fabricación según plano o requerimiento." },
  { id: "bg-08", code: "BG-08", name: "Barra de grafito", category: "especiales", application: "equipos", material: "grafito", stock: "stock", image: "assets/catalog-barra-grafito.jpg", desc: "Diferentes dimensiones y grados." },
  { id: "bl-04", code: "BL-04", name: "Bloque de grafito", category: "especiales", application: "equipos", material: "grafito", stock: "stock", image: "assets/catalog-bloque-grafito.jpg", desc: "Para mecanizado industrial." },
  { id: "pm-07", code: "PM-07", name: "Pieza mecanizada", category: "especiales", application: "otros", material: "grafito", stock: "pedido", image: "assets/catalog-pieza-mecanizada.jpg", desc: "Fabricación según muestra o plano." },
  { id: "eg-18", code: "EG-18", name: "Escobilla para turbina", category: "escobillas", application: "generadores", material: "carbon", stock: "stock", image: "assets/catalog-escobilla-industrial.jpg", desc: "Estabilidad en operación continua." },
  { id: "eg-41", code: "EG-41", name: "Escobilla de tracción", category: "escobillas", application: "transmision", material: "carbon", stock: "pedido", image: "assets/catalog-escobilla-carbon.jpg", desc: "Diseñada para equipos de tracción." },
  { id: "eg-09", code: "EG-09", name: "Escobilla auxiliar", category: "escobillas", application: "equipos", material: "carbon", stock: "stock", image: "assets/catalog-escobilla-resorte.jpg", desc: "Formato compacto para motores menores." },
  { id: "eg-55", code: "EG-55", name: "Escobilla de alta corriente", category: "escobillas", application: "motores", material: "combinado", stock: "stock", image: "assets/catalog-escobilla-carbon.jpg", desc: "Conductividad elevada y baja fricción." },
  { id: "eg-27", code: "EG-27", name: "Escobilla compacta", category: "escobillas", application: "motores", material: "carbon", stock: "stock", image: "assets/catalog-escobilla-industrial.jpg", desc: "Ideal para espacios reducidos." },
  { id: "bg-14", code: "BG-14", name: "Bocina de carbón", category: "sellos", application: "bombas", material: "carbon", stock: "stock", image: "assets/catalog-bocina-grafito.jpg", desc: "Baja fricción para ejes rotativos." },
  { id: "sm-11", code: "SM-11", name: "Sello de alta temperatura", category: "sellos", application: "equipos", material: "grafito", stock: "pedido", image: "assets/catalog-sello-mecanico.jpg", desc: "Para ambientes térmicos exigentes." },
  { id: "bg-22", code: "BG-22", name: "Bocina de precisión", category: "sellos", application: "bombas", material: "grafito", stock: "stock", image: "assets/catalog-bocina-grafito.jpg", desc: "Tolerancias ajustadas para sellado." },
  { id: "sm-08", code: "SM-08", name: "Sello de cara plana", category: "sellos", application: "equipos", material: "combinado", stock: "stock", image: "assets/catalog-sello-mecanico.jpg", desc: "Cierre estable y larga duración." },
  { id: "ar-12", code: "AR-12", name: "Anillo rozante compacto", category: "anillos", application: "motores", material: "grafito", stock: "stock", image: "assets/catalog-anillo-rozante.jpg", desc: "Formato reducido para motores." },
  { id: "ar-33", code: "AR-33", name: "Anillo de alta velocidad", category: "anillos", application: "generadores", material: "grafito", stock: "pedido", image: "assets/catalog-anillo-rozante.jpg", desc: "Balanceado para alta rotación." },
  { id: "ar-08", code: "AR-08", name: "Anillo para grúa", category: "anillos", application: "equipos", material: "combinado", stock: "stock", image: "assets/catalog-anillo-segmentado.jpg", desc: "Resistente a cargas cíclicas." },
  { id: "ar-19", code: "AR-19", name: "Anillo de cobre-grafito", category: "anillos", application: "transmision", material: "combinado", stock: "stock", image: "assets/catalog-anillo-segmentado.jpg", desc: "Mayor conductividad eléctrica." },
  { id: "pe-16", code: "PE-16", name: "Portaescobillas doble", category: "portaescobillas", application: "generadores", material: "combinado", stock: "stock", image: "assets/catalog-portaescobillas.jpg", desc: "Soporte para dos escobillas." },
  { id: "pe-09", code: "PE-09", name: "Portaescobillas de bronce", category: "portaescobillas", application: "motores", material: "combinado", stock: "pedido", image: "assets/catalog-portaescobillas.jpg", desc: "Cuerpo metálico de alta durabilidad." },
  { id: "pe-28", code: "PE-28", name: "Portaescobillas industrial", category: "portaescobillas", application: "equipos", material: "combinado", stock: "stock", image: "assets/catalog-portaescobillas.jpg", desc: "Para maquinaria pesada." },
  { id: "pg-20", code: "PG-20", name: "Placa isostática", category: "especiales", application: "equipos", material: "grafito", stock: "pedido", image: "assets/catalog-placa-grafito.jpg", desc: "Alta densidad y uniformidad." },
  { id: "cr-05", code: "CR-05", name: "Crisol de grafito", category: "especiales", application: "otros", material: "grafito", stock: "stock", image: "assets/catalog-bloque-grafito.jpg", desc: "Para procesos de alta temperatura." },
  { id: "el-11", code: "EL-11", name: "Electrodo de grafito", category: "especiales", application: "otros", material: "grafito", stock: "stock", image: "assets/catalog-barra-grafito.jpg", desc: "Conductividad y resistencia térmica." },
  { id: "pm-18", code: "PM-18", name: "Pieza según plano", category: "especiales", application: "otros", material: "grafito", stock: "pedido", image: "assets/catalog-pieza-mecanizada.jpg", desc: "Mecanizado a medida del cliente." },
];

const checkbox = (name, value, label, checked) => `
  <label class="catalog-check">
    <input type="checkbox" name="${name}" value="${value}" ${checked ? "checked" : ""}>
    <span>${label}</span>
  </label>
`;

const filteredProducts = () => {
  const query = CATALOG.search.trim().toLowerCase();

  const items = CATALOG_PRODUCTS.filter((item) => {
    if (CATALOG.category !== "todos" && item.category !== CATALOG.category) return false;
    if (CATALOG.applications.size && !CATALOG.applications.has(item.application)) return false;
    if (CATALOG.materials.size && !CATALOG.materials.has(item.material)) return false;
    if (CATALOG.stock !== "todos" && item.stock !== CATALOG.stock) return false;
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

const renderFilters = () => {
  const chips = document.getElementById("catalogChips");
  const categoryBox = document.getElementById("filterCategory");
  const applicationBox = document.getElementById("filterApplication");
  const materialBox = document.getElementById("filterMaterial");
  const stockBox = document.getElementById("filterStock");
  if (!chips || !categoryBox) return;

  chips.innerHTML = Object.entries(CATEGORY_LABELS).map(([value, label]) => `
    <button type="button" class="catalog-chip${CATALOG.category === value ? " is-active" : ""}" data-category="${value}">${label}</button>
  `).join("");

  categoryBox.innerHTML = Object.entries(CATEGORY_LABELS)
    .map(([value, label]) => checkbox("category", value, label, CATALOG.category === value))
    .join("");

  applicationBox.innerHTML = Object.entries(APPLICATION_LABELS)
    .map(([value, label]) => checkbox("application", value, label, CATALOG.applications.has(value)))
    .join("");

  materialBox.innerHTML = Object.entries(MATERIAL_LABELS)
    .map(([value, label]) => checkbox("material", value, label, CATALOG.materials.has(value)))
    .join("");

  stockBox.innerHTML = Object.entries(STOCK_LABELS)
    .map(([value, label]) => checkbox("stock", value, label, CATALOG.stock === value))
    .join("");
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
    : `<p class="catalog-empty">No encontramos productos con esos filtros. Prueba limpiar la búsqueda.</p>`;

  const buttons = [];
  for (let i = 1; i <= totalPages; i += 1) {
    buttons.push(`<button type="button" class="catalog-page${i === CATALOG.page ? " is-active" : ""}" data-page="${i}">${i}</button>`);
  }
  if (CATALOG.page < totalPages) {
    buttons.push(`<button type="button" class="catalog-page catalog-page--next" data-page="${CATALOG.page + 1}" aria-label="Siguiente">›</button>`);
  }
  pages.innerHTML = items.length ? buttons.join("") : "";
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
  renderFilters();
  renderCatalog();
};

const resetCatalog = () => {
  CATALOG.page = 1;
  CATALOG.search = "";
  CATALOG.sort = "relevant";
  CATALOG.category = "todos";
  CATALOG.applications = new Set();
  CATALOG.materials = new Set();
  CATALOG.stock = "todos";
  const search = document.getElementById("catalogSearch");
  const sort = document.getElementById("catalogSort");
  if (search) search.value = "";
  if (sort) sort.value = "relevant";
  renderFilters();
  renderCatalog();
};

const initCatalog = () => {
  const root = document.getElementById("view-productos");
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "true";

  renderFilters();
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
    if (!(input instanceof HTMLInputElement) && !(input instanceof HTMLSelectElement)) return;

    if (input.id === "catalogSort") {
      CATALOG.sort = input.value;
      CATALOG.page = 1;
      renderCatalog();
      return;
    }

    if (input.name === "category") {
      setCatalogCategory(input.value);
      return;
    }

    if (input.name === "application") {
      if (input.checked) CATALOG.applications.add(input.value);
      else CATALOG.applications.delete(input.value);
      CATALOG.page = 1;
      renderCatalog();
      return;
    }

    if (input.name === "material") {
      if (input.checked) CATALOG.materials.add(input.value);
      else CATALOG.materials.delete(input.value);
      CATALOG.page = 1;
      renderCatalog();
      return;
    }

    if (input.name === "stock") {
      CATALOG.stock = input.checked ? input.value : "todos";
      CATALOG.page = 1;
      renderFilters();
      renderCatalog();
    }
  });

  document.getElementById("catalogSearch")?.addEventListener("input", (e) => {
    CATALOG.search = e.target.value;
    CATALOG.page = 1;
    renderCatalog();
  });

  document.getElementById("catalogClear")?.addEventListener("click", resetCatalog);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    document.getElementById("modalZoom")?.classList.remove("is-open");
    document.getElementById("modal3d")?.classList.remove("is-open");
  });
};

window.CatalogApp = { initCatalog, setCatalogCategory, resetCatalog, closeProduct };
