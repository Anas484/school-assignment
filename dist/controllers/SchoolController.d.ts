import type { Request, Response } from "express";
declare const addSchool: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const listSchools: (req: Request, res: Response) => Promise<void>;
export { addSchool, listSchools };
//# sourceMappingURL=SchoolController.d.ts.map