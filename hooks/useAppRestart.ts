import { useState, useCallback } from 'react';

export default function useAppRestart() {
    const [key, setKey] = useState(0);
    const restartApp = useCallback(() => {
        setKey((prevKey) => prevKey + 1);
    }, []);

    return { key, restartApp };
}