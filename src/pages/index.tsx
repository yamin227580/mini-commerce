import Products from "@/components/Product";
import SearchProduct from "@/components/SearchProduct";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchProducts } from "@/store/slices/productSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const products = useAppSelector((state) => state.products.items);
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const cart = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (products.length) {
      setFilterProducts(products);
    }
  }, [products]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Link href={"/cart"} style={{ textDecoration: "none" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "1200px",
            alignItems: "center",
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 50, cursor: "pointer" }} />
          {cart.length > 0 && (
            <Typography sx={{ fontSize: 18 }}>{cart.length}</Typography>
          )}
        </Box>
      </Link>
      <SearchProduct
        products={products}
        setFilterProducts={setFilterProducts}
      />
      <Products products={filterProducts} />
    </Box>
  );
}
