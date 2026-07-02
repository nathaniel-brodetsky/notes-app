/* =========================================================
   NOTES APP — MAIN LOGIC (Vanilla JavaScript ES6)
   Handles: CRUD operations, LocalStorage persistence,
   dynamic rendering, and live search filtering.
   ========================================================= */

'use strict';

// ----- Constants -----
const STORAGE_KEY = 'notekeeper_notes';

// ----- DOM references -----
const notesGrid      = document.getElementById('notesGrid');
const notesCountEl   = document.getElementById('notesCount');
const emptyStateEl   = document.getElementById('emptyState');
const noResultsEl    = document.getElementById('noResults');

const noteIdInput      = document.getElementById('noteId');
const noteTitleInput   = document.getElementById('noteTitle');
const noteContentInput = document.getElementById('noteContent');
const noteCategoryInput = document.getElementById('noteCategory');
const formTitleEl      = document.getElementById('formTitle');
const formErrorEl      = document.getElementById('formError');

const saveBtn        = document.getElementById('saveBtn');
const cancelEditBtn   = document.getElementById('cancelEditBtn');
const searchInput     = document.getElementById('searchInput');

// ----- Application state -----
// notes: Array of note objects, kept in memory and synced with localStorage
let notes = [];

/**
 * Loads notes from localStorage into memory.
 * If nothing is stored yet (first run), initializes an empty array.
 */
function loadNotes() {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    notes = raw ? JSON.parse(raw) : [];
  } catch (err) {
    // If stored data is corrupted, fail safely with an empty list
    console.error('Eroare la citirea notițelor din localStorage:', err);
    notes = [];
  }
}

/**
 * Persists the current in-memory `notes` array to localStorage.
 */
function saveNotesToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

/**
 * Generates a reasonably unique ID for a new note.
 * Combines timestamp with a random suffix to avoid collisions.
 */
function generateId() {
  return `note_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Formats an ISO date string into a readable Romanian-style date/time.
 * Example: "02.07.2026, 14:35"
 */
function formatDate(isoString) {
  const d = new Date(isoString);
  const day   = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year  = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const mins  = String(d.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year}, ${hours}:${mins}`;
}

/**
 * Escapes HTML special characters to prevent injection when
 * rendering user-provided text into the DOM via innerHTML.
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Renders the notes grid based on the current `notes` array
 * and the optional search query.
 */
function renderNotes() {
  const query = searchInput.value.trim().toLowerCase();

  // Filter notes dynamically by title or content
  const filtered = notes.filter(note => {
    if (!query) return true;
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  // Sort newest first
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  // Update counter
  notesCountEl.textContent = `${notes.length} notiț${notes.length === 1 ? 'ă' : 'e'}`;

  // Clear grid
  notesGrid.innerHTML = '';

  // Handle empty states
  emptyStateEl.classList.toggle('hidden', notes.length !== 0);
  noResultsEl.classList.toggle('hidden', !(notes.length > 0 && filtered.length === 0));

  // Build cards
  sorted.forEach(note => {
    const card = document.createElement('article');
    card.className = `note-card tag-${note.category}`;
    card.dataset.id = note.id;

    card.innerHTML = `
      <div class="note-card-header">
        <h3 class="note-title">${escapeHtml(note.title)}</h3>
      </div>
      <p class="note-content">${escapeHtml(note.content)}</p>
      <div class="note-footer">
        <span class="note-date">${formatDate(note.updatedAt)}</span>
        <div class="note-actions">
          <button class="icon-btn edit" title="Editează" data-action="edit">✏️</button>
          <button class="icon-btn delete" title="Șterge" data-action="delete">🗑️</button>
        </div>
      </div>
    `;

    notesGrid.appendChild(card);
  });
}

/**
 * Resets the form back to "create new note" state.
 */
function resetForm() {
  noteIdInput.value = '';
  noteTitleInput.value = '';
  noteContentInput.value = '';
  noteCategoryInput.value = 'yellow';
  formTitleEl.textContent = 'Adaugă o notiță nouă';
  saveBtn.textContent = 'Salvează';
  cancelEditBtn.classList.add('hidden');
  formErrorEl.classList.add('hidden');
}

/**
 * Validates and saves a note (handles both CREATE and UPDATE).
 */
function handleSave() {
  const title = noteTitleInput.value.trim();
  const content = noteContentInput.value.trim();
  const category = noteCategoryInput.value;
  const editingId = noteIdInput.value;

  // Basic validation: title and content must not be empty
  if (!title || !content) {
    formErrorEl.classList.remove('hidden');
    return;
  }
  formErrorEl.classList.add('hidden');

  const now = new Date().toISOString();

  if (editingId) {
    // ----- UPDATE existing note -----
    const note = notes.find(n => n.id === editingId);
    if (note) {
      note.title = title;
      note.content = content;
      note.category = category;
      note.updatedAt = now;
    }
  } else {
    // ----- CREATE new note -----
    const newNote = {
      id: generateId(),
      title,
      content,
      category,
      createdAt: now,
      updatedAt: now,
    };
    notes.push(newNote);
  }

  saveNotesToStorage();
  renderNotes();
  resetForm();
}

/**
 * Loads a note's data into the form for editing.
 */
function handleEdit(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;

  noteIdInput.value = note.id;
  noteTitleInput.value = note.title;
  noteContentInput.value = note.content;
  noteCategoryInput.value = note.category;

  formTitleEl.textContent = 'Editează notița';
  saveBtn.textContent = 'Actualizează';
  cancelEditBtn.classList.remove('hidden');

  // Scroll form into view (useful on mobile)
  document.querySelector('.note-form-card').scrollIntoView({ behavior: 'smooth' });
  noteTitleInput.focus();
}

/**
 * Deletes a note after user confirmation.
 */
function handleDelete(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;

  const confirmed = confirm(`Ești sigur că vrei să ștergi notița "${note.title}"?`);
  if (!confirmed) return;

  notes = notes.filter(n => n.id !== id);
  saveNotesToStorage();
  renderNotes();

  // If we were editing the note that just got deleted, reset the form
  if (noteIdInput.value === id) {
    resetForm();
  }
}

/**
 * Event delegation handler for edit/delete buttons inside note cards.
 */
function handleGridClick(event) {
  const btn = event.target.closest('.icon-btn');
  if (!btn) return;

  const card = event.target.closest('.note-card');
  const id = card.dataset.id;
  const action = btn.dataset.action;

  if (action === 'edit') handleEdit(id);
  if (action === 'delete') handleDelete(id);
}

// ----- Event listeners -----
saveBtn.addEventListener('click', handleSave);
cancelEditBtn.addEventListener('click', resetForm);
notesGrid.addEventListener('click', handleGridClick);
searchInput.addEventListener('input', renderNotes);

// Allow submitting the form with Enter key while inside the title field
noteTitleInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSave();
});

// ----- App initialization -----
function init() {
  loadNotes();
  renderNotes();
}

document.addEventListener('DOMContentLoaded', init);
