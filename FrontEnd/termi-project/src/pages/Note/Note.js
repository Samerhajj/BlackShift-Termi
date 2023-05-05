// import React,{useState,useRef,useEffect} from 'react';
// import { useTranslation } from 'react-i18next';
// import {Row,Col} from 'react-bootstrap';
// import NoteStyle from './NoteStyle.css';
// import NoteCard from './NoteCard';
// import testPic from './2270743.png';
// // import { useTrail, animated } from 'react-spring';
// import shortid from "shortid";
// // import Rect_light from "Rect_light.svg";

// const Note = ()=>{
  
//   // Hooks
//     const [note,setNote]=useState({title:"",textBody:""})
//     const {t} = useTranslation();
//     const [noteList,setNoteList] = useState([
//       {id:shortid.generate(),titleInList:"ASAP",textInList:"as soon as possible, as late as possible and as timely as possible."},
//       {id:shortid.generate(),titleInList:"IDK",textInList:"Idk is an abbreviation of the phrase I don't know. Idk is most commonly used in informal communication, such as text messaging."},
//       {id:shortid.generate(),titleInList:"BRB",textInList:"be right back: used when you stop taking part in a discussion in an internet chat room for a short time. Internet, email and texting conventions."},
//       {id:shortid.generate(),titleInList:"BRB",textInList:"be right back: used when you stop taking part in a discussion in an internet chat room for a short time. Internet, email and texting conventions."},
//       {id:shortid.generate(),titleInList:"BRB",textInList:"be right back: used when you stop taking part in a discussion in an internet chat room for a short time. Internet, email and texting conventions."},
//       {id:shortid.generate(),titleInList:"BRB",textInList:"be right back: used when you stop taking part in a discussion in an internet chat room for a short time. Internet, email and texting conventions."},
//       {id:shortid.generate(),titleInList:"BRB",textInList:"be right back: used when you stop taking part in a discussion in an internet chat room for a short time. Internet, email and texting conventions."},
//       ]);
      
//       const [title,setTitle]=useState("");
//       const [txtBody,setTxtBody] = useState("");
//       const txtAreaRef = useRef(null);
      

// //     const newNoteSpring = useTrail(noteList.length, {
// //   from: { transform: 'translate3d(0, -100%, 0)' },
// //   to: { transform: 'translate3d(0, 0, 0)' },
// // });
      
//   // Functions
//       // Function to handle the change event of the title input field
//   const handleTitle = (e) => {
//     setTitle(e.target.value);
//   }
//       // Function to handle the change event of the text body text area
//   const handleTxtBody = (e) => {
//     setTxtBody(e.target.value);
//   }
//       const handleOnClick = () =>{
//         setNoteList([...noteList,{id:shortid.generate(),titleInList:title,textInList:txtBody}]);
//       }
//       //----------------------
//     // Function to change the background color of the text area to white
//   const handleTextAreaBackground = () => {
//     txtAreaRef.current.style.backgroundColor = 'white';
//   }

//       const handleEffect = ()=>{
//         if(txtAreaRef.current.value === ''){
//           // txtAreaRef.current.style.background  = `url(ca0.webp)`;
//           txtAreaRef.current.style.backgroundImage   = testPic;

//         }
//       } 
      
// useEffect(() => {
//               // txtAreaRef.current.style.backgroundColor   = '#2596be';
//               handleEffect();
//   }, []);

//     return(
//       <>
//     <div className="banner banner_note">
//                 <div className="wrapper">
//                     <div className="banner_content fade-in-element">
//                           {/*<h1><strong>My Note</strong></h1>*/}
//                           <h1><strong>{t('note.myNote')}</strong></h1>

//                     </div>
//                 </div>
//     </div>
//       <div className="form-group">
      
//       <Row className="d-flex ">
//             <Col xs={1} lg={4}></Col>
//             <Col xs={10} lg={4}>
            
//                     <label for="usr" className="">{t('note.title')}</label>
//                     <input type="text" 
//                     maxLength={25} 
//                     value={title} 
//                     className="form-control text-input-class" 
//                     id="usr" 
//                     onChange={e=>handleTitle(e)}/>
//             </Col>
//             <Col xs={1} lg={4}></Col>
//       </Row>
      
//       <Row>
//           <Col xs={1} lg={2}></Col>
//           <Col xs={10} lg={8}>      
//                   <label for="exampleFormControlTextarea1" className="form-label">{t('note.body')}</label>
//                   <textarea 
//                   maxLength={378} 
//                   value={txtBody} 
//                   className="bio"  
//                   id="textBody" 
//                   onChange={e=>handleTxtBody(e)}
//                   ref={txtAreaRef} 
//                   onFocus={handleTextAreaBackground} 
//                   onBlur={handleEffect} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
//             </Col>
//             <Col xs={1} lg={2}></Col>
//       </Row>  
      

//       </div>
//       <button className="add-note-button " onClick={handleOnClick}>Add</button>
      
//     <div className="card-box d-flex align-content-stretch flex-wrap ">
//         {noteList.map((item,index)=>{
        
 
//           return(
//           <animated.div key={note.id} style={newNoteSpring[index]}>
//                     <NoteCard  
//                     key={item['id']}  
//                     note={{...note,title:item['titleInList'],textBody:item['textInList']}} 
//                     id_card={item['id']}  
//                     setNote={setNote} 
//                     noteList={noteList} 
//                     setNoteList={setNoteList}/>
//           </animated.div>)})}
//         </div>
  
//     </>
//     )
// }
// export default Note;
//                 // <label for="txtBody">Body Note</label>
//                 // <input type="text" maxLength={415} value={txtBody} className="form-control" id="textBody" onChange={e=>handleTxtBody(e)}/>
