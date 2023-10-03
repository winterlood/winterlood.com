export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const pageview = ({ pageTitle, pagePath }) => {
  // @ts-ignore
  window.gtag("config", GA_TRACKING_ID, {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

export const event = ({ action, category, label, value }) => {
  // @ts-ignore
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
