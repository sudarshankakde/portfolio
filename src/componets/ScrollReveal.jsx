import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

function processNode(node, index) {
  if (node === null || node === undefined) return null;

  if (typeof node === 'string' || typeof node === 'number') {
    const textStr = String(node);
    return textStr.split(/(\s+)/).map((part, i) => {
      if (part.match(/^\s+$/)) return part;
      return (
        <span className="word" key={`${index}-${i}`}>
          {part}
        </span>
      );
    });
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => processNode(child, `${index}-${i}`));
  }

  if (React.isValidElement(node)) {
    const children = node.props.children
      ? React.Children.map(node.props.children, (child, i) => processNode(child, `${index}-${i}`))
      : null;
    return React.cloneElement(node, { key: index }, children);
  }

  return node;
}

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.05,
  baseRotation = 0,
  blurStrength = 8,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom 75%'
}) => {
  const containerRef = useRef(null);

  const formattedContent = useMemo(() => {
    return processNode(children, 'sr');
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const wordElements = el.querySelectorAll('.word');

    const ctx = gsap.context(() => {
      if (baseRotation !== 0) {
        gsap.fromTo(
          el,
          { transformOrigin: '0% 50%', rotate: baseRotation },
          {
            ease: 'none',
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom',
              end: rotationEnd,
              scrub: 0.5
            }
          }
        );
      }

      if (wordElements && wordElements.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top 80%',
            end: wordAnimationEnd,
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        });

        tl.fromTo(
          wordElements,
          {
            opacity: baseOpacity,
            filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
            y: 8
          },
          {
            ease: 'power1.out',
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            stagger: 0.05
          }
        );
      }
    }, el);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [scrollContainerRef, formattedContent, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <div className={`scroll-reveal-text ${textClassName}`}>{formattedContent}</div>
    </div>
  );
};

export default ScrollReveal;
