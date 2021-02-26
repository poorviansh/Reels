import React,{useState,useEffect} from 'react'
import {database} from '../firebase';
import './Comments.css'
import CircularProgress from '@material-ui/core/CircularProgress';
export default function Comments(props) {
    
    useEffect(async() => {
        if(props?.postData?.comments?.length>0)
        {
        console.log(props.userData);
        console.log(props.postData.comments);
        let flag=0;
        let arr=[];
        for(let i=0;i<props.postData.comments.length;i++)
        {
            // flag++;
            // let cid=props.comments[i];
            // database.comments.doc(cid).onSnapshot((doc)=>{
            //     arr.push(doc.data());
            // });
            
        }
        setComments(arr);
    }
      },[])
      const [comments,setComments]=useState(null);
    return (
        <h1>hskg</h1>
    )
}
