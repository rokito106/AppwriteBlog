import { createSlice } from "@reduxjs/toolkit";

const initialState={
    posts:[]
}

export const postSlice=createSlice({
    name:"post",
    initialState,
    reducers:{
        allPost(state,actions){
           state.posts = actions.payload;
        },
        addPost(state,actions){
            state.posts.push(actions.payload);
        },
        deletePost(state, action) {
            state.posts = state.posts.filter((post) => post.$id !== action.payload);
        },
        updatePost(state,actions){
            const{id,newData}=actions.payload;
            const postToUpdate=state.posts.find(post=>post.$id===id);
            if(postToUpdate){
                Object.assign(postToUpdate,newData);
            }
        }
    }
})


export default postSlice.reducer;
export const {addPost,deletePost,updatePost,allPost}=postSlice.actions;