# 🥤 Milkshake Reviews

Ett personligt/skolprojekt där jag skapade mitt första React-projekt, där projektet handlar om att kunna recensera milkshakes 🍓🥛

Appen låter dig spara, betygsätta och jämföra milkshakes från olika ställen, se statistik över dina recensioner och visualisera alla platser på en interaktiv karta.

---

## ✨ Funktioner

* ➕ Skapa, redigera och ta bort milkshake-recensioner
* 🔍 Detaljvy: Varje recension har en unik sida med djuplodande information.
* ⭐ Sätt betyg (1–5 stjärnor) med Material UI Rating
* ❤️ Markera favoriter
* 🏆 Automatiska badges (t.ex. *Banger Shake* vid 5⭐)
* 📊 Statistikvy med snittbetyg, antal ställen m.m.
* 🗺️ Interaktiv karta med Mapbox + OpenStreetMap (Nominatim)
* 💾 All data sparas i `firebase`
* 🔍Användarprofiler med Achievements
* 🧭 Navigering med `react-router-dom`
* 🎨 CSS med variabler för färgtema och konsekvent design

---

##  Uppfyllda krav (checklista)

* ✅ React-applikation byggd med komponenter
* ✅ Använder `react-router-dom` för routing mellan vyer
* ✅ Dynamisk routing, använder :id och useParams för specifika recensionssidor
* ✅ State-hantering med React hooks (`useState`, `useEffect`)
* ✅ Data sparas med `firebase`.
* ✅ Interaktion med externt API (Mapbox + OpenStreetMap Nominatim)
* ✅ Dynamisk rendering av listor och vyer
* ✅ Tydlig komponentstruktur (`components/ui`, `components/pages`)
* ✅ CSS med variabler för färgtema och återanvändbar styling

---

## 🧠 Tekniska val – reflektion

Detta projekt är uppbyggt med fokus på tydlighet, skalbarhet och separation av ansvar.

### 📁 Mapp- och filstruktur

Projektet är uppdelat i `components/ui` och `components/pages` för att skilja mellan återanvändbara UI-komponenter (t.ex. `ReviewCard`, `Badge`) och sid-specifika vyer (`MilkshakeMap`, `StatsView`). Detta gör koden mer lättläst och förenklar vidareutveckling, eftersom UI-komponenter kan återanvändas utan att vara beroende av routing eller affärslogik.

### 🧭 Routing-upplägg

Routing hanteras med `react-router-dom` och `HashRouter`, vilket gör att applikationen fungerar korrekt även vid deployment till t.ex. GitHub Pages. Varje huvudvy (startsida, statistik, karta) har en egen route, vilket ger en tydlig navigation och bättre separation mellan vyer.

För att nå VG-kravet har jag implementerat dynamisk routing. Genom att använda :id i routen och hooken useParams i komponenten ReviewDetail, kan appen dynamiskt visa rätt recension baserat på URL:en. Detta skapar en mer professionell SPA-upplevelse där varje milkshake har sin egen unika länk.

### 🧩 Komponentindelning

Varje komponent har ett tydligt ansvar. Exempelvis ansvarar `ReviewCard` endast för presentation och användarinteraktion, medan huvudkomponenten hanterar state, logik och datalagring. Detta följer principen om "single responsibility" och gör komponenterna enklare att testa och underhålla.

### 🔗 Props-lösning

Data och callbacks skickas ner via props från föräldrakomponenter till barnkomponenter. Detta gör dataflödet tydligt och förutsägbart, samtidigt som komponenterna hålls så stateless som möjligt där det är rimligt.

### 🧠 State-lösning

State hanteras lokalt med React hooks (`useState`, `useEffect`). Alla recensioner lagras i `firebase`, vilket gör att applikationen inte är beroende av en backend men ändå kan behålla data mellan omladdningar. Vid ändringar synkas state och `firebase` för att hålla datan konsekvent.

### 🛠️ Problemlösning: React 19 & Hooks
Under projektets gång stötte jag på utmaningar med versionskonflikter mellan React 19 och react-router-dom, vilket resulterade i felet "Invalid hook call". Jag löste detta genom en grundlig omstrukturering av package.json där jag använde overrides för att tvinga projektet att använda en enhetlig React-instans, samt flyttade routerns placering för att garantera att kontexten fanns tillgänglig för alla hooks.

### 🌍 Val av API

Mapbox används för kartvisualisering på grund av dess prestanda och flexibilitet, medan OpenStreetMap Nominatim används för geokodning eftersom det är ett öppet och gratis alternativ, kombinationen ger en bra kartlösning. Jag tänkte först bara använda mig av Mapbox, men fick reda på rätt så sent i utvecklingen att dom inte är jätte starka på att hitta specifika POI's som resturanger o café... :(

---

## 🧱 Tech Stack

* **React** (Vite)
* **React Router** (`react-router-dom`)
* **Mapbox GL JS**
* **OpenStreetMap Nominatim API** (geokodning)
* **Material UI** (Rating-komponent)
* **Lucide Icons**
* **CSS** (CSS-variabler, komponentbaserad styling)

---

## 🚀 Kom igång lokalt

### 1. Klona repot

```bash
git clone https://github.com/ditt-användarnamn/milkshake-reviews.git
cd milkshake-reviews
```

### 2. Installera dependencies

```bash
npm install
```

### 3. Miljövariabler

Projektet använder Mapbox. Skapa en `.env`-fil i root-mappen:

```env
VITE_MAPBOX_TOKEN=din_mapbox_token_här
```

> Du kan skapa en token på [https://www.mapbox.com/](https://www.mapbox.com/)

### 4. Starta projektet

```bash
npm run dev
```

---

## 🗺️ Kartfunktionen

* Alla unika kombinationer av **ställe + plats** geokodas via Nominatim
* Markörer visas på kartan med:

  * genomsnittligt betyg
  * antal recensioner
  * vem/vilka som recenserat
* Loading overlay med progress visas medan platser hämtas

---

## 📁 Projektstruktur (förenklad)

```
src/
├─ components/
│  ├─ ui/
│  │  ├─ ReviewCard.jsx
│  │  ├─ ReviewDetail.jsx
│  │  ├─ StatsCard.jsx ingen kod finns där just nu.
│  │  └─ Badge.jsx
│  └─ pages/
│     ├─ StatsView.jsx
│     ├─ MilkshakeMap.jsx
│     └─ PhotoAlbum.jsx ingen kod finns där just nu.
├─ styles/
│  └─ App.css
├─ App.jsx
└─ main.jsx

```

---

## 💡 Möjliga förbättringar

* Bilduppladdning för recensioner
* Sortering & filtrering (pris, betyg, favorit)
* Koppla recensionerna till en databas som synkar sidan mellan alla användare

---
## 📸 Screenshots
<img width="521" height="875" alt="Screenshot_2" src="https://github.com/user-attachments/assets/d7c0de42-be95-41b8-b7cc-18079047ef6f" />
<img width="517" height="886" alt="Screenshot_3" src="https://github.com/user-attachments/assets/5ce17e6c-82ec-44a3-aea9-e4c062017e39" />
<img width="451" height="889" alt="Screenshot_4" src="https://github.com/user-attachments/assets/d541893b-5169-4677-ba74-40fb40d77735" />
<img width="492" height="875" alt="Screenshot_5" src="https://github.com/user-attachments/assets/7f45e894-27c3-4f11-a326-99f31ad1bc08" />

---

## 👤 Skapad av Mattias Waern

Ett hobby-/portfolio/skolprojekt-projekt byggt med fokus på:

* Lära mig React lol..
* React state management
* UI/UX
* externa API:er
* praktisk frontend-arkitektur

---
