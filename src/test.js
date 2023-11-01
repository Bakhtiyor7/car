Array.prototype.last = function () {
  if (!arr.length) {
    return -1;
  } else {
    return arr[arr.length - 1];
  }
};

const arr = [1, 2, 3];
const nums = [];

arr.last(); // 3
nums.last();
