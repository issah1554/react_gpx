import { useState, useRef, useEffect } from "react";

export default function TopNav() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        setShowProfileMenu(false);
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
        setShowNotifications(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                notifRef.current &&
                !notifRef.current.contains(event.target as Node)
            ) {
                setShowNotifications(false);
            }
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const buttonStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "5px",
        padding: "8px 12px",
        background: "rgba(255, 255, 255, 0.1)",
        border: "none",
        borderRadius: "8px",
        color: "#fff",
        cursor: "pointer",
        transition: "background 0.3s ease, transform 0.2s ease",
        position: "relative",
    };

    const dropdownStyle: React.CSSProperties = {
        position: "absolute",
        top: "100%",
        right: 0,
        background: "rgba(0, 0, 0, 0.8)",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        padding: "10px",
        minWidth: "220px",
        zIndex: 30,
    };

    const dropdownItemStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "5px 10px",
        cursor: "pointer",
        color: "#fff",
        fontSize: "0.95rem",
    };

    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "60px",
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                background: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(5px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                zIndex: 20,
                color: "#fff",
            }}
        >
            <h2
                style={{
                    margin: 0,
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "white",
                    fontWeight: "700",
                }}
            >
                username@gmail.com
            </h2>

            <div
                style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                }}
            >
                {/* Notifications Dropdown */}
                <div ref={notifRef} style={{ position: "relative" }}>
                    <button
                        style={buttonStyle}
                        onClick={toggleNotifications}
                        title="Notifications"
                    >
                        <i className={`bi bi-bell`}></i>
                    </button>
                    {showNotifications && (
                        <div style={dropdownStyle}>
                            <div style={dropdownItemStyle}>
                                <i className="bi bi-envelope"></i>
                                New message from John
                            </div>
                            <div style={dropdownItemStyle}>
                                <i className="bi bi-check-circle"></i>
                                Server backup completed
                            </div>
                            <div style={dropdownItemStyle}>
                                <i className="bi bi-calendar-event"></i>
                                Meeting at 3 PM
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Dropdown */}
                <div ref={profileRef} style={{ position: "relative" }}>
                    <button
                        style={buttonStyle}
                        onClick={toggleProfileMenu}
                        title="Profile"
                    >
                        <i className={`bi bi-person-circle`}></i>
                    </button>
                    {showProfileMenu && (
                        <div style={dropdownStyle}>
                            <div style={dropdownItemStyle}>
                                <i className="bi bi-person"></i>
                                John Doe
                            </div>
                            <hr style={{ borderColor: "#444" }} />
                            <div style={dropdownItemStyle}>
                                <i className="bi bi-gear"></i>
                                Profile and Settings
                            </div>
                            <div style={dropdownItemStyle}>
                                <i className="bi bi-box-arrow-right"></i>
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
