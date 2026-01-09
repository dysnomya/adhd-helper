import { useState, useEffect, useCallback } from "react";
import { feedPimpus, fetchProfileInfo } from "../api/GameApi";

export const useProfileData = () => {
    const [profileData, setProfileData] = useState(null);
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
                fetchProfileInfo()
            ]);

            setProfileData(data[0]);
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

    return { profileData, isLoading, error, updateProfileData };
};