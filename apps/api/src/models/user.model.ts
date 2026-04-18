import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  ipAddress: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
      default: '',
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    ipAddress: {
      type: String,
      default: '',
    },
    // ✅ required for forgot/reset password flow
    resetPasswordToken: {
      type: String,
      default: undefined,
    },
    resetPasswordExpires: {
      type: Date,
      default: undefined,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('User', userSchema);
