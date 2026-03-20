'use client'

import { useEffect } from ‘react’
import Script from ‘next/script’

export default function NvidiaAnalysis() {
useEffect(() => {
// Cleanup any existing charts on remount
const existingCharts = (window as any).Chart?.instances
if (existingCharts) {
Object.values(existingCharts).forEach((c: any) => c.destroy())
}
}, [])

const initCharts = () => {
const Chart = (window as any).Chart
if (!Chart) return

```
const chartDefaults = {
  plugins: {
    legend: {
      labels: { color: '#888', font: { family: 'system-ui', size: 12 } }
    }
  },
  scales: {
    x: {
      ticks: { color: '#666', font: { size: 11 } },
      grid: { color: 'rgba(255,255,255,0.05)' }
    },
    y: {
      ticks: { color: '#666', font: { size: 11 } },
      grid: { color: 'rgba(255,255,255,0.05)' }
    }
  }
}

// Revenue & EBIT Chart
const revenueCanvas = document.getElementById('revenueChart') as HTMLCanvasElement
if (revenueCanvas) {
  const existing = Chart.getChart(revenueCanvas)
  if (existing) existing.destroy()
  new Chart(revenueCanvas, {
    type: 'bar',
    data: {
      labels: ['FY2024', 'FY2025', 'FY2026e', 'FY2027e'],
      datasets: [
        {
          label: 'Omsättning (Mdr USD)',
          data: [130.5, 215.9, 365.6, 480.7],
          backgroundColor: ['rgba(118,185,0,0.75)', 'rgba(118,185,0,0.75)', 'rgba(118,185,0,0.35)', 'rgba(118,185,0,0.35)'],
          borderColor: 'rgba(118,185,0,0.9)',
          borderWidth: 1,
          borderRadius: 4,
        },
        {
          label: 'EBIT (Mdr USD)',
          data: [81.5, 130.4, 240.8, 318.2],
          backgroundColor: ['rgba(82,168,224,0.55)', 'rgba(82,168,224,0.55)', 'rgba(82,168,224,0.25)', 'rgba(82,168,224,0.25)'],
          borderColor: 'rgba(82,168,224,0.8)',
          borderWidth: 1,
          borderRadius: 4,
        }
      ]
    },
    options: { ...chartDefaults, responsive: true }
  })
}

// EPS Chart
const epsCanvas = document.getElementById('epsChart') as HTMLCanvasElement
if (epsCanvas) {
  const existing = Chart.getChart(epsCanvas)
  if (existing) existing.destroy()
  new Chart(epsCanvas, {
    type: 'line',
    data: {
      labels: ['FY2024', 'FY2025', 'FY2026e', 'FY2027e'],
      datasets: [{
        label: 'EPS (USD)',
        data: [2.96, 4.92, 8.28, 11.11],
        borderColor: '#76b900',
        backgroundColor: 'rgba(118,185,0,0.08)',
        pointBackgroundColor: ['#76b900', '#76b900', 'rgba(118,185,0,0.5)', 'rgba(118,185,0,0.5)'],
        pointRadius: 6,
        borderWidth: 2.5,
        tension: 0.3,
        fill: true,
        segment: {
          borderDash: (ctx: any) => ctx.p1DataIndex >= 2 ? [6, 4] : undefined
        }
      }]
    },
    options: { ...chartDefaults, responsive: true }
  })
}

// Margin Chart
const marginCanvas = document.getElementById('marginChart') as HTMLCanvasElement
if (marginCanvas) {
  const existing = Chart.getChart(marginCanvas)
  if (existing) existing.destroy()
  new Chart(marginCanvas, {
    type: 'line',
    data: {
      labels: ['FY2024', 'FY2025'],
      datasets: [
        {
          label: 'Bruttomarginal (%)',
          data: [75.0, 71.1],
          borderColor: '#76b900',
          pointBackgroundColor: '#76b900',
          pointRadius: 5,
          borderWidth: 2,
          tension: 0.3
        },
        {
          label: 'EBIT-marginal (%)',
          data: [62.4, 60.4],
          borderColor: '#52a8e0',
          pointBackgroundColor: '#52a8e0',
          pointRadius: 5,
          borderWidth: 2,
          tension: 0.3
        },
        {
          label: 'Nettomarginal (%)',
          data: [55.9, 55.6],
          borderColor: '#f5c842',
          pointBackgroundColor: '#f5c842',
          pointRadius: 5,
          borderWidth: 2,
          tension: 0.3
        }
      ]
    },
    options: {
      ...chartDefaults,
      responsive: true,
      scales: {
        ...chartDefaults.scales,
        y: {
          ...chartDefaults.scales.y,
          min: 40,
          max: 85,
          ticks: { color: '#666', callback: (v: number) => v + '%' }
        }
      }
    }
  })
}

// Cash Flow Chart
const cashCanvas = document.getElementById('cashChart') as HTMLCanvasElement
if (cashCanvas) {
  const existing = Chart.getChart(cashCanvas)
  if (existing) existing.destroy()
  new Chart(cashCanvas, {
    type: 'bar',
    data: {
      labels: ['FY2024', 'FY2025', 'FY2026e', 'FY2027e'],
      datasets: [{
        label: 'Operativt kassaflöde (Mdr USD)',
        data: [64.1, 102.7, 189.5, 254.4],
        backgroundColor: ['rgba(118,185,0,0.65)', 'rgba(118,185,0,0.65)', 'rgba(118,185,0,0.3)', 'rgba(118,185,0,0.3)'],
        borderColor: '#76b900',
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: { ...chartDefaults, responsive: true }
  })
}

// P/E Chart
const peCanvas = document.getElementById('peChart') as HTMLCanvasElement
if (peCanvas) {
  const existing = Chart.getChart(peCanvas)
  if (existing) existing.destroy()
  new Chart(peCanvas, {
    type: 'line',
    data: {
      labels: ['FY2024', 'FY2025', 'Nuvarande', 'FY2026e', 'FY2027e'],
      datasets: [{
        label: 'P/E-tal',
        data: [48.5, 38.3, 36.2, 21.6, 16.1],
        borderColor: '#f5c842',
        backgroundColor: 'rgba(245,200,66,0.07)',
        pointBackgroundColor: ['#f5c842', '#f5c842', '#f5c842', 'rgba(245,200,66,0.5)', 'rgba(245,200,66,0.5)'],
        pointRadius: 6,
        borderWidth: 2.5,
        tension: 0.3,
        fill: true,
        segment: {
          borderDash: (ctx: any) => ctx.p1DataIndex >= 3 ? [6, 4] : undefined
        }
      }]
    },
    options: { ...chartDefaults, responsive: true }
  })
}

// Scenario Chart
const scenarioCanvas = document.getElementById('scenarioChart') as HTMLCanvasElement
if (scenarioCanvas) {
  const existing = Chart.getChart(scenarioCanvas)
  if (existing) existing.destroy()
  new Chart(scenarioCanvas, {
    type: 'bar',
    data: {
      labels: ['Bear Case', 'Nuvarande kurs', 'Base Case', 'Bull Case'],
      datasets: [{
        label: 'Kurs (USD)',
        data: [115, 178, 215, 300],
        backgroundColor: [
          'rgba(224,82,82,0.7)',
          'rgba(136,136,136,0.7)',
          'rgba(82,168,224,0.7)',
          'rgba(118,185,0,0.7)'
        ],
        borderColor: ['#e05252', '#888', '#52a8e0', '#76b900'],
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: {
      ...chartDefaults,
      responsive: true,
      scales: {
        ...chartDefaults.scales,
        y: {
          ...chartDefaults.scales.y,
          min: 0,
          max: 350,
          ticks: { color: '#666', callback: (v: number) => '$' + v }
        }
      }
    }
  })
}
```

}

return (
<>
<Script
src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"
onLoad={initCharts}
/>

```
  <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#e8e8e8', fontFamily: 'system-ui, sans-serif', fontSize: '15px', lineHeight: '1.75' }}>

    {/* ── HERO ── */}
    <div style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0f1a00 50%, #0a0a0a 100%)', borderBottom: '1px solid rgba(118,185,0,0.2)', padding: '60px 40px 50px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#76b900', marginBottom: '12px' }}>
          börsanalys.se &nbsp;·&nbsp; Carl Fredrik Thor &nbsp;·&nbsp; 20 mars 2026
        </div>
        <h1 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, lineHeight: 1.05, color: '#fff', marginBottom: '8px' }}>
          NVIDIA <span style={{ color: '#76b900' }}>Corporation</span>
        </h1>
        <div style={{ color: '#888', fontSize: '14px', marginBottom: '36px' }}>
          NASDAQ: NVDA &nbsp;·&nbsp; ISIN: US67066G1040 &nbsp;·&nbsp; Halvledare & AI-infrastruktur
        </div>

        {/* JSON SNAPSHOT */}
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(118,185,0,0.2)', borderRadius: '12px', padding: '28px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '20px 32px' }}>
          {[
            { label: 'Börskurs', value: '~178 USD', color: '#fff' },
            { label: 'Börsvärde', value: '~4 338 Mdr USD', color: '#fff' },
            { label: 'P/E (nuvarande)', value: '36,2x', color: '#fff' },
            { label: 'P/E 2026e', value: '21,6x', color: '#76b900' },
            { label: 'Rekommendation', value: 'BEVAKA', color: '#76b900' },
            { label: 'Rating', value: '29/40 = 72,5%', color: '#f5c842' },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#666', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* SCORE BARS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '12px', marginTop: '20px' }}>
          {[
            { label: 'Affärsmodell', score: 5 },
            { label: 'Strategisk Moat', score: 5 },
            { label: 'Finansiell kvalitet', score: 5 },
            { label: 'Värdering', score: 3 },
            { label: 'Tillväxtutsikter', score: 5 },
            { label: 'Riskprofil', score: 2 },
            { label: 'ESG & Makro', score: 3 },
            { label: 'AI-observationer', score: 4 },
          ].map(item => (
            <div key={item.label} style={{ background: '#222', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '14px 16px' }}>
              <div style={{ fontSize: '11px', color: '#888', marginBottom: '8px' }}>{item.label}</div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.07)', borderRadius: '4px', overflow: 'hidden', marginBottom: '6px' }}>
                <div style={{ height: '100%', width: `${(item.score / 5) * 100}%`, background: 'linear-gradient(90deg,#5a8f00,#76b900)', borderRadius: '4px' }} />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#76b900', textAlign: 'right' }}>{item.score}/5</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ── CONTENT ── */}
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px 80px' }}>

      {/* Section helper styles */}
      {/* I – FÖRETAGSÖVERSIKT */}
      <Section num="I" title="Företagsöversikt" score="⭐ 5/5">
        <p style={pStyle}>NVIDIA grundades 1993 av Jensen Huang, Chris Malachowsky och Curtis Priem och är idag världens ledande företag inom accelererad beräkning och AI-infrastruktur. Noterat på Nasdaq under ticker NVDA med ett börsvärde runt 4 300 miljarder USD – ett av de tre största bolagen i världen.</p>
        <p style={pStyle}>Från att ursprungligen fokuserat på grafikchip för spel har NVIDIA byggt upp en dominant position inom datacenter, AI-träning och AI-inferens. Data Center-segmentet genererar idag över 90% av bolagets intäkter.</p>

        <TwoCol>
          <InfoBlock title="Bolagsdata" items={['Börs: NASDAQ (NVDA)', 'Grundat: 1993, Delaware', 'HQ: Santa Clara, Kalifornien', 'Anställda: ~42 000 (FY2026)', 'Räkenskapsår: avslutas januari']} />
          <InfoBlock title="Geografisk spridning (FY2026)" items={['USA: ~50% av intäkterna', 'Singapore (fakturering): ~22%', 'Taiwan: ~17%', 'Kina inkl. HK: ~6%', 'Övriga: ~5%']} />
        </TwoCol>

        <SectionH3>Affärsidé & affärsmodell</SectionH3>
        <p style={pStyle}>NVIDIAs kärnidé är att tillhandahålla hårdvara, mjukvara och plattformar som dramatiskt påskyndar beräkningsintensiva arbetsuppgifter – från att träna stora AI-modeller till att köra dem i realtid (inferens). Tänk på det som att NVIDIA säljer &quot;spaden&quot; i AI-guldruschen.</p>
        <p style={pStyle}>Intäktsmodellen bygger på hårdvara (GPU:er, nätverkschip, servrar), men NVIDIA har successivt byggt ett ekosystem av mjukvara runt sin CUDA-plattform – ett programmeringsgränssnitt som skapar höga byteskostnader för kunderna.</p>

        <Callout>
          <strong style={{ color: '#76b900' }}>Enkelt förklarat:</strong> NVIDIA säljer de kraftfulla chip som krävs för att träna och köra AI. ChatGPT, Gemini, Claude och de flesta andra stora AI-modeller tränas på NVIDIA-hårdvara. Det gör NVIDIA till ryggraden i AI-revolutionen.
        </Callout>

        <SectionH3>Ledning & ägarstruktur</SectionH3>
        <p style={pStyle}>Jensen Huang, grundare och VD, är en av teknikbranschens mest respekterade ledare. Han har lett bolaget sedan starten 1993 och äger en betydande andel av aktierna – ett tydligt tecken på &quot;skin in the game&quot;. Insiderägandet bland närstående uppgår till cirka 3,8% (FY2026). Institutionella investerare som Vanguard och BlackRock dominerar ägarbilden i övrigt.</p>
      </Section>

      {/* II – STRATEGISK ANALYS */}
      <Section num="II" title="Strategisk analys & Moat" score="⭐ 5/5">
        <p style={pStyle}>NVIDIAs konkurrensfördelar är exceptionella och sannolikt de starkaste inom halvledarsektorn. Det handlar inte om en enskild fördel utan om ett helt ekosystem av sammanlänkade vallgravar som förstärker varandra.</p>

        <TwoCol>
          <InfoBlock title="Teknologisk ledning" items={['Blackwell Ultra dominerar AI-inferens', 'Vera Rubin – nästa generations plattform', 'NVLink-arkitektur för GPU-kluster', '30+ år av GPU-optimering']} />
          <InfoBlock title="CUDA-ekosystemet" items={['Över 5 miljoner CUDA-utvecklare globalt', 'Tusentals bibliotek byggda för CUDA', 'Extrema byteskostnader för kunder', '20+ år av ekosystemsuppbyggnad']} />
          <InfoBlock title="Nätverkseffekter" items={['Fler användare → fler ramverk → fler användare', 'Standardplattform för AI-forskning', 'Partnerskap: AWS, Google, Azure, Meta']} />
          <InfoBlock title="Skalfördelar" items={['R&D på $18,5 mdr FY2026', 'Produktcykel ned till 1 år', 'Volym sänker kostnad per enhet']} />
        </TwoCol>

        <SectionH3>SWOT-analys</SectionH3>
        <SwotGrid />
      </Section>

      {/* III – FINANSIELL ANALYS */}
      <Section num="III" title="Finansiell analys" score="⭐ 5/5">
        <p style={pStyle}>NVIDIAs finansiella utveckling de senaste åren är närmast historielös för ett bolag i denna storleksklass. Intäkterna ökade 65% under FY2026 till 215,9 miljarder USD. Lönsamheten är i världsklass.</p>

        <ChartWrap title="Omsättning & EBIT (Miljarder USD) – Historiskt och estimat">
          <canvas id="revenueChart" style={{ maxHeight: '280px' }} />
        </ChartWrap>

        <ChartWrap title="Vinst per aktie (EPS, USD) – Historiskt och estimat">
          <canvas id="epsChart" style={{ maxHeight: '280px' }} />
        </ChartWrap>

        <DataTable
          headers={['Mått', 'FY2024', 'FY2025', 'FY2026e', 'FY2027e']}
          rows={[
            ['Omsättning (Mdr USD)', '130,5', '215,9', '365,6', '480,7'],
            ['EBIT (Mdr USD)', '81,5', '130,4', '240,8', '318,2'],
            ['Nettoresultat (Mdr USD)', '72,9', '120,1', '199,9', '264,1'],
            ['Vinst per aktie (EPS)', '2,96', '4,92', '8,28 ✦', '11,11 ✦'],
            ['Rörelsemarginal', '62,4%', '60,4%', '~65%e', '~66%e'],
            ['Nettomarginal', '55,9%', '55,6%', '~54%e', '~55%e'],
          ]}
        />

        <ChartWrap title="Marginaler (%) – Brutto, EBIT & Netto">
          <canvas id="marginChart" style={{ maxHeight: '280px' }} />
        </ChartWrap>

        <Callout>
          <strong style={{ color: '#76b900' }}>Vad betyder marginalerna?</strong> En rörelsemarginal på 60%+ innebär att av varje 100 kr i intäkter behåller bolaget 60 kr efter rörelsekostnader. Till jämförelse har ett vanligt tillverkningsbolag ofta 5–15%.
        </Callout>

        <SectionH3>Balansräkning & kassaflöde</SectionH3>
        <p style={pStyle}>Vid utgången av FY2026 hade NVIDIA 62,6 miljarder USD i kassa och värdepapper. Det fria kassaflödet uppgick till 96,6 miljarder USD – pengar som återförs till aktieägarna via återköp och utdelningar.</p>

        <ChartWrap title="Kassaflöde – Operativt (Mdr USD)">
          <canvas id="cashChart" style={{ maxHeight: '280px' }} />
        </ChartWrap>

        <DataTable
          headers={['Nyckeltal', 'FY2024', 'FY2025', 'Kommentar']}
          rows={[
            ['ROE', '119%', '101% ✦', 'Extremt högt – branschnorm ~15–25%'],
            ['ROCE', '119%', '101%', 'Kapitalet arbetar mycket effektivt'],
            ['ROIC', '103%', '94%', 'Varje investerad krona ger ~1 kr tillbaka'],
            ['ROA', '82%', '75%', 'Exceptionellt för ett tillgångsintensivt bolag'],
          ]}
        />

        <Callout>
          <strong style={{ color: '#76b900' }}>Förenklat:</strong> ROE på 101% innebär att för varje 100 kr aktieägarna har investerat genererar NVIDIA 101 kr i vinst per år. Närmast unikt globalt.
        </Callout>
      </Section>

      {/* IV – VÄRDERING */}
      <Section num="IV" title="Värdering & Jämförelse" score="⭐ 3/5">
        <p style={pStyle}>Värderingen är den punkt där NVIDIA delar investerarkollektivet. Bolaget är dyrt i absoluta tal, men prislappen backas upp av faktisk och explosiv vinsttillväxt.</p>

        <ChartWrap title="P/E-talets utveckling – Historiskt och estimat (forward)">
          <canvas id="peChart" style={{ maxHeight: '280px' }} />
        </ChartWrap>

        <DataTable
          headers={['Multipel', 'FY2024', 'FY2025', 'Nuvarande', 'FY2026e', 'FY2027e']}
          rows={[
            ['P/E', '48,5x', '38,3x', '36,2x', '21,6x ✦', '16,1x ✦'],
            ['EV/EBIT', '43,0x', '34,9x', '34,8x', '–', '–'],
            ['EV/EBITDA', '42,0x', '34,1x', '34,0x', '–', '–'],
            ['P/S', '27,1x', '21,3x', '20,3x', '–', '–'],
            ['Direktavkastning', '0,02%', '0,02%', '0,02%', '0,03%', '0,08%'],
          ]}
        />

        <Callout variant="warn">
          <strong style={{ color: '#f5c842' }}>Värderingsanalys:</strong> Det P/E som ser dyrt ut idag (36x) faller dramatiskt när man tar hänsyn till vinstestimaten. Om estimaten håller handlas aktien på P/E 16x på FY2027 – i linje med S&P 500-snittet. PEG-tal: 36/70 ≈ 0,51 – under 1,0 anses generellt attraktivt.
        </Callout>
      </Section>

      {/* V – TILLVÄXT */}
      <Section num="V" title="Tillväxtmotorer & Triggers" score="⭐ 5/5">
        <p style={pStyle}>NVIDIAs tillväxt drivs av flera parallella megatrender som förstärker varandra. Det är sällsynt att ett bolag har så många och starka strukturella medvindar simultaneously.</p>

        <TwoCol>
          <InfoBlock title="Agentic AI – ny tillväxtvåg" items={['AI-agenter kräver massiv inferenskapacitet', 'Jensen Huang: "Enterprise adoption of agents is skyrocketing"', 'Inferens kräver mer GPU-kapacitet per användare än träning']} />
          <InfoBlock title="Blackwell Ultra & Vera Rubin" items={['Blackwell Ultra: 50x bättre vs Hopper', 'Vera Rubin: ytterligare 10x lägre kostnad/token', 'Ettårigt produktcykelschema']} />
          <InfoBlock title="Fysisk AI & Robotik" items={['NVIDIA Cosmos – plattform för fysisk AI', 'Isaac GR00T – open-source humanoidmodell', 'Partners: Boston Dynamics, Caterpillar, LG']} />
          <InfoBlock title="Autonoma fordon & Hälsovård" items={['DRIVE Thor: BYD, XPENG, Lucid m.fl.', 'Mercedes-Benz CLA-partnerskap', 'BioNeMo: AI för läkemedelsupptäckt', 'Sovereign AI: länder bygger egna AI-fabriker']} />
        </TwoCol>

        <Callout>
          <strong style={{ color: '#76b900' }}>Q1 FY2027-guidning:</strong> NVIDIA guidar för 78 miljarder USD i intäkter – upp från 68,1 miljarder i Q4 FY2026. Bolaget inkluderar ingen Kina-intäkt i prognosen, vilket gör det extra imponerande.
        </Callout>
      </Section>

      {/* VI – RISK */}
      <Section num="VI" title="Riskprofil" score="⚠️ 2/5 (inverterad)">
        <Callout variant="risk">
          <strong style={{ color: '#e05252' }}>Obs:</strong> Riskbetyget är inverterat – 5 = låg risk, 1 = hög risk. NVIDIA får 2/5, vilket speglar betydande men hanterbara risker.
        </Callout>

        <SectionH3>Exportkontroller & geopolitik – den viktigaste risken</SectionH3>
        <p style={pStyle}>Den enskilt största risken är USA:s exportrestriktioner mot Kina. I april 2025 tvingades NVIDIA skriva ned H20-lager med 4,5 miljarder USD. Bolaget anger explicit i Q1 FY2027-guidningen att ingen Kina-försäljning är inräknad.</p>

        <TwoCol>
          <InfoBlock title="Regulatoriska risker" items={['Exportrestriktioner kan utvidgas', 'EU AI Act – potentiell påverkan', 'Antitrust-utredningar i EU, USA, Sydkorea, Japan', 'Tariffrisker i global leveranskedja']} />
          <InfoBlock title="Operativa risker" items={['Fabless-modell: beroende av TSMC (Taiwan)', 'Taiwan-risken vid geopolitisk konflikt', 'Kundkoncentration: 2 kunder = 39% av Q2-intäkter', 'Snabba produktövergångar skapar lagerrisk']} />
          <InfoBlock title="Konkurrensrisker" items={['AMD MI300-serien vinner mark', 'Googles TPU, Amazons Trainium', 'Open-source AI kan minska beräkningsbehov', 'DeepSeek-effekten: effektivare modeller']} />
          <InfoBlock title="Makrorisker" items={['AI-investeringscykel kan vändas', 'Ränteförändringar påverkar högt värderade bolag', 'Energibrist kan bromsa datacenterutbyggnad', 'Pågående rättsprocesser (SEC-relaterade)']} />
        </TwoCol>
      </Section>

      {/* VII – ESG */}
      <Section num="VII" title="ESG & Makro" score="⭐ 3/5">
        <TwoCol>
          <InfoBlock title="Miljö (E)" items={['Energieffektivitetsledare (Grace Hopper – Green500)', 'Indirekt hög energiförbrukning via kundernas datacenter', 'Earth-2: öppna klimatmodeller för väder', 'Planerar utöka USA-baserad tillverkning']} />
          <InfoBlock title="Socialt & Styrning (S/G)" items={['Stark bolagsstyrning med erfaret styre', 'Jensen Huang – transparens och tydlig vision', 'Hög aktiebaserad kompensation (~6,4 mdr USD FY2026)', 'Pågående rättsprocesser (aktieklass-mål från 2018)']} />
        </TwoCol>

        <SectionH3>Makropåverkan</SectionH3>
        <p style={pStyle}>NVIDIA gynnas kraftigt av den globala megatrenden mot AI-digitalisering. Hyperscalers investerar hundratals miljarder per år i AI-infrastruktur och NVIDIA är den primära leverantören. Sovereign AI – länder som vill ha egna nationella AI-kapaciteter – är en ny och växande marknad som öppnar sig parallellt.</p>
        <p style={pStyle}>Negativa makrofaktorer: geopolitiska spänningar (USA-Kina), potentiell AI-investeringsinbromsning om ROI uteblir, samt energiinfrastrukturens kapacitetsbegränsningar.</p>
      </Section>

      {/* VIII – AI */}
      <Section num="VIII" title="AI-observationer 🔍" score="⭐ 4/5">
        <TwoCol>
          <InfoBlock title="Positiva signaler" items={['Q4 FY2026 slog estimat med god marginal', 'Q1 FY2027-guidning på 78 mdr USD (vs estimat ~73 mdr)', 'Återköpsprogram på 71 mdr USD – ledningens tilltro', 'Meta-partnerskap: "miljoner Blackwell och Rubin GPU:er"', 'Anthropic-investering – strategisk positionering']} />
          <InfoBlock title="Varningssignaler" items={['Bruttomarginal föll 75% → 71% (Blackwell-övergång)', 'Lageruppbyggnad: inventarier steg 10 → 21 mdr USD', 'Produktövergångar skapar temporär lagerrisk', 'En direktör sålde aktier (A. Brooke Seawell, juli 2025)', 'H20-fallet visar regulatorisk sårbarhet']} />
        </TwoCol>

        <Callout>
          <strong style={{ color: '#76b900' }}>Mönsteranalys:</strong> NVIDIA har konsekvent guidat konservativt och sedan slagit sina egna prognoser – en &quot;beat-and-raise&quot;-kultur som historiskt drivit aktien. Om mönstret bryts bör det tas som ett allvarligt varningstecken.
        </Callout>
      </Section>

      {/* IX – BESLUT */}
      <Section num="IX" title="Sammanfattning & Investeringsbeslut" score="">
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', background: '#1a1a1a', border: '1px solid rgba(118,185,0,0.2)', borderRadius: '12px', padding: '24px 32px', margin: '20px 0' }}>
          <div style={{ fontSize: '56px', fontWeight: 800, color: '#76b900', lineHeight: 1 }}>29</div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>av 40 möjliga poäng</div>
            <div style={{ fontSize: '13px', color: '#888' }}>Rating: 72,5% &nbsp;·&nbsp; Sektioner I–VIII</div>
            <div style={{ fontSize: '13px', color: '#888' }}>5+5+5+3+5+2+3+1 = 29/40</div>
          </div>
        </div>

        <SectionH3>Är NVIDIA ett kvalitetsbolag?</SectionH3>
        <p style={pStyle}>Utan tvekan ja. NVIDIA är ett av de finaste bolag som existerar ur ett kvalitetsperspektiv: exceptionell affärsmodell, dominant moat, unik teknik, visionär VD och finansiella nyckeltal i världsklass. Bolaget växer omsättningen 65% med 55% nettomarginal – extremt ovanligt i denna storlek.</p>

        <SectionH3>Är det rimligt värderat?</SectionH3>
        <p style={pStyle}>Det beror på tidshorisonten. På dagens multiplar (P/E ~36x) är aktien inte billig. Men om estimaten för FY2026–FY2027 håller faller P/E snabbt till rimliga nivåer. Risken är att estimaten är för optimistiska vid en eventuell inbromsning i AI-investeringscykeln.</p>

        <SectionH3>Passar för 5–10 år?</SectionH3>
        <p style={pStyle}>Ja, för en långsiktig investerare med risktolerans är NVIDIA ett av de starkaste strukturella casen på börsen. AI är inte en kortlivad trend – det är en industriell revolution. Men räkna med volatilitet längs vägen.</p>

        <div style={{ background: 'linear-gradient(135deg,rgba(118,185,0,0.12),rgba(118,185,0,0.04))', border: '1px solid rgba(118,185,0,0.2)', borderRadius: '14px', padding: '32px 36px', margin: '24px 0', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#888', marginBottom: '12px' }}>Rekommendation</div>
          <div style={{ fontSize: '42px', fontWeight: 800, color: '#76b900', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '8px' }}>BEVAKA</div>
          <div style={{ fontSize: '14px', color: '#aaa' }}>
            Motivering: Exceptionellt bolag med hög värdering och reella risker.<br />
            <strong style={{ color: '#fff' }}>Målpris base case: 210–220 USD</strong> &nbsp;·&nbsp; 20 mars 2026
          </div>
        </div>
      </Section>

      {/* X – SCENARIER */}
      <Section num="X" title="Scenarier: Bull, Base & Bear Case 📈📉" score="">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '16px', margin: '20px 0' }}>
          <ScenarioBlock variant="bull" label="🚀 Bull Case" price="280–320 USD">
            AI-investeringarna accelererar ytterligare. Agentic AI och fysisk AI skapar ny massiv efterfrågan. Vera Rubin lanseras med stor framgång. Exportrestriktioner lättas. Bolaget levererar över estimat och marknaden belönar tillväxten med premiumvärdering.
          </ScenarioBlock>
          <ScenarioBlock variant="base" label="📊 Base Case" price="210–220 USD">
            Stabil tillväxt i linje med estimaten. FY2027 EPS når 10–11 USD. P/E komprimeras mot 18–20x på forward-basis. Exportrestriktionerna består men expanderar inte. Återköpsprogrammet fortsätter ge stöd.
          </ScenarioBlock>
          <ScenarioBlock variant="bear" label="📉 Bear Case" price="100–130 USD">
            AI-investeringscykeln inbromsas. Hyperscalers drar ned CAPEX kraftigt. Open-source AI minskar beräkningsbehov. USA utvidgar exportrestriktioner. Kunder använder egenutvecklade chip. P/E komprimeras till 12–15x på nedreviderade estimat.
          </ScenarioBlock>
        </div>

        <ChartWrap title="Scenarioprisintervall (USD per aktie)">
          <canvas id="scenarioChart" style={{ maxHeight: '260px' }} />
        </ChartWrap>
      </Section>

    </div>{/* end content */}

    {/* FOOTER */}
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 40px', textAlign: 'center', fontSize: '12px', color: '#666', maxWidth: '1100px', margin: '0 auto' }}>
      <p>Analys av Carl Fredrik Thor &nbsp;·&nbsp; börsanalys.se &nbsp;·&nbsp; 20 mars 2026</p>
      <p style={{ marginTop: '8px' }}>Denna analys är inte finansiell rådgivning. Investering innebär alltid risk och historisk avkastning är ingen garanti för framtida avkastning. Gör alltid din egen analys innan du fattar investeringsbeslut.</p>
    </div>

  </div>
</>
```

)
}

// ── HELPERS ──────────────────────────────────────────────

const pStyle: React.CSSProperties = { marginBottom: ‘14px’, color: ‘#d0d0d0’ }

function Section({ num, title, score, children }: { num: string; title: string; score: string; children: React.ReactNode }) {
return (
<div style={{ marginTop: ‘56px’, paddingTop: ‘40px’, borderTop: ‘1px solid rgba(255,255,255,0.06)’ }}>
<div style={{ display: ‘flex’, alignItems: ‘baseline’, gap: ‘16px’, marginBottom: ‘28px’, flexWrap: ‘wrap’ }}>
<span style={{ fontSize: ‘11px’, letterSpacing: ‘2px’, textTransform: ‘uppercase’, color: ‘#76b900’, minWidth: ‘28px’ }}>{num}</span>
<span style={{ fontSize: ‘22px’, fontWeight: 700, color: ‘#fff’ }}>{title}</span>
{score && <span style={{ marginLeft: ‘auto’, background: ‘rgba(118,185,0,0.1)’, border: ‘1px solid rgba(118,185,0,0.2)’, borderRadius: ‘6px’, padding: ‘4px 12px’, fontSize: ‘13px’, fontWeight: 700, color: ‘#76b900’, whiteSpace: ‘nowrap’ }}>{score}</span>}
</div>
{children}
</div>
)
}

function SectionH3({ children }: { children: React.ReactNode }) {
return <h3 style={{ fontSize: ‘16px’, fontWeight: 700, color: ‘#fff’, margin: ‘24px 0 10px’ }}>{children}</h3>
}

function TwoCol({ children }: { children: React.ReactNode }) {
return <div style={{ display: ‘grid’, gridTemplateColumns: ‘repeat(auto-fit,minmax(220px,1fr))’, gap: ‘16px’, margin: ‘20px 0’ }}>{children}</div>
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
return (
<div style={{ background: ‘#1a1a1a’, border: ‘1px solid rgba(255,255,255,0.07)’, borderRadius: ‘10px’, padding: ‘18px 20px’ }}>
<div style={{ fontSize: ‘11px’, letterSpacing: ‘1.5px’, textTransform: ‘uppercase’, color: ‘#76b900’, marginBottom: ‘10px’ }}>{title}</div>
<ul style={{ listStyle: ‘none’ }}>
{items.map(item => (
<li key={item} style={{ fontSize: ‘13.5px’, color: ‘#bbb’, padding: ‘4px 0’, borderBottom: ‘1px solid rgba(255,255,255,0.04)’ }}>
<span style={{ color: ‘#76b900’, marginRight: ‘8px’, fontSize: ‘12px’ }}>→</span>{item}
</li>
))}
</ul>
</div>
)
}

function Callout({ children, variant = ‘default’ }: { children: React.ReactNode; variant?: ‘default’ | ‘warn’ | ‘risk’ }) {
const colors = { default: ‘#76b900’, warn: ‘#f5c842’, risk: ‘#e05252’ }
return (
<div style={{ background: ‘#1a1a1a’, borderLeft: `3px solid ${colors[variant]}`, borderRadius: ‘0 8px 8px 0’, padding: ‘16px 20px’, margin: ‘20px 0’, fontSize: ‘14px’, color: ‘#ccc’ }}>
{children}
</div>
)
}

function ChartWrap({ title, children }: { title: string; children: React.ReactNode }) {
return (
<div style={{ background: ‘#1a1a1a’, border: ‘1px solid rgba(255,255,255,0.07)’, borderRadius: ‘12px’, padding: ‘24px’, margin: ‘24px 0’ }}>
<div style={{ fontSize: ‘12px’, fontWeight: 700, color: ‘#888’, letterSpacing: ‘1px’, textTransform: ‘uppercase’, marginBottom: ‘16px’ }}>{title}</div>
{children}
</div>
)
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
return (
<div style={{ overflowX: ‘auto’, margin: ‘20px 0’ }}>
<table style={{ width: ‘100%’, borderCollapse: ‘collapse’, fontSize: ‘13.5px’ }}>
<thead>
<tr>
{headers.map(h => (
<th key={h} style={{ textAlign: ‘left’, padding: ‘10px 14px’, background: ‘#1a1a1a’, color: ‘#888’, fontSize: ‘11px’, letterSpacing: ‘1px’, textTransform: ‘uppercase’, borderBottom: ‘1px solid rgba(118,185,0,0.2)’, fontWeight: 500 }}>{h}</th>
))}
</tr>
</thead>
<tbody>
{rows.map((row, i) => (
<tr key={i} style={{ borderBottom: ‘1px solid rgba(255,255,255,0.04)’ }}>
{row.map((cell, j) => (
<td key={j} style={{ padding: ‘10px 14px’, color: cell.includes(‘✦’) ? ‘#76b900’ : ‘#ccc’, fontWeight: cell.includes(‘✦’) ? 600 : 400 }}>
{cell.replace(’ ✦’, ‘’)}
</td>
))}
</tr>
))}
</tbody>
</table>
</div>
)
}

function SwotGrid() {
const items = [
{ cls: ‘s’, label: ‘Styrkor’, color: ‘#76b900’, bg: ‘rgba(118,185,0,0.08)’, border: ‘rgba(118,185,0,0.2)’, points: [‘Dominerande marknadsandel i AI-GPU:er’, ‘CUDA-monopol i praktiken’, ‘Exceptionell lönsamhet (55%+ nettomarginal)’, ‘Starka partnerskap med hyperscalers’, ‘Visionär VD med lång track record’] },
{ cls: ‘w’, label: ‘Svagheter’, color: ‘#e05252’, bg: ‘rgba(224,82,82,0.06)’, border: ‘rgba(224,82,82,0.18)’, points: [‘Extremt beroende av TSMC’, ‘Stark koncentration till Data Center (~90%)’, ‘Hög kundkoncentration (topp 2 = 39%)’, ‘H20-incident visade sårbarhet’] },
{ cls: ‘o’, label: ‘Möjligheter’, color: ‘#52a8e0’, bg: ‘rgba(82,168,224,0.06)’, border: ‘rgba(82,168,224,0.18)’, points: [‘Agentic AI – ny stor marknad’, ‘Fysisk AI & robotik’, ‘Autonoma fordon’, ‘Läkemedelsupptäckt via AI’, ‘Sovereign AI – länders egna AI-fabriker’] },
{ cls: ‘t’, label: ‘Hot’, color: ‘#f5c842’, bg: ‘rgba(245,200,66,0.06)’, border: ‘rgba(245,200,66,0.18)’, points: [‘AMD, Intel och egentillverkade chip’, ‘Kinesiska konkurrenter (Huawei Ascend)’, ‘Ökande exportrestriktioner’, ‘Open-source AI kan minska beräkningsbehov’, ‘Kunder bygger egna chip’] },
]
return (
<div style={{ display: ‘grid’, gridTemplateColumns: ‘repeat(auto-fit,minmax(220px,1fr))’, gap: ‘12px’, margin: ‘20px 0’ }}>
{items.map(item => (
<div key={item.cls} style={{ background: item.bg, border: `1px solid ${item.border}`, borderRadius: ‘10px’, padding: ‘18px 20px’ }}>
<div style={{ fontSize: ‘11px’, letterSpacing: ‘2px’, textTransform: ‘uppercase’, fontWeight: 700, color: item.color, marginBottom: ‘10px’ }}>{item.label}</div>
<ul style={{ listStyle: ‘none’ }}>
{item.points.map(p => <li key={p} style={{ fontSize: ‘13px’, padding: ‘3px 0’, color: ‘#bbb’ }}>• {p}</li>)}
</ul>
</div>
))}
</div>
)
}

function ScenarioBlock({ variant, label, price, children }: { variant: ‘bull’ | ‘base’ | ‘bear’; label: string; price: string; children: React.ReactNode }) {
const styles = {
bull: { bg: ‘rgba(118,185,0,0.07)’, border: ‘rgba(118,185,0,0.2)’, color: ‘#76b900’ },
base: { bg: ‘rgba(82,168,224,0.06)’, border: ‘rgba(82,168,224,0.18)’, color: ‘#52a8e0’ },
bear: { bg: ‘rgba(224,82,82,0.06)’, border: ‘rgba(224,82,82,0.18)’, color: ‘#e05252’ },
}
const s = styles[variant]
return (
<div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: ‘10px’, padding: ‘20px’ }}>
<div style={{ fontSize: ‘11px’, letterSpacing: ‘2px’, textTransform: ‘uppercase’, fontWeight: 700, color: s.color, marginBottom: ‘8px’ }}>{label}</div>
<div style={{ fontSize: ‘26px’, fontWeight: 800, color: ‘#fff’, marginBottom: ‘4px’ }}>{price}</div>
<p style={{ fontSize: ‘13px’, color: ‘#aaa’, marginTop: ‘10px’ }}>{children}</p>
</div>
)
}
