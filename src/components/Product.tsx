import { Box } from "@mui/material";
import { Product } from "@prisma/client";
import Link from "next/link";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const Products = ({ products }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {products.map((item) => {
        return (
          <Link
            href={`products/${item.id}`}
            key={item.id}
            style={{ textDecoration: "none" }}
          >
            <Box sx={{ mr: 5, mb: 3 }}>
              <ProductCard
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
              />
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};
export default Products;
