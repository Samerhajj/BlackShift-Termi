import React from "react";
import { useSpring, animated } from "react-spring";
import "./TransitionEffect.css";

const TransitionEffect = () => {
  const props1 = useSpring({
    from: { transform: "translateX(100%)", width: "100%" },
    to: { transform: "translateX(0%)", width: "0%" },
    config: { duration: 800,easing: t => t },
  });

  const props2 = useSpring({
    from: { transform: "translateX(100%)", width: "100%" },
    to: { transform: "translateX(0%)", width: "0%" },
    delay: 200,
    config: { duration: 800, easing: t => t },
  });

  const props3 = useSpring({
    from: { transform: "translateX(100%)", width: "100%" },
    to: { transform: "translateX(0%)", width: "0%" },
    delay: 400,
    config: { duration: 800, easing: t => t },
  });

  return (
    <div className="transition-effect-container">
      <animated.div className="bg-primary transition-effect" style={props1} />
      <animated.div className="bg-light transition-effect" style={props2} />
      <animated.div className="bg-dark transition-effect" style={props3} />
    </div>
  );
};

export default TransitionEffect;

