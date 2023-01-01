import React, { useState } from 'react';

const SuggestCard = ({ data }) => {
  const languages = ['english', 'arabic', 'hebrew'];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    else{
      setCurrentIndex(languages.length-1);
    }
  }

  const handleNextSlide = () => {
    if (currentIndex < languages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    else{
    setCurrentIndex(0);
    }
  }

  const currentLanguage = languages[currentIndex];

  return (
    <div>
      <h1 className="suggest-card__title">{data.conceptName[currentLanguage]}</h1>
      {
        data.shortDefinition && (
          <div className="definition">
            <p className="definition__text">{data.shortDefinition[currentLanguage]}</p>
          </div>
        )
      }
      {
        data.longDefinition && (
          <div className="definition">
            <p className="definition__text">{data.longDefinition[currentLanguage]}</p>
          </div>
        )
      }
      <h2 className="suggest-card__subtitle">suggestedBy : {data['suggestedBy']}</h2>
      <button className="btn btn-success" onClick={handlePrevSlide}>Prev</button>
      <button className="btn btn-danger" onClick={handleNextSlide}>Next</button>
    </div>
  );
}
export default SuggestCard;

