import React, {Fragment} from 'react';
import classNames from 'classnames';
import {Transition} from 'react-transition-group';
// import DecoderText from 'components/DecoderText';
import {useWindowSize, useAppContext} from 'hooks';
import {reflow} from 'utils/transition';
import prerender from 'utils/prerender';
import {media} from 'utils/style';
import {ReactComponent as ArrowDown} from 'assets/icons/arrow-down.svg';
import {tokens} from 'app/theme';
import Section from 'components/Section';
import './index.css';

function Resource({
  id,
  sectionRef,
  disciplines,
  scrollIndicatorHidden,
  ...rest
}) {
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
                in progress
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
                    Coming
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
                    Soon
                  </span>
                </span>
              </h2>
            </header>

            <div className="background background__left"></div>
            <div className="background background__right"></div>
          </Fragment>
        )}
      </Transition>
    </Section>
  );
}

export default Resource;
