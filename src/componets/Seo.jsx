import React from "react";
import { Helmet } from "react-helmet-async";

const defaultMeta = {
  title: "Sudarshan Kakde | Full Stack Developer",
  description:
    "Crafting seamless digital experiences with a passion for full-stack development. Elevating UI/UX with joyous expertise!",
  keywords:
    "full stack development, cross-platform development, UI/UX design, web development, mobile app development, responsive design, front-end development, back-end development, programming, coding, software engineering, portfolio, Sudarshan Kakde",
  author: "Sudarshan Kakde",
  url: "https://sudarshankakde.live/",
  image: "%PUBLIC_URL%/logo.png",
};

export function DefaultSeo() {
  return (
    <Helmet>
      <title>{defaultMeta.title}</title>
      <meta name="description" content={defaultMeta.description} />
      <meta name="keywords" content={defaultMeta.keywords} />
      <meta name="author" content={defaultMeta.author} />
      <meta property="og:title" content={defaultMeta.title} />
      <meta property="og:description" content={defaultMeta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={defaultMeta.url} />
      <meta property="og:image" content={defaultMeta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={defaultMeta.title} />
      <meta name="twitter:description" content={defaultMeta.description} />
    </Helmet>
  );
}

export function PageSeo({ title, description, image, url, children }) {
  const metaTitle = title ? `${title} | ${defaultMeta.title}` : defaultMeta.title;
  const metaDescription = description || defaultMeta.description;
  const metaImage = image || defaultMeta.image;
  const metaUrl = url || defaultMeta.url;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </Helmet>
  );
}

export default DefaultSeo;
