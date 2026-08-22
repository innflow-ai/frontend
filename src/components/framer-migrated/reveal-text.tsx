"use client";

import {
  type Easing,
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

type CharacterProps = {
  char: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
  duration: number;
  easing: Easing;
  index: number;
  transitionStartIndex: number;
};

const EachCharacter = ({
  char,
  start,
  end,
  progress,
  duration,
  easing,
  index,
  transitionStartIndex,
}: CharacterProps) => {
  const colorProgress = useTransform(
    progress,
    [start, end],
    ["#373737", "#FFFFFF"],
  );
  const initialColor = index < transitionStartIndex ? "#FFFFFF" : "#373737";
  return (
    <motion.span
      style={{
        color: index < transitionStartIndex ? initialColor : colorProgress,
      }}
      transition={{ duration: duration, ease: easing }}
    >
      {char}
    </motion.span>
  );
};

type WordProps = {
  word: string;
  progress: MotionValue<number>;
  starting: number;
  ending: number;
  duration: number;
  easing: Easing;
  transitionStartIndex: number;
  currentCharacterIndex: number;
};

const EachWord = ({
  word,
  progress,
  starting,
  ending,
  duration,
  easing,
  transitionStartIndex,
  currentCharacterIndex,
}: WordProps) => {
  const characters = word.split("");
  const wordLength = word.length;
  const amount = ending - starting;
  const step = amount / wordLength;
  return (
    <motion.span>
      {characters.map((char, idx) => {
        const charStart = starting + step * idx;
        const charEnd = starting + step * (idx + 1);
        return (
          <EachCharacter
            key={`${char}-${charStart}`}
            char={char}
            start={charStart}
            end={charEnd}
            progress={progress}
            duration={duration}
            easing={easing}
            index={currentCharacterIndex + idx}
            transitionStartIndex={transitionStartIndex}
          />
        );
      })}
      &nbsp;
    </motion.span>
  );
};

export interface RevealTextProps {
  text?: string;
  duration?: number;
  easing?: Easing;
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
  paragraphAlign?: "flex-start" | "center" | "flex-end";
  transitionStartIndex?: number;
  fontFamily?: string;
}

export default function RevealText(props: RevealTextProps) {
  const {
    text = "Hello Text",
    duration = 0.3,
    easing = "easeInOut",
    fontSize = 48,
    lineHeight = 60,
    letterSpacing = -3,
    paragraphAlign = "center",
    transitionStartIndex = 22,
    fontFamily = "Urbanist",
  } = props;
  const words = text.split(" ");
  const totalWords = words.length;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "start 0.15"],
  });

  let currentCharacterIndex = 0;

  return (
    <p
      ref={ref}
      style={{
        fontFamily: `${fontFamily}, sans-serif`,
        fontSize: `${fontSize}px`,
        color: "#666666",
        display: "flex",
        flexWrap: "wrap",
        lineHeight: `${lineHeight}px`,
        letterSpacing: `${letterSpacing}px`,
        justifyContent: paragraphAlign,
        margin: 0,
      }}
    >
      {words.map((word, idx) => {
        const starting = idx / totalWords;
        const ending = (idx + 1) / totalWords;
        const wordLength = word.length;
        const startIdx = currentCharacterIndex;
        currentCharacterIndex += wordLength + 1; // Including space

        return (
          <EachWord
            key={`${word}-${starting}`}
            word={word}
            progress={scrollYProgress}
            starting={starting}
            ending={ending}
            duration={duration}
            easing={easing}
            transitionStartIndex={transitionStartIndex}
            currentCharacterIndex={startIdx}
          />
        );
      })}
    </p>
  );
}
