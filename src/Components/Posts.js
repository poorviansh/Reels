import React, { useState, useEffect } from 'react'
import { database } from '../firebase';
import Video from './Video';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import './Posts.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Likes from './Likes';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Comments from './Comments'
export default function Posts({ userData = null }) {
  const useStyles = makeStyles({
    root: {
      width: '100%',
      padding: '0px'
    },
    loader: {
      position: 'absolute',
      left: '50%',
      top: '50%'
    },
    typo: {
      marginLeft: '2%'
    },
    vac: {
      marginLeft: '3.5%',
      color: '#8e8e8e'
    },
    dp: {
      marginLeft: '2%'
    },
    cc: {
      height: '50vh',
      overflowY: 'scroll'
    }

  });
  const [openId, setOpenId] = React.useState(null);
  // const [open, setOpen] = useState(false);
  const handleClickOpen = (id) => {
    setOpenId(id);
  };
  const handleClose = () => {
    setOpenId(null);
  };
  const [posts, setPosts] = useState([]);
  const classes = useStyles();

  const callback = async entries => {
    console.log(entries);
    entries.forEach(element => {
      let child = element.target.childNodes[0];
      let id = child.getAttribute("id");
      let el = document.getElementById(`${id}`);
      // if(element.intersectionRatio!=1 && !el.paused){

      //   el.pause();
      //   // console.log(p);
      // }
      // else if(element.isIntersecting==true && el.paused ) {

      //   // console.log(el)

      //     el.play(); 
      //   // console.log(p)

      // }
      el.play().then(() => {
        if (element.intersectionRatio != 1 && !el.paused && element.isIntersecting != true) {

          el.pause();
          // console.log(p);
        }
      })

    });
  };
  const observer = new IntersectionObserver(callback, {

    threshold: 0.85,
  });
  useEffect(() => {
    let parr = [];
    database.posts.get().then((querySnapshot) => {
      parr = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        let data = { ...doc.data(), postId: doc.id }
        console.log(data);
        parr.push(data);
      });
      setPosts(parr);
    })
    // .catch((error) => {
    //     console.log("Error getting documents: ", error);
    // });



  }, [])
  useEffect(() => {
    if (typeof window == 'object') {

      let elements = document.querySelectorAll('.videos')
      // console.log(elements)
      elements.forEach(el => {
        // console.log(el);
        observer.observe(el)
      })
      console.log(posts)
      return () => observer.disconnect()
    }
  }, [posts])
  return (
    <>
      <div className='place'></div>
      {posts.length == 0 || userData == null ? <CircularProgress className={classes.loader} /> :
        <div className='video-container'>
          {posts.map((post, index) => (
            <div key={index}>
              <div className='post'>
                <Card className={classes.root} variant="outlined">
                  <CardHeader
                    avatar={
                      <Avatar src={post?.uProfile} aria-label="recipe" className={classes.avatar}>
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={post?.uName}

                  />
                  <CardContent>
                    <div className="videos">
                      <Video source={post.pUrl} id={post.pId} />
                    </div>
                    <div className='likes'>
                      <Likes userData={userData} postData={post} />
                      <Typography className={classes.typo} variant='body2'>Liked By {post.likes.length == 0 ? 'nobody' : ` others`}</Typography>
                    </div>
                    <div className='comments'>
                      <Typography className={classes.vac} onClick={() => handleClickOpen(post.pId)} variant='body2'>
                        View all comments</Typography>
                      <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === post.pId}>
                        <MuiDialogContent>
                          <div className='dcontainer'>
                            <div className='video-part'>
                              <video className='video-styles2' controls id={post.id} muted="muted" type="video/mp4" >
                                <source src={post.pUrl} type="video/webm" />
                              </video>
                            </div>

                            <div className='info-part'>

                              <Card>
                                <CardHeader
                                  avatar={
                                    <Avatar src={post?.uProfile} aria-label="recipe" className={classes.avatar}>

                                    </Avatar>
                                  }
                                  action={
                                    <IconButton aria-label="settings">
                                      <MoreVertIcon />
                                    </IconButton>
                                  }
                                  title={post?.uName}

                                />
                                <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                                

                              </Card>

                            </div>
                          </div>
                        </MuiDialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>

              </div>
              <div className='place'>




              </div>
            </div>
          ))}
        </div>
      }
    </>
  )
}
