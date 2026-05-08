type Props = {
  num: string;
  name: string;
  sub: string;
  stats?: string[];
};

export function SectionHeader({ num, name, sub, stats }: Props) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "baseline",
      marginBottom: "8vh",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10, color: "var(--fg-faint)",
      letterSpacing: "0.18em", textTransform: "uppercase",
    }}>
      <div>
        <span style={{ color: "var(--accent)" }}>{num} /</span>{" "}
        <span>{name} · <b style={{ color: "var(--fg-dim)", fontWeight: 400 }}>{sub}</b></span>
      </div>
      {stats && (
        <div style={{ display: "flex", gap: 20 }}>
          {stats.map((s) => <span key={s}>{s}</span>)}
        </div>
      )}
    </div>
  );
}
