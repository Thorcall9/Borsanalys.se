# Google Analytics för borsanalys.se

## Mål

Aktivera Google Analytics 4 på hela borsanalys.se med mät-ID
`G-QL1WS0Q350`.

## Lösning

Sajten har redan en global Google Analytics-integration i
`src/app/layout.tsx`. Den laddar `gtag.js` med Next.js `Script` och kör
konfigurationen efter att sidan blivit interaktiv.

Mät-ID:t anges som standardvärde i applikationen. En eventuell
`NEXT_PUBLIC_GA_ID`-miljövariabel får fortsatt möjlighet att ersätta
standardvärdet, exempelvis för en separat staging-egendom.

## Omfattning

- Google-taggen laddas från den globala root-layouten och gäller därmed alla
  sidor.
- Vercel Analytics behålls.
- Ingen extra eller duplicerad Google-tagg läggs till.
- Befintliga säkerhetsregler tillåter redan Google Tag Manager och Google
  Analytics.

## Verifiering

- Kör projektets lintkontroll.
- Kör en produktionsbyggnad.
- Kontrollera i den byggda koden att mät-ID:t finns och att integrationen
  fortfarande bara definieras en gång.

## Avgränsning

Ändringen omfattar installation av sidvisningsmätning. Anpassade händelser,
Google Ads-konverteringar och cookie-samtyckesbanner ingår inte.
