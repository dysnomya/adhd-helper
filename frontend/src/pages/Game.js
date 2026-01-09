import { useState, useEffect } from "react";
import BossView from "../components/Game/BossView";
import LevelBar from "../components/Game/LevelBar";
import PetView from "../components/Game/PetView";
import { fetchProfileInfo, feedPimpus } from "../api/GameApi";
import "../styles/game.scss";
import { useProfileData } from "../hooks/UseProfileData";

export default function Game() {
    const {
        profileData, isLoading, error, updateProfileData
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

            <div className="game-card">
                <LevelBar profile={profileData} />
            </div>
            <div className="game-card game-name-title">
                <h1>Imię nazwisko</h1>
                <h3 className="game-title">{profileData?.currentTitle ? profileData.currentTitle : "Jeszcze bez specjalnych zasług"}</h3>
            </div>
            <div className="game-card">
                <PetView profile={profileData} feedFunction={feed} />
            </div>
            <div className="game-card">
                <BossView profile={profileData} />
            </div>
        </div>
    );
}