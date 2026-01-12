import boss from "../../assets/pimpus_bad_2_anim.webp";

export default function BossView(props) {
    const currentBossHp = props.profile?.currentBossHp;
    const totalBossHp = props.profile?.currentBoss.maxHp;

    const percentage = Math.round((currentBossHp / totalBossHp) * 100);

    return (
        <div
            className={`game-boss-bg ${props.animation ? 'game-boss-die-shake' : ''}`}
            style={{ filter: 'hue-rotate(' + props.profile?.currentBoss.colorHueRotate + 'deg)' }}
        >
            <h1>{props.profile?.currentBoss.name}</h1>
            <h3>Poziom {props.profile?.currentBoss.bossLevel}</h3>
            <div className={`game-dmg-number ${props.dmgAnimation ? 'game-dmg-show' : ''}`}>{props?.dmg || 0}</div>
            <div className={`${props.animation ? 'game-boss-die' : ''} + ' ' + ${props.dmgAnimation ? 'squish' : ''}`}>
                <img src={boss} alt="Boss" className="game-boss" />
            </div>
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
                <button
                    className="boss-button"
                    onClick={() => {
                        if (props.profile.bossfightAttempts > 0) {
                            props.fightFunction()
                        }
                        else {
                            alert("Brak staminy do walki! Aby zdobyć więcej, dodawaj i rób zadania na stronie ToDo!");
                        }
                    }}
                >
                    Walcz ({props.profile?.bossfightAttempts || 0})
                </button>
            </div>
        </div>
    );
}