import React, { useRef, useState } from "react";
import Hamburger from "./Hamburger";
import styles from "../styles/SideMenu.module.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstRun, setFirstRun] = useState(2);
  const pathRef = useRef();
  const NavCon = useRef();
  const height = window.innerHeight;
  const initial = `M100 0 L100 ${height} Q-100 ${height / 2} 100 0`;
  const final = `M100 0 L100 ${height} Q100 ${height / 2} 100 0`;
  useGSAP(() => {
    if (firstRun > 0) {
      setFirstRun((prev) => (prev = prev - 1));
      return;
    }
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 0.5 },
    });

    if (isOpen) {
      tl.to(pathRef.current, { morphSVG: final }, 0).to(
        NavCon.current,
        {
          x: "0%",
        },
        0
      );
    } else {
      tl.to(pathRef.current, { morphSVG: initial }, 0).to(
        NavCon.current,
        {
          x: "100%",
        },
        0
      );
    }
  }, [isOpen]);
  return (
    <>
      <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
      <div ref={NavCon} className={styles.NavCon}>
        <svg
          className={styles.NavCurve}
          viewBox={`0 0 100 ${height}`}
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d={`M100 0 L100 ${height} Q-100 ${height / 2} 100 0`}
            fill="rgb(120, 165, 247)"
          />
        </svg>

        <div className={styles.NavMain}>
          <div className={styles.NavTitle}>Navigation</div>
          <span className={styles.Seperator} />
          <ul className={styles.NavContent}>
            {[
              { title: "HOME", color: "#b94d01ff" },
              { title: "ABOUT US", color: "#bf0202ff" },
              { title: "CONTACT", color: "#000ba8ff" },
              { title: "WORKS", color: "#5802a8ff" },
            ].map((item, index) => (
              <li key={index} className={styles.NavLink}>
                <span>{item.title}</span>
                <span style={{ color: item.color }}>{item.title}</span>
              </li>
            ))}

            <div className={styles.footer}>
              {["INSTAGRAM", "FACEBOOK", "TWITTER"].map((item, index) => (
                <div
                  style={{ position: "relative" }}
                  className="UnderLine"
                  key={index}
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
