import _ from 'lodash';
import db from '../models';
import moment from 'moment';
import fs from 'fs';
import pdf from 'html-pdf';
import ProductServices from '../services/ProductServices';

export default class PrintController {
  constructor() {
    this.db = db;

    this.printPDF = this.printPDF.bind(this);
  }

  saveFile(req, res) {
    var reqObj = req.body;
    var htmlBody = reqObj.htmlBody;
    var eventCode = reqObj.eventCode;

    // fs.write(__dirname + '/' + eventCode + '.html', htmlBody, function(err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    // });
    var options = { format: 'Letter' };

    pdf
      .create(unescape(htmlBody), options)
      .toFile('../../../invoices/' + eventCode + '.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
      });
    res.send({ status: '202', reposne: 'Suucess' });
  }

  async getHtmlTemplate() {
    const path = require('path').join(__dirname, '..', '/assets/print.html');

    console.log('dir templeate', path);
    return fs.readFileSync(path, 'utf-8');
  }

  getCustomerObj(dataObj) {
    let customerObj = null;

    if (dataObj.fetchOrderItems) {
      customerObj = dataObj.orderInfo.order_customer;
    } else {
      customerObj = dataObj.orderInfo.customer;
    }
    return customerObj;
  }

  getOrderObj(dataObj) {
    let orderObj = null;

    if (dataObj.fetchOrderItems) {
      orderObj = dataObj.orderInfo;
    } else {
      orderObj = dataObj.orderInfo.order;
    }
    return orderObj;
  }

  async printPDF(req, res) {
    try {
      const dataObj = req.body;
      const template = await this.getHtmlTemplate();
      const compiledTemplate = _.template(template);
      // console.log('dataObj -> ', dataObj);
      const customer = this.getCustomerObj(dataObj);
      const order = this.getOrderObj(dataObj);

      const orderCount = dataObj.orderedData.length;
      const orderedData = new Array(Math.ceil(dataObj.orderedData.length / 3))
        .fill()
        .map(_ => dataObj.orderedData.splice(0, 3));

      const data = {
        customer,
        order,
        orderedData,
        orderCount,
        todayDate: moment().format('DD, MMM, YYYY')
      };

      const htmlBody = compiledTemplate(data);

      var options = { format: 'Letter' };

      pdf
        .create(unescape(htmlBody), options)
        .toFile('../invoices/1000' + order.id + '.pdf', function(err, resp) {
          if (err) return res.send(204, err);
          res.send(200, resp);
        });
    } catch (ex) {
      console.log("ex ", ex);

      res.send(400, 'some error occured');
    }
  }
}
