import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Erectile Dysfunction Treatment | Transformity Health — Root-Cause Functional Medicine",
  description:
    "Stop treating symptoms. Transformity Health's Harvard-trained physician addresses the root cause of ED with shockwave therapy, personalized protocols, and natural treatments. Request a free consultation.",
  openGraph: {
    title: "ED Treatment That Gets to the Root Cause | Transformity Health",
    description:
      "Personalized, non-pill erectile dysfunction treatment by Dr. Liv Uslar, Harvard-trained MD/PhD. GainsWave shockwave therapy, functional medicine, and real results in Hallandale Beach, FL.",
    type: "website",
  },
};

// MEGA Admin registered IDs
const SITE_ID = "bc8f0b37-8b1f-4721-8605-5cfd8d1fc295";
const SITE_KEY = "sk_transformity_ed_lp";

// GTM Container ID
const GTM_ID = "GTM-P9NK962D";

// Meta Pixel ID
const PIXEL_ID = "4048314345401157";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* GTM */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />

        {/* MegaTag config — pixelId here lets the optimizer load Meta Pixel.
            Per QA Rubric 4: do NOT also inject a manual fbq script; MegaTag
            handles Pixel init + PageView, and form code can still call
            window.fbq('track','Lead') once MegaTag has booted it. */}
        <meta name="mega-site-id" content={SITE_ID} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.MEGA_TAG_CONFIG={siteKey:"${SITE_KEY}",siteId:"${SITE_ID}",gtmId:"${GTM_ID}",pixelId:"${PIXEL_ID}"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`,
          }}
        />
        <script
          id="optimizer-script"
          src="https://cdn.gomega.ai/scripts/optimizer.min.js"
          data-site-id={SITE_ID}
          async
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Meta Pixel noscript fallback (PageView tracking pixel only;
            the JS Pixel is loaded by MegaTag from MEGA_TAG_CONFIG.pixelId) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {children}

        {/* CTM universal call tracking script */}
        <Script
          src="https://572388.tctm.co/t.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
