import { projects } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Star } from "lucide-react";
import Link from "next/link";

interface ProjectPageProps {
  params: {
    slug: string[];
  };
}

async function getProjectFromParams(params: ProjectPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const project = projects.find((project) => project.slugAsParams === slug);

  return project;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectFromParams(params);

  if (!project) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", project.title);

  return {
    title: project.title,
    description: project.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: project.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export async function generateStaticParams(): Promise<
  ProjectPageProps["params"][]
> {
  return projects.map((project) => ({ slug: project.slugAsParams.split("/") }));
}

const statusConfig = {
  completed: { label: "Completed", variant: "default" as const },
  "in-progress": { label: "In Progress", variant: "secondary" as const },
  archived: { label: "Archived", variant: "outline" as const },
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectFromParams(params);

  if (!project || !project.published) {
    notFound();
  }

  const statusInfo = statusConfig[project.status];

  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-4 not-prose">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="mb-0 text-4xl font-bold">{project.title}</h1>
            {project.featured && (
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            )}
          </div>
        </div>
        <Badge variant={statusInfo.variant}>
          {statusInfo.label}
        </Badge>
      </div>

      <div className="flex gap-2 mb-4 not-prose">
        {project.tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>

      {project.description ? (
        <p className="text-xl mt-0 text-muted-foreground not-prose mb-4">{project.description}</p>
      ) : null}

      <div className="flex gap-2 mb-6 not-prose">
        {project.liveUrl && (
          <Button asChild>
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </Link>
          </Button>
        )}
        {project.githubUrl && (
          <Button variant="outline" asChild>
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              View Code
            </Link>
          </Button>
        )}
      </div>

      <hr className="my-4 not-prose" />
      <MDXContent code={project.body} />
    </article>
  );
}
