# TODO

Zebrane z komentarzy usuniętych z `index.html` i `styles.css` (2026-09-02), żeby nie zaśmiecać kodu, a nie stracić kontekstu.

## Do zrobienia

- **`og:image`** (1200×630) — czeka na plik od klienta. Bez tego udostępnienia w social media nie pokażą obrazka.
- **Zdjęcia nauczycieli w `#kadra`** — cztery hexagony pokazują obecnie ikonę `fa-chalkboard-user` zamiast realnego zdjęcia. Docelowo podmienić na `<img src="..." alt="Imię Nazwisko">` — sześciokąt (`clip-path`) przytnie automatycznie, `object-fit: cover` wypełni kadr (patrz `.teacher-avatar img` w `styles.css`). Pod kartą Barbary Sajdy był też szkic krótkiego opisu doświadczenia/wykształcenia (`<p class="muted small">[Krótki opis...]</p>`, obecnie usunięty z kodu jako martwy) — dodać z powrotem, gdy pojawi się realna treść.
- **Sekcja `#opinie`** — pełny markup (karty z gwiazdkami i cytatami rodziców/uczniów) był w `index.html` jako zakomentowany, wyłączony blok — ukryty do czasu pierwszych prawdziwych opinii (start szkoły: 2026-09-14). Podczas porządkowania komentarzy został usunięty z pliku; odzyskiwalny z historii gita (commit `93499c5` i późniejsze, przed tym porządkiem). CSS dla `.review-card`/`.stars`/`.review-text`/`.review-name`/`.review-role` w `styles.css` został na razie bez zmian, mimo że jest teraz nieużywany. Przywrócić sekcję i podpiąć realne opinie, gdy będą dostępne.

## Do rozważenia

- Karta "Przygotowanie do matury" (`.offer-featured`) w `#oferta` była wcześniej przygotowana jako wyróżniona karta oferty, ale zakomentowana i nieużywana. Usunięta z `index.html` przy tym samym porządkowaniu; odzyskiwalna z historii gita. Klasa `.offer-featured` została w `styles.css` (reguła na breakpoincie 900px) — jeśli karta nie ma wrócić, warto ją też posprzątać.

## Kontekst (nie zadanie, ale warto wiedzieć)

- `<link rel="preconnect">` do domen Google Maps w `<head>` skraca czas połączenia zanim iframe w `#kontakt` (`loading="lazy"`) zacznie się ładować — nie usuwać bez zastąpienia czymś równoważnym.
