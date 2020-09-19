import React from 'react';
import classNames from 'classnames';
import {useId} from 'hooks';
import './index.css';

function Monogram({highlight, className, ...props}) {
  const id = useId();
  const clipId = `monogram-clip-${id}`;

  return (
    <svg
      aria-hidden
      className={classNames('monogram', className)}
      width="30"
      height="37"
      viewBox="0 0 30 37"
      {...props}>
      <defs>
        <clipPath id={clipId}>
          <path d="M14.9473 9.83334L30 0.519989V37.48H29.9729L14.962 28.1925L0.0269821 37.4641H0V0.554161L14.9473 9.83334ZM14.9293 13.0548L5.16509 7.06852V7.07024L2.94233 5.69038V32.3446L10.9236 27.3899L14.9293 24.9612V13.0548Z" />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className="monogram__highlight" width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
}

export default Monogram;
