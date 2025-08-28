module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
// This function takes an asynchronous function (fn) as an argument and returns a new function.
// The returned function executes the original function and catches any errors that occur during its execution.