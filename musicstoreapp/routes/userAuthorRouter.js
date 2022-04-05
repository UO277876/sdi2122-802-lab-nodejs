const express = require('express');
const path = require("path");
const {ObjectId} = require("mongodb");
const songsRepository = require("../repositories/songsRepository");
const userAuthorRouter = express.Router();
userAuthorRouter.use(function (req, res, next) {
    console.log("userAuthorRouter");
    let songId = path.basename(req.originalUrl);
    let filter = {_id: ObjectId(songId)};
    songsRepository.findSong(filter, {}).then(song => {
        if (req.session.user && song.author === req.session.user) {
            next();
        } else {
            let filter = {user: req.session.user, songId: ObjectId(songId)};
            let options = {projection: {_id: 0, songId: 1}};
            songsRepository.getPurchases(filter, options).then(purchasedIds => {
                if (purchasedIds != null && purchasedIds.length > 0) {
                    next();
                    return;
                } else {
                    res.redirect("/shop");
                }
            }).catch(error => {
                res.redirect("/shop");
            })
        }
    }).catch(error => {
        res.redirect("/shop");
    });
});
module.exports = userAuthorRouter;