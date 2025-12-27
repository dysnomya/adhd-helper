import pimpus from "../../assets/pimpus_happy_anim.webp";

export default function PetView() {

    return(
        <div>
            <h1>Pimpuś</h1>
            <img src={pimpus} alt="Pimpuś" className="pimpus game-pimpus"/>
            <div>
                <h2>Żarcie</h2>
                <button>Yes</button>
            </div>
        </div>
    );
}