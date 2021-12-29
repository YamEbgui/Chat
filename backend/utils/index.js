const removeUser = (usersArray, user) => {
  if (usersArray.length === 0) {
    return [];
  } else if (usersArray[0] === user) {
    return usersArray.slice(1);
  } else {
    return [usersArray[0]].concat(removeUser(usersArray.slice(1), user));
  }
};

module.exports = removeUser;
