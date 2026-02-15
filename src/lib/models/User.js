import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nid: { type: String, required: true },
  contact: { type: String, required: true },
  password: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  provider: { type: String, default: 'credentials' },
}, { timestamps: true });

UserSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
