"use client";

import { useId, useRef, useState } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";

// Mega Admin registered IDs for Transformity Health ED LP
const CUSTOMER_ID = "ba77060c-c433-4349-8d1d-e375141a8033";
const SITE_ID = "bc8f0b37-8b1f-4721-8605-5cfd8d1fc295";
const SOURCE_PROVIDER = "transformity-health-ed-lp";

const INVESTMENT_OPTIONS = [
  { value: "ready_no_financing", label: "Yes, I'm ready to invest in a lasting solution", qualified: true },
  { value: "ready_with_financing", label: "Yes, but I'd need financing options", qualified: true },
  { value: "lower_cost_only", label: "No, I'm looking for a lower-cost option", qualified: false },
] as const;

type InvestmentValue = (typeof INVESTMENT_OPTIONS)[number]["value"];

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (event: string, ...args: unknown[]) => void;
    MegaTag?: {
      trackEvent?: (eventName: string, eventData?: Record<string, unknown>) => void;
      [k: string]: unknown;
    };
  }
}

interface LeadFormProps {
  variant?: "hero" | "inline";
  headline?: string;
  subhead?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  investmentReady: InvestmentValue | "";
}

const initial: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  investmentReady: "",
};

type FieldKey = keyof FormData;
type FieldErrors = Partial<Record<FieldKey, string>>;

const EMAIL_RE = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

function validateField(key: FieldKey, value: string): string | undefined {
  switch (key) {
    case "firstName":
      if (!value.trim()) return "Please enter your first name.";
      return undefined;
    case "lastName":
      if (!value.trim()) return "Please enter your last name.";
      return undefined;
    case "email": {
      const v = value.trim();
      if (!v) return "Please enter your email address.";
      if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
      return undefined;
    }
    case "phone": {
      const digits = value.replace(/\D/g, "");
      if (!digits) return "Please enter your phone number.";
      if (digits.length !== 10) return "Phone must be a 10-digit number.";
      return undefined;
    }
    case "investmentReady":
      if (!value) return "Please select an option.";
      return undefined;
  }
}

function validateAll(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  (Object.keys(data) as FieldKey[]).forEach((k) => {
    const err = validateField(k, data[k]);
    if (err) errors[k] = err;
  });
  return errors;
}

function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (!d) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function ArrowRight() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-8 h-8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function LeadForm({ variant = "hero", headline, subhead }: LeadFormProps) {
  const { status, errorMessage, submitLead } = useMegaLeadForm({
    customerId: CUSTOMER_ID,
    siteId: SITE_ID,
    sourceProvider: SOURCE_PROVIDER,
  });

  const fid = useId();
  const id = (k: string) => `${k}-${fid}`;
  const errId = (k: string) => `${k}-${fid}-err`;

  const fieldRefs = useRef<Partial<Record<FieldKey, HTMLElement | null>>>({});
  const [data, setData] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const inFlightRef = useRef(false);

  const update = <K extends FieldKey>(k: K, v: FormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((prev) => {
      if (!prev[k]) return prev;
      const err = validateField(k, String(v));
      if (err) return prev;
      const next = { ...prev };
      delete next[k];
      return next;
    });
  };

  const markTouched = (k: FieldKey, currentValue: string) => {
    setTouched((t) => ({ ...t, [k]: true }));
    const err = validateField(k, currentValue);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[k] = err;
      else delete next[k];
      return next;
    });
  };

  const submitting = status === "submitting";
  const success = status === "success" || submitted;

  // HARD RULE 5 — button is type="button" + validate-first. NEVER native form submit.
  const handleClick = async () => {
    if (submitting || success || inFlightRef.current) return;
    const allErrors = validateAll(data);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        investmentReady: true,
      });
      const order: FieldKey[] = ["firstName", "lastName", "email", "phone", "investmentReady"];
      const firstBad = order.find((k) => allErrors[k]);
      if (firstBad) {
        const el = fieldRefs.current[firstBad];
        if (el) {
          try {
            (el as HTMLInputElement).focus({ preventScroll: false });
          } catch {
            el.focus();
          }
        }
      }
      return;
    }
    inFlightRef.current = true;

    const firstName = data.firstName.trim();
    const lastName = data.lastName.trim();
    const email = data.email.trim();
    const phone = data.phone.replace(/\D/g, "");
    const investmentReady = data.investmentReady as InvestmentValue;
    const opt = INVESTMENT_OPTIONS.find((o) => o.value === investmentReady);
    const investmentReadyLabel = opt?.label ?? investmentReady;
    const qualified = opt?.qualified ?? false;
    const disqualificationReason = qualified ? "" : "lower_cost_only";

    try {
      // 1. ALL leads → lead API (qualified + disqualified). Peter mandate 2026-05-14.
      await submitLead({
        firstName,
        lastName,
        email,
        phone,
        investmentReady,
        investmentReadyLabel,
        qualified: qualified ? "yes" : "no",
        disqualification_reason: disqualificationReason,
        formId: `transformity-ed-${variant}`,
      });

      // 2. MegaTag form_submit — separated field keys so Conversions shows columns.
      if (typeof window !== "undefined" && window.MegaTag?.trackEvent) {
        try {
          window.MegaTag.trackEvent("form_submit", {
            element: `form-${variant}`,
            firstName,
            lastName,
            email,
            phone,
            investmentReady,
            investmentReadyLabel,
            qualified: qualified ? "yes" : "no",
            disqualification_reason: disqualificationReason,
          });
          if (qualified) {
            window.MegaTag.trackEvent("qualified_lead", {
              element: `form-${variant}`,
              firstName,
              lastName,
              email,
              phone,
              investmentReady,
            });
          }
        } catch {
          /* silent */
        }
      }

      // 3. GTM dataLayer — form_submission for all, qualified_lead only on qualified.
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form_submission",
          form_id: `transformity-ed-${variant}`,
          qualified: qualified ? "yes" : "no",
          disqualification_reason: disqualificationReason,
        });
        if (qualified) {
          window.dataLayer.push({
            event: "qualified_lead",
            form_id: `transformity-ed-${variant}`,
            investment_ready: investmentReady,
          });
        }
      }

      // 4. Meta Pixel — fire Lead ONLY for qualified leads (don't pollute optimization).
      if (qualified && typeof window !== "undefined" && typeof window.fbq === "function") {
        try {
          window.fbq("track", "Lead");
        } catch {
          /* silent */
        }
      }

      setSubmitted(true);
    } finally {
      inFlightRef.current = false;
    }
  };

  const handleNativeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const isHero = variant === "hero";
  const isDark = !isHero;

  // ---------- Success state ----------
  if (success) {
    const qualifiedNow = INVESTMENT_OPTIONS.find((o) => o.value === data.investmentReady)?.qualified ?? false;
    return (
      <div
        className={`rounded-2xl p-8 text-center ${
          isHero ? "bg-white shadow-2xl border border-gray-100" : "bg-[#07403F] border border-white/15"
        }`}
      >
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isHero ? "bg-amber-50 text-amber-500" : "bg-amber-400/20 text-amber-300"
          }`}
        >
          <CheckMark />
        </div>
        <h3
          className={`text-2xl font-bold mb-3 ${isHero ? "text-[#07403F]" : "text-white"}`}
          style={{ fontFamily: "Lora, Georgia, serif" }}
        >
          You&rsquo;re All Set{data.firstName ? `, ${data.firstName}` : ""}
        </h3>
        <p className={`${isHero ? "text-gray-600" : "text-white/80"} text-sm leading-relaxed`}>
          {qualifiedNow
            ? "Thank you. Our care team will reach out within one business day to schedule your private consultation with Dr. Uslar."
            : "Thank you for reaching out. Our team will follow up to discuss the care options we offer and the financing programs that may help."}
        </p>
        <p
          className={`mt-5 text-sm font-semibold ${isHero ? "text-[#07403F]" : "text-amber-300"}`}
        >
          Need faster help?{" "}
          <a href="tel:9177044886" className="underline">
            Call 917-704-4886
          </a>
        </p>
      </div>
    );
  }

  const showErr = (k: FieldKey) => Boolean(touched[k] && errors[k]);
  const inputCls = (k: FieldKey) =>
    `lp-input ${isDark ? "lp-input-dark" : ""} ${showErr(k) ? "lp-input-error" : ""}`;
  const labelCls = `block text-sm font-semibold mb-1.5 ${
    isHero ? "text-gray-800" : "text-white/90"
  }`;
  const errCls = `lp-field-error ${isDark ? "lp-field-error-dark" : ""}`;

  return (
    <form
      onSubmit={handleNativeSubmit}
      noValidate
      className={`relative rounded-2xl p-6 sm:p-8 ${
        isHero ? "bg-white shadow-2xl border border-gray-100" : "bg-[#07403F] border border-white/15"
      }`}
      aria-label="Request a free consultation"
    >
      <div className="mb-5">
        <h3
          className={`text-xl sm:text-2xl font-bold leading-tight ${isHero ? "text-[#07403F]" : "text-white"}`}
          style={{ fontFamily: "Lora, Georgia, serif" }}
        >
          {headline ?? "Request a Free Consultation"}
        </h3>
        <p className={`mt-1.5 text-sm ${isHero ? "text-gray-500" : "text-white/70"}`}>
          {subhead ?? "Speak directly with Dr. Uslar — confidential, no pressure."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor={id("firstName")} className={labelCls}>
            First name
          </label>
          <input
            ref={(el) => {
              fieldRefs.current.firstName = el;
            }}
            id={id("firstName")}
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            className={inputCls("firstName")}
            value={data.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            onBlur={(e) => markTouched("firstName", e.target.value)}
            disabled={submitting}
            aria-invalid={showErr("firstName") || undefined}
            aria-describedby={showErr("firstName") ? errId("firstName") : undefined}
          />
          {showErr("firstName") && (
            <p id={errId("firstName")} role="alert" aria-live="polite" className={errCls}>
              {errors.firstName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={id("lastName")} className={labelCls}>
            Last name
          </label>
          <input
            ref={(el) => {
              fieldRefs.current.lastName = el;
            }}
            id={id("lastName")}
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
            className={inputCls("lastName")}
            value={data.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            onBlur={(e) => markTouched("lastName", e.target.value)}
            disabled={submitting}
            aria-invalid={showErr("lastName") || undefined}
            aria-describedby={showErr("lastName") ? errId("lastName") : undefined}
          />
          {showErr("lastName") && (
            <p id={errId("lastName")} role="alert" aria-live="polite" className={errCls}>
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor={id("email")} className={labelCls}>
          Email address
        </label>
        <input
          ref={(el) => {
            fieldRefs.current.email = el;
          }}
          id={id("email")}
          name="email"
          type="email"
          autoComplete="email"
          pattern="^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
          placeholder="you@example.com"
          className={inputCls("email")}
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={(e) => markTouched("email", e.target.value)}
          disabled={submitting}
          aria-invalid={showErr("email") || undefined}
          aria-describedby={showErr("email") ? errId("email") : undefined}
        />
        {showErr("email") && (
          <p id={errId("email")} role="alert" aria-live="polite" className={errCls}>
            {errors.email}
          </p>
        )}
      </div>

      <div className="mt-3">
        <label htmlFor={id("phone")} className={labelCls}>
          Phone number
        </label>
        <input
          ref={(el) => {
            fieldRefs.current.phone = el;
          }}
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="(305) 555-0100"
          className={inputCls("phone")}
          value={data.phone}
          onChange={(e) => update("phone", formatPhone(e.target.value))}
          onBlur={(e) => markTouched("phone", e.target.value)}
          disabled={submitting}
          aria-invalid={showErr("phone") || undefined}
          aria-describedby={showErr("phone") ? errId("phone") : undefined}
          maxLength={16}
        />
        {showErr("phone") && (
          <p id={errId("phone")} role="alert" aria-live="polite" className={errCls}>
            {errors.phone}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor={id("investmentReady")} className={labelCls}>
          How are you planning to invest in your care?
        </label>
        <p
          id={id("investmentReady") + "-help"}
          className={`text-xs leading-snug mb-2 ${isHero ? "text-gray-500" : "text-white/60"}`}
        >
          ED treatments at Transformity Health are a cash-pay investment that
          can cost several thousand dollars. Financing is available through
          Cherry &amp; CareCredit.
        </p>
        <select
          ref={(el) => {
            fieldRefs.current.investmentReady = el;
          }}
          id={id("investmentReady")}
          name="investmentReady"
          className={inputCls("investmentReady")}
          value={data.investmentReady}
          onChange={(e) => update("investmentReady", e.target.value as InvestmentValue | "")}
          onBlur={(e) => markTouched("investmentReady", e.target.value)}
          disabled={submitting}
          aria-invalid={showErr("investmentReady") || undefined}
          aria-describedby={
            showErr("investmentReady")
              ? `${errId("investmentReady")} ${id("investmentReady")}-help`
              : `${id("investmentReady")}-help`
          }
        >
          <option value="" disabled>
            Select an option…
          </option>
          {INVESTMENT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {showErr("investmentReady") && (
          <p id={errId("investmentReady")} role="alert" aria-live="polite" className={errCls}>
            {errors.investmentReady}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleClick}
        disabled={submitting}
        className="btn-primary w-full mt-5"
        aria-busy={submitting || undefined}
      >
        {submitting ? "Submitting…" : "Request My Free Consultation"}
        {!submitting && <ArrowRight />}
      </button>

      {status === "error" && errorMessage && (
        <p role="alert" aria-live="polite" className={`mt-3 text-sm font-semibold ${isDark ? "text-red-300" : "text-red-600"}`}>
          {errorMessage}
        </p>
      )}

      <p
        className={`mt-4 text-xs flex items-center justify-center gap-1.5 ${
          isHero ? "text-gray-500" : "text-white/55"
        }`}
      >
        <LockIcon />
        100% confidential — your information is never shared.
      </p>
    </form>
  );
}

export default LeadForm;
