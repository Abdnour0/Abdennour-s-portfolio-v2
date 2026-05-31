/* ── 3D HERO BACKGROUND ────────────────────────────────────────────── */
/* Floating geometric shapes using Three.js                          */
/* Disabled on touch / low-end devices for performance                */

(function() {

var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
var hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
var isLowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || !window.requestIdleCallback;

if (isTouchDevice || !hasMouse || isLowEnd || typeof THREE === 'undefined') return;

var hero = document.getElementById('hero');
if (!hero) return;

var scene, camera, renderer;
var shapes = [];
var mouseX = 0, mouseY = 0;
var animId;

var COLORS = [0xc9a84c, 0xd4b85e, 0xb8943e, 0xe8c86e, 0xa8843a];

function init() {
  scene = new THREE.Scene();

  var w = hero.clientWidth;
  var h = hero.clientHeight;

  camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
  camera.position.set(0, 0, 14);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;';
  hero.insertBefore(renderer.domElement, hero.firstChild);

  var ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  var light1 = new THREE.DirectionalLight(0xc9a84c, 1.2);
  light1.position.set(2, 3, 4);
  scene.add(light1);

  var light2 = new THREE.DirectionalLight(0xffffff, 0.6);
  light2.position.set(-3, -1, 2);
  scene.add(light2);

  var geos = [
    new THREE.IcosahedronGeometry(0.7, 0),
    new THREE.OctahedronGeometry(0.6, 0),
    new THREE.TorusKnotGeometry(0.45, 0.15, 48, 6),
    new THREE.DodecahedronGeometry(0.55, 0),
    new THREE.TetrahedronGeometry(0.6, 0),
  ];

  for (var i = 0; i < 10; i++) {
    var g = geos[i % geos.length];
    var c = COLORS[Math.floor(Math.random() * COLORS.length)];
    var wire = Math.random() > 0.55;
    var m = new THREE.MeshPhysicalMaterial({
      color: c,
      wireframe: wire,
      transparent: true,
      opacity: wire ? 0.12 + Math.random() * 0.15 : 0.08 + Math.random() * 0.12,
      metalness: 0.2,
      roughness: 0.5,
    });

    var mesh = new THREE.Mesh(g, m);
    mesh.position.set(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10 - 2
    );
    mesh.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );

    mesh.userData = {
      rx: (Math.random() - 0.5) * 0.008,
      ry: (Math.random() - 0.5) * 0.008,
      rz: (Math.random() - 0.5) * 0.008,
      floatOff: Math.random() * Math.PI * 2,
      floatSpd: 0.3 + Math.random() * 0.4,
      floatAmp: 0.1 + Math.random() * 0.25,
      baseY: mesh.position.y,
    };

    scene.add(mesh);
    shapes.push(mesh);
  }

  document.addEventListener('mousemove', onMove);
  window.addEventListener('resize', onResize);
  animate();
}

function onMove(e) {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
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
  animId = requestAnimationFrame(animate);

  var t = Date.now() * 0.001;

  for (var i = 0; i < shapes.length; i++) {
    var s = shapes[i];
    var d = s.userData;
    s.rotation.x += d.rx;
    s.rotation.y += d.ry;
    s.rotation.z += d.rz;
    s.position.y = d.baseY + Math.sin(t * d.floatSpd + d.floatOff) * d.floatAmp;
  }

  camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.015;
  camera.position.y += (mouseY * 0.8 - camera.position.y) * 0.015;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

function destroy() {
  if (animId) cancelAnimationFrame(animId);
  if (renderer) {
    renderer.domElement.remove();
    renderer.dispose();
  }
  shapes.forEach(function(s) {
    s.geometry.dispose();
    s.material.dispose();
  });
  shapes = [];
  document.removeEventListener('mousemove', onMove);
  window.removeEventListener('resize', onResize);
}

init();

})();
