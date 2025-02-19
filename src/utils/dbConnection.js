import { openDB } from "idb";

const DB_NAME = "dacoid";
const STORE_NAME = "dacoidQuiz";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export const addData = async (data) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.add(data);
  await tx.done;
};

export const getAllData = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};
