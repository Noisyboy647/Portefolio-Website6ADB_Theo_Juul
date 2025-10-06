# Portefolio-Website6ADB_Theo_Juul
# GSP 6ADB 2025–2026 — Portfolio & Projectdashboard

Een lichte, statische website om ons eindwerk/portfolio te beheren met een **Dashboard**, **Projecten**, **Logboek** en **Tijdlijn**. De site gebruikt enkel HTML en CSS en is daardoor heel makkelijk te hosten en te onderhouden.

## Inhoud

- [Functies](#functies)
- [Technologieën](#technologieën)
- [Mapstructuur](#mapstructuur)
- [Installatie](#installatie)
- [Gebruik](#gebruik)
- [Aanpassen](#aanpassen)
- [Roadmap / Open punten](#roadmap--open-punten)
- [Licentie](#licentie)

## Functies
- **Dashboard** met snelle statistieken (actieve projecten, totaal uren, logboek entries, voortgang) en secties voor deadlines en teamuren.
- **Projecten**-overzicht met voortgangsbalken, technologie-tags en “cloud bestanden”-knoppen.
- **Logboek** met filterbalk, datum-badges, metadata per item (uren, datum/tijd), tags en bewerk/verwijder-acties (UI).
- **Tijdlijn**-pagina met ingesloten iframes als referentie voor planning en timeline-visualisaties.

## Technologieën
- **HTML5** voor de pagina’s (`index.html`, `projecten.html`, `logboek.html`, `tijdlijn.html`).
- **CSS3** voor styling (`index.css`, `projecten.css`, `logboek.css`, `tijdlijn.css`).
- **Google Material Symbols** voor iconen (ingeladen via een Google Fonts stylesheet).
- **Geen JavaScript** vereist — alle componenten zijn statisch.

## Mapstructuur

  ├─ index.html
├─ index.css
├─ projecten.html
├─ projecten.css
├─ logboek.html
├─ logboek.css
├─ tijdlijn.html
├─ tijdlijn.css
└─ README.md ← dit bestand  

## Installatie
1. **Download of clone** de repo naar je computer.
2. **Open `index.html`** in je browser.

tijdens de ontwikkeling:
- Gebruik een lokale webserver (bv. VS Code “Live Server” extensie) zodat navigatielinks en externe iframes werken.
- Hou alle bestanden in dezelfde map voor correcte relative paths.

## Gebruik
- Start op **`index.html`** (Dashboard) en navigeer via de zijbalk naar **Projecten**, **Logboek** of **Tijdlijn**.
- Op **Projecten** vind je kaarten met status, voortgang en technologieën.
- In **Logboek** kan je je entries bekijken; de filterbalk is aanwezig.
- **Tijdlijn** werkt via een  `<iframe>`; een internetverbinding is vereist om de inhoud te laden.
