import Navbar from "../../components/FrontPages/Common/Navbar";
import HeroBanner from "../../components/FrontPages/Home/HeroBanner";
import KeyFeatures from "../../components/FrontPages/Common/KeyFeatures";
import Widget from "../../components/FrontPages/Common/Widget";
import Testimonials from "../../components/FrontPages/Common/Testimonials";
import OurTeamSlider from "../../components/FrontPages/Common/OurTeamSlider";
import ContactUs from "../../components/FrontPages/Common/ContactUs";
import Cta from "../../components/FrontPages/Common/Cta";
import Footer from "../../components/FrontPages/Common/Footer";
import FaqContent from '../../components/FrontPages/Faq/FaqContent';

const Home = () => {
    return (
        <>
            <div className="fp-wrapper">
                <Navbar />

                <HeroBanner />

                <KeyFeatures />

                <Widget />

                <Testimonials />

                <OurTeamSlider />

                <FaqContent />

                <ContactUs />

                <Cta />

                <Footer />
            </div>
        </>
    )
};

export default Home;