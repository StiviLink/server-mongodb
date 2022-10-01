//BOUTIQUES
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            idProduit: String,
            idBoutique: String,
            idCategory: String,
            nom: String,
            description: String,
            prix: Number,
            duree: Number,
            distance: Number,
            impact: String,
            deplacement: Number,
            sac: Boolean,
            contenance: Number
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("produits", schema);
};