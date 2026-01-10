import { useState, useEffect, useCallback } from "react";
import { feedPimpus, fetchProfileInfo } from "../api/GameApi";
import { fetchUserInfo } from "../api/UserApi";

export const useProfileData = () => {
    const [profileData, setProfileData] = useState(null);
    const [isLevelUp, setIsLevelUp] = useState(false);
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
            if (e.message === '401 Unauthorized') {
                localStorage.removeItem("token");
            } else {
                console.error("Błąd pobierania danych:", e);
                setError(e);
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
            if (e.message === '401 Unauthorized') {
                localStorage.removeItem("token");
            } else {
                console.error("Błąd pobierania danych:", e);
                setError(e);
            }
        }
    };

    useEffect(() => {
        loadData();
    }, [loadData]);

    return { profileData, isLevelUp, userData, isLoading, error, updateProfileData };
};