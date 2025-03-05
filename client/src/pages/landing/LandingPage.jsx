import TopNav from "./TopNav";
import HomeBanner from "./HomeBanner";
import Introduction from "./Introduction";
import WaysToTravel from "./WaysToTravel";
import Trips from "./Trips";
import '../../assets/css/landingpage.css';
import Purpose from "./Purpose";
import Blog from "./Blog";
import WhyChooseUs from "./WhyChooseUs";
import Footer from "./Footer";

export default function LandingPage() {

  return (
    <div className="landing-page">
      <TopNav />
      <HomeBanner />
      <div className="l-container u-margin-top--2">
        <Introduction />
        <WaysToTravel />
        <Trips />
      </div>
      <Purpose />
      <Blog />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}








