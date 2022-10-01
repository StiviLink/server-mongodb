//TECHNIQUES : PNJ et JOUEURS
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            idAvatar: String,
            nom: String,
            description: String,
            niveauTechnique: String,
            elementaire: Boolean,
            element: String,
            type: String,
            impact: String,
            duree: Number,
            energie: Number,
            faculte: String
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("techniques", schema);
};