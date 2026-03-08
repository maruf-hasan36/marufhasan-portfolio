import BloodstreamScene from "@/components/BloodstreamScene";
import HemoScrollProgress from "@/components/HemoScrollProgress";
import HemoNavbar from "@/components/HemoNavbar";
import HemoHero from "@/components/HemoHero";
import Mission from "@/components/Mission";
import FindDonor from "@/components/FindDonor";
import BecomeDonor from "@/components/BecomeDonor";
import EmergencyRequests from "@/components/EmergencyRequests";
import ImpactStats from "@/components/ImpactStats";
import CommunityHeroes from "@/components/CommunityHeroes";
import HemoFooter from "@/components/HemoFooter";

const Index = () => (
  <div className="relative min-h-screen">
    <BloodstreamScene />
    <HemoScrollProgress />
    <HemoNavbar />
    <main className="relative z-10">
      <HemoHero />
      <Mission />
      <FindDonor />
      <BecomeDonor />
      <EmergencyRequests />
      <ImpactStats />
      <CommunityHeroes />
    </main>
    <HemoFooter />
  </div>
);

export default Index;
