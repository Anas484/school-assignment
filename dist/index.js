import "dotenv/config";
import express from "express";
import schoolRouter from "./routes/SchoolRouter.js";
const app = express();
app.use(express.json());
app.use("/api/school", schoolRouter);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map