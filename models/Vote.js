// models/Vote.js
import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema({
    voteId: {
        type: String,
        required: true,
        unique: true, // Ensures the voteId is unique
    },
    candidateName: {
        type: String,
        required: true,
    },
});

export default mongoose.models.Vote || mongoose.model("Vote", VoteSchema);
