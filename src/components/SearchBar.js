import React from 'react';

export default ({ term, currentData, initialData, dataType, update }) => {
  const dataSearch = () => {
    const value = term.toLowerCase();
    const filteredData = initialData[dataType].filter(user => {
      return user.firstName.toLowerCase().includes(value);
    });

    update({
      currentData: filteredData,
      active: 0,
      term: value,
      activePage: 1,
      isSorted: false,
    });
  };

  const handleChange = e => {
    if (initialData[dataType]) {
      e.target.placeholder = 'Search people by name...';
      update({ term: e.target.value });
    } else {
      e.target.placeholder = 'Please, select data set...';
    }
  };

  const handleClick = () => {
    if (initialData[dataType]) {
      dataSearch();
    } else {
      update({
        currentData: null,
        active: 0,
        activePage: 1,
      });
    }
  };

  return (
    <div className="input-group">
      <input
        value={term}
        type="text"
        className="form-control"
        placeholder="Search people by name..."
        onChange={handleChange}
      />
      <button className="btn btn-default index_btn" onClick={handleClick}>
        Search{' '}
      </button>
    </div>
  );
};