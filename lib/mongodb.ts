import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// hot-reload / 서버리스 환경에서 연결이 쌓이지 않도록 globalThis에 캐싱 (6주차 패턴)
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI 환경변수가 없습니다. .env.local을 확인하세요.");
  }
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; // 실패한 Promise를 캐시에 남기지 않아 다음 요청이 재시도하게 함
    throw err;
  }
  return cached.conn;
}
