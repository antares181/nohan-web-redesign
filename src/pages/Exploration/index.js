import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet-async';
import classNames from 'classnames';
import Section from 'components/Section';
import PodcastPlaceholder from 'assets/projects/01-podcast-small.png';
import PodcastLarge from 'assets/projects/01-podcast-large.png';
import Podcast from 'assets/projects/01-podcast.png';
import WalletPlaceholder from 'assets/projects/02-wallet-small.png';
import WalletLarge from 'assets/projects/02-wallet-large.png';
import Wallet from 'assets/projects/02-wallet.png';
import TaskPlaceholder from 'assets/projects/03-task-small.png';
import TaskLarge from 'assets/projects/03-task-large.png';
import Task from 'assets/projects/03-task.png';
import SepatoPlaceholder from 'assets/projects/04-sepato-small.png';
import SepatoLarge from 'assets/projects/04-sepato-large.png';
import Sepato from 'assets/projects/04-sepato.png';
import SmartHomePlaceholder from 'assets/projects/05-smart-home-small.png';
import SmartHomeLarge from 'assets/projects/05-smart-home-large.png';
import SmartHome from 'assets/projects/05-smart-home.png';
import FileManagerPlaceholder from 'assets/projects/06-file-manager-small.png';
import FileManagerLarge from 'assets/projects/06-file-manager-large.png';
import FileManager from 'assets/projects/06-file-manager.png';
import CulturePlaceholder from 'assets/projects/07-culture-small.png';
import CultureLarge from 'assets/projects/07-culture-large.png';
import Culture from 'assets/projects/07-culture.png';
import Image from 'components/Image';
import {media} from 'utils/style';

import './index.css';

export default function index() {
  console.info(media.mobile);
  return (
    <Fragment>
      <Helmet>
        <title>Explorations</title>
        <meta
          name="description"
          content="Portfolio of Harum Shidiqi – a digital designer working on web &amp; mobile
          apps with a focus on motion and user experience design."
        />
      </Helmet>
      <Section
        className={classNames('project-summary', {
          'project-summary--alternate': false,
          'project-summary--first': index === '01',
        })}
        as="section"
        aria-labelledby="exploration"
        id="exploration"
        tabIndex={-1}>
        <div className="exploration-wrapper">
          <div className="exploration">
            <Image
              reveal
              className="exploration__image"
              delay={100}
              placeholder={PodcastPlaceholder}
              srcSet={`${Podcast} 400w, ${PodcastLarge} 1080w`}
              sizes={`(max-width: ${media.mobile}px) 80vw, 100vw`}
              alt="Me at the Torii (gate) on Miyajima, an island off the coast of Hiroshima in Japan"
            />
            <Image
              reveal
              className="exploration__image"
              delay={200}
              placeholder={WalletPlaceholder}
              srcSet={`${Wallet} 400w, ${WalletLarge} 1080w`}
              sizes={`(max-width: ${media.mobile}px) 80vw, 100vw`}
              alt="Me at the Torii (gate) on Miyajima, an island off the coast of Hiroshima in Japan"
            />
            <Image
              reveal
              className="exploration__image"
              delay={300}
              placeholder={TaskPlaceholder}
              srcSet={`${Task} 400w, ${TaskLarge} 1080w`}
              sizes={`(max-width: ${media.mobile}px) 80vw, 100vw`}
              alt="Me at the Torii (gate) on Miyajima, an island off the coast of Hiroshima in Japan"
            />
            <Image
              reveal
              className="exploration__image"
              delay={400}
              placeholder={SepatoPlaceholder}
              srcSet={`${Sepato} 400w, ${SepatoLarge} 1080w`}
              sizes={`(max-width: ${media.mobile}px) 80vw, 100vw`}
              alt="Me at the Torii (gate) on Miyajima, an island off the coast of Hiroshima in Japan"
            />
            <Image
              reveal
              className="exploration__image"
              delay={500}
              placeholder={SmartHomePlaceholder}
              srcSet={`${SmartHome} 400w, ${SmartHomeLarge} 1080w`}
              sizes={`(max-width: ${media.mobile}px) 80vw, 100vw`}
              alt="Me at the Torii (gate) on Miyajima, an island off the coast of Hiroshima in Japan"
            />
            <Image
              reveal
              className="exploration__image"
              delay={600}
              placeholder={FileManagerPlaceholder}
              srcSet={`${FileManager} 400w, ${FileManagerLarge} 1080w`}
              sizes={`(max-width: ${media.mobile}px) 80vw, 100vw`}
              alt="Me at the Torii (gate) on Miyajima, an island off the coast of Hiroshima in Japan"
            />
            <Image
              reveal
              className="exploration__image"
              delay={700}
              placeholder={CulturePlaceholder}
              srcSet={`${Culture} 400w, ${CultureLarge} 1080w`}
              sizes={`(max-width: ${media.mobile}px) 80vw, 100vw`}
              alt="Me at the Torii (gate) on Miyajima, an island off the coast of Hiroshima in Japan"
            />
          </div>
        </div>
      </Section>
    </Fragment>
  );
}
