import Avatar from "../ui/Avatar";
import { useUI } from "../../context/UIContext";

// src/components/ProfileSettingsCard.tsx
export default function ProfileSettingsCard() {
    const { brightness, setBrightness, transparency, setTransparency } = useUI();

    return (
        <div
            style={{
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                color: "white",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            {/* Profile Section */}
            <section className="d-flex flex-column align-items-center">
                <h3 style={{ marginTop: 0 }}>Profile</h3>
                <Avatar
                    size={100}
                    alt="User Avatar"
                    src="https://i.pravatar.cc/300"
                    status="online"
                />
                <h2 style={{ margin: "10px 0 5px 0" }}>Issah Ben</h2>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.7)" }}>
                    issahBen@gmail.com
                </p>
            </section>

            <hr style={{ border: "1px solid rgba(255,255,255,0.2)" }} />

            {/* Settings Section */}
            <section>
                <h3 style={{ marginTop: 0 }}>Settings</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {/* Toggles */}
                    <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input type="checkbox" defaultChecked />
                        Enable Notifications
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input type="checkbox" />
                        Dark Mode
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input type="checkbox" />
                        Map Animation
                    </label>

                    {/* Sliders */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label>Map Brightness</label>
                        <input
                            type="range"
                            min="40"
                            max="150"
                            step="10" // snap in 5% increments
                            value={Math.round(brightness * 100)}
                            onChange={(e) => {
                                const raw = Number(e.target.value);
                                const quantized = Math.round(raw / 5) * 5; // enforce step
                                setBrightness(quantized / 100);
                            }}
                        />
                        <span>{Math.round(brightness * 100)}%</span>


                        <label>Sidebar Transparency</label>
                        <input
                            type="range"
                            min="30"
                            max="100"
                            step="10" // snap in 10% increments
                            value={Math.round(transparency * 100)}
                            onChange={(e) => {
                                const raw = Number(e.target.value);
                                const quantized = Math.round(raw / 10) * 10;
                                setTransparency(quantized / 100);
                            }}
                        />
                        <span>{Math.round(transparency * 100)}%</span>


                    </div>

                </div>
            </section>
        </div>
    );
}
