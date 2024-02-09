"use strict";
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    // console.log(req.headers, '********************')
    let token = req.headers.token;
    // console.log(token)
    if (token) {
      let decoded = jwt.decode(token)
      if (decoded) {
        // console.log(decoded)
        req.user = decoded;
        next();
      } else {
        res.status(401).json({status: 401, messages: "Invalid valid token details."})
      }
    } else {
      res.status(401).json({status: 401, messages: "The specified endpoint requires valid token."})
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({status : 500, messages: err.message})
  }    
}