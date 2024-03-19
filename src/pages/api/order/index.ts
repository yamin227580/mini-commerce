// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CartItem } from "@/types/cart";
import { prisma } from "@/utils/db";
import { OrderStatus, Product } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const cartItems = req.body as CartItem[];
    const cartItemIds = cartItems.map((item) => item.id);
    const products = await prisma.product.findMany({
      where: { id: { in: cartItemIds } },
    });
    let totalPrice = 0;
    const getProductPriceWithQuantity = (item: CartItem) => {
      const product = products.find(
        (product) => product.id === item.id
      ) as Product;
      return product?.price * item.quantity;
    };
    cartItems.forEach((item) => {
      const price = getProductPriceWithQuantity(item);
      totalPrice += price;
    });
    const createdOrder = await prisma.order.create({
      data: { status: OrderStatus.ORDERED, totalPrice: totalPrice },
    });
    const orderId = createdOrder.id;
    cartItems.forEach(async (item) => {
      const data = { orderId, productId: item.id, quantity: item.quantity };
      await prisma.orderline.create({ data });
    });
    return res.status(200).json({ orderId, status: OrderStatus.ORDERED });
  }
  res.status(200).json({ name: "John Doe" });
}
