//AVATARS : PNJ et JOUEURS
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            idAvatar: String,
            idSac: String,
            name: String,
            age: Number,
            description: String,
            histoire: String,
            sexe: String,
            race: String,
            job: String,
            salaire: String,
            classe: String,
            element: String,
            localisation: String,
            image: String,
            niveau: Number,
            xp: Number,
            telephone: Number,
            carte: Boolean,
            pnj: Boolean,
            mort: Boolean,
            prison: Boolean,
            arme: String,
            compte: Number,
            banque: Number,
            force: Number,
            magie: Number,
            endurance: Number,
            physique: Number,
            magique: Number,
            detente: Number,
            agilite: Number,
            intelligence: Number,
            vitesse: Number,
            precision: Number,
            portee: Number,
            mental: Number,
            sante: Number,
            energie: Number,
            positionActuelle: {
                    quartier: String,
                    rue: String,
                    lieu: String,
                    cote: String
            },
            positionSuivante: {
                    quartier: String,
                    rue: String,
                    lieu: String,
                    cote: String
            },
            distance: Number,
            vessie: Number,
            ventre: Number,
            fatigue: Number
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("avatars", schema);
};