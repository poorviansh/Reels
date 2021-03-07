import React,{useState,useEffect} from 'react'
import Header from '../Components/Header';
import {database} from '../firebase';
import {useAuth} from '../Context/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from "react-router-dom";
import './Profile.css'
export default function Profile() {
    const [userData,setUserData]=useState(null);
    const [posts, setPosts] = useState(null);
    const {currentUser} = useAuth();
    let {id} = useParams();
    useEffect(()=> {
        
        const unsub= database.users.doc(id).onSnapshot((doc) => {
          // doc.data() is never undefined for query doc snapshots
          
          setUserData(doc.data());
     
    })
    return ()=>{unsub()};   
      }, [id])


      useEffect(async() => {
        let parr = [];

          parr = [];
          if(userData!=null)
          {
          for(let i=0;i<userData.postIds.length;i++)
          {
              let pid = userData.postIds[i];
              let data = await database.posts.doc(pid).get();
              console.log(data.data());
              parr.push(data.data());
          }
        }
          setPosts(parr);
      
        // .catch((error) => {
        //     console.log("Error getting documents: ", error);
        // });
    
        // unsub();
    
      }, [userData])



    return (
        <>
        {
            userData==null ? <CircularProgress/>:<>
            <Header userData={userData}/>
            <div className='spacer'></div>
            <div className='pg-containner'>
            <h1>{userData.fullName}</h1>
            </div>
            </>
        }
        </>
    )
}
