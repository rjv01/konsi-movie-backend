const mongoose = require('mongoose');

const IpSchema = new mongoose.Schema({
    ipaddress : {
        type:String
    },
},{timestamps:true});

const IpModel = mongoose.model("IpModel",IpSchema);

module.exports = IpModel;