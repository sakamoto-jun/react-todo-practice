import gsap from "gsap";
import { useEffect, useRef } from "react";

const SimpleAnimation = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const animate = () => {
    tweenRef.current?.kill();

    tweenRef.current = gsap.to(boxRef.current, {
      x: 500,
      rotation: 360,
      duration: 1,
      overwrite: "auto",
    });
  };

  useEffect(() => {
    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  return (
    <div>
      <div
        ref={boxRef}
        style={{ width: 100, height: 100, backgroundColor: "orange" }}
      />
      <button type="button" onClick={animate}>
        애니메이션
      </button>
    </div>
  );
};

export default SimpleAnimation;
