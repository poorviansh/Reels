import React,{useEffect,useState} from 'react'
import Header from './Header'
import './Feed.css'
import Posts from './Posts'
import {database} from '../firebase';
import {useAuth} from '../Context/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadFile from './UploadFile'
export default function Feed() {
    const [userData,setUserData]=useState(null);
    const {currentUser} = useAuth(); 
    const [posts, setPosts] = useState(null);
    useEffect(async() => {
        try{
        database.users.doc(currentUser.uid).onSnapshot((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setUserData(doc.data()); 
    })
}catch(error) {
            console.log("Error getting documents: ", error);
        };
           
      }, [])
    return (
        <>
        {/* This check is important because without this the condition that we are using in our likes
        component will always give us a false value as that component will be rendered withput any user data
        so there will not be any id to compare to */}
        {userData==null?<CircularProgress/>:
        <>
        <Header userData={userData}/>
        <div className='portion' style={{height:'10.5vh'}}></div>
      
        <div className='feed-container'>
            <div className='center'>
            <UploadFile userData={userData} posts={posts} setPosts={setPosts}/>
                <Posts userData={userData} posts={posts} setPosts={setPosts}/>
            </div>
            <div className='right'></div>
         
        </div>
        </>}
        </>
    )
}
