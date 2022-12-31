import React,{useState,useEffect,useRef} from 'react';
import './SuggestCard.css';
// Core modules imports are same as usual
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";


import SwiperCore, { EffectFlip, Navigation, Pagination } from "swiper";


const SuggestCard = ({data}) => {
  const languages = ['english', 'arabic', 'hebrew'];
  const [currentLanguage, setCurrentLanguage] = useState('english');



const handleSlideChange = (swiper) => {
  console.log("JHELLO");
  console.log(swiper);
  setCurrentLanguage(languages[swiper.activeIndex]);
}

  return (
     <Swiper loop={false}    navigation
      pagination={{ clickable: true }}    
      onSlideChange={(handleSlideChange) => console.log('slide change')}>
      {
        languages.map((language, index) => (
           <SwiperSlide key={index} style={{ display: language !== currentLanguage ? 'none' : 'block' }}>
            <h1 className="suggest-card__title">{data.conceptName[language]}</h1>
            {
              data.shortDefinition && (
                <div className="definition">
                  <p className="definition__text">{data.shortDefinition[language]}</p>
                </div>
              )
            }
            {
              data.longDefinition && (
                <div className="definition">
                  <p className="definition__text">{data.longDefinition[language]}</p>
                </div>
              )
            }
            <h2 className="suggest-card__subtitle">suggestedBy : {data['suggestedBy']}</h2>
            <button className="btn btn-success">Add</button>
            <button className="btn btn-danger">Remove</button>
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}
export default SuggestCard;




// return (
//       <div className="suggest-card-container">
//     <Swiper
//         className="swiper-container"
//         pagination={{ clickable: true }}
//         navigation
//         spaceBetween={30}
//         slidesPerView={1}
//     >
//       {
//           languages.map((language, index) => (
//             <SwiperSlide key={index}>
//               <h1 className="suggest-card__title">{data.conceptName[language]}</h1>
//               {
//                 data.shortDefinition && (
//                   <div className="definition">
//                     <p className="definition__text">{data.shortDefinition[language]}</p>
//                   </div>
//                 )
//               }
//               {
//                 data.longDefinition && (
//                   <div className="definition">
//                     <p className="definition__text">{data.longDefinition[language]}</p>
//                   </div>
//                 )
//               }
//             </SwiperSlide>
//           ))
//         }
//       </Swiper>
//       <h2 className="suggest-card__subtitle">suggestedBy : {data['suggestedBy']}</h2>
//       <button className="btn btn-success">Add</button>
//       <button className="btn btn-danger">Remove</button>
//     </div>
//   );
// }