"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 200, suffix: "+", key: "companies" },
  { value: 3, suffix: "", key: "countries" },
  { value: 95, suffix: "%", key: "clients" },
  { value: 10, suffix: "+", key: "experts" },
];

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatItem({
  value,
  suffix,
  label,
  started,
}: {
  value: number;
  suffix: string;
  label: string;
  started: boolean;
}) {
  const count = useCountUp(value, 1500, started);

  return (
    <div className="text-center">
      <p className="text-4xl lg:text-5xl font-bold text-foreground tabular-nums">
        {count}
        <span className="text-gold">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-navy-400">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const t = useTranslations("home.stats");
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 bg-navy-800/50 border-y border-navy-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <StatItem
              key={stat.key}
              value={stat.value}
              suffix={stat.suffix}
              label={t(stat.key as "companies" | "countries" | "clients" | "experts")}
              started={started}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
