import React, { useRef, useEffect } from "react";
import styles from "../styles/Hamburger.module.scss";
import gsap from "gsap";

const Hamburger = ({ isOpen, setIsOpen }) => {
  const topRect = useRef(null);
  const bottomRect = useRef(null);

  const handleMenuClick = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (!topRect.current || !bottomRect.current) return;

    const tl = gsap.timeline({
      defaults: { duration: 0.45, ease: "cubic-bezier(0.76,0,0.24,1)" },
    });

    if (isOpen) {
      tl.to(topRect.current, { y: 5.7, rotate: 45 }, 0).to(
        bottomRect.current,
        { y: -5.7, rotate: -45 },
        0
      );
    } else {
      tl.to(topRect.current, { y: 0, rotate: 0 }, 0).to(
        bottomRect.current,
        { y: 0, rotate: 0 },
        0
      );
    }

    return () => tl.kill();
  }, [isOpen]);

  return (
    <div onClick={handleMenuClick} className={styles.HamburgerCon}>
      <span ref={topRect} className={styles.topRect} />
      <span ref={bottomRect} className={styles.bottomRect} />
    </div>
  );
};

export default Hamburger;
