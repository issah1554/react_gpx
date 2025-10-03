import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "leaflet.locatecontrol";
import * as turf from "@turf/turf";
import Swal from "sweetalert2";
import "leaflet-easyprint";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function MapView() {
    const mapRef = useRef<L.Map | null>(null);
    const [markers, setMarkers] = useState<L.Marker[]>([]);
    const [polygon, setPolygon] = useState<L.Polygon | null>(null);
    const [currentLatLng, setCurrentLatLng] = useState<L.LatLng | null>(null);

    useEffect(() => {
        if (mapRef.current) return;

        const map = L.map("map", { zoomControl: false }).setView([-6.509, 38.08], 20);
        mapRef.current = map;

        const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);

        const satelliteLayer = L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            {
                attribution: "Tiles &copy; Esri",
                maxZoom: 19,
            }
        );

        const baseLayers = {
            "Street Map": osmLayer,
            "Satellite View": satelliteLayer,
        };
        L.control.layers(baseLayers).addTo(map);

        // ✅ LocateControl works now
        // L.control.locate({
        //     position: "topright",
        //     drawCircle: true,
        //     follow: false,
        //     setView: true,
        //     keepCurrentZoomLevel: true,
        // }).addTo(map);

        L.control.zoom({ position: "topright" }).addTo(map);

        navigator.geolocation.watchPosition(
            (pos) => {
                const latlng = L.latLng(pos.coords.latitude, pos.coords.longitude);
                setCurrentLatLng(latlng);
                map.setView(latlng, map.getZoom());
            },
            () => Swal.fire("Error", "Unable to retrieve location", "error"),
            { enableHighAccuracy: true, timeout: 10000 }
        );

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    const addPoint = () => {
        if (!currentLatLng || !mapRef.current) {
            Swal.fire("Error", "Unable to get current location", "error");
            return;
        }

        const icon = L.icon({
            iconUrl: "./assets/img/pin-icon5.png",
            iconSize: [38, 38],
            iconAnchor: [19, 38],
        });

        const marker = L.marker(currentLatLng, { icon, draggable: true })
            .addTo(mapRef.current)
            .bindPopup(`Corner ${markers.length + 1}`, { offset: L.point(0, -25), closeButton: false })
            .openPopup();

        marker.on("drag", updatePolygon);
        marker.on("dragend", updatePolygon);

        setMarkers((prev) => [...prev, marker]);
        updatePolygon();
    };

    const updatePolygon = () => {
        if (!mapRef.current) return;

        const latlngs = markers.map((m) => m.getLatLng());

        if (latlngs.length < 3) {
            if (polygon) mapRef.current.removeLayer(polygon);
            setPolygon(null);
            return;
        }

        const poly = polygon || L.polygon(latlngs, {
            color: "blue",
            fillColor: "#007bff",
            fillOpacity: 0.3
        }).addTo(mapRef.current);

        poly.setLatLngs(latlngs);
        setPolygon(poly);

        const coords = latlngs.map(ll => [ll.lng, ll.lat]);
        coords.push(coords[0]);

        const area = turf.area(turf.polygon([coords]));
        console.log(`Area: ${area.toFixed(2)} m²`);
    };

    return (
        <>
            <div id="map" style={{ height: "100vh", width: "100vw" }}></div>
            <div id="button-container" style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1000 }}>
                <button className="btn btn-secondary" onClick={addPoint}>
                    <i className="bi bi-pin"></i> Pin
                </button>
            </div>
        </>
    );
}
