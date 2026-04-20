interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</p>
      <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
      <p className="max-w-3xl text-sm leading-7 text-slate-300 md:text-base">{description}</p>
    </div>
  );
}
