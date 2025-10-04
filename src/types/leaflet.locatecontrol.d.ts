import * as L from "leaflet";

declare module "leaflet" {
    namespace control {
        function locate(options?: any): L.Control;
    }
}

declare module "leaflet.locatecontrol";

declare module "leaflet" {
    namespace Control {
        class ToggleCenter extends L.Control {
            constructor(options?: L.ControlOptions);
        }
    }

    namespace control {
        function toggleCenter(options?: L.ControlOptions): ToggleCenter;
    }
}

declare module "leaflet-easyprint" {
    const easyPrint: (options?: any) => L.Control;
    export default easyPrint;
}
