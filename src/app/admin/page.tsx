"use client";

import { FormEvent, useState } from "react";
import { CalendarDays, LogIn, Package, Plus, Scissors, Trash2 } from "lucide-react";

type Item = Record<string, string | boolean>;

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [data, setData] = useState<{services:Item[];products:Item[];availability:Item[]}>({services:[],products:[],availability:[]});
  const [message, setMessage] = useState("");

  async function load() {
    const r = await fetch("/api/admin", { headers: { "x-admin-password": password } });
    const json = await r.json();
    if (!r.ok) { setMessage(json.message || "Acesso negado."); return; }
    setData(json); setLogged(true); setMessage("");
  }

  async function add(entity: string, event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = { entity, ...Object.fromEntries(new FormData(event.currentTarget).entries()) };
    const r = await fetch("/api/admin", { method:"POST", headers:{"Content-Type":"application/json","x-admin-password":password}, body:JSON.stringify(body) });
    if (r.ok) { event.currentTarget.reset(); await load(); setMessage("Salvo com sucesso."); }
    else setMessage((await r.json()).message || "Não foi possível salvar.");
  }

  async function remove(entity: string, id: string) {
    if (!confirm("Deseja realmente remover este item?")) return;
    const r = await fetch(`/api/admin?entity=${entity}&id=${id}`, { method:"DELETE", headers:{"x-admin-password":password} });
    if (r.ok) await load();
  }

  const input = "border border-garage-line bg-black px-4 py-3 text-white outline-none focus:border-garage-red";
  const button = "inline-flex items-center justify-center gap-2 bg-garage-red px-5 py-3 font-bold uppercase text-white hover:bg-red-700";

  if (!logged) return <main className="grid min-h-screen place-items-center bg-garage-black px-4 text-white"><section className="w-full max-w-md border border-garage-line bg-garage-panel p-7"><p className="text-sm font-bold uppercase text-garage-red">Furious Garage</p><h1 className="mt-2 font-display text-4xl font-bold uppercase">Painel administrativo</h1><p className="mt-4 text-garage-text">Digite a senha configurada na Vercel.</p><input type="password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&load()} placeholder="Senha administrativa" className={`mt-6 w-full ${input}`} /><button onClick={load} className={`mt-4 w-full ${button}`}><LogIn size={18}/> Entrar</button>{message&&<p className="mt-4 text-sm text-red-300">{message}</p>}</section></main>;

  return <main className="min-h-screen bg-garage-black py-12 text-white"><div className="section-shell"><header className="mb-10 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase text-garage-red">Gestão</p><h1 className="font-display text-5xl font-bold uppercase">Furious Garage</h1></div><a href="/" className="border border-garage-line px-5 py-3 font-bold uppercase">Ver site</a></header>{message&&<p className="mb-5 border border-garage-line bg-garage-panel p-3">{message}</p>}
  <div className="grid gap-8 xl:grid-cols-3">
    <section className="border border-garage-line bg-garage-panel p-5"><h2 className="flex items-center gap-2 font-display text-2xl font-bold uppercase"><Scissors className="text-garage-red"/> Serviços</h2><form onSubmit={e=>add("service",e)} className="mt-5 grid gap-3"><input name="name" required placeholder="Nome do serviço" className={input}/><textarea name="description" required placeholder="Descrição" className={input}/><input name="duration" required placeholder="Duração: ex. 1h30" className={input}/><input name="price" required placeholder="Preço: ex. A partir de R$ 80" className={input}/><button className={button}><Plus size={17}/>Adicionar</button></form><div className="mt-6 grid gap-2">{data.services.map(x=><article key={String(x.id)} className="flex justify-between gap-3 border border-garage-line bg-black p-3"><div><strong>{String(x.name)}</strong><p className="text-xs text-garage-text">{String(x.price)}</p></div><button onClick={()=>remove("service",String(x.id))}><Trash2 size={18} className="text-red-500"/></button></article>)}</div></section>
    <section className="border border-garage-line bg-garage-panel p-5"><h2 className="flex items-center gap-2 font-display text-2xl font-bold uppercase"><Package className="text-garage-red"/> Produtos</h2><form onSubmit={e=>add("product",e)} className="mt-5 grid gap-3"><input name="name" required placeholder="Nome do produto" className={input}/><textarea name="description" required placeholder="Descrição" className={input}/><input name="purpose" required placeholder="Finalidade" className={input}/><button className={button}><Plus size={17}/>Adicionar</button></form><div className="mt-6 grid gap-2">{data.products.map(x=><article key={String(x.id)} className="flex justify-between gap-3 border border-garage-line bg-black p-3"><div><strong>{String(x.name)}</strong><p className="text-xs text-garage-text">{String(x.purpose)}</p></div><button onClick={()=>remove("product",String(x.id))}><Trash2 size={18} className="text-red-500"/></button></article>)}</div></section>
    <section className="border border-garage-line bg-garage-panel p-5"><h2 className="flex items-center gap-2 font-display text-2xl font-bold uppercase"><CalendarDays className="text-garage-red"/> Horários do dia</h2><form onSubmit={e=>add("availability",e)} className="mt-5 grid gap-3"><input name="date" type="date" required className={input}/><input name="time" type="time" required className={input}/><button className={button}><Plus size={17}/>Liberar horário</button></form><div className="mt-6 grid gap-2">{data.availability.map(x=><article key={String(x.id)} className="flex justify-between gap-3 border border-garage-line bg-black p-3"><div><strong>{String(x.date).split("-").reverse().join("/")} · {String(x.time)}</strong></div><button onClick={()=>remove("availability",String(x.id))}><Trash2 size={18} className="text-red-500"/></button></article>)}</div></section>
  </div></div></main>;
}
