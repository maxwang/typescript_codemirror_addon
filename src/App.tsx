import React from 'react';
import './App.css';
// import CodeMirrorAutoComplete from './Components/CodeMirrorAutoComplete';
import CodeMirrorWithAutoComplete from './Components/CodeMirrorWithAutoComplete';
import ControlledCodeMirror from './Components/ControlledCodeMirror';

const App = () => {
  return (
    <div className="App">
      <ControlledCodeMirror />
      <p>Code Mirror with Auto Complete</p>
      <CodeMirrorWithAutoComplete />
      <input type="file" capture="camera"></input>
    </div>
  );
}

export default App;
