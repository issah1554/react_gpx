import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useUI } from "../../context/UIContext";

type MapLayer =
    | "satellite"
    | "streets"
    | "terrain"
    | "topo"
    | "labels"
    | "none";

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
    const mapRef = useRef<L.Map | null>(null);
    const { brightness } = useUI();

    useEffect(() => {
        if (mapRef.current) return;

        const map = L.map("background-map", {
            zoomControl: false, // disable default so we can place custom
            attributionControl: false,
            dragging: draggable,
            scrollWheelZoom,
            doubleClickZoom,
            boxZoom,
            keyboard,
        }).setView([-6.82706969735409, 39.274663859227026], 14);

        mapRef.current = map;

        // --- Layers ---
        const layers: Record<MapLayer, L.TileLayer | null> = {
            satellite: L.tileLayer(
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                { maxZoom: 19 }
            ),
            streets: L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }
            ),
            terrain: L.tileLayer(
                "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
                { maxZoom: 17, attribution: "&copy; OpenStreetMap contributors" }
            ),
            topo: L.tileLayer(
                "https://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.jpg",
                { maxZoom: 18, attribution: "&copy; OpenStreetMap contributors" }
            ),
            labels: L.tileLayer(
                "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
                { maxZoom: 19 }
            ),
            none: null,
        };

        if (layers[mapLayer]) layers[mapLayer]?.addTo(map);
        if (isMapLabels && layers.labels) layers.labels.addTo(map);

        // --- Controls ---
        L.control.zoom({ position: "bottomright" }).addTo(map); // zoom buttons
        L.control.scale({ position: "bottomleft" }).addTo(map); // scale bar

        // Base and overlays
        const baseMaps = {
            Satellite: layers.satellite!,
            Streets: layers.streets!,
            Terrain: layers.terrain!,
            Topo: layers.topo!,
        };
        const overlayMaps = {
            Labels: layers.labels!,
        };

        L.control.layers(baseMaps, overlayMaps, { position: "topright" }).addTo(map);

        return () => {
            map.remove();
            mapRef.current = null;
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
                filter: `brightness(${brightness})`, // dynamic brightness
            }}
        />
    );
}
