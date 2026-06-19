import { Camera } from "lucide-react";
import Button from "../Shared/Button";
import Section from "../Shared/Section";

export default function Photos() {
  return (
    <Section>
      <div className="mx-auto flex w-full max-w-[340px] flex-col items-center py-20 text-center">
        <article className="w-full rounded-3xl border border-stone-200 bg-white/70 p-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-700">
            <Camera className="text-stone-700" size={26} strokeWidth={1.75} />
          </div>

          <h2 className="mt-5 font-serif text-5xl font-medium leading-none tracking-tight text-black">
            Photos
          </h2>

          <p className="mt-5 text-base font-light leading-7 text-stone-500">
            After the wedding you'll find our official gallery here. We'd love
            to see your photos too. Please upload them as soon as possible after
            the wedding. Thank you! 🤍
          </p>

          <div className="mt-8 flex w-full flex-col gap-4">
            <Button variant="primary" disabled>
              View gallery
            </Button>
            <Button variant="secondary" disabled>
              Upload photos
            </Button>
          </div>

          <p className="mx-auto mt-6 inline-flex rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-xs font-medium text-stone-500">
            Available after the wedding
          </p>
        </article>
      </div>
    </Section>
  );
}
