import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE } from "@/lib/constants/site";
import { getCourses } from "@/lib/data/loaders";

export const metadata: Metadata = {
  title: "Inscriptions",
  description: "Fonctionnement des inscriptions, cotisations, équipement et documents utiles de la Gym de Gimel."
};

export default async function RegistrationPage() {
  const courses = await getCourses();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Inscriptions" title="S'inscrire à la Gym de Gimel">
        Les inscriptions sont centralisées par cours. Les formulaires officiels WordPress doivent encore être migrés ou reliés.
      </SectionHeading>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="grid gap-5">
          {[
            ["Fonctionnement", "Choisissez un cours, vérifiez le statut d'inscription, puis contactez la personne indiquée ou utilisez le formulaire officiel lorsqu'il sera connecté."],
            ["Cotisations", "Les montants sont affichés sur chaque cours. Le paiement peut être effectué avec l'IBAN de la société."],
            ["Equipement", "Le bon de commande du nouvel équipement doit être récupéré depuis le site WordPress avant la mise en ligne finale."],
            ["Démissions", "Une démission doit être transmise par écrit au comité selon les statuts de la société."],
            ["Photographies", "L'autorisation liée aux photographies et à la protection des données doit être reprise dans les documents officiels."],
            ["Fermetures annuelles", "Les fermetures seront ajoutées dans un fichier CSV dédié lorsque les dates officielles seront confirmées."]
          ].map(([title, text]) => (
            <article key={title} className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
              <h2 className="text-xl font-black text-ink">{title}</h2>
              <p className="mt-2 leading-7 text-stone-600">{text}</p>
            </article>
          ))}
        </section>

        <aside className="rounded-lg bg-brand p-6 text-white">
          <h2 className="text-2xl font-black">Infos utiles</h2>
          <dl className="mt-5 grid gap-4 text-sm">
            <div>
              <dt className="font-black">Contact général</dt>
              <dd>
                <a href={`mailto:${SITE.email}`} className="underline">
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-black">Paiement</dt>
              <dd>{SITE.iban}</dd>
            </div>
            <div>
              <dt className="font-black">Cours ouverts</dt>
              <dd>{courses.filter((course) => course.status === "open").length} cours actuellement ouverts dans les données locales.</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
