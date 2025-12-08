import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import React, { useRef } from "react";

gsap.registerPlugin(CSSPlugin);

// Split text into LETTERS
const renderLetters = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{
        fontVariationSettings: `'wght' ${baseWeight}, 'ital' 1`,
        display: "inline-block",
        cursor: "default",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

// Hover logic per LETTER with custom intensity
const setupLetterHover = (container, base = 400, hoverIntensity = 900) => {
  if (!container) return () => {};

  const letters = Array.from(container.querySelectorAll("span"));

  const animateLetter = (letter, weight, duration = 0.3) => {
    gsap.to(letter, {
      css: { fontVariationSettings: `'wght' ${weight}` },
      duration,
      ease: "power2.out",
    });
  };

  const handlers = [];

  letters.forEach((letter) => {
    const onMouseEnter = () => animateLetter(letter, hoverIntensity);
    const onMouseLeave = () => animateLetter(letter, base);

    letter.addEventListener("mouseenter", onMouseEnter);
    letter.addEventListener("mouseleave", onMouseLeave);

    handlers.push({ letter, onMouseEnter, onMouseLeave });
  });

  // Cleanup
  return () => {
    handlers.forEach(({ letter, onMouseEnter, onMouseLeave }) => {
      letter.removeEventListener("mouseenter", onMouseEnter);
      letter.removeEventListener("mouseleave", onMouseLeave);
    });
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subRef = useRef(null);

  // Customize intensity here:
  const pHoverIntensity = 2000; // p tag hover weight
  const h1HoverIntensity = 2000; // h1 hover weight

  useGSAP(() => {
    const cleanupSub = setupLetterHover(subRef.current, 100, pHoverIntensity);
    const cleanupTitle = setupLetterHover(
      titleRef.current,
      400,
      h1HoverIntensity
    );

    return () => {
      cleanupSub();
      cleanupTitle();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subRef}>
        {renderLetters(
          "Hey, I'm Hashir! Welcome to my",
          "text-3xl font-georama",
          100
        )}
      </p>

      <h1 ref={titleRef} className="mt-7 text-9xl font-georama">
  {renderLetters("portfolio", "font-georama", 400)}
</h1>


      <div className="small-screen">
        <p>This Portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
