import { notFound } from "next/navigation";
import { ArchiveArticleView } from "@/components/blog/ArchiveArticleView";
import { archiveEntries } from "@/content/site";
import { getArchivePostForLocale, getAllArchiveSlugsFromManifest } from "@/lib/archive/posts";
import { absoluteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArchiveSlugsFromManifest().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getArchivePostForLocale(slug, "en");
  if (!post) return {};
  const entry = archiveEntries.find((item) => item.slug === slug);
  const title = entry?.title ?? post.frontmatter.title;
  const description = entry?.preview ?? post.frontmatter.title;
  const url = absoluteUrl(`/archive/${slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.frontmatter.date,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ArchivePostPage({ params }: Props) {
  const { slug } = await params;
  const post = getArchivePostForLocale(slug, "en");
  if (!post) notFound();

  return <ArchiveArticleView slug={slug} />;
}
