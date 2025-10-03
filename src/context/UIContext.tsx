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
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [notifications, setNotifications] = useState<string[]>([]);

    const addNotification = (message: string) => {
        setNotifications((prev) => [...prev, message]);
    };

    const logout = () => {
        console.log("Logging out…");
        // 🔹 Here you can clear auth tokens, reset state, redirect, etc.
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
