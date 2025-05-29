import  {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import  authService from './authService';

const initialState = {
    user: null,
    token: null,
    msg: '',
    loading: false,
    error: null,
  };


  export const registerUser = createAsyncThunk('auth/registerUser',
     async (userData, thunkAPI) => {
        try {
            const data = await authService.register(userData);
            return data;
        } catch (error) {
            
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");

        }

    }
  );

  export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
      try {
        const data = await authService.login(userData);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || "Login failed");
      }
    }
  );


const authSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.msg = '';
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
          // Register
          .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.msg = action.payload.msg;
            localStorage.setItem('user', JSON.stringify(action.payload));
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          // Login
          .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.msg = action.payload.msg;
            localStorage.setItem('user', JSON.stringify(action.payload));
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },
    });


    export default authSlice.reducer;