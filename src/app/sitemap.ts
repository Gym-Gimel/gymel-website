import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants/site";
import { getCompetitions, getCourses } from "@/lib/data/loaders";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, competitions] = await Promise.all([getCourses(), getCompetitions()]);
  const staticRoutes = ["", "/nos-cours", "/calendrier-sportif", "/evenements", "/inscriptions", "/la-societe", "/contact"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE.url}${route}`,
      lastModified: new Date()
    })),
    ...courses.map((course) => ({
      url: `${SITE.url}/nos-cours/${course.slug}`,
      lastModified: new Date()
    })),
    ...competitions.map((competition) => ({
      url: `${SITE.url}/calendrier-sportif/concours/${competition.slug}`,
      lastModified: new Date(competition.startDate)
    }))
  ];
}
