import React from 'react'

const App = () => {

  const getData =async() =>{
    const res =await fetch('http://localhost:8000');
    console.log(res);
  }

  getData();
  return (
    <div>App
      <img width="48" height="48" src="https://img.icons8.com/fluency/48/facebook-new.png" alt="facebook-new"/>
    </div>
  )
}

export default App