import { useState } from "react";
import {
LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell, ComposedChart, Area
} from "recharts";

const COLORS = {
red: "#C8102E",
blue: "#003087",
lightBlue: "#4A90D9",
gold: "#B8860B",
gray: "#6B7280",
lightGray: "#F3F4F6",
darkGray: "#1F2937",
green: "#15803D",
orange: "#EA580C",
teal: "#0D9488",
};

const json = {
slug: "novo-nordisk-2025",
name: "Novo Nordisk A/S",
ticker: "NOVO-B.CO / NVO",
isin: "DK0060534915",
date: "2026-03-23",
author: "Carl Fredrik Thor",
scores: {
affarsmodell: 5,
strategiskMoat: 5,
finansiellKvalitet: 4,
vardering: 4,
tillvaxtutsikter: 4,
riskprofil: 2,
esgMakro: 4,
aiObservationer: 3,
},
totaltPoang: 31,
maxPoang: 40,
rating: 0.775,
overview: {
borskurs: "DKK 236 (mars 2026 est.)",
borsvarde: "~DKK 1 050 miljarder",
bransch: "Läkemedel – Diabetes & Fetma (GLP-1)",
geografi: "Global: USA (~55%), Europa/Kanada ~20%, EM/APAC ~25%",
affarside: "Besegra allvarliga kroniska sjukdomar – primärt fetma och diabetes",
affarsmodell: "Patentskyddade läkemedel, återkommande recept, global tillverkning",
ledning: "Maziar Mike Doustdar (ny VD 2025), Lars Rebien Sørensen (styrelseordförande)",
agarstruktur: "Novo Holdings A/S (~28% av B-aktier + alla A-aktier) ägs av Novo Nordisk Foundation – stabil ankare",
},
sammanfattning: {
beslut: "KÖP",
motivering: "Världsledande inom GLP-1, exceptionell moat, kraftigt nedtryckt värdering efter -48% kursnedgång 2025. P/E ~10x för 2026e är historiskt lågt för ett bolag med denna kvalitet. Pipelinerisken är hantherbar.",
malpris: "DKK 340–380 (12 månader)",
},
scenarier: {
bullCase: "CagriSema godkänt 2026, Wegovy-piller tar marknadsandelar, MFN-avtal begränsas – aktie DKK 450+",
baseCase: "Stabil volymtillväxt kompenserar prissänkningar, pipeline levererar – aktie DKK 340–380",
bearCase: "MFN slår hårdare än väntat, pipeline-miss, konkurrensen från Eli Lilly accelererar – aktie DKK 160–200",
},
};

// ── DATA ────────────────────────────────────────────────────────────────────

const omsattningData = [
{ ar: "2021", omsattning: 140.8, typ: "historisk" },
{ ar: "2022", omsattning: 177.0, typ: "historisk" },
{ ar: "2023", omsattning: 232.3, typ: "historisk" },
{ ar: "2024", omsattning: 290.4, typ: "historisk" },
{ ar: "2025", omsattning: 309.1, typ: "historisk" },
{ ar: "2026e", omsattning: 311.3, typ: "estimat" },
{ ar: "2027e", omsattning: 332.2, typ: "estimat" },
];

const epsData = [
{ ar: "2021", eps: 10.40, typ: "historisk" },
{ ar: "2022", eps: 12.26, typ: "historisk" },
{ ar: "2023", eps: 18.67, typ: "historisk" },
{ ar: "2024", eps: 22.67, typ: "historisk" },
{ ar: "2025", eps: 23.05, typ: "historisk" },
{ ar: "2026e", eps: 22.6, typ: "estimat" },
{ ar: "2027e", eps: 23.8, typ: "estimat" },
];

const marginalData = [
{ ar: "2021", brutto: 83.2, ebit: 41.7, netto: 33.9 },
{ ar: "2022", brutto: 83.9, ebit: 42.3, netto: 31.4 },
{ ar: "2023", brutto: 84.6, ebit: 44.2, netto: 36.0 },
{ ar: "2024", brutto: 84.7, ebit: 44.2, netto: 34.8 },
{ ar: "2025", brutto: 81.0, ebit: 41.3, netto: 33.1 },
];

const peData = [
{ ar: "2022", pe: null, typ: "historisk" },
{ ar: "2023", pe: null, typ: "historisk" },
{ ar: "2024", pe: 27.52, typ: "historisk" },
{ ar: "2025", pe: 14.10, typ: "historisk" },
{ ar: "Nu", pe: 10.24, typ: "nu" },
{ ar: "2026e", pe: 10.47, typ: "estimat" },
{ ar: "2027e", pe: 9.9, typ: "estimat" },
];

const utdelningData = [
{ ar: "2021", utd: 5.20, direktavk: null },
{ ar: "2022", utd: 6.20, direktavk: null },
{ ar: "2023", utd: 9.40, direktavk: null },
{ ar: "2024", utd: 11.40, direktavk: 1.83 },
{ ar: "2025", utd: 11.70, direktavk: 3.60 },
{ ar: "2026e", utd: 11.4, direktavk: 4.83 },
{ ar: "2027e", utd: 12.1, direktavk: 5.13 },
];

// ── CUSTOM TOOLTIP ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label, unit = "" }) => {
if (!active || !payload?.length) return null;
return (
<div style={{
background: "rgba(15,23,42,0.95)", border: "1px solid #334155",
borderRadius: 8, padding: "10px 14px", color: "#e2e8f0", fontSize: 13
}}>
<p style={{ fontWeight: 700, marginBottom: 4, color: "#94a3b8" }}>{label}</p>
{payload.map((p, i) => (
<p key={i} style={{ color: p.color, margin: "2px 0" }}>
{p.name}: <strong>{typeof p.value === "number" ? p.value.toFixed(1) : p.value}{unit}</strong>
</p>
))}
</div>
);
};

// ── SCORE BADGE ──────────────────────────────────────────────────────────────

const ScoreBadge = ({ score, max = 5, inverted = false }) => {
const pct = score / max;
const color = inverted
? pct >= 0.6 ? COLORS.green : pct >= 0.4 ? COLORS.gold : COLORS.red
: pct >= 0.8 ? COLORS.green : pct >= 0.6 ? COLORS.teal : pct >= 0.4 ? COLORS.gold : COLORS.red;
return (
<span style={{
display: "inline-flex", alignItems: "center", gap: 4,
background: color + "22", border: `1px solid ${color}55`,
borderRadius: 6, padding: "2px 10px", color, fontWeight: 700, fontSize: 15
}}>
{score}<span style={{ color: "#64748b", fontWeight: 400, fontSize: 12 }}>/{max}</span>
</span>
);
};

// ── SECTION HEADER ───────────────────────────────────────────────────────────

const SectionHeader = ({ roman, title, score, inverted }) => (

  <div style={{
    display: "flex", alignItems: "center", gap: 14,
    borderBottom: `2px solid ${COLORS.red}33`, paddingBottom: 10, marginBottom: 20
  }}>
    <span style={{
      background: COLORS.red, color: "#fff", borderRadius: 8,
      padding: "4px 12px", fontWeight: 800, fontSize: 13, letterSpacing: 1, fontFamily: "Georgia, serif"
    }}>{roman}</span>
    <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#e2e8f0", flex: 1 }}>{title}</h2>
    {score !== undefined && <ScoreBadge score={score} inverted={inverted} />}
  </div>
);

// ── SWOT TABLE ───────────────────────────────────────────────────────────────

const swot = {
styrkor: [
"Global marknadsledare inom GLP-1 (59,6% branded volymandel fetma)",
"Semaglutide – världens mest sålda läkemedelsmolekyl",
"Unik ägarstruktur via Novo Nordisk Foundation – långsiktigt tänkande",
"Exceptionell lönsamhet: ROE ~61%, ROIC ~38%",
"Starka kassaflöden (~DKK 119 Mdr operativt 2025)",
],
svagheter: [
"Hög koncentrationsrisk – semaglutide utgör merparten av omsättningen",
"Fallande bruttomarginal 2025 (84,7% → 81,0%) p.g.a. Catalent-förvärv",
"Nytt ledarskap (Doustdar) med begränsat track record som VD",
"Negativt rörelsekapital och stigande skuldsättning efter Catalent-affären",
],
mojligheter: [
"CagriSema (22,7% viktnedgång) – potentiellt blockbuster i FDA-ansökan",
"Wegovy-piller – öppnar för >100 Mn patienter som ej vill injicera",
"WHO-stöd för GLP-1 bredare global tillgång",
"Zenagamtide (amycretin) i fas 3 – nästa generations GLP-1/amylin",
"Fetma-marknaden ~1 miljard potentiella patienter globalt",
],
hot: [
"MFN-avtal (Most Favoured Nations) pressar US-priser",
"Exclusivitetsförlust semaglutide i vissa marknader (Ozempic 2026 EU)",
"Eli Lilly/tirzepatide (Mounjaro/Zepbound) intensifierar konkurrensen",
"Medicaid-nedskärningar minskar täckning för fetmaläkemedel",
"Politisk/regulatorisk prispress (IRA/Inflation Reduction Act)",
],
};

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function NovoNordiskAnalys() {
const [tab, setTab] = useState("oversikt");

const tabs = [
{ id: "oversikt", label: "Översikt" },
{ id: "finansiell", label: "Finansiell" },
{ id: "vardering", label: "Värdering" },
{ id: "strategi", label: "Strategi & Risk" },
{ id: "scenarier", label: "Scenarier" },
];

return (
<div style={{
fontFamily: "‘Segoe UI’, system-ui, sans-serif",
background: "#0a0f1e",
minHeight: "100vh",
color: "#e2e8f0",
padding: "0 0 60px 0",
}}>
{/* ── HERO HEADER ── */}
<div style={{
background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 40%, #1a0a10 100%)",
borderBottom: "1px solid #1e293b",
padding: "32px 32px 24px",
position: "relative",
overflow: "hidden",
}}>
{/* decorative circles */}
<div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200,
borderRadius: "50%", background: COLORS.red + "15", pointerEvents: "none" }} />
<div style={{ position: "absolute", bottom: -20, right: 80, width: 100, height: 100,
borderRadius: "50%", background: COLORS.blue + "20", pointerEvents: "none" }} />


    <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
      <div style={{
        background: COLORS.red, color: "#fff", borderRadius: 12,
        width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, fontWeight: 900, flexShrink: 0, letterSpacing: -1
      }}>NN</div>

      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#f8fafc", letterSpacing: -0.5 }}>
            Novo Nordisk A/S
          </h1>
          <span style={{ background: "#1e293b", border: "1px solid #334155",
            borderRadius: 6, padding: "3px 10px", fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>
            NOVO-B.CO · NVO
          </span>
          <span style={{ background: COLORS.green + "22", border: `1px solid ${COLORS.green}44`,
            borderRadius: 6, padding: "3px 10px", fontSize: 12, color: COLORS.green, fontWeight: 700 }}>
            ✓ KÖP
          </span>
        </div>
        <p style={{ margin: "6px 0 0", color: "#94a3b8", fontSize: 14 }}>
          Läkemedel · Diabetes & Fetma (GLP-1) · Köpenhamn & NYSE
        </p>
        <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 12 }}>
          Analysdatum: 23 mars 2026 · Av: Carl Fredrik Thor · ISIN: DK0060534915
        </p>
      </div>

      {/* Total score */}
      <div style={{ textAlign: "center", flexShrink: 0 }}>
        <div style={{
          background: "linear-gradient(135deg, #1e293b, #0f172a)",
          border: "2px solid #334155", borderRadius: 14,
          padding: "12px 20px", minWidth: 110
        }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: COLORS.gold, lineHeight: 1 }}>
            31
          </div>
          <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, marginTop: 2 }}>/ 40 POÄNG</div>
          <div style={{ fontSize: 13, color: COLORS.gold, fontWeight: 700, marginTop: 4 }}>
            ★★★★ 77,5%
          </div>
        </div>
      </div>
    </div>

    {/* Score pills row */}
    <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
      {[
        { label: "Affärsmodell", val: 5 },
        { label: "Moat", val: 5 },
        { label: "Finansiell", val: 4 },
        { label: "Värdering", val: 4 },
        { label: "Tillväxt", val: 4 },
        { label: "Risk ⚠", val: 2 },
        { label: "ESG", val: 4 },
        { label: "AI-obs.", val: 3 },
      ].map(({ label, val }) => (
        <div key={label} style={{
          background: "#1e293b", border: "1px solid #334155",
          borderRadius: 8, padding: "5px 12px",
          display: "flex", alignItems: "center", gap: 6, fontSize: 12
        }}>
          <span style={{ color: "#94a3b8" }}>{label}</span>
          <span style={{
            fontWeight: 800,
            color: val >= 4 ? COLORS.green : val === 3 ? COLORS.gold : COLORS.red
          }}>{val}/5</span>
        </div>
      ))}
    </div>
  </div>

  {/* ── TABS ── */}
  <div style={{
    display: "flex", borderBottom: "1px solid #1e293b",
    background: "#0f172a", padding: "0 32px", overflowX: "auto"
  }}>
    {tabs.map(t => (
      <button key={t.id} onClick={() => setTab(t.id)} style={{
        background: "none", border: "none", cursor: "pointer",
        padding: "14px 18px", fontSize: 14, fontWeight: 600,
        color: tab === t.id ? COLORS.red : "#64748b",
        borderBottom: `2px solid ${tab === t.id ? COLORS.red : "transparent"}`,
        transition: "all 0.2s", whiteSpace: "nowrap"
      }}>{t.label}</button>
    ))}
  </div>

  {/* ── CONTENT ── */}
  <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>

    {/* ═══════════════════ ÖVERSIKT ═══════════════════ */}
    {tab === "oversikt" && (
      <div>
        {/* JSON preview */}
        <details style={{
          background: "#0f172a", border: "1px solid #1e293b",
          borderRadius: 10, marginBottom: 24, padding: "12px 16px"
        }}>
          <summary style={{ cursor: "pointer", color: "#64748b", fontSize: 13, fontWeight: 600 }}>
            📋 JSON-sammanfattning (för börsanalys.se)
          </summary>
          <pre style={{
            fontSize: 11, color: "#94a3b8", overflow: "auto",
            marginTop: 12, maxHeight: 300, lineHeight: 1.6
          }}>{JSON.stringify(json, null, 2)}</pre>
        </details>

        {/* I. Företagsöversikt */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <SectionHeader roman="I" title="Företagsöversikt" score={5} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <h3 style={{ color: COLORS.red, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px" }}>Bakgrund</h3>
              <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                Novo Nordisk grundades 1923 i Danmark och är idag världens ledande läkemedelsbolag inom diabetes och fetma.
                Bolaget har en unik struktur där moderbolaget <strong style={{ color: "#e2e8f0" }}>Novo Holdings A/S</strong> – helägt
                av den icke-vinstdrivande <strong style={{ color: "#e2e8f0" }}>Novo Nordisk Foundation</strong> – kontrollerar
                röstmajoriteten. Detta ger ett ovanligt långsiktigt perspektiv som är sällan i börsvärlden.
              </p>
              <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7, marginTop: 12 }}>
                Bolaget är noterat på Nasdaq Köpenhamn (NOVO-B) och NYSE (NVO) och har 68 794 anställda (2025).
                Aktiekursen föll med <strong style={{ color: COLORS.red }}>-48%</strong> under 2025, från DKK 624 till DKK 325,
                vilket öppnat ett historiskt köptillfälle.
              </p>
            </div>
            <div>
              <h3 style={{ color: COLORS.red, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px" }}>Affärsmodell</h3>
              <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                Novo Nordisk tjänar pengar på <strong style={{ color: "#e2e8f0" }}>patentskyddade receptbelagda läkemedel</strong>.
                När en läkare skriver ut ett recept på Ozempic® eller Wegovy® säljs dessa med extremt höga marginaler
                (bruttomarginal ~81%). Patienter behöver ta medicinen kontinuerligt, vilket skapar
                <strong style={{ color: "#e2e8f0" }}> återkommande intäkter</strong> – ungefär som en prenumeration.
              </p>
              <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7, marginTop: 12 }}>
                GLP-1-klassen (semaglutide-baserade produkter) dominerar portföljen.
                Ozempic® (diabetes), Wegovy® (fetma) och Rybelsus® (oral diabetes) utgör merparten av
                DKK 309 miljarder i omsättning 2025.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
            <div>
              <h3 style={{ color: COLORS.red, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px" }}>Ledning</h3>
              <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: "#e2e8f0" }}>Maziar Mike Doustdar</strong> tillträdde som VD 2025, med bakgrund som
                EVP International Operations. Ny i rollen men med gedigen intern erfarenhet. Styrelseordförande
                <strong style={{ color: "#e2e8f0" }}> Lars Rebien Sørensen</strong> är en av Europas mest erfarna
                läkemedelsledare (fd VD i 16 år).
              </p>
            </div>
            <div>
              <h3 style={{ color: COLORS.red, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px" }}>Ägarstruktur</h3>
              <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: "#e2e8f0" }}>Novo Holdings A/S</strong> äger alla A-aktier (100 röster/aktie)
                och ~28% av B-aktierna = röstmajoritet. A-aktierna kan ej avyttras enligt stiftelsens stadgar.
                Free float av B-aktier är ~94%. Stabilt ägarstöd eliminerar risken för fientliga uppköp.
              </p>
            </div>
          </div>
        </div>

        {/* Key numbers strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Börskurs", value: "~DKK 236", sub: "Mars 2026 est." },
            { label: "Börsvärde", value: "~DKK 1 050 Mdr", sub: "-62% från topp" },
            { label: "P/E 2026e", value: "~10,4x", sub: "Hist. lågt" },
            { label: "Direktavk.", value: "~4,8%", sub: "2026 estimat" },
          ].map(({ label, value, sub }) => (
            <div key={label} style={{
              background: "#0f172a", border: "1px solid #1e293b",
              borderRadius: 10, padding: "16px 18px"
            }}>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9" }}>{value}</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Analyst note */}
        <div style={{
          background: "linear-gradient(135deg, #1a2744, #0f172a)",
          border: "1px solid #3b82f666", borderRadius: 12, padding: 20
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.lightBlue, marginBottom: 8 }}>
            🔍 Analytikerns sammanfattande bedömning
          </div>
          <p style={{ margin: 0, color: "#cbd5e1", fontSize: 14, lineHeight: 1.8 }}>
            Novo Nordisk är ett av de högst kvalitativa bolagen på den globala börsen. Nedgången under 2025 drevs
            av tre faktorer: <strong style={{ color: "#e2e8f0" }}>MFN-avtalets prispress i USA, ökad konkurrens från
            Eli Lillys tirzepatide och en besvikande CagriSema-fas 3-data</strong> (22,7% viktnedgång – fortfarande
            kliniskt imponerande men lägre än marknadens orealistiska förväntningar). Det är viktigt att skilja
            <em> tillfällig motvind</em> från <em>strukturell försämring</em>. Bolaget säljer fortfarande
            DKK 309 miljarder och tjänar DKK 102 miljarder i nettovinst. P/E ~10x är en sällan skådad
            värdering för ett bolag med denna uthållighet och pipeline.
          </p>
        </div>
      </div>
    )}

    {/* ═══════════════════ FINANSIELL ═══════════════════ */}
    {tab === "finansiell" && (
      <div>
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <SectionHeader roman="III" title="Finansiell Analys" score={4} />

          {/* Omsättning Chart */}
          <h3 style={{ color: "#94a3b8", fontSize: 14, fontWeight: 600, margin: "0 0 12px" }}>
            Omsättning (MDKK) – historisk & estimat
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={omsattningData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ar" tick={{ fill: "#64748b", fontSize: 12 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} domain={[0, 400]} />
              <Tooltip content={<CustomTooltip unit=" MDKK" />} />
              <Bar dataKey="omsattning" name="Omsättning" radius={[4, 4, 0, 0]}>
                {omsattningData.map((entry, index) => (
                  <Cell key={index}
                    fill={entry.typ === "estimat" ? COLORS.lightBlue + "88" : COLORS.red}
                    stroke={entry.typ === "estimat" ? COLORS.lightBlue : COLORS.red}
                    strokeWidth={entry.typ === "estimat" ? 1.5 : 0}
                    strokeDasharray={entry.typ === "estimat" ? "4 2" : "0"}
                  />
                ))}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
          <p style={{ fontSize: 11, color: "#475569", margin: "6px 0 20px", fontStyle: "italic" }}>
            🔵 Streckad = estimat (medel Börsdata/S&P) · 🔴 Fylld = historisk
          </p>

          {/* EPS Chart */}
          <h3 style={{ color: "#94a3b8", fontSize: 14, fontWeight: 600, margin: "0 0 12px" }}>
            Vinst per aktie (EPS, DKK) – historisk & estimat
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={epsData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ar" tick={{ fill: "#64748b", fontSize: 12 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} domain={[0, 30]} />
              <Tooltip content={<CustomTooltip unit=" DKK" />} />
              <ReferenceLine x="2025" stroke="#334155" strokeDasharray="4 2" />
              <Line type="monotone" dataKey="eps" name="EPS"
                stroke={COLORS.gold} strokeWidth={2.5} dot={(props) => {
                  const { cx, cy, payload } = props;
                  return <circle key={cx} cx={cx} cy={cy} r={4}
                    fill={payload.typ === "estimat" ? "transparent" : COLORS.gold}
                    stroke={COLORS.gold} strokeWidth={2}
                    strokeDasharray={payload.typ === "estimat" ? "3 2" : "0"} />;
                }} />
            </LineChart>
          </ResponsiveContainer>

          {/* Marginaler Chart */}
          <h3 style={{ color: "#94a3b8", fontSize: 14, fontWeight: 600, margin: "20px 0 12px" }}>
            Marginaler (%) – Brutto, EBIT & Netto
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={marginalData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ar" tick={{ fill: "#64748b", fontSize: 12 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} domain={[25, 90]} />
              <Tooltip content={<CustomTooltip unit="%" />} />
              <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
              <Line type="monotone" dataKey="brutto" name="Bruttomarginal" stroke={COLORS.teal} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="ebit" name="EBIT-marginal" stroke={COLORS.red} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="netto" name="Nettomarginal" stroke={COLORS.gold} strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Nyckeltal tabell */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h3 style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Nyckeltalstabellen</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${COLORS.red}44` }}>
                  {["Nyckeltal", "2021", "2022", "2023", "2024", "2025", "2026e", "2027e"].map(h => (
                    <th key={h} style={{ padding: "8px 12px", textAlign: h === "Nyckeltal" ? "left" : "right",
                      color: "#64748b", fontWeight: 600, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Omsättning (MDKK)", vals: ["140 800", "177 000", "232 300", "290 400", "309 064", "311 300e", "332 200e"] },
                  { label: "EBIT (MDKK)", vals: ["58 644", "74 809", "102 574", "128 339", "127 658", "128 291e", "139 663e"] },
                  { label: "EPS (DKK)", vals: ["10,40", "12,26", "18,67", "22,67", "23,05", "22,6e", "23,8e"] },
                  { label: "EBIT-marginal", vals: ["41,7%", "42,3%", "44,2%", "44,2%", "41,3%", "41,2%e", "42,1%e"] },
                  { label: "ROE", vals: ["–", "–", "–", "80,8%", "60,7%", "–", "–"] },
                  { label: "Utdelning (DKK)", vals: ["5,20", "6,20", "9,40", "11,40", "11,70", "11,4e", "12,1e"] },
                  { label: "Direktavk.", vals: ["–", "–", "–", "1,8%", "3,6%", "~4,8%e", "~5,1%e"] },
                ].map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? "#0a0f1e" : "transparent",
                    borderBottom: "1px solid #1e293b11" }}>
                    <td style={{ padding: "9px 12px", color: "#cbd5e1", fontWeight: 500 }}>{row.label}</td>
                    {row.vals.map((v, j) => (
                      <td key={j} style={{
                        padding: "9px 12px", textAlign: "right",
                        color: v.includes("e") ? COLORS.lightBlue : "#94a3b8",
                        fontWeight: v.includes("e") ? 600 : 400
                      }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 11, color: "#475569", margin: "10px 0 0", fontStyle: "italic" }}>
            e = estimat (medel Börsdata + S&P-konsensus) · Alla belopp MDKK om ej annat anges
          </p>
        </div>

        {/* Kassaflöde */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>
            Kassaflöde & kapitalallokering
          </h3>
          <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7, margin: "0 0 12px" }}>
            Det operativa kassaflödet uppgick till <strong style={{ color: "#f1f5f9" }}>DKK 115 365 Mn</strong> (2025) –
            ett starkt resultat trots att bolaget mitt i en global omstrukturering. Fritt kassaflöde förbättrades
            dramatiskt till DKK 28,3 Mdr jämfört med negativt DKK 14,7 Mdr 2024 (Catalent-förvärvet DKK 82 Mdr belastade 2024).
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { label: "Op. kassaflöde 2025", val: "DKK 115 Mdr", color: COLORS.green },
              { label: "Capex 2025", val: "DKK 90 Mdr", color: COLORS.orange, note: "(Catalent+expansion)" },
              { label: "Fritt kassaflöde 2025", val: "DKK 28 Mdr", color: COLORS.teal, note: "(vs. -15 Mdr 2024)" },
            ].map(({ label, val, color, note }) => (
              <div key={label} style={{
                background: color + "15", border: `1px solid ${color}33`,
                borderRadius: 10, padding: "14px 16px"
              }}>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color }}>{val}</div>
                {note && <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>{note}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* ═══════════════════ VÄRDERING ═══════════════════ */}
    {tab === "vardering" && (
      <div>
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <SectionHeader roman="IV" title="Värdering & Jämförelse" score={4} />

          {/* P/E Chart */}
          <h3 style={{ color: "#94a3b8", fontSize: 14, fontWeight: 600, margin: "0 0 12px" }}>
            P/E-talsutveckling – historisk & estimat
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={peData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ar" tick={{ fill: "#64748b", fontSize: 12 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} domain={[0, 35]} />
              <Tooltip content={<CustomTooltip unit="x" />} />
              <ReferenceLine y={20} stroke="#334155" strokeDasharray="4 2"
                label={{ value: "Sektor snitt ~20x", fill: "#475569", fontSize: 11 }} />
              <ReferenceLine y={10.24} stroke={COLORS.green + "88"} strokeDasharray="4 2"
                label={{ value: "Nu 10,2x", fill: COLORS.green, fontSize: 11 }} />
              <Bar dataKey="pe" name="P/E" radius={[4, 4, 0, 0]}>
                {peData.map((entry, index) => (
                  <Cell key={index}
                    fill={entry.typ === "nu" ? COLORS.green :
                      entry.typ === "estimat" ? COLORS.lightBlue + "88" : COLORS.red}
                  />
                ))}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
          <p style={{ fontSize: 11, color: "#475569", margin: "6px 0 0", fontStyle: "italic" }}>
            Sektorssnitt pharma: ~20–25x P/E. Novo handlas idag med kraftig rabatt.
          </p>
        </div>

        {/* Utdelning Chart */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <SectionHeader roman="IV" title="Utdelningsutveckling" />
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={utdelningData} margin={{ top: 5, right: 40, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ar" tick={{ fill: "#64748b", fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "#64748b", fontSize: 11 }} domain={[0, 7]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
              <Bar yAxisId="left" dataKey="utd" name="Utd/aktie (DKK)" fill={COLORS.blue} radius={[3, 3, 0, 0]}>
                {utdelningData.map((e, i) => (
                  <Cell key={i} fill={e.ar.includes("e") ? COLORS.lightBlue + "88" : COLORS.blue} />
                ))}
              </Bar>
              <Line yAxisId="right" type="monotone" dataKey="direktavk" name="Direktavk. (%)"
                stroke={COLORS.gold} strokeWidth={2} dot={{ r: 3 }} connectNulls />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Multiples table */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>
            Värderingsmultiplar – Nuläge vs. historik vs. sektor
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${COLORS.red}44` }}>
                  {["Multipel", "2024", "2025", "Nuläge", "2026e", "Sektor snitt", "Kommentar"].map(h => (
                    <th key={h} style={{ padding: "8px 12px", textAlign: h === "Multipel" || h === "Kommentar" ? "left" : "right",
                      color: "#64748b", fontWeight: 600, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { m: "P/E (Pris/Vinst)", v24: "27,5x", v25: "14,1x", nu: "10,2x", e: "10,4x", sektor: "~22x", c: "Historiskt lågt" },
                  { m: "EV/EBIT", v24: "20,5x", v25: "11,5x", nu: "12,1x", e: "~9x", sektor: "~18x", c: "Underprisad" },
                  { m: "P/S (Pris/Omsätt.)", v24: "9,6x", v25: "4,7x", nu: "3,4x", e: "~3,4x", sektor: "~5x", c: "Rabatt mot sektor" },
                  { m: "PEG (P/E/Tillväxt)", v24: "–", v25: "–", nu: "~1,1x", e: "1,1x", sektor: "~1,5–2x", c: "Attraktiv" },
                  { m: "Direktavk.", v24: "1,8%", v25: "3,6%", nu: "~5,0%", e: "~4,8%", sektor: "~2,5%", c: "Dubbelt sektorn" },
                ].map((row, i) => (
                  <tr key={row.m} style={{ background: i % 2 === 0 ? "#0a0f1e" : "transparent",
                    borderBottom: "1px solid #1e293b22" }}>
                    <td style={{ padding: "9px 12px", color: "#cbd5e1", fontWeight: 500 }}>{row.m}</td>
                    <td style={{ padding: "9px 12px", textAlign: "right", color: "#64748b" }}>{row.v24}</td>
                    <td style={{ padding: "9px 12px", textAlign: "right", color: "#94a3b8" }}>{row.v25}</td>
                    <td style={{ padding: "9px 12px", textAlign: "right", color: COLORS.green, fontWeight: 700 }}>{row.nu}</td>
                    <td style={{ padding: "9px 12px", textAlign: "right", color: COLORS.lightBlue }}>{row.e}</td>
                    <td style={{ padding: "9px 12px", textAlign: "right", color: "#475569" }}>{row.sektor}</td>
                    <td style={{ padding: "9px 12px", color: COLORS.gold, fontSize: 12 }}>{row.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{
            background: COLORS.green + "15", border: `1px solid ${COLORS.green}33`,
            borderRadius: 10, padding: 16, marginTop: 16
          }}>
            <p style={{ margin: 0, color: "#cbd5e1", fontSize: 14, lineHeight: 1.7 }}>
              <strong style={{ color: COLORS.green }}>Värderingskonklusionen:</strong> Novo Nordisk handlas till
              ~50% rabatt mot sin egen historik och ~50% rabatt mot pharma-sektorn på P/E-basis.
              PEG-talet på 1,1x indikerar att marknaden inte prisar in framtida tillväxt alls.
              Med ett <strong>riktkurs på DKK 340–380</strong> (12 månader, base case) är uppsidan ~44–61% från
              nuläget (~DKK 236). Betyg: <strong style={{ color: COLORS.green }}>4/5 – Attraktiv värdering</strong>.
            </p>
          </div>
        </div>
      </div>
    )}

    {/* ═══════════════════ STRATEGI & RISK ═══════════════════ */}
    {tab === "strategi" && (
      <div>
        {/* II. Strategisk analys */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <SectionHeader roman="II" title="Strategisk Analys & Moat" score={5} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            {[
              { title: "💪 Styrkor", items: swot.styrkor, color: COLORS.green },
              { title: "⚠️ Svagheter", items: swot.svagheter, color: COLORS.orange },
              { title: "🚀 Möjligheter", items: swot.mojligheter, color: COLORS.teal },
              { title: "🔥 Hot", items: swot.hot, color: COLORS.red },
            ].map(({ title, items, color }) => (
              <div key={title} style={{
                background: color + "0d", border: `1px solid ${color}22`,
                borderRadius: 10, padding: 16
              }}>
                <h4 style={{ margin: "0 0 10px", color, fontSize: 13, fontWeight: 700 }}>{title}</h4>
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {items.map((item, i) => (
                    <li key={i} style={{ color: "#cbd5e1", fontSize: 13, marginBottom: 6, lineHeight: 1.5 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ background: "#1e293b44", borderRadius: 10, padding: 16 }}>
            <h4 style={{ margin: "0 0 10px", color: COLORS.gold, fontSize: 13 }}>🏰 Competitive Moat – Bedömning</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[
                { m: "Immateriella tillgångar", d: "Patentportfölj 2026–2032. Ozempic/Wegovy/Rybelsus patentskydd i EU/USA.", star: "★★★★★" },
                { m: "Switching costs", d: "Läkare och patienter byter sällan väl fungerande behandling. Lojalitet är extremt hög.", star: "★★★★☆" },
                { m: "Kostnadsfördel", d: "Massiv vertikal integration: Catalent-fabrikerna ger lägre tillverkningskostnad per enhet.", star: "★★★★☆" },
                { m: "Skalfördelar", d: "DKK 309 Mdr omsättning + global distribution ger maktposition gentemot betalare.", star: "★★★★★" },
                { m: "Varumärke", d: "Ozempic® är ett av världens mest kända läkemedel 2024–2025. Pop-kultur-fenomen.", star: "★★★★★" },
                { m: "Nätverkseffekter", d: "Real-world data, läkarrelationer och patientprogram skapar värde som växer med skalan.", star: "★★★☆☆" },
              ].map(({ m, d, star }) => (
                <div key={m} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, padding: 12 }}>
                  <div style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 13 }}>{m}</div>
                  <div style={{ color: COLORS.gold, fontSize: 12, margin: "4px 0" }}>{star}</div>
                  <div style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* V. Tillväxt */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <SectionHeader roman="V" title="Tillväxtmotorer & Triggers" score={4} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "💊", title: "CagriSema – FDA-ansökan inlämnad", body: "22,7% viktnedgång i fas 3. Potentiellt godkänd 2026. En ny blockbuster som kan lägga till DKK 20–40 Mdr i topplinjen." },
              { icon: "🍊", title: "Wegovy-piller (oral semaglutide 25mg)", body: "FDA-godkänd jan 2026. Öppnar för 100+ Mn patienter i USA som föredrar tabletter. 16,6% viktnedgång – jämförbar med injektionen." },
              { icon: "🔬", title: "Zenagamtide (amycretin) – fas 3 2026", body: "GLP-1 + amylin-agonist. Fas 2 visade 14,5% viktnedgång på 36 veckor. Nästa generation efter CagriSema." },
              { icon: "🌍", title: "Internationell expansion", body: "APAC +19% CER, EUCAN +16% CER. Obesity-penetration globalt fortfarande låg. Stor runway i Europa och Asien." },
              { icon: "🏥", title: "MASH (leversjukdom) via Akero", body: "Förvärvet av Akero Therapeutics ger ett fas 3-program i MASH – stor marknad med inget nuvarande standardbehandling." },
              { icon: "🤖", title: "AI & digital acceleration i R&D", body: "Bolaget använder AI för att accelerera pipeline-beslut och integrera tillverkning i tidigt läkemedelsutveckling." },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{
                background: "#0a0f1e", border: "1px solid #1e293b",
                borderRadius: 10, padding: 14
              }}>
                <div style={{ fontSize: 18, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 13, marginBottom: 6 }}>{title}</div>
                <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* VI. Risk */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <SectionHeader roman="VI" title="Riskprofil" score={2} inverted />
          <div style={{
            background: COLORS.red + "15", border: `1px solid ${COLORS.red}33`,
            borderRadius: 10, padding: 14, marginBottom: 16
          }}>
            <strong style={{ color: COLORS.red }}>⚠️ Risknivå: HÖG (score 2/5 inverterat)</strong>
            <p style={{ color: "#cbd5e1", fontSize: 14, margin: "8px 0 0", lineHeight: 1.7 }}>
              Novo Nordisk är ett exceptionellt bolag med en hög inneboende riskprofil just nu.
              Det är viktig att hålla isär <em>bolagskvalitet</em> och <em>investeringsrisk</em>.
            </p>
          </div>
          {[
            { risk: "MFN-prisstyrning USA", nivå: "🔴 HÖG", desc: "Most Favoured Nations-avtalet pressar US-realiserade priser för Wegovy/Ozempic. Kan reducera US-intäkter med 10–20% om fullt genomfört." },
            { risk: "Patent-expiration semaglutide", nivå: "🔴 HÖG", desc: "Ozempic (EU 2026), Rybelsus (EU 2026). Generisk konkurrens i internationella marknader börjar urholka priser. USA-patent håller längre." },
            { risk: "Eli Lilly / Tirzepatide konkurrens", nivå: "🟠 MEDEL", desc: "Mounjaro/Zepbound vinner marknadsandelar. Novo tappade 3,6 pp diabetes-marknadsandel 2025. Risk att tappet fortsätter." },
            { risk: "Pipeline-miss", nivå: "🟠 MEDEL", desc: "CagriSema mötte höga förväntningar. Framtida studier kan visa sämre data. Zenagamtide fas 3 är osäker." },
            { risk: "Valutarisk (USD/DKK)", nivå: "🟡 LÅG/MEDEL", desc: "~55% av omsättningen i USD. Bolaget hedgar aktivt men valutarörelser påverkar rapporterade siffror." },
            { risk: "ESG/Compliance", nivå: "🟡 LÅG", desc: "Illegala compounding products (Ozempic-kopior) skapar safety-risker och regulatoriska utmaningar." },
          ].map(({ risk, nivå, desc }) => (
            <div key={risk} style={{
              display: "flex", gap: 12, padding: "12px 0",
              borderBottom: "1px solid #1e293b"
            }}>
              <div style={{ minWidth: 90 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8" }}>{nivå}</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 13 }}>{risk}</div>
                <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* VII. ESG */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 24 }}>
          <SectionHeader roman="VII" title="ESG & Makro" score={4} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {[
              { icon: "🌱", label: "Miljö (E)", score: "3/5", body: "GHG-utsläpp ökade +19% 2025 till 2 690 kt CO2e – primärt drivet av Catalent-förvärvet. Plast per patient sjunker (-5%). Stora kapitalinvesteringar i fabriker ökar avtryek kortsiktigt." },
              { icon: "👥", label: "Socialt (S)", score: "5/5", body: "45,6 miljoner patienter nåddes. Utökat tillgångsprogram. NovoCare-apoteksnätverk i USA. Diversitets- och inkluderingsarbete. Triple bottom line är inbyggt i kultur." },
              { icon: "🏛️", label: "Styrning (G)", score: "4/5", body: "Stiftelseägande ger exeptionellt långsiktigt perspektiv. Ny styrelse 2025. Robust compliance-kultur. Bolagsstyrning kompliceras av A/B-aktiestruktur men balanseras av stiftelsens mandat." },
            ].map(({ icon, label, score, body }) => (
              <div key={label} style={{ background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 10, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <span style={{ background: COLORS.teal + "22", color: COLORS.teal,
                    borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 700 }}>{score}</span>
                </div>
                <div style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 13, marginBottom: 6 }}>{label}</div>
                <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* ═══════════════════ SCENARIER ═══════════════════ */}
    {tab === "scenarier" && (
      <div>
        {/* VIII. AI-obs */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <SectionHeader roman="VIII" title="AI-observationer" score={3} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { title: "📰 Sentimentanalys", body: "Sentimentet har skiftat från extremt negativt (CagriSema-besvikelse Q4 2024) till försiktigt positivt i Q1 2026 efter Wegovy-piller-godkännandet. Insiderhandel: inga nämvärda insider-köp registrerade – neutralt signal." },
              { title: "📊 Dataavvikelse", body: "Stark divergens: EPS 2025 ökade +1,7% men aktien föll -48%. Förklaras av multi-expansion (P/E gick från ~40x till ~14x). Denna komprimering skapar nu en historisk möjlighet om fundamenta stabiliseras." },
              { title: "⚠️ Varningssignal", body: "Sänkt utdelningstillväxt (21% → 2,6% YoY) och ett stopp i aktieåterköp (DKK 20 Mdr → 1,4 Mdr) indikerar att ledningen prioriterar balansräkningens stabilisering. Inte alarmerande men värt att bevaka." },
              { title: "🔍 Strukturell observation", body: "Omsättningstillväxt förväntas falla 2026 (konsensus -5% till -13% CER). Egna estimat pekar mot att volymer kompenserar prissänkningar och att 2026e ~DKK 311 Mdr är mer realistiskt än bear-case. 2027 recovery ser trovärdig ut." },
            ].map(({ title, body }) => (
              <div key={title} style={{ background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 10, padding: 14 }}>
                <div style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 13, marginBottom: 8 }}>{title}</div>
                <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* IX. Sammanfattning */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <SectionHeader roman="IX" title="Sammanfattning & Investeringsbeslut" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                <strong style={{ color: "#f1f5f9" }}>Är Novo Nordisk ett kvalitetsbolag?</strong> Ja, utan tvekan.
                Bolaget uppfyller alla kriterier för ett world-class pharma: dominans i sin marknad, exceptionell lönsamhet,
                stark kassaflödesgenerering och en djup pipeline.
              </p>
              <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.8, marginTop: 12 }}>
                <strong style={{ color: "#f1f5f9" }}>Är det rimligt värderat?</strong> P/E ~10x är anmärkningsvärt lågt
                för ett bolag med dessa fundamenta. Det reflekterar en pandemi av pessimism kring MFN, patent-loss och
                konkurrens – risker som är reella men inprisade och i delar överdrivna.
              </p>
              <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.8, marginTop: 12 }}>
                <strong style={{ color: "#f1f5f9" }}>Kan man hålla det 5–10 år?</strong> Ja. Fetma-marknaden är strukturell.
                WHO erkänner GLP-1. Pipeline är djup. Stiftelseägaren garanterar stabilitet.
              </p>
            </div>
            <div style={{
              background: "linear-gradient(135deg, #15803d22, #0f172a)",
              border: `2px solid ${COLORS.green}44`,
              borderRadius: 12, padding: 20, textAlign: "center"
            }}>
              <div style={{ fontSize: 42, fontWeight: 900, color: COLORS.green }}>KÖP</div>
              <div style={{ color: "#94a3b8", fontSize: 14, margin: "8px 0" }}>Rekommendation</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", margin: "12px 0 4px" }}>
                DKK 340–380
              </div>
              <div style={{ color: "#64748b", fontSize: 13 }}>Riktkurs (12 mån, base case)</div>
              <div style={{ marginTop: 16, color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>
                ~+44–61% från nuläget (~DKK 236)<br />
                + ~4,8% direktavkastning
              </div>
              <div style={{ marginTop: 16, fontSize: 13 }}>
                <span style={{ color: "#64748b" }}>Poängsumma: </span>
                <strong style={{ color: COLORS.gold }}>31/40 (77,5%)</strong>
              </div>
              <div style={{ color: "#475569", fontSize: 11, marginTop: 8 }}>
                Analysatum: 23 mars 2026
              </div>
            </div>
          </div>
        </div>

        {/* X. Scenarier */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 24 }}>
          <SectionHeader roman="X" title="Scenarier: Bull, Base & Bear Case" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {[
              {
                label: "🐂 Bull Case", color: COLORS.green, prob: "25%",
                pris: "DKK 450+",
                triggers: ["CagriSema godkänd Q3 2026", "MFN-avtalet begränsas av domstol", "Wegovy-piller tar 20%+ marknadsandel", "Zenagamtide fas 3 stark data"],
                finansiell: "Omsättning ~DKK 370+ Mdr 2027, EBIT-marginal återhämtar till 46%+, P/E re-rating till 18–20x",
              },
              {
                label: "⚖️ Base Case", color: COLORS.gold, prob: "50%",
                pris: "DKK 340–380",
                triggers: ["Volymtillväxt kompenserar prissänkningar", "CagriSema godkänd men gradvis uptake", "International Operations driver tillväxt", "Stabil pipeline-progression"],
                finansiell: "Omsättning ~DKK 332 Mdr 2027, EBIT-marginal 42%, P/E 14–16x, EPS DKK 23–24",
              },
              {
                label: "🐻 Bear Case", color: COLORS.red, prob: "25%",
                pris: "DKK 160–200",
                triggers: ["MFN pressar US-intäkter kraftigt", "Tirzepatide tar dominant ställning", "CagriSema FDA-reject", "Patent-generika slår hårdare"],
                finansiell: "Omsättning <DKK 280 Mdr 2027, EBIT-marginal under 38%, P/E kontraherar till 8–9x",
              },
            ].map(({ label, color, prob, pris, triggers, finansiell }) => (
              <div key={label} style={{
                background: color + "10", border: `1px solid ${color}33`,
                borderRadius: 12, padding: 18
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontWeight: 800, color, fontSize: 15 }}>{label}</span>
                  <span style={{ background: color + "22", color, borderRadius: 6,
                    padding: "2px 8px", fontSize: 12, fontWeight: 700 }}>P: {prob}</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 900, color, marginBottom: 8 }}>{pris}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10 }}>Riktkurs (12 mån)</div>
                <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 6 }}>Triggers:</div>
                <ul style={{ margin: "0 0 12px", paddingLeft: 16 }}>
                  {triggers.map((t, i) => (
                    <li key={i} style={{ color: "#cbd5e1", fontSize: 12, marginBottom: 4, lineHeight: 1.5 }}>{t}</li>
                  ))}
                </ul>
                <div style={{ background: "#0a0f1e", borderRadius: 8, padding: 10, fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>
                  {finansiell}
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div style={{
            marginTop: 20, padding: 14,
            background: "#0a0f1e", borderRadius: 8,
            borderLeft: `3px solid #334155`
          }}>
            <p style={{ margin: 0, color: "#475569", fontSize: 12, lineHeight: 1.7 }}>
              <strong style={{ color: "#64748b" }}>Disclaimer:</strong> Denna analys är framtagen av börsanalys.se för informationsändamål
              och utgör inte finansiell rådgivning. Historisk avkastning garanterar inte framtida avkastning.
              Investering i aktier innebär alltid risk. Alla estimat är förknippade med osäkerhet.
              Konsultera alltid en licensierad finansiell rådgivare innan investeringsbeslut.
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
</div>


);
}
