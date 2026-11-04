# Come si costruisce il gioco (per gli aggiornamenti)

Il gioco online è `index.html` nella cartella principale. Si costruisce così:

```bash
cd sorgenti
rm -rf vita9 && cp -r vita8 vita9
INLINE3=1 python3 edits9.py          # inserisce i moduli v9/*.js in vita9/index.html (three.js incluso)
{ printf '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'; cat vita9/index.html; } > ../index.html
rm -rf vita9
```

- Ogni funzione nuova va in un modulo `v9/nome9.js` e si registra in `edits9.py` (riga `rep("function drawPalazzo(a){",P('nome9.js')+...)`).
- Per aggiungere comportamenti si "avvolge" una funzione: `{const _x=fn;fn=function(){const r=_x.apply(this,arguments);...;return r}}` (solo per `function`, non per `const`).
- Attenzione ai nomi globali già usati (es. `CL9` è delle nuvole, `ST9`, `PZ9`).
- Regole: gioco per bambini, niente marchi veri, non togliere mai funzioni che ci sono già.
- Test (Playwright, Chromium già installato): `node test/terrB.js` (errori JS, usa DIR=cartella), poi gli altri in `test/`. Per i test 3D: `NOROUTE=1 DIR=vita9 node test/t3t.js`.
- Gli account online usano Firebase (progetto `gioco-della-vita-pm`), modulo `v9/online9.js`; pagina admin `admin.html`, privacy `privacy.html`.
- Ogni aggiornamento mensile: in `v9/novita9.js` cambia `NOV9.k` (es. '2026-12') e la lista `NOV9.l` con le novità del mese, così chi gioca vede la finestra "Novità".
