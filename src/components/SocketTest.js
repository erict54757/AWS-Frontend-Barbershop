

// // const socketkUrl = '172.20.10.1:3001'
// import React, { Component } from "react";
// import 'jquery';
// import 'materialize-css/dist/js/materialize.js';
// import 'materialize-css/dist/css/materialize.css';
// import { Modal, Button, Row, Col, Icon, Input,Section } from "react-materialize";
// import io from "socket.io-client";



// class SocketTest extends Component {
 
//   constructor() {
//     super();
//     this.socket = io("localhost:3000/"/*, {transports: ['websocket']}*/);
//     this.socket.on('connect', () => {
//         console.log('connected');
//     });
//     this.socket.on('message', (data) => {
//         console.log(data);
//         this.setState({name: data})
//     });

//     this.state = {
//     loading:true,
      
//       info: "get it get it"
//     };
//   } 
  
//  async componentDidMount() {
      
// //    const { endpoint } = this.state;
// //     const socket = io(endpoint);
// //   await  socket.on("FromAPI", data => this.setState({ response: data }));
//   this.setState({loading:false})
//   }
  
//   sayHiToAll=event=>{
      
          
//           const socket=io("localhost:3000/")
//           socket.send( " a quick word from our corporate overlords")
//         // socket.on('message', () => {
//         //     console.log('yay');
//         //     this.setState({name: 'Done did it!'})
//         // });

          
    
      
//   }
  
//   render() {


    
//     return (
//       <div style={{ textAlign: "center" }}>
// <Button onClick={this.sayHiToAll}>click me to emit</Button>
       
//       </div>
//     );
//   }
// }
// export default SocketTest;