import boss from "../../assets/pimpus_bad_2_anim.webp";

export default function BossView(props) {
    return (
        <div className="game-boss-bg" style={{filter: 'hue-rotate(' + props.profile?.currentBoss.colorHueRotate + 'deg)'}}>
            <h1>{props.profile?.currentBoss.name}</h1>
            <h3>Poziom {props.profile?.currentBoss.requiredLevel}</h3>
            <img src={boss} alt="Boss" className="game-boss" />
            <div className="boss-button-container">
                <button className="boss-button">Walcz</button>
            </div>
        </div>
    );
}