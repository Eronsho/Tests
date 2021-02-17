import React from "react";

export default ({ data, active }) => {
  if (!data || !data[active]) {
    return "";
  }

  const user = data[active];

  return (
    <table className="user-info table table-responsive">
      <thead>
        <tr className="index__table">
          <td>Выбран пользователь: </td>
          <td>
            <b>
              {user.firstName} {user.lastName}
            </b>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="2">
            <p>Описание:</p>
            <textarea
              rows="6"
              cols="45"
              readOnly="readonly"
              value={user.description}
            />
          </td>
        </tr>
        <tr>
          <td>Адрес проживания:</td>
          <td>
            <b>{user.address.streetAddress}</b>
          </td>
        </tr>
        <tr>
          <td>Город:</td>
          <td>
            <b>{user.address.city}</b>
          </td>
        </tr>
        <tr>
          <td>Провинция/штат:</td>
          <td>
            <b>{user.address.state}</b>
          </td>
        </tr>
        <tr>
          <td>Индекс:</td>
          <td>
            <b>{user.address.zip}</b>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
