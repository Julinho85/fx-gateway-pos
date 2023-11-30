/**
 * Client Mongoose Schema
 *
 * This file contain Schema for loading files in database to use with Mongoose library
 *
 * @author Julio Hernandez (e-jhernandez)
 */

import { model, Schema } from "mongoose";

const tcSchema = new Schema({
    email: {type:String, required:true},
    card_number: {type:String, required:true},
    cvv: {type:String, required:true},
    expiration_year: {type:String, required:true},
    expiration_month: {type:String, required:true}
});

tcSchema.index({ card_number: 1, cvv: -1 }, { unique: true })

// tcSchema.methods.getNumberCard = function() {
//     const { __v,
//         _id, 
//         cvv,
//         expiration_year,
//         expiration_month , ...tc} = this.toObject();

//     tc.pk_tc = card_number;
//     return tc;
// }

const TC = model("tc", tcSchema);

export default TC;
