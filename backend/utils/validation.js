const { validationResult } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);
    console.log(validationErrors)
    if (!validationErrors.isEmpty()) {
      // const errors = validationErrors
      //   .array()
      //   .map((error) =>`${error.param}':'${error.msg}`);
        let errObj = {}
        // let array = validationErrors.array()
        // for(let i=1; i<array.length; i+=2){
        //   errObj[array[i].param] = array[i].msg
        // }
        validationErrors.array().forEach(e => { errObj[e.param] = e.msg})

      const err = Error('Validation error');
      // err.errors = errors;
      err.errors = errObj
      err.status = 400;
      err.title = 'Validation error';
      next(err);
    }
    next();
  };

  module.exports = {handleValidationErrors};