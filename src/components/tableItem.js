import React from 'react';

const TableItem = ({ item, onClick }) => (
  <li>
    {item.joke}
    <button onClick={() => onClick(item.id)}>Remove</button>
  </li>
);

export default TableItem;
