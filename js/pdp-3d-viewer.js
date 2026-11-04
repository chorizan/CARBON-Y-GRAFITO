(function () {
  const THREE_SRC = "https://cdn.jsdelivr.net/npm/three@0.147.0/build/three.min.js";
  const SCALE = 0.02;

  let active = null;
  let loading = null;

  const loadThree = () => {
    if (window.THREE) return Promise.resolve(window.THREE);
    if (loading) return loading;
    loading = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = THREE_SRC;
      script.onload = () => resolve(window.THREE);
      script.onerror = () => {
        loading = null;
        reject(new Error("No se pudo cargar Three.js"));
      };
      document.head.appendChild(script);
    });
    return loading;
  };

  const setStatus = (container, text) => {
    let status = container.querySelector(".pdp-3d__status");
    if (!text) {
      status?.remove();
      return;
    }
    if (!status) {
      status = document.createElement("p");
      status.className = "pdp-3d__status";
      container.appendChild(status);
    }
    status.textContent = text;
  };

  const carbonTexture = (THREE) => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#26292d";
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 9000; i++) {
      const shade = 28 + Math.random() * 34;
      ctx.fillStyle = `rgba(${shade},${shade + 2},${shade + 4},${0.3 + Math.random() * 0.4})`;
      ctx.fillRect(Math.random() * size, Math.random() * size, 1.4, 1.4);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.encoding = THREE.sRGBEncoding;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  const buildCarbonBrush = (THREE, dims) => {
    const a = dims.a * SCALE;
    const b = dims.b * SCALE;
    const l = dims.l * SCALE;
    const group = new THREE.Group();

    const carbonMat = new THREE.MeshStandardMaterial({
      map: carbonTexture(THREE),
      roughness: 0.95,
      metalness: 0.05,
    });
    const steelMat = new THREE.MeshStandardMaterial({ color: 0xd4d9de, roughness: 0.3, metalness: 0.9 });
    const knurlMat = new THREE.MeshStandardMaterial({ color: 0xaeb5bc, roughness: 0.55, metalness: 0.9, flatShading: true });
    const copperMat = new THREE.MeshStandardMaterial({ color: 0xb5582a, roughness: 0.45, metalness: 0.9 });

    group.add(new THREE.Mesh(new THREE.BoxGeometry(a, l, b), carbonMat));

    const y = l * 0.3;
    const r = a * 0.2;
    const baseLen = a * 0.12;
    const knurlLen = a * 0.32;
    const tipLen = a * 0.12;
    let x = a / 2;

    const addCyl = (radius, length, material, segments) => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, segments), material);
      mesh.rotation.z = Math.PI / 2;
      mesh.position.set(x + length / 2, y, 0);
      group.add(mesh);
      x += length;
    };
    addCyl(r * 1.05, baseLen, steelMat, 32);
    addCyl(r * 1.2, knurlLen, knurlMat, 18);
    addCyl(r * 0.85, tipLen, steelMat, 32);

    const wireLen = l * 0.62;
    const start = new THREE.Vector3(x, y, 0);
    const end = new THREE.Vector3(x + wireLen, y, 0);
    const curve = new THREE.CatmullRomCurve3([
      start,
      new THREE.Vector3(x + wireLen * 0.35, y + l * 0.015, 0),
      new THREE.Vector3(x + wireLen * 0.7, y - l * 0.01, 0),
      end,
    ]);
    group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 48, r * 0.42, 10, false), copperMat));

    const lugNeck = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.55, r * 0.55, r * 1.4, 20), steelMat);
    lugNeck.rotation.z = Math.PI / 2;
    lugNeck.position.set(end.x + r * 0.7, y, 0);
    group.add(lugNeck);

    const ringR = r * 1.1;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(ringR, r * 0.38, 14, 32), steelMat);
    ring.position.set(end.x + r * 1.4 + ringR, y, 0);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    const box = new THREE.Box3().setFromObject(group);
    group.position.sub(box.getCenter(new THREE.Vector3()));
    const pivot = new THREE.Group();
    pivot.add(group);
    return pivot;
  };

  const buildRing = (THREE, dims) => {
    const outer = (dims.a || 80) * SCALE * 0.5;
    const inner = (dims.b || 40) * SCALE * 0.5;
    const height = (dims.l || 20) * SCALE;
    const shape = new THREE.Shape();
    shape.absarc(0, 0, outer, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, inner, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false, curveSegments: 48 });
    geometry.center();
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ map: carbonTexture(THREE), roughness: 0.9 }));
    mesh.rotation.x = Math.PI / 2;
    const pivot = new THREE.Group();
    pivot.add(mesh);
    return pivot;
  };

  const buildBlock = (THREE, dims) => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry((dims.b || 30) * SCALE, (dims.l || 40) * SCALE, (dims.a || 20) * SCALE),
      new THREE.MeshStandardMaterial({ map: carbonTexture(THREE), roughness: 0.9 })
    );
    const pivot = new THREE.Group();
    pivot.add(mesh);
    return pivot;
  };

  const bindDrag = (canvas, state) => {
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener("pointerdown", (e) => {
      dragging = true;
      state.auto = false;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      state.velY = (e.clientX - lastX) * 0.01;
      state.velX = (e.clientY - lastY) * 0.01;
      state.rotY += state.velY;
      state.rotX = Math.max(-1.3, Math.min(1.3, state.rotX + state.velX));
      lastX = e.clientX;
      lastY = e.clientY;
    });
    const stop = () => { dragging = false; };
    canvas.addEventListener("pointerup", stop);
    canvas.addEventListener("pointercancel", stop);
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      state.zoom = Math.max(0.5, Math.min(2.2, state.zoom * (e.deltaY > 0 ? 1.08 : 0.92)));
    }, { passive: false });
    canvas.addEventListener("dblclick", () => {
      state.rotX = 0.15;
      state.rotY = -0.35;
      state.zoom = 1;
      state.auto = true;
    });
    state.isDragging = () => dragging;
  };

  const dispose = () => {
    if (!active) return;
    cancelAnimationFrame(active.raf);
    active.resizeObserver.disconnect();
    active.scene.traverse((child) => {
      child.geometry?.dispose();
      if (child.material) {
        child.material.map?.dispose();
        child.material.dispose();
      }
    });
    active.renderer.dispose();
    active.renderer.domElement.remove();
    active = null;
  };

  const mount = async (container, options = {}) => {
    if (!container) return;
    dispose();
    setStatus(container, "Cargando modelo 3D…");

    let THREE;
    try {
      THREE = await loadThree();
    } catch (error) {
      setStatus(container, "No se pudo cargar el visor 3D. Revise su conexión a internet.");
      return;
    }
    setStatus(container, "");

    const dims = options.dims || { a: 16, b: 32, l: 50 };
    const category = options.category || "escobillas";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x8a9098, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 1.3);
    key.position.set(3, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xdbe6ff, 0.6);
    rim.position.set(-5, 2, -4);
    scene.add(rim);

    const model = category === "escobillas"
      ? buildCarbonBrush(THREE, dims)
      : category === "anillos" || category === "sellos"
        ? buildRing(THREE, dims)
        : buildBlock(THREE, dims);
    scene.add(model);

    const sphere = new THREE.Box3().setFromObject(model).getBoundingSphere(new THREE.Sphere());
    const baseDistance = sphere.radius / Math.sin((camera.fov * Math.PI) / 360) * 1.1;

    const state = { rotX: 0.15, rotY: -0.35, velX: 0, velY: 0, zoom: 1, auto: true };
    bindDrag(renderer.domElement, state);

    const resize = () => {
      const width = container.clientWidth || 600;
      const height = container.clientHeight || 400;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const tick = () => {
      if (!state.isDragging()) {
        if (state.auto) state.rotY += 0.006;
        else {
          state.velX *= 0.92;
          state.velY *= 0.92;
          state.rotY += state.velY;
          state.rotX = Math.max(-1.3, Math.min(1.3, state.rotX + state.velX));
        }
      }
      model.rotation.set(state.rotX, state.rotY, 0);
      camera.position.set(0, 0, baseDistance * state.zoom);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      active.raf = requestAnimationFrame(tick);
    };

    active = { scene, renderer, resizeObserver, raf: 0 };
    tick();
  };

  window.Pdp3dViewer = { mountPdp3dViewer: mount, disposePdp3dViewer: dispose };
})();
