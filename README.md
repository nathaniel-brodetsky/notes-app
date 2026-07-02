# NoteKeeper — Aplicație Web de Notițe

Aplicație web de tip **Single Page Application (SPA)**, dezvoltată în cadrul practicii de specialitate, folosind exclusiv **HTML5, CSS3 și JavaScript (Vanilla, ES6)** — fără framework-uri sau dependențe externe.

**Demo live:** `https://nathaniel-brodetsky.github.io/notes-app/`

---

## Funcționalități

- **Adăugare** notițe cu titlu, conținut, categorie (etichetă colorată) și dată automată
- **Editare** notițe existente
- **Ștergere** notițe (cu confirmare)
- **Căutare dinamică** — filtrare instantă după titlu sau conținut, fără reîncărcarea paginii
- **Persistență locală** — datele sunt salvate în `localStorage`, disponibile după închiderea browserului
- **Design responsiv** — Flexbox + CSS Grid, adaptat pentru mobil, tabletă și desktop
- UI modern, cu efecte de hover și animații subtile

---

## Tehnologii utilizate

| Tehnologie   | Rol                                      |
|--------------|-------------------------------------------|
| HTML5        | Structura semantică a paginii             |
| CSS3         | Stilizare, layout responsiv (Flexbox/Grid)|
| JavaScript ES6 | Logică aplicativă, CRUD, LocalStorage   |

Fără framework-uri, fără build tools — codul rulează direct în browser.

---

## Structura proiectului

```
notes-app/
├── index.html      # Structura HTML a aplicației
├── style.css        # Stiluri și design responsiv
├── script.js         # Logica aplicației (CRUD, LocalStorage, căutare)
└── README.md
```

---

## Rulare locală

Nu necesită instalare sau server. Este suficient să deschizi `index.html` direct în browser:

```bash
git clone https://github.com/nathaniel-brodetsky/notes-app.git
cd notes-app
# deschide index.html în browser (dublu-click sau Live Server)
```

---

## Structura unei notițe (LocalStorage)

Fiecare notiță este salvată sub formă de obiect JSON:

```json
{
  "id": "note_1719900000000_x7f3a2",
  "title": "Titlul notiței",
  "content": "Conținutul notiței.",
  "category": "blue",
  "createdAt": "2026-07-02T10:15:00.000Z",
  "updatedAt": "2026-07-02T10:20:00.000Z"
}
```

---

## Deployment

Aplicația este publicată gratuit prin **GitHub Pages**, direct din branch-ul `main`. Orice actualizare pe `main` se reflectă automat pe site-ul live, disponibil la `https://nathaniel-brodetsky.github.io/notes-app/`.

---

## Autor

Proiect realizat în cadrul practicii de specialitate (Caiet de practică) — 2026.