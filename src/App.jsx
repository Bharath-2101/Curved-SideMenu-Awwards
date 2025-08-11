import { useEffect, useState } from "react";
import gsap from "gsap";
import SideMenu from "./Components/SideMenu";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

const App = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isDesktop) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontSize: "1.5rem",
          textAlign: "center",
        }}
      >
        This app is only available on desktop screens.
      </div>
    );
  }

  return (
    <div id="Main">
      <SideMenu />
      Main Content
    </div>
  );
};

export default App;
