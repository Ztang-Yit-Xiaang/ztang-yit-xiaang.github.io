"use client";

import { t, type Locale } from "@/lib/i18n";


import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const dayFoods = [
  { name: "溫州糯米飯", icon: "🍚" }, { name: "燈盞糕", icon: "🫓" },
  { name: "江蟹生", icon: "🦀" }, { name: "溫州餛飩", icon: "🍜" }, { name: "豬臟粉", icon: "🍜" },
];
const nightFoods = [
  { name: "油蔥鯧魚", icon: "🐟" }, { name: "桂圓荷包蛋湯", icon: "🍳" },
  { name: "溫州魚餅", icon: "🍥" }, { name: "血蛤", icon: "🐚" },
];
const phrases = [
  ["飯吃爻罷未？ (vo chi o baa mei)", "Have you eaten?", "The most classic, warm daily greeting in Wenzhounese. Literally translates to “Have you eaten rice yet?”"],
  ["你眙 (ni tshi)", "You look (你看)", "Wenzhounese uses “眙” for “look/see”. Note that this is literal and does not mean hello."],
  ["甌越 (au-nyu)", "Ou Yue", "The historical name of the Wenzhou region. Note that the Wenzhounese pronunciation of “越” is “nyu”."],
  ["天不怕地不怕，就怕温州人说温州话", "Fear not heaven, fear not earth, only fear Wenzhou people speaking Wenzhounese.", "A familiar saying about how distinctive Wenzhounese sounds to people from elsewhere in China."],
];
type Particle = { id: number; icon: string; name: string; side: "left" | "right"; top: number; x: number; y: number; rotation: number; delay: number };

export function WenzhouneseTrick({locale="en"}:{locale?:Locale}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isDay, setIsDay] = useState(true);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);

  function launch() {
    const hour = new Date().getHours();
    const day = hour >= 6 && hour < 18;
    setIsDay(day);
    if (timeout.current) clearTimeout(timeout.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setParticles([]); return; }
    const pool = day ? dayFoods : nightFoods;
    setParticles(Array.from({ length: 10 }, (_, i) => ({
      ...pool[Math.floor(Math.random() * pool.length)], id: Date.now() + i,
      side: i < 5 ? "left" : "right", top: 15 + Math.random() * 70,
      x: Math.random(), y: Math.random(), rotation: -180 + Math.random() * 360, delay: Math.random() * .4,
    })));
    timeout.current = setTimeout(() => setParticles([]), 2500);
  }

  return <>
    <Dialog onOpenChange={open => { if (!open) { setParticles([]); if (timeout.current) clearTimeout(timeout.current); } }}>
      <DialogTrigger render={<button type="button" className="culture-visit" onClick={launch}>{t(locale,"Explore Wenzhounese")}<small>{t(locale,"Click Trick ✦")}</small></button>} />
      <DialogContent closeLabel={t(locale,"Close")} className="culture-dialog">
        <DialogHeader>
          <p className="kicker">{t(locale,"Wenzhounese dialect tricks / 溫州話小技巧")}</p>
          <DialogTitle>{t(locale,"甌語小詞典 & 趣事")}</DialogTitle>
          <DialogDescription>{t(locale,"Wenzhounese (温州话/瓯语) is a Southern Wu Chinese language variety, famous for its extreme phonetic diversity and cultural heritage.")}</DialogDescription>
        </DialogHeader>
        <div className="culture-dialog-scroll">
          {phrases.map(([phrase, meaning, note]) => <section className="dialect-entry" key={phrase}><h3 lang="zh-Hant">{t(locale,phrase)}</h3><p><strong>{t(locale,"Meaning:")}</strong> {t(locale,meaning)}</p><p>{t(locale,note)}</p></section>)}
          <section className="food-table" aria-labelledby="food-table-title">
            <h3 id="food-table-title">{t(locale,isDay ? "Daytime table" : "Evening table")}</h3>
            <p>{t(locale,"Selected using your local time. A little taste of Wenzhou.")}</p>
            <ul>{(isDay ? dayFoods : nightFoods).map(food => <li key={food.name}><span aria-hidden="true">{food.icon}</span> <span lang="zh-Hant">{food.name}</span></li>)}</ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
    {particles.length > 0 && createPortal(<div className="food-particles" aria-hidden="true">{particles.map(p => <div key={p.id} className={`food-particle food-particle-${p.side}`} style={{
      top: `${p.top}%`, [p.side]: 0, animationDelay: `${p.delay}s`,
      "--random-x": p.x, "--random-y": p.y, "--random-rotate": `${p.rotation}deg`,
    } as CSSProperties}><span>{p.icon}</span><small lang="zh-Hant">{p.name}</small></div>)}</div>, document.body)}
  </>;
}
