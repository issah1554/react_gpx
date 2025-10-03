import * as L from "leaflet";

declare module "leaflet" {
    namespace control {
        function locate(options?: any): L.Control;
    }
}

declare module "leaflet.locatecontrol";
