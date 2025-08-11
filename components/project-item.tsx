import { Calendar, ExternalLink, Github, Star } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Tag } from "./tag";
import { Badge } from "./ui/badge";

interface ProjectItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
  status: "completed" | "in-progress" | "archived";
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

const statusConfig = {
  completed: { label: "Completed", variant: "default" as const },
  "in-progress": { label: "In Progress", variant: "secondary" as const },
  archived: { label: "Archived", variant: "outline" as const },
};

export function ProjectItem({
  slug,
  title,
  description,
  date,
  tags,
  status,
  featured,
  liveUrl,
  githubUrl,
}: ProjectItemProps) {
  const statusInfo = statusConfig[status];

  return (
    <article className="flex flex-col gap-2 border-border border-b py-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold">
              <Link href={"/" + slug}>{title}</Link>
            </h2>
            {featured && (
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            )}
          </div>
        </div>
        <Badge variant={statusInfo.variant} className="shrink-0">
          {statusInfo.label}
        </Badge>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>

      <div className="max-w-none text-muted-foreground">{description}</div>

      <div className="flex justify-between items-center flex-wrap gap-2">
        <dl>
          <dt className="sr-only">Published On</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
        </dl>

        <div className="flex items-center gap-2">
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-1"
              )}
            >
              <ExternalLink className="h-3 w-3" />
              Live Demo
            </Link>
          )}
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-1"
              )}
            >
              <Github className="h-3 w-3" />
              Code
            </Link>
          )}
          <Link
            href={"/" + slug}
            className={cn(buttonVariants({ variant: "link" }), "py-0")}
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
