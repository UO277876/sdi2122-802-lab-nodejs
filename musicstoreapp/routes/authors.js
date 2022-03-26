module.exports = function (app) {
    app.get("/authors", function (req, res) {
        let authors = [{
            "name": "Dan Reynolds",
            "group": "Imagine Dragons",
            "rol": "cantante"
        }, {
            "name": "Patrick Stump",
            "group": "Fall Out Boy",
            "rol": "guitarrista"
        }, {
            "name": "Clinton Cave",
            "group": "Chase Atlantic",
            "rol": "cantante"
        }];

        let response = {
            authors:authors
        };
        res.render("authors/authors.twig", response);
    });

    app.get('/authors/add',function (req,res) {
        var roles = [
            {"name": "Cantante"},
            {"name": "Batería"},
            {"name": "Guitarrista"},
            {"name": "Bajista"},
            {"name": "Teclista"}
        ]

        let response = {
            roles:roles
        };
        res.render("authors/add.twig", response);
    });

    app.post('/authors/add',function (req,res) {
        let response = "";

        if(req.query.name == ""){
            response += "Nombre no enviado en la petición" + "<br>";
        } else{
            response += "Autor agregado: " + req.body.name + "<br>";
        }

        if(req.query.group == ""){
            response += "Grupo no enviado en la petición" + "<br>";
        } else {
            response += " grupo: " + req.body.group + "<br>";
        }
        response += " rol: " + req.body.rol;
        res.send(response);
    });

    app.get("/authors/*=*", function (req, res) {
        res.redirect("/authors");
    })

};