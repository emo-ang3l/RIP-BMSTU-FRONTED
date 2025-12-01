import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../../api/axios';

export interface InsulatorRequest {
  id: number;
  status_request: 'DRAFT' | 'DELETED' | 'FORMED' | 'COMPLETED' | 'REJECTED';
  creation_datetime: string;
  formation_datetime?: string | null;
  completion_datetime?: string | null;
  client_username: string;
  manager_username?: string;
  climate_zone: string;
  required_r_value: number;
  wall_type: string;
  norm_standard: string;
  total_thickness?: number | null;
  insulators?: string;
}

interface OrdersState {
  orders: InsulatorRequest[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  error: null,
};

// Async thunk to fetch user's orders
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/insulatorrequests/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || error.message || 'Failed to fetch orders'
      );
    }
  }
);

// Async thunk to create a new order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: Partial<InsulatorRequest>, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/insulatorrequests/', orderData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || error.message || 'Failed to create order'
      );
    }
  }
);

// Async thunk to update an order
export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ id, data }: { id: number; data: Partial<InsulatorRequest> }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/insulatorrequests/${id}/`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || error.message || 'Failed to update order'
      );
    }
  }
);

// Async thunk to delete an order
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id: number, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/insulatorrequests/${id}/`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || error.message || 'Failed to delete order'
      );
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch orders
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create order
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload);
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update order
    builder
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.orders.findIndex((order) => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete order
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = state.orders.filter((order) => order.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = ordersSlice.actions;
export default ordersSlice.reducer;

