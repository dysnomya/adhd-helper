import BossView from "../components/Game/BossView";
import LevelBar from "../components/Game/LevelBar";
import PetView from "../components/Game/PetView";
import "../styles/game.scss";

export default function Game() {

    return (
        <div className="game-layout">
            <div className="game-card">
                <LevelBar />
            </div>
            <div className="game-card game-name-title">
                <h1>Imię nazwisko</h1>
                <h3 className="game-title">Tytuł des tytules labadules</h3>
            </div>
            <div className="game-card">
                <PetView />
            </div>
            <div className="game-card">
                <BossView />
            </div>
        </div>
    );
}