import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const canvasTexture = (size, draw, { color = true } = {}) => {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  draw(canvas.getContext("2d"), size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  if (color) texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const speckle = (ctx, size, base, light, dark, count) => {
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < count; i += 1) {
    ctx.fillStyle = Math.random() > 0.5 ? light : dark;
    const r = Math.random() * 1.4 + 0.3;
    ctx.fillRect(Math.random() * size, Math.random() * size, r, r);
  }
};

const braid = (ctx, size, base, strand, shine) => {
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);
  const step = size / 8;
  ctx.lineWidth = step * 0.42;
  ctx.lineCap = "round";
  for (let dir = -1; dir <= 1; dir += 2) {
    for (let i = -8; i < 16; i += 1) {
      const x = i * step;
      ctx.strokeStyle = strand;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + dir * size, size);
      ctx.stroke();
      ctx.strokeStyle = shine;
      ctx.lineWidth = step * 0.12;
      ctx.beginPath();
      ctx.moveTo(x + step * 0.08, 0);
      ctx.lineTo(x + step * 0.08 + dir * size, size);
      ctx.stroke();
      ctx.lineWidth = step * 0.42;
    }
  }
};

const knurl = (ctx, size) => {
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);
  const step = size / 6;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = step * 0.3;
  for (let dir = -1; dir <= 1; dir += 2) {
    for (let i = -6; i < 12; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * step, 0);
      ctx.lineTo(i * step + dir * size, size);
      ctx.stroke();
    }
  }
};

let sharedMaterials = null;

const materials = () => {
  if (sharedMaterials) return sharedMaterials;

  const carbonMap = canvasTexture(512, (ctx, s) => speckle(ctx, s, "#2c2d30", "#45474c", "#1a1b1d", 9000));
  const carbonBump = canvasTexture(512, (ctx, s) => speckle(ctx, s, "#808080", "#b0b0b0", "#3a3a3a", 9000), { color: false });
  const graphiteMap = canvasTexture(512, (ctx, s) => speckle(ctx, s, "#34363a", "#44464b", "#26272a", 5000));
  const braidMap = canvasTexture(256, (ctx, s) => braid(ctx, s, "#7a3d1f", "#c9774a", "#f0b08a"));
  const braidBump = canvasTexture(256, (ctx, s) => braid(ctx, s, "#202020", "#a0a0a0", "#ffffff"), { color: false });
  const knurlBump = canvasTexture(128, knurl, { color: false });

  sharedMaterials = {
    carbon: new THREE.MeshStandardMaterial({ map: carbonMap, bumpMap: carbonBump, bumpScale: 0.6, roughness: 0.92, metalness: 0.04 }),
    graphite: new THREE.MeshStandardMaterial({ map: graphiteMap, bumpMap: carbonBump, bumpScale: 0.25, roughness: 0.68, metalness: 0.12 }),
    copper: new THREE.MeshStandardMaterial({ color: 0xd8875a, roughness: 0.3, metalness: 1 }),
    braid: new THREE.MeshStandardMaterial({ map: braidMap, bumpMap: braidBump, bumpScale: 0.8, roughness: 0.38, metalness: 0.9 }),
    nickel: new THREE.MeshStandardMaterial({ color: 0xd2d5d9, roughness: 0.26, metalness: 1 }),
    knurl: new THREE.MeshStandardMaterial({ color: 0xc8ccd1, bumpMap: knurlBump, bumpScale: 1.2, roughness: 0.32, metalness: 1 }),
  };
  return sharedMaterials;
};

const textureFor = (material, repeatU, repeatV) => {
  const clone = material.clone();
  ["map", "bumpMap"].forEach((key) => {
    if (!material[key]) return;
    clone[key] = material[key].clone();
    clone[key].repeat.set(repeatU, repeatV);
    clone[key].needsUpdate = true;
  });
  return clone;
};

const mesh = (geometry, material) => {
  const item = new THREE.Mesh(geometry, material);
  item.castShadow = true;
  item.receiveShadow = true;
  return item;
};

class HelixCurve extends THREE.Curve {
  constructor({ radius, height, turns, phase = 0, flare = 0 }) {
    super();
    Object.assign(this, { radius, height, turns, phase, flare });
  }

  getPoint(t, target = new THREE.Vector3()) {
    const angle = this.phase + t * this.turns * Math.PI * 2;
    const r = this.radius * (1 + this.flare * t ** 4);
    return target.set(Math.cos(angle) * r, t * this.height, Math.sin(angle) * r);
  }
}

const carbonBlock = (width, height, depth) => {
  const { carbon } = materials();
  const block = mesh(
    new RoundedBoxGeometry(width, height, depth, 4, Math.min(width, height, depth) * 0.04),
    textureFor(carbon, Math.max(width, depth) / 14, height / 14),
  );
  block.position.y = height / 2;
  return block;
};

const twistedCable = (length, radius) => {
  const { copper } = materials();
  const group = new THREE.Group();
  const strand = radius * 0.32;
  group.add(mesh(new THREE.CylinderGeometry(radius * 0.55, radius * 0.55, length, 16).translate(0, length / 2, 0), copper));
  const rings = [
    { count: 6, r: radius * 0.45 },
    { count: 12, r: radius * 0.78 },
  ];
  rings.forEach(({ count, r }, ringIndex) => {
    for (let i = 0; i < count; i += 1) {
      const curve = new HelixCurve({
        radius: r,
        height: length,
        turns: length / (radius * 7) * (ringIndex ? 1 : -1),
        phase: (i / count) * Math.PI * 2,
        flare: 0.22,
      });
      group.add(mesh(new THREE.TubeGeometry(curve, 120, strand, 6), copper));
    }
  });
  return group;
};

const braidedCable = (curve, radius, length) => {
  const { braid } = materials();
  return mesh(new THREE.TubeGeometry(curve, 120, radius, 16), textureFor(braid, length / 1.6, 1));
};

const ringTerminal = (barrelLength, barrelRadius, ringRadius, holeRadius, thickness) => {
  const { nickel } = materials();
  const group = new THREE.Group();

  const barrel = mesh(new THREE.CylinderGeometry(barrelRadius, barrelRadius * 0.92, barrelLength, 24), nickel);
  barrel.rotation.z = Math.PI / 2;
  barrel.position.x = barrelLength / 2;
  group.add(barrel);

  const shape = new THREE.Shape();
  const neck = barrelRadius * 0.85;
  const cx = barrelLength + ringRadius * 1.25;
  shape.moveTo(barrelLength * 0.9, -neck);
  shape.lineTo(cx - ringRadius * 0.6, -neck);
  shape.absarc(cx, 0, ringRadius, Math.PI + 0.55, Math.PI - 0.55, false);
  shape.lineTo(barrelLength * 0.9, neck);
  shape.closePath();
  const hole = new THREE.Path();
  hole.absarc(cx, 0, holeRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const plate = mesh(
    new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: true, bevelSize: 0.15, bevelThickness: 0.15, bevelSegments: 2, curveSegments: 40 }),
    nickel,
  );
  plate.position.z = -thickness / 2;
  group.add(plate);
  return group;
};

const coilSpring = (coilRadius, height, turns, wire) => {
  const { copper } = materials();
  const curve = new HelixCurve({ radius: coilRadius, height, turns });
  const group = new THREE.Group();
  group.add(mesh(new THREE.TubeGeometry(curve, turns * 48, wire, 10), copper));
  [0, height].forEach((y) => {
    const ring = mesh(new THREE.TorusGeometry(coilRadius, wire, 10, 48), copper);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = y;
    group.add(ring);
  });
  return group;
};

const brushTopLead = ({ a, b, l }) => {
  const group = new THREE.Group();
  group.add(carbonBlock(b, l, a));
  const cable = twistedCable(l * 0.85, Math.min(a, b) * 0.17);
  cable.position.y = l - 0.6;
  group.add(cable);
  return group;
};

const brushSideTerminal = ({ a, b, l }) => {
  const { nickel, knurl } = materials();
  const group = new THREE.Group();
  group.add(carbonBlock(a, l, b));

  const y = l - l * 0.17;
  const base = a / 2;
  const parts = [
    { length: 1.6, radius: 3.4, material: nickel },
    { length: 5.2, radius: 3.6, material: textureFor(knurl, 14, 3) },
    { length: 2.2, radius: 2.7, material: nickel },
  ];
  let x = base;
  parts.forEach(({ length, radius, material }) => {
    const part = mesh(new THREE.CylinderGeometry(radius, radius, length, 40), material);
    part.rotation.z = Math.PI / 2;
    part.position.set(x + length / 2, y, 0);
    group.add(part);
    x += length;
  });

  const cableLength = a * 1.25;
  const curve = new THREE.LineCurve3(new THREE.Vector3(x - 0.5, y, 0), new THREE.Vector3(x + cableLength, y, 0));
  group.add(braidedCable(curve, 1.15, cableLength));

  const terminal = ringTerminal(4.2, 1.55, 3.4, 1.7, 0.8);
  terminal.position.set(x + cableLength - 0.8, y, 0);
  group.add(terminal);
  return group;
};

const brushSpring = ({ a, b, l }) => {
  const { copper } = materials();
  const group = new THREE.Group();
  const block = carbonBlock(l, a, b);
  group.add(block);

  const springRadius = b * 0.16;
  const springX = -l * 0.24;
  const springZ = b * 0.14;
  const spring = coilSpring(springRadius, l * 0.44, 10, 0.42);
  spring.position.set(springX, a, springZ);
  group.add(spring);

  const flat = 0.38;
  const lift = 0.9;
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(springX + springRadius * 0.6, 0, springZ),
    new THREE.Vector3(-l * 0.02, 0, springZ - b * 0.02),
    new THREE.Vector3(l * 0.22, 0, -b * 0.12),
    new THREE.Vector3(l * 0.38, 0, -b * 0.24),
  ]);
  const shunt = braidedCable(curve, 1.6, curve.getLength());
  shunt.scale.y = flat;
  shunt.position.y = a + lift * flat;
  group.add(shunt);

  const crimp = mesh(new RoundedBoxGeometry(4, 2.4, 3.8, 3, 0.4), copper);
  const end = curve.getPoint(1);
  crimp.position.set(end.x + 1.2, a + 1.2, end.z);
  crimp.rotation.y = 0.45;
  group.add(crimp);
  return group;
};

const bushing = ({ outer = 15, inner = 10, height = 40 } = {}) => {
  const { graphite } = materials();
  const c = 0.5;
  const profile = [
    [inner + c, 0], [outer - c, 0], [outer, c], [outer, height - c],
    [outer - c, height], [inner + c, height], [inner, height - c], [inner, c], [inner + c, 0],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const geometry = new THREE.LatheGeometry(profile, 120);
  return mesh(geometry, textureFor(graphite, 6, height / 12));
};

const MODEL_BUILDERS = {
  "eg-14": brushTopLead,
  "eg-25": brushSideTerminal,
  "eg-32": brushSpring,
  "bg-01": () => bushing({ outer: 15, inner: 10, height: 40 }),
};

const CATEGORY_BUILDERS = {
  escobillas: brushTopLead,
  sellos: () => bushing({ outer: 15, inner: 10, height: 30 }),
  anillos: () => bushing({ outer: 30, inner: 22, height: 14 }),
};

const buildModel = (product) => {
  const dims = product.medidas?.[0] || { a: 12, b: 25, l: 40 };
  const builder = MODEL_BUILDERS[product.id] || CATEGORY_BUILDERS[product.category] || (({ a, b, l }) => {
    const group = new THREE.Group();
    group.add(carbonBlock(b, l, a));
    return group;
  });
  const model = builder(dims);
  return model.isGroup ? model : new THREE.Group().add(model);
};

const disposeObject = (object) => {
  object.traverse((child) => {
    if (!child.isMesh) return;
    child.geometry.dispose();
    const shared = Object.values(sharedMaterials || {});
    if (!shared.includes(child.material)) {
      child.material.map?.dispose();
      child.material.bumpMap?.dispose();
      child.material.dispose();
    }
  });
};

class ProductViewer {
  constructor(container) {
    this.container = container;
    this.modal = container.closest(".modal");
    this.pendingTurn = 0;
    this.frame = 0;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.className = "pdp-3d__canvas";
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 0.85;
    pmrem.dispose();

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xd9dee5, 0.6));
    this.sun = new THREE.DirectionalLight(0xffffff, 1.6);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.radius = 6;
    this.sun.shadow.bias = -0.0004;
    this.scene.add(this.sun, this.sun.target);

    this.ground = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShadowMaterial({ opacity: 0.16 }));
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);

    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 5000);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.autoRotateSpeed = 1.6;
    this.controls.maxPolarAngle = Math.PI * 0.82;
    this.controls.addEventListener("start", () => this.setAutoRotate(false));

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.tick = this.tick.bind(this);
  }

  load(product) {
    if (this.model) {
      this.scene.remove(this.model);
      disposeObject(this.model);
    }

    this.model = buildModel(product);
    const box = new THREE.Box3().setFromObject(this.model);
    const center = box.getCenter(new THREE.Vector3());
    this.model.position.x -= center.x;
    this.model.position.z -= center.z;
    this.model.position.y -= box.min.y;
    this.scene.add(this.model);

    const size = box.getSize(new THREE.Vector3());
    const radius = size.length() / 2;
    this.radius = radius;
    this.focus = new THREE.Vector3(0, size.y / 2, 0);

    this.ground.scale.setScalar(radius * 8);
    const shadow = this.sun.shadow.camera;
    shadow.left = shadow.bottom = -radius * 2;
    shadow.right = shadow.top = radius * 2;
    shadow.near = 0.1;
    shadow.far = radius * 10;
    shadow.updateProjectionMatrix();
    this.sun.position.set(radius * 1.6, radius * 3.2, radius * 2.2);

    this.controls.minDistance = radius * 1.3;
    this.controls.maxDistance = radius * 6;
    this.resetView();
    this.setAutoRotate(true);
    this.resize();
  }

  resetView() {
    if (!this.focus) return;
    const distance = this.radius / Math.sin(THREE.MathUtils.degToRad(this.camera.fov / 2)) * 1.08;
    const azimuth = THREE.MathUtils.degToRad(-28);
    const elevation = THREE.MathUtils.degToRad(18);
    this.camera.position.set(
      Math.sin(azimuth) * Math.cos(elevation) * distance,
      this.focus.y + Math.sin(elevation) * distance,
      Math.cos(azimuth) * Math.cos(elevation) * distance,
    );
    this.camera.near = this.radius / 50;
    this.camera.far = this.radius * 40;
    this.camera.updateProjectionMatrix();
    this.controls.target.copy(this.focus);
    this.pendingTurn = 0;
    this.controls.update();
  }

  turn(angle) {
    this.setAutoRotate(false);
    this.pendingTurn += angle;
  }

  setAutoRotate(enabled) {
    this.controls.autoRotate = enabled;
    this.container.dispatchEvent(new CustomEvent("viewer:autorotate", { detail: enabled }));
  }

  toggleAutoRotate() {
    this.setAutoRotate(!this.controls.autoRotate);
  }

  resize() {
    const { clientWidth: width, clientHeight: height } = this.container;
    if (!width || !height) return;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  start() {
    if (!this.frame) this.frame = requestAnimationFrame(this.tick);
  }

  stop() {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  tick() {
    if (this.modal && !this.modal.classList.contains("is-open")) {
      this.frame = 0;
      return;
    }

    if (Math.abs(this.pendingTurn) > 0.0005) {
      const step = this.pendingTurn * 0.14;
      this.pendingTurn -= step;
      const offset = this.camera.position.clone().sub(this.controls.target);
      offset.applyAxisAngle(THREE.Object3D.DEFAULT_UP, step);
      this.camera.position.copy(this.controls.target).add(offset);
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.frame = requestAnimationFrame(this.tick);
  }
}

let viewer = null;

export const open = (container, product) => {
  if (!viewer || viewer.container !== container) viewer = new ProductViewer(container);
  viewer.load(product);
  viewer.start();
  return viewer;
};

export const getViewer = () => viewer;
