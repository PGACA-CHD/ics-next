// ─── ZOHO CRM SUBMISSION ──────────────────────────────────────────────────────
import { ZOHO_TOKEN, ZOHO_FORM_ID, ZOHO_ENDPOINT } from './config';

export function submitToZoho({ firstName, lastName, email, mobile, company, country, service, description, source }) {
  return new Promise((resolve) => {
    const iframeName = "zoho_iframe_" + Date.now();
    const iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = ZOHO_ENDPOINT;
    form.target = iframeName;
    form.style.display = "none";
    form.acceptCharset = "UTF-8";

    const fields = {
      "xnQsjsdp":   ZOHO_TOKEN,
      "zc_gad":     "",
      "xmIwtLD":    ZOHO_FORM_ID,
      "actionType": "TGVhZHM=",
      "returnURL":  "null",
      "First Name": firstName.trim(),
      "Last Name":  (lastName || "-").trim(),
      "Email":      email.trim(),
      "Mobile":     mobile || "",
      "Company":    company || "",
      "Country":    country || "",
      "Description": service
        ? ("Service: " + service + (description ? "\n\nDetails: " + description : ""))
        : (description || ""),
      "Lead Source": source || "Website",
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

    setTimeout(() => {
      try { document.body.removeChild(form); } catch(e) {}
      try { document.body.removeChild(iframe); } catch(e) {}
      resolve();
    }, 3000);
  });
}


// ─── ANALYTICS HELPERS ────────────────────────────────────────────────────────
export function trackEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

export function trackPageView(path) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-VFH7W7VQ44', { page_path: path });
  }
}

export function trackConsultationRequest(source) {
  trackEvent('generate_lead', { event_category: 'consultation', event_label: source });
}

export function trackCalendlyBooking() {
  trackEvent('booking_confirmed', { event_category: 'calendly', event_label: 'booking_completed' });
}

export function trackGuideDownload() {
  trackEvent('file_download', { event_category: 'guide', event_label: 'india_entry_guide' });
}

export function trackWhatsApp(source = 'general') {
  trackEvent('whatsapp_click', { event_category: 'contact', event_label: source });
}
