import Cta from "../components/Common/Cta.tsx";
import FunFacts from "../components/Common/FunFacts.tsx";
import PageBanner from "../components/Common/PageBanner.tsx";
import PricingPlans from "../components/Common/PricingPlans.tsx";

const Pricing = () => {
  return (
    <>
      <PageBanner pageTitle="Flexible Pricing for Every Shipment Size" />

      <div className="pt-160">
        <PricingPlans />
      </div>

      <FunFacts />

      <Cta />
    </>
  );
};

export default Pricing;
