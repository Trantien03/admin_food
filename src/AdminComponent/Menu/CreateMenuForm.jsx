import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { CircularProgress, Grid, IconButton, TextField, Button, FormControl, InputLabel, Select, OutlinedInput, Box, Chip, MenuItem } from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import axios from 'axios';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary'; // Giả sử bạn đã có hàm này

// Giá trị khởi tạo cho Formik
const initialValues = {
  name: '',
  description: '',
  price: '',
  category: '',
  restaurantId: '',
  vegetarian: true,
  seasonal: false,
  ingredients: [],
  images: []
};

const CreateMenuForm = () => {
  const [uploadImage, setUploadImage] = useState(false); // Trạng thái để theo dõi quá trình upload ảnh
  const [categories, setCategories] = useState([]); // Lưu trữ danh sách category

  // Sử dụng Formik để quản lý trạng thái form
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      values.restaurantId = 2; // Thiết lập giá trị cố định cho restaurantId

      // Chuẩn bị dữ liệu gửi API
      const apiUrl = 'http://localhost:8080/api/v1/dishes'; // Thay đổi với endpoint thực tế của bạn
      const formData = {
        name: values.name,
        description: values.description,
        price: values.price,
        category: values.category,
        restaurantId: values.restaurantId,
        vegetarian: values.vegetarian,
        seasonal: values.seasonal,
        ingredients: values.ingredients,
        images: values.images
      };

      try {
        const response = await axios.post(apiUrl, formData);
        if (response.status === 201) {
          toast.success("Menu created successfully!");
          formik.resetForm(); // Reset lại form sau khi submit thành công
        }
      } catch (error) {
        toast.error("Error creating menu. Please try again.");
      }
    }
  });

  // Hàm xử lý upload hình ảnh
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadImage(true);
      try {
        const imageUrl = await uploadImageToCloudinary(file); // Giả sử bạn đã có hàm này để upload lên Cloudinary
        formik.setFieldValue('images', [...formik.values.images, imageUrl]); // Thêm ảnh vào danh sách
        setUploadImage(false);
      } catch (error) {
        toast.error('Error uploading image.');
        setUploadImage(false);
      }
    }
  };

  // Hàm xóa ảnh khỏi danh sách
  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue('images', updatedImages);
  };

  // Lấy danh sách category khi component render lần đầu
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/categories'); // API của bạn
        setCategories(response.data); // Giả sử API trả về một danh sách category
      } catch (error) {
        toast.error("Error fetching categories.");
      }
    };

    fetchCategories(); // Gọi API lấy category
  }, []);

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2">Add New Menu</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
            {/* Upload Hình ảnh */}
            <Grid className="flex flex-wrap gap-5" item xs={12}>
              <input
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
                type="file"
              />
              <label className="relative" htmlFor="fileInput">
                <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                  <AddPhotoAlternate className="text-white" />
                </span>
                {uploadImage && (
                  <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                    <CircularProgress />
                  </div>
                )}
              </label>
              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img className="w-24 h-24 object-cover" src={image} alt="" />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        outline: 'none',
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>

            {/* Tên sản phẩm */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>

            {/* Mô tả sản phẩm */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Grid>

            {/* Giá sản phẩm */}
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.price}
                type="number"
              />
            </Grid>

            {/* Danh mục sản phẩm */}
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Thành phần nguyên liệu */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="ingredients-label">Ingredients</InputLabel>
                <Select
                  labelId="ingredients-label"
                  id="ingredients"
                  name="ingredients"
                  multiple
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  input={<OutlinedInput id="ingredients" label="Ingredients" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {['Pho', 'Mi Tom'].map((ingredient) => (
                    <MenuItem key={ingredient} value={ingredient}>
                      {ingredient}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Tùy chọn cho Seasonal và Vegetarian */}
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Is Seasonal</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="seasonal"
                  value={formik.values.seasonal}
                  label="Is Seasonal"
                  onChange={formik.handleChange}
                  name='seasonal'
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Is Vegetarian</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="vegetarian"
                  value={formik.values.vegetarian}
                  label="Is Vegetarian"
                  onChange={formik.handleChange}
                  name='vegetarian'
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Nút Submit */}
            <Grid item xs={12}>
              <Button fullWidth variant="contained" type="submit">
                Add Menu
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default CreateMenuForm;
