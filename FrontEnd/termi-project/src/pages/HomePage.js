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
