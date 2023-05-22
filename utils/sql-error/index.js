function getDuplicateValue(error) {
  let flag = false;
  let result = "";

  for (let i = 0; i < error.length; i++) {
    if (error.charCodeAt(i) === 39) {
      if (flag) {
        return result;
      }
      flag = true;
    } else {
      if (flag) {
        result += error[i];
      }
    }
  }
}

module.exports = getDuplicateValue;
