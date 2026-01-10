import boss from "../../assets/pimpus_bad_2_anim.webp";

export default function BossView() {

    return (
        <div className="game-boss-bg">
            <h1>Błąd. James Błąd.</h1>
            <h3>Poziom 69</h3>
            <img src={boss} alt="Boss" className="game-boss" />
            <div className="boss-button-container">
                <button className="boss-button">Walcz</button>
            </div>
        </div>
    );
}