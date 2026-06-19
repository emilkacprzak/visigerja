import Container from "../ui/Container";
import Button from "../Shared/Button";
import Section from "../Shared/Section";
import { wedding } from "../../data/wedding";

export default function Ceremony() {
  return (
    <Section>
      <Container>
        <div className="flex min-h-svh items-center justify-center py-20 text-center">
          <div className="mx-auto max-w-2xl rounded-3xl border border-stone-200 bg-white/60 px-6 py-12 shadow-sm backdrop-blur-xl sm:px-10 sm:py-16">
            <h2 className="font-serif text-5xl font-medium leading-none tracking-tight text-black sm:text-6xl">
              Ceremony
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base font-light leading-7 text-stone-600 sm:text-lg">
              The ceremony will take place at Copenhagen City Hall.
            </p>

            <div className="mx-auto mt-10 max-w-xs">
              <Button
                variant="primary"
                href={wedding.ceremony.mapsUrl || undefined}
                disabled={!wedding.ceremony.mapsUrl}
              >
                Open in Apple Maps
              </Button>
            </div>

            <p className="mx-auto mt-6 max-w-md text-sm font-light leading-6 text-stone-500">
              Address and additional details will be updated soon.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
