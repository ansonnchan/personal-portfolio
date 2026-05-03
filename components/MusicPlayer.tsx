"use client";

import { useEffect, useRef, useState } from "react";

const track = "/assets/Fly_Me_To_The_Moon_Lofi_Cover_No_Copyright_KLICKAUD.mp3";
const credit = "Fly Me to the Moon (Lofi Cover) - MidnightWolfie     Original by Frank Sinatra";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.24);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [isMuted, volume]);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    await audio.play();
    setIsPlaying(true);
  }

  function adjustVolume(delta: number) {
    setIsMuted(false);
    setVolume((current) => Math.min(1, Math.max(0, Number((current + delta).toFixed(2)))));
  }

  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-3 shadow-panel">
      <audio ref={audioRef} src={track} preload="metadata" onEnded={() => setIsPlaying(false)} />
      <div className="flex items-start gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/midnight-wolfie.png"
          alt=""
          className={[
            "h-16 w-16 shrink-0 rounded-lg border border-[var(--border)] bg-transparent object-cover",
            isPlaying ? "music-art--playing" : "music-art--idle"
          ].join(" ")}
        />
        <div className="min-w-0 flex-1">
          <div className="overflow-hidden rounded border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-1">
            <p className="music-ticker whitespace-nowrap font-mono text-[10px] text-[var(--text-secondary)]">
              {credit}
            </p>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={togglePlayback}
              className="rounded p-1 opacity-85 transition hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={isPlaying ? "/assets/pause_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" : "/assets/play_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"}
                alt=""
                className="h-5 w-5 rounded-full bg-[var(--accent)]"
              />
            </button>
            <button
              type="button"
              onClick={() => setIsMuted((current) => !current)}
              className="rounded p-1 opacity-85 transition hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              aria-label={isMuted ? "Unmute music" : "Mute music"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/volume_off_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="" className="h-5 w-5 rounded-full bg-[var(--accent)]" />
            </button>
            <button
              type="button"
              onClick={() => adjustVolume(-0.08)}
              className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-xs text-[var(--text-secondary)] transition hover:border-[var(--bright-orange)] hover:text-[var(--bright-orange)]"
              aria-label="Volume down"
            >
              -
            </button>
            <button
              type="button"
              onClick={() => adjustVolume(0.08)}
              className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-xs text-[var(--text-secondary)] transition hover:border-[var(--bright-orange)] hover:text-[var(--bright-orange)]"
              aria-label="Volume up"
            >
              +
            </button>
            <span className="ml-auto font-mono text-[10px] text-[var(--text-muted)]">{Math.round((isMuted ? 0 : volume) * 100)}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
