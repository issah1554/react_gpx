// src/components/ui/NavButton.tsx
import React from "react";

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ children, ...props }) => {
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

    return (
        <button style={buttonStyle} {...props}>
            {children}
        </button>
    );
};

export default NavButton;
