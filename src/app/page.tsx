"use client";

import { useState, useEffect, useRef, FormEvent, useId } from "react";
import Image from "next/image";
import useMegaLeadForm from "@/hooks/useMegaLeadForm";

/* ─── Intersection observer reveal ─── */
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
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Phone helpers ─── */
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isValidPhone(value: string): { valid: boolean; error: string } {
  const digits = value.replace(/\D/g, "");
  const normalized = digits.length === 11 && digits[0] === "1" ? digits.slice(1) : digits;
  if (normalized.length !== 10) return { valid: false, error: "Please enter a valid 10-digit phone number" };
  const area = normalized.slice(0, 3);
  const exchange = normalized.slice(3, 6);
  if (area[0] === "0" || area[0] === "1") return { valid: false, error: "Area code cannot start with 0 or 1" };
  if (exchange[0] === "0" || exchange[0] === "1") return { valid: false, error: "Invalid phone number format" };
  if (["211","311","411","511","611","711","811","911"].includes(area)) return { valid: false, error: "Service codes are not valid phone numbers" };
  if (exchange === "555") return { valid: false, error: "555 numbers are reserved" };
  if (["800","888","877","866","855","844","833","822","900"].includes(area)) return { valid: false, error: "Please enter a personal phone number" };
  if (new Set(normalized).size === 1) return { valid: false, error: "Please enter a real phone number" };
  if (["1234567890","0987654321"].includes(normalized)) return { valid: false, error: "Please enter a real phone number" };
  return { valid: true, error: "" };
}

function isValidEmail(v: string): boolean { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

/* ─── SVG Icons ─── */
const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const CheckIcon = ({ className = "w-5 h-5 text-amber-400 shrink-0 mt-0.5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.951 2.71c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.048 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);

const ShieldCheck = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const MicroscopeIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
  </svg>
);

const ArrowRight = () => (
  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

/* ─── Lead form component ─── */
interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  investmentReady: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  investmentReady?: string;
}

function LeadForm({ variant = "hero" }: { variant?: "hero" | "inline" }) {
  const fid = useId();
  const id = (k: string) => `${k}-${fid}`;

  const { submit } = useMegaLeadForm();
  const [form, setForm] = useState<FormState>({
    firstName: "", lastName: "", email: "", phone: "", investmentReady: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!isValidEmail(form.email)) e.email = "Please enter a valid email";
    const phoneCheck = isValidPhone(form.phone);
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!phoneCheck.valid) e.phone = phoneCheck.error;
    if (!form.investmentReady) e.investmentReady = "Please select an option";
    return e;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, "");
    if (/[a-zA-Z]/.test(raw)) return;
    setForm((f) => ({ ...f, phone: formatPhone(digits) }));
    if (errors.phone) setErrors((er) => ({ ...er, phone: undefined }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await submit({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/\D/g, ""),
        investmentReady: form.investmentReady,
        formId: "transformity-ed-consultation",
      });

      // Fire GTM form_submission event
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "form_submission", form_id: "transformity-ed-consultation", value: 0 });
        // Fire Meta Pixel Lead event
        if (typeof window.fbq === "function") {
          window.fbq("track", "Lead");
        }
      }
      await new Promise((r) => setTimeout(r, 500));
      setSubmitted(true);
    } catch {
      setErrors({ firstName: "Something went wrong. Please try again or call us." });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={`${variant === "hero" ? "bg-white rounded-2xl shadow-2xl p-8" : "bg-[#07403F] rounded-2xl p-8"} text-center`}>
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="w-8 h-8 text-amber-500" />
        </div>
        <h3 className={`text-2xl font-bold mb-3 ${variant === "hero" ? "text-[#07403F]" : "text-white"}`}>
          You&rsquo;re All Set
        </h3>
        <p className={`${variant === "hero" ? "text-gray-600" : "text-white/80"}`}>
          Thank you, {form.firstName}. Our team will reach out within one business day to schedule your consultation with Dr. Uslar.
        </p>
        <p className={`mt-4 text-sm font-medium ${variant === "hero" ? "text-[#07403F]" : "text-amber-300"}`}>
          Need faster help? Call <a href="tel:9177044886" className="underline">917-704-4886</a>
        </p>
      </div>
    );
  }

  const isHero = variant === "hero";
  const inputBase = "w-full px-4 py-3 rounded-lg text-gray-900 border focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm";
  const inputClass = `${inputBase} ${isHero ? "border-gray-200 bg-white" : "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:bg-white/20"}`;
  const labelClass = `block text-sm font-medium mb-1 ${isHero ? "text-gray-700" : "text-white/90"}`;
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit} className={`${isHero ? "bg-white rounded-2xl shadow-2xl p-6 md:p-8" : "bg-[#07403F] rounded-2xl p-6 md:p-8"}`}>
      <h3 className={`text-xl font-bold mb-1 ${isHero ? "text-[#07403F]" : "text-white"}`}>
        Request a Free Consultation
      </h3>
      <p className={`text-sm mb-6 ${isHero ? "text-gray-500" : "text-white/70"}`}>
        Speak directly with Dr. Uslar &mdash; no sales staff, no pressure.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor={id("firstName")} className={labelClass}>First Name *</label>
          <input
            id={id("firstName")}
            name="firstName"
            type="text"
            required
            placeholder="John"
            value={form.firstName}
            onChange={handleChange}
            className={`${inputClass} ${errors.firstName ? "border-red-400" : ""}`}
          />
          {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor={id("lastName")} className={labelClass}>Last Name *</label>
          <input
            id={id("lastName")}
            name="lastName"
            type="text"
            required
            placeholder="Smith"
            value={form.lastName}
            onChange={handleChange}
            className={`${inputClass} ${errors.lastName ? "border-red-400" : ""}`}
          />
          {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor={id("email")} className={labelClass}>Email Address *</label>
        <input
          id={id("email")}
          name="email"
          type="email"
          required
          placeholder="john@example.com"
          value={form.email}
          onChange={handleChange}
          className={`${inputClass} ${errors.email ? "border-red-400" : ""}`}
        />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor={id("phone")} className={labelClass}>Phone Number *</label>
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="tel"
          required
          pattern="[0-9\(\)\-\s]+"
          placeholder="(305) 555-0100"
          value={form.phone}
          onChange={handlePhoneChange}
          className={`${inputClass} ${errors.phone ? "border-red-400" : ""}`}
        />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor={id("investmentReady")} className={labelClass}>
          ED treatments at our clinic are a cash-pay investment that can cost up to several thousand dollars. Are you open to investing in a personalized, root-cause solution to restore your sexual health? (Financing available through Cherry &amp; CareCredit) *
        </label>
        <select
          id={id("investmentReady")}
          name="investmentReady"
          required
          value={form.investmentReady}
          onChange={handleChange}
          className={`${inputClass} ${errors.investmentReady ? "border-red-400" : ""}`}
        >
          <option value="" disabled>Select an option...</option>
          <option value="Yes, I'm ready to invest in a lasting solution">Yes, I&apos;m ready to invest in a lasting solution</option>
          <option value="Yes, but I'd need financing options">Yes, but I&apos;d need financing options</option>
          <option value="No, I'm looking for a lower-cost option">No, I&apos;m looking for a lower-cost option</option>
        </select>
        {errors.investmentReady && <p className={errorClass}>{errors.investmentReady}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold py-4 px-6 rounded-lg text-base transition-all duration-200 disabled:opacity-60 flex items-center justify-center cursor-pointer"
      >
        {submitting ? "Submitting..." : "Request My Free Consultation"}
        {!submitting && <ArrowRight />}
      </button>

      <p className={`text-xs text-center mt-3 flex items-center justify-center gap-1 ${isHero ? "text-gray-400" : "text-white/50"}`}>
        <LockIcon />
        100% confidential &mdash; your information is never shared
      </p>
    </form>
  );
}

/* ─── Sticky CTA bar (mobile) ─── */
function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}>
      <div className="bg-[#07403F] border-t border-amber-500/30 px-4 py-3 flex gap-3">
        <a
          href="tel:9177044886"
          className="flex-1 flex items-center justify-center gap-2 bg-white text-[#07403F] font-bold py-3 rounded-lg text-sm"
        >
          <PhoneIcon />
          Call Now
        </a>
        <a
          href="#consultation-form"
          className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-white font-bold py-3 rounded-lg text-sm"
        >
          Free Consult
        </a>
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export default function Page() {
  return (
    <>
      <StickyCTA />

      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="relative h-10 w-44">
            <Image src="/logo.png" alt="Transformity Health" fill className="object-contain object-left" priority />
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:9177044886"
              className="flex items-center gap-2 text-[#07403F] font-medium text-sm hover:text-amber-600 transition-colors"
            >
              <PhoneIcon />
              917-704-4886
            </a>
            <a
              href="#consultation-form"
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors"
            >
              Free Consultation
            </a>
          </div>
          <a
            href="tel:9177044886"
            className="md:hidden flex items-center gap-1 text-[#07403F] font-medium text-sm"
          >
            <PhoneIcon />
            Call
          </a>
        </div>
      </header>

      <main>
        {/* ─── Hero Section ─── */}
        <section className="relative bg-[#07403F] overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('/treatment-1.jpg')] bg-cover bg-center bg-no-repeat" />
          <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 rounded-full px-4 py-1.5 mb-6">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span className="text-amber-300 text-xs font-semibold tracking-wide uppercase">Harvard-Trained Physician</span>
                </div>
                <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: "Lora, Georgia, serif" }}>
                  ED Isn&apos;t Just About<br />
                  <span className="text-amber-400">Confidence.</span><br />
                  It&apos;s Your Body Asking<br />
                  for Help.
                </h1>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  Most treatments mask the symptoms. At Transformity Health, Dr. Liv Uslar &mdash; Harvard-trained MD/PhD &mdash; uncovers the root cause of your ED through advanced diagnostics and delivers a personalized, pill-free treatment plan.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "GainsWave shockwave therapy with 60–80% success rates",
                    "Hormone balancing, nutrition & gut health protocols",
                    "Advanced blood work &amp; biomarker testing",
                    "No pills. No quick fixes. Real, lasting results.",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-white/90 text-sm" dangerouslySetInnerHTML={{ __html: item }} />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-9 h-9 rounded-full bg-amber-500/20 border-2 border-amber-400/40 flex items-center justify-center text-xs text-amber-300 font-bold">
                        {["D","A","M","B"][i-1]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
                    <p className="text-white/70 text-xs">207 Google reviews &middot; 5.0 rating</p>
                  </div>
                </div>
              </div>

              <div id="consultation-form">
                <LeadForm variant="hero" />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Trust Bar ─── */}
        <section className="bg-[#052e2d] py-6 border-b border-amber-500/20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { stat: "5.0 ★", label: "Google Rating" },
                { stat: "207+", label: "5-Star Reviews" },
                { stat: "Harvard-Trained", label: "MD/PhD" },
                { stat: "0%", label: "APR Financing Available" },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-amber-400 font-bold text-xl">{item.stat}</p>
                  <p className="text-white/60 text-xs mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── The Problem Section ─── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-[#07403F] mb-4" style={{ fontFamily: "Lora, Georgia, serif" }}>
                  Pills Don&apos;t Fix the Problem.<br />They Just Postpone It.
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Erectile dysfunction is rarely &ldquo;just in your head&rdquo; &mdash; and it&apos;s rarely caused by low Viagra levels. It&apos;s a signal. Poor circulation, hormone imbalances, metabolic dysfunction, inflammation, or psychological stress are all real, identifiable causes. We find them.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Reveal>
                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-red-500">&#x2715;</span> The Conventional Approach
                    </h3>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      {[
                        "Prescribe a pill and send you home",
                        "No investigation into why it&apos;s happening",
                        "Side effects that create new problems",
                        "Temporary fix at best &mdash; dependency at worst",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2" dangerouslySetInnerHTML={{ __html: `<span class="text-red-400">&#9679;</span> ${item}` }} />
                      ))}
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-green-600">&#x2713;</span> The Transformity Approach
                    </h3>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      {[
                        "Comprehensive diagnostics to find the root cause",
                        "GainsWave shockwave therapy to restore blood flow",
                        "Hormone optimization &amp; gut health protocols",
                        "Personalized program that addresses YOUR WHY",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2" dangerouslySetInnerHTML={{ __html: `<span class="text-green-500">&#9679;</span> ${item}` }} />
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                  <Image
                    src="/clinic.jpg"
                    alt="Transformity Health clinic consultation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07403F]/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white font-semibold text-sm">
                      Every treatment begins with a comprehensive evaluation &mdash; not a guess.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── About Dr. Liv ─── */}
        <section className="py-16 md:py-24 bg-[#FEF9EE]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <Reveal>
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto shadow-xl">
                    <Image
                      src="/dr-liv.jpg"
                      alt="Dr. Liv Uslar, MD/PhD — Transformity Health"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-[#07403F] text-white rounded-xl p-4 shadow-lg max-w-[180px]">
                    <p className="text-amber-400 font-bold text-sm">Harvard-Trained</p>
                    <p className="text-white/80 text-xs mt-0.5">MD/PhD &bull; Board Certified Internal Medicine &bull; Functional Medicine</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div>
                  <p className="text-amber-600 font-semibold text-sm uppercase tracking-wide mb-3">Meet Your Physician</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#07403F] mb-6" style={{ fontFamily: "Lora, Georgia, serif" }}>
                    Dr. Liv Uslar, MD/PhD
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-5">
                    Dr. Uslar trained at Harvard Medical School, completed her internal medicine residency at Mount Sinai Hospital in New York, and holds advanced functional medicine training. She graduated <em>summa cum laude</em> from the University of Hamburg and earned her PhD in breast cancer research.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    She founded Transformity Health on a simple belief: your body can heal when given the right support. She sees every patient personally &mdash; no assistants, no sales staff &mdash; and builds individualized protocols based on your unique biology.
                  </p>
                  <div className="space-y-3">
                    {[
                      "Harvard Medical School Research Fellow",
                      "Board Certified, American Board of Internal Medicine",
                      "Certified in GainsWave protocols",
                      "Licensed in 5 states: FL, NY, NJ, AZ, PA",
                      "207 Google reviews with perfect 5.0 rating",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckIcon className="w-4 h-4 text-amber-500 shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── Treatment Approach ─── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-[#07403F] mb-4" style={{ fontFamily: "Lora, Georgia, serif" }}>
                  Your Personalized Path to Recovery
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  No two cases of ED are the same. Your program is designed around your biology, not a generic protocol.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Reveal>
                <div className="relative rounded-2xl overflow-hidden aspect-video shadow-xl">
                  <Image
                    src="/treatment-1.jpg"
                    alt="GainsWave shockwave therapy treatment"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07403F]/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-amber-400 font-bold text-sm uppercase tracking-wide">GainsWave Therapy</p>
                    <p className="text-white text-sm mt-0.5">Low-intensity shockwave therapy that regenerates blood flow</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="relative rounded-2xl overflow-hidden aspect-video shadow-xl">
                  <Image
                    src="/treatment-2.jpg"
                    alt="Functional medicine consultation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07403F]/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-amber-400 font-bold text-sm uppercase tracking-wide">Root-Cause Diagnostics</p>
                    <p className="text-white text-sm mt-0.5">Advanced biomarker testing, hormone panels &amp; metabolic analysis</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <MicroscopeIcon />,
                  title: "Comprehensive Testing",
                  desc: "Hormone panels, cardiovascular markers, metabolic function, nutrient levels, and more.",
                },
                {
                  icon: <BoltIcon />,
                  title: "GainsWave Shockwave",
                  desc: "FDA-cleared acoustic wave therapy that stimulates new blood vessel growth and restores natural erectile function.",
                },
                {
                  icon: <HeartIcon />,
                  title: "Hormone Optimization",
                  desc: "Testosterone balancing and endocrine support tailored to your specific levels and symptoms.",
                },
                {
                  icon: <ShieldCheck />,
                  title: "Ongoing Partnership",
                  desc: "Dr. Uslar monitors your progress and adjusts your protocol to ensure lasting results.",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="bg-[#FEF9EE] rounded-xl p-6 border border-amber-100 h-full">
                    <div className="w-12 h-12 rounded-xl bg-[#07403F]/10 flex items-center justify-center text-[#07403F] mb-4">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-[#07403F] mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section className="py-16 md:py-24 bg-[#07403F]">
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "Lora, Georgia, serif" }}>
                  Real Patients. Real Results.
                </h2>
                <p className="text-white/70 text-lg">207 five-star reviews and counting</p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Michael T.",
                  location: "Fort Lauderdale, FL",
                  text: "I was skeptical at first, but Dr. Liv actually listened. She ran tests my regular doctor never ordered, found the real issue, and built a plan around it. Six weeks later, I feel like I'm 20 years younger.",
                },
                {
                  name: "David R.",
                  location: "Aventura, FL",
                  text: "The GainsWave treatments were painless and the results were noticeable after the second session. Dr. Uslar is thorough, knowledgeable, and actually cares. Worth every penny.",
                },
                {
                  name: "James K.",
                  location: "Boca Raton, FL",
                  text: "I'd been on Viagra for years and hated being dependent on it. Dr. Liv's program addressed why it was happening. Three months in, I no longer need medication. I can't recommend her enough.",
                },
              ].map((t, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 h-full">
                    <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, j) => <StarIcon key={j} />)}</div>
                    <p className="text-white/90 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                    <div>
                      <p className="text-amber-400 font-semibold text-sm">{t.name}</p>
                      <p className="text-white/50 text-xs">{t.location}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Financing Section ─── */}
        <section className="py-12 bg-[#FEF9EE] border-y border-amber-200/50">
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#07403F] mb-3" style={{ fontFamily: "Lora, Georgia, serif" }}>
                    Flexible Financing Available
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We believe your health shouldn&apos;t be limited by your budget. Transformity Health accepts 0% APR financing through Cherry and CareCredit, making world-class care accessible.
                  </p>
                </div>
                <div className="flex gap-6 items-center flex-shrink-0">
                  {["Cherry Financing", "CareCredit", "HSA/FSA"].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="w-16 h-16 rounded-xl bg-white shadow-md border border-amber-100 flex items-center justify-center">
                        <span className="text-[#07403F] text-xs font-bold text-center leading-tight px-1">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── Second Form / CTA ─── */}
        <section className="py-16 md:py-24 bg-[#07403F]" id="get-started">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <Reveal>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "Lora, Georgia, serif" }}>
                    You Don&apos;t Have to Just<br />
                    <span className="text-amber-400">Accept This.</span>
                  </h2>
                  <p className="text-white/80 text-lg leading-relaxed mb-8">
                    ED affects millions of men &mdash; and most of them suffer in silence, or settle for a pill that barely works. You deserve a real answer, from a physician who will actually take the time to understand what&apos;s going on.
                  </p>
                  <div className="space-y-4">
                    {[
                      { title: "Free Initial Consultation", desc: "Speak directly with Dr. Uslar about your situation at no cost." },
                      { title: "Confidential & Judgment-Free", desc: "Everything discussed is protected and handled with complete discretion." },
                      { title: "Located in Hallandale Beach, FL", desc: "Serving patients from across South Florida." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                          <CheckIcon className="w-4 h-4 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{item.title}</p>
                          <p className="text-white/60 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div id="consultation-form-2">
                  <LeadForm variant="inline" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ─── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <Reveal>
              <h2 className="text-3xl font-bold text-[#07403F] mb-10 text-center" style={{ fontFamily: "Lora, Georgia, serif" }}>
                Common Questions
              </h2>
            </Reveal>
            <div className="space-y-4">
              {[
                {
                  q: "Is ED treatment at Transformity Health covered by insurance?",
                  a: "Most functional medicine and GainsWave treatments are cash-pay investments. However, we accept Cherry and CareCredit financing with 0% APR options, and some diagnostic testing may be covered by insurance or HSA/FSA.",
                },
                {
                  q: "How many GainsWave sessions will I need?",
                  a: "Most patients see meaningful improvement after 6–12 sessions. Dr. Uslar will assess your case and design a protocol tailored to your specific situation.",
                },
                {
                  q: "Is the treatment painful?",
                  a: "GainsWave therapy is non-invasive and generally well-tolerated. Most patients experience mild warmth or tingling during treatment. There is no downtime.",
                },
                {
                  q: "How soon can I see results?",
                  a: "Many patients notice improvements after the third or fourth session. Full results from a complete protocol are typically seen within 4–8 weeks of finishing treatment.",
                },
                {
                  q: "Do I need a referral to schedule a consultation?",
                  a: "No referral is required. Simply request a consultation using the form on this page and our team will reach out to schedule your appointment with Dr. Uslar.",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div className="border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-[#07403F] mb-2">{item.q}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-[#052e2d] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="relative h-10 w-40 mb-4">
                <Image src="/logo.png" alt="Transformity Health" fill className="object-contain object-left brightness-0 invert" />
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Functional medicine &amp; root-cause treatment for erectile dysfunction in South Florida.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-amber-400 mb-3 text-sm uppercase tracking-wide">Treatments</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>GainsWave Shockwave Therapy</li>
                <li>Hormone Optimization</li>
                <li>Advanced Diagnostics</li>
                <li>Personalized ED Protocols</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-amber-400 mb-3 text-sm uppercase tracking-wide">Contact</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>
                  <a href="tel:9177044886" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                    <PhoneIcon />
                    917-704-4886
                  </a>
                </li>
                <li>
                  <a href="mailto:contact@transformityhealth.com" className="hover:text-amber-400 transition-colors">
                    contact@transformityhealth.com
                  </a>
                </li>
                <li>Hallandale Beach, Florida</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-white/40 text-xs">
            &copy; {new Date().getFullYear()} Transformity Health. All rights reserved.
            &nbsp;&middot;&nbsp; This page is for informational purposes only and does not constitute medical advice.
          </div>
        </div>
      </footer>

      {/* Mobile padding for sticky bar */}
      <div className="md:hidden h-16" />
    </>
  );
}

/* ─── TypeScript global augments ─── */
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq: (event: string, ...args: unknown[]) => void;
  }
}
