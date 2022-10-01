//AVATARS : PNJ et JOUEURS
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            idFiche: String,
            nom: String,
            prenom: String,
            pseudo: String,
            surnom: String,
            age: Number,
            anniversaire: String,
            taille: Number,
            poids: Number,
            origine: String,
            nationality: String,
            langue: String,
            sexe: String,
            profession: String,
            url: String,
            avatar:{
                    descriptionPhysique: String,
                    descriptionMorale: String,
                    verse: String,
                    statut: [String],
                    rang: Number,
                    bestRang: Number,
                    generalRang: Number,
                    division: String,
                    victoire: Number,
                    nul: Number,
                    defaite: Number,
                    affinite: String,
                    armes: [String],
                    mental: Number,
                    agilite: Number,
                    force: Number,
                    intelligence: Number,
                    velocite: Number,
                    sensoriel: Number
            }
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("avatars_community", schema);
};