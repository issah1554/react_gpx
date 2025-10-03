import BackgroundMap from "./BackgroundMap";
import TopNav from "./TopNavBar";
// import RightColumn from "./RightColumn";
import Footer from "./Footer";

export default function Layout() {
    return (
        <>
            <BackgroundMap />

            <div
                style={{
                    position: "relative",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                <TopNav />
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "60px", // space for fixed nav
                        marginBottom: "33px", // space for footer
                        overflow: "hidden",
                    }}
                >
                    {/* MAIN CONTENT AREA */}
                    <main
                        style={{
                            flex: 1,
                            position: "relative",
                            overflow: "auto",
                            padding: "20px",
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
                            width: "320px",
                            minWidth: "280px",
                            background: "rgba(0,0,0,0.5)",
                            backdropFilter: "blur(6px)",
                            overflowY: "auto",
                            padding: "15px",
                            display: "block", // hidden by default
                        }}
                        className="right-column"
                    >
                            <h3 style={{ color: "white" }}>Right Sidebar</h3>
                            <p style={{ color: "white" }}>
                                This area is responsive (widgets, chat, etc.).
                            </p>
                    </aside>
                </div>

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
            </div>
        </>
    );
}
