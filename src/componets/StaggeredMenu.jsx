import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import "./StaggeredMenu.css";

// Static text array to prevent re-renders from interrupting GSAP frames
const STATIC_TEXT_LINES = ["Menu", "Close"];

export const StaggeredMenu = ({
  position = "right",
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl,
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  accentColor = "#9676ce",
  changeMenuColorOnOpen = true,
  isFixed = true,
  closeOnClickAway = true,
  zIndex = 100,
  openZIndex = 99999,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const backdropRef = useRef(null);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);
  const textInnerRef = useRef(null);
  const toggleBtnRef = useRef(null);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);
  const busyRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const backdrop = backdropRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set(panel, { xPercent: offscreen, opacity: 0 });
      if (backdrop) gsap.set(backdrop, { opacity: 0 });
      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current)
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  // Handle body scroll locking when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
    );
    const socialTitle = panel.querySelector(".sm-socials-title");
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));

    const offscreen = position === "left" ? -100 : 100;

    // Reset starting positions
    if (itemEls.length) gsap.set(itemEls, { yPercent: 120 });
    if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    // Backdrop animation
    if (backdropRef.current) {
      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        0,
      );
    }

    // Panel slide with ultra-smooth easing
    tl.fromTo(
      panel,
      { xPercent: offscreen, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.5, ease: "power4.out" },
      0,
    );

    if (itemEls.length) {
      const itemsStart = 0.12;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.05,
        },
        itemsStart,
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.3,
            ease: "power2.out",
            "--sm-num-opacity": 1,
            stagger: 0.05,
          },
          itemsStart + 0.05,
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = 0.25;
      if (socialTitle) {
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.35, ease: "power2.out" },
          socialsStart,
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power3.out",
            stagger: 0.04,
            onComplete: () =>
              gsap.set(socialLinks, { clearProps: "opacity,transform" }),
          },
          socialsStart + 0.05,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    if (!panel) return;

    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
    }

    const offscreen = position === "left" ? -100 : 100;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(panel, { xPercent: offscreen, opacity: 0 });
        if (backdropRef.current) gsap.set(backdropRef.current, { opacity: 0 });
        busyRef.current = false;
      },
    });

    if (backdropRef.current) {
      tl.to(
        backdropRef.current,
        { opacity: 0, duration: 0.35, ease: "power2.inOut" },
        0,
      );
    }

    tl.to(
      panel,
      {
        xPercent: offscreen,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut",
        overwrite: "auto",
      },
      0,
    );

    closeTweenRef.current = tl;
  }, [position]);

  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();

    spinTweenRef.current = gsap.to(icon, {
      rotate: opening ? 225 : 0,
      duration: 0.4,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  }, []);

  const animateColor = useCallback(
    (opening) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen],
  );

  useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current
          ? openMenuButtonColor
          : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    const targetY = opening ? -75 : 0;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: targetY,
      duration: 0.4,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
    onMenuOpen,
    onMenuClose,
  ]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={
        (className ? className + " " : "") +
        "staggered-menu-wrapper " +
        (isFixed ? " fixed-wrapper" : "")
      }
      style={{
        ...(accentColor ? { "--sm-accent": accentColor } : {}),
        ...(zIndex !== undefined ? { "--sm-z-index": zIndex } : {}),
        ...(openZIndex !== undefined ? { "--sm-open-z-index": openZIndex } : {}),
      }}
      data-position={position}
      data-open={open || undefined}
    >
      <div
        ref={backdropRef}
        className="sm-backdrop"
        onClick={closeMenu}
        aria-hidden="true"
      />

      <header
        className="staggered-menu-header"
        aria-label="Main navigation header"
      >
        <div className="sm-logo" aria-label="Logo">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-white text-[1.7rem] font-bold font-Kalnia leading-none tracking-wider"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                className="sm-logo-img"
                draggable={false}
                style={{ maxHeight: "32px", width: "auto", display: "block" }}
              />
            ) : (
              "S."
            )}
          </Link>
        </div>
        <button
          ref={toggleBtnRef}
          className="sm-toggle focus:outline-none"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {STATIC_TEXT_LINES.map((l, i) => (
                <span
                  className="sm-toggle-line font-mono uppercase text-sm text-end tracking-widest"
                  key={i}
                >
                  {l}
                </span>
              ))}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel "
        
        aria-hidden={!open}
      >
        <div className="sm-panel-inner justify-center h-full flex flex-col">
          <ul
            className="sm-panel-list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  <Link
                    className="sm-panel-item font-Kalnia text-[#e9e9ef]"
                    to={it.link}
                    onClick={closeMenu}
                    aria-label={it.ariaLabel}
                    data-index={idx + 1}
                  >
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item text-[#e9e9ef]">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title font-mono uppercase text-xs tracking-wider">
                Socials
              </h3>
              <ul className="sm-socials-list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link font-mono uppercase text-[11px] tracking-wider"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;
