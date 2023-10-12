export function getMetaTag(info: {
  url: string;
  title?: string;
  description?: string;
  ogImageTitle?: string;
}) {
  const title = info.title || "무엇이든 쉽게 설명할 방법은 있다";
  const description =
    info.description || "무엇이든 쉽게 설명할 방법은 있다 🔥";

  const imageUrl = `${
    process.env.BASE_URL
  }/api/og?title=${encodeURIComponent(
    info.ogImageTitle || info.title || "이정환 블로그"
  )}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: info.url,
      siteName: "이정환 블로그",
      images: {
        url: imageUrl,
        alt: title,
      },
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "이정환",
      images: {
        url: imageUrl,
        alt: title,
      },
    },
  };
}
