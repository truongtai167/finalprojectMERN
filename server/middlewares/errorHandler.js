const notFound = (req, res) => {
    const err = new Error(`Route ${req.originalUrl} is not found!`);
    res.status(404);
    next(err);
  };
  
  const ErrorHandle = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    return res.status(statusCode).json({
      success: false,
      message: err?.message,
    });
  };
  
  module.exports = {
    notFound,
    ErrorHandle,
  };
  