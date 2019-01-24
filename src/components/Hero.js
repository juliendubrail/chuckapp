import React from 'react';
import Button from './Button';

const HeroActions = ({ heroActionsTitle, onHeroActionClick }) => {
  return (
    <div>
      <h5>{heroActionsTitle}</h5>
      <Button text={'Yay'} onClick={onHeroActionClick} />
      <Button text={'Nay'} onClick={() => onHeroActionClick(false)} />
    </div>
  );
};


const Hero = props => {
  const { title, heroActions, heroActionsTitle, onHeroActionClick } = props;
  const heroActionsProps = { heroActionsTitle, onHeroActionClick };
  return (
    <div className="hero">
      <div className="heroTitle">{title}</div>
      {heroActions && <HeroActions {...heroActionsProps} />}
    </div>
  );
};

export default Hero;
