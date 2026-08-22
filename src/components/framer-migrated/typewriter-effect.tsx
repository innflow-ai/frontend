"use client";

// Typewriter effect with configurable static text, words, speeds, cursor, and font
import {
  type CSSProperties,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface TypewriterEffectProps {
  staticText?: string;
  words?: string[];
  typeMode?: "letter" | "word";
  speed?: number;
  eraseSpeed?: number;
  delay?: number;
  cursor?: boolean;
  cursorCharacter?: string;
  cursorColor?: string;
  font?: CSSProperties;
  style?: CSSProperties;
  colors?: { color: string; label: string }[];
}

const defaultFont: CSSProperties = {
  fontSize: 18,
  fontWeight: 400,
  letterSpacing: 0,
  lineHeight: 1.5,
  textAlign: "left",
};

/**
 * Typewriter Effect
 *
 * @framerIntrinsicWidth 300
 * @framerIntrinsicHeight 50
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function TypewriterEffect(props: TypewriterEffectProps) {
  const {
    staticText = "Search for",
    words = ["internet", "YouTube", "WIX"],
    typeMode = "letter",
    speed = 100,
    eraseSpeed = 50,
    delay = 1500,
    cursor = true,
    cursorCharacter = "|",
    cursorColor = "#000",
    font = defaultFont,
    style,
    colors = [
      { color: "#000", label: "Static text" },
      { color: "#000", label: "Animated words" },
    ],
  } = props;

  const [displayedText, setDisplayedText] = useState("");
  const [blink, setBlink] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef({
    wordIndex: 0,
    charIndex: 0,
    isDeleting: false,
    lastTime: 0,
    blinkTime: 0,
  });
  const displayedTextRef = useRef("");
  const wasPausedRef = useRef(false);

  const fontStyles = useMemo(
    () => ({
      fontSize: font.fontSize,
      fontWeight: font.fontWeight,
      fontStyle: font.fontStyle,
      letterSpacing: font.letterSpacing,
      lineHeight: font.lineHeight,
      textAlign: font.textAlign,
      fontFamily: font.fontFamily,
    }),
    [
      font.fontSize,
      font.fontWeight,
      font.fontStyle,
      font.letterSpacing,
      font.lineHeight,
      font.textAlign,
      font.fontFamily,
    ],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof IntersectionObserver === "undefined") {
      startTransition(() => setIsVisible(true));
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const nextVisible = Boolean(entry?.isIntersecting);
        if (!nextVisible) {
          wasPausedRef.current = true;
        }
        startTransition(() => setIsVisible(nextVisible));
      },
      { threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!words || words.length === 0 || !isVisible) return;

    let rafId: number;
    const state = animationRef.current;

    if (wasPausedRef.current) {
      const now =
        typeof window !== "undefined" && typeof performance !== "undefined"
          ? performance.now()
          : Date.now();
      state.lastTime = now;
      state.blinkTime = now;
      wasPausedRef.current = false;
    }

    const animate = (currentTime: number) => {
      // Handle cursor blink
      if (currentTime - state.blinkTime >= 500) {
        state.blinkTime = currentTime;
        startTransition(() => setBlink((prev) => !prev));
      }

      const currentWord = words[state.wordIndex];
      const timeDiff = currentTime - state.lastTime;

      if (typeMode === "word") {
        if (
          !state.isDeleting &&
          displayedTextRef.current !== currentWord &&
          timeDiff >= speed
        ) {
          state.lastTime = currentTime;
          displayedTextRef.current = currentWord;
          startTransition(() => setDisplayedText(currentWord));
        } else if (
          displayedTextRef.current === currentWord &&
          !state.isDeleting &&
          timeDiff >= delay
        ) {
          state.lastTime = currentTime;
          state.isDeleting = true;
        } else if (state.isDeleting && timeDiff >= eraseSpeed) {
          state.lastTime = currentTime;
          state.isDeleting = false;
          state.wordIndex = (state.wordIndex + 1) % words.length;
          displayedTextRef.current = "";
          startTransition(() => setDisplayedText(""));
        }
      } else {
        // Letter-by-letter mode
        if (
          !state.isDeleting &&
          state.charIndex < currentWord.length &&
          timeDiff >= speed
        ) {
          state.lastTime = currentTime;
          state.charIndex++;
          const nextText = currentWord.slice(0, state.charIndex);
          displayedTextRef.current = nextText;
          startTransition(() => setDisplayedText(nextText));
        } else if (
          state.charIndex === currentWord.length &&
          !state.isDeleting &&
          timeDiff >= delay
        ) {
          state.lastTime = currentTime;
          state.isDeleting = true;
        } else if (
          state.isDeleting &&
          state.charIndex > 0 &&
          timeDiff >= eraseSpeed
        ) {
          state.lastTime = currentTime;
          state.charIndex--;
          const nextText = currentWord.slice(0, state.charIndex);
          displayedTextRef.current = nextText;
          startTransition(() => setDisplayedText(nextText));
        } else if (state.isDeleting && state.charIndex === 0) {
          state.lastTime = currentTime;
          state.isDeleting = false;
          state.wordIndex = (state.wordIndex + 1) % words.length;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [words, typeMode, speed, eraseSpeed, delay, isVisible]);

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        ...fontStyles,
        color: colors[0]?.color || "#000",
        width: "100%",
        minWidth: 0,
        display: "inline-block",
        whiteSpace: "pre-line",
      }}
    >
      <span style={{ color: colors[0]?.color }}>{staticText}</span>{" "}
      <span style={{ color: colors[1]?.color }}>{displayedText}</span>
      {cursor && (
        <span
          style={{ opacity: blink ? 1 : 0, color: cursorColor }}
          aria-hidden="true"
        >
          {cursorCharacter || "|"}
        </span>
      )}
    </div>
  );
}
