import { Router } from "express";
import {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.get("/getEmployee", getEmployee);
router.post("/createEmployee", upload.single("image"), createEmployee);
router.patch("/updateEmployee", upload.single("image"), updateEmployee);
router.delete("/deleteEmployee", deleteEmployee);

export default router;
