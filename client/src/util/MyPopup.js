import { Popup } from 'semantic-ui-react';
import React from 'react';


// content = isi body biasanya berupa text popup, trigger apa yg terjadi pada popup misal menampilkan tombol, 
function MyPopup({ content, children }) {
    return <Popup inverted content={content} trigger={children}/>
}

export default MyPopup;

