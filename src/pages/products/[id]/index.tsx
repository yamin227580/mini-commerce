import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addToCart } from "@/store/slices/cartSlice";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const ProductDetailPage = () => {
  const router = useRouter();
  const productId = Number(router.query.id);
  const products = useAppSelector((state) => state.products.items);
  const product = products.find((product) => product.id === productId);
  const dispatch = useAppDispatch();
  const handleCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    router.push("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <Box>
          <img src={product?.imageUrl || ""} width={300} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            ml: 2,
          }}
        >
          <Typography variant="h5" sx={{ my: 2 }}>
            {product?.title}
          </Typography>
          <Typography>{product?.description}</Typography>
          <Typography variant="h5" sx={{ my: 2 }}>
            $ {product?.price}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 12,
            }}
          >
            <Button variant="contained" onClick={handleCart}>
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default ProductDetailPage;
