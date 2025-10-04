import { useEffect } from "react";
import L from "leaflet";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "leaflet.locatecontrol";
// import easyPrint from "leaflet.locatecontrol";
import Swal from "sweetalert2";

interface LeafletControllersProps {
    map: L.Map | null;
    markersRef: { current: L.Marker[] };
    polygonRef: { current: L.Polygon | null };
    autoCenterRef: { current: boolean };
}

export default function LeafletControllers({ map, markersRef, polygonRef, autoCenterRef }: LeafletControllersProps) {
    useEffect(() => {
        if (!map) return;

        // === 1. Layers Control ===
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

        // === 2. Locate Control ===
        L.control.locate({
            position: "topright",
            drawCircle: true,
            follow: false,
            setView: true,
            keepCurrentZoomLevel: true,
        }).addTo(map);

        // === 3. Zoom Control ===
        L.control.zoom({ position: "topright" }).addTo(map);

        // === 4. Auto-Center Control ===
        // L.Control.ToggleCenter = L.Control.extend({
        //     onAdd: function () {
        //         const container = L.DomUtil.create("div", "leaflet-control leaflet-bar leaflet-control-centering");
        //         const btn = L.DomUtil.create("button", "btn btn-light btn-sm", container);
        //         btn.id = "toggle-center";
        //         btn.innerHTML = '<i class="bi bi-crosshair"></i>';
        //         btn.title = "Toggle Auto Center";

        //         const updateButton = () => {
        //             if (autoCenterRef.current) {
        //                 btn.classList.add("text-primary");
        //             } else {
        //                 btn.classList.remove("text-primary");
        //             }
        //         };

        //         updateButton();

        //         L.DomEvent.on(btn, "click", L.DomEvent.stopPropagation)
        //             .on(btn, "click", L.DomEvent.preventDefault)
        //             .on(btn, "click", () => {
        //                 autoCenterRef.current = !autoCenterRef.current;
        //                 updateButton();
        //                 Swal.fire({
        //                     icon: "info",
        //                     title: "Auto Center",
        //                     text: autoCenterRef.current ? "Enabled" : "Disabled",
        //                     timer: 2000,
        //                     toast: true,
        //                     position: "top-end",
        //                     showConfirmButton: false,
        //                 });
        //             });

        //         return container;
        //     },
        // });

        L.control.toggleCenter = function (opts) {
            return new L.Control.ToggleCenter(opts);
        };
        L.control.toggleCenter({ position: "topright" }).addTo(map);

        // === 5. Copyright Control ===
        const CopyrightControl = L.Control.extend({
            options: { position: "bottomleft" },
            onAdd: function () {
                const container = L.DomUtil.create("div", "copyright-control");
                container.innerHTML = "&copy; 2025 Databenki Group";
                container.style.background = "rgba(255, 255, 255, 0.8)";
                container.style.padding = "3px 6px";
                container.style.borderRadius = "4px";
                container.style.fontSize = "12px";
                container.style.color = "#333";
                container.style.boxShadow = "0 0 3px rgba(0,0,0,0.2)";
                L.DomEvent.disableClickPropagation(container);
                return container;
            },
        });
        map.addControl(new CopyrightControl());

        // === 6. Scale Control ===
        L.control.scale({
            position: "bottomright",
            metric: true,
            imperial: false,
            maxWidth: 200,
        }).addTo(map);

        // === 7. Timestamp Control ===
        const TimestampControl = L.Control.extend({
            options: { position: "bottomleft" },
            onAdd: function () {
                const container = L.DomUtil.create("div", "timestamp-control");
                const now = new Date();
                container.innerHTML = "<small>Printed on: " + now.toLocaleString() + "</small>";
                container.style.background = "white";
                container.style.display = "none";
                container.style.padding = "3px 6px";
                container.style.borderRadius = "4px";
                container.style.fontSize = "12px";
                container.style.color = "#333";
                container.style.boxShadow = "0 0 3px rgba(0,0,0,0.2)";
                L.DomEvent.disableClickPropagation(container);
                return container;
            },
        });
        map.addControl(new TimestampControl());

        // === 8. Corners + Area Control ===
        const CombinedControl = L.Control.extend({
            options: { position: "topleft" },
            onAdd: function () {
                const container = L.DomUtil.create("div", "combined-control");
                container.style.display = "flex";
                container.style.gap = "5px";

                const cornersDiv = L.DomUtil.create("div", "corners-control", container);
                cornersDiv.innerHTML = "<small style='font-size:14px; font-weight:bold;'>Corners: 0</small>";
                cornersDiv.style.background = "rgba(0, 123, 255, 0.8)";
                cornersDiv.style.color = "white";
                cornersDiv.style.padding = "7px";
                cornersDiv.style.borderRadius = "4px";
                cornersDiv.style.boxShadow = "0 0 3px rgba(0,0,0,0.2)";
                cornersDiv.id = "corners-control";

                const areaDiv = L.DomUtil.create("div", "area-control", container);
                areaDiv.innerHTML = "<small style='font-size:14px; font-weight:bold;'>Area Covered: 00.00 m²</small>";
                areaDiv.style.background = "rgba(0, 123, 255, 0.8)";
                areaDiv.style.padding = "7px";
                areaDiv.style.color = "white";
                areaDiv.style.borderRadius = "4px";
                areaDiv.style.boxShadow = "0 0 3px rgba(0,0,0,0.2)";
                areaDiv.id = "area-control";

                L.DomEvent.disableClickPropagation(container);

                return container;
            },
        });
        map.addControl(new CombinedControl());

        // === 9. Options Menu Control ===
        const OptionsMenuControl = L.Control.extend({
            onAdd: function () {
                const container = L.DomUtil.create("div", "leaflet-control leaflet-bar leaflet-control-options");
                const wrapper = L.DomUtil.create("div", "dropdown", container);

                const btn = L.DomUtil.create("button", "btn btn-light btn-sm", wrapper);
                btn.id = "optionsMenu";
                btn.setAttribute("data-bs-toggle", "dropdown");
                btn.setAttribute("aria-expanded", "false");
                btn.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';

                const menu = L.DomUtil.create("ul", "dropdown-menu dropdown-menu-end shadow-sm", wrapper);
                menu.setAttribute("aria-labelledby", "optionsMenu");
                menu.innerHTML = `
                    <li><a class="dropdown-item px-2" href="#" id="option1">
                        <i class="bi bi-check2-square text-primary me-2"></i>Show marker
                    </a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item px-2" href="#" id="option2">
                        <i class="bi bi-box-arrow-in-right me-2 text-primary"></i>Login
                    </a></li>
                    <li><a class="dropdown-item px-2" href="#" id="option3">
                        <i class="bi bi-person-plus me-2 text-primary"></i>Register
                    </a></li>
                `;

                let markersVisible = true;
                menu.querySelector("#option1")?.addEventListener("click", (e) => {
                    e.preventDefault();
                    if (markersVisible) {
                        markersRef.current.forEach(m => map.removeLayer(m));
                    } else {
                        markersRef.current.forEach(m => m.addTo(map));
                    }
                    markersVisible = !markersVisible;
                });

                menu.querySelector("#option2")?.addEventListener("click", () => Swal.fire("Login clicked"));
                menu.querySelector("#option3")?.addEventListener("click", () => Swal.fire("Register clicked"));

                return container;
            },
        });
        map.addControl(new OptionsMenuControl());

        // === 10. Print Map Control ===
        // L.easyPrint({
        //     title: "Print / Save Map",
        //     position: "topright",
        //     sizeModes: ["Current"],
        //     exportOnly: false,
        //     hideControlContainer: false,
        //     hideClasses: [
        //         "leaflet-control-zoom",
        //         "leaflet-control-locate",
        //         "leaflet-control-layers",
        //         "leaflet-control-centering",
        //         "leaflet-control-options",
        //     ],
        //     filename: "MyMapExport",
        //     tileWait: 1000,
        //     hidden: true,
        // }).addTo(map);

    }, [map, markersRef, polygonRef, autoCenterRef]);

    return null;
}
