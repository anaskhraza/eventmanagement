const CaseModel = require("../models/case-models");
// const csv = require('csvtojson');
// const multer = require('multer');

function fetchAllCases(data) {
  ////console.log("CaseController >> fetching >> data", data);
  // var waitTill = new Date(new Date().getTime() + 3 * 1000);
  // while (waitTill > new Date()) { }
  return CaseModel.getCases(data);
}

const allCasesRoute = (req, res) => {
  var casesDataObj = fetchAllCases(req.body);
  casesDataObj
    .then(data => {
      //var parsedCategoryObject = transforCategoryObject(data);
      ////console.log(data);
      res.json({ status: true, data });
    })
    .catch(error => {
      ////console.log('ERROR:', error); // print the error;
      res.json({ status: false, data: error });
    });
};

module.exports = { allCasesRoute };
