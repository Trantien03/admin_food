import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls

const url = "http://localhost:8080";

const CreateIngredientCategoryForm = () => {
  const [formData, setFormData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading to true during the request

    try {
      // Send POST request to create a new category
      const response = await axios.post(`${url}/api/v1/ingredients_categories`, formData); // Replace 'YOUR_API_URL' with your API endpoint
      console.log("Category created:", response.data); // Log success response (optional)
      // Reset the form after successful submission
      setFormData({ name: "" });
    } catch (err) {
      console.error("Error creating category:", err);
      setError("Failed to create category. Please try again.");
    } finally {
      setLoading(false); // Set loading back to false after request
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value,
    });
  };

  return (
    <div className=''>
      <div className='p-5'>
        <h1 className='text-gray-900 text-center text-xl pb-10'>Create Ingredient Category</h1>
        <form className='space-y-5' onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id='name'
            name='name'
            label='Category Name'
            variant='outlined'
            onChange={handleInputChange}
            value={formData.name}
            required
          />
          {/* Display error message if there's an error */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button
            variant='contained'
            type='submit'
            disabled={loading} // Disable the button when loading
          >
            {loading ? "Creating..." : "Create Category"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;
