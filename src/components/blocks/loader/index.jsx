
import React from 'react';
const Loader = () =>(
    <div className={" react-spinner-loader-svg loader-show" }>
        <svg id="triangle" width="120" height="120" viewBox="-3 -4 39 39" aria-label="audio-loading">
            <polygon fill="transparent" stroke="#31af91" strokeWidth="1" points="16,0 32,32 0,32">
            </polygon>
        </svg>
    </div>
);
export default Loader;