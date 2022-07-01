import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  commentsList: [  ],
  status: 'idle',
  error: null
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action)=> {
      state.commentsList = action.payload
    })
    builder.addCase(createComment.fulfilled, (state, action)=>{
      state.commentsList.push(action.payload)
    })
    builder.addCase(deleteComment.fulfilled, (state, action) =>{
      state.commentsList = state.commentsList.filter((comment) => comment.id !== action.payload.id);
    })
  }
});


export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
  const response = await fetch('/api/comments')
  return response.json()
})

export const createComment = createAsyncThunk('comments/createComment', async (data) => {
  const response = await fetch('/api/createComment', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
  return response.json()
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (data) => {
  const response = await fetch(`/api/deleteComment/${data.id}`, {method: 'DELETE'})
  return response.json()
});

export const selectComments = (state) => state.comments.commentsList;

export default commentsSlice.reducer;
