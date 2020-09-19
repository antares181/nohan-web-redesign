import React, {Suspense, lazy, useEffect, useState, Fragment} from 'react';
import classNames from 'classnames';
import {TransitionGroup, Transition} from 'react-transition-group';
import {useInterval, usePrevious, useWindowSize, useAppContext} from 'hooks';
import {reflow} from 'utils/transition';
import {media} from 'utils/style';
import {ReactComponent as ArrowDown} from 'assets/icons/arrow-down.svg';
import {tokens} from 'app/theme';
import Section from 'components/Section';
import './Intro.css';

function Intro({id, sectionRef, disciplines, scrollIndicatorHidden, ...rest}) {
  const {theme} = useAppContext();
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const windowSize = useWindowSize();
  const prevTheme = usePrevious(theme);
  const introLabel = [
    disciplines.slice(0, -1).join(', '),
    disciplines.slice(-1)[0],
  ].join(', and ');
  const currentDisciplines = disciplines.filter(
    (item, index) => index === disciplineIndex,
  );
  const titleId = `${id}-title`;

  useInterval(
    () => {
      const index = (disciplineIndex + 1) % disciplines.length;
      setDisciplineIndex(index);
    },
    5000,
    theme.themeId,
  );

  useEffect(() => {
    if (prevTheme && prevTheme.themeId !== theme.themeId) {
      setDisciplineIndex(0);
    }
  }, [theme.themeId, prevTheme]);

  return (
    <Section
      className="intro"
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}>
      <Transition key={theme.themeId} timeout={3000} onEnter={reflow}>
        {(status) => (
          <Fragment>
            <header className="intro__text">
              <h1
                className={classNames('intro__name', `intro__name--${status}`)}
                id={titleId}></h1>
              <h2 className="intro__title">
                <span className="intro__title-label">{`Designer + ${introLabel}`}</span>
                <span
                  aria-hidden
                  className={classNames('intro__title-row', {
                    'intro__title-row--hidden': false,
                  })}>
                  <span
                    className={classNames(
                      'intro__title-word',
                      `intro__title-word--${status}`,
                    )}
                    style={{'--delay': tokens.base.durationXS}}>
                    Designer
                  </span>
                  <span
                    className={classNames(
                      'intro__title-line',
                      `intro__title-line--${status}`,
                    )}
                  />
                </span>
                <TransitionGroup
                  className={classNames('intro__title-row', {
                    'intro__title-row--hidden': false,
                  })}
                  component="span">
                  {currentDisciplines.map((item, index) => (
                    <Transition
                      appear
                      timeout={{enter: 3000, exit: 2000}}
                      key={item}
                      onEnter={reflow}>
                      {(wordStatus) => (
                        <span
                          aria-hidden
                          className={classNames(
                            'intro__title-word',
                            'intro__title-word--plus',
                            `intro__title-word--${wordStatus}`,
                          )}
                          style={{'--delay': tokens.base.durationL}}>
                          {item}
                        </span>
                      )}
                    </Transition>
                  ))}
                </TransitionGroup>
              </h2>
            </header>
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
