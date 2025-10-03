// src/components/ui/colors.ts
export const DROPDOWN_COLORS = {
    light: {
        BG: "#ffffff",
        TEXT: "#000000",
        HOVER_BG: "rgba(0,0,0,0.05)",
        BORDER: "rgba(0,0,0,0.1)",
    },
    dark: {
        BG: "rgba(0,0,0,0.99)",
        TEXT: "#ffffff",
        HOVER_BG: "rgba(255,255,255,0.1)",
        BORDER: "rgba(255,255,255,0.15)",
    },
    secondary: {
        BG: "#f0f0f0",
        TEXT: "#333333",
        HOVER_BG: "#e0e0e0",
        BORDER: "#cccccc",
    },
    primary: {
        BG: "#0d6efd",
        TEXT: "#ffffff",
        HOVER_BG: "#0b5ed7",
        BORDER: "#0a58ca",
    },
    success: {
        BG: "#198754",
        TEXT: "#ffffff",
        HOVER_BG: "#157347",
        BORDER: "#146c43",
    },
    danger: {
        BG: "#dc3545",
        TEXT: "#ffffff",
        HOVER_BG: "#bb2d3b",
        BORDER: "#b02a37",
    },
    warning: {
        BG: "#ffc107",
        TEXT: "#000000",
        HOVER_BG: "#ffca2c",
        BORDER: "#ffcd39",
    },
    info: {
        BG: "#0dcaf0",
        TEXT: "#000000",
        HOVER_BG: "#31d2f2",
        BORDER: "#3dd5f3",
    },
} as const;

export type DropdownTheme = keyof typeof DROPDOWN_COLORS;
