import React from 'react';
import './facerecognition.css';

function FacerRecogniton ({imageUrl,box}){
	return(
		<div className='center ma'>
		<div className='absolute mt2'>
			<img id='inputimage' alt=' ' width='500px' heigh='auto' src={imageUrl} />
			{box.map(box => {
			return <div key={box.topRow} className="bounding-box" style={{top: box.topRow, right:box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
		
		})
	}
		</div>
		</div>
		)
}

export default FacerRecogniton;