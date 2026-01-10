import { useState, useEffect } from "react";
import BossView from "../components/Game/BossView";
import LevelBar from "../components/Game/LevelBar";
import PetView from "../components/Game/PetView";
import { fetchProfileInfo, feedPimpus } from "../api/GameApi";
import "../styles/game.scss";
import { useProfileData } from "../hooks/UseProfileData";

export default function Game() {
    const {
        profileData, isLevelUp, userData, isLoading, error, updateProfileData
    } = useProfileData();

    const feed = (amount) => {
        updateProfileData(amount);
    };

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
            <div className="game-card game-name-title">
                <h1>{userData?.name + ' ' + userData?.lastName}</h1>
                <h3 className="game-title">{profileData?.currentTitle ? profileData.currentTitle : "Jeszcze bez specjalnych zasług"}</h3>
            </div>
            <div className="game-card">
                <PetView profile={profileData} feedFunction={feed} animation={isLevelUp} />
            </div>
            <div className="game-card">
                <BossView profile={profileData} />
            </div>
        </div>
    );
}