import boss from "../../assets/pimpus_bad_2_anim.webp";

export default function BossView(props) {
    const currentBossHp = props.profile?.currentBossHp;
    const totalBossHp = props.profile?.currentBoss.maxHp;

    const percentage = Math.round((currentBossHp / totalBossHp) * 100);

    return (
        <div className="game-boss-bg" style={{ filter: 'hue-rotate(' + props.profile?.currentBoss.colorHueRotate + 'deg)' }}>
            <h1>{props.profile?.currentBoss.name}</h1>
            <h3>Poziom {props.profile?.currentBoss.bossLevel}</h3>
            <img src={boss} alt="Boss" className="game-boss" />
            <div className="game-boss-hp-bar-container">
                <div className="game-boss-hp-bar-track">
                    <div
                        className="game-boss-hp-bar-fill"
                        style={{ width: `${percentage || 0}%` }}
                    >
                        <span>{props.profile?.currentBossHp}</span>
                    </div>
                </div>
                <div className="game-boss-hp-bar-scale">
                    <p>0</p>
                    <p>{props.profile?.currentBoss.maxHp || 0}</p>
                </div>
            </div>
            <div className="boss-button-container">
                <button className="boss-button">Walcz</button>
            </div>
        </div>
    );
}