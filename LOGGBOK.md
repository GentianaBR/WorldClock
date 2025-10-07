
---

## `LOGGBOK.md`

```markdown
# Loggbok – World Clock

> En post per arbetspass räcker. Kort, konkret och i kronologisk ordning.

## 2025-09-26
**Mål:** Setup + basstruktur.  
**Gjort:**
- Initierade Vite (React + TS) och Bootstrap.
- Skapade `types.ts` och hooks (`useLocalStorage`, `useNow`).
- Grundlayout i `App.tsx`.
**Git:**
- `chore: init project`
- `feat: add types and base hooks`
**Problem/Lösning:**
- State/handler-fel → flyttade hooks in i komponenten.
**Nästa steg:** CityPicker + rutt för detaljvy.

## 2025-09-27
**Mål:** CityPicker (modal) och klocklista.  
**Gjort:**
- Modal med sök och populära städer.
- Horisontell scroll-lista med klockor.
- Toggles: digital/analog, 24h/12h, sekunder.
**Git:**
- `feat: CityPicker modal with search`
- `feat: horizontal clock list`
**Problem/Lösning:**
- Layout-”wrap” på små skärmar → justerade gap och knappar.
**Nästa steg:** Detaljvy + bakgrundsbild.

## 2025-09-30
**Mål:** Detaljvy per stad.  
**Gjort:**
- `CityDetailPage` med helskärmsbakgrund + overlay.
- Ta bort stad från detaljvyn.
**Git:**
- `feat: CityDetailPage with image background`
**Problem/Lösning:**
- Trasiga bildlänkar → fallbacklista + `onError` hoppar till nästa.
**Nästa steg:** Automatisk bild för nya städer.

## 2025-10-01
**Mål:** Kontinentgrupper + auto-bilder.  
**Gjort:**
- Grupperade populära städer per kontinent i modal.
- `imageSetForContinent` ger 4 picsum-URL:er per ny stad.
- `useEffect` i `App.tsx` kompletterar saknade `imageUrl`.
**Git:**
- `feat: continent groups`
- `feat: auto continent images`
- `fix: fill missing imageUrl on mount`
**Problem/Lösning:**
- Gamla data i localStorage → la till “Återställ”.
**Nästa steg:** Städa CSS + dokumentation.

## 2025-10-05
**Mål:** Finputs + dokumentation.  
**Gjort:**
- Städade `index.css` så det inte krockar med Bootstrap.
- Skrev README + loggbok.
**Git:**
- `docs: add README and LOGGBOK`
- `chore: tag v1.0.0`
**Problem/Lösning:**
- Mindre UI-justeringar.
**Nästa steg:** Inlämning.
