import React from 'react';
import classNames from 'classnames';
import {Button} from 'components/Button';
import {useAppContext} from 'hooks';
import Icon from 'components/Icon';
import './ThemeToggle.css';

const ThemeToggle = ({isMobile, ...rest}) => {
  const {dispatch, theme} = useAppContext();
  const {themeId} = theme;
  const isDark = themeId === 'dark';

  const handleClick = () => {
    dispatch({type: 'toggleTheme'});
  };

  return (
    <Button
      iconOnly
      className={classNames('theme-toggle', {'theme-toggle--mobile': isMobile})}
      aria-label="Toggle theme"
      onClick={handleClick}
      {...rest}>
      <Icon
        icon={isDark ? 'sun' : 'moon'}
        className={classNames({'theme-toggle__circle--dark': isDark})}
      />
    </Button>
  );
};

export default ThemeToggle;
