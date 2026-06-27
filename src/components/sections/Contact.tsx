"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PURPOSE_OPTIONS } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  span,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  span?: boolean;
}) {
  return (
    <label className={`group flex flex-col gap-2 ${span ? "sm:col-span-2" : ""}`}>
      <span className="text-[11px] uppercase tracking-[0.2em] text-mute">
        {label} {required && <span className="text-sky-glow/70">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        data-cursor
        className="w-full border-b border-line bg-transparent pb-2.5 text-base text-fg outline-none transition-colors placeholder:text-faint focus:border-sky-glow [color-scheme:dark]"
      />
    </label>
  );
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [openSelect, setOpenSelect] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-36">
      {/* searchlight sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-40%] h-[120%] w-[60%] -translate-x-1/2 animate-[sweep_9s_ease-in-out_infinite] bg-[conic-gradient(from_90deg_at_50%_0%,transparent_42%,rgba(110,168,255,0.10)_50%,transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(47,123,255,0.12),transparent_55%)]" />
      </div>

      <div className="shell relative">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-8 bg-line-strong" />
              <span className="eyebrow">Contact · 11</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-lg mt-5 text-balance text-fg">
                Let&apos;s put your moment in the sky.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-pretty text-base leading-relaxed text-haze/70">
                Tell us what you want the world to look up and see. Our flight team
                will design the deployment and respond within 24 hours.
              </p>
            </Reveal>

            {/* hovering drone */}
            <div className="relative mt-16 hidden h-40 lg:block">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-4 top-0"
              >
                <DroneIcon />
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass relative overflow-hidden rounded-3xl p-7 sm:p-10">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 gap-7 sm:grid-cols-2"
                  >
                    <Field label="Name" name="name" required placeholder="Your full name" />
                    <Field label="Company" name="company" placeholder="Organisation" />
                    <Field label="Email" name="email" type="email" required placeholder="you@company.com" />
                    <Field label="Phone" name="phone" type="tel" placeholder="+1 000 000 0000" />
                    <Field label="City" name="city" placeholder="Where it flies" />
                    <Field label="Event Date" name="date" type="date" />
                    <Field label="Budget" name="budget" placeholder="Estimated range" />

                    {/* purpose dropdown */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-mute">Purpose</span>
                      <div className="relative">
                        <button
                          type="button"
                          data-cursor
                          onClick={() => setOpenSelect((v) => !v)}
                          className="flex w-full items-center justify-between border-b border-line bg-transparent pb-2.5 text-left text-base outline-none transition-colors focus:border-sky-glow"
                        >
                          <span className={purpose ? "text-fg" : "text-faint"}>
                            {purpose || "Select purpose"}
                          </span>
                          <span className={`text-mute transition-transform ${openSelect ? "rotate-180" : ""}`}>⌄</span>
                        </button>
                        <input type="hidden" name="purpose" value={purpose} />
                        <AnimatePresence>
                          {openSelect && (
                            <motion.ul
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.2 }}
                              className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-line bg-coal/95 backdrop-blur-xl"
                            >
                              {PURPOSE_OPTIONS.map((opt) => (
                                <li key={opt}>
                                  <button
                                    type="button"
                                    data-cursor
                                    onClick={() => {
                                      setPurpose(opt);
                                      setOpenSelect(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left text-sm text-haze/80 transition-colors hover:bg-white/5 hover:text-fg"
                                  >
                                    {opt}
                                  </button>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <label className="group flex flex-col gap-2 sm:col-span-2">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-mute">Message</span>
                      <textarea
                        name="message"
                        rows={3}
                        data-cursor
                        placeholder="Tell us about the moment you want to own…"
                        className="w-full resize-none border-b border-line bg-transparent pb-2.5 text-base text-fg outline-none transition-colors placeholder:text-faint focus:border-sky-glow"
                      />
                    </label>

                    <div className="mt-2 sm:col-span-2">
                      <MagneticButton type="submit" variant="primary" className="w-full sm:w-auto">
                        Launch My Campaign
                        <span className="text-base">↗</span>
                      </MagneticButton>
                    </div>
                  </motion.form>
                ) : (
                  <Success key="success" onReset={() => setSubmitted(false)} />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes sweep {
          0%, 100% { transform: translateX(-50%) rotate(-18deg); }
          50% { transform: translateX(-50%) rotate(18deg); }
        }
      `}</style>
    </section>
  );
}

function Success({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[420px] flex-col items-center justify-center text-center"
    >
      <div className="relative h-40 w-40">
        {/* light trails */}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: [0, 90, 0], opacity: [0, 0.7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25, ease: "easeOut" }}
            className="absolute bottom-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-t from-sky-glow to-transparent"
            style={{ marginLeft: (i - 1) * 14 }}
          />
        ))}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: -10, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-6 -translate-x-1/2"
        >
          <DroneIcon glow />
        </motion.div>
      </div>
      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 font-display text-3xl tracking-tight text-fg"
      >
        Cleared for takeoff.
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-3 max-w-sm text-sm leading-relaxed text-haze/70"
      >
        Your request is airborne. Our flight team will reach out within 24 hours to
        design your aerial campaign.
      </motion.p>
      <button
        data-cursor
        onClick={onReset}
        className="mt-8 text-sm text-sky-glow/80 underline-offset-4 transition-colors hover:text-fg hover:underline"
      >
        Submit another request
      </button>
    </motion.div>
  );
}

function DroneIcon({ glow }: { glow?: boolean }) {
  return (
    <svg width="76" height="48" viewBox="0 0 76 48" fill="none" className={glow ? "drop-shadow-[0_0_18px_rgba(110,168,255,0.8)]" : ""}>
      <rect x="28" y="22" width="20" height="9" rx="2" fill="#15171c" stroke="#3a3f48" />
      <rect x="33" y="25" width="10" height="3.5" rx="0.5" fill="#2f7bff" />
      <path d="M28 24L10 16M48 24l18-8M28 29L10 37M48 29l18 8" stroke="#3a3f48" strokeWidth="1.5" />
      {[10, 66].map((x) =>
        [16, 37].map((y) => (
          <g key={`${x}-${y}`}>
            <ellipse cx={x} cy={y} rx="9" ry="2" fill="#6ea8ff" fillOpacity="0.25" />
            <circle cx={x} cy={y} r="2.2" fill="#1b1d22" />
          </g>
        )),
      )}
    </svg>
  );
}
