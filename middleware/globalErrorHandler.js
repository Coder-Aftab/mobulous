

const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Use custom status code if available, else default to 500
    console.error(err.stack);
    res.status(statusCode).json({ error: err.message || 'Something went wrong' });
}



export default globalErrorHandler;