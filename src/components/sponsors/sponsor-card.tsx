import Image from "next/image";

export function SponsorCard({ sponsor, dashed = false }: { sponsor: { name: string; note: string; image: string | null }; dashed?: boolean }) {
  return (
    <article className={`rounded-lg bg-white p-5 shadow-soft ${dashed ? "border border-dashed border-stone-300" : "border border-stone-200"}`}>
      <div className="relative grid aspect-[16/9] place-items-center rounded bg-stone-50 p-4">
        {sponsor.image ? (
          <Image src={sponsor.image} alt={`Logo ${sponsor.name}`} fill className="object-contain p-4" sizes="(min-width: 1024px) 320px, 100vw" />
        ) : (
          <span className="text-center text-sm font-bold text-stone-500">Logo à ajouter</span>
        )}
      </div>
      <p className="mt-4 text-lg font-black text-ink">{sponsor.name}</p>
      <p className="mt-2 text-sm leading-6 text-stone-600">{sponsor.note}</p>
    </article>
  );
}
