import React from 'react';

import TableItem from './tableItem';

/* 
  ici meme si le TableItem est relativement simple on peu l'extraire dans un autre component, il risque de devenir
  plus complex plus tard si on rajoute des feature etc. Ou alors le Table component pourrait devenir plus complex et ca rendrait le code
  plus lisible d'extraire un max de trucs.
*/

const Table = ({ data, removeQuote }) => {
  const items = data.map(joke => <TableItem key={joke.id} item={joke} onClick={removeQuote} />);
  return (
    <div className="column">
      <ul>{items}</ul>
    </div>
  );
};

export default Table;
