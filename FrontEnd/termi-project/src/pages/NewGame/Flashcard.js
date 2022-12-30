import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ flashcard }) {
  // --> hooks , start the card with the state not flipped
  const [flip, setFlip] = useState(false)
  // --> the height 
  const [height, setHeight] = useState('initial')
  // --> useRef we use here cuz Modifying (front && back)
  const frontEl = useRef()
  const backEl = useRef()
  // --> funcitons
  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }
  // --> when the card appears for the first time we need to call setMaxHeight
  useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])
  // --> now we use addEventListener to ______
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  return (
      <>
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map(option => {
            return <div className="flashcard-option" key={option}>{option}</div>
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>{flashcard.answer}</div>
    </div>
    </>
  )
}
