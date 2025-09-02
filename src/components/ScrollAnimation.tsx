import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimation = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        x: 400,
        rotation: 360,
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 70%",
          end: "bottom 15%",
          scrub: 0.5,
          markers: true,
        },
      });
    }, boxRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div style={{ height: "100vh" }}></div>
      <div
        ref={boxRef}
        style={{ width: 100, height: 100, backgroundColor: "orange" }}
      ></div>
      <div style={{ height: "100vh" }}></div>
    </div>
  );
};

export default ScrollAnimation;
