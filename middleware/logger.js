export const logger = (req, res, next) => {
    console.log(`${req.method} ${req.hostname+req.url} ${new Date(Date.now())}`)
    next();
}

