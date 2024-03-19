import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  createOrder,
  emptyCart,
  updateQuantity,
} from "@/store/slices/cartSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const getCartTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => (totalPrice += item.price * item.quantity));
    return totalPrice;
  };

  const increaseQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const decreaseQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity: quantity - 1 }));
  };

  const onSuccess = (data: any) => {
    router.push(`/confirmation?orderId=${data.orderId}&status=${data.status}`);
    dispatch(emptyCart());
  };

  const onError = () => {};

  const handleCreateOrder = () => {
    dispatch(createOrder({ payload: cartItems, onSuccess, onError }));
  };

  return (
    <Box
      sx={{
        bgcolor: "#EFECEC",
        width: "50vw",
        margin: "0 auto",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {cartItems.length ? (
          <Box>
            {cartItems.map((item) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 5,
                }}
                key={item.id}
              >
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={item.imageUrl || ""} width={150} />
                    <Box sx={{ ml: 3 }}>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="h6">{item.price}</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ ml: 5 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <RemoveCircleOutlineIcon
                      onClick={() => decreaseQuantity(item.id, item.quantity)}
                      sx={{ fontSize: 40, color: "green", cursor: "pointer" }}
                    />
                    <Typography sx={{ mx: 2 }} variant="h4">
                      {item.quantity}
                    </Typography>
                    <AddCircleOutlineIcon
                      onClick={() => increaseQuantity(item.id, item.quantity)}
                      sx={{ fontSize: 40, color: "green", cursor: "pointer" }}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="h3">Empty cart</Typography>
        )}
      </Box>
      {cartItems.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <Typography variant="h4">
              Total price: {getCartTotalPrice()}
            </Typography>
            <Button
              variant="contained"
              sx={{ width: "fit-content", my: 3 }}
              onClick={handleCreateOrder}
            >
              Confirm order
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
