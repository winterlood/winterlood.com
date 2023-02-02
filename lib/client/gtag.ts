export const pageview = (url: any) => {
  if (typeof window !== "object") return;
  window.gtag("config", process.env.GA_TRACKING_ID as string, {
    page_path: url,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: any;
  category: any;
  label: any;
  value: any;
}) => {
  if (typeof window !== "object") return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
