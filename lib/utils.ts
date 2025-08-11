import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Post, Project } from "#site/content";
import { slug } from "github-slugger";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Post utilities
export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

// Project utilities
export function sortProjects(projects: Array<Project>) {
  return projects.sort((a, b) => {
    // Featured projects first
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    // Then by date (newest first)
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

// Shared tag utilities
export function getAllTags(items: Array<Post | Project>) {
  const tags: Record<string, number> = {}
  items.forEach(item => {
    item.tags?.forEach(tag => {
      const normalizedTag = tag.toLowerCase();
      tags[normalizedTag] = (tags[normalizedTag] ?? 0) + 1;
    })
  })
  return tags;
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a])
}

export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter(post => {
    if (!post.tags) return false
    const slugifiedTags = post.tags.map(tag => slug(tag.toLowerCase()))
    return slugifiedTags.includes(tag)
  })
}

export function getProjectsByTagSlug(projects: Array<Project>, tag: string) {
  return projects.filter(project => {
    if (!project.tags) return false
    const slugifiedTags = project.tags.map(tag => slug(tag.toLowerCase()))
    return slugifiedTags.includes(tag)
  })
}

// Combined utilities for mixed content
export function getItemsByTagSlug(items: Array<Post | Project>, tag: string) {
  return items.filter(item => {
    if (!item.tags) return false
    const slugifiedTags = item.tags.map(tag => slug(tag.toLowerCase()))
    return slugifiedTags.includes(tag)
  })
}
