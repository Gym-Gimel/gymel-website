const labels: Record<string, string> = {
  open: "Inscriptions ouvertes",
  waitlist: "Liste d'attente",
  closed: "Complet",
  draft: "Brouillon",
  upcoming: "A venir",
  "registration-open": "Inscriptions ouvertes",
  "registration-closed": "Inscriptions fermées",
  finished: "Terminé",
  cancelled: "Annulé",
  scheduled: "Planifié",
  postponed: "Reporté"
};

const tones: Record<string, string> = {
  open: "bg-meadow/10 text-meadow ring-meadow/20",
  "registration-open": "bg-meadow/10 text-meadow ring-meadow/20",
  waitlist: "bg-gold/10 text-stone-800 ring-gold/30",
  upcoming: "bg-brand-soft text-brand ring-brand/20",
  scheduled: "bg-brand-soft text-brand ring-brand/20",
  postponed: "bg-gold/10 text-stone-800 ring-gold/30",
  closed: "bg-stone-200 text-stone-700 ring-stone-300",
  "registration-closed": "bg-stone-200 text-stone-700 ring-stone-300",
  finished: "bg-stone-100 text-stone-600 ring-stone-200",
  cancelled: "bg-red-100 text-red-900 ring-red-200",
  draft: "bg-stone-100 text-stone-600 ring-stone-200"
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded px-2.5 py-1 text-xs font-bold ring-1 ${tones[status] ?? tones.draft}`}>
      {labels[status] ?? status}
    </span>
  );
}
