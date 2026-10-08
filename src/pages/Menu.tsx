import { ArrowLeft, Utensils } from "lucide-react";
import Section from "../components/Shared/Section";
import PronunciationButton from "../components/PronunciationButton";

const sections = [
  {
    title: "Open-Faced Sandwiches · Herring",
    dishes: [
      "Marinated herring, onion, capers & egg",
      "Spiced herring, sour cream & capers",
      "Curry herring & fried egg",
      "Salt-fried herring, onions & beetroot",
      "Three-herring sandwich platter",
    ],
  },
  {
    title: "Open-Faced Sandwiches · Fish & Seafood",
    dishes: [
      "Fried plaice & remoulade",
      "Fried plaice, shrimp & dill mayonnaise",
      "Steamed and fried plaice, shrimp & caviar",
      "Smoked salmon & scrambled eggs",
      "Eggs, shrimp & dill mayonnaise",
      "Shrimp, lemon & tomato mayonnaise",
    ],
  },
  {
    title: "Open-Faced Sandwiches · Vegetables & Poultry",
    dishes: [
      "Creamy seasonal mushroom toast",
      "Potatoes, mayonnaise, crispy onions & bacon",
      "Smoked potatoes, chicken salad & bacon",
      "Chicken salad, asparagus & bacon",
    ],
  },
  {
    title: "Open-Faced Sandwiches · Beef & Pork",
    dishes: [
      "Classic beef tartare & egg yolk",
      "Beef tartare, béarnaise & onion rings",
      "Minced beef toast & egg yolk",
      "Roast beef, remoulade & horseradish",
      "Roast beef, béarnaise & onion rings",
      "Veal liver, bacon & mushrooms",
      "Roast pork, red cabbage & gherkins",
      "Warm liver pâté, bacon & mushrooms",
    ],
  },
  {
    title: "Warm Lunch Dishes",
    dishes: [
      "Chicken & asparagus puff pastry",
      "Creamy mushroom puff pastry",
      "Pork hash with fried eggs & beetroot",
      "Wiener schnitzel with sautéed potatoes, peas & gravy",
      "Children’s fish fillet with fries & remoulade",
    ],
  },
  {
    title: "Copenhagen Sharing Platter",
    note: "To be ordered by everyone at the table",
    dishes: [
      "Marinated herring with onion & capers",
      "Plaice with remoulade",
      "Smoked salmon with scrambled eggs",
      "Eggs with shrimp & dill mayonnaise",
      "Roast pork with red cabbage",
      "Liver pâté with bacon, mushrooms & pickled beetroot",
      "Chicken salad with asparagus & bacon",
      "Two kinds of cheese",
      "Bread & butter",
    ],
  },
  {
    title: "Cheese",
    dishes: [
      "Three Danish cheeses",
      "Fried Camembert with blackcurrant jam",
      "Mature cheese on rye bread",
      "Blue Cornflower cheese with egg yolk on rye",
    ],
  },
  {
    title: "Desserts",
    dishes: [
      "Apple trifle",
      "Chocolate fondant with vanilla ice cream",
      "Pancake with ice cream & chocolate sauce",
      "Ice cream with chocolate sauce",
      "Danish almond ring cake",
    ],
  },
];

export default function Menu() {
  return (
    <Section id="restaurant-menu">
      <div className="mx-auto max-w-3xl py-8 sm:py-12">
        <a href="#celebration" className="inline-flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-black">
          <ArrowLeft size={18} aria-hidden="true" /> Back to our Wedding Day
        </a>
        <header className="pb-10 pt-12 text-center">
          <Utensils className="mx-auto text-[#b08d57]" size={28} strokeWidth={1.4} aria-hidden="true" />
          <div className="mt-5 flex items-center justify-center gap-2">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#987445]">Københavner Caféen</p>
            <PronunciationButton />
          </div>
          <h1 className="mt-4 font-serif text-6xl font-medium text-black sm:text-7xl">The Menu</h1>
          <p className="mt-4 text-sm text-stone-500">Our Wedding Day Lunch</p>
        </header>
        <div className="rounded-[2rem] border border-[#b08d57]/30 bg-white/75 px-6 py-10 shadow-[0_18px_50px_rgba(41,37,36,0.04)] sm:px-12">
          {sections.map((section, index) => (
            <section key={section.title} className={index ? "mt-9 border-t border-[#b08d57]/20 pt-9" : ""}>
              <h2 className="text-center font-serif text-3xl font-medium text-[#987445]">{section.title}</h2>
              {"note" in section && <p className="mt-3 text-center text-xs text-stone-500">{section.note}</p>}
              <ul className="mt-5 space-y-4 text-center text-base font-light leading-relaxed text-stone-700">
                {section.dishes.map((dish) => <li key={dish}>{dish}</li>)}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-8 text-center text-sm font-light text-stone-500">Made with love · Emil & Karol</p>
      </div>
    </Section>
  );
}
