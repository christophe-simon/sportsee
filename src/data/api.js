import React, { useState, useEffect } from 'react';

const userId = 12;
/**
 * Fetch all data from the server for a given user
 * @returns {object} All data required for different charts
 */
export const useFetchAllData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [user, dailyActivity, sessionDuration, performance] = await Promise.all([
                    fetch(`http://localhost:3000/user/${userId}`).then(response => response.json()).then(data => data.data),
                    fetch(`http://localhost:3000/user/${userId}/activity`).then(response => response.json()).then(data => data.data),
                    fetch(`http://localhost:3000/user/${userId}/average-sessions`).then(response => response.json()).then(data => data.data),
                    fetch(`http://localhost:3000/user/${userId}/performance`).then(response => response.json()).then(data => data.data)
                ]);

                setData({ user, dailyActivity, sessionDuration, performance });
            } catch (error) {
                console.error(`Erreur de récupération de toutes les données: `, error);
            }
        };

        fetchData();
    }, []);

    return data;
}