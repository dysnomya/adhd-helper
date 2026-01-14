import BossView from "../components/Game/BossView";
import LevelBar from "../components/Game/LevelBar";
import PetView from "../components/Game/PetView";
import "../styles/game.scss";
import { useProfileData } from "../hooks/UseProfileData";

export default function Game() {
    //const [isDmgDealt, setIsDmgDealt] = useState(false);

    const {
        profileData, dmgDealt, isDmgDealt, isLevelUp, isBossDefeated, userData, isLoading, updateProfileData, updateBossData
    } = useProfileData();

    const feed = (amount) => {
        updateProfileData(amount);
    };

    const fight = () => {
        updateBossData();
    }

    return (
        <div className="game-layout">
            {isLoading && (
                <div className='game-loading-overlay'>
                    <div className="game-spinner"></div>
                </div>
            )}

            <div className={`game-card ${isLevelUp ? 'game-highlight' : ''}`}>
                <LevelBar profile={profileData} />
            </div>
            <div className={`game-card game-name-title ${isBossDefeated ? 'game-highlight-jump' : ''}`}>
                <h1>{userData?.name + ' ' + userData?.lastName}</h1>
                <h3 className="game-title">{profileData?.currentTitle ? profileData.currentTitle : "Jeszcze bez specjalnych zasług"}</h3>
            </div>
            <div className="game-card">
                <PetView profile={profileData} feedFunction={feed} animation={isLevelUp} />
            </div>
            <div className="game-card">
                <BossView profile={profileData} dmg={dmgDealt} fightFunction={fight} animation={isBossDefeated} dmgAnimation={isDmgDealt} />
            </div>
        </div>
    );
}