interface HeadingProps {
  title: string;
  subtitle?: string;
}

export default function Heading({ title, subtitle }: HeadingProps) {
  return (
    <div className="text-center">
      {subtitle && (
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-stone-500 sm:text-sm">
          {subtitle}
        </p>
      )}

      <h2 className="mt-4 font-serif text-5xl font-medium leading-none tracking-normal text-black sm:text-6xl md:text-7xl">
        {title}
      </h2>
    </div>
  );
}
