import React from 'react';

// changer a functional component comme pas d'utilisation des lifecycleHooks ou tu state.
const TableItem = ({ item, onClick }) => (
  <li>
    {item.joke}
    <button onClick={() => onClick(item.id)}>Remove</button>
  </li>
);

export default TableItem;
