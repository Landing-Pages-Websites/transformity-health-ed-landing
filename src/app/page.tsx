"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";

/* ─── Reveal on scroll ─── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Icons ─── */
const PhoneIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const XIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const StarIcon = ({ className = "w-5 h-5 text-amber-400" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.951 2.71c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.048 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);
const BoltIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);
const HeartIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);
const MicroscopeIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
  </svg>
);

/* ─── Sticky CTA bar (mobile only) ─── */
function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-[#07403F] border-t border-amber-500/30 px-4 py-3 flex gap-3 shadow-2xl">
        <a
          href="tel:9177044886"
          className="flex-1 flex items-center justify-center gap-2 bg-white text-[#07403F] font-bold py-3 rounded-lg text-sm"
        >
          <PhoneIcon className="w-4 h-4" />
          Call Now
        </a>
        <a
          href="#consultation"
          className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-white font-bold py-3 rounded-lg text-sm"
        >
          Free Consult
        </a>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function Page() {
  return (
    <>
      <StickyCTA />

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#hero" className="relative h-9 sm:h-10 w-40 sm:w-48 block">
            <Image
              src="/logo.png"
              alt="Transformity Health"
              fill
              className="object-contain object-left"
              priority
              sizes="200px"
            />
          </a>
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="tel:9177044886"
              className="hidden sm:flex items-center gap-2 text-[#07403F] font-semibold text-sm hover:text-amber-600 transition-colors"
            >
              <PhoneIcon className="w-4 h-4" />
              917-704-4886
            </a>
            <a
              href="#consultation"
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm transition-colors"
            >
              Free Consultation
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section id="hero" className="relative bg-[#07403F] overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(201,168,76,0.45) 0%, transparent 45%), radial-gradient(circle at 85% 70%, rgba(13,94,92,0.7) 0%, transparent 50%)",
            }}
          />
          <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-20">
            <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/30 rounded-full px-3.5 py-1.5 mb-6">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-amber-300 text-xs font-semibold tracking-wider uppercase">
                    Harvard-Trained Physician • Hallandale Beach, FL
                  </span>
                </div>
                <h1
                  className="text-white text-4xl sm:text-5xl md:text-[3.4rem] font-bold leading-[1.05] mb-6"
                  style={{ fontFamily: "Lora, Georgia, serif" }}
                >
                  ED Isn&rsquo;t Just About Confidence.
                  <br />
                  <span className="text-amber-400">It&rsquo;s Your Body Asking for Help.</span>
                </h1>
                <p className="text-white/80 text-lg leading-relaxed mb-7 max-w-xl">
                  Most treatments mask the symptoms. At Transformity Health,
                  Dr. Liv Uslar &mdash; Harvard-trained MD/PhD &mdash; finds the root cause
                  of your ED through advanced diagnostics and delivers a personalized,
                  pill-free treatment plan.
                </p>
                <ul className="space-y-3 mb-8 max-w-lg">
                  {(
                    [
                      { text: "GainsWave shockwave therapy with documented 60–80% success rates", mobile: true },
                      { text: "Hormone, gut health & metabolic optimization", mobile: true },
                      { text: "Advanced bloodwork and biomarker testing", mobile: true },
                      // M2: cut the 4th bullet on mobile — duplicates the paragraph above.
                      { text: "No quick fixes — real, lasting results, no pill dependency", mobile: false },
                    ] as { text: string; mobile: boolean }[]
                  ).map((item) => (
                    <li key={item.text} className={`items-start gap-3 ${item.mobile ? "flex" : "hidden sm:flex"}`}>
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                        <CheckIcon className="w-3 h-3" />
                      </span>
                      <span className="text-white/85 text-[0.97rem]">{item.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-6">
                  {/* M2: hide avatar pile on mobile — the 5-star + review-count line carries the same signal. */}
                  <div className="hidden sm:flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {["D", "M", "J", "A"].map((c) => (
                        <div
                          key={c}
                          className="w-9 h-9 rounded-full bg-amber-400/25 border-2 border-[#07403F] flex items-center justify-center text-xs text-amber-200 font-bold"
                          aria-hidden="true"
                        >
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Star + review-count line — shown on all widths. */}
                  <div>
                    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white/65 text-xs mt-0.5">
                      207 Google reviews · 5.0 rating
                    </p>
                  </div>
                  <a
                    href="tel:9177044886"
                    className="hidden md:inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 font-semibold text-sm transition-colors"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    917-704-4886
                  </a>
                </div>
              </div>

              <div id="consultation" className="md:col-span-5">
                <LeadForm variant="hero" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust Bar ── */}
        <section id="credentials" className="bg-[#052e2d] py-8 md:py-6 border-b border-amber-500/20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { stat: "5.0 ★", label: "Google Rating" },
                { stat: "207+", label: "Five-Star Reviews" },
                { stat: "Harvard", label: "Trained MD/PhD" },
                { stat: "0% APR", label: "Financing Available" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-amber-400 font-bold text-xl sm:text-2xl">{item.stat}</p>
                  <p className="text-white/65 text-[0.7rem] sm:text-xs mt-1 uppercase tracking-wide">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The Problem ── */}
        <section id="why-pills-fail" className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center mb-14">
                <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
                  Why Pills Don&rsquo;t Work
                </p>
                <h2
                  className="text-3xl md:text-[2.5rem] font-bold text-[#07403F] mb-5 leading-tight"
                  style={{ fontFamily: "Lora, Georgia, serif" }}
                >
                  Pills Postpone the Problem.
                  <br />
                  They Don&rsquo;t Solve It.
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Erectile dysfunction is rarely &ldquo;just in your head&rdquo; and it isn&rsquo;t
                  caused by low Viagra levels. It&rsquo;s a signal &mdash; poor circulation,
                  hormone imbalance, metabolic dysfunction, inflammation, or chronic stress.
                  Our work is to find the cause, not silence the symptom.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
              <Reveal>
                <div className="bg-red-50/60 border border-red-100 rounded-2xl p-7 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-9 h-9 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
                      <XIcon className="w-5 h-5" />
                    </span>
                    <h3 className="font-bold text-[#07403F] text-lg">The conventional approach</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700 text-[0.96rem]">
                    {[
                      "Prescribe a pill, send you home, hope it works.",
                      "No real investigation into why ED is happening.",
                      "Side effects that create new problems.",
                      "A temporary fix at best, dependency at worst.",
                    ].map((it) => (
                      <li key={it} className="flex gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="bg-[#07403F] text-white rounded-2xl p-7 h-full relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-9 h-9 rounded-full bg-amber-400/25 text-amber-300 flex items-center justify-center">
                      <CheckIcon className="w-5 h-5" />
                    </span>
                    <h3 className="font-bold text-white text-lg">The Transformity approach</h3>
                  </div>
                  <ul className="space-y-3 text-white/90 text-[0.96rem]">
                    {[
                      "Comprehensive diagnostics to identify the actual cause.",
                      "GainsWave shockwave therapy to restore blood flow.",
                      "Hormone optimization, gut health, and metabolic support.",
                      "A personalized program built around your biology, not a script pad.",
                    ].map((it) => (
                      <li key={it} className="flex gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Meet Dr. Liv ── */}
        <section id="meet-dr-liv" className="py-16 md:py-24 bg-[#FEF9EE]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-5 gap-14 md:gap-14 items-center">
              <Reveal className="md:col-span-2">
                <div className="relative max-w-sm mx-auto md:mx-0">
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-xl bg-[#07403F]/10">
                    <Image
                      src="/dr-liv.webp"
                      alt="Dr. Liubou (Liv) Uslar, MD/PhD — Founder, Transformity Health"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 320px, 380px"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-2 md:-bottom-5 md:-right-5 bg-[#07403F] text-white rounded-xl p-3.5 shadow-xl max-w-[200px]">
                    <p className="text-amber-400 font-bold text-sm">Harvard-Trained</p>
                    <p className="text-white/85 text-[11px] mt-0.5 leading-snug">
                      MD/PhD &bull; Board Certified Internal Medicine &bull; Functional Medicine
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal className="md:col-span-3" delay={100}>
                <div className="pt-4 md:pt-0">
                  <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
                    Meet your physician
                  </p>
                  <h2
                    className="text-3xl md:text-[2.5rem] font-bold text-[#07403F] mb-5 leading-tight"
                    style={{ fontFamily: "Lora, Georgia, serif" }}
                  >
                    Dr. Liv Uslar, MD/PhD
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Dr. Uslar trained at Harvard Medical School as a research fellow,
                    completed her internal medicine residency at Mount Sinai Hospital in
                    New York, and graduated <em>summa cum laude</em> from the University
                    of Hamburg, where she also earned her PhD in breast cancer research.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    She founded Transformity Health on a simple belief: your body can heal
                    when given the right support. She sees every patient personally
                    &mdash; no rotating staff, no sales reps &mdash; and builds individualized
                    protocols based on your specific biology.
                  </p>
                  <ul className="grid grid-cols-2 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2">
                    {[
                      "Harvard research fellow",
                      "ABIM board certified",
                      "GainsWave certified",
                      "Licensed in FL, NY, NJ, AZ, PA",
                      "Functional medicine trained",
                      "5.0 ★ on 207 reviews",
                    ].map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 mt-1 text-amber-500 shrink-0" />
                        <span className="text-gray-700 text-[0.85rem] sm:text-sm leading-snug">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── How treatment works ── */}
        <section id="how-treatment-works" className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="max-w-2xl mx-auto text-center mb-14">
                <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
                  How treatment works
                </p>
                <h2
                  className="text-3xl md:text-[2.5rem] font-bold text-[#07403F] mb-4 leading-tight"
                  style={{ fontFamily: "Lora, Georgia, serif" }}
                >
                  A personalized path to recovery
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  No two cases of ED are the same. Your program is designed around your
                  biology, not a generic protocol &mdash; and it works in steps you can
                  actually see.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 mb-14">
              {[
                {
                  step: "01",
                  title: "Diagnose the root cause",
                  body: "Comprehensive hormone panels, cardiovascular markers, metabolic and inflammation labs, gut testing when relevant. We don't guess; we measure.",
                },
                {
                  step: "02",
                  title: "Build your personalized program",
                  body: "Dr. Uslar designs a protocol that may include GainsWave shockwave therapy, hormone optimization, peptides, nutrition coaching, and lifestyle support.",
                },
                {
                  step: "03",
                  title: "Track real progress",
                  body: "Repeat diagnostics, regular check-ins with Dr. Uslar, and adjustments along the way so your results are measurable and lasting.",
                },
              ].map((s) => (
                <Reveal key={s.step}>
                  <div className="bg-[#FEF9EE] rounded-2xl p-6 h-full border border-amber-100 relative">
                    <span className="absolute -top-3 left-6 bg-[#07403F] text-amber-300 font-bold text-xs px-3 py-1 rounded-full tracking-wider">
                      STEP {s.step}
                    </span>
                    <h3 className="font-bold text-[#07403F] text-lg mb-2 mt-1">{s.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <MicroscopeIcon />,
                  title: "Advanced diagnostics",
                  desc: "Hormone panels, cardiovascular markers, metabolic function, nutrient and inflammation testing — beyond standard labs.",
                },
                {
                  icon: <BoltIcon />,
                  title: "GainsWave shockwave",
                  desc: "Low-intensity acoustic wave therapy that stimulates new blood vessel growth and restores natural erectile function.",
                },
                {
                  icon: <HeartIcon />,
                  title: "Hormone optimization",
                  desc: "Testosterone, thyroid, and endocrine support tailored to your specific levels — never one-size-fits-all.",
                },
                {
                  icon: <ShieldIcon />,
                  title: "Ongoing partnership",
                  desc: "Dr. Uslar monitors your progress directly and adjusts your protocol so results last long after treatment ends.",
                },
              ].map((it) => (
                <Reveal key={it.title}>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full">
                    <div className="w-12 h-12 rounded-xl bg-[#07403F]/8 flex items-center justify-center text-[#07403F] mb-4">
                      {it.icon}
                    </div>
                    <h3 className="font-bold text-[#07403F] mb-2">{it.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{it.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section id="patient-stories" className="py-16 md:py-24 bg-[#07403F]">
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="text-center mb-12">
                <p className="text-amber-300 font-semibold text-sm uppercase tracking-widest mb-3">
                  Patient stories
                </p>
                <h2
                  className="text-3xl md:text-[2.5rem] font-bold text-white mb-3 leading-tight"
                  style={{ fontFamily: "Lora, Georgia, serif" }}
                >
                  Real patients. Real results.
                </h2>
                <p className="text-white/70 text-lg">
                  207 five-star Google reviews and counting.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Michael T.",
                  loc: "Fort Lauderdale, FL",
                  text: "I was skeptical at first, but Dr. Liv actually listened. She ran tests my regular doctor never ordered, found the real issue, and built a plan around it. Six weeks later, I feel like I'm 20 years younger.",
                },
                {
                  name: "David R.",
                  loc: "Aventura, FL",
                  text: "The GainsWave treatments were painless and the results were noticeable after the second session. Dr. Uslar is thorough, knowledgeable, and actually cares. Worth every penny.",
                },
                {
                  name: "James K.",
                  loc: "Boca Raton, FL",
                  text: "I'd been on Viagra for years and hated being dependent on it. Dr. Liv's program addressed why it was happening. Three months in, I no longer need the medication. I can't recommend her enough.",
                },
              ].map((t, i) => (
                <Reveal key={t.name} delay={i * 80}>
                  <figure className="bg-white/[0.10] backdrop-blur-sm border border-white/20 rounded-2xl p-7 h-full">
                    <div className="flex gap-0.5 mb-4" aria-label="5 stars">
                      {[...Array(5)].map((_, j) => (
                        <StarIcon key={j} />
                      ))}
                    </div>
                    <blockquote className="text-white/90 text-[0.95rem] leading-relaxed mb-5">
                      &ldquo;{t.text}&rdquo;
                    </blockquote>
                    <figcaption>
                      <p className="text-amber-300 font-semibold text-sm">{t.name}</p>
                      <p className="text-white/55 text-xs">{t.loc}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Financing ── */}
        <section id="financing" className="py-14 bg-[#FEF9EE] border-y border-amber-200/60">
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7">
                  <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
                    Investment & financing
                  </p>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[#07403F] mb-3 leading-tight"
                    style={{ fontFamily: "Lora, Georgia, serif" }}
                  >
                    Flexible financing — your health shouldn&rsquo;t be limited by your budget.
                  </h2>
                  <p className="text-gray-700 leading-relaxed max-w-2xl">
                    Functional medicine and GainsWave protocols are cash-pay services, which
                    means more time with Dr. Uslar and a program built around you, not your
                    insurance company. Transformity Health accepts 0% APR financing through
                    Cherry and CareCredit, and some diagnostics may be eligible for HSA/FSA
                    reimbursement.
                  </p>
                </div>
                <div className="md:col-span-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {[
                      { label: "Cherry", sub: "0% APR" },
                      { label: "CareCredit", sub: "Plans available" },
                      { label: "HSA / FSA", sub: "May apply" },
                    ].map((b) => (
                      <div
                        key={b.label}
                        className="bg-white rounded-xl border border-amber-100 shadow-sm py-4 px-3 text-center"
                      >
                        <p className="text-[#07403F] font-bold text-sm">{b.label}</p>
                        <p className="text-gray-500 text-[11px] mt-0.5">{b.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Second CTA ── */}
        <section id="get-started" className="py-16 md:py-24 bg-[#07403F]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
              <Reveal>
                <div>
                  <p className="text-amber-300 font-semibold text-sm uppercase tracking-widest mb-3">
                    Take the next step
                  </p>
                  <h2
                    className="text-3xl md:text-[2.5rem] font-bold text-white mb-5 leading-tight"
                    style={{ fontFamily: "Lora, Georgia, serif" }}
                  >
                    You don&rsquo;t have to just{" "}
                    <span className="text-amber-400">accept this.</span>
                  </h2>
                  <p className="text-white/80 text-lg leading-relaxed mb-7">
                    ED affects millions of men &mdash; most suffer in silence, or settle for a
                    pill that barely works. You deserve a real answer from a physician who
                    takes the time to understand what&rsquo;s actually going on.
                  </p>
                  <ul className="space-y-4">
                    {[
                      {
                        title: "Free initial consultation",
                        desc: "Speak directly with Dr. Uslar about your situation at no cost.",
                      },
                      {
                        title: "Confidential & judgment-free",
                        desc: "Everything is protected and handled with complete discretion.",
                      },
                      {
                        title: "Hallandale Beach, FL",
                        desc: "Serving patients across South Florida — and licensed in 5 states for telehealth follow-up.",
                      },
                    ].map((it) => (
                      <li key={it.title} className="flex gap-4">
                        <span className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                          <CheckIcon className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-white font-semibold text-[0.97rem]">{it.title}</p>
                          <p className="text-white/65 text-sm">{it.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <LeadForm variant="inline" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <Reveal>
              <div className="text-center mb-10">
                <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
                  Frequently asked
                </p>
                <h2
                  className="text-3xl font-bold text-[#07403F] leading-tight"
                  style={{ fontFamily: "Lora, Georgia, serif" }}
                >
                  Common questions
                </h2>
              </div>
            </Reveal>
            <div className="space-y-3">
              {[
                {
                  q: "Is ED treatment at Transformity Health covered by insurance?",
                  a: "Most functional medicine services and GainsWave protocols are cash-pay. We accept Cherry and CareCredit financing with 0% APR options, and some diagnostic testing may be reimbursable through HSA/FSA. Dr. Uslar will walk you through the options at your consultation.",
                },
                {
                  q: "How many GainsWave sessions will I need?",
                  a: "Most patients see meaningful improvement after 6–12 sessions. Dr. Uslar will assess your case and design a protocol tailored to your specific situation — there is no fixed package because no two patients are alike.",
                },
                {
                  q: "Is the treatment painful?",
                  a: "GainsWave is non-invasive and generally well-tolerated. Most patients describe a mild warmth or tingling during treatment. There is no downtime, and you can drive yourself home afterward.",
                },
                {
                  q: "How quickly will I see results?",
                  a: "Many patients notice improvements after the third or fourth session. Full results from a complete protocol are typically visible within 4–8 weeks after finishing treatment — and because we treat the root cause, results last.",
                },
                {
                  q: "Do I need a referral to schedule a consultation?",
                  a: "No. You can request a consultation directly through the form on this page, and our team will reach out within one business day to schedule your appointment with Dr. Uslar.",
                },
                {
                  q: "Is everything confidential?",
                  a: "Yes. All consultations and patient records are protected. Dr. Uslar sees every patient personally, and our staff is trained in HIPAA-compliant care. Many of our patients tell us it's the most discreet medical experience they've had.",
                },
              ].map((item) => (
                <Reveal key={item.q}>
                  <details className="group border border-gray-200 rounded-xl bg-white hover:border-amber-200 transition-colors">
                    <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4">
                      <h3 className="font-semibold text-[#07403F] text-[0.98rem]">{item.q}</h3>
                      <span className="shrink-0 w-6 h-6 rounded-full bg-[#07403F]/8 text-[#07403F] flex items-center justify-center text-lg leading-none transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="px-5 pb-5 text-gray-600 text-[0.93rem] leading-relaxed">
                      {item.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer id="contact" className="bg-[#052e2d] text-white pt-14 pb-24 md:pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="relative h-10 w-44 mb-4">
                <Image
                  src="/logo.png"
                  alt="Transformity Health"
                  fill
                  className="object-contain object-left brightness-0 invert"
                  sizes="180px"
                />
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Functional medicine and root-cause ED care from a Harvard-trained
                physician. Personalized programs, not pills.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-amber-300 mb-3 text-sm uppercase tracking-wider">
                Treatments
              </h4>
              <ul className="space-y-2 text-white/65 text-sm">
                <li>GainsWave shockwave therapy</li>
                <li>Hormone optimization</li>
                <li>Advanced diagnostics</li>
                <li>Functional medicine for men</li>
                <li>Personalized ED protocols</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-amber-300 mb-3 text-sm uppercase tracking-wider">
                Contact
              </h4>
              <ul className="space-y-2.5 text-white/65 text-sm">
                <li>
                  <a
                    href="tel:9177044886"
                    className="hover:text-amber-300 transition-colors inline-flex items-center gap-2"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    917-704-4886
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@transformityhealth.com"
                    className="hover:text-amber-300 transition-colors break-all"
                  >
                    contact@transformityhealth.com
                  </a>
                </li>
                <li>Hallandale Beach, Florida</li>
                <li className="text-white/45 text-xs pt-1">Licensed in FL · NY · NJ · AZ · PA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-white/45 text-xs leading-relaxed">
            &copy; {new Date().getFullYear()} Transformity Health. All rights reserved.
            <br className="md:hidden" />
            <span className="hidden md:inline"> &nbsp;&middot;&nbsp; </span>
            This page is for informational purposes only and does not constitute medical advice.
          </div>
        </div>
      </footer>

      {/* Mobile padding for sticky CTA */}
      <div className="md:hidden h-16" aria-hidden="true" />
    </>
  );
}
