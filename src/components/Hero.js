import React from 'react';
import Button from './Button';

const HeroActions = ({ heroActionsTitle, onHeroActionClick }) => {
  /* 
    Ici meme si on est deja un peu plus flexible, dans l'ideal on recevrait aussi en prop quelles action on veut et dans quel ordre.
    e.g:
    [
      {
        order: 0,
        text: 'Yay',
      },
      {
        order: 1,
        text: 'Nay',
      },
    ];
  */
  return (
    <div>
      <h5>{heroActionsTitle}</h5>
      <Button text={'Yay'} onClick={onHeroActionClick} />
      <Button text={'Nay'} onClick={() => onHeroActionClick(false)} />
    </div>
  );
};

/* 
  Ici on fait en sorte que le Hero soit bien configurable en lui passant tout ce dont il a besoin en props. Meme le fait de 
  montrer des actions (les buttons) devrait etre optionel. Et idealement la background image devrait l'etre aussi (mais j'ai pas toucher ca).
  Comme ca tu pourrais reutiliser le Hero component ailleur avec une image differente et avec ou sans actions.
  Les bouttons aussi doivent etre configurables au max, ca rend la reutilisation plus simple si on en besoin dans d'autres
  parties de l'app.
*/
const Hero = props => {
  // Ce component devroit etre fonctionel (vs class) puisqu'on utilise ni le state ni les lifecylehooks.
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
