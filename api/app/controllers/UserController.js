import _ from "lodash";
import db from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt-nodejs";
import UserServices from "../services/UserServices";
import moment from "moment";

export default class UserController {
  constructor() {
    this.db = db;
    this.UserServices = new UserServices(this.db);

    this.fetchAllUsers = this.fetchAllUsers.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.signIn = this.signIn.bind(this);
    this.validateToken = this.validateToken.bind(this);
  }

  async fetchAllUsers(req, res) {
    try {
      const response = await this.UserServices.getAllUsers();

      if (response) {
        res.send(200, response);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async fetchUser(req, res) {
    try {
      var userId = req.params.id;
      const response = await this.UserServices.getUser(userId);

      if (response) {
        res.send(200, response);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  comparePassword(passw, userRespPass, cb) {
    bcrypt.compare(passw, userRespPass, function(err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  }

  validatePassword(password, userResponse, res) {
    let resp = {};
    const that = this;
    this.comparePassword(password, userResponse[0].password, (err, isMatch) => {
      if (isMatch && !err) {
        var token = jwt.sign(
          JSON.parse(JSON.stringify(userResponse[0])),
          "nodeauthsecret",
          { expiresIn: 86400 * 30 }
        );
        //console.log("here -> ", token);
        jwt.verify(token, "nodeauthsecret", function(err, data) {
          //console.log("error -> ", err, data);
        });
        res.status(200).send({ success: true, token: "JWT " + token });
      } else {
        res.status(200).send({
          success: false,
          token: "",
          msg: "Authentication failed. Wrong password."
        });
      }

      return resp;
    });
    //console.log("resp -> ", resp);
    return resp;
  }

  async createUser(req, res) {
    try {
      const dataObj = req.body;
      //console.log("createUser -> ", dataObj);
      let userResponse = await this.UserServices.createUser(dataObj);

      if (userResponse) {
        res.send(200, userResponse);
      } else {
        res.send(403, "error in fetching data");
      }
    } catch (ex) {
      //console.log("ex ", ex);

      res.send(400, "some error occured");
    }
  }

  async signIn(req, res) {
    try {
      
      const username = req.body.username;
      console.log("createUser -> ", req);
      const userResponse = await this.UserServices.getUser(username);
      const respObj = this.validatePassword(
        req.body.password,
        userResponse,
        res
      );
    } catch (ex) {
      //console.log("ex ", ex);

      res.send(400, "some error occured");
    }
  }

  validateToken(req, res, next) {

    console.log("validateToken -> ", req.headers);

    var token = this.getToken(req.headers);
    if (token) {
      next();
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }

  getToken = function(headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(" ");
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
}
