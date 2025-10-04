import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

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

    const [brightness, setBrightness] = useState(() => {
        const saved = localStorage.getItem("brightness");
        return saved ? parseFloat(saved) : 1;
    });

    const [transparency, setTransparency] = useState(() => {
        const saved = localStorage.getItem("transparency");
        return saved ? parseFloat(saved) : 0.5;
    });

    useEffect(() => {
        localStorage.setItem("brightness", brightness.toString());
    }, [brightness]);

    useEffect(() => {
        localStorage.setItem("transparency", transparency.toString());
    }, [transparency]);

    const addNotification = (message: string) => {
        setNotifications((prev) => [...prev, message]);
    };

    const logout = () => {
        console.log("Logging out…");
        // optionally clear settings
        // localStorage.removeItem("brightness");
        // localStorage.removeItem("transparency");
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
