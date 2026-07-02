# NoteKeeper — Aplicație Web de Notițe

Aplicație web de tip **Single Page Application (SPA)**, dezvoltată în cadrul practicii de specialitate, folosind exclusiv **HTML5, CSS3 și JavaScript (Vanilla, ES6)** — fără framework-uri sau dependențe externe.

**Demo live:** [https://notes-app228.netlify.app/](https://notes-app228.netlify.app/)

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

Aplicația este disponibilă online la adresa de mai sus, dar poate fi rulată și local, fără instalare sau server:

1. Descarcă sau clonează folderul cu cele trei fișiere (`index.html`, `style.css`, `script.js`), păstrându-le împreună în același director.
2. Dă dublu-click pe `index.html`.
3. Aplicația se va deschide direct în browser (Chrome, Firefox, Edge etc.), complet funcțională.

Opțional, pentru clonare din Git:

```bash
git clone https://github.com/nathaniel-brodetsky/notes-app.git
cd notes-app
# deschide index.html direct în browser
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

Codul sursă este versionat prin **Git** și publicat pe **GitHub**. Aplicația a fost desfășurată public prin platforma **Netlify** (Netlify Drop), fiind disponibilă online la adresa `https://notes-app228.netlify.app/`, fără a necesita configurarea unui server propriu. Aplicația poate fi rulată și local, prin deschiderea directă a fișierului `index.html` în orice browser modern.

---

## Autor

Proiect realizat în cadrul practicii de specialitate (Caiet de practică) — 2026.