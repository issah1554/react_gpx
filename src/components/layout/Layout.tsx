import { useUI } from "../../context/UIContext";
import BackgroundMap from "./BackgroundMap";
import TopNav from "./TopNavBar";
import Footer from "./Footer";
import ProfileSettingsCard from "./ProfileSettingsCard";
import ButtonContainer from "./ButtonContainer";
import ScrollbarWrapper from "./ScrollbarWrapper";

export default function Layout() {
    const { transparency } = useUI(); // 👈 read global transparency

    return (
        <>
            <BackgroundMap />

            {/* TOP NAV */}
            <TopNav />

            {/* MAIN CONTENT AREA */}
            {/* <main
                style={{
                    flex: 1,
                    position: "absolute",
                    overflow: "auto",
                    marginLeft: "5px",
                    marginRight: "5px",
                    top: "65px",
                    height: "calc(100vh - 116px)",
                    width: "calc(100vw - 335px)",
                    background: `rgba(0,0,0,${transparency})`, // 👈 apply here too
                    borderRadius: "8px",
                    padding: "10px",
                }}
            >
                <h1 style={{ color: "white" }}>Main Content Area</h1>
                <p style={{ color: "white" }}>
                    This is your central workspace.
                </p>
            </main> */}

            {/* RIGHT CARD */}
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
                    height: "calc(100vh - 116px)",
                    display: "block",
                    background: `rgba(0,0,0,${transparency})`, // 👈 same setting
                    borderRadius: "8px",
                    padding: "10px",
                }}
                className="right-column"
            >
                <ScrollbarWrapper
                    thumbColor="#00ff99"
                    trackColor="rgba(0, 0, 0, 0.3)"
                    thumbHoverColor="#33ffcc"
                    width="10px"
                    style={{
                        position: "absolute",
                        right: 0,
                        height: "calc(100vh - 40px)",
                        width: "100%",
                        overflowY: "auto",
                    }}
                >
                    <div style={{ paddingBottom: "100px" }}>
                        <ProfileSettingsCard />
                    </div>
                </ScrollbarWrapper>
            </aside>

            {/* FOOTER */}
            <Footer/>

            <ButtonContainer />

            {/* CSS Media Query */}
            <style>
                {`
                    @media (min-width: 768px) {
                        .right-column {
                            display: block;
                        }
                    }
                `}
            </style>
        </>
    );
}
