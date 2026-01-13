import { ReactComponent as SadPimpus } from "../assets/pimpus_sad.svg";

export default function ErrorCard() {
    return (
        <div className="server-data-error-main">
            <div className="server-data-error">
                <SadPimpus className="sad-pimpus"></SadPimpus>
                <p className="blad-serwera">Błąd połączenia z serwerem</p>
                <p>Coś poszło nie tak. Sprawdź połączenie z internetem.</p>
            </div>
        </div>
    );
}