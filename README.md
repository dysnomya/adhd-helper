# ADHD Helper


---

## Opis

Celem projektu jest zaprojektowanie i zaimplementowanie prototypu aplikacji internetowej ADHDHelper, mającej na celu wspomaganie codziennego funkcjonowania osób z Zespołem Nadpobudliwości Psychoruchowej z Deficytem Uwagi (ADHD). 

Stworzono responsywną aplikację typu Single Page Application (SPA), która łączy funkcjonalności klasycznego planera zadań z elementami grywalizacji, mechanizmu body-double oraz automatyzacją z wykorzystaniem modelu językowego. System integruje moduł zarządzania zadaniami z modułem grywalizacji, który poprzez system nagród i mechanizm walk z przeciwnikami motywuje użytkownika do wykonywania zadeklarowanych przez siebie zadań. Aplikacja pozwala również na podzielenie złożonych zadań na podzadania z wykorzystaniem API Google Gemini, aby ułatwić użytkownikowi proces decyzyjny i przedstawić zadanie w bardziej przyswajalny sposób. 

Warstwa kliencka (frontend) została zrealizowana z wykorzystaniem biblioteki React w architekturze komponentowej.  Aby zapobiec przebodźcowaniu zastosowano mechanizmy grupowania, sortowania oraz filtrowania zadań, a sam interfejs został zaprojektowany w minimalistyczny sposób z wykorzystaniem Sassy Cascading Style Sheets (SCSS). Warstwa serwerowa (backend) została zaimplementowana w języku Java z wykorzystaniem frameworka Spring Boot. Odpowiada ona za komunikację z bazą danych przechowującą dane o użytkownikach, ich zadaniach i elementach grywalizacji.

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


1. Zbuduj projekt:

   ```bash
   mvn clean install
   ```

2. Uruchom aplikację:

   ```bash
   mvn spring-boot:run
   ```
---

## Status projektu

Projekt w fazie rozwoju 

---

## Licencja

Licencja MIT.
