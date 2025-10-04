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
                            min="50"
                            max="150"
                            value={brightness * 100}
                            onChange={(e) => setBrightness(Number(e.target.value) / 100)}
                        />

                        <label>Sidebar Transparency</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={transparency * 100}
                            onChange={(e) => setTransparency(Number(e.target.value) / 100)}
                        />

                    </div>

                    {/* Save Button */}
                    <button
                        style={{
                            marginTop: "10px",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            border: "none",
                            background: "#0d6efd",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        Save Settings
                    </button>
                </div>
            </section>
        </div>
    );
}
