//BOUTIQUES
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            idCategory: String,
            nom: String,
            description: String
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("categoryProduit", schema);
};