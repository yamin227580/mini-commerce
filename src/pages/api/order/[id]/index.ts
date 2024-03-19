import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  console.log(method);

  if (method === "DELETE") {
    const query = req.query;

    const orderId = Number(query.id);
    if (!orderId) return res.status(400).send("Bad request.");

    const isFound = await prisma.order.findFirst({ where: { id: orderId } });
    if (!isFound) return res.status(400).send("Bad request.");

    await prisma.orderline.deleteMany({ where: { orderId } });
    await prisma.order.deleteMany({ where: { id: orderId } });

    return res.status(200).send("OK");
  }
  res.status(405).send("Method not allowed.");
}
