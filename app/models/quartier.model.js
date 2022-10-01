//VILLAGES
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            idQuartier: String,
            idVillage: String,
            nom: String,
            description: String,
            region: String,
            superficie: Number,
            coordonnees: String,
            lieux: [{
                nom: String,
                description: String,
                superficie: Number,
                acces: Boolean,
                training: Boolean,
                mission: Boolean,
                proprietaires: [],
                rue : [{
                    nom: String,
                    cote: String,
                    distance: Number,
                    longueur: Number
                }]
            }],
            rues: [{
                nom: String,
                debuts: [{
                    rue: String,
                    cote: String,
                    distance: Number
                }],
                fin: String,
                longueur: Number,
                largeur: Number,
                acces: Boolean
            }]
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("quartier", schema);
};