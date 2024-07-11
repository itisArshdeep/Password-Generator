import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import week from './images/week.jpg'
import ok from './images/ok.jpg'
import good from './images/good.jpg'
import vgood from './images/vgood.jpg'
import excellent from './images/excellent.jpg'

function App() {

  let [password, setPassword] = useState("");
  let [length, setLength] = useState(2);
  let [isNumber, setIsnumber] = useState(true);
  let [isCharacter, setIscharacter] = useState(true);
  let [img,setImg] = useState(week);
  let [des,setDes] = useState("");
  let passref = useRef(null);

  const handler = useCallback(() => {

   
  
    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    passref.current?.select();

  }, [password])

  const generate = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLPMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumber) { str += "1234567890" };
    if (isCharacter) { str += "!@#$%^&*(){}:<>][|.<>" };


    for (let i = 0; i < length; i++) {
      let ram = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(ram);

    }

    setPassword(pass)
    if(length>9){
      setImg(excellent);
      setDes("Excellent Pass ")
      
    }
    else if(length<3){
      setImg(week)
      setDes("Very Week Pass")
    }
    else if(length<5){
      setImg(ok)
      setDes("Week Pass")
    }
    else if(length<7){
      setImg(good)
      setDes("Good Pass")
    }
    else{
      setImg(vgood)
      setDes("Very Good Pass")
    }

  }, [setPassword, length, isCharacter, isNumber])

  useEffect(() => { generate() }, [generate])



  return (
    <>
      <div className='heading'>
        <h1>
          Password Generator
        </h1>
        <p>Create strong and secure passwords to keep your account safe online.</p>
      </div>

      <div className='hero'>
        <div className='main'>
          <input value={password} type='text' ref={passref} />
          <button onClick={handler}>Copy</button>
        </div>
      <div className='setting'>
      <div className='field'>

<label>  Password Length : {length}</label><input onChange={(e) => {
  setLength(e.target.value)
}} value={length} type='range' min={1} max={15} />
</div>
<div className='addons'>
<label>123</label><input checked={(isNumber)} onClick={() => {
  setIsnumber((prev) => !prev)
}} value={isNumber} type='checkbox' />
<label>#$&</label><input checked={(isCharacter)} onChange={() => {
  setIscharacter((prev) => !prev)
}} value={isCharacter} type='checkbox' />
</div>
      </div>
      </div>
      <div className='op'>
        <p>{des}</p>
        <img src={img} alt='' /></div>
    </>
  );
}

export default App;
