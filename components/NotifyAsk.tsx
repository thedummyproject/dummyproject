"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { copy } from "@/lib/site";

type Status = "idle" | "done" | "error";

type Chip = {
  x: number;
  y: number;
  rot: number;
  delay: number;
  color: string;
  w: number;
  h: number;
  round?: boolean;
};

const ADDRESS = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
/* The logo's own four inks: amber, action blue, crimson, teal. */
const AMBER = "#ffc43a";
const BLUE = "#4c5aa8";
const CRIMSON = "#bc2029";
const TEAL = "#0a7f78";

/* Caution-tape chips fired on a successful submit. */
const CELEBRATION_CHIPS: Chip[] = [
  { x: -54, y: -50, rot: -150, delay: 0, color: AMBER, w: 6, h: 12 },
  { x: -34, y: -72, rot: 120, delay: 30, color: TEAL, w: 7, h: 13 },
  { x: -16, y: -84, rot: 210, delay: 0, color: CRIMSON, w: 6, h: 10, round: true },
  { x: 2, y: -90, rot: -90, delay: 45, color: AMBER, w: 5, h: 14 },
  { x: 20, y: -80, rot: 160, delay: 18, color: BLUE, w: 7, h: 12 },
  { x: 40, y: -62, rot: -190, delay: 62, color: AMBER, w: 6, h: 11, round: true },
  { x: 56, y: -40, rot: 110, delay: 34, color: TEAL, w: 6, h: 13 },
  { x: -62, y: -30, rot: 90, delay: 52, color: CRIMSON, w: 7, h: 12 },
  { x: 66, y: -16, rot: 150, delay: 12, color: AMBER, w: 6, h: 10 },
  { x: -48, y: -10, rot: -120, delay: 40, color: BLUE, w: 5, h: 13 },
  { x: 52, y: -4, rot: 100, delay: 72, color: CRIMSON, w: 6, h: 12, round: true },
  { x: -28, y: -88, rot: 70, delay: 8, color: AMBER, w: 7, h: 12 },
  { x: 30, y: -90, rot: -170, delay: 48, color: TEAL, w: 6, h: 11 },
  { x: -70, y: -18, rot: -100, delay: 26, color: AMBER, w: 6, h: 10 },
  { x: 74, y: -30, rot: 130, delay: 56, color: BLUE, w: 7, h: 13 },
  { x: 8, y: -74, rot: 230, delay: 22, color: CRIMSON, w: 6, h: 12 },
];

export function NotifyAsk() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const done = status === "done";
  const wrong = status === "error";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (done) return;

    const value = email.trim();
    if (!ADDRESS.test(value)) {
      setStatus("error");
      setMessage("That email address doesn't look right. Check it and try again.");
      return;
    }

    // Confirm immediately; persistence happens in the background and should not
    // make the visitor wait for a third-party response.
    setStatus("done");
    setMessage(copy.success);

    void fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: value }),
      keepalive: true,
    }).catch(() => undefined);
  }

  return (
    <>
      <p
        id="notify-status"
        className={
          done ? "prompt prompt--success" : wrong ? "prompt prompt--wrong" : "prompt"
        }
        aria-live="polite"
      >
        {message ?? copy.prompt}
      </p>

      <form
        className={done ? "notify notify--done" : "notify"}
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="sr-only" htmlFor="notify-email">
          Email address
        </label>
        <input
          id="notify-email"
          className="notify__field"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          placeholder={copy.placeholder}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (wrong) {
              setStatus("idle");
              setMessage(null);
            }
          }}
          readOnly={done}
          disabled={done}
          aria-invalid={wrong}
          aria-describedby="notify-status"
        />
        <button
          className="notify__action"
          type="submit"
          disabled={status === "sending" || done}
        >
          {done ? <Check /> : null}
          <span>{done ? copy.sent : copy.action}</span>
        </button>

        {done ? (
          <span className="notify-celebrate" aria-hidden="true">
            {CELEBRATION_CHIPS.map((chip, index) => (
              <i
                key={index}
                className={
                  chip.round
                    ? "notify-celebrate__chip notify-celebrate__chip--round"
                    : "notify-celebrate__chip"
                }
                style={
                  {
                    "--tx": `${chip.x}px`,
                    "--ty": `${chip.y}px`,
                    "--rot": `${chip.rot}deg`,
                    "--delay": `${chip.delay}ms`,
                    "--chip": chip.color,
                    "--cw": `${chip.w}px`,
                    "--ch": `${chip.h}px`,
                  } as CSSProperties
                }
              />
            ))}
          </span>
        ) : null}
      </form>
    </>
  );
}

function Check() {
  return (
    <svg
      className="notify__check"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path pathLength={1} d="M3 8.5 6.4 12 13 4.5" />
    </svg>
  );
}
