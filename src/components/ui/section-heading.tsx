export function SectionHeading({
    eyebrow,
    title,
    children,
}: {
    eyebrow?: string;
    title: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="max-w-4xl">
            {eyebrow ? (
                <p className="text-sm font-black uppercase tracking-wide text-brand">
                    {eyebrow}
                </p>
            ) : null}
            <h2 className="mt-2 text-3xl font-black text-ink sm:text-4xl">
                {title}
            </h2>
            {children ? (
                <div className="mt-4 text-base leading-7 text-stone-600">
                    {children}
                </div>
            ) : null}
        </div>
    );
}
