import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function BackgroundMap() {
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current) return;

        const map = L.map("background-map", {
            zoomControl: false,
            attributionControl: false,
            dragging: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            keyboard: false,
        }).setView([-6.82706969735409, 39.274663859227026], 14);

        mapRef.current = map;

        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
            attribution: "",
            maxZoom: 19,
        }).addTo(map);

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    return (
        <div
            id="background-map"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100vw",
                zIndex: -1, // behind everything
                filter: "brightness(0.9)", // dim background if desired
            }}
        />
    );
}
