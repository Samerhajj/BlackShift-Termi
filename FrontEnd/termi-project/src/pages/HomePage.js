import React, { useState, useEffect } from 'react';
import { FaMicrophone } from 'react-icons/fa';

const HomePage = () => {
  const [text, setText] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const initializeRecognition = () => {
      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition;

      if (SpeechRecognition) {
        const newRecognition = new SpeechRecognition();
        newRecognition.continuous = false;
        newRecognition.interimResults = false;
        newRecognition.lang = 'en-US';

        newRecognition.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript;
          setText((prevText) => prevText + ' ' + transcript);
            setListening(false);
        };

        newRecognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setRecognition(null);
          setListening(false);
        };

        setRecognition(newRecognition);
      } else {
        console.error('Speech recognition not supported in this browser.');
      }
    };

    initializeRecognition();

    return () => {
      if (recognition) {
        recognition.abort();
        setRecognition(null);
        setListening(false);
      }
    };
  }, []);

  const handleStartListening = () => {
    if (!listening && recognition) {
      setText('');
      setListening(true);
      recognition.start();
    } else {
      console.error('Speech recognition is already active or not available.');
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: '10px',
          border: '2px solid #ccc',
          borderRadius: '5px',
          fontSize: '16px',
          minHeight: '200px',
          minWidth: '300px',
          margin: '10px 0',
        }}
      />
      <button onClick={handleStartListening} disabled={listening} style={{ fontSize: '32px' }}>
        <FaMicrophone />
      </button>
    </div>
  );
};

export default HomePage;
