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

    app.get("/comments/delete/:id", function (req, res) {
        let filter = {_id: ObjectId(req.params.id)};
        let options = {};
        commentsRepository.getComments(filter, {}).then(comment => {
            if(comment[0].author != req.session.user) {
                res.send("Autor del comentario incorrecto");
            }

            commentsRepository.deleteComments(filter, options).then(result => {
                if(result == null || result.deletedCount == 0){
                    res.send("Hubo algún error al borrar");
                } else {
                    res.send("Borrado correctamente");
                }
            }).catch(error => {
                res.send("Hubo algún error al borrar ") + error;
            });
        });
    });

};