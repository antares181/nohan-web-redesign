import React, {Suspense, lazy, useEffect, useState, Fragment} from 'react';
import classNames from 'classnames';
import {TransitionGroup, Transition} from 'react-transition-group';
// import DecoderText from 'components/DecoderText';
import {useInterval, usePrevious, useWindowSize, useAppContext} from 'hooks';
import {reflow} from 'utils/transition';
import prerender from 'utils/prerender';
import {media} from 'utils/style';
import {ReactComponent as ArrowDown} from 'assets/icons/arrow-down.svg';
import {tokens} from 'app/theme';
import Section from 'components/Section';
import './Intro.css';

function Intro({id, sectionRef, disciplines, scrollIndicatorHidden, ...rest}) {
  const {theme} = useAppContext();
  const windowSize = useWindowSize();
  const titleId = `${id}-title`;

  return (
    <Section
      className={classNames('intro', `intro__${theme.themeId}`)}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}>
      <Transition
        key={theme.themeId}
        appear={!prerender}
        in={!prerender}
        timeout={3000}
        onEnter={reflow}>
        {(status) => (
          <Fragment>
            <header className="intro__text">
              <h1
                className={classNames('intro__name', `intro__name--${status}`)}
                id={titleId}>
                Harum Shidiqi
              </h1>
              <h2 className="intro__title">
                <span
                  aria-hidden
                  className={classNames('intro__title-row', {
                    'intro__title-row--hidden': prerender,
                  })}>
                  <span
                    className={classNames(
                      'intro__title-word',
                      `intro__title-word--${status}`,
                    )}
                    style={{'--delay': tokens.base.durationXS}}>
                    Designer
                  </span>
                </span>
              </h2>
              <h2 className="intro__title">
                <span
                  aria-hidden
                  className={classNames('intro__title-row', {
                    'intro__title-row--hidden': prerender,
                  })}>
                  <span
                    className={classNames(
                      'intro__title-word',
                      `intro__title-word--${status}`,
                    )}
                    style={{'--delay': tokens.base.durationM}}>
                    &amp; Developer
                  </span>
                </span>
              </h2>
            </header>

            <div className="background background__left"></div>
            <div className="background background__right"></div>

            {windowSize.width > media.tablet && (
              <div
                className={classNames(
                  'intro__scroll-indicator',
                  `intro__scroll-indicator--${status}`,
                  {'intro__scroll-indicator--hidden': scrollIndicatorHidden},
                )}
                status={status}
              />
            )}
            {windowSize.width <= media.tablet && (
              <div
                className={classNames(
                  'intro__mobile-scroll-indicator',
                  `intro__mobile-scroll-indicator--${status}`,
                  {
                    'intro__mobile-scroll-indicator--hidden': scrollIndicatorHidden,
                  },
                )}>
                <ArrowDown aria-hidden />
              </div>
            )}
          </Fragment>
        )}
      </Transition>
    </Section>
  );
}

export default Intro;
