// src/components/ui/Dropdown.tsx
import React from "react";
import { DROPDOWN_COLORS, type DropdownTheme } from "../../types/colors";

interface DropdownProps {
    children: React.ReactNode;
    theme?: DropdownTheme;
    position?: "left" | "right";
    width?: number | string;
    style?: React.CSSProperties;
}

const Dropdown: React.FC<DropdownProps> = ({
    children,
    theme = "dark",
    position = "right",
    width = "220px",
    style,
}) => {
    const colors = DROPDOWN_COLORS[theme];

    return (
        <div
            style={{
                position: "absolute",
                top: "100%",
                [position]: 0,
                background: colors.BG,
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                padding: "10px",
                minWidth: width,
                zIndex: 30,
                border: `1px solid ${colors.BORDER}`,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

interface DropdownItemProps
    extends React.HTMLAttributes<HTMLDivElement> {
    theme?: DropdownTheme;
    style?: React.CSSProperties;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
    children,
    theme = "dark",
    style,
    ...props
}) => {
    const colors = DROPDOWN_COLORS[theme];
    const [hover, setHover] = React.useState(false);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "5px 10px",
                cursor: "pointer",
                color: colors.TEXT,
                fontSize: "0.95rem",
                background: hover ? colors.HOVER_BG : "transparent",
                borderRadius: "4px",
                ...style,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            {...props}
        >
            {children}
        </div>
    );
};

export default Dropdown;
