const mongoose = require('mongoose');

const fcsSchema = new mongoose.Schema(
    {
        FeeConfigs: []
    },
    {
        timestamps: {
            createdAt: "created_At",
            updatedAt: "updated_At"
        }
    }
)

module.exports.Fcs = mongoose.model("FCS", fcsSchema);