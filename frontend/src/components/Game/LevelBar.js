export default function LevelBar(props) {

    const currentExp = props.profile?.currentExp;
    const totalExp = props.profile?.expToNextLevel;

    const percentage = Math.round((currentExp / totalExp) * 100);

    return (
        <div className="game-level-bar">
                <p className="game-level-number game-current-level">{props.profile?.level || 0}</p>
                <div className="game-level-bar-container">
                    <h3>Poziom</h3>
                    <div className="game-level-bar-track">
                        <div
                            className="game-level-bar-fill"
                            style={{ width: `${percentage}%` }}
                        >
                            <span>{currentExp}</span>
                        </div>
                    </div>
                    <div className="game-level-bar-scale">
                        <p>0</p>
                        <p>{totalExp || 0}</p>
                    </div>
                </div>
                <p className="game-level-number game-next-level">{props.profile?.level ? props.profile.level + 1 : 1}</p>
            </div>
    );

}