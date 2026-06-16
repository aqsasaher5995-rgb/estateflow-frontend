import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// Get my properties
export const getMyProperties = createAsyncThunk(
  'property/getMyProperties',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://estateflow-backend-djex6wllj-aqsasaher5995-rgbs-projects.vercel.app/api/properties/my/properties', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        return data.data.properties;
      }
      return rejectWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Get stats
export const getStats = createAsyncThunk(
  'property/getStats',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://estateflow-backend-djex6wllj-aqsasaher5995-rgbs-projects.vercel.app/api/properties/my/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        return data.data;
      }
      return rejectWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create property
export const createProperty = createAsyncThunk(
  'property/create',
  async (propertyData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://estateflow-backend-djex6wllj-aqsasaher5995-rgbs-projects.vercel.app/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(propertyData)
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Property created successfully!');
        dispatch(getMyProperties());
        dispatch(getStats());
        return data.data.property;
      }
      toast.error(data.message || 'Failed to create property');
      return rejectWithValue(data);
    } catch (error) {
      toast.error('Error creating property');
      return rejectWithValue(error);
    }
  }
);

// Update property - ADD THIS
export const updateProperty = createAsyncThunk(
  'property/update',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://estateflow-backend-djex6wllj-aqsasaher5995-rgbs-projects.vercel.app/api/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result.success) {
        toast.success('Property updated successfully!');
        dispatch(getMyProperties());
        dispatch(getStats());
        return result.data.property;
      }
      toast.error(result.message || 'Failed to update property');
      return rejectWithValue(result);
    } catch (error) {
      toast.error('Error updating property');
      return rejectWithValue(error);
    }
  }
);

// Delete property
export const deleteProperty = createAsyncThunk(
  'property/delete',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://estateflow-backend-djex6wllj-aqsasaher5995-rgbs-projects.vercel.app/api/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Property deleted successfully!');
        dispatch(getMyProperties());
        dispatch(getStats());
        return id;
      }
      toast.error(data.message || 'Failed to delete');
      return rejectWithValue(data);
    } catch (error) {
      toast.error('Error deleting property');
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  myProperties: [],
  stats: { total: 0, available: 0, rented: 0 },
  loading: false,
  error: null
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get My Properties
      .addCase(getMyProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.myProperties = action.payload;
      })
      .addCase(getMyProperties.rejected, (state) => {
        state.loading = false;
      })
      // Get Stats
      .addCase(getStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      // Create Property
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProperty.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProperty.rejected, (state) => {
        state.loading = false;
      })
      // Update Property - ADD THIS
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProperty.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProperty.rejected, (state) => {
        state.loading = false;
      })
      // Delete Property
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProperty.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProperty.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default propertySlice.reducer;