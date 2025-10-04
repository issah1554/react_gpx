import { createContext, useContext, useState, type ReactNode } from "react";

interface UIContextType {
    showProfile: boolean;
    setShowProfile: (value: boolean) => void;

    showNotifications: boolean;
    setShowNotifications: (value: boolean) => void;

    showSettings: boolean;
    setShowSettings: (value: boolean) => void;

    notifications: string[];
    addNotification: (message: string) => void;

    logout: () => void;

    // 🔹 New settings
    brightness: number;
    setBrightness: (value: number) => void;

    transparency: number;
    setTransparency: (value: number) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [notifications, setNotifications] = useState<string[]>([]);

    // 🔹 New states
    const [brightness, setBrightness] = useState(1);   // 1 = normal brightness
    const [transparency, setTransparency] = useState(0.5); // 0 = fully transparent, 1 = solid

    const addNotification = (message: string) => {
        setNotifications((prev) => [...prev, message]);
    };

    const logout = () => {
        console.log("Logging out…");
        // clear auth, reset state, etc.
    };

    return (
        <UIContext.Provider
            value={{
                showProfile,
                setShowProfile,
                showNotifications,
                setShowNotifications,
                showSettings,
                setShowSettings,
                notifications,
                addNotification,
                logout,
                brightness,
                setBrightness,
                transparency,
                setTransparency,
            }}
        >
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const ctx = useContext(UIContext);
    if (!ctx) throw new Error("useUI must be used inside UIProvider");
    return ctx;
}
