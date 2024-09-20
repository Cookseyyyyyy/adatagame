// components/Tooltip.js
import React, { useState } from 'react';
import './Tooltip.css';

const Tooltip = ({ children, text }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className="tooltip-container"
      tabIndex="0"
      aria-describedby="tooltip"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      <span className={`tooltip-text ${visible ? 'visible' : ''}`} role="tooltip">
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
