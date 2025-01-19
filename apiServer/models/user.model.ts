import { Schema, model, models, Document, Model } from 'mongoose';

export interface ty_Users extends Document {
  name: string;
  google_id: string;
  email: string;
  image: string;
};

const userSchema = new Schema<ty_Users>({

  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  google_id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }

});

export const Users: Model<ty_Users> = models.User || 
model<ty_Users>('User', userSchema);

userSchema.index({ google_id: 1 }, { unique: true });