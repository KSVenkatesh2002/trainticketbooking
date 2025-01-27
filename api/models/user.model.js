// Suggested code may be subject to a license. Learn more: ~LicenseLog:2072590552.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:681421877.
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        dob: { type: String, required: false },
        password: { type: String, required: true },
        photoURL: { type: String, default:
            'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
