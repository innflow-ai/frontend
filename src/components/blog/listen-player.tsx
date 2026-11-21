"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play } from "@/components/icons/mage";
import styles from "./article.module.css";

const SPEEDS = [1, 1.5, 2] as const;

function formatClock(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const mins = Math.floor(whole / 60);
  const secs = whole % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function estimatedDuration(text: string, rate: number) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return (words / 160) * 60 * (1 / rate);
}

export function BlogListenPlayer({
  text,
  audioUrl,
}: {
  text: string;
  audioUrl?: string | null;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [playing, setPlaying] = useState(false);
  const [rateIndex, setRateIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");
  const rate = SPEEDS[rateIndex] ?? 1;
  const sourceText = useMemo(() => text.replace(/\s+/g, " ").trim(), [text]);
  const canPlay = Boolean(audioUrl || sourceText);

  useEffect(() => {
    if (!audioUrl) setDuration(estimatedDuration(sourceText, rate));
  }, [sourceText, rate, audioUrl]);

  useEffect(() => {
    const audio = audioUrl ? audioRef.current : null;
    return () => {
      window.speechSynthesis?.cancel();
      audio?.pause();
    };
  }, [audioUrl]);

  const stopSpeech = () => {
    window.speechSynthesis?.cancel();
    utteranceRef.current = null;
  };

  const toggle = async () => {
    if (!canPlay) return;
    setError("");

    if (audioUrl && audioRef.current) {
      const audio = audioRef.current;
      if (playing) {
        audio.pause();
        setPlaying(false);
        return;
      }
      audio.playbackRate = rate;
      try {
        await audio.play();
      } catch {
        setPlaying(false);
        setError("Audio could not play. Please try again.");
      }
      return;
    }

    if (
      !window.speechSynthesis ||
      typeof SpeechSynthesisUtterance === "undefined"
    ) {
      setError(
        "Narration is unavailable in this browser. You can read the article below.",
      );
      return;
    }
    if (!sourceText) return;

    if (playing) {
      window.speechSynthesis.pause();
      setPlaying(false);
      return;
    }

    if (window.speechSynthesis.paused && utteranceRef.current) {
      window.speechSynthesis.resume();
      setPlaying(true);
      return;
    }

    stopSpeech();
    const utterance = new SpeechSynthesisUtterance(sourceText);
    utterance.rate = rate;
    utterance.onend = () => {
      setPlaying(false);
      setElapsed(duration);
    };
    utterance.onerror = (event) => {
      if (event.error === "canceled" || event.error === "interrupted") return;
      setPlaying(false);
      setError("Narration stopped. Please try again.");
    };
    utterance.onboundary = (event) => {
      if (event.name !== "word" || !sourceText.length) return;
      const progress = event.charIndex / sourceText.length;
      setElapsed(progress * duration);
    };
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  };

  const cycleSpeed = () => {
    const next = (rateIndex + 1) % SPEEDS.length;
    setRateIndex(next);
    const nextRate = SPEEDS[next] ?? 1;
    if (audioRef.current) audioRef.current.playbackRate = nextRate;
    if (utteranceRef.current) utteranceRef.current.rate = nextRate;
  };

  const progress = duration > 0 ? Math.min(elapsed / duration, 1) : 0;

  return (
    <div className={styles.listen}>
      {audioUrl ? (
        // biome-ignore lint/a11y/useMediaCaption: generated narration; article text is the transcript
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
          onTimeUpdate={(event) => setElapsed(event.currentTarget.currentTime)}
          onLoadedMetadata={(event) =>
            setDuration(event.currentTarget.duration)
          }
          onEnded={() => setPlaying(false)}
          onPlay={() => {
            setError("");
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          onError={() => {
            setPlaying(false);
            setError("Audio could not load. Please try again.");
          }}
        />
      ) : null}
      <p className={styles.listenLabel}>Listen to this post</p>
      <div className={styles.listenRow}>
        <button
          type="button"
          className={styles.listenPlay}
          onClick={toggle}
          disabled={!canPlay}
          aria-label={playing ? "Pause article audio" : "Play article audio"}
        >
          {playing ? (
            <Pause size={18} weight="fill" aria-hidden="true" />
          ) : (
            <Play size={18} weight="fill" aria-hidden="true" />
          )}
        </button>
        <div
          className={styles.listenTrack}
          aria-hidden="true"
          style={{ ["--listen-progress" as string]: `${progress * 100}%` }}
        />
        <span className={styles.listenTime}>
          {formatClock(elapsed)} / {formatClock(duration)}
        </span>
        <button
          type="button"
          className={styles.listenSpeed}
          onClick={cycleSpeed}
          aria-label={`Playback speed ${rate}x`}
        >
          {rate}x
        </button>
      </div>
      {error ? <p role="status">{error}</p> : null}
    </div>
  );
}
