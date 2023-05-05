// import React, { useState } from 'react';

  
// import { FaMicrophone } from 'react-icons/fa';
// import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';


// const HomePage = () => {
//   const [text, setText] = useState('');
//   const { speak, voices } = useSpeechSynthesis();
//   const [selectedVoice, setSelectedVoice] = useState(null);
//   const { listen, listening, stop } = useSpeechRecognition({
//     onResult: (result) => {
//       setText(result);
//     }
//   });

//   const handleSpeak = () => {
//     speak({ text, voice: selectedVoice });
//   };

//   const handleSelectVoice = (event) => {
//     const voiceURI = event.target.value;
//     setSelectedVoice(voices.find((voice) => voice.voiceURI === voiceURI));
//   };
  
//   return (
//     <div>
//       <select onChange={handleSelectVoice}>
//         <option value="">Select a voice</option>
//         {voices.map((voice) => (
//           <option key={voice.voiceURI} value={voice.voiceURI}>
//             {voice.name} ({voice.lang})
//           </option>
//         ))}
//       </select>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         style={{
//           padding: '10px',
//           border: '2px solid #ccc',
//           borderRadius: '5px',
//           fontSize: '16px',
//           minHeight: '200px',
//           minWidth: '300px',
//           margin: '10px 0',
//         }}
//       />
//       <button onClick={handleSpeak} style={{ fontSize: '32px' }}>
//         <FaMicrophone />
//       </button>
//       <button onMouseDown={listen} onMouseUp={stop} style={{ fontSize: '32px' }}>
//         {listening ? 'Stop Listening' : 'Start Listening'}
//       </button>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AchievementPopUp from "./../components/Achievement/AchievementPopUp"
const HomePage = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    // Wait for the window object to be available
    if (typeof window !== 'undefined') {
      // Create SpeechSynthesis object
      const synth = window.speechSynthesis;
      setSpeechSynthesis(synth);

      // Create SpeechRecognition object
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      setSpeechRecognition(recognition);

      // Load available voices
      const loadVoices = () => {
        const voices = synth.getVoices();
        setVoices(voices);
        setSelectedVoice(voices[0]);
      };
      synth.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

   const handleSpeak = () => {
    if (speechSynthesis && selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      speechSynthesis.speak(utterance);

      // Create a toast notification
      toast.success('Text has been spoken!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Add the AchievementPopup component
      // <AchievementPopUp
      //   notificationMessage="Text has been spoken!"
      //   isVisible={true}
      // />
    }
  };

  const handleSelectVoice = (event) => {
    const voiceURI = event.target.value;
    setSelectedVoice(voices.find((voice) => voice.voiceURI === voiceURI));
  };

  const handleListen = () => {
    if (speechRecognition) {
      if (!listening) {
        speechRecognition.start();
        setListening(true);
      } else {
        speechRecognition.stop();
        setListening(false);
      }
    }
  };

  const handleRecognitionResult = (event) => {
    const result = event.results[event.resultIndex][0].transcript;
    setText(result);
  };

  return (
    <div>
      <select onChange={handleSelectVoice}>
        <option value="">Select a voice</option>
        {voices.map((voice) => (
          <option key={voice.voiceURI} value={voice.voiceURI}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>
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
      <button onClick={handleSpeak} style={{ fontSize: '32px' }}>
        <FaMicrophone />
      </button>
      <button onClick={handleListen} style={{ fontSize: '32px' }}>
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
       {/* Add the AchievementPopup component here */}
    {text && (
      <AchievementPopUp
        notificationMessage="Text has been spoken!"
       
      />
    )}
     
    </div>
  );
};

export default HomePage;
