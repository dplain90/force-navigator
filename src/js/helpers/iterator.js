export const eachKey = (hash, cxt, callback) => {
  Object.keys(hash).forEach((key) => {
    callback(key);
  }, cxt);
};
