import About from "../components/Common/About";
import Cta from "../components/Common/Cta";
import DashboardShowcase from "../components/Common/DashboardShowcase";
import FeaturesContent from "../components/Common/FeaturesContent";
import FunFacts from "../components/Common/FunFacts";
import Partners from "../components/Common/Partners";
import PricingPlans from "../components/Common/PricingPlans";
import Testimonials from "../components/Common/Testimonials";
import UseCasesContent from "../components/Common/UseCasesContent";
import HeroBanner from "../components/Home/HeroBanner";

const Home = () => {
    return (
        <>
            <HeroBanner />

            <About />

            <Partners />

            <FeaturesContent />

            <DashboardShowcase />

            <Testimonials />

            <UseCasesContent />

            <PricingPlans />

            <FunFacts />

            <Cta />
        </>
    );
};

export default Home;