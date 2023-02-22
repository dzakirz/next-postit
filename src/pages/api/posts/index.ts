import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import db from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":
      const session = await getServerSession(req, res, authOptions);
      if (!session) return res.status(401).json({ message: "not authorized" });

      const { content }: { content: string } = req.body;

      const user = await db.user.findUnique({
        where: {
          email: session.user?.email as any,
        },
      });

      if (content.length > 300)
        return res.status(403).json({ message: "max 300 character" });
      if (!content.length)
        return res.status(403).json({ message: "should not empty" });

      try {
        const result = await db.post.create({
          data: {
            content,
            userId: user!.id,
          },
        });
        res.status(200).json(result);
      } catch (error) {
        res
          .status(403)
          .json({ message: "error has occured while creating a post" });
      }
      break;
    default:
      res.status(404).json({ message: "method not allowed" });
      break;
  }
}
