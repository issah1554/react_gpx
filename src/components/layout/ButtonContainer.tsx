import { useEffect, useState } from "react";
import { useUI } from "../../context/UIContext";

export default function ButtonContainer() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { transparency } = useUI(); // 👈 read global transparency

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isSmallScreen = windowWidth < 576;

    const containerStyle: React.CSSProperties = {
        position: "fixed",
        bottom: "0",
        left: isSmallScreen ? "0" : "5px", // Always left aligned
        width: isSmallScreen ? "100%" : "auto",
        padding: "8px 12px",
        background: `rgba(0,0,0,${transparency})`, // 👈 dynamic
        backdropFilter: "blur(8px)",
        borderRadius: '5px',
        color: "#fff",
        fontSize: "0.9rem",
        zIndex: 15,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        justifyContent: isSmallScreen ? "center" : "flex-start",
        transition: "all 0.3s ease",
        minWidth: "325px",
    };

    return (
        <div id="button-container" style={containerStyle}>
            <button id="add-point" className="btn btn-secondary btn-sm  btn-icon">
                <i className="bi bi-pin"></i> Pin
            </button>
            <button id="print-map" className="btn btn-secondary btn-sm btn-icon">
                <i className="bi bi-printer"></i> Print
            </button>
            <button id="reset" className="btn btn-danger btn-sm btn-icon">
                <i className="bi bi-arrow-counterclockwise"></i> Reset
            </button>
            <button
                id="sendBtn"
                className="btn btn-primary btn-sm btn-icon"
                data-bs-toggle="modal"
                data-bs-target="#formModal"
            >
                <i className="bi bi-send-fill"></i> Send
            </button>
        </div>
    );
}
