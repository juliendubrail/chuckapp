import React from 'react';
import TableItem from './tableItem';

const Table = props => {
  const { data, removeQuote } = props;
  const items = data.map(joke => <TableItem key={joke.id} item={joke} onClick={removeQuote} />);
  return (
    <div className="column">
      <ul>{items}</ul>
    </div>
  );
};

export default Table;
