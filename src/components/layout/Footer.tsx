import { useEffect, useState } from "react";

export default function Footer() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isLargeScreen = windowWidth >= 576;
    const isSmallScreen = windowWidth <= 576;

    const footerStyle: React.CSSProperties = {
        position: "fixed",
        bottom: isSmallScreen ? "0" : "0",
        left: isSmallScreen ? "0" : isLargeScreen ? "auto" : "20px",
        right: isLargeScreen ? "0" : "auto",
        width: isSmallScreen ? "100%" : "auto",
        padding: "6px 10px",
        background: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(8px)",
        borderRadius:0,
        color: "#fff",
        fontSize: "0.9rem",
        zIndex: 15,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        justifyContent: isSmallScreen ? "center" : "flex-start",
        transition: "all 0.3s ease",
        minWidth: "320px",
    };

    return (
        <footer style={footerStyle}>
            <span>&copy; {new Date().getFullYear()} Databenki Group</span>
            <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>All rights reserved</span>
        </footer>
    );
}
