"use client";

import { useEffect, useRef, useState } from "react";

const track = "/assets/Fly_Me_To_The_Moon_Lofi_Cover_No_Copyright_KLICKAUD.mp3";
const birthday = new Date("2026-05-09T00:00:00-07:00").getTime();

function getRemaining() {
  const remaining = Math.max(0, birthday - Date.now());
  const seconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60
  };
}

function compactBirthday({
  days,
  hours,
  minutes,
  seconds
}: ReturnType<typeof getRemaining>) {
  return `${String(days).padStart(2, "0")}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [volume, setVolume] = useState(0.24);
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [isMuted, volume]);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

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
    <section className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-2.5">
      <audio ref={audioRef} src={track} preload="metadata" loop />

      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--bright-orange)]">
          lofi desk
        </p>
        <button
          type="button"
          onClick={() => setIsCollapsed((current) => !current)}
          className="flex h-5 w-5 items-center justify-center rounded border border-[var(--border)] font-mono text-xs text-[var(--text-secondary)] transition hover:border-[var(--bright-orange)] hover:text-[var(--bright-orange)]"
          aria-label={isCollapsed ? "Expand music and birthday panel" : "Minimize music and birthday panel"}
        >
          {isCollapsed ? "+" : "-"}
        </button>
      </div>

      {isCollapsed ? (
        <div className="font-mono text-[10px] text-[var(--text-muted)]">
          lofi.exe
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/midnight-wolfie.png"
                alt=""
                className="music-art--playing h-14 w-14 rounded-lg border border-[var(--border)] bg-transparent object-cover"
              />
              <div className="mt-1 flex justify-center gap-1.5">
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="music-control"
                  aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={isPlaying ? "/assets/pause_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" : "/assets/play_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"}
                    alt=""
                    className="h-7 w-7"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMuted((current) => !current)}
                  className="music-control"
                  aria-label={isMuted ? "Unmute music" : "Mute music"}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/volume_off_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="" className="h-7 w-7" />
                </button>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="max-w-[7rem] font-mono text-[9px] leading-4 text-[var(--text-primary)]">Fly Me to the Moon (Lofi ver.)</p>
              <p className="font-mono text-[9px] leading-4 text-[var(--text-muted)]">MidnightWolfie</p>
              <p className="font-mono text-[9px] leading-4 text-[var(--bright-orange)]">Copyright Free</p>
              <div className="mt-2 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => adjustVolume(-0.08)}
                  className="rounded border border-[var(--border)] px-2 py-1 font-mono text-xs text-[var(--text-secondary)] transition hover:border-[var(--bright-orange)] hover:text-[var(--bright-orange)]"
                  aria-label="Volume down"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => adjustVolume(0.08)}
                  className="rounded border border-[var(--border)] px-2 py-1 font-mono text-xs text-[var(--text-secondary)] transition hover:border-[var(--bright-orange)] hover:text-[var(--bright-orange)]"
                  aria-label="Volume up"
                >
                  +
                </button>
                <span className="ml-auto font-mono text-[9px] text-[var(--text-muted)]">{Math.round((isMuted ? 0 : volume) * 100)}%</span>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] p-2">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] font-semibold text-[var(--bright-orange)]">birthday.exe</p>
              <p className="mt-1 font-mono text-sm font-semibold text-[var(--text-primary)]">{compactBirthday(remaining)}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
