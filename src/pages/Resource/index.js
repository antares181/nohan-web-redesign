import React, {useState, useEffect, useRef, Fragment} from 'react';
import {Helmet} from 'react-helmet-async';
import {usePrefersReducedMotion, useRouteTransition} from 'hooks';
import {useLocation} from 'react-router-dom';
// import MyFoodDiary from 'assets/projects/my-food-diary.png';
import ECommerce1x from 'assets/projects/e-commerce1x.png';
import ECommerce2x from 'assets/projects/e-commerce2x.png';
import ECommerce3x from 'assets/projects/e-commerce3x.png';
import MyFoodDiaryPlaceholder from 'assets/projects/my-food-diary-placeholder.png';
import ProjectSummary from 'pages/Home/ProjectSummary';

export default function Resource() {
  const {status} = useRouteTransition();
  const {hash, state} = useLocation();
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const projectOne = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const revealSections = [projectOne];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections((prevSections) => [...prevSections, section]);
          }
        });
      },
      {rootMargin: '0px 0px -10% 0px'},
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      {rootMargin: '-100% 0px 0px 0px'},
    );

    revealSections.forEach((section) => {
      sectionObserver.observe(section.current);
    });

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  useEffect(() => {
    const hasEntered = status === 'entered';
    const supportsNativeSmoothScroll =
      'scrollBehavior' in document.documentElement.style;
    let scrollObserver;
    let scrollTimeout;

    const handleHashchange = (hash, scroll) => {
      clearTimeout(scrollTimeout);
      const hashSections = [projectOne];
      const hashString = hash.replace('#', '');
      const element = hashSections.filter(
        (item) => item.current.id === hashString,
      )[0];
      if (!element) return;
      const behavior = scroll && !prefersReducedMotion ? 'smooth' : 'instant';
      const top = element.current.offsetTop;

      scrollObserver = new IntersectionObserver(
        (entries, observer) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            scrollTimeout = setTimeout(
              () => {
                element.current.focus();
              },
              prefersReducedMotion ? 0 : 400,
            );
            observer.unobserve(entry.target);
          }
        },
        {rootMargin: '-20% 0px -20% 0px'},
      );

      scrollObserver.observe(element.current);

      if (supportsNativeSmoothScroll) {
        window.scroll({
          top,
          left: 0,
          behavior,
        });
      } else {
        window.scrollTo(0, top);
      }
    };

    if (hash && initHash.current && hasEntered) {
      handleHashchange(hash, false);
      initHash.current = false;
    } else if (!hash && initHash.current && hasEntered) {
      window.scrollTo(0, 0);
      initHash.current = false;
    } else if (hasEntered) {
      handleHashchange(hash, true);
    }

    return () => {
      clearTimeout(scrollTimeout);
      if (scrollObserver) {
        scrollObserver.disconnect();
      }
    };
  }, [hash, state, prefersReducedMotion, status]);

  return (
    <Fragment>
      <Helmet>
        <title>Harum Shidiqi | Designer + Developer</title>
        <meta
          name="description"
          content="Portfolio of Harum Shidiqi – a digital designer working on web &amp; mobile
          apps with a focus on motion and user experience design."
        />
      </Helmet>

      <ProjectSummary
        alternate
        id="project"
        sectionRef={projectOne}
        visible={true}
        index={1}
        title="Free E-Commerce UI Kit"
        description="This is free UI Kit for e-commerce. I hope it’s helpful."
        buttonText="Download Now"
        buttonLink="https://bit.ly/FreebiesUIKit"
        // buttonTo="/projects/smart-sparrow"
        image={{
          srcSet: `${ECommerce1x} 320w, ${ECommerce2x} 520w, ${ECommerce3x} 720w`,
          placeholder: {MyFoodDiaryPlaceholder},
          alt: 'This is free UI Kit for e-commerce. I hope it’s helpful.',
          sizes: `(min-width: 720px) 50vh, (min-width: 520px) 80vw, (min-width: 320) 40vw, 100vw`,
        }}
      />
    </Fragment>
  );
}
