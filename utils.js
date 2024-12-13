

// this function will simply takes a function and returns a function, the returned function takes the arguments and we will pass those 
// to the function which is coming from arguments.

export const TryCatch = (func) => {
    return function (req,res,next) {
        return Promise.resolve(func(req,res,next)).catch(error => next(error))
    }
}

export const TryCatchSimpler = (func) => (req,res,next) => {
    return Promise.resolve(func(req,res,next)).catch(error => next(error))
}

// it is mainly to avoid repeated try catch blocks and it returns error if any error in all the controller flow