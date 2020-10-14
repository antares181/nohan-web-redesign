import React, {Fragment} from 'react';
import classNames from 'classnames';
import {Helmet} from 'react-helmet-async';
import {Transition} from 'react-transition-group';
import Image from 'components/Image';
import Section from 'components/Section';
import ProfileImg from 'assets/profile.png';
import ProfileImgLarge from 'assets/profile-large.png';
import ProfileImgPlaceholder from 'assets/profile-placeholder.png';
import {reflow} from 'utils/transition';
import {media} from 'utils/style';
import './index.css';
import {Button} from 'components/Button';
import {Link} from 'components/Link';

const ProfileText = ({status, titleId}) => (
  <Fragment>
    <Helmet>
      <title>Contact</title>
      <meta
        name="description"
        content="Portfolio of Harum Shidiqi – a digital designer working on web &amp; mobile
          apps with a focus on motion and user experience design."
      />
    </Helmet>

    <h2
      className={classNames('profile__title', `profile__title--${status}`)}
      id={titleId}>
      Hi there
    </h2>
    <p
      className={classNames(
        'profile__description',
        `profile__description--${status}`,
      )}>
      I’m Harum, currently I live in Solo, Central Java, Indonesia. My projects include
      UX/UI design and Frontend development for web or mobile.
    </p>
    <p
      className={classNames(
        'profile__description',
        `profile__description--${status}`,
      )}>
      Feel free to contact me at <b>harumshidiqi@gmail.com</b> or from my social
      media.
    </p>
  </Fragment>
);

const Profile = () => {
  const titleId = `profile-title`;

  return (
    <Section
      className="profile"
      as="section"
      id="profile"
      aria-labelledby={titleId}
      tabIndex={-1}>
      <Transition in={true} timeout={0} onEnter={reflow}>
        {(status) => {
          return (
            <div className="profile__content">
              {
                <div className="profile__column">
                  <div className="profile__image-wrapper">
                    <Image
                      reveal
                      className="profile__image"
                      delay={100}
                      placeholder={ProfileImgPlaceholder}
                      srcSet={`${ProfileImg} 280w, ${ProfileImgLarge} 460w`}
                      sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                      alt="Me at the Torii (gate) on Miyajima, an island off the coast of Hiroshima in Japan"
                    />
                  </div>
                </div>
              }
              <div className="profile__column">
                <ProfileText status={status} titleId={titleId} />
                <Button
                  secondary
                  iconHoverShift
                  as="a"
                  href='./CV - Harum Shidiqi v1.pdf'
                  target="_blank"
                  iconEnd="arrowRight">
                  Download My CV
                </Button>
              </div>
            </div>
          );
        }}
      </Transition>

      <div className="background background__left"></div>
      <div className="background background__right"></div>
    </Section>
  );
};

export default Profile;
