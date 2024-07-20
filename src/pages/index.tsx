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
        position: "relative",
        width: "100%vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "120px",
          bgcolor: "#FC6736",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          zIndex: 10,
        }}
      >
        <Typography
          sx={{
            color: "#EDEBEE",
            fontSize: 32,
            mr: 8,
            cursor: "pointer",
            display: { xs: "none", sm: "block" },
          }}
        >
          Shopping
        </Typography>
        <Box sx={{ zIndex: 20 }}>
          <SearchProduct
            products={products}
            setFilterProducts={setFilterProducts}
          />
        </Box>
        <Link href={"/cart"} style={{ textDecoration: "none" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              ml: { xs: 2, sm: 5 },
            }}
          >
            <ShoppingCartIcon
              sx={{ fontSize: 50, cursor: "pointer", color: "#EEEDEB" }}
            />
            {cart.length > 0 && (
              <Typography sx={{ fontSize: 18, color: "#EEEDEB" }}>
                {cart.length}
              </Typography>
            )}
          </Box>
        </Link>
      </Box>

      <Products products={filterProducts} />
    </Box>
  );
}
