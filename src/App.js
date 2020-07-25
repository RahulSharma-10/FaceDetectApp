import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Particles from 'react-particles-js';
import Logo from './components/logo/logo.js';
import ImageLinkForm from './components/imagelinkform/imagelinkform.js';
import FaceRecognition from './components/facerecognition/facerecognition.js';
import Rank from './components/Rank/Rank.js';
import './App.css';
import './components/logo/logo.css';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
 apiKey: '5737dcfac5f24332aa1c4e6ff201619b'
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
    }
  }
  calculateFaceLocation = (bata) =>{
   
   const clarifaiFaces = bata.outputs[0].data.regions.map(face => {
      const faceBox = face.region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);

      return {
        leftCol: faceBox.left_col * width,
        rightCol: width - (faceBox.right_col * width),
        topRow: faceBox.top_row * height,
        bottomRow: height - (faceBox.bottom_row * height)
      }    
    })
    return clarifaiFaces;
  }

  displayFaceBox = (box) =>{
    console.log(box); 
    this.setState({boxes: box});
    
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then( response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
      }

  
  render() {
    return(
    <div className="App">
       <Particles className='particles'
                params={particlesOptions} />
      
      <Logo />
      <Rank />
      <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
          />

      <FaceRecognition box={this.state.boxes} imageUrl={this.state.imageUrl}/>
    </div>
  );
}
}

export default App;
