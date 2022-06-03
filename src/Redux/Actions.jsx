export const fetchData = (data) => ({
    type: 'FETCH_DATA_REQUEST',
    payload: data,
  });

  export const sendData = (userStatus) => ({
    type: 'USER_STATUS',
    payload: userStatus
  });

  export const checkedStatus = (checkedUser) => ({
    type: 'CHECKED_STATUS',
    payload: checkedUser
  });
