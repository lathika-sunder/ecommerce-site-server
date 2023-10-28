const fs = require("fs");

const dataPath = 'categories-data.json';

function getCategories(callback) {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      const categories = JSON.parse(data);
      callback(null, categories);
    }
  });
}

module.exports = {
  getCategories
};
