import pimpus from "../../assets/pimpus_happy_anim.webp";

export default function PetView(props) {

    return (
        <div className="game-pet-container">
            <h1 className="game-pet-name">Pimpuś</h1>
            <div className={` ${props.animation ? 'pimpus-jump' : ''}`}>
                <img src={pimpus} alt="Pimpuś" className="pimpus game-pimpus" />
            </div>
            <div className="game-food-container">
                <h2>Dostępne jedzonko: {props.profile?.inventoryPoints}</h2>
                <div className="game-food-buttons-container">
                    <button
                        className="game-food-button"
                        onClick={() => props.feedFunction(1)}
                        disabled={props.profile?.inventoryPoints < 1}>Daj 1</button>
                    <button
                        className="game-food-button"
                        onClick={() => props.feedFunction(10)}
                        disabled={props.profile?.inventoryPoints < 10}>Daj 10</button>
                </div>
            </div>
        </div>
    );
}