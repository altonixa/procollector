import { useState } from 'react';

interface GeolocationData {
    latitude: number;
    longitude: number;
    accuracy: number;
    timestamp: string;
}

interface UseGeolocationReturn {
    location: GeolocationData | null;
    error: string | null;
    isLoading: boolean;
    captureLocation: () => Promise<GeolocationData>;
}

export function useGeolocation(): UseGeolocationReturn {
    const [location, setLocation] = useState<GeolocationData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const captureLocation = (): Promise<GeolocationData> => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                const errorMsg = 'Geolocation is not supported by your browser';
                setError(errorMsg);
                reject(new Error(errorMsg));
                return;
            }

            setIsLoading(true);
            setError(null);

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const locationData: GeolocationData = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        timestamp: new Date().toISOString()
                    };

                    setLocation(locationData);
                    setIsLoading(false);
                    resolve(locationData);
                },
                (error) => {
                    let errorMsg = 'Failed to get location';

                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMsg = 'Location permission denied. Please enable location access.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMsg = 'Location information unavailable.';
                            break;
                        case error.TIMEOUT:
                            errorMsg = 'Location request timed out.';
                            break;
                    }

                    setError(errorMsg);
                    setIsLoading(false);
                    reject(new Error(errorMsg));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    };

    return {
        location,
        error,
        isLoading,
        captureLocation
    };
}
