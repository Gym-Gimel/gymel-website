import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Costumes & accessoires",
  description:
    "Costumes et accessoires de scène proposés à la location ou à l'achat par la Gym de Gimel."
};

export default function CostumesAccessoriesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Spectacles"
        title="Costumes & accessoires"
      >
        La Gym de Gimel met à disposition une partie de son stock de costumes et
        d'accessoires de scène pour les sociétés, associations et groupes qui
        organisent leurs propres spectacles.
      </SectionHeading>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-ink">
            Donner une seconde vie aux costumes
          </h2>
          <div className="mt-4 grid gap-4 leading-7 text-stone-600">
            <p>
              Chaque année, les différents groupes de la Gym de Gimel préparent
              un spectacle. Selon les thèmes et les représentations, des
              costumes et accessoires sont achetés, créés ou adaptés pour la
              scène.
            </p>
            <p>
              Au fil des années, la société a constitué un stock important. Une
              partie de ces pièces peut désormais être proposée à la location ou
              à l'achat pour d'autres sociétés ou associations qui souhaitent
              compléter leurs tenues de spectacle.
            </p>
          </div>
        </section>

        <aside className="rounded-lg bg-brand p-6 text-white">
          <h2 className="text-2xl font-black">Renseignements</h2>
          <p className="mt-4 text-sm leading-6 text-white/85">
            Pour toute demande de prix ou de renseignements, merci de contacter:
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-4 inline-flex rounded bg-white px-4 py-2 text-sm font-bold text-brand hover:bg-brand-soft"
          >
            {SITE.email}
          </a>
        </aside>
      </div>
    </div>
  );
}
