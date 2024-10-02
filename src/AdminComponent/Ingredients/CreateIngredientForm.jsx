import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls

const CreateIngredientForm = () => {
  const [formData, setFormData] = useState({ name: "", ingredientCategoryId: "" });
  const [categories, setCategories] = useState([]); // Store categories fetched from API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/ingredients_categories`); // Replace with your categories API URL
        setCategories(response.data); // Update categories with the response data
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setLoading(true); // Set loading to true during the API call

    const data = {
      name: formData.name,
      ingredientCategoryId: formData.ingredientCategoryId,
      restaurantId: { id: 1 }, // Assuming restaurantId is a fixed value or fetched from somewhere else
    };

    try {
      // Send POST request to create the new ingredient
      const response = await axios.post(`${url}/api/v1/ingredients`, data); // Replace with your ingredients API URL
      console.log("Ingredient created:", response.data); // Log the response
      setFormData({ name: "", ingredientCategoryId: "" }); // Reset the form after success
    } catch (err) {
      console.error("Error creating ingredient:", err);
      setError("Failed to create ingredient. Please try again.");
    } finally {
      setLoading(false); // Stop loading after request
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value,
    });
  };

  return (
    <div className=''>
      <div className='p-5'>
        <h1 className='text-gray-900 text-center text-xl pb-10'>Create Ingredient</h1>
        <form className='space-y-5' onSubmit={handleSubmit}>
          {/* Name field */}
          <TextField
            fullWidth
            id='name'
            name='name'
            label='Ingredient Name'
            variant='outlined'
            onChange={handleInputChange}
            value={formData.name}
            required
          />

          {/* Category dropdown */}
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="ingredientCategoryId"
              value={formData.ingredientCategoryId}
              label="Category"
              onChange={handleInputChange}
              name='ingredientCategoryId'
              required
            >
              {/* Populate dropdown with categories */}
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Error message display */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {/* Submit button */}
          <Button variant='contained' type='submit' disabled={loading}>
            {loading ? "Creating..." : "Create Ingredient"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;
