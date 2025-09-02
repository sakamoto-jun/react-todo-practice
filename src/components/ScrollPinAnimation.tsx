import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ScrollPinAnimation = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        x: 500,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=500",
          scrub: true,
          pin: true,
          markers: true,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div style={{ height: "100vh", backgroundColor: "palegreen" }}>
        Scroll Down
      </div>
      <div
        ref={wrapperRef}
        style={{ height: "100vh", backgroundColor: "rebeccapurple" }}
      >
        <div
          ref={boxRef}
          style={{ width: 100, height: 100, backgroundColor: "orange" }}
        />
      </div>
      <div style={{ height: "100vh" }}></div>
    </div>
  );
};

export default ScrollPinAnimation;
