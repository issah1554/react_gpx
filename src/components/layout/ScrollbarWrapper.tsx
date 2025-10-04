import React, { type CSSProperties } from "react";
import styles from "./assets/scrollbar.module.css";

interface ScrollbarWrapperProps {
    children: React.ReactNode;
    thumbColor?: string;
    trackColor?: string;
    thumbHoverColor?: string;
    width?: string;
    style?: CSSProperties;
}

export default function ScrollbarWrapper({
    children,
    thumbColor = "#ff6600",
    trackColor = "rgba(0, 0, 0, 0.2)",
    thumbHoverColor = "#ff8533",
    width = "8px",
    style = {},
}: ScrollbarWrapperProps) {
    return (
        <div
            className={styles.scrollbar}
            style={{
                ...style,
                "--scrollbar-thumb": thumbColor,
                "--scrollbar-track": trackColor,
                "--scrollbar-thumb-hover": thumbHoverColor,
                "--scrollbar-width": width,
            } as React.CSSProperties}
        >
            {children}
        </div>
    );
}
