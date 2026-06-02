var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
var hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
var isLowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || !window.requestIdleCallback;

(function() {
if (isLowEnd) {
  return;
}

var hero = document.getElementById('hero');
if (!hero) { return; }

var THREE = null;
var scene, camera, renderer;
var logos = [];
var mouseX = 0, mouseY = 0;
var animId = null;
var stopped = false;

var TEXTURE_DRAWERS = [
  drawDjango, drawLaravel, drawPython, drawJS, drawTS,
  drawGit, drawDocker, drawNode
];

var TEXTURE_NAMES = [
  'Django', 'Laravel', 'Python', 'JS', 'TS',
  'Git', 'Docker', 'Node'
];

var SIZE = 128;
var HALF = SIZE / 2;

function drawDjango(ctx) {
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = '#092e20';
  roundRect(ctx, 20, 20, 88, 88, 14);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 40px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Dj', HALF, HALF + 2);
}

function drawLaravel(ctx) {
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = '#ff2d20';
  roundRect(ctx, 20, 20, 88, 88, 14);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 36px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Lv', HALF, HALF + 2);
}

function drawPython(ctx) {
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = '#306998';
  roundRect(ctx, 18, 18, 92, 92, 14);
  ctx.fill();
  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 42px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Py', HALF, HALF + 2);
}

function drawJS(ctx) {
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = '#f7df1e';
  roundRect(ctx, 18, 18, 92, 92, 14);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.font = 'bold 44px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JS', HALF, HALF + 2);
}

function drawTS(ctx) {
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = '#3178c6';
  roundRect(ctx, 18, 18, 92, 92, 14);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 42px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TS', HALF, HALF + 2);
}

function drawGit(ctx) {
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = '#f05032';
  roundRect(ctx, 18, 18, 92, 92, 14);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 36px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Git', HALF, HALF + 2);
}

function drawDocker(ctx) {
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = '#2496ed';
  roundRect(ctx, 18, 26, 92, 76, 12);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 30px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Dkr', HALF, HALF + 2);
}

function drawNode(ctx) {
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = '#339933';
  roundRect(ctx, 18, 18, 92, 92, 14);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 40px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('No', HALF, HALF + 2);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function buildReactLogo() {
  var group = new THREE.Group();
  var gold = 0x61dafb;

  var torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.8, 0.04, 16, 48),
    new THREE.MeshStandardMaterial({ color: gold, emissive: gold, emissiveIntensity: 0.15, transparent: true, opacity: 0.7 })
  );
  torus.rotation.x = Math.PI / 2;
  group.add(torus);

  var angles = [0, Math.PI / 3, -Math.PI / 3];
  var tubeMat = new THREE.MeshStandardMaterial({ color: gold, emissive: gold, emissiveIntensity: 0.1, transparent: true, opacity: 0.5 });
  angles.forEach(function(a) {
    var ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.75, 0.025, 12, 36),
      tubeMat
    );
    ring.scale.set(1, 0.35, 1);
    ring.rotation.x = Math.PI / 2 + a;
    ring.rotation.z = a;
    group.add(ring);
  });

  var dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 12, 12),
    new THREE.MeshStandardMaterial({ color: gold, emissive: gold, emissiveIntensity: 0.2 })
  );
  group.add(dot);

  return group;
}

function buildVueLogo() {
  var shape = new THREE.Shape();
  shape.moveTo(0, 0.9);
  shape.lineTo(-0.6, -0.7);
  shape.lineTo(0, -0.35);
  shape.lineTo(0.6, -0.7);
  shape.closePath();

  var hole = new THREE.Path();
  hole.moveTo(0, 0.9);
  hole.lineTo(0.25, -0.6);
  hole.lineTo(0, -0.35);
  hole.lineTo(-0.25, -0.6);
  hole.closePath();
  shape.holes.push(hole);

  var geo = new THREE.ExtrudeGeometry(shape, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.02, bevelSegments: 4 });

  var group = new THREE.Group();
  var outer = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x42b883, emissive: 0x42b883, emissiveIntensity: 0.1, metalness: 0.3, roughness: 0.4 }));
  group.add(outer);

  var innerShape = new THREE.Shape();
  innerShape.moveTo(0, 0.9);
  innerShape.lineTo(0.25, -0.6);
  innerShape.lineTo(0, -0.35);
  innerShape.lineTo(-0.25, -0.6);
  innerShape.closePath();
  var innerGeo = new THREE.ExtrudeGeometry(innerShape, { depth: 0.09, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.01, bevelSegments: 3 });
  var inner = new THREE.Mesh(innerGeo, new THREE.MeshStandardMaterial({ color: 0x35495e, emissive: 0x35495e, emissiveIntensity: 0.05, metalness: 0.2, roughness: 0.5 }));
  inner.position.z = 0.005;
  group.add(inner);

  return group;
}

function createLogoTexture(drawFn) {
  var canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  var ctx = canvas.getContext('2d');
  drawFn(ctx);
  var tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function buildBoxLogo(tex, opacity) {
  var frontMat = new THREE.MeshStandardMaterial({
    map: tex, transparent: true, opacity: opacity,
    metalness: 0.2, roughness: 0.5
  });
  var sideMat = new THREE.MeshStandardMaterial({
    color: 0x222222, transparent: true, opacity: opacity * 0.5,
    metalness: 0.1, roughness: 0.8
  });
  var mats = [sideMat, sideMat, sideMat, sideMat, frontMat, frontMat];
  var geo = new THREE.BoxGeometry(1, 1, 0.15);
  return new THREE.Mesh(geo, mats);
}

function init() {
  scene = new THREE.Scene();

  var w = hero.clientWidth;
  var h = hero.clientHeight;

  var isMobile = isTouchDevice || !hasMouse;

  camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
  camera.position.set(0, 0, isMobile ? 16 : 14);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
  renderer.domElement.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;';
  hero.insertBefore(renderer.domElement, hero.firstChild);

  var ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);
  var key = new THREE.DirectionalLight(0xc9a84c, 0.8);
  key.position.set(3, 4, 5);
  scene.add(key);
  var fill = new THREE.DirectionalLight(0xffffff, 0.4);
  fill.position.set(-3, 1, 3);
  scene.add(fill);

  var customBuilders = [
    { fn: buildVueLogo, name: 'Vue' },
    { fn: buildReactLogo, name: 'React' }
  ];
  customBuilders.forEach(function(b) {
    var group = b.fn();
    var s = 0.6 + Math.random() * 0.5;
    group.scale.set(s, s, s);
    group.position.set(
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 11,
      (Math.random() - 0.5) * 10 - 2
    );
    group.rotation.set(
      (Math.random() - 0.5) * 0.8,
      (Math.random() - 0.5) * 0.8,
      (Math.random() - 0.5) * 0.8
    );
    group.userData = {
      name: b.name,
      rx: (Math.random() - 0.5) * 0.004,
      ry: (Math.random() - 0.5) * 0.006,
      rz: (Math.random() - 0.5) * 0.005,
      floatOff: Math.random() * Math.PI * 2,
      floatSpd: 0.25 + Math.random() * 0.35,
      floatAmp: 0.08 + Math.random() * 0.2,
      baseY: group.position.y,
      baseX: group.position.x,
      driftOff: Math.random() * Math.PI * 2,
      driftSpd: 0.1 + Math.random() * 0.15,
      driftAmp: 0.3 + Math.random() * 0.5,
      isGroup: true
    };
    scene.add(group);
    logos.push(group);
  });

  var texStep = isMobile ? 2 : 1;
  for (var i = 0; i < TEXTURE_DRAWERS.length; i += texStep) {
    var tex = createLogoTexture(TEXTURE_DRAWERS[i]);
    var opacity = 0.55 + Math.random() * 0.3;
    var mesh = buildBoxLogo(tex, opacity);
    var s = 0.6 + Math.random() * 0.6;
    mesh.scale.set(s, s, s);
    mesh.position.set(
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 11,
      (Math.random() - 0.5) * 10 - 2
    );
    mesh.rotation.set(
      (Math.random() - 0.5) * 0.8,
      (Math.random() - 0.5) * 0.8,
      (Math.random() - 0.5) * 0.8
    );
    mesh.userData = {
      name: TEXTURE_NAMES[i],
      rx: (Math.random() - 0.5) * 0.004,
      ry: (Math.random() - 0.5) * 0.006,
      rz: (Math.random() - 0.5) * 0.005,
      floatOff: Math.random() * Math.PI * 2,
      floatSpd: 0.25 + Math.random() * 0.35,
      floatAmp: 0.08 + Math.random() * 0.2,
      baseY: mesh.position.y,
      baseX: mesh.position.x,
      driftOff: Math.random() * Math.PI * 2,
      driftSpd: 0.1 + Math.random() * 0.15,
      driftAmp: 0.3 + Math.random() * 0.5
    };
    scene.add(mesh);
    logos.push(mesh);
  }

  document.addEventListener('mousemove', onMove);
  window.addEventListener('resize', onResize);
  window.addEventListener('pageshow', function(pe) {
    if (pe.persisted && renderer && !stopped) { renderer.render(scene, camera); }
  });

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        stopped = false;
        if (animId === null) animate();
      } else {
        stopped = true;
        if (animId !== null) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      }
    });
  }, { threshold: 0 });
  obs.observe(hero);

  animate();
}

var _rafPending = false, _lastMX = 0, _lastMY = 0;
function onMove(e) {
  _lastMX = (e.clientX / window.innerWidth) * 2 - 1;
  _lastMY = -(e.clientY / window.innerHeight) * 2 + 1;
  if (!_rafPending) {
    _rafPending = true;
    requestAnimationFrame(function() {
      mouseX = _lastMX;
      mouseY = _lastMY;
      _rafPending = false;
    });
  }
}

function onResize() {
  if (!camera || !renderer) return;
  var w = hero.clientWidth;
  var h = hero.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function animate() {
  if (stopped) { animId = null; return; }
  animId = requestAnimationFrame(animate);
  try {
    var t = Date.now() * 0.001;

    for (var i = 0; i < logos.length; i++) {
      var s = logos[i];
      var d = s.userData;
      if (!d) continue;
      s.rotation.x += d.rx;
      s.rotation.y += d.ry;
      s.rotation.z += d.rz;
      s.position.y = d.baseY + Math.sin(t * d.floatSpd + d.floatOff) * d.floatAmp;
      s.position.x = d.baseX + Math.sin(t * d.driftSpd + d.driftOff) * d.driftAmp;
    }

    camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.015;
    camera.position.y += (mouseY * 0.8 - camera.position.y) * 0.015;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  } catch (e) {}
}

import('three').then(function(mod) {
  THREE = mod.default || mod;
  init();
});

})();
