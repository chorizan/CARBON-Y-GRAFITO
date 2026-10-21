document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalCotizacion");
  const form = document.getElementById("formCotizacion");
  const nav = document.getElementById("mainNav");

  const openModal = () => modal.classList.add("is-open");
  const closeModal = () => modal.classList.remove("is-open");

  document.getElementById("btnCotizacionHeader")?.addEventListener("click", openModal);
  document.getElementById("modalClose").addEventListener("click", closeModal);
  modal.querySelector(".modal__overlay").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const phone = form.dataset.whatsapp || "51914673502";
    const fd = new FormData(form);
    const text = [
      "Hola, solicito una cotización:",
      "",
      `Nombre: ${fd.get("nombre")?.toString().trim() || ""}`,
      `Correo: ${fd.get("email")?.toString().trim() || ""}`,
      `Teléfono: ${fd.get("telefono")?.toString().trim() || ""}`,
      "",
      "Requerimiento:",
      fd.get("mensaje")?.toString().trim() || "",
    ].join("\n");

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    form.reset();
    closeModal();
  });

  document.getElementById("menuToggle").addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });

  const impactSection = document.querySelector(".nosotros-impact");
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

  if (impactSection && impactValues.length) {
    let impactPlayed = false;
    const playImpact = () => {
      if (impactPlayed) return;
      impactPlayed = true;
      runImpactCounters();
    };

    const impactObserver = new IntersectionObserver(
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
  }
});
