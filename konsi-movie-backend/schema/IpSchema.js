const mongoose = require('mongoose');

const IpSchema = new mongoose.Schema({
  ipaddress: {
    type: String,
    required: true
  }
}, { timestamps: true });

const IpModel = mongoose.model("IpModel", IpSchema);
console.log("Ip Model is working");

module.exports = IpModel;
