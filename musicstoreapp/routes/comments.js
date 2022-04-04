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
        commentsRepository.getComments(filter, options).then(comment => {
            if(req.session.user != comment[0].author){
                res.send("Este comentario pertenece a otro usuario");
            } else {
                commentsRepository.deleteComments(comment, function (result) {
                    if(result == null){
                        res.send("Hubo algún error al borrar");
                    }
                    res.send("Borrado correctamente");
                }).catch(error => {
                    res.send("Hubo algún error al borrar ") + error;
                });
            }
        }).catch(error => {
            res.send("Se ha producido un error con el comentario " + error)
        });
    });

};