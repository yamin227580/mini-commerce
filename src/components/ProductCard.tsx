import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  description: string;
  imageUrl: string | null;
}

const ProductPage = ({ title, description, imageUrl }: Props) => {
  return (
    <Card sx={{ maxWidth: 345, height: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl || ""}
          alt="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ProductPage;
