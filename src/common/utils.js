const assertHasProperty = (obj, prop) => {
  let has = obj[prop] === null || obj[prop] === undefined;
  if (has == false) {
    throw new Error(prop);
  }
  return has;
};

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

const isNullOrEmpty = (text) => {
  return text === null || text === undefined || text.length == 0;
};

const isNull = (text) => {
  return text === null || text === undefined;
};

const today = () => {
  let dt = new Date();
  const offset = dt.getTimezoneOffset();
  dt = new Date(dt.getTime() - offset * 60 * 1000);
  return dt.toISOString().split("T")[0];
};

module.exports = {
  assertHasProperty,
  catchAsync,
  today,
  isNullOrEmpty,
  isNull
};
