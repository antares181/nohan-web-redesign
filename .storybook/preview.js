import {configure, addParameters, addDecorator} from '@storybook/react';
import {themes} from '@storybook/theming';
import React, {Fragment, useEffect} from 'react';
import {withKnobs, select} from '@storybook/addon-knobs';
import {withA11y} from '@storybook/addon-a11y';
import {theme} from '../src/app/theme';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import MetropolisLight from '../src/assets/fonts/Metropolis-Light.woff2';
import MetropolisBold from '../src/assets/fonts/Metropolis-Bold.woff2';
import {fontStyles, globalStyles, AppContext} from '../src/app';
import '../src/app/index.css';
import './preview.css';

addParameters({
  options: {
    theme: {
      ...themes.dark,
      brandImage: 'https://nohan.studio/icon.svg',
      brandTitle: 'Harum Shidiqi Components',
      brandUrl: 'https://nohan.studio',
    },
  },
});

const themeKeys = {
  Dark: 'dark',
  Light: 'light',
};

addDecorator((story) => {
  const content = story();
  const themeKey = select('Theme', themeKeys, 'dark');
  const currentTheme = theme[themeKey];

  useEffect(() => {
    document.body.setAttribute('class', themeKey);
  }, [themeKey]);

  return (
    <HelmetProvider>
      <Fragment>
        <Helmet>
          <link
            rel="preload"
            href={MetropolisLight}
            as="font"
            crossorigin="crossorigin"
          />
          <link
            rel="preload"
            href={MetropolisBold}
            as="font"
            crossorigin="crossorigin"
          />
          <style>{fontStyles}</style>
          <style>{globalStyles}</style>
        </Helmet>
        <AppContext.Provider state={{theme: currentTheme}}>
          <div id="story-root" className="story-root" key={themeKey}>
            {content}
          </div>
        </AppContext.Provider>
      </Fragment>
    </HelmetProvider>
  );
});

addDecorator(withKnobs);
addDecorator(withA11y);
configure(require.context('../src', true, /\.stories\.js$/), module);

export const parameters = {
  layout: 'fullscreen',
};
