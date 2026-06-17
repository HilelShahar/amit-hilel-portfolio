/*
 * Google Analytics 4 (gtag.js) loader for the portfolio.
 *
 * Single source of truth for the Measurement ID — every page loads this file,
 * so to switch GA properties you only change GA_ID below (one place).
 *
 * 1. Create a GA4 property at https://analytics.google.com (Admin → Create property
 *    → add a "Web" data stream for amithilel.com).
 * 2. Copy the Measurement ID (looks like G-XXXXXXXXXX) from the data stream.
 * 3. Paste it into GA_ID below, then commit & deploy.
 *
 * Until a real ID is set, this script does nothing (no network calls).
 */
(function () {
  var GA_ID = 'G-2R0RDV2N5P'; // GA4 Measurement ID — "Amit's Portfolio" stream (amithilel.com)

  // Bail out while the placeholder is still in place.
  if (!GA_ID || GA_ID.indexOf('XXXX') !== -1) return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_ID);
})();
