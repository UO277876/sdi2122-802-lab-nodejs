const {ObjectId} = require("mongodb")

module.exports = function (app, commentsRepository) {
    app.post("/comments/:song_id", function (req, res) {
        if(!req.session.user) {
            res.send("No hay usuario en sesion")
        }

        let comment = {
            text: req.body.text,
            author: req.session.user,
            song_id: ObjectId(req.params.song_id)
        }
        commentsRepository.insertComments(comment).then(comment_id => {
            res.send("Agregado comentario " + comment_id)
        }).catch(error => {
            res.send("Error al insertar comentario " + error)
        });
    });

};