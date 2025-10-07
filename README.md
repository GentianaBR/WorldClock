#  World Clock – React + TypeScript

En responsiv världsklocka där användaren kan:
- Lägga till städer **från en lista (grupperad per kontinent)** eller som **egen stad** med valfri IANA-tidszon
- Växla mellan **digital** och **analog** klocka
- Välja **24h/12h** och visa/dölja **sekunder**
- Spara val i **localStorage** (laddas automatiskt vid nästa besök)
- Öppna **detaljvy** per stad med **bakgrundsbild** (fungerar även utan egen bild via stabila fallbacks)

---

##  Demo & skisser

- 🔧 **Live demo:** _länk till Netlify/Vercel eller GitHub Pages_
- 🔧 **Skisser/Wireframes:** _länk till Figma/Bilder_
  - Mobil: horisontell scroll-lista för klockor, “Välj storstad” öppnar modal
  - Desktop: luftig layout; detaljvy med helskärmsbild + mörk overlay för läsbarhet

---

##  Teknik

- **React** (funktionella komponenter + hooks)
- **TypeScript** (strikta typer; string literal types/enum för tidszoner)
- **Vite** (dev-server + build)
- **React Router** (separat route: `/city/:id`)
- **Bootstrap** (layout/komponenter)
- Egen logik: **bilder per kontinent** och **tidshantering** (date-fns-tz)

---

##  User stories (urval)

Som **användare** vill jag…

1. …kunna **lägga till städer** från en lista så att jag snabbt hittar vanliga tidszoner.
2. …kunna **lägga till en egen stad** + IANA-tidszon för platser som saknas.
3. …växla **digital/analog**, **24h/12h** och **visa/dölja sekunder** för att få min preferens.
4. …öppna en **detaljvy** per stad med **bakgrundsbild** för en snyggare upplevelse.
5. …att **mina val sparas** så att de finns kvar vid nästa besök (localStorage).

**Acceptanskriterier (exempel):**
- Nya städer syns direkt och visar korrekt lokal tid.
- Digital ⇄ Analog, 12h/24h och sekunder påverkar visningen omedelbart.
- Detaljvy visar bakgrundsbild även om `imageUrl` saknas (fallback används).
- Sidan kommer ihåg städer/inställningar mellan besök.

---

##  Projektstruktur

```text
src/
├─ App.tsx                 # Startvy: navbar, reglage, klock-lista (horisontell), CityPicker
├─ routes/
│  └─ CityDetailPage.tsx   # Detaljvy med bakgrundsbild + tid
├─ components/
│  ├─ CityPicker.tsx       # Modal + formulär (populära städer per kontinent / egen stad)
│  └─ ClockAnalog.tsx      # Analog klocka (SVG)
├─ hooks/
│  ├─ useLocalStorage.ts   # Synkar state <-> localStorage (generisk)
│  └─ useNow.ts            # Tids-ticker (1000ms eller 60000ms)
├─ utils/
│  ├─ time.ts              # formatTime, analogAngles, timePartsInTz
│  └─ images.ts            # imageSetForContinent(...) / imageSetFor(...)
├─ types.ts                # AppState, City, Settings, TimeZoneId m.m.
├─ main.tsx                # Router (/, /city/:id)
└─ index.css               # Basstilar (inkl. modal/grid)
