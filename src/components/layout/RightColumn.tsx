import React from "react";

export default function RightCard({ children }: { children: React.ReactNode }) {
    return (
        <aside
            style={{
                width: "320px",
                minWidth: "280px",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(6px)",
                padding: "16px",
                overflowY: "auto",
                borderLeft: "1px solid rgba(255,255,255,0.2)",
                display: "none", // hidden by default on small screens
            }}
            className="right-card"
        >
            {children}

            {/* Inline media query for responsiveness */}
            <style>
                {`
                @media (min-width: 768px) {
                    .right-card {
                        display: block; /* show on tablet/desktop */
                    }
                }
                `}
            </style>
        </aside>
    );
}
