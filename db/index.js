import mongoose from "mongoose";
export default function () {
  mongoose
    .connect(
      `mongodb+srv://adminPlayDemo:${process.env.DB_PASSWORD}@playground.kk4ozdz.mongodb.net/mobulous`
    )
    .then(() => {
      console.info("connected to database");
    })
    .catch((err) => console.error(err?.message));
}
