import React from 'react';

function MyWebGLGame() {
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
      <iframe
        src="./Build/index.html"
        title="Unity Game"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      ></iframe>
    </div>
  );
}

export default MyWebGLGame;
