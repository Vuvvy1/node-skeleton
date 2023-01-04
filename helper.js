const getUserByKeyValue = (key, value, database) => {
  for (const userID in database) {
    if (database[userID][key] === value) {
      return database[userID];
    }
  }
};


module.exports = {
  generateRandomString,
  getUserByKeyValue,
  urlsForUser,
  getUniqueVisitorCount
};
