import BackgroundMap from "./BackgroundMap";
import TopNav from "./TopNavBar";
// import RightColumn from "./RightColumn";
import Footer from "./Footer";
import ProfileSettingsCard from "./ProfileSettingsCard";

export default function Layout() {
    return (
        <>
            <BackgroundMap />

            <TopNav />

            {/* MAIN CONTENT AREA */}
            <main
                style={{
                    flex: 1,
                    position: "absolute",
                    overflow: "auto",
                    paddingLeft: "5px",
                    marginTop: "65px", // space for fixed nav
                    height: "calc(100vh - 103px)",
                    width: " calc(100vw - 327px)", // account for right card
                }}
                className="me-1"
            >
                <div
                    style={{
                        background: "rgba(0, 0, 0, 0.5)",
                        borderRadius: "8px",
                        height: "100%",
                    }}
                    className="p-3"
                
                >
                    <h1 style={{ color: "white" }}>Main Content Area</h1>
                    <p style={{ color: "white" }}>
                        This is your central workspace.
                    </p>
                </div>
            </main>

            {/* RIGHT CARD (Responsive) */}
            <aside
                style={{
                    position: "absolute",
                    maxHeight: "100%",
                    width: "320px",
                    minWidth: "280px",
                    overflowY: "auto",
                    paddingRight: "5px",
                    marginTop: "65px",
                    right: 0,
                    height: "calc(100vh - 103px)",
                    display: "block", // hidden by default

                }}
                className="right-column"
            >
                <div
                    style={{
                        background: "rgba(0, 0, 0, 0.5)",
                        borderRadius: "8px",
                        height: "100%",
                    }}>
                    <ProfileSettingsCard />

                </div>
            </aside>

            {/* Footer */}
            <Footer />

            {/* CSS Media Query */}
            <style>
                {`
                        @media (min-width: 768px) {
                            .right-column {
                                display: block; /* visible on tablets & larger */
                            }
                        }
                    `}
            </style>
        </>
    );
}
