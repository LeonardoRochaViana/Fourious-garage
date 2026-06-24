import { Sparkles } from "lucide-react";
import { products } from "@/data/products";

export default function Products() {
  return (
    <section className="border-b border-garage-line bg-black/25 py-20">
      <div className="section-shell">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-bold uppercase text-garage-red">Produtos utilizados</p>
          <h2 className="red-line mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">Química profissional em cada etapa</h2>
          <p className="mt-7 text-garage-text">
            Produtos selecionados para limpar, proteger e valorizar o acabamento sem improviso.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article key={product.name} className="border border-garage-line bg-garage-panel p-5">
              <div className="mb-5 flex h-11 w-11 items-center justify-center bg-red-950/60 text-garage-red">
                <Sparkles size={22} />
              </div>
              <h3 className="font-display text-2xl font-bold uppercase">{product.name}</h3>
              <p className="mt-3 text-sm leading-6 text-garage-text">{product.description}</p>
              <p className="mt-5 border-t border-garage-line pt-4 text-sm font-bold text-white">{product.purpose}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
