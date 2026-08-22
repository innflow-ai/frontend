"use client";

import * as React from "react";

type ImageValue = { src?: string; alt?: string } | string;
type Quality = "lite" | "balanced" | "ultra";
type Grade = "none" | "luxury" | "cinematic" | "warm" | "mono" | "neon";
type Mask = "rounded" | "circle" | "arch" | "ticket";
type Texture = "none" | "grain" | "paper" | "scanlines";

export type MediaItem = {
  image?: ImageValue;
  title?: string;
  link?: string;
  openInNewTab?: boolean;
  fit?: "cover" | "contain";
  background?: string;
  imagePadding?: number;
};

type ShadowSettings = {
  enabled?: boolean;
  color?: string;
  opacity?: number;
  x?: number;
  y?: number;
  blur?: number;
  spread?: number;
};

type OverlaySettings = {
  enabled?: boolean;
  topColor?: string;
  topOpacity?: number;
  bottomColor?: string;
  bottomOpacity?: number;
  angle?: number;
  middle?: number;
};

type VignetteSettings = {
  enabled?: boolean;
  color?: string;
  opacity?: number;
  innerSize?: number;
  outerSize?: number;
  x?: number;
  y?: number;
};

type BorderSettings = {
  enabled?: boolean;
  color?: string;
  opacity?: number;
  width?: number;
};

type DepthBlurSettings = {
  enabled?: boolean;
  amount?: number;
  maxBlur?: number;
};

type HoverSettings = {
  enabled?: boolean;
  lift?: number;
  scale?: number;
  duration?: number;
};

type ShineSettings = {
  enabled?: boolean;
  color?: string;
  opacity?: number;
  angle?: number;
  width?: number;
  travel?: number;
  duration?: number;
};

type FogSettings = {
  enabled?: boolean;
  color?: string;
  opacity?: number;
  start?: number;
};

type DistortionSettings = {
  enabled?: boolean;
  intensity?: number;
  hoverIntensity?: number;
  scale?: number;
  skew?: number;
  rotate?: number;
  duration?: number;
};

type ParallaxTiltSettings = {
  enabled?: boolean;
  centerOnly?: boolean;
  tilt?: number;
  imageMove?: number;
  scale?: number;
  perspective?: number;
  smoothness?: number;
  returnSmoothness?: number;
  glowOpacity?: number;
};

type PyramidSettings = {
  enabled?: boolean;
  strength?: number;
  lift?: number;
  scaleBoost?: number;
  opacityBoost?: number;
};

type Glass3DSettings = {
  enabled?: boolean;
  thickness?: number;
  layers?: number;
  tint?: string;
  edgeOpacity?: number;
  faceOpacity?: number;
  backOpacity?: number;
  blur?: number;
  strokeOpacity?: number;
  bevel?: number;
  highlightOpacity?: number;
};

type TextureSettings = {
  type?: Texture;
  opacity?: number;
};

type ViewProps = {
  quality?: Quality;
};

type LayoutProps = {
  cardWidth?: number;
  cardHeight?: number;
  x?: number;
  y?: number;
  scale?: number;
  perspective?: number;
  responsive?: boolean;
};

type MotionProps = {
  autoplay?: boolean;
  speed?: number;
  smoothness?: number;
  pauseOnHover?: boolean;
  drag?: boolean;
  dragPower?: number;
  wheel?: boolean;
  wheelPower?: number;
  snap?: boolean;
  clickToFocus?: boolean;
};

type RingProps = {
  radius?: number;
  depth?: number;
  tilt?: number;
  rotateCards?: boolean;
  activeScale?: number;
  safeSpacing?: boolean;
  pyramid?: PyramidSettings;
};

type LookProps = {
  background?: string;
  radius?: number;
  objectFit?: "cover" | "contain";
  shadow?: ShadowSettings | boolean;
  overlay?: OverlaySettings | boolean;
  vignette?: VignetteSettings | boolean;
  border?: BorderSettings | boolean;
  glass3D?: Glass3DSettings | boolean;
};

type EffectsProps = {
  grade?: Grade;
  depthBlur?: DepthBlurSettings | boolean;
  inactiveDim?: number;
  hover?: HoverSettings | boolean;
  shine?: ShineSettings | boolean;
  fog?: FogSettings | boolean;
  distortion?: DistortionSettings | boolean;
  parallaxTilt?: ParallaxTiltSettings | boolean;
  texture?: TextureSettings;
  mask?: Mask;
};

type CaptionProps = {
  showTitle?: boolean;
  showNumber?: boolean;
  titleFont?: React.CSSProperties;
  numberFont?: React.CSSProperties;
  color?: string;
  shadow?: ShadowSettings | boolean;
};

export type SmoothRingGalleryProps = {
  items?: MediaItem[];
  view?: ViewProps;
  layout?: LayoutProps;
  motion?: MotionProps;
  ring?: RingProps;
  look?: LookProps;
  effects?: EffectsProps;
  caption?: CaptionProps;
};

const defaultItems: MediaItem[] = [
  {
    title: "AI Copilot",
    link: "",
    openInNewTab: false,
    fit: "cover",
    background: "#120A18",
    imagePadding: 0,
    image: {
      src: "https://app.innflow.ai/assets/home-start-cards/ai-copilot.png",
      alt: "Innflow AI Copilot workspace",
    },
  },
  {
    title: "Assistants",
    link: "",
    openInNewTab: false,
    fit: "cover",
    background: "#120A18",
    imagePadding: 0,
    image: {
      src: "https://app.innflow.ai/assets/home-start-cards/ai-agent.png",
      alt: "Innflow Assistant workspace",
    },
  },
  {
    title: "Skills",
    link: "",
    openInNewTab: false,
    fit: "contain",
    background: "#F3F0F8",
    imagePadding: 76,
    image: {
      src: "https://app.innflow.ai/logos/onboarding-features/docs-wikis.svg",
      alt: "Skills",
    },
  },
  {
    title: "MCP Servers",
    link: "",
    openInNewTab: false,
    fit: "contain",
    background: "#F3F0F8",
    imagePadding: 76,
    image: {
      src: "https://app.innflow.ai/logos/onboarding-features/mcp-servers.svg",
      alt: "MCP servers",
    },
  },
  {
    title: "Tables",
    link: "",
    openInNewTab: false,
    fit: "contain",
    background: "#F3F0F8",
    imagePadding: 76,
    image: {
      src: "https://app.innflow.ai/logos/onboarding-features/tables.svg",
      alt: "Tables",
    },
  },
  {
    title: "Files",
    link: "",
    openInNewTab: false,
    fit: "contain",
    background: "#F3F0F8",
    imagePadding: 76,
    image: {
      src: "https://app.innflow.ai/logos/onboarding-features/files.svg",
      alt: "Files",
    },
  },
  {
    title: "Knowledge Bases",
    link: "",
    openInNewTab: false,
    fit: "contain",
    background: "#F3F0F8",
    imagePadding: 76,
    image: {
      src: "https://app.innflow.ai/logos/onboarding-features/knowledge-bases.svg",
      alt: "Knowledge bases",
    },
  },
  {
    title: "Task Scheduling",
    link: "",
    openInNewTab: false,
    fit: "contain",
    background: "#F3F0F8",
    imagePadding: 76,
    image: {
      src: "https://app.innflow.ai/logos/onboarding-features/scheduled-tasks.svg",
      alt: "Task scheduling",
    },
  },
  {
    title: "Durable Tasks",
    link: "",
    openInNewTab: false,
    fit: "contain",
    background: "#F3F0F8",
    imagePadding: 76,
    image: {
      src: "https://app.innflow.ai/logos/onboarding-features/tasks-projects.svg",
      alt: "Durable tasks",
    },
  },
  {
    title: "#Threads",
    link: "",
    openInNewTab: false,
    fit: "contain",
    background: "#F3F0F8",
    imagePadding: 76,
    image: {
      src: "https://app.innflow.ai/logos/Threads%20Square.svg",
      alt: "Threads publishing integration",
    },
  },
  {
    title: "Test & Repair",
    link: "",
    openInNewTab: false,
    fit: "contain",
    background: "#F3F0F8",
    imagePadding: 76,
    image: {
      src: "https://app.innflow.ai/logos/onboarding-features/workflow-builder.svg",
      alt: "Workflow test and repair",
    },
  },
  {
    title: "Live Workflows",
    link: "",
    openInNewTab: false,
    fit: "contain",
    background: "#F3F0F8",
    imagePadding: 76,
    image: {
      src: "https://app.innflow.ai/logos/onboarding-features/automations.svg",
      alt: "Live workflow automation",
    },
  },
];

const legacyDefaultTitles = [
  "MCP",
  "Warsaw",
  "Madrid",
  "Sydney",
  "Istanbul",
  "Prague",
  "Munich",
  "Venice",
  "Oslo",
  "London",
];

const defaults = {
  view: {
    quality: "balanced" as Quality,
  },
  layout: {
    cardWidth: 260,
    cardHeight: 360,
    x: 0,
    y: 0,
    scale: 1,
    perspective: 1600,
    responsive: true,
  },
  motion: {
    autoplay: false,
    speed: 0.18,
    smoothness: 0.12,
    pauseOnHover: true,
    drag: true,
    dragPower: 0.0085,
    wheel: true,
    wheelPower: 0.0018,
    snap: true,
    clickToFocus: true,
  },
  ring: {
    radius: 420,
    depth: 420,
    tilt: 0.38,
    rotateCards: true,
    activeScale: 1.06,
    safeSpacing: true,
    pyramid: {
      enabled: true,
      strength: 0.35,
      lift: 42,
      scaleBoost: 0.08,
      opacityBoost: 0.14,
    } as PyramidSettings,
  },
  look: {
    background: "#07000d",
    radius: 18,
    objectFit: "cover" as "cover" | "contain",
    shadow: {
      enabled: true,
      color: "#000000",
      opacity: 0.5,
      x: 0,
      y: 26,
      blur: 70,
      spread: 12,
    } as ShadowSettings,
    overlay: {
      enabled: true,
      topColor: "#000000",
      topOpacity: 0.28,
      bottomColor: "#000000",
      bottomOpacity: 0.44,
      angle: 180,
      middle: 44,
    } as OverlaySettings,
    vignette: {
      enabled: true,
      color: "#000000",
      opacity: 0.62,
      innerSize: 34,
      outerSize: 100,
      x: 50,
      y: 50,
    } as VignetteSettings,
    border: {
      enabled: false,
      color: "#FFFFFF",
      opacity: 0.18,
      width: 1,
    } as BorderSettings,
    glass3D: {
      enabled: true,
      thickness: 22,
      layers: 8,
      tint: "#d9f3ff",
      edgeOpacity: 0.16,
      faceOpacity: 0.08,
      backOpacity: 0.12,
      blur: 0.8,
      strokeOpacity: 0.22,
      bevel: 1,
      highlightOpacity: 0.22,
    } as Glass3DSettings,
  },
  effects: {
    grade: "cinematic" as Grade,
    depthBlur: {
      enabled: false,
      amount: 0.22,
      maxBlur: 14,
    } as DepthBlurSettings,
    inactiveDim: 0.18,
    hover: {
      enabled: true,
      lift: -10,
      scale: 1.018,
      duration: 0.55,
    } as HoverSettings,
    shine: {
      enabled: true,
      color: "#FFFFFF",
      opacity: 0.1,
      angle: 120,
      width: 18,
      travel: 55,
      duration: 0.8,
    } as ShineSettings,
    fog: {
      enabled: false,
      color: "#FFFFFF",
      opacity: 0.12,
      start: 0.15,
    } as FogSettings,
    distortion: {
      enabled: true,
      intensity: 0.45,
      hoverIntensity: 0.8,
      scale: 1.03,
      skew: 1.2,
      rotate: 0.6,
      duration: 0.7,
    } as DistortionSettings,
    parallaxTilt: {
      enabled: true,
      centerOnly: false,
      tilt: 10,
      imageMove: 16,
      scale: 1.025,
      perspective: 900,
      smoothness: 0.22,
      returnSmoothness: 0.14,
      glowOpacity: 0.18,
    } as ParallaxTiltSettings,
    texture: {
      type: "none" as Texture,
      opacity: 0.13,
    } as TextureSettings,
    mask: "rounded" as Mask,
  },
  caption: {
    showTitle: true,
    showNumber: true,
    titleFont: {
      fontSize: 28,
      fontWeight: 500,
      letterSpacing: "-0.04em",
    } as React.CSSProperties,
    numberFont: {
      fontSize: 76,
      fontWeight: 400,
      letterSpacing: "-0.08em",
    } as React.CSSProperties,
    color: "#FFFFFF",
    shadow: {
      enabled: true,
      color: "#000000",
      opacity: 0.45,
      x: 0,
      y: 6,
      blur: 22,
      spread: 0,
    } as ShadowSettings,
  },
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const num = (value: number | undefined, fallback: number) =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;

function merge<T extends object, U extends object = Partial<T>>(
  base: T,
  value?: U,
): T & U {
  return { ...base, ...(value || {}) } as T & U;
}

function normalizeSettings<T extends { enabled?: boolean }>(
  base: T,
  value: T | boolean | undefined,
): T {
  if (typeof value === "boolean") return { ...base, enabled: value };
  if (value && typeof value === "object") return { ...base, ...value };
  return base;
}

function alphaColor(color = "#000000", opacity = 1) {
  const alpha = clamp(opacity, 0, 1);
  const trimmed = color.trim();

  if (trimmed === "transparent") return "transparent";

  if (trimmed.startsWith("#")) {
    let hex = trimmed.slice(1);

    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }

    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }

  if (trimmed.startsWith("rgb(")) {
    return trimmed.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
  }

  if (trimmed.startsWith("rgba(")) {
    const values = trimmed
      .replace("rgba(", "")
      .replace(")", "")
      .split(",")
      .map((value) => value.trim());

    if (values.length >= 3) {
      return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${alpha})`;
    }
  }

  return trimmed;
}

function boxShadowCss(shadow: ShadowSettings, boost = 1) {
  if (!shadow.enabled) return "none";

  return `${num(shadow.x, 0)}px ${num(shadow.y, 0)}px ${num(
    shadow.blur,
    40,
  )}px ${num(shadow.spread, 0)}px ${alphaColor(
    shadow.color,
    num(shadow.opacity, 0.4) * boost,
  )}`;
}

function textShadowCss(shadow: ShadowSettings) {
  if (!shadow.enabled) return "none";

  return `${num(shadow.x, 0)}px ${num(shadow.y, 0)}px ${num(
    shadow.blur,
    20,
  )}px ${alphaColor(shadow.color, num(shadow.opacity, 0.4))}`;
}

const getSrc = (value?: ImageValue) =>
  !value ? "" : typeof value === "string" ? value : value.src || "";

const getAlt = (value?: ImageValue) =>
  typeof value === "object" ? value.alt || "" : "";

const getLink = (value?: string) =>
  typeof value === "string" ? value.trim() : "";

const fallbackBackground = (index: number) =>
  `linear-gradient(135deg, hsl(${index * 38}, 76%, 54%), hsl(${
    index * 38 + 90
  }, 76%, 24%))`;

const wrapDelta = (index: number, progress: number, total: number) => {
  if (total <= 1) return 0;

  let delta = index - progress;
  delta = ((delta + total / 2) % total) - total / 2;

  if (delta < -total / 2) delta += total;
  return delta;
};

function filterForGrade(grade: Grade) {
  if (grade === "luxury")
    return "saturate(1.12) contrast(1.06) brightness(1.04)";
  if (grade === "cinematic")
    return "saturate(0.86) contrast(1.18) brightness(0.92)";
  if (grade === "warm") return "sepia(0.16) saturate(1.18) contrast(1.04)";
  if (grade === "mono") return "grayscale(1) contrast(1.14)";
  if (grade === "neon")
    return "saturate(1.55) contrast(1.12) hue-rotate(12deg)";
  return "none";
}

function gradeOverlay(grade: Grade) {
  if (grade === "luxury")
    return "linear-gradient(135deg, rgba(255,255,255,.16), rgba(190,160,255,.08), transparent)";
  if (grade === "cinematic")
    return "linear-gradient(180deg, rgba(0,0,0,.24), transparent 42%, rgba(0,0,0,.24))";
  if (grade === "warm")
    return "linear-gradient(135deg, rgba(255,170,90,.16), transparent 55%)";
  if (grade === "neon")
    return "linear-gradient(135deg, rgba(0,255,255,.15), transparent 45%, rgba(255,0,190,.14))";
  return "";
}

function textureStyle(
  settings: TextureSettings,
  qualityScale: number,
): React.CSSProperties {
  const type = settings.type || "none";
  const opacity = num(settings.opacity, 0) * qualityScale;

  if (type === "none" || opacity <= 0) return { display: "none" };

  if (type === "scanlines") {
    return {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      opacity,
      background:
        "repeating-linear-gradient(to bottom, rgba(255,255,255,.16) 0px, rgba(255,255,255,.16) 1px, transparent 1px, transparent 5px)",
      mixBlendMode: "overlay",
    };
  }

  if (type === "paper") {
    return {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      opacity,
      background:
        "radial-gradient(circle at 20% 30%, rgba(255,255,255,.32) 0 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(255,255,255,.22) 0 1px, transparent 1px)",
      backgroundSize: "18px 18px, 24px 24px",
      mixBlendMode: "soft-light",
    };
  }

  return {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity,
    background:
      "radial-gradient(circle at 25% 25%, rgba(255,255,255,.3) 0 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(0,0,0,.3) 0 1px, transparent 1px)",
    backgroundSize: "3px 3px, 4px 4px",
    mixBlendMode: "overlay",
  };
}

function maskStyle(mask: Mask, radius: number): React.CSSProperties {
  if (mask === "circle") return { borderRadius: 9999 };

  if (mask === "arch") {
    return {
      borderRadius: `${radius}px ${radius}px 999px 999px`,
    };
  }

  if (mask === "ticket") {
    return {
      borderRadius: radius,
      clipPath:
        "polygon(0 0, 100% 0, 100% 42%, 96% 50%, 100% 58%, 100% 100%, 0 100%, 0 58%, 4% 50%, 0 42%)",
    };
  }

  return { borderRadius: radius };
}

export default function SmoothRingGallery(props: SmoothRingGalleryProps = {}) {
  const isStatic = false;

  const view = merge(defaults.view, props.view);
  const layout = merge(defaults.layout, props.layout);
  const motion = merge(defaults.motion, props.motion);

  const rawRing = merge(defaults.ring, props.ring);
  const ring = {
    ...rawRing,
    pyramid: merge(defaults.ring.pyramid, rawRing.pyramid),
  };

  const rawLook = merge(defaults.look, props.look);
  const look = {
    ...rawLook,
    shadow: normalizeSettings(defaults.look.shadow, rawLook.shadow),
    overlay: normalizeSettings(defaults.look.overlay, rawLook.overlay),
    vignette: normalizeSettings(defaults.look.vignette, rawLook.vignette),
    border: normalizeSettings(defaults.look.border, rawLook.border),
    glass3D: normalizeSettings(defaults.look.glass3D, rawLook.glass3D),
  };

  const rawEffects = merge(defaults.effects, props.effects);
  const effects = {
    ...rawEffects,
    depthBlur: normalizeSettings(
      defaults.effects.depthBlur,
      rawEffects.depthBlur,
    ),
    hover: normalizeSettings(defaults.effects.hover, rawEffects.hover),
    shine: normalizeSettings(defaults.effects.shine, rawEffects.shine),
    fog: normalizeSettings(defaults.effects.fog, rawEffects.fog),
    distortion: normalizeSettings(
      defaults.effects.distortion,
      rawEffects.distortion,
    ),
    parallaxTilt: normalizeSettings(
      defaults.effects.parallaxTilt,
      rawEffects.parallaxTilt,
    ),
    texture: merge(defaults.effects.texture, rawEffects.texture),
  };

  const rawCaption = merge(defaults.caption, props.caption);
  const caption = {
    ...rawCaption,
    shadow: normalizeSettings(defaults.caption.shadow, rawCaption.shadow),
  };

  const hasLegacyDefaultItems =
    props.items?.length === legacyDefaultTitles.length &&
    props.items.every(
      (item, index) =>
        item.title === legacyDefaultTitles[index] && !getSrc(item.image),
    );

  const slides =
    props.items?.length && !hasLegacyDefaultItems ? props.items : defaultItems;
  const total = Math.max(1, slides.length);

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const frame = React.useRef<number | null>(null);
  const lastTime = React.useRef<number | null>(null);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const hovering = React.useRef(false);

  const pointer = React.useRef({
    active: false,
    x: 0,
    moved: 0,
  });

  const targetTilt = React.useRef({
    index: -1,
    x: 0,
    y: 0,
    strength: 0,
    active: false,
  });

  const currentTilt = React.useRef({
    index: -1,
    x: 0,
    y: 0,
    strength: 0,
  });

  const [progress, setProgress] = React.useState(0);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [width, setWidth] = React.useState(900);
  const [renderTilt, setRenderTilt] = React.useState({
    index: -1,
    x: 0,
    y: 0,
    strength: 0,
  });

  React.useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width || 900);
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (isStatic) {
      target.current = 0;
      current.current = 0;
      setProgress(0);
      return;
    }

    lastTime.current = null;

    const tick = (time: number) => {
      const previous = lastTime.current ?? time;
      const dt = Math.min(0.05, (time - previous) / 1000);
      lastTime.current = time;

      const paused =
        motion.pauseOnHover && hovering.current && !pointer.current.active;

      if (motion.autoplay && !paused) {
        target.current += motion.speed * dt;
      }

      if (
        motion.snap &&
        !pointer.current.active &&
        !motion.autoplay &&
        Math.abs(target.current - Math.round(target.current)) > 0.001
      ) {
        target.current += (Math.round(target.current) - target.current) * 0.05;
      }

      const carouselEase = clamp(motion.smoothness, 0.035, 0.38);
      const carouselFrameEase = 1 - (1 - carouselEase) ** (dt * 60);

      current.current += (target.current - current.current) * carouselFrameEase;

      if (Math.abs(current.current - target.current) < 0.0001) {
        current.current = target.current;
      }

      const tiltTarget = targetTilt.current;

      if (tiltTarget.active && currentTilt.current.index !== tiltTarget.index) {
        currentTilt.current.index = tiltTarget.index;
        currentTilt.current.x = tiltTarget.x;
        currentTilt.current.y = tiltTarget.y;
        currentTilt.current.strength = 0;
      }

      if (
        tiltTarget.index >= 0 ||
        currentTilt.current.index >= 0 ||
        currentTilt.current.strength > 0.001
      ) {
        const tiltEase = tiltTarget.active
          ? clamp(num(effects.parallaxTilt.smoothness, 0.22), 0.01, 1)
          : clamp(num(effects.parallaxTilt.returnSmoothness, 0.14), 0.01, 1);

        const tiltFrameEase = 1 - (1 - tiltEase) ** (dt * 60);

        currentTilt.current.x +=
          (tiltTarget.x - currentTilt.current.x) * tiltFrameEase;
        currentTilt.current.y +=
          (tiltTarget.y - currentTilt.current.y) * tiltFrameEase;
        currentTilt.current.strength +=
          (tiltTarget.strength - currentTilt.current.strength) * tiltFrameEase;

        if (
          !tiltTarget.active &&
          currentTilt.current.strength < 0.001 &&
          Math.abs(currentTilt.current.x) < 0.001 &&
          Math.abs(currentTilt.current.y) < 0.001
        ) {
          currentTilt.current.index = -1;
          currentTilt.current.x = 0;
          currentTilt.current.y = 0;
          currentTilt.current.strength = 0;
          targetTilt.current.index = -1;
        }

        setRenderTilt({
          index: currentTilt.current.index,
          x: currentTilt.current.x,
          y: currentTilt.current.y,
          strength: currentTilt.current.strength,
        });
      }

      setProgress(current.current);
      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [
    motion.autoplay,
    motion.speed,
    motion.smoothness,
    motion.pauseOnHover,
    motion.snap,
    effects.parallaxTilt.smoothness,
    effects.parallaxTilt.returnSmoothness,
  ]);

  const responsiveScale =
    layout.responsive && width < 760 ? clamp(width / 900, 0.62, 1) : 1;

  const cardWidth = Math.max(40, layout.cardWidth * responsiveScale);
  const cardHeight = Math.max(40, layout.cardHeight * responsiveScale);

  const orbitRadius = ring.safeSpacing
    ? Math.max(ring.radius * responsiveScale, cardWidth * 1.42)
    : ring.radius * responsiveScale;

  const orbitDepth = ring.safeSpacing
    ? Math.max(ring.depth * responsiveScale, cardWidth * 1.05)
    : ring.depth * responsiveScale;

  const qualityScale =
    view.quality === "lite" ? 0.6 : view.quality === "ultra" ? 1.18 : 1;

  const moveTarget = (amount: number) => {
    target.current += amount;
  };

  const resetTilt = () => {
    targetTilt.current = {
      index: targetTilt.current.index,
      x: 0,
      y: 0,
      strength: 0,
      active: false,
    };
  };

  const navigateToLink = (link: string, newTab?: boolean) => {
    if (!link || typeof window === "undefined") return;

    if (newTab) {
      window.open(link, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.href = link;
  };

  const shouldIgnoreDrag = (targetElement: EventTarget | null) => {
    if (!(targetElement instanceof HTMLElement)) return false;
    return Boolean(targetElement.closest("[data-ring-link='true']"));
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isStatic || !motion.drag || shouldIgnoreDrag(event.target)) return;

    pointer.current = {
      active: true,
      x: event.clientX,
      moved: 0,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isStatic || !motion.drag || !pointer.current.active) return;

    const dx = event.clientX - pointer.current.x;
    pointer.current.x = event.clientX;
    pointer.current.moved += Math.abs(dx);

    moveTarget(-dx * motion.dragPower);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    pointer.current.active = false;

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (!isStatic && motion.snap) {
      target.current = Math.round(target.current);
    }
  };

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (isStatic || !motion.wheel) return;

    event.preventDefault();

    const wheelDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    moveTarget(wheelDelta * motion.wheelPower);
  };

  const focusItem = (index: number) => {
    if (isStatic || !motion.clickToFocus) return;
    if (pointer.current.moved > 8) return;

    const delta = wrapDelta(index, current.current, total);
    target.current = current.current + delta;
  };

  const updateTiltFromPointer = (
    clientX: number,
    clientY: number,
    element: HTMLElement,
    index: number,
    isMain: boolean,
  ) => {
    if (!effects.parallaxTilt.enabled || pointer.current.active) return;
    if (effects.parallaxTilt.centerOnly && !isMain) return;

    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 2;

    targetTilt.current = {
      index,
      x: clamp(x, -1, 1),
      y: clamp(y, -1, 1),
      strength: 1,
      active: true,
    };
  };

  const handleInteractionEnter = (
    event: React.PointerEvent<HTMLElement>,
    index: number,
    isMain: boolean,
  ) => {
    setHovered(index);
    updateTiltFromPointer(
      event.clientX,
      event.clientY,
      event.currentTarget,
      index,
      isMain,
    );
  };

  const handleInteractionMove = (
    event: React.PointerEvent<HTMLElement>,
    index: number,
    isMain: boolean,
  ) => {
    updateTiltFromPointer(
      event.clientX,
      event.clientY,
      event.currentTarget,
      index,
      isMain,
    );
  };

  const handleInteractionLeave = () => {
    setHovered(null);
    resetTilt();
  };

  const handleClick = (
    index: number,
    link: string,
    openInNewTab: boolean | undefined,
    isMain: boolean,
  ) => {
    if (pointer.current.moved > 8) return;

    if (isMain && link) {
      navigateToLink(link, openInNewTab);
      return;
    }

    focusItem(index);
  };

  const getItemLayout = (index: number) => {
    if (total === 1) {
      return {
        transform: "translate3d(0px, 0px, 0px) scale(1)",
        opacity: 1,
        distance: 0,
        frontness: 1,
        active: 1,
        delta: 0,
        zIndex: 10000,
      };
    }

    const delta = wrapDelta(index, progress, total);
    const angle = (delta / total) * Math.PI * 2;
    const angleDeg = (angle * 180) / Math.PI;

    const x = Math.sin(angle) * orbitRadius;
    const y = Math.cos(angle) * orbitRadius * ring.tilt;
    const z = Math.cos(angle) * orbitDepth - orbitDepth;

    const frontness = clamp((z + orbitDepth * 2) / (orbitDepth * 2), 0, 1);
    const active = clamp(1 - Math.abs(delta), 0, 1);

    const pyramidPower = ring.pyramid.enabled
      ? active * num(ring.pyramid.strength, 0.35)
      : 0;

    const pyramidY = ring.pyramid.enabled
      ? -pyramidPower * num(ring.pyramid.lift, 42)
      : 0;

    const activeBoost = active * (ring.activeScale - 1);
    const pyramidScale = ring.pyramid.enabled
      ? pyramidPower * num(ring.pyramid.scaleBoost, 0.08)
      : 0;

    const scale = clamp(
      0.48 + frontness * 0.5 + activeBoost + pyramidScale,
      0.25,
      1.22,
    );

    const opacity = clamp(
      0.1 +
        frontness * 1.12 +
        (ring.pyramid.enabled
          ? active * num(ring.pyramid.opacityBoost, 0.14)
          : 0),
      0,
      1,
    );

    const rotateY = ring.rotateCards ? -angleDeg * 0.34 : 0;
    const rotateX = ring.rotateCards ? -ring.tilt * 18 : 0;
    const rotateZ = ring.rotateCards ? delta * -5 : 0;

    return {
      transform: `translate3d(${x}px, ${
        y + pyramidY
      }px, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
      opacity,
      distance: 1 - frontness,
      frontness,
      active,
      delta,
      zIndex: Math.round(10000 + frontness * 1000 + active * 500),
    };
  };

  const globalGradeOverlay = gradeOverlay(effects.grade);

  return (
    <div
      aria-label="Interactive media gallery"
      role="application"
      ref={rootRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onMouseEnter={() => {
        hovering.current = true;
      }}
      onMouseLeave={() => {
        hovering.current = false;
        pointer.current.active = false;
        setHovered(null);
        resetTilt();
      }}
      onWheel={onWheel}
      style={{
        width: "100%",
        height: "100%",
        minWidth: 360,
        minHeight: 420,
        position: "relative",
        overflow: "hidden",
        background: look.background || "transparent",
        borderRadius: "inherit",
        perspective: layout.perspective,
        userSelect: "none",
        touchAction: motion.drag ? "none" : "auto",
        cursor: motion.drag ? "grab" : "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformStyle: "preserve-3d",
          transform: `translate3d(${layout.x}px, ${layout.y}px, 0) rotateX(42deg) scale(${
            layout.scale * responsiveScale
          })`,
        }}
      >
        {slides.map((item, index) => {
          const fallback = defaultItems[index % defaultItems.length];
          const src = getSrc(item.image) || getSrc(fallback.image);
          const label = item.title || fallback.title || "Media";
          const link = getLink(item.link);
          const mediaFit = item.fit || fallback.fit || look.objectFit;
          const mediaBackground =
            item.background ||
            fallback.background ||
            (src ? "transparent" : fallbackBackground(index));
          const mediaPadding = Math.max(
            0,
            num(item.imagePadding ?? fallback.imagePadding, 0),
          );
          const alt = getAlt(item.image) || getAlt(fallback.image) || label;

          const itemLayout = getItemLayout(index);
          const isHovered = hovered === index;
          const isMain = itemLayout.active > 0.55 || total === 1;
          const hasMainLink = isMain && link.length > 0;

          const tiltStrength =
            effects.parallaxTilt.enabled &&
            renderTilt.index === index &&
            (!effects.parallaxTilt.centerOnly || isMain)
              ? clamp(renderTilt.strength, 0, 1)
              : 0;

          const tiltAmount = num(effects.parallaxTilt.tilt, 10);
          const tiltX = -renderTilt.y * tiltAmount * tiltStrength;
          const tiltY = renderTilt.x * tiltAmount * tiltStrength;

          const imageMove = num(effects.parallaxTilt.imageMove, 16);
          const imageMoveX = renderTilt.x * imageMove * tiltStrength;
          const imageMoveY = renderTilt.y * imageMove * tiltStrength;

          const parallaxScale =
            1 + (num(effects.parallaxTilt.scale, 1.025) - 1) * tiltStrength;

          const hoverLiftStrength = effects.parallaxTilt.enabled
            ? tiltStrength
            : isHovered
              ? 1
              : 0;

          const hoverTranslateY = effects.hover.enabled
            ? num(effects.hover.lift, -10) * hoverLiftStrength
            : 0;

          const hoverScale = effects.hover.enabled
            ? 1 + (num(effects.hover.scale, 1.018) - 1) * hoverLiftStrength
            : 1;

          const dim =
            effects.inactiveDim > 0
              ? clamp(1 - itemLayout.distance * effects.inactiveDim, 0.32, 1)
              : 1;

          const blur =
            effects.depthBlur.enabled && view.quality !== "lite"
              ? clamp(
                  itemLayout.distance *
                    num(effects.depthBlur.amount, 0.22) *
                    qualityScale *
                    7,
                  0,
                  num(effects.depthBlur.maxBlur, 14),
                )
              : 0;

          const fogOpacity =
            effects.fog.enabled &&
            itemLayout.distance > num(effects.fog.start, 0.15)
              ? clamp(
                  itemLayout.distance * num(effects.fog.opacity, 0.12),
                  0,
                  0.75,
                )
              : 0;

          const hoverDistortStrength = effects.parallaxTilt.enabled
            ? tiltStrength
            : isHovered
              ? 1
              : 0;

          const distortionPower = effects.distortion.enabled
            ? itemLayout.active * num(effects.distortion.intensity, 0.45) +
              hoverDistortStrength * num(effects.distortion.hoverIntensity, 0.8)
            : 0;

          const imageScale =
            parallaxScale +
            distortionPower * (num(effects.distortion.scale, 1.03) - 1);

          const direction =
            itemLayout.delta === 0 ? 1 : Math.sign(itemLayout.delta);

          const imageSkew =
            distortionPower * num(effects.distortion.skew, 1.2) * direction;

          const imageRotate =
            distortionPower * num(effects.distortion.rotate, 0.6) * direction;

          const glassEnabled = !!look.glass3D.enabled;
          const glassThickness = glassEnabled
            ? num(look.glass3D.thickness, 22)
            : 0;
          const glassLayers = Math.max(
            1,
            Math.round(num(look.glass3D.layers, 8)),
          );
          const glassStep =
            glassThickness > 0 ? glassThickness / glassLayers : 0;
          const frontZ = glassThickness / 2;
          const backZ = -glassThickness / 2;
          const radius = num(look.radius, 18);
          const bevel = num(look.glass3D.bevel, 1);

          const interactionStyle: React.CSSProperties = {
            position: "absolute",
            inset: 0,
            zIndex: 999,
            display: "block",
            transform: `translateZ(${frontZ + 8}px)`,
            cursor: hasMainLink
              ? "pointer"
              : motion.clickToFocus
                ? "pointer"
                : "grab",
            touchAction: "manipulation",
            background: "transparent",
            ...maskStyle(effects.mask, radius),
          };

          const interactionHandlers = {
            onPointerEnter: (event: React.PointerEvent<HTMLElement>) =>
              handleInteractionEnter(event, index, isMain),
            onPointerMove: (event: React.PointerEvent<HTMLElement>) =>
              handleInteractionMove(event, index, isMain),
            onPointerLeave: handleInteractionLeave,
            onClick: (event: React.MouseEvent<HTMLElement>) => {
              if (pointer.current.moved > 8) {
                event.preventDefault();
                return;
              }

              event.stopPropagation();
              handleClick(index, link, item.openInNewTab, isMain);
            },
          };

          return (
            <div
              key={`${label}-${src}`}
              style={{
                position: "absolute",
                width: cardWidth,
                height: cardHeight,
                transform: itemLayout.transform,
                opacity: itemLayout.opacity * dim,
                zIndex: itemLayout.zIndex,
                filter: `blur(${blur}px)`,
                pointerEvents: itemLayout.opacity > 0.18 ? "auto" : "none",
                willChange: isStatic ? "auto" : "transform, opacity, filter",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transform: `perspective(${num(
                    effects.parallaxTilt.perspective,
                    900,
                  )}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(${hoverTranslateY}px) scale(${hoverScale})`,
                  willChange:
                    effects.parallaxTilt.enabled || effects.hover.enabled
                      ? "transform"
                      : "auto",
                }}
              >
                {glassEnabled && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        transform: `translateZ(${backZ}px)`,
                        background: alphaColor(
                          look.glass3D.tint,
                          num(look.glass3D.backOpacity, 0.12),
                        ),
                        border: `1px solid ${alphaColor(
                          "#ffffff",
                          num(look.glass3D.strokeOpacity, 0.22) * 0.8,
                        )}`,
                        filter: `blur(${num(look.glass3D.blur, 0.8)}px)`,
                        backfaceVisibility: "hidden",
                        pointerEvents: "none",
                        ...maskStyle(effects.mask, radius + bevel),
                      }}
                    />

                    {Array.from({ length: glassLayers }, (_, layerIndex) => {
                      const z = backZ + glassStep * (layerIndex + 1);
                      const depthFade = (layerIndex + 1) / glassLayers;

                      return (
                        <div
                          key={`depth-${z}`}
                          style={{
                            position: "absolute",
                            inset: 0,
                            transform: `translateZ(${z}px)`,
                            background: alphaColor(
                              look.glass3D.tint,
                              num(look.glass3D.edgeOpacity, 0.16) * depthFade,
                            ),
                            border: `1px solid ${alphaColor(
                              "#ffffff",
                              num(look.glass3D.strokeOpacity, 0.22) * 0.45,
                            )}`,
                            filter: `blur(${num(look.glass3D.blur, 0.8)}px)`,
                            pointerEvents: "none",
                            backfaceVisibility: "hidden",
                            ...maskStyle(effects.mask, radius + bevel),
                          }}
                        />
                      );
                    })}
                  </>
                )}

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transform: `translateZ(${frontZ}px)`,
                    overflow: "hidden",
                    background: mediaBackground,
                    boxShadow: boxShadowCss(look.shadow, isHovered ? 1.12 : 1),
                    border: look.border.enabled
                      ? `${num(look.border.width, 1)}px solid ${alphaColor(
                          look.border.color,
                          num(look.border.opacity, 0.18),
                        )}`
                      : "none",
                    backfaceVisibility: "hidden",
                    ...maskStyle(effects.mask, radius),
                  }}
                >
                  {src ? (
                    // biome-ignore lint/performance/noImgElement: arbitrary runtime sources and 3D transforms are core gallery behavior.
                    <img
                      src={src}
                      alt={alt}
                      draggable={false}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: mediaFit,
                        boxSizing: "border-box",
                        padding: mediaPadding,
                        filter: filterForGrade(effects.grade),
                        pointerEvents: "none",
                        transform: `translate3d(${imageMoveX}px, ${imageMoveY}px, 0) scale(${imageScale}) skewX(${imageSkew}deg) rotate(${imageRotate}deg)`,
                        willChange:
                          effects.parallaxTilt.enabled ||
                          effects.distortion.enabled
                            ? "transform"
                            : "auto",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: fallbackBackground(index),
                        transform: `translate3d(${imageMoveX}px, ${imageMoveY}px, 0) scale(${imageScale}) skewX(${imageSkew}deg) rotate(${imageRotate}deg)`,
                      }}
                    />
                  )}

                  {effects.parallaxTilt.enabled && tiltStrength > 0.001 && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        opacity: tiltStrength,
                        background: `radial-gradient(circle at ${
                          (renderTilt.x + 1) * 50
                        }% ${(renderTilt.y + 1) * 50}%, ${alphaColor(
                          "#ffffff",
                          num(effects.parallaxTilt.glowOpacity, 0.18),
                        )}, transparent 42%)`,
                        mixBlendMode: "screen",
                      }}
                    />
                  )}

                  {look.overlay.enabled && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background: `linear-gradient(${num(
                          look.overlay.angle,
                          180,
                        )}deg, ${alphaColor(
                          look.overlay.topColor,
                          num(look.overlay.topOpacity, 0.28),
                        )} 0%, rgba(0,0,0,0) ${num(
                          look.overlay.middle,
                          44,
                        )}%, ${alphaColor(
                          look.overlay.bottomColor,
                          num(look.overlay.bottomOpacity, 0.44),
                        )} 100%)`,
                      }}
                    />
                  )}

                  {globalGradeOverlay && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background: globalGradeOverlay,
                        mixBlendMode: "overlay",
                      }}
                    />
                  )}

                  {effects.fog.enabled && fogOpacity > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background: effects.fog.color || "#FFFFFF",
                        opacity: fogOpacity,
                      }}
                    />
                  )}

                  {glassEnabled && (
                    <>
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          pointerEvents: "none",
                          background: alphaColor(
                            look.glass3D.tint,
                            num(look.glass3D.faceOpacity, 0.08),
                          ),
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          pointerEvents: "none",
                          border: `1px solid ${alphaColor(
                            "#ffffff",
                            num(look.glass3D.strokeOpacity, 0.22),
                          )}`,
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(255,255,255,0.05)",
                          ...maskStyle(effects.mask, radius),
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          pointerEvents: "none",
                          background: `linear-gradient(135deg, ${alphaColor(
                            "#ffffff",
                            num(look.glass3D.highlightOpacity, 0.22),
                          )} 0%, rgba(255,255,255,0.04) 20%, rgba(255,255,255,0) 42%)`,
                          mixBlendMode: "screen",
                        }}
                      />
                    </>
                  )}

                  {effects.shine.enabled && view.quality !== "lite" && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        opacity: num(effects.shine.opacity, 0.1),
                        background: `linear-gradient(${num(
                          effects.shine.angle,
                          120,
                        )}deg, transparent 0%, ${alphaColor(
                          effects.shine.color,
                          1,
                        )} ${num(effects.shine.width, 18)}%, transparent ${
                          num(effects.shine.width, 18) * 2
                        }%)`,
                        transform: isHovered
                          ? `translateX(${num(effects.shine.travel, 55)}%)`
                          : `translateX(-${num(effects.shine.travel, 55)}%)`,
                        transition: `transform ${num(
                          effects.shine.duration,
                          0.8,
                        )}s cubic-bezier(0, 0.02, 0, 1)`,
                      }}
                    />
                  )}

                  {caption.showNumber && (
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 3,
                        top: 12,
                        left: 18,
                        color: caption.color,
                        lineHeight: 1,
                        pointerEvents: "none",
                        opacity: 0.86,
                        textShadow: textShadowCss(caption.shadow),
                        ...caption.numberFont,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  )}

                  {caption.showTitle && (
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 3,
                        bottom: 20,
                        left: 20,
                        right: 20,
                        color: caption.color,
                        lineHeight: 1,
                        pointerEvents: "none",
                        textShadow: textShadowCss(caption.shadow),
                        ...caption.titleFont,
                      }}
                    >
                      {label}
                    </div>
                  )}

                  <div style={textureStyle(effects.texture, qualityScale)} />
                </div>

                {hasMainLink ? (
                  <a
                    {...interactionHandlers}
                    data-ring-link="true"
                    href={link}
                    target={item.openInNewTab ? "_blank" : undefined}
                    rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    style={interactionStyle}
                  />
                ) : (
                  <div {...interactionHandlers} style={interactionStyle} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {look.vignette.enabled && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 80000,
            pointerEvents: "none",
            background: `radial-gradient(circle at ${num(
              look.vignette.x,
              50,
            )}% ${num(look.vignette.y, 50)}%, transparent ${num(
              look.vignette.innerSize,
              34,
            )}%, ${alphaColor(
              look.vignette.color,
              num(look.vignette.opacity, 0.62),
            )} ${num(look.vignette.outerSize, 100)}%)`,
          }}
        />
      )}
    </div>
  );
}

SmoothRingGallery.defaultProps = {
  width: 900,
  height: 560,
  items: defaultItems,
  view: defaults.view,
  layout: defaults.layout,
  motion: defaults.motion,
  ring: defaults.ring,
  look: defaults.look,
  effects: defaults.effects,
  caption: defaults.caption,
};
