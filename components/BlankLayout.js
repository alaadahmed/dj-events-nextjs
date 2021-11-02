import Head from 'next/head';

export default function BlankLayout({
  title,
  keywords,
  description,
  children,
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className="h-full">{children}</div>
    </>
  );
}

BlankLayout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, dem, events',
};
