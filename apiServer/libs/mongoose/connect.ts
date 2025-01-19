import mongoose from 'mongoose';

declare global {
  var mongoose: any // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI
// const MONGODB_URI = 'mongodb://127.0.0.1:27017/apparel';

if (!MONGODB_URI) {
  throw new Error('MONGODB URI is missing');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const dbConnect = async () => {

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw new Error('Failed to connect with db');
  }

  return cached.conn
}