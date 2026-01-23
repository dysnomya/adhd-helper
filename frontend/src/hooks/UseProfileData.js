import { useState, useEffect, useCallback } from "react";
import { feedPimpus, fetchProfileInfo, fightBoss } from "../api/GameApi";
import { fetchUserInfo } from "../api/UserApi";

export const useProfileData = () => {
    const [profileData, setProfileData] = useState(null);
    const [dmgDealt, setDmgDealt] = useState(0);
    const [isDmgDealt, setIsDmgDealt] = useState(false);
    const [isLevelUp, setIsLevelUp] = useState(false);
    const [isBossDefeated, setIsBossDefeated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {

        if (!localStorage.getItem("token")) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        try {
            const data = await Promise.all([
                fetchProfileInfo(),
                fetchUserInfo()
            ]);

            setProfileData(data[0]);
            setUserData(data[1]);
        } catch (e) {
            setError(e);
            if (e.message === '401 Unauthorized') {
                localStorage.removeItem("token");
            } else {
                console.error("Błąd pobierania danych:", e);
            }

        } finally {
            setIsLoading(false);
        }

    }, []);

    const updateProfileData = async (amount) => {
        try {
            const data = await Promise.all([
                feedPimpus(amount)
            ]);

            if (profileData != null && data[0].level > profileData.level) {
                setIsLevelUp(true);
                setTimeout(() => setIsLevelUp(false), 1000);
            }

            setProfileData(data[0]);
        } catch (e) {
            setError(e);
            if (e.message === '401 Unauthorized') {
                localStorage.removeItem("token");
            } else {
                console.error("Błąd pobierania danych:", e);
            }
        }
    };

    const updateBossData = async () => {
        try {
            const data = await Promise.all([
                fightBoss()
            ]);

            if (profileData != null && (data[0].profile.currentBoss?.bossLevel > profileData.currentBoss?.bossLevel || data[0].profile.currentBoss == null)) {
                setIsBossDefeated(true);
                setTimeout(() => setIsBossDefeated(false), 1000);
            }
            else {
                setIsDmgDealt(true);
                setTimeout(() => setIsDmgDealt(false), 500);
            }

            setProfileData(data[0].profile);
            setDmgDealt(data[0].damageDealt);
        } catch (e) {
            setError(e);
            if (e.message === '401 Unauthorized') {
                localStorage.removeItem("token");
            } else {
                console.error("Błąd pobierania danych:", e);
            }
        }
    };

    useEffect(() => {
        loadData();
    }, [loadData]);

    return { profileData, dmgDealt, isDmgDealt, isLevelUp, isBossDefeated, userData, isLoading, error, updateProfileData, updateBossData };
};