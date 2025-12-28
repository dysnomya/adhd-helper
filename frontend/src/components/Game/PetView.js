import pimpus from "../../assets/pimpus_happy_anim.webp";

export default function PetView() {

    return (
        <div className="game-pet-container">
            <h1 className="game-pet-name">Pimpuś</h1>
            <img src={pimpus} alt="Pimpuś" className="pimpus game-pimpus" />
            <div className="game-food-container">
                <h2>Dostępne jedzonko: 5</h2>
                <div className="game-food-buttons-container">
                    <button className="game-food-button">Daj 1</button>
                    <button className="game-food-button" disabled={true}>Daj 10</button>
                </div>
            </div>
        </div>
    );
}