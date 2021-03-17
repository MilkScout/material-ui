import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const getClasses = makeStyles(() => ({
  root: {
    flexDirection: 'column',
    opacity: 0,
    height: 22,
    '&:hover': {
      opacity: '1 !important',
    },
  },
  arrowWrapper: {
    cursor: 'default',
    backgroundColor: '#F1F1F1',
    height: 11,
    lineHeight: '10px',
    '&:hover': {
      backgroundColor: '#D2D2D2',
    },
  },
  arrowUp: {
    marginBottom: 1,
    marginLeft: 4,
    marginRight: 4,
    transform: 'rotate(180deg)',
  },
  arrowDown: {
    marginBottom: 2,
    marginLeft: 4,
    marginRight: 4,
  },
}));

export interface ArrowProps {
  className?: string;
  alt: string;
}

export const Arrow = ({ alt, className }: ArrowProps) => (
  <img
    height={7}
    className={className}
    alt={alt}
    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAyNTUgMjU1Ij4KICAgICAgICA8cG9seWdvbiBmaWxsPSIjNTA1MDUwIiBwb2ludHM9IjAsNjMuNzUgMTI3LjUsMTkxLjI1IDI1NSw2My43NSIvPgo8L3N2Zz4K"
  />
);

export interface NumberFieldArrowProps {
  hide: boolean;
  show: boolean;
  onUpClick: () => void;
  onDownClick: () => void;
}

export const NumberFieldArrow = ({ show, hide, onUpClick, onDownClick }: NumberFieldArrowProps) => {
  const classes = getClasses();
  const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
  return (
    <div
      className={classes.root}
      style={{
        opacity: show ? 1 : 0,
        display: hide || isMobileDevice ? 'none' : 'flex',
      }}
    >
      <div className={classes.arrowWrapper} onClick={onUpClick}>
        <Arrow className={classes.arrowUp} alt="arrow up" />
      </div>
      <div className={classes.arrowWrapper} onClick={onDownClick}>
        <Arrow className={classes.arrowDown} alt="arrow down" />
      </div>
    </div>
  );
};
