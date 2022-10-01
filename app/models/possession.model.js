//BOUTIQUES
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            idAvatar: String,
            idProduit: String,
            idSac: String,
            quantite: Number,
            duree: Number,
            sac: Boolean
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("possession", schema);
};