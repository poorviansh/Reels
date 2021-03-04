import React, { Component } from 'react';



export default class PlayerControlExample extends Component {
  constructor(props, context) {
    super(props, context);

  }
  handleMute =(e)=>{
   e.preventDefault()
   e.target.muted = !e.target.muted
 }
  render() {
    console.log(this.props.source)
    return (
      <>
        <video src={this.props.source} className='video-styles' onClick={(e)=>this.handleMute(e)} controls id={this.props.id}  muted="muted" type="video/mp4" >
        
          </video>
     </>
    );
  }
}