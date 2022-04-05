module.exports = {
    mongoClient: null,
    app: null,
    init: function (app, mongoClient) {
        this.mongoClient = mongoClient;
        this.app = app;
    },
    getComments: async function (filter, options) {
        try {
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("musicStore");
            const collectionName = 'comments';
            const commentsCollections = database.collection(collectionName);
            const comments = await commentsCollections.find(filter, options).toArray();
            return comments;
        } catch (error) {
            throw (error);
        }
    },
    insertComments: async function (comment) {
        try {
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("musicStore");
            const collectionName = 'comments';
            const commentsCollections = database.collection(collectionName);
            const result = await commentsCollections.insertOne(comment);
            return result.insertedId;
        } catch (error) {
            throw (error);
        }
    },
    deleteComments: async function (filter, options) {
        try {
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("musicStore");
            const collectionName = 'comments';
            const commentsCollection = database.collection(collectionName);
            const result = await commentsCollection.deleteOne(filter, options);
            return result;
        } catch (error) {
            throw (error);
        }
    }
};