import BackgroundMap from "../../components/layout/BackgroundMap";
import Footer from "../../components/layout/Footer";
import TopNav from "../../components/layout/TopNavBar";

export default function Dashboard() {
    return (
        <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
            <BackgroundMap />
            <TopNav />
                {/* Main Content */}
            <Footer/>
        </div>
    );
}
