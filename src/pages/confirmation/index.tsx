import { useAppDispatch } from "@/store/hook";
import { cancelOrder } from "@/store/slices/cartSlice";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const Confirmation = () => {
  const router = useRouter();
  const orderId = router.query.orderId as string;
  const status = router.query.status;
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const onSuccess = (data: any) => {
    setOpen(true);
  };

  const onError = () => {};

  const handleCancelOrder = () => {
    dispatch(cancelOrder({ orderId, onSuccess, onError }));
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>OrderId:{orderId}</Typography>
      <Typography>Status:{status}</Typography>
      <Button
        variant="contained"
        sx={{ width: "fit-content", mt: 2 }}
        onClick={handleCancelOrder}
      >
        Cancel Order
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success">Order has been cancelled.</Alert>
      </Snackbar>
    </Box>
  );
};
export default Confirmation;
