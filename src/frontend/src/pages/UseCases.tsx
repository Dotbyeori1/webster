import Cta from "../components/Common/Cta.tsx";
import FeaturesContent from "../components/Common/FeaturesContent.tsx";
import FunFacts from "../components/Common/FunFacts.tsx";
import PageBanner from "../components/Common/PageBanner.tsx";
import Partners from "../components/Common/Partners.tsx";
import UseCasesContent from "../components/Common/UseCasesContent.tsx";

const UseCases = () => {
  return (
    <>
      <PageBanner pageTitle="Who Trezo Shipment Helps?" />

      <UseCasesContent />

      <Partners />

      <FeaturesContent />

      <div className="pt-160">
        <FunFacts />
      </div>

      <Cta />
    </>
  );
};

export default UseCases;
