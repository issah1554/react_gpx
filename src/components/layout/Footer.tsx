import { useEffect, useState } from "react";
import { useUI } from "../../context/UIContext";

export default function Footer() {
    const { transparency } = useUI(); // 👈 read global transparency
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isSmallScreen = windowWidth <= 576;

    const footerStyle: React.CSSProperties = {
        position: "fixed",
        bottom: "0",
        right: "5px",
        width: isSmallScreen ? "100%" : "auto",
        padding: "6px 10px",
        background: `rgba(0,0,0,${transparency})`, // 👈 dynamic
        backdropFilter: "blur(8px)",
        borderRadius: isSmallScreen ? "0" : "5px",
        color: "#fff",
        fontSize: "0.9rem",
        zIndex: 15,
        display: isSmallScreen ? "none" : "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        justifyContent: isSmallScreen ? "center" : "flex-start",
        transition: "all 0.3s ease",
        minWidth: "320px",
        height: "47px",
    };

    return (
        <footer style={footerStyle}>
            <span>&copy; {new Date().getFullYear()} Databenki Group</span>
            <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>All rights reserved</span>
        </footer>
    );
}
