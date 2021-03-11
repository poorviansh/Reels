import React, { Component } from 'react';
import './Video.css';
import ReactDOM from 'react-dom';
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
export default class PlayerControlExample extends Component {
  constructor(props, context) {
    super(props, context);

  }

  componentDidMount()
  {
    Events.scrollEvent.register('begin', function(to, element) {
      console.log('begin', arguments);
    });

    Events.scrollEvent.register('end', function(to, element) {
      console.log('end', arguments);
    });

    scrollSpy.update();
  }

  componentWillUnmount()
  {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }


  handleMute =(e)=>{
   e.preventDefault()
   e.target.muted = !e.target.muted
 }
 handleAutoScroll=(e)=>
 {
   console.log(e.target);
   console.log(ReactDOM.findDOMNode(e.target).parentNode.nextSibling)
   let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
   if(next)
   {
    //  window.scrollTop(next).offset().top();
    next.scrollIntoView({behavior:'smooth'});
    e.target.muted=true
   }
 }
  render() {
    console.log(this.props.source)
    return (
      <>
        <video onEnded={this.handleAutoScroll} src={this.props.source} className='video-styles' onClick={(e)=>this.handleMute(e)}  id={this.props.id}  muted="muted" type="video/mp4" >
        
          </video>
     </>
    );
  }
}