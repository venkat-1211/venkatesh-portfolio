/* =====================================================
   THREE-BG.JS — Three.js Aurora Background
   Creates an animated aurora/mesh gradient in the hero
   ===================================================== */

'use strict';

(function initThreeBg() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // Wait for Three.js to load
  const waitForThree = setInterval(() => {
    if (typeof THREE === 'undefined') return;
    clearInterval(waitForThree);
    startScene();
  }, 100);

  function startScene() {
    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // ── Scene & Camera ──
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 3;

    // ── Vertex Shader ──
    const vertexShader = `
      uniform float uTime;
      uniform float uAmplitude;
      varying vec2 vUv;
      varying float vElevation;

      // Classic Perlin noise
      vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
      vec2 fade(vec2 t){ return t*t*t*(t*(t*6.0-15.0)+10.0); }
      float cnoise(vec2 P){
        vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
        vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
        Pi = mod(Pi, 289.0);
        vec4 ix = Pi.xzxz;
        vec4 iy = Pi.yyww;
        vec4 fx = Pf.xzxz;
        vec4 fy = Pf.yyww;
        vec4 i = permute(permute(ix) + iy);
        vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0;
        vec4 gy = abs(gx) - 0.5;
        vec4 tx = floor(gx + 0.5);
        gx = gx - tx;
        vec2 g00 = vec2(gx.x,gy.x);
        vec2 g10 = vec2(gx.y,gy.y);
        vec2 g01 = vec2(gx.z,gy.z);
        vec2 g11 = vec2(gx.w,gy.w);
        vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11));
        g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
        float n00 = dot(g00, vec2(fx.x, fy.x));
        float n10 = dot(g10, vec2(fx.y, fy.y));
        float n01 = dot(g01, vec2(fx.z, fy.z));
        float n11 = dot(g11, vec2(fx.w, fy.w));
        vec2 fade_xy = fade(Pf.xy);
        vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
        float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
        return 2.3 * n_xy;
      }

      void main(){
        vUv = uv;
        vec3 pos = position;
        float noise = cnoise(vec2(pos.x * 1.5 + uTime * 0.12, pos.y * 1.5 + uTime * 0.08));
        float noise2 = cnoise(vec2(pos.x * 2.5 - uTime * 0.06, pos.y * 3.0 + uTime * 0.10));
        float elevation = noise * uAmplitude + noise2 * uAmplitude * 0.5;
        pos.z = elevation;
        vElevation = elevation;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    // ── Fragment Shader ──
    const fragmentShader = `
      uniform float uTime;
      varying vec2 vUv;
      varying float vElevation;

      void main(){
        // Aurora color gradient
        vec3 col1 = vec3(0.31, 0.05, 0.70);  // purple
        vec3 col2 = vec3(0.05, 0.24, 0.70);  // blue
        vec3 col3 = vec3(0.02, 0.55, 0.75);  // cyan
        vec3 col4 = vec3(0.05, 0.05, 0.05);  // near black

        float mixFactor = (vElevation + 0.5) * 0.5;
        float timeFactor = sin(uTime * 0.25) * 0.5 + 0.5;

        vec3 color = mix(col4, col1, mixFactor * 0.8);
        color = mix(color, col2, timeFactor * 0.4);
        color = mix(color, col3, (1.0 - vUv.y) * 0.3);

        float alpha = 0.45 * (mixFactor + 0.3);
        alpha = clamp(alpha, 0.0, 0.5);

        gl_FragColor = vec4(color, alpha);
      }
    `;

    // ── Geometry & Material ──
    const geometry = new THREE.PlaneGeometry(8, 5, 80, 50);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime:      { value: 0 },
        uAmplitude: { value: 0.35 }
      },
      transparent: true,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Slight tilt for depth
    mesh.rotation.x = -0.2;

    // ── Mouse parallax ──
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.15;
    }, { passive: true });

    // ── Resize handler ──
    function onResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize, { passive: true });

    // ── Render loop ──
    let animId;
    let active = true;

    // Pause when tab hidden (save resources)
    document.addEventListener('visibilitychange', () => {
      active = !document.hidden;
      if (active) render();
    });

    function render(time = 0) {
      if (!active) return;
      animId = requestAnimationFrame(render);

      material.uniforms.uTime.value = time * 0.001;

      // Smooth mouse parallax on mesh
      mesh.rotation.y += (mouseX - mesh.rotation.y) * 0.04;
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.04;

      renderer.render(scene, camera);
    }

    render();

    // Stop animation when hero leaves viewport
    const heroSection = document.getElementById('hero');
    if (heroSection && 'IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver(entries => {
        active = entries[0].isIntersecting;
        if (active) render();
      }, { threshold: 0 });
      heroObserver.observe(heroSection);
    }
  }
})();
