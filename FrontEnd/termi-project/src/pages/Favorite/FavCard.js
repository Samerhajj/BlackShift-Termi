// import React,{useEffect,useState,props} from 'react';
// import Card from 'react-bootstrap/Card';
// import fav from './fav.css';
// import { useTranslation } from 'react-i18next';
// import remove_img from './remove_img.png';
// import axios from "axios";
// import {delFavoriteRoute} from '../../api/ApiRoutes';
// import UserAPI from '../../api/UserAPI';
// import { Accordion, Image } from 'react-bootstrap';
// import LanguageMap from '../../api/LanguageAPI';

// const FavCard = ({data,index,list,setList,initialLanguage ='en'}) =>{
//     console.log("hi from FavCard")
//     const {t} = useTranslation();
//     const card = list[index];
//     const [currentLanguage, setLanguage] = useState(initialLanguage);
    
//   { // useEffect(() => {
//     //   // setList(updatedArray)
//     //   console.log("hi from useEffect")
//     //   // console.log(JSON.parse(data[index])); 
//     //   console.log(x[index]['shortDefinition']['arabic'])
//     //   console.log(x[index]['_id'])
//     //   console.log("hi from useEffect")
//     // },[])
//     }
      
//     const handleDelete = async  () =>{
//         const response = await UserAPI.deleteFavorite(list,card,data);
//         if(response.success){
//             setList([...response.body]);
//             console.log(response);
//         }
//         else{
//             alert(response.message);
//         }
//     };

// const changeLanguage = (newLanguage) => {
//     console.log("hi from Change Language");
//   setLanguage(newLanguage);
// };
    
//     return (
//         <div>
//                 <Card className="inter">
//                         <div className="d-flex top_part">
//                               <h2 className="term-title">{card.conceptName[LanguageMap[currentLanguage].name]} </h2>
//                               <img className="remove_img" onClick={handleDelete} src={remove_img}/>
//                         </div>
//                         <div className="language-selector">
//                          {
//                 Object.keys(LanguageMap).map((language) => (
//                   <div className="m-0 p-2 language-btn" key={language} onClick={() => {changeLanguage(language)}}>
//                     <Image className="img-fluid" src={LanguageMap[language].src} />
//                   </div>
//                 ))
//               }
//               </div>
//                          <Accordion className="my-3" defaultActiveKey="0">
//                          <Accordion.Item eventKey="0">
//                 <Accordion.Header>{t('.')}</Accordion.Header>
               
//                     <Accordion.Body dir={LanguageMap[currentLanguage].dir}>{card.shortDefinition[LanguageMap[currentLanguage].name]}</Accordion.Body>
//               </Accordion.Item>
//               <Accordion.Item eventKey="1">
//                 <Accordion.Header>{t('...')}</Accordion.Header>
//                 <Accordion.Body dir={LanguageMap[currentLanguage].dir}>{card.longDefinition[LanguageMap[currentLanguage].name]}</Accordion.Body>
//               </Accordion.Item>
//             </Accordion>
//             <h2 className="term-title">link : </h2>
//             <a className="link" href={card.readMore}>{card.readMore}</a>
//           </Card>
//         </div>
//     );
// };
// export default FavCard;


// {/* <h3>short term :{card['shortDefinition']['english']} </h3>
//                     <h2 className="term-title">long : </h2>
//                     <h3 className="long">long term : {card['longDefinition']['english']}</h3>
//                     <h2 className="term-title">link : </h2>
//                     <h3 className="link">{card['readMore']}</h3>*/}