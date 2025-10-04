import { useRef, useEffect } from "react";
import Avatar from "../ui/Avatar";
// import NavButton from "../ui/NavButton";
import Dropdown, { DropdownItem } from "../ui/Dropdown";
import { useUI } from "../../context/UIContext";


export default function TopNav() {
    const notifRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const {
        // showNotifications,
        setShowNotifications,
        showProfile,
        setShowProfile,
        setShowSettings,
        // addNotification,
        logout,
        transparency, // 👈 grab from context

    } = useUI();

    // const toggleNotifications = () => {
    //     setShowNotifications(!showNotifications);
    //     setShowProfile(false);
    // };

    const toggleProfileMenu = () => {
        setShowProfile(!showProfile);
        setShowNotifications(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setShowProfile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setShowNotifications, setShowProfile]);

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
                padding: "0 30px",
                background: `rgba(0,0,0,${transparency})`, // 👈 dynamic
                // backdropFilter: "blur(5px)",
                // boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
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
                    padding: "8px",
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
                {/* Notifications */}
                {/* <div ref={notifRef} style={{ position: "relative" }}>
                    <NavButton onClick={toggleNotifications} title="Notifications">
                        <i className="bi bi-bell"></i>
                    </NavButton>
                    {showNotifications && (
                        <Dropdown >
                            <DropdownItem onClick={() => addNotification("Clicked: New message")}>
                                <i className="bi bi-envelope"></i>
                                New message from John
                            </DropdownItem>
                            <DropdownItem onClick={() => addNotification("Clicked: Backup")}>
                                <i className="bi bi-check-circle"></i>
                                Server backup completed
                            </DropdownItem>
                            <DropdownItem onClick={() => addNotification("Clicked: Meeting")}>
                                <i className="bi bi-calendar-event"></i>
                                Meeting at 3 PM
                            </DropdownItem>
                        </Dropdown>
                    )}
                </div> */}

                {/* Profile */}
                <div ref={profileRef} style={{ position: "relative" }}>
                    <Avatar
                        size={38}
                        src="https://i.pravatar.cc/300"
                        alt="Issah Ben"
                        onClick={toggleProfileMenu}
                        style={{ cursor: "pointer" }}
                    />
                    {showProfile && (
                        <Dropdown>
                            <DropdownItem>
                                <i className="bi bi-person"></i> Profile
                            </DropdownItem>
                            <DropdownItem onClick={() => setShowSettings(true)}>
                                <i className="bi bi-gear"></i> Settings
                            </DropdownItem>
                            <DropdownItem onClick={logout}>
                                <i className="bi bi-box-arrow-right"></i> Logout
                            </DropdownItem>
                        </Dropdown>
                    )}
                </div>
            </div>
        </nav>
    );
}
