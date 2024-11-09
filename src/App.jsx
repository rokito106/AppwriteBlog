import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import authservice from './appwrite/auth';
import { login, logout } from './store/authSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import postservice from'./appwrite/config';
import{allPost} from './store/postSlice';

function App() {
const [loading,setLoading]=useState(true);
const dispatch=useDispatch();
const isLoggedIn=useSelector((state)=>{
  state.auth.status;
})


useEffect(()=>{
  authservice.getCurrentUser()
  .then((userData)=>{
      if(userData){
        dispatch(login({userData}));
      }
      else{
        dispatch(logout);
      }
  })
  .then(() => {
    postservice.getPosts()
      .then((posts) => {
        if (posts) {
          dispatch(allPost(posts.documents));
          // console.log(posts);
        }
        else {
          dispatch(allPost([]));
        }
      });
  })
  .finally(()=>setLoading(false));
},[isLoggedIn])
 
return !loading ? (
  <div className=' min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>
) : null
}

export default App
