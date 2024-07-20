import { Box, TextField } from "@mui/material";
import { Product } from "@prisma/client";
import { ChangeEvent } from "react";

interface Props {
  products: Product[];
  setFilterProducts: (value: Product[]) => void;
}

const SearchProduct = ({ products, setFilterProducts }: Props) => {
  const handleSearch = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchText = products.filter((product) =>
      product.title
        .toLocaleLowerCase()
        .includes(evt.target.value.toLocaleLowerCase())
    );
    setFilterProducts(searchText);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        my: 3,
        bgcolor: "#EEEDEB",
        ml: { xs: 2, sm: 0 },
      }}
    >
      <TextField
        sx={{ width: { xs: "280px", sm: "700px" } }}
        onChange={handleSearch}
        placeholder="Search products..."
      />
    </Box>
  );
};
export default SearchProduct;
