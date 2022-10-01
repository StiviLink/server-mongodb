//VILLAGES
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            idLieu: String,
            idQuartier: String,
            nom: String,
            description: String,
            region: String,
            superficie: Number,
            coordonnees: String
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("lieu", schema);
};