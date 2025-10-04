
import * as L from "leaflet";

// --- LocateControl ---
declare module "leaflet" {
    namespace control {
        function locate(options?: LocateControlOptions): L.Control.Locate;
    }

    namespace Control {
        class Locate extends L.Control {
            constructor(options?: LocateControlOptions);
        }

        interface LocateOptions extends L.ControlOptions {
            position?: string;
            strings?: { [key: string]: string };
            locateOptions?: L.LocateOptions;
            follow?: boolean;
            setView?: boolean;
            keepCurrentZoomLevel?: boolean;
            drawCircle?: boolean;
            showPopup?: boolean;
        }
    }

    interface LocateControlOptions extends Control.LocateOptions { }
}

// Allow importing leaflet.locatecontrol plugin without errors
declare module "leaflet.locatecontrol";

// --- ToggleCenter (custom control example) ---
declare module "leaflet" {
    namespace Control {
        class ToggleCenter extends L.Control {
            constructor(options?: L.ControlOptions);
        }
    }

    namespace control {
        function toggleCenter(options?: L.ControlOptions): Control.ToggleCenter;
    }
}

// --- EasyPrint ---
declare module "leaflet-easyprint" {
    const easyPrint: (options?: any) => L.Control;
    export default easyPrint;
}
