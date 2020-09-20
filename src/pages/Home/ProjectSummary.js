import React, {Fragment} from 'react';
import classNames from 'classnames';
import {Transition} from 'react-transition-group';
import {Link} from 'components/Link';
import Section from 'components/Section';
import {Button} from 'components/Button';
import Image from 'components/Image';
// import Model from 'components/Model';
// import Divider from 'components/Divider';
import {useWindowSize} from 'hooks';
import {reflow} from 'utils/transition';
import {media} from 'utils/style';
import './ProjectSummary.css';

const ProjectSummary = ({
  id,
  visible,
  sectionRef,
  index,
  title,
  description,
  model,
  buttonText,
  buttonLink,
  buttonTo,
  alternate,
  image,
  ...rest
}) => {
  // const {theme} = useAppContext();
  const {width} = useWindowSize();
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;

  const renderDetails = (status) => (
    <div className="project-summary__details">
      <div aria-hidden className="project-summary__index">
        {/* <Divider
          notchWidth="64px"
          notchHeight="8px"
          collapsed={status !== 'entered'}
          collapseDelay={1000}
        /> */}
        <span
          className={classNames(
            'project-summary__index-number',
            `project-summary__index-number--${status}`,
          )}>
          {/* {indexText} */}
          PROJECTS
        </span>
      </div>
      <h2
        className={classNames(
          'project-summary__title',
          `project-summary__title--${status}`,
        )}
        id={titleId}>
        {title}
      </h2>
      <p
        className={classNames(
          'project-summary__description',
          `project-summary__description--${status}`,
        )}>
        {description}
      </p>
      <div
        className={classNames(
          'project-summary__button',
          `project-summary__button--${status}`,
        )}>
        {buttonLink && (
          <Button
            secondary
            iconHoverShift
            as="a"
            href={buttonLink}
            target="_blank"
            iconEnd="arrowRight">
            {buttonText}
          </Button>
        )}
        {buttonTo && (
          <Button iconHoverShift as={Link} to={buttonTo} iconEnd="arrowRight">
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );

  const renderPreview = (status) => (
    <div className="project-summary__preview">
      <Image reveal delay={300} {...image} />
    </div>
  );
  return (
    <Section
      className={classNames('project-summary', {
        'project-summary--alternate': alternate,
        'project-summary--first': index === '01',
      })}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}>
      <div className="project-summary__content">
        <Transition in={visible} timeout={0} onEnter={reflow}>
          {(status) => {
            return (
              <Fragment>
                {!alternate && !isMobile && (
                  <Fragment>
                    {renderDetails(status)}
                    {renderPreview(status)}
                  </Fragment>
                )}
                {(alternate || isMobile) && (
                  <Fragment>
                    {renderPreview(status)}
                    {renderDetails(status)}
                  </Fragment>
                )}
              </Fragment>
            );
          }}
        </Transition>
      </div>
    </Section>
  );
};

export default ProjectSummary;
