import { unlink } from "fs/promises";

const deleteImage = async (path) => {
  try {
    await unlink(path);
    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
};

export { deleteImage };
