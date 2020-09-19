import React, {
  lazy,
  Suspense,
  useEffect,
  createContext,
  useReducer,
  Fragment,
} from 'react';
import {BrowserRouter, Switch, Route, useLocation} from 'react-router-dom';
import {
  Transition,
  TransitionGroup,
  config as transitionConfig,
} from 'react-transition-group';
import classNames from 'classnames';
import {Helmet, HelmetProvider} from 'react-helmet-async';
// import Header from 'components/Header';
import {theme, tokens, createThemeProperties} from 'app/theme';
import {media, msToNum} from 'utils/style';
import {useLocalStorage, usePrefersReducedMotion} from 'hooks';
import MetropolisLight from 'assets/fonts/Metropolis-Light.woff2';
import MetropolisBold from 'assets/fonts/Metropolis-Bold.woff2';
import {initialState, reducer} from 'app/reducer';
import {reflow} from 'utils/transition';
import prerender from 'utils/prerender';
import './index.css';

const Home = lazy(() => import('pages/Home'));
const Contact = lazy(() => import('pages/Contact'));
const Project = lazy(() => import('pages/Project'));
const Exploration = lazy(() => import('pages/Exploration'));
const Page404 = lazy(() => import('pages/404'));

export const AppContext = createContext();
export const TransitionContext = createContext();

export const fontStyles = `
  @font-face {
    font-family: "Metropolis";
    font-weight: 400;
    src: url(${MetropolisLight}) format("woff");
    font-display: swap;
  }

  @font-face {
    font-family: "Metropolis";
    font-weight: 500;
    src: url(${MetropolisBold}) format("woff2");
  
    font-display: swap;
  }
`;

const App = () => {
  const [storedTheme] = useLocalStorage('theme', 'dark');
  const [state, dispatch] = useReducer(reducer, initialState);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      transitionConfig.disabled = true;
    } else {
      transitionConfig.disabled = false;
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!prerender) {
      console.info(`prerender react`);
    }
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    dispatch({type: 'setTheme', value: theme[storedTheme]});
  }, [storedTheme]);

  return (
    <HelmetProvider>
      <AppContext.Provider value={{...state, dispatch}}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppContext.Provider>
    </HelmetProvider>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const {pathname} = location;

  return (
    <Fragment>
      <Helmet>
        <link rel="canonical" href={`https://nohan.studio${pathname}`} />
        <link rel="preload" href={MetropolisBold} as="font" crossorigin="" />

        <link rel="preload" href={MetropolisLight} as="font" crossorigin="" />
        <style>{fontStyles}</style>
        <style>{globalStyles}</style>
      </Helmet>
      <a className="skip-to-main" href="#MainContent">
        Skip to main content
      </a>
      {/* <Header location={location} /> */}
      <TransitionGroup
        component="main"
        className="app"
        tabIndex={-1}
        id="MainContent">
        <Transition
          key={pathname}
          timeout={msToNum(tokens.base.durationS)}
          onEnter={reflow}>
          {(status) => (
            <TransitionContext.Provider value={{status}}>
              <div className={classNames('app__page', `app__page--${status}`)}>
                <Suspense fallback={<Fragment />}>
                  <Switch location={location}>
                    <Route exact path="/" component={Home} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/projects" component={Project} />
                    <Route path="/explorations" component={Exploration} />
                    <Route component={Page404} />
                  </Switch>
                </Suspense>
              </div>
            </TransitionContext.Provider>
          )}
        </Transition>
      </TransitionGroup>
    </Fragment>
  );
};

export const globalStyles = `
  :root {
    ${createThemeProperties(tokens.base)}
  }

  @media (max-width: ${media.laptop}px) {
    :root {
      ${createThemeProperties(tokens.laptop)}
    }
  }

  @media (max-width: ${media.tablet}px) {
    :root {
      ${createThemeProperties(tokens.tablet)}
    }
  }

  @media (max-width: ${media.mobile}px) {
    :root {
      ${createThemeProperties(tokens.mobile)}
    }
  }

  @media (max-width: ${media.mobileS}px) {
    :root {
      ${createThemeProperties(tokens.mobileS)}
    }
  }

  .dark {
    ${createThemeProperties(theme.dark)}
  }

  .light {
    ${createThemeProperties(theme.light)}
  }
`;

export default App;
