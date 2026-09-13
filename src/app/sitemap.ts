import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants/site";
import {
  getCourses,
  getEventCompetitions,
  getSportsCompetitions,
} from "@/lib/data/loaders";
import { PHOTO_ALBUMS } from "@/lib/photos/albums";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, competitions, events] = await Promise.all([
    getCourses(),
    getSportsCompetitions(),
    getEventCompetitions(),
  ]);
  const staticRoutes = [
    "",
    "/nos-cours",
    "/calendrier-sportif",
    "/evenements",
    "/photos",
    "/inscriptions",
    "/la-societe",
    "/jobs",
    "/contact",
    "/sponsors",
    "/costumes-accessoires"
  ];

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
    })),
    ...events.map((event) => ({
      url: `${SITE.url}/evenements/${event.slug}`,
      lastModified: new Date(event.startDate)
    })),
    ...PHOTO_ALBUMS.map((album) => ({
      url: `${SITE.url}/photos/${album.slug}`,
      lastModified: new Date()
    }))
  ];
}
