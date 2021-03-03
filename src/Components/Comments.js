import React,{useState,useEffect} from 'react'
import {database} from '../firebase';
import './Comments.css'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Comments(props) {
    const useStyles = makeStyles({
        da:{
            marginRight:'2%',
            marginTop:'2%'
        }
    })
    const classes = useStyles();
    useEffect(async() => {
        let arr=[];
       
        console.log(props.userData);
        console.log(props.postData.comments);
        
        for(let i=0;i<props.postData.comments.length;i++)
        {
            // flag++;
            // let cid=props.comments[i];
            // database.comments.doc(cid).onSnapshot((doc)=>{
            //     arr.push(doc.data());
            // });
            let cid=props.postData.comments[i];
            let data = await database.comments.doc(cid).get();
            console.log(data.data());
            arr.push(data.data());
        }
        let id = props.postData.pId;
        let obj = {...props.comments,[props.postData.pId]:arr}
        props.setComments(obj);
        console.log(props.comments)
    
      },[])
    
    return (
        <>
        
        {props.comments[props.postData.pId]==undefined?<CircularProgress/>
        :
        props.comments[props.postData.pId].map((comment,index)=>(
        <div key={index} className='comment-div'>
            <Avatar src={comment.uUrl}  className={classes.da}/>
            <p><span style={{fontWeight:'bold'}}>{comment.uName}</span>&nbsp;&nbsp;{comment.text}</p>
        </div>
        ))
      
        }
        </>
    )
}
