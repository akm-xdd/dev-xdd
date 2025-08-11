import { posts, projects } from "#site/content";
import { PostItem } from "@/components/post-item";
import { ProjectItem } from "@/components/project-item";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, getPostsByTagSlug, getProjectsByTagSlug, sortTagsByCount } from "@/lib/utils";
import { slug } from "github-slugger";
import { Metadata } from "next";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = params;
  return {
    title: tag,
    description: `Posts and projects on the topic of ${tag}`,
  };
}

export const generateStaticParams = () => {
  const allItems = [...posts, ...projects];
  const tags = getAllTags(allItems);
  const paths = Object.keys(tags).map((tag) => ({ tag: slug(tag) }));
  return paths;
};

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const title = tag.split("-").join(" ");

  const displayPosts = getPostsByTagSlug(posts, tag);
  const displayProjects = getProjectsByTagSlug(projects, tag);
  
  const allItems = [...posts, ...projects];
  const tags = getAllTags(allItems);
  const sortedTags = sortTagsByCount(tags);

  const hasContent = displayPosts.length > 0 || displayProjects.length > 0;

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl capitalize">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground">
            Posts and projects related to {title}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          {hasContent ? (
            <div className="space-y-8">
              {displayProjects.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">Projects</h2>
                  <ul className="flex flex-col">
                    {displayProjects.map((project) => {
                      const { slug, date, title, description, tags, status, featured, liveUrl, githubUrl } = project;
                      return (
                        <li key={slug}>
                          <ProjectItem
                            slug={slug}
                            date={date}
                            title={title}
                            description={description}
                            tags={tags}
                            status={status}
                            featured={featured}
                            liveUrl={liveUrl}
                            githubUrl={githubUrl}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}

              {displayPosts.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
                  <ul className="flex flex-col">
                    {displayPosts.map((post) => {
                      const { slug, date, title, description, tags } = post;
                      return (
                        <li key={slug}>
                          <PostItem
                            slug={slug}
                            date={date}
                            title={title}
                            description={description}
                            tags={tags}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}
            </div>
          ) : (
            <p>No posts or projects found for this tag.</p>
          )}
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>All Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags?.map((t) => (
              <Tag tag={t} key={t} count={tags[t]} current={slug(t) === tag} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
