import { useEffect, useRef } from "react";
import { useUI } from "../../context/UIContext";
import "./assets/leaflet.css";
import Swal from "sweetalert2";

type MapLayer = "satellite" | "streets" | "labels" | "none";

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
                const leafletCSS = document.createElement("link");
                leafletCSS.rel = "stylesheet";
                leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                document.head.appendChild(leafletCSS);

                const locateCSS = document.createElement("link");
                locateCSS.rel = "stylesheet";
                locateCSS.href = "https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.78.0/dist/L.Control.Locate.min.css";
                document.head.appendChild(locateCSS);

                const leafletJS = document.createElement("script");
                leafletJS.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
                leafletJS.onload = () => {
                    const locateJS = document.createElement("script");
                    locateJS.src = "https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.78.0/dist/L.Control.Locate.min.js";
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

            // SCALE control separately
            L.control.scale({ position: "bottomleft" }).addTo(map);

            // -------------------------
            // CREATE CONTROL GROUP
            // -------------------------
            L.Control.ControlGroup = L.Control.extend({
                onAdd: function () {
                    const container = L.DomUtil.create("div", "leaflet-control-group leaflet-bar");
                    container.style.display = "flex";
                    container.style.flexDirection = "column";
                    container.style.gap = "4px";
                    // container.style.background = "white";
                    container.style.borderRadius = "8px";
                    container.style.padding = "4px";
                    container.style.margin = "0";
                    container.style.background = "rgba(0,0,0,0.8)";
                    container.style.zIndex = "1000";
                    container.style.position = "absolute";
                    container.style.top = "65px";
                    container.style.right = "330px";                    
                    return container;
                },
                onRemove: function () { }
            });
            L.control.controlGroup = function (opts: any) {
                return new L.Control.ControlGroup(opts);
            };
            const groupControl = L.control.controlGroup().addTo(map);
            const groupContainer = (groupControl as any).getContainer();

            // -------------------------
            // ADD CONTROLS TO GROUP
            // -------------------------

            // Layers control
            const layersControl = L.control.layers(baseMaps, overlayMaps, { collapsed: true });
            layersControl.addTo(map);
            const layersEl = layersControl.getContainer();
            groupContainer.appendChild(layersEl);

            // Zoom controls
            const zoomControl = L.control.zoom({ zoomInTitle: "Zoom in", zoomOutTitle: "Zoom out" });
            zoomControl.addTo(map);
            const zoomEl = zoomControl.getContainer();
            groupContainer.appendChild(zoomEl);

            // Locate Me control
            const locateControl = L.control.locate({
                drawCircle: true,
                follow: true,
                setView: true,
                keepCurrentZoomLevel: false,
                showPopup: false,
                strings: { title: "Show my location" },
            });
            locateControl.addTo(map);
            const locateEl = locateControl.getContainer();
            groupContainer.appendChild(locateEl);

            // Auto-Center control
            let autoCenter = true;
            const autoCenterBtn = L.DomUtil.create("button", "btn btn-light btn-sm", groupContainer);
            autoCenterBtn.innerHTML = '<i class="bi bi-crosshair"></i>';
            autoCenterBtn.title = "Toggle Auto Center";
            autoCenterBtn.onclick = () => {
                autoCenter = !autoCenter;
                autoCenterBtn.classList.toggle("text-primary", autoCenter);
                Swal.fire({
                    icon: "info",
                    title: "Auto Center",
                    text: autoCenter ? "Enabled" : "Disabled",
                    toast: true,
                    timer: 1500,
                    position: "top-end",
                    showConfirmButton: false
                });
            };

            // Options Menu control
            const optionsBtn = L.DomUtil.create("button", "btn btn-light btn-sm", groupContainer);
            optionsBtn.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';
            optionsBtn.title = "Options Menu";
            const dropdown = document.createElement("ul");
            dropdown.className = "dropdown-menu shadow-sm";
            dropdown.innerHTML = `
                <li><a class="dropdown-item" href="#" id="option1"><i class="bi bi-check2-square me-2"></i>Show marker</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" id="option2"><i class="bi bi-box-arrow-in-right me-2"></i>Login</a></li>
                <li><a class="dropdown-item" href="#" id="option3"><i class="bi bi-person-plus me-2"></i>Register</a></li>
            `;
            optionsBtn.onclick = () => dropdown.classList.toggle("show");
            groupContainer.appendChild(optionsBtn);
            groupContainer.appendChild(dropdown);

            dropdown.querySelector("#option1")?.addEventListener("click", (e) => {
                e.preventDefault();
                Swal.fire("Show marker clicked");
            });
            dropdown.querySelector("#option2")?.addEventListener("click", () => Swal.fire("Login clicked"));
            dropdown.querySelector("#option3")?.addEventListener("click", () => Swal.fire("Register clicked"));

        });
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
