import React from 'react';
import propTypes from 'prop-types';
import './Button.css';

export const IconButton = ({ children, ...allyProps }) => {
  return (
    <button type="submit" className="SearchForm-button" {...allyProps}>
      {children}
    </button>
  );
};

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  children: propTypes.node,
  'aria-label': propTypes.string.isRequired,
};
