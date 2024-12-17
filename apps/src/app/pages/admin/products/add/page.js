"use client";
import { forwardRef, useState, useEffect } from "react";
import {
  Grid,
  Select,
  Button,
  MenuItem,
  TextField,
  FormLabel,
  FormControl,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label="Birth Date" fullWidth {...props} />;
});

const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(1, 0),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(1, 0),
}));

const StyledInput = styled("input")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
  margin: theme.spacing(1, 0),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  fontSize: "16px",
}));

const BASE_URL = "http://127.0.0.1:8000";

const AddBook = () => {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]); // Lưu trữ các tệp gốc
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchGenres = fetch(`${BASE_URL}/genre`).then((resp) =>
        resp.json()
      );
      const [genres] = await Promise.all([fetchGenres]);
      setGenres(genres);
    };

    fetchData();
  }, []);

  const fileOnChange = (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const imgs = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages(imgs); // Để hiển thị preview các ảnh đã chọn
      setFiles(Array.from(files)); // Lưu các tệp gốc để gửi lên server
    }
  };

  const postData = async () => {
    const formData = new FormData(document.getElementById("book-form"));

    try {
      const resp = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        body: formData,
      });

      if (resp.ok) {
      }
    } catch (error) {
      console.error("Lỗi" + error + "Lỗi");
    }
  };

  const handleCreateBook = async () => {
    await postData(form);
  };

  return (
    <CardContent>
      <form id="book-form" encType="multipart/form-data">
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <FormLabel>Tên sách</FormLabel>
            <StyledTextField name="title" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Tác giả</FormLabel>
            <StyledTextField name="author" required />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel>Thể loại</FormLabel>
            <FormControl fullWidth>
              <StyledSelect id="genre" name="genre" defaultValue="" required>
                {genres &&
                  genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.name}>
                      {genre.name}
                    </MenuItem>
                  ))}
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel>Mô tả sách</FormLabel>
            <StyledTextField name="description" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Số lượng trong kho</FormLabel>
            <StyledTextField type="number" name="stock" required />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel>Giá Sale</FormLabel>
            <StyledTextField type="number" name="salePrice" required />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel>Giá sách</FormLabel>
            <StyledTextField type="number" name="price" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Nhà xuất bản</FormLabel>
            <StyledTextField name="publisher" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>soldQty</FormLabel>
            <StyledTextField name="soldQty" required />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <FormLabel>Ngày xuất bản</FormLabel>
            <StyledInput
              type="date"
              name="publishDate"
              defaultValue={new Date().toISOString().slice(0, 10)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            {images.map((img, index) => (
              <ImgStyled key={index} src={img} />
            ))}
            <Box>
              <ButtonStyled
                component="label"
                variant="contained"
                htmlFor="account-settings-upload-image"
              >
                Thêm ảnh
                <input
                  hidden
                  type="file"
                  onChange={fileOnChange}
                  accept="image/png, image/jpeg"
                  id="account-settings-upload-image"
                  name="images"
                  multiple
                />
              </ButtonStyled>
              <Typography variant="body2" sx={{ marginTop: 5 }}>
                Chỉ cho phép PNG hoặc JPEG. Kích thước tối đa 800K.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ marginRight: 3.5 }}
              onClick={postData}
            >
              Thêm sách
            </Button>
            <Button
              type="reset"
              variant="outlined"
              color="secondary"
              onClick={(e) => {
                document.getElementById("book-form").reset();
                setImages([]);
                setFiles([]);
              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default AddBook;
