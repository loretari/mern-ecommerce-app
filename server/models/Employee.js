import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        mail: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "Sales Assistant",
        },
        salary: {
            type: Number,
            required: true,
        }
    },
    // createdAd
    {timestamps: true}
)




export const Employee = mongoose.model("Employee", EmployeeSchema);

