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
                    marginLeft: "5px",
                    marginRight: "5px",
                    top: "65px", // space for fixed nav
                    height: "calc(100vh - 103px)",
                    width: " calc(100vw - 335px)", // account for right card
                    background: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "8px",
                    padding:"10px"
                }}
            >

                    <h1 style={{ color: "white" }}>Main Content Area</h1>
                    <p style={{ color: "white" }}>
                        This is your central workspace.
                    </p>
            </main>

            {/* RIGHT CARD (Responsive) */}
            <aside
                style={{
                    position: "absolute",
                    maxHeight: "100%",
                    width: "320px",
                    minWidth: "280px",
                    overflowY: "hidden",
                    marginRight: "5px",
                    top: "65px",
                    right: 0,
                    height: "calc(100vh - 103px)",
                    display: "block", // hidden by default
                    background: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "8px",
                    padding: "10px"


                }}
                className="right-column"
            >
                <ProfileSettingsCard />
            </aside>

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
