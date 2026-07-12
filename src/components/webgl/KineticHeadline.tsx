import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * KineticHeadline — an editorial display word rendered to a texture and
 * distorted in WebGL. The type ripples toward the cursor, splits into faint
 * chromatic fringes, and tints toward the signal accent where the pointer is.
 * Motion serves the typography; it is the page's signature, not decoration.
 */

interface KineticHeadlineProps {
  lines: string[];
  ink: string;
  signal: string;
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform vec2 uMouse;      // 0..1, pointer position on the plane
  uniform float uHover;     // 0..1 eased hover amount
  uniform float uTime;
  uniform float uAspect;    // width / height of the plane
  uniform vec3 uInk;
  uniform vec3 uSignal;

  float mask(vec2 uv) {
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 0.0;
    return texture2D(uTex, uv).a;
  }

  void main() {
    vec2 uv = vUv;

    // aspect-corrected distance from cursor
    vec2 d = uv - uMouse;
    d.x *= uAspect;
    float dist = length(d);

    // ripple that pushes the type outward from the cursor + a slow ambient drift
    float ring = exp(-dist * 9.0);
    float wave = sin(dist * 26.0 - uTime * 3.2) * ring;
    vec2 dir = normalize(d + 1e-5);
    vec2 push = dir * wave * 0.05 * uHover;

    // continuous, barely-there breathing so it never feels frozen
    float ambient = sin(uv.y * 8.0 + uTime * 0.7) * 0.0016;
    uv += push + vec2(ambient, 0.0);

    // chromatic split scales with how hard the type is being distorted
    float split = (0.006 + 0.02 * ring) * uHover;
    float r = mask(uv + dir * split);
    float g = mask(uv);
    float b = mask(uv - dir * split);

    float a = max(r, max(g, b));
    if (a < 0.01) discard;

    // base ink, tinted toward the signal accent near the cursor
    vec3 col = mix(uInk, uSignal, clamp(ring * uHover * 1.4, 0.0, 1.0));
    // paint the fringes in signal on the extreme channels
    col = mix(col, uSignal, clamp((r - b) * 2.0 * uHover, 0.0, 0.7));

    gl_FragColor = vec4(col, a);
  }
`;

// Draw an alpha mask of the type in solid white — all colour is applied in the
// shader via uniforms, so the mask itself is theme-independent.
function makeTextTexture(lines: string[], w: number, h: number) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(2, Math.floor(w * dpr));
  canvas.height = Math.max(2, Math.floor(h * dpr));
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  // fit the widest line to ~94% of the width
  const weight = 700;
  const family = '"Bricolage Grotesque", sans-serif';
  let size = h; // start tall, shrink to fit both axes
  const fitWidth = w * 0.98;
  const lineGap = 0.86; // line-height factor
  const measure = (fs: number) => {
    ctx.font = `${weight} ${fs}px ${family}`;
    let widest = 0;
    for (const l of lines) widest = Math.max(widest, ctx.measureText(l).width);
    return widest;
  };
  // shrink until widest line fits AND stack fits height
  for (let i = 0; i < 200; i++) {
    const widest = measure(size);
    const stackH = size * lineGap * lines.length;
    if (widest <= fitWidth && stackH <= h * 0.98) break;
    size *= 0.97;
  }
  ctx.font = `${weight} ${size}px ${family}`;

  const stackH = size * lineGap * lines.length;
  let y = (h - stackH) / 2 + size * 0.8; // first baseline, vertically centered
  for (const l of lines) {
    ctx.fillText(l, 0, y);
    y += size * lineGap;
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

function Plane({ lines, ink, signal }: KineticHeadlineProps) {
  const { viewport, size } = useThree();
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const target = useRef({ x: 0.5, y: 0.5, hover: 0 });
  const [tex, setTex] = useState<THREE.Texture | null>(null);

  const inkColor = useMemo(() => new THREE.Color(ink), [ink]);
  const signalColor = useMemo(() => new THREE.Color(signal), [signal]);

  // (re)build the text texture whenever the canvas size changes
  useEffect(() => {
    let alive = true;
    const build = async () => {
      try {
        await document.fonts.load('700 100px "Bricolage Grotesque"');
        await document.fonts.ready;
      } catch { /* fall back to whatever is available */ }
      if (!alive) return;
      const t = makeTextTexture(lines, size.width, size.height);
      setTex((prev) => { prev?.dispose(); return t; });
    };
    build();
    return () => { alive = false; };
  }, [lines, size.width, size.height]);

  const uniforms = useMemo(() => ({
    uTex: { value: null as THREE.Texture | null },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHover: { value: 0 },
    uTime: { value: 0 },
    uAspect: { value: size.width / size.height },
    uInk: { value: inkColor },
    uSignal: { value: signalColor },
  }), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { uniforms.uTex.value = tex; }, [tex, uniforms]);
  useEffect(() => { uniforms.uAspect.value = size.width / size.height; }, [size, uniforms]);
  useEffect(() => { uniforms.uInk.value = inkColor; }, [inkColor, uniforms]);
  useEffect(() => { uniforms.uSignal.value = signalColor; }, [signalColor, uniforms]);

  useFrame((_, delta) => {
    const u = uniforms;
    u.uTime.value += delta;
    const m = u.uMouse.value as THREE.Vector2;
    // ease pointer + hover toward their targets
    m.x += (target.current.x - m.x) * Math.min(1, delta * 8);
    m.y += (target.current.y - m.y) * Math.min(1, delta * 8);
    u.uHover.value += (target.current.hover - u.uHover.value) * Math.min(1, delta * 5);
  });

  const onMove = (e: ThreeEvent<PointerEvent>) => {
    if (!e.uv) return;
    target.current.x = e.uv.x;
    target.current.y = e.uv.y;
    target.current.hover = 1;
  };

  return (
    <mesh
      onPointerMove={onMove}
      onPointerLeave={() => { target.current.hover = 0; }}
    >
      <planeGeometry args={[viewport.width, viewport.height, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
      />
    </mesh>
  );
}

export function KineticHeadline({ lines, ink, signal }: KineticHeadlineProps) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <Plane lines={lines} ink={ink} signal={signal} />
    </Canvas>
  );
}
