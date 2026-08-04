import type { Metadata } from "next";
import Link from "next/link";
import { CourseCard } from "@/components/courses/course-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { WEEK_DAYS } from "@/lib/constants/site";
import { getCourses } from "@/lib/data/loaders";

export const metadata: Metadata = {
  title: "Nos cours",
  description: "Tous les cours de la Gym de Gimel avec filtres par catégorie, âge et jour."
};

export default async function CoursesPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string; day?: string; age?: string; q?: string }>;
}) {
  const params = await searchParams;
  const courses = await getCourses();
  const categories = [...new Set(courses.map((course) => course.category))].sort();
  const ages = [...new Set(courses.map((course) => course.ageRange))].sort();

  const filtered = courses.filter((course) => {
    const query = params.q?.trim().toLowerCase();
    return (
      (!params.category || course.category === params.category) &&
      (!params.day || course.days.includes(params.day)) &&
      (!params.age || course.ageRange === params.age) &&
      (!query || `${course.name} ${course.shortDescription} ${course.category}`.toLowerCase().includes(query))
    );
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Cours" title="Nos cours">
        Les cours sont structurés dans un CSV pour pouvoir être mis à jour sans modifier les pages.
      </SectionHeading>

      <form className="mt-8 grid gap-4 rounded-lg border border-stone-200 bg-white p-4 shadow-soft md:grid-cols-4" action="/nos-cours">
        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Recherche
          <input
            name="q"
            defaultValue={params.q ?? ""}
            className="rounded border border-stone-300 px-3 py-2 font-normal"
            placeholder="Nom ou catégorie"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Catégorie
          <select name="category" defaultValue={params.category ?? ""} className="rounded border border-stone-300 px-3 py-2 font-normal">
            <option value="">Toutes</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Age
          <select name="age" defaultValue={params.age ?? ""} className="rounded border border-stone-300 px-3 py-2 font-normal">
            <option value="">Tous</option>
            {ages.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Jour
          <select name="day" defaultValue={params.day ?? ""} className="rounded border border-stone-300 px-3 py-2 font-normal">
            <option value="">Tous</option>
            {WEEK_DAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-3 md:col-span-4">
          <button className="rounded bg-brand px-4 py-2 font-bold text-white hover:bg-brand-dark" type="submit">
            Filtrer
          </button>
          <Link className="rounded border border-stone-300 px-4 py-2 font-bold" href="/nos-cours">
            Réinitialiser
          </Link>
        </div>
      </form>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center text-stone-600">
          Aucun cours ne correspond aux filtres sélectionnés.
        </p>
      ) : null}
    </div>
  );
}
