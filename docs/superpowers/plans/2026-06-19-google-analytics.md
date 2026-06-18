# Google Analytics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aktivera Google Analytics 4 på alla sidor på borsanalys.se med mät-ID `G-QL1WS0Q350`.

**Architecture:** Den befintliga globala integrationen i Next.js root-layout behålls. `NEXT_PUBLIC_GA_ID` fortsätter kunna ersätta ett nytt standard-ID, vilket aktiverar produktionstaggen utan att skapa en andra implementation.

**Tech Stack:** Next.js 16, React 19, TypeScript, `next/script`

---

### Task 1: Aktivera produktionens Google Analytics-ID

**Files:**
- Modify: `src/app/layout.tsx:26`

- [ ] **Step 1: Kontrollera utgångsläget**

Run:

```bash
rg -n "const gaId|googletagmanager|gtag\\('config'" src/app/layout.tsx
```

Expected: `gaId` hämtas enbart från `NEXT_PUBLIC_GA_ID`, och en enda
`gtag.js`-integration finns.

- [ ] **Step 2: Ange produktionens standard-ID**

Ändra deklarationen till:

```ts
const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-QL1WS0Q350";
```

Detta aktiverar taggen på borsanalys.se och behåller möjligheten att ersätta
ID:t via miljövariabel.

- [ ] **Step 3: Kontrollera att integrationen inte duplicerats**

Run:

```bash
rg -n "G-QL1WS0Q350|googletagmanager|gtag\\('config'" src/app/layout.tsx
```

Expected: standard-ID:t förekommer en gång, skriptkällan en gång och
`gtag('config', ...)` en gång.

- [ ] **Step 4: Kör lint**

Run:

```bash
npm run lint
```

Expected: exit code 0 utan lintfel.

- [ ] **Step 5: Kör produktionsbygget**

Run:

```bash
npm run build
```

Expected: exit code 0 och en lyckad Next.js-produktionsbyggnad.

- [ ] **Step 6: Granska ändringarna**

Run:

```bash
git diff -- src/app/layout.tsx
git status --short
```

Expected: endast den avsedda raden i `layout.tsx` har ändrats av
implementeringen. Den redan befintliga användarändringen i
`src/components/layout/Header.tsx` lämnas orörd.
