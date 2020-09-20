import React, {useState, useEffect, useRef, Fragment} from 'react';
import {Helmet} from 'react-helmet-async';
import Intro from 'pages/Home/Intro';
import {usePrefersReducedMotion, useRouteTransition} from 'hooks';
import {useLocation} from 'react-router-dom';
// import MyFoodDiary from 'assets/projects/my-food-diary.png';
import MyFoodDiaryLarge from 'assets/projects/my-food-diary-large.png';
import MyFoodDiaryPlaceholder from 'assets/projects/my-food-diary-placeholder.png';
import ProjectSummary from 'pages/Home/ProjectSummary';
import {media} from 'utils/style';

const disciplines = [
  'Developer',
  'Prototyper',
  'Animator',
  'Illustrator',
  'Modder',
];

export default function Home() {
  const {status} = useRouteTransition();
  const {hash, state} = useLocation();
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const revealSections = [intro, projectOne];

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

    indicatorObserver.observe(intro.current);

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
      const hashSections = [intro, projectOne];
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

      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />

      <ProjectSummary
        alternate
        id="project"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Food Diary to track what you eat everyday."
        description="My Food Diary will help to track your daily food consumption with easy way."
        buttonText="View App"
        buttonLink="https://play.google.com/store/apps/details?id=com.myfooddiary&hl=en"
        // buttonTo="/projects/smart-sparrow"
        image={{
          srcSet: `${MyFoodDiaryLarge} 700w, ${MyFoodDiaryLarge} 1920w`,
          placeholder: {MyFoodDiaryPlaceholder},
          alt: 'The Slice web appication showing a selected user annotation.',
          sizes: `(max-width: ${media.mobile}px) 200w, (max-width: ${media.tablet}px) 90vw, 80vw`,
        }}
      />
    </Fragment>
  );
}
