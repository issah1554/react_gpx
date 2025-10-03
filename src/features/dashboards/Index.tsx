import BackgroundMap from "../../components/layout/BackgroundMap";

export default function Dashboard() {
    return (
        <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
            <BackgroundMap />
            <div style={{ position: "relative", zIndex: 10, padding: "20px" }}>
                <h1>Dashboard</h1>
                <p>This content is above the background map.</p>
            </div>
        </div>
    );
}
