require('../model/stickers');
var mongoose = require('mongoose');
var Sticker = mongoose.model('Sticker');
var defaultLimit = 10;
var Q = require('q');

function getList(params){
    var deferred = Q.defer();
    var limit = params.limit ? parseInt(params.limit, 10) : defaultLimit;
    var skip = params.skip ? parseInt(params.skip, 10) : 0;
    Sticker.find({isDeleted: false}).limit(limit).skip(limit * skip).exec(function(err, data){
        if(err){ deferred.reject({status: 503}); };
        deferred.resolve(data);
    })
    return deferred.promise;
};

module.exports = {

    fetchList: function(req){
        return getList(req.query);
    }

}
