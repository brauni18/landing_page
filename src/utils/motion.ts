type HoverMotionTokens = {
  enterDuration: number;
  leaveDuration: number;
  ease: string;
  liftY: number;
  scale: number;
  glowOpacity: number;
  glowRadiusProject: number;
  glowRadiusStack: number;
  glowRadiusHero: number;
  glowAlphaProject: number;
  glowAlphaStack: number;
  glowAlphaHero: number;
};

const DEFAULT_TOKENS: HoverMotionTokens = {
  enterDuration: 0.22,
  leaveDuration: 0.28,
  ease: 'power2.out',
  liftY: -3,
  scale: 1.003,
  glowOpacity: 0.65,
  glowRadiusProject: 130,
  glowRadiusStack: 170,
  glowRadiusHero: 260,
  glowAlphaProject: 0.1,
  glowAlphaStack: 0.1,
  glowAlphaHero: 0.12,
};

function readCssVar(name: string): string {
  if (typeof window === 'undefined') {
    return '';
  }

  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function readSeconds(name: string, fallback: number): number {
  const value = readCssVar(name);

  if (!value) {
    return fallback;
  }

  if (value.endsWith('ms')) {
    const ms = Number.parseFloat(value.slice(0, -2));
    return Number.isFinite(ms) ? ms / 1000 : fallback;
  }

  if (value.endsWith('s')) {
    const seconds = Number.parseFloat(value.slice(0, -1));
    return Number.isFinite(seconds) ? seconds : fallback;
  }

  const numeric = Number.parseFloat(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function readNumber(name: string, fallback: number): number {
  const value = Number.parseFloat(readCssVar(name));
  return Number.isFinite(value) ? value : fallback;
}

function parseGsapEase(value: string, fallback: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return fallback;
  }

  if (trimmed.startsWith('cubic-bezier(') && trimmed.endsWith(')')) {
    const points = trimmed
      .slice('cubic-bezier('.length, -1)
      .split(',')
      .map((point) => Number.parseFloat(point.trim()));

    if (points.length === 4 && points.every((point) => Number.isFinite(point))) {
      return `cubic(${points[0]}, ${points[1]}, ${points[2]}, ${points[3]})`;
    }
  }

  return trimmed;
}

export function readHoverMotionTokens(): HoverMotionTokens {
  return {
    enterDuration: readSeconds('--motion-hover-duration-in', DEFAULT_TOKENS.enterDuration),
    leaveDuration: readSeconds('--motion-hover-duration-out', DEFAULT_TOKENS.leaveDuration),
    ease: parseGsapEase(readCssVar('--motion-hover-ease'), DEFAULT_TOKENS.ease),
    liftY: readNumber('--motion-hover-lift-y', DEFAULT_TOKENS.liftY),
    scale: readNumber('--motion-hover-scale', DEFAULT_TOKENS.scale),
    glowOpacity: readNumber('--motion-glow-opacity', DEFAULT_TOKENS.glowOpacity),
    glowRadiusProject: readNumber('--motion-glow-radius-project', DEFAULT_TOKENS.glowRadiusProject),
    glowRadiusStack: readNumber('--motion-glow-radius-stack', DEFAULT_TOKENS.glowRadiusStack),
    glowRadiusHero: readNumber('--motion-glow-radius-hero', DEFAULT_TOKENS.glowRadiusHero),
    glowAlphaProject: readNumber('--motion-glow-alpha-project', DEFAULT_TOKENS.glowAlphaProject),
    glowAlphaStack: readNumber('--motion-glow-alpha-stack', DEFAULT_TOKENS.glowAlphaStack),
    glowAlphaHero: readNumber('--motion-glow-alpha-hero', DEFAULT_TOKENS.glowAlphaHero),
  };
}
