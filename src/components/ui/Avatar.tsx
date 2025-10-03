import React, { useState } from "react";

interface AvatarProps {
    src?: string;
    alt: string;
    size?: number;
    initials?: string;
    className?: string;
    status?: "online" | "offline" | "away";
    shape?: "circle" | "rounded";
    showEditButton?: boolean;
    onEdit?: () => void;
    onClick?: () => void;
    style?: React.CSSProperties; // allow custom styles
}

const Avatar: React.FC<AvatarProps> = ({
    src,
    alt,
    size = 40,
    initials,
    className = "",
    status = "offline",
    shape = "circle",
    showEditButton = false,
    onEdit,
    onClick,
    style = {},
}) => {
    const [imgError, setImgError] = useState(false);

    const statusColor: Record<string, string> = {
        online: "bg-success",
        offline: "bg-secondary",
        away: "bg-warning",
    };

    const handleError = () => setImgError(true);

    const borderClass = shape === "circle" ? "rounded-circle" : "rounded";

    const displayInitials = (initials || alt)
        .trim()
        .split(" ")
        .map(word => word[0].toUpperCase())
        .slice(0, 2)
        .join("");

    const cornerSize = size / 4;

    return (
        <div
            className={`position-relative d-inline-block ${className}`}
            style={{
                width: size,
                height: size,
                overflow: "hidden",
                ...style, // merge user-provided styles
            }}
            title={alt}
            onClick={onClick} 
        >
            {src && !imgError ? (
                <img
                    src={src}
                    alt={alt}
                    onError={handleError}
                    className={`${borderClass} w-100 h-100`}
                    style={{ objectFit: "cover" }}
                />
            ) : (
                <div
                    className={`${borderClass} bg-secondary d-flex align-items-center justify-content-center text-white fw-bold`}
                    style={{ width: "100%", height: "100%", fontSize: size / 2.5 }}
                >
                    {displayInitials}
                </div>
            )}
            
            {showEditButton ? (
                <span
                    className={`position-absolute bottom-0 end-0 rounded-circle border border-white d-flex align-items-center justify-content-center ${statusColor[status]}`}
                    style={{
                        width: cornerSize,
                        height: cornerSize,
                        cursor: "pointer",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onClick={onEdit}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                >
                    <i className="bi bi-pencil text-white"></i>
                </span>
            ) : status ? (
                <span
                    className={`position-absolute bottom-0 end-0 rounded-circle border border-white ${statusColor[status]}`}
                    style={{ width: cornerSize, height: cornerSize }}
                />
            ) : null}

        </div>
    );
};

export default Avatar;
