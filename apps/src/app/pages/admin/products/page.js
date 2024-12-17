"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import Link from "@mui/material/Link";
import Tableproducts from "./TableProducts";
import AddBoxIcon from "@mui/icons-material/AddBox";

const Products = () => {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetch("http://127.0.0.1:8000/products").then(
        (resp) => resp.json()
      );
      setProducts(products);
    };
    fetchProducts().catch((error) => console.log(error));
  }, []);

  
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Link href="pages/admin/products/add">
              <Button>
                <AddBoxIcon />
                Thêm sách mới
              </Button>
            </Link>
          </CardContent>
          <Tableproducts rows={products} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Products;
