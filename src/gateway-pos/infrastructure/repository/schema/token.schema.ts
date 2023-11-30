/**
 * Client Mongoose Schema
 *
 * This file contain Schema for loading files in database to use with Mongoose library
 *
 * @author Julio Hernandez (e-jhernandez)
 */

import { model, Schema } from "mongoose";

const tokenSchema = new Schema({
    token: {type:String, required:true},
    data: {type:String, required:true},
    expiration_date: { type: Date, required: true },
});

tokenSchema.index({ token: 1}, { unique: true })

const Token = model("token", tokenSchema);

export default Token;
