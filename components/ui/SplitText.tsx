"use client";
import { useRef, useEffect, useState, type CSSProperties, type Ref } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

type SplitType = "chars" | "words" | "lines" | "chars,words" | "chars,words,lines";
type SplitTag = "p" | "span" | "h1" | "h2" | "h3" | "div";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: SplitType;
  from?: Record<string, unknown>;
  to?: Record<string, unknown>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  tag?: SplitTag;
  onLetterAnimationComplete?: () => void;
}

export function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag: Tag = "p",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (!("fonts" in document)) {
      const fallback = requestAnimationFrame(() => setFontsLoaded(true));
      return () => cancelAnimationFrame(fallback);
    }

    let cancelled = false;
    const markLoaded = () => {
      if (!cancelled) setFontsLoaded(true);
    };

    if (document.fonts.status === "loaded") {
      const frame = requestAnimationFrame(markLoaded);
      return () => {
        cancelled = true;
        cancelAnimationFrame(frame);
      };
    }

    document.fonts.ready.then(markLoaded);
    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;

      const el = ref.current as HTMLElement & { _rbsplitInstance?: InstanceType<typeof GSAPSplitText> };

      if (el._rbsplitInstance) {
        try { el._rbsplitInstance.revert(); } catch { /* noop */ }
        el._rbsplitInstance = undefined;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit  = marginMatch ? marginMatch[2] ?? "px" : "px";
      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets: Element[] | undefined;
      const assignTargets = (self: InstanceType<typeof GSAPSplitText>) => {
        if (splitType.includes("chars") && self.chars.length)  targets = self.chars;
        if (!targets && splitType.includes("words") && self.words.length) targets = self.words;
        if (!targets && splitType.includes("lines") && self.lines.length) targets = self.lines;
        if (!targets) targets = self.chars ?? self.words ?? self.lines ?? [];
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === "lines",
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        reduceWhiteSpace: false,
        onSplit: (self) => {
          assignTargets(self);
          const tween = gsap.fromTo(
            targets!,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4,
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();
              },
              willChange: "transform, opacity",
              force3D: true,
            }
          );
          return tween;
        },
      });

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach((st) => { if (st.trigger === el) st.kill(); });
        try { splitInstance.revert(); } catch { /* noop */ }
        el._rbsplitInstance = undefined;
      };
    },
    {
      dependencies: [text, delay, duration, ease, splitType, JSON.stringify(from), JSON.stringify(to), threshold, rootMargin, fontsLoaded],
      scope: ref,
    }
  );

  const sharedStyle: CSSProperties = {
    textAlign,
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: "normal",
    wordWrap: "break-word",
    willChange: "transform, opacity",
  };
  const sharedClassName = `split-parent ${className}`;
  const sharedRef = ref as Ref<HTMLElement>;

  switch (Tag) {
    case "span":
      return <span ref={sharedRef as Ref<HTMLSpanElement>} style={sharedStyle} className={sharedClassName}>{text}</span>;
    case "h1":
      return <h1 ref={sharedRef as Ref<HTMLHeadingElement>} style={sharedStyle} className={sharedClassName}>{text}</h1>;
    case "h2":
      return <h2 ref={sharedRef as Ref<HTMLHeadingElement>} style={sharedStyle} className={sharedClassName}>{text}</h2>;
    case "h3":
      return <h3 ref={sharedRef as Ref<HTMLHeadingElement>} style={sharedStyle} className={sharedClassName}>{text}</h3>;
    case "div":
      return <div ref={sharedRef as Ref<HTMLDivElement>} style={sharedStyle} className={sharedClassName}>{text}</div>;
    default:
      return <p ref={sharedRef as Ref<HTMLParagraphElement>} style={sharedStyle} className={sharedClassName}>{text}</p>;
  }
}
