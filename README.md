# ADHD Helper


---

## Wymagania

* Node.js (zalecana wersja 22 LTS)
* npm
* Klucz API do Google Gemini

---

## Uruchomienie projektu (Frontend)

1. Przejdź do katalogu frontend projektu:

   ```bash
   cd frontend
   ```

2. Utwórz plik konfiguracyjny `.env` w katalogu `frontend`.

3. W pliku `.env` dodaj klucz API do Gemini w następującej postaci:

   ```env
   REACT_APP_GEMINI_API_KEY=TU_WSTAW_SWÓJ_KLUCZ_API
   ```

4. Zainstaluj zależności (jeśli nie zostały jeszcze zainstalowane):

   ```bash
   npm install
   ```

5. Uruchom aplikację:

   ```bash
   npm start
   ```

6. Aplikacja powinna uruchomić się lokalnie, domyślnie pod adresem:

   ```
   http://localhost:3000
   ```

---

## Uruchomienie aplikacji (Backend – Java)

### Wymagania

* Java 21+
* Maven

### Uruchomienie przy użyciu Maven

1. Przejdź do katalogu backendu (np. `backend`):

   ```bash
   cd backend
   ```

2. Zbuduj projekt:

   ```bash
   mvn clean install
   ```

3. Uruchom aplikację:

   ```bash
   mvn spring-boot:run
   ```
---

## Status projektu

Projekt w fazie rozwoju 🚧

---

## Licencja

Do uzupełnienia.
