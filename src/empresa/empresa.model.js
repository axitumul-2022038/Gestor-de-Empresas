import { Schema, model } from "mongoose"

const companySchema = Schema({
    nameEmpresa: {
        type: String,
        required: true
    },
    añosExperiencia: {
        type: String,
        required: true
    },
    nivelDeImpacto: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category",
        required: true
    }
}, {
    versionKey: false
})

//esto pluralizar
export default model('company', companySchema)