"use client";

import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BuildIcon from "@mui/icons-material/Build";
import { IconButton } from "@mui/material";
import { Link } from "@mui/material";
import { Image } from "antd";

const BASE_URL = "http://127.0.0.1:8000/products";

const TableProducts = ({ rows, onDelete }) => {
  const handleDelete = async (_id) => {
    console.log(_id);

    try {
      const response = await fetch(`${BASE_URL}/${_id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        alert("Xóa thành công");
      } else {
        alert("Lỗi");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minW_idth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell align="center">Giá</TableCell>
            <TableCell align="center">Loại</TableCell>
            <TableCell align="center">Trong kho</TableCell>
            <TableCell align="center">Ảnh</TableCell>
            <TableCell align="center">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row) => (
              <TableRow
                key={row._id}
                sx={{
                  "&:last-of-type td, &:last-of-type th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.caterogry_id}</TableCell>
                <TableCell align="center">
                  {row.inStock ? "Còn hàng" : "Hết"}
                </TableCell>
                <TableCell align="center">
                  <Image src={row.image} alt={row.image} />
                </TableCell>
                <TableCell align="center">
                  <Link href={`/admin/books/update/${row._id}`}>
                    <IconButton color="primary">
                      <BuildIcon sx={{ color: "blue" }} />
                    </IconButton>
                  </Link>
                  <IconButton onClick={() => handleDelete(row._id)}>
                    <DeleteForeverIcon sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableProducts;
