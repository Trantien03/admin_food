import React, { useEffect, useState, useRef } from 'react';
import { Button, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const url = "http://localhost:8080"; // Your API base URL

const CreateMenuForm = ({ item, onClose = () => {} }) => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef(null); // For resetting image input

  const [formValues, setFormValues] = useState({
    name: item?.name || "",
    description: item?.description || "",
    price: item?.price || "",
    category: item?.category || "",
    discount: item?.discount || 10, // Set default discount to 10%
    status: item?.status || "available",
  });

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(`${url}/api/v1/categories`);
        setCategories(response.data);
      } catch (error) {
        toast.error("Failed to load categories.");
        console.error(error); // Log the error for debugging
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchCategories();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const selectedCategory = categories.find(cat => cat.name === value);
      setFormValues((prevValues) => ({
        ...prevValues,
        category: selectedCategory ? selectedCategory.id : ""
      }));
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
      setImage(file);
    } else {
      toast.error("Please upload a valid image file (JPEG/PNG).");
    }
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formValues.category) {
      toast.error("Please select a valid category.");
      setLoading(false);
      return;
    }

    if (item && !item.id) {
      toast.error("Invalid item for editing.");
      setLoading(false);
      return;
    }

    if (!item && !image) {
      toast.error("Please upload an image.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("description", formValues.description);
    formData.append("price", Math.max(Number(formValues.price), 0)); // Ensure price is positive
    formData.append("discount", Math.max(formValues.discount, 0)); // Ensure discount is positive
    formData.append("status", formValues.status);
    formData.append("category_id", formValues.category);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = item
        ? await axios.put(`${url}/api/v1/dishes/${item.id}`, formData)
        : await axios.post(`${url}/api/v1/dishes`, formData);

      if ([200, 201, 204].includes(response.status)) {
        setFormValues({
          name: "",
          description: "",
          price: "",
          category: "",
          discount: 10, // Reset discount to default on successful submission
          status: "available",
        });
        setImage(null);
        
        // Reset file input
        if (imageInputRef.current) {
          imageInputRef.current.value = null;
        }

        toast.success(item ? "Menu updated successfully!" : "Menu created successfully!");
        onClose(); // Close modal after successful submit
      } else {
        toast.error(response.data.message || "Error submitting the menu.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error submitting the menu. Please try again.";
      toast.error(errorMessage);
      console.error(error.response || error); // Log error for easier debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2">
          {item ? "Edit Menu" : "Add New Menu"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
            {/* Image Upload */}
            <Grid item xs={12}>
              <div className="flex flex-col items-center border-2 border-dashed border-gray-400 p-4 rounded-md">
                <label className="text-center mb-2">Upload Menu Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={imageInputRef} // Reference for resetting the input
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                {loading && <CircularProgress />}
              </div>
            </Grid>

            {/* Product Name */}
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                variant="outlined"
                className="bg-white"
              />
            </Grid>

            {/* Product Description */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                variant="outlined"
                multiline
                rows={4}
                className="bg-white"
              />
            </Grid>

            {/* Product Price */}
            <Grid item xs={12} lg={6}>
              <TextField
                label="Price"
                name="price"
                value={formValues.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                variant="outlined"
                type="number"
                inputProps={{ min: 0 }} // Prevent negative values
                className="bg-white"
              />
            </Grid>

            {/* Product Category */}
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={categories.find(cat => cat.id === formValues.category)?.name || ""}
                  onChange={handleChange}
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Product Discount */}
            <Grid item xs={12} lg={6}>
              <TextField
                label="Discount"
                name="discount"
                value={formValues.discount}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="number"
                inputProps={{ min: 0 }} // Prevent negative values
                className="bg-white"
              />
            </Grid>

            {/* Product Status */}
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={formValues.status}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="unavailable">Unavailable</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} /> : (item ? "Update Menu" : "Create Menu")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default CreateMenuForm;
