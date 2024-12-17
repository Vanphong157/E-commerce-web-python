import { Card, CardContent, Grid } from '@mui/material';
import React from 'react';
import TableOrders from './TableOrders';

const Order = () => {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchOrder = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/order", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
         
        } else {
          alert("Get thất bại");
        }
      } catch (error) {
        alert("Error: " + error);
      }
    };

    fetchOrder();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <TableOrders rows={orders} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Order;
