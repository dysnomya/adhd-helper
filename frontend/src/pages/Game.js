import { useState, useEffect } from "react";
import BossView from "../components/Game/BossView";
import LevelBar from "../components/Game/LevelBar";
import PetView from "../components/Game/PetView";
import { fetchProfileInfo, feedPimpus } from "../api/GameApi";
import "../styles/game.scss";
import { useProfileData } from "../hooks/UseProfileData";

export default function Game() {
    const {
        profileData, userData, isLoading, error, updateProfileData
    } = useProfileData();

    const [lvlUpAnim, setLvlUpAnim] = useState(false)

    const feed = (amount) => {
        if (amount >= profileData.expToNextLevel - profileData.currentExp) {
            console.log("AAAA");
            setLvlUpAnim(true);
            setTimeout(() => setLvlUpAnim(false), 1000);
        }
        updateProfileData(amount);
    };

    return (
        <div className="game-layout">
            {isLoading && (
                <div className='game-loading-overlay'>
                    <div className="game-spinner"></div>
                </div>
            )}

            <div className={`game-card ${lvlUpAnim ? 'game-highlight' : ''}`}>
                <LevelBar profile={profileData} />
            </div>
            <div className="game-card game-name-title">
                <h1>{userData?.name + ' ' + userData?.lastName}</h1>
                <h3 className="game-title">{profileData?.currentTitle ? profileData.currentTitle : "Jeszcze bez specjalnych zasług"}</h3>
            </div>
            <div className="game-card">
                <PetView profile={profileData} feedFunction={feed} animation={lvlUpAnim} />
            </div>
            <div className="game-card">
                <BossView profile={profileData} />
            </div>
        </div>
    );
}