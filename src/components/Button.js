import React from 'react';

const Button = ({ onClick, text }) => (
  <button className="button" onClick={onClick}>
    {text}
  </button>
);

export default Button;
