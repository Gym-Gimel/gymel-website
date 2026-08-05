type TextWithEmailLinksProps = {
  children: string;
  className?: string;
};

const emailRegex = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;

export function TextWithEmailLinks({
  children,
  className,
}: TextWithEmailLinksProps) {
  const parts = children.split(emailRegex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isEmail = part.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

        if (!isEmail) {
          return part;
        }

        return (
          <a
            key={`${part}-${index}`}
            href={`mailto:${part}`}
            className="font-medium text-primary underline underline-offset-2 hover:no-underline"
          >
            {part}
          </a>
        );
      })}
    </span>
  );
}
