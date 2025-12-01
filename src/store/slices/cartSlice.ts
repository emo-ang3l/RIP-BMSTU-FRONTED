import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../../api/axios';

export interface CartItem {
  id: number;
  insulator: {
    id: number;
    insulator_name: string;
    image_url?: string;
    price_per_m2: string;
    thermal_conductivity: number;
  };
  quantity: number;
  order: number;
  DetailRequestActive: boolean;
  user_comment?: string;
  calculated_thickness?: number;
}

interface CartState {
  requestId: number | null;
  items: CartItem[];
  count: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  requestId: null,
  items: [],
  count: 0,
  isLoading: false,
  error: null,
};

// Fetch cart icon info
export const fetchCartInfo = createAsyncThunk(
  'cart/fetchCartInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/insulatorrequests/cart-icon/');
      return response.data;
    } catch (error: any) {
      // If not authenticated, return empty cart
      if (error.response?.status === 401) {
        return { request_id: null, count: 0 };
      }
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch cart');
    }
  }
);

// Add insulator to request
export const addToRequest = createAsyncThunk(
  'cart/addToRequest',
  async (insulatorId: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiClient.post(`/insulators/${insulatorId}/add-to-request/`);
      // Refresh cart info after adding
      await dispatch(fetchCartInfo());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to add to request');
    }
  }
);

// Fetch request details with items
export const fetchRequestDetails = createAsyncThunk(
  'cart/fetchRequestDetails',
  async (requestId: number, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/insulatorrequests/${requestId}/`);
      const data = response.data;
      
      // Log the response structure for debugging
      console.log('API Response structure:', Object.keys(data));
      console.log('Full API Response:', data);
      
      return data;
    } catch (error: any) {
      console.error('Error fetching request details:', error);
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch request');
    }
  }
);

// Remove item from request
export const removeItemFromRequest = createAsyncThunk(
  'cart/removeItem',
  async ({ requestId, insulatorId }: { requestId: number; insulatorId: number }, { rejectWithValue, dispatch }) => {
    try {
      await apiClient.delete(`/insulatorrequests/${requestId}/items/${insulatorId}/`);
      // Refresh request details
      await dispatch(fetchRequestDetails(requestId));
      // Refresh cart info
      await dispatch(fetchCartInfo());
      return insulatorId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to remove item');
    }
  }
);

// Update request item
export const updateRequestItem = createAsyncThunk(
  'cart/updateItem',
  async (
    { requestId, insulatorId, data }: { requestId: number; insulatorId: number; data: Partial<CartItem> },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await apiClient.put(`/insulatorrequests/${requestId}/items/${insulatorId}/`, data);
      // Refresh request details
      await dispatch(fetchRequestDetails(requestId));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to update item');
    }
  }
);

// Form/confirm request
export const formRequest = createAsyncThunk(
  'cart/formRequest',
  async (requestId: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiClient.put(`/insulatorrequests/${requestId}/form/`);
      // Refresh request details
      await dispatch(fetchRequestDetails(requestId));
      // Refresh cart info
      await dispatch(fetchCartInfo());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to form request');
    }
  }
);

// Update request fields
export const updateRequest = createAsyncThunk(
  'cart/updateRequest',
  async (
    { requestId, data }: { requestId: number; data: any },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await apiClient.patch(`/insulatorrequests/${requestId}/`, data);
      // Refresh request details
      await dispatch(fetchRequestDetails(requestId));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to update request');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.requestId = null;
      state.items = [];
      state.count = 0;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch cart info
    builder
      .addCase(fetchCartInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requestId = action.payload.request_id;
        state.count = action.payload.count || 0;
        state.error = null;
      })
      .addCase(fetchCartInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.requestId = null;
        state.count = 0;
      });

    // Add to request
    builder
      .addCase(addToRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToRequest.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addToRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch request details
    builder
      .addCase(fetchRequestDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRequestDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requestId = action.payload.id;
        // Backend returns items in 'insulators' field as an array
        if (action.payload.insulators && Array.isArray(action.payload.insulators)) {
          state.items = action.payload.insulators;
        } else if (action.payload.details && Array.isArray(action.payload.details)) {
          state.items = action.payload.details;
        } else if (action.payload.items && Array.isArray(action.payload.items)) {
          state.items = action.payload.items;
        } else {
          state.items = [];
        }
        state.error = null;
      })
      .addCase(fetchRequestDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Remove item
    builder
      .addCase(removeItemFromRequest.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.insulator.id !== action.payload);
        state.count = Math.max(0, state.count - 1);
      });

    // Form request
    builder
      .addCase(formRequest.fulfilled, (state) => {
        // After forming, cart should be empty
        state.requestId = null;
        state.items = [];
        state.count = 0;
      });
  },
});

export const { clearCart, clearError } = cartSlice.actions;
export default cartSlice.reducer;

