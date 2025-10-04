import { useEffect, useRef } from "react";
import { useUI } from "../../context/UIContext";

type MapLayer = "satellite" | "streets"  | "labels" | "none";

interface BackgroundMapProps {
    mapLayer?: MapLayer;
    isMapLabels?: boolean;
    draggable?: boolean;
    scrollWheelZoom?: boolean;
    doubleClickZoom?: boolean;
    boxZoom?: boolean;
    keyboard?: boolean;
}

export default function BackgroundMap({
    mapLayer = "satellite",
    isMapLabels = false,
    draggable = true,
    scrollWheelZoom = false,
    doubleClickZoom = false,
    boxZoom = false,
    keyboard = false,
}: BackgroundMapProps) {
    const mapRef = useRef<any>(null);
    const { brightness } = useUI();

    useEffect(() => {
        if (mapRef.current) return;

        const loadCDNResources = () => {
            return new Promise<void>((resolve) => {
                // Leaflet CSS
                const leafletCSS = document.createElement("link");
                leafletCSS.rel = "stylesheet";
                leafletCSS.href =
                    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                document.head.appendChild(leafletCSS);

                // LocateControl CSS
                const locateCSS = document.createElement("link");
                locateCSS.rel = "stylesheet";
                locateCSS.href =
                    "https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.78.0/dist/L.Control.Locate.min.css";
                document.head.appendChild(locateCSS);

                // Leaflet JS
                const leafletJS = document.createElement("script");
                leafletJS.src =
                    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
                leafletJS.onload = () => {
                    // LocateControl JS
                    const locateJS = document.createElement("script");
                    locateJS.src =
                        "https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.78.0/dist/L.Control.Locate.min.js";
                    locateJS.onload = () => resolve();
                    document.body.appendChild(locateJS);
                };
                document.body.appendChild(leafletJS);
            });
        };

        loadCDNResources().then(() => {
            const L = (window as any).L;

            const map = L.map("background-map", {
                zoomControl: false,
                attributionControl: false,
                dragging: draggable,
                scrollWheelZoom,
                doubleClickZoom,
                boxZoom,
                keyboard,
            }).setView([-6.82707, 39.27466], 14);

            mapRef.current = map;

            const layers: Record<MapLayer, any> = {
                satellite: L.tileLayer(
                    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                    { maxZoom: 19 }
                ),
                streets: L.tileLayer(
                    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }
                ),
                labels: L.tileLayer(
                    "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
                    { maxZoom: 19 }
                ),
                none: null,
            };

            if (layers[mapLayer]) layers[mapLayer]?.addTo(map);
            if (isMapLabels && layers.labels) layers.labels.addTo(map);

            const baseMaps = {
                Satellite: layers.satellite!,
                Streets: layers.streets!,
            };
            const overlayMaps = {
                Labels: layers.labels!,
            };

            L.control.layers(baseMaps, overlayMaps, { position: "topright" }).addTo(map);
            L.control.zoom({ position: "bottomright" }).addTo(map);
            L.control.scale({ position: "bottomleft" }).addTo(map);

            // Locate Me control
            L.control
                .locate({
                    position: "topright",
                    drawCircle: true,
                    follow: true,
                    setView: true,
                    keepCurrentZoomLevel: false,
                    showPopup: false,
                    strings: { title: "Show my location" },
                })
                .addTo(map);
        });

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
            document.head.querySelectorAll("link").forEach((link) => link.remove());
            document.body.querySelectorAll("script").forEach((script) => script.remove());
        };
    }, [
        mapLayer,
        isMapLabels,
        draggable,
        scrollWheelZoom,
        doubleClickZoom,
        boxZoom,
        keyboard,
    ]);

    return (
        <div
            id="background-map"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100vw",
                zIndex: 0,
                filter: `brightness(${brightness})`,
            }}
        />
    );
}
