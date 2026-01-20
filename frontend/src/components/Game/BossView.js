import boss from "../../assets/pimpus_bad_2_anim.webp";
import bossStill from "../../assets/pimpus_bad_2.webp";

export default function BossView(props) {
    const currentBossHp = props.profile?.currentBossHp || 0;
    const totalBossHp = props.profile?.currentBoss?.maxHp || 1;

    const percentage = Math.round((currentBossHp / totalBossHp) * 100);

    if (props.profile != null && props.profile.currentBoss == null) {
        return (
            <div className={`game-boss-bg ${props.animation ? 'game-boss-die-shake' : ''}`}>
                <h2>Pokonałeś wszystkich bossów dostępnych w tej wersji aplikacji! Gratulacje!</h2>
                <div className="pimpek-rotate">
                    <img src={bossStill} alt="Boss" className="game-boss" />
                </div>
            </div>
        );
    }

    return (
        <div
            className={`game-boss-bg ${props.animation ? 'game-boss-die-shake' : ''}`}
            style={{ filter: 'hue-rotate(' + props.profile?.currentBoss.colorHueRotate + 'deg)' }}
        >
            <h1>{props.profile?.currentBoss?.name}</h1>
            <h3>Poziom {props.profile?.currentBoss?.bossLevel}</h3>
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
                    <p>{props.profile?.currentBoss?.maxHp || 0}</p>
                </div>
            </div>
            <div className="boss-button-container">
                <button
                    className="boss-button"
                    onClick={() => {
                        if (props.profile == null) {
                            return;
                        }
                        else if (props.profile?.bossfightAttempts > 0) {
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