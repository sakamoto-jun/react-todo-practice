import gsap from "gsap";
import { useEffect, useRef } from "react";

const TimelineAnimation = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const animate = () => {
    tlRef.current?.kill();

    tlRef.current = gsap
      .timeline({
        defaults: { overwrite: "auto" },
      })
      .to(boxRef.current, { x: 500, duration: 1 })
      .to(boxRef.current, { y: 250, duration: 1 })
      .to(boxRef.current, { rotation: 360, duration: 1 });
  };

  useEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

  return (
    <div>
      <div
        ref={boxRef}
        style={{ width: 100, height: 100, backgroundColor: "purple" }}
      />
      <button type="button" onClick={animate}>
        애니메이션
      </button>
    </div>
  );
};

export default TimelineAnimation;
