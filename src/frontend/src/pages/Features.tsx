import About from "../components/Common/About.tsx";
import Cta from "../components/Common/Cta.tsx";
import FeaturesContent from "../components/Common/FeaturesContent.tsx";
import FunFacts from "../components/Common/FunFacts.tsx";
import PageBanner from "../components/Common/PageBanner.tsx";
import Partners from "../components/Common/Partners.tsx";

const Features = () => {
  return (
    <>
      <PageBanner pageTitle="Tools Designed for Smarter Shipping" />

      <About />

      <Partners />

      <FeaturesContent />

      <div className="pt-160">
        <FunFacts />
      </div>

      <Cta />
    </>
  );
};

export default Features;
