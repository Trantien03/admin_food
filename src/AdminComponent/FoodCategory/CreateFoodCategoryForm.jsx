import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const url = "http://localhost:8080"; // Your API base URL

const CreateFoodCategoryForm = ({ category, onClose }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (category) {
      setName(category.name);
      // Reset the image if editing a category
      setImage(null);
    } else {
      setName('');
      setImage(null);
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (category) {
        // Edit existing category
        await axios.put(`${url}/api/v1/categories/${category.id}`, formData);
        toast.success("Category updated successfully");
      } else {
        // Create new category
        await axios.post(`${url}/api/v1/categories`, formData);
        toast.success("Category created successfully");
      }
      onClose(); // Close the modal after successful operation
    } catch (error) {
      toast.error("Error saving category");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
        variant="outlined"
        className="bg-white"
      />
      <div className="flex flex-col items-center border-2 border-dashed border-gray-400 p-4 rounded-md">
        <label className="text-center mb-2">Upload Category Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          required={!category} // Required when creating a new category
        />
      </div>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {category ? 'Update Category' : 'Create Category'}
      </Button>
    </form>
  );
};

export default CreateFoodCategoryForm;
