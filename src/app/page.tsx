"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";

/* ───────────── Reveal on scroll ───────────── */
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
      ([entry]) => entry.isIntersecting && setVisible(true),
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

/* ───────────── Sticky CTA (mobile only) ───────────── */
function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-[var(--color-teal)] border-t border-[var(--color-gold)]/30 px-3 py-3 flex gap-2 shadow-2xl">
        <a
          href="tel:9177044886"
          className="flex-1 flex items-center justify-center gap-2 bg-white/8 border border-white/20 text-white font-semibold py-3 rounded-lg text-sm"
        >
          <PhoneIcon className="w-4 h-4" />
          Call
        </a>
        <a
          href="#consult"
          className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-gold)] text-[var(--color-teal-dark)] font-semibold py-3 rounded-lg text-sm"
        >
          Free Consultation
        </a>
      </div>
    </div>
  );
}

/* ───────────── Icons ───────────── */
function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}
function ArrowRight({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
function StarIcon({ className = "w-4 h-4 text-[var(--color-gold)]" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.951 2.71c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.048 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L9.049 2.927z" />
    </svg>
  );
}

/* ───────────── Page ───────────── */
export default function Page() {
  return (
    <div className="bg-[var(--color-cream)]">
      <StickyCTA />

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[var(--color-cream)]/90 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-cream)]/80 border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <a href="#hero" className="relative h-9 sm:h-11 w-44 sm:w-56 block" aria-label="Transformity Health">
            <Image
              src="/logo.png"
              alt="Transformity Health"
              fill
              className="object-contain object-left"
              priority
              sizes="240px"
            />
          </a>
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="tel:9177044886"
              className="hidden sm:inline-flex btn-ghost"
            >
              <PhoneIcon className="w-4 h-4" />
              917-704-4886
            </a>
            <a href="#consult" className="btn-primary py-2.5 px-4 sm:px-5 text-sm">
              Book Consultation
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <section id="hero" className="relative overflow-hidden">
          <div className="grain absolute inset-0" aria-hidden="true" />
          <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-10 sm:pb-20">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Editorial copy column */}
              <div className="lg:col-span-7">
                <Reveal>
                  <span className="eyebrow">
                    Functional medicine for men · Hallandale Beach, FL
                  </span>
                  <h1 className="mt-5 text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] font-bold">
                    A real conversation
                    <br className="hidden sm:block" /> about ED &mdash;
                    <span className="block text-[var(--color-gold)] font-display italic font-semibold">
                      and what&rsquo;s really causing it.
                    </span>
                  </h1>
                  <p className="mt-6 measure text-[1.05rem] sm:text-[1.15rem] text-[var(--color-ink-soft)]">
                    Most clinics hand you a pill and move on. We take the time to
                    find out <em>why</em> &mdash; through advanced diagnostics,
                    GainsWave shockwave therapy, and personalized hormone and
                    metabolic protocols designed by a Harvard-trained physician.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                    <a href="#consult" className="btn-primary">
                      Request a Free Consultation
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a href="tel:9177044886" className="btn-ghost">
                      <PhoneIcon className="w-4 h-4" />
                      Or call 917-704-4886
                    </a>
                  </div>
                  <div className="mt-10 flex items-center gap-3 text-[var(--color-ink-soft)]">
                    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <p className="text-sm">
                      <span className="font-semibold text-[var(--color-ink)]">5.0</span> · 207 Google reviews
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Doctor portrait */}
              <Reveal className="lg:col-span-5" delay={100}>
                <div className="relative max-w-sm lg:max-w-none mx-auto">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--color-teal)]/8 shadow-[0_30px_60px_-30px_rgba(7,64,63,0.35)]">
                    <Image
                      src="/dr-liv.webp"
                      alt="Dr. Liubou (Liv) Uslar, MD/PhD — Founder, Transformity Health"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 80vw, 460px"
                      priority
                    />
                  </div>
                  <figcaption className="mt-4 sm:absolute sm:-bottom-6 sm:-left-6 sm:mt-0 sm:bg-[var(--color-teal)] sm:text-white sm:rounded-xl sm:p-4 sm:shadow-xl sm:max-w-[230px]">
                    <p className="text-[var(--color-gold)] sm:text-[var(--color-gold-soft)] font-semibold text-sm">
                      Dr. Liv Uslar, MD/PhD
                    </p>
                    <p className="text-[var(--color-ink-soft)] sm:text-white/75 text-xs mt-1 leading-snug">
                      Harvard-trained · Board Certified Internal Medicine · Functional Medicine
                    </p>
                  </figcaption>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Trust strip (subtle, lives between hero and editorial content) ── */}
        <section id="credentials" aria-label="Credentials" className="border-y border-[var(--color-border)] bg-[var(--color-cream-deep)]/60">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-7 sm:py-8">
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-6 text-center">
              {[
                { stat: "5.0", suffix: "★", label: "Google rating" },
                { stat: "207", suffix: "+", label: "Five-star reviews" },
                { stat: "Harvard", suffix: "", label: "MD/PhD trained" },
                { stat: "0%", suffix: " APR", label: "Financing available" },
              ].map((it) => (
                <li key={it.label}>
                  <p className="font-display text-[var(--color-teal)] text-xl sm:text-2xl font-semibold">
                    {it.stat}
                    <span className="text-[var(--color-gold)]">{it.suffix}</span>
                  </p>
                  <p className="text-[var(--color-ink-mute)] text-[0.72rem] sm:text-xs tracking-wider uppercase mt-1.5">
                    {it.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Premise: why pills aren't the answer ──────────── */}
        <section id="premise" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="max-w-2xl">
                <span className="eyebrow">The Premise</span>
                <h2 className="mt-4 text-3xl sm:text-[2.5rem] font-bold">
                  Pills postpone the problem.
                  <br />
                  <span className="text-[var(--color-gold)] italic font-display">
                    Functional medicine solves it.
                  </span>
                </h2>
                <p className="mt-6 measure text-[1.05rem] text-[var(--color-ink-soft)]">
                  Erectile dysfunction is a signal &mdash; usually from
                  circulation, hormones, metabolism, inflammation, or chronic
                  stress. A prescription quiets the signal for a few hours.
                  Root-cause medicine listens to it.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-14 grid md:grid-cols-2 gap-10 lg:gap-14">
                <div>
                  <p className="text-[var(--color-ink-mute)] font-semibold tracking-widest text-xs uppercase mb-4">
                    Conventional path
                  </p>
                  <ul className="space-y-4 text-[var(--color-ink-soft)]">
                    {[
                      "Brief visit, generic prescription.",
                      "No investigation of the underlying cause.",
                      "Side effects layered on top of side effects.",
                      "A temporary fix at best, dependency at worst.",
                    ].map((t) => (
                      <li key={t} className="flex gap-3">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--color-ink-mute)] shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:border-l md:border-[var(--color-border)] md:pl-10 lg:pl-14">
                  <p className="text-[var(--color-gold)] font-semibold tracking-widest text-xs uppercase mb-4">
                    The Transformity path
                  </p>
                  <ul className="space-y-4 text-[var(--color-ink)]">
                    {[
                      "Comprehensive diagnostics — hormones, metabolism, circulation, inflammation.",
                      "GainsWave shockwave therapy to restore healthy blood flow.",
                      "Hormone, gut, and lifestyle optimization tailored to your biology.",
                      "A program with a clear arc, not a forever-prescription.",
                    ].map((t) => (
                      <li key={t} className="flex gap-3">
                        <CheckIcon className="w-5 h-5 mt-0.5 text-[var(--color-teal)] shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Doctor: long form bio ─────────────────────────── */}
        <section
          id="meet-dr-liv"
          className="bg-[var(--color-cream-deep)] border-y border-[var(--color-border)]"
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
            <div className="grid md:grid-cols-12 gap-10 lg:gap-14 items-start">
              <Reveal className="md:col-span-5 lg:col-span-4">
                <div className="relative max-w-xs sm:max-w-sm">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--color-teal)]/8 shadow-xl">
                    <Image
                      src="/dr-liv.webp"
                      alt="Dr. Liubou (Liv) Uslar, MD/PhD"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 320px, 360px"
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal className="md:col-span-7 lg:col-span-8" delay={120}>
                <span className="eyebrow">Your Physician</span>
                <h2 className="mt-4 text-3xl sm:text-[2.5rem] font-bold">
                  Dr. Liv Uslar, MD/PhD
                </h2>
                <span className="hr-rule mt-5 mb-7" />
                <div className="space-y-5 text-[var(--color-ink-soft)] text-[1.02rem] measure">
                  <p>
                    Dr. Uslar is a research fellow alumna of Harvard Medical
                    School and a board-certified internist who completed her
                    residency at Mount Sinai Hospital in New York. She graduated{" "}
                    <em>summa cum laude</em> from the University of Hamburg,
                    where she also earned her PhD in breast cancer research.
                  </p>
                  <p>
                    She founded Transformity Health on a simple belief: <em>your body can heal when given the right support</em>.
                    She sees every patient herself &mdash; no rotating
                    practitioners, no sales staff &mdash; and builds protocols
                    around your specific biology, not a template.
                  </p>
                </div>

                <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5">
                  {[
                    "Harvard research fellow",
                    "ABIM board certified",
                    "GainsWave certified",
                    "Licensed in FL · NY · NJ · AZ · PA",
                    "Functional medicine trained",
                    "5.0★ on 207 reviews",
                  ].map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[var(--color-ink)] text-[0.92rem]">
                      <CheckIcon className="w-4 h-4 mt-1 text-[var(--color-gold)] shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── How treatment works ───────────────────────────── */}
        <section id="how-it-works" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="max-w-2xl">
                <span className="eyebrow">How treatment works</span>
                <h2 className="mt-4 text-3xl sm:text-[2.5rem] font-bold">
                  Three steps. Built around{" "}
                  <span className="italic font-display text-[var(--color-gold)]">you</span>.
                </h2>
                <p className="mt-6 measure text-[1.05rem] text-[var(--color-ink-soft)]">
                  Every program at Transformity Health is personalized to your
                  labs, your symptoms, and the life you want back.
                </p>
              </div>
            </Reveal>

            <ol className="mt-14 space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-10 lg:gap-14">
              {[
                {
                  step: "01",
                  title: "Diagnose the root cause",
                  body:
                    "Hormone panels, cardiovascular markers, metabolic and inflammation labs, gut testing when relevant. We measure, we don't guess.",
                },
                {
                  step: "02",
                  title: "Design a personal protocol",
                  body:
                    "GainsWave shockwave therapy, hormone optimization, peptides, nutrition coaching, and lifestyle work — chosen for your specific case.",
                },
                {
                  step: "03",
                  title: "Track real progress",
                  body:
                    "Repeat diagnostics and one-on-one time with Dr. Uslar so adjustments are evidence-based and the results last.",
                },
              ].map((s) => (
                <Reveal key={s.step}>
                  <li className="relative pl-14 md:pl-0">
                    <span
                      className="absolute left-0 top-0 md:relative md:left-auto md:top-auto md:mb-5 inline-flex font-display text-3xl md:text-4xl text-[var(--color-gold)]"
                      aria-hidden="true"
                    >
                      {s.step}
                    </span>
                    <h3 className="text-xl sm:text-[1.4rem] font-semibold text-[var(--color-teal)]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[var(--color-ink-soft)] leading-relaxed">
                      {s.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Treatment pillars (4 horizontal cards inside cream-deep band) ── */}
        <section
          id="treatments"
          aria-labelledby="treatments-heading"
          className="bg-[var(--color-teal)] text-white"
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
            <Reveal>
              <div className="max-w-2xl">
                <span
                  className="eyebrow"
                  style={{ color: "var(--color-gold-soft)" }}
                >
                  What we offer
                </span>
                <h2
                  id="treatments-heading"
                  className="mt-4 text-3xl sm:text-[2.5rem] font-bold text-white"
                >
                  Four pillars of root-cause care.
                </h2>
                <p className="mt-5 text-white/75 max-w-xl">
                  Layered together &mdash; in the right order &mdash; to produce
                  results pills alone cannot match.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
              {[
                {
                  title: "Advanced diagnostics",
                  body:
                    "Beyond standard labs: hormones, cardiometabolic markers, nutrient panels, inflammation, gut health.",
                },
                {
                  title: "GainsWave shockwave",
                  body:
                    "Low-intensity acoustic-wave therapy that stimulates new blood-vessel growth and restores function naturally.",
                },
                {
                  title: "Hormone optimization",
                  body:
                    "Testosterone, thyroid, and endocrine support — bioidentical and dialed to your biology, not a template.",
                },
                {
                  title: "Ongoing partnership",
                  body:
                    "Dr. Uslar monitors progress, adjusts your protocol, and stays available long after the first visit.",
                },
              ].map((it, i) => (
                <Reveal key={it.title} delay={i * 60}>
                  <article className="bg-[var(--color-teal)] p-7 sm:p-8 h-full">
                    <p className="font-display text-[var(--color-gold-soft)] text-2xl font-semibold mb-3">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-white font-semibold text-lg mb-3">
                      {it.title}
                    </h3>
                    <p className="text-white/75 text-[0.95rem] leading-relaxed">
                      {it.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Patient stories ───────────────────────────────── */}
        <section id="stories" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="max-w-2xl mb-12">
                <span className="eyebrow">Patient stories</span>
                <h2 className="mt-4 text-3xl sm:text-[2.5rem] font-bold">
                  Real men.{" "}
                  <span className="italic font-display text-[var(--color-gold)]">
                    Real results.
                  </span>
                </h2>
                <p className="mt-5 text-[var(--color-ink-soft)] max-w-xl">
                  207 five-star Google reviews and counting. A few of the most
                  recent.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  name: "Michael T.",
                  loc: "Fort Lauderdale, FL",
                  text:
                    "I was skeptical at first, but Dr. Liv actually listened. She ran tests my regular doctor never ordered, found the real issue, and built a plan around it. Six weeks later, I feel like I'm twenty years younger.",
                },
                {
                  name: "David R.",
                  loc: "Aventura, FL",
                  text:
                    "The GainsWave sessions were painless and the results were noticeable after the second one. Dr. Uslar is thorough, knowledgeable, and clearly cares. Worth every penny.",
                },
                {
                  name: "James K.",
                  loc: "Boca Raton, FL",
                  text:
                    "I'd been on Viagra for years and hated being dependent on it. Dr. Liv's program addressed why it was happening. Three months in, I no longer need the medication. I can't recommend her enough.",
                },
              ].map((t, i) => (
                <Reveal key={t.name} delay={i * 80}>
                  <figure className="h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-7 sm:p-8 shadow-[0_8px_24px_-18px_rgba(7,64,63,0.25)]">
                    <div className="flex gap-0.5 mb-5" aria-label="5 stars">
                      {[...Array(5)].map((_, j) => (
                        <StarIcon key={j} />
                      ))}
                    </div>
                    <blockquote className="text-[var(--color-ink)] text-[0.98rem] leading-relaxed font-display italic">
                      &ldquo;{t.text}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 pt-5 border-t border-[var(--color-border)]">
                      <p className="text-[var(--color-teal)] font-semibold text-sm">
                        {t.name}
                      </p>
                      <p className="text-[var(--color-ink-mute)] text-xs mt-0.5">
                        {t.loc}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Financing line ───────────────────────────────── */}
        <section id="financing" className="bg-[var(--color-cream-deep)] border-y border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-14">
            <Reveal>
              <div className="md:flex md:items-center md:justify-between gap-10">
                <div className="md:flex-1 max-w-2xl">
                  <span className="eyebrow">Investment</span>
                  <h2 className="mt-3 text-2xl sm:text-3xl font-bold">
                    Your health shouldn&rsquo;t be limited by your budget.
                  </h2>
                  <p className="mt-4 text-[var(--color-ink-soft)]">
                    Functional medicine and GainsWave are cash-pay services
                    &mdash; that&rsquo;s how Dr. Uslar can give you a personalized
                    program instead of a 7-minute insurance visit. We accept 0% APR
                    financing through Cherry &amp; CareCredit, and some
                    diagnostics may qualify for HSA/FSA reimbursement.
                  </p>
                </div>
                <div className="mt-8 md:mt-0 flex flex-col sm:flex-row md:flex-col gap-3 sm:gap-4 md:gap-3 md:items-end">
                  {[
                    { name: "Cherry", note: "0% APR options" },
                    { name: "CareCredit", note: "Flexible plans" },
                    { name: "HSA · FSA", note: "May apply" },
                  ].map((p) => (
                    <div
                      key={p.name}
                      className="bg-white border border-[var(--color-border)] rounded-xl px-5 py-3 flex items-center gap-4 min-w-[15rem]"
                    >
                      <p className="font-display text-[var(--color-teal)] font-semibold">
                        {p.name}
                      </p>
                      <p className="text-[var(--color-ink-mute)] text-xs ml-auto">
                        {p.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Closing CTA + form ────────────────────────────── */}
        <section id="consult" className="bg-[var(--color-teal)] text-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              <Reveal>
                <span
                  className="eyebrow"
                  style={{ color: "var(--color-gold-soft)" }}
                >
                  Take the next step
                </span>
                <h2 className="mt-4 text-3xl sm:text-[2.5rem] font-bold text-white">
                  You don&rsquo;t have to{" "}
                  <span className="italic font-display text-[var(--color-gold-soft)]">
                    just accept this.
                  </span>
                </h2>
                <p className="mt-5 text-white/80 max-w-md">
                  Speak privately with Dr. Uslar. No sales staff, no scripts,
                  no judgment &mdash; just a real conversation about what&rsquo;s
                  going on and whether functional medicine is the right fit.
                </p>
                <ul className="mt-8 space-y-4 text-white/85">
                  {[
                    {
                      title: "Free initial consultation",
                      desc: "Talk directly with Dr. Uslar at no cost.",
                    },
                    {
                      title: "Discreet & confidential",
                      desc: "Everything stays between you and your physician.",
                    },
                    {
                      title: "Hallandale Beach, FL",
                      desc: "Serving South Florida, with telehealth follow-up across 5 states.",
                    },
                  ].map((it) => (
                    <li key={it.title} className="flex gap-4">
                      <span className="w-9 h-9 rounded-full bg-white/8 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckIcon className="w-4 h-4 text-[var(--color-gold-soft)]" />
                      </span>
                      <div>
                        <p className="text-white font-semibold text-[0.98rem]">
                          {it.title}
                        </p>
                        <p className="text-white/60 text-sm">{it.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 pt-8 border-t border-white/15">
                  <p className="text-white/55 text-xs uppercase tracking-widest mb-2">
                    Prefer a phone call?
                  </p>
                  <a
                    href="tel:9177044886"
                    className="inline-flex items-center gap-3 text-2xl sm:text-3xl font-display font-semibold text-white hover:text-[var(--color-gold-soft)] transition-colors"
                  >
                    <PhoneIcon className="w-6 h-6" />
                    917-704-4886
                  </a>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <LeadForm variant="inline" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────── */}
        <section id="faq" className="py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="text-center mb-12">
                <span className="eyebrow">Common questions</span>
                <h2 className="mt-4 text-3xl sm:text-[2.5rem] font-bold">
                  Honest answers.
                </h2>
              </div>
            </Reveal>

            <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {[
                {
                  q: "Is ED treatment covered by insurance?",
                  a: "Most functional-medicine services and GainsWave protocols are cash-pay. We accept Cherry and CareCredit financing with 0% APR options, and some diagnostic testing may be reimbursable through HSA/FSA. Dr. Uslar will walk you through the options at your consultation.",
                },
                {
                  q: "How many GainsWave sessions will I need?",
                  a: "Most patients see meaningful improvement after 6–12 sessions, but Dr. Uslar designs the protocol around your case. There is no fixed package because no two patients are alike.",
                },
                {
                  q: "Is the treatment painful?",
                  a: "GainsWave is non-invasive and generally well-tolerated. Most patients describe a mild warmth or tingling. There is no downtime, and you can drive yourself home afterward.",
                },
                {
                  q: "How quickly will I see results?",
                  a: "Many patients notice improvements after the third or fourth session. Full results from a complete protocol are typically visible within 4–8 weeks of finishing treatment — and because we treat the root cause, results last.",
                },
                {
                  q: "Do I need a referral?",
                  a: "No. Request a consultation through the form on this page and our team will reach out within one business day to schedule your appointment with Dr. Uslar directly.",
                },
                {
                  q: "Is everything confidential?",
                  a: "Yes. All consultations and records are HIPAA-protected. Dr. Uslar sees every patient personally, and our team is trained to handle these conversations with complete discretion.",
                },
              ].map((item) => (
                <Reveal key={item.q}>
                  <details className="group py-5">
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                      <h3 className="font-semibold text-[var(--color-teal)] text-[1.02rem] sm:text-[1.05rem]">
                        {item.q}
                      </h3>
                      <span className="shrink-0 w-7 h-7 rounded-full bg-[var(--color-teal-tint)] text-[var(--color-teal)] flex items-center justify-center text-lg leading-none transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-[var(--color-ink-soft)] text-[0.97rem] leading-relaxed max-w-prose">
                      {item.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer id="contact" className="bg-[var(--color-teal-dark)] text-white pt-14 pb-24 md:pb-12">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="relative h-10 w-44 mb-5">
                <Image
                  src="/logo.png"
                  alt="Transformity Health"
                  fill
                  className="object-contain object-left brightness-0 invert"
                  sizes="180px"
                />
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Functional medicine and root-cause men&rsquo;s health,
                personally led by a Harvard-trained physician.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--color-gold-soft)] mb-3 text-xs uppercase tracking-widest">
                What we treat
              </h4>
              <ul className="space-y-2 text-white/65 text-sm">
                <li>Erectile dysfunction</li>
                <li>Hormone optimization</li>
                <li>GainsWave shockwave therapy</li>
                <li>Functional medicine for men</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--color-gold-soft)] mb-3 text-xs uppercase tracking-widest">
                Contact
              </h4>
              <ul className="space-y-2.5 text-white/65 text-sm">
                <li>
                  <a
                    href="tel:9177044886"
                    className="hover:text-[var(--color-gold-soft)] transition-colors inline-flex items-center gap-2"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    917-704-4886
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@transformityhealth.com"
                    className="hover:text-[var(--color-gold-soft)] transition-colors break-all"
                  >
                    contact@transformityhealth.com
                  </a>
                </li>
                <li>Hallandale Beach, Florida</li>
                <li className="text-white/40 text-xs pt-1">
                  Licensed in FL · NY · NJ · AZ · PA
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-white/40 text-xs leading-relaxed">
            &copy; {new Date().getFullYear()} Transformity Health. All rights reserved.
            <span className="hidden md:inline"> &nbsp;·&nbsp; </span>
            <br className="md:hidden" />
            For informational purposes only — does not constitute medical advice.
          </div>
        </div>
      </footer>
    </div>
  );
}
