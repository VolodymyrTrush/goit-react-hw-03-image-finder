import propTypes from 'prop-types';
import React from 'react';
import './ImageGalleryItem.css';

export const ImageGalleryItem = ({ onClick, tags, preview, largeImage }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        onClick={() => {
          onClick(largeImage);
        }}
        src={preview}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImage: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  preview: propTypes.string.isRequired,
  onClick: propTypes.func,
};
