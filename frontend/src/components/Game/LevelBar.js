export default function LevelBar() {

    const currentExp = 80;
    const totalExp = 100;

    const percentage = Math.round((currentExp / totalExp) * 100);

    return (
        <div className="game-level-bar">
                <p className="game-level-number game-current-level">0</p>
                <div className="game-level-bar-container">
                    <h3>Poziom</h3>
                    <div className="game-level-bar-track">
                        <div
                            className="game-level-bar-fill"
                            style={{ width: `${percentage}%` }}
                        >
                        </div>
                    </div>
                    <div className="game-level-bar-scale">
                        <p>0</p>
                        <p>100</p>
                    </div>
                </div>
                <p className="game-level-number game-next-level">1</p>
            </div>
    );

}