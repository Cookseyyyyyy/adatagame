// src/components/Overlay.js
import React, { useEffect, useRef } from 'react';
import './Overlay.css';

function Overlay({ image, title, bodyText, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    // Focus the overlay when it mounts
    if (overlayRef.current) {
      overlayRef.current.focus();
    }

    // Handle Esc key to close the overlay
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Split the bodyText by double newline characters to create paragraphs
  const renderBodyText = () => {
    if (!bodyText) return null;
    return bodyText.split('\n\n').map((paragraph, index) => (
      <p key={index} className="overlay-paragraph">
        {paragraph}
      </p>
    ));
  };

  return (
    <div
      className="overlay-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="overlay-title"
      aria-describedby="overlay-body"
    >
      <div
        className="overlay-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex="-1"
        ref={overlayRef}
      >
        {image && (
          <div className="overlay-image-container">
            <img src={image} alt="Overlay" className="overlay-image" />
          </div>
        )}
        {title && (
          <h2 id="overlay-title" className="overlay-title">
            {title}
          </h2>
        )}
        {bodyText && (
          <div id="overlay-body" className="overlay-body">
            {renderBodyText()}
          </div>
        )}
        <button className="overlay-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Overlay;