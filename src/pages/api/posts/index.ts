import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      break;
    case "POST":
      const session = await getServerSession(req, res, authOptions);
      if (!session) return res.status(401).json({ message: "not authorized" });
      break;
    case "PUT":
      break;
    case "DELETE":
      break;
    default:
      break;
  }

  res.status(200).json({ name: "John Doe" });
}
