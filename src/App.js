import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  let [password, setPassword] = useState("");
  let [length, setLength] = useState(8);
  let [isNumber, setIsnumber] = useState(true);
  let [isCharacter, setIscharacter] = useState(true);
  let passref = useRef(null);

  const handler=useCallback(()=>{
    
    passref.current?.select();
    window.navigator.clipboard.writeText(password);
  
},[password])

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

  }, [setPassword, length, isCharacter, isNumber])

  useEffect(() => { generate() }, [generate])



  return (
    <>
      <h1>
        Password Generator
      </h1>
      <label>Password</label><input value={password} type='text' ref={passref} />
      <label> <br />Length : {length} <br /></label><input onChange={(e) => {
        setLength(e.target.value)
      }} value={length} type='range' />
      <label>Numbers</label><input checked={(isNumber)} onClick={() => {
        setIsnumber((prev) => !prev)
      }} value={isNumber} type='checkbox' />
      <label>Characters</label><input checked={(isCharacter)} onChange={() => {
        setIscharacter((prev) => !prev)
      }} value={isCharacter} type='checkbox' />
      <button style={{ cursor: 'pointer' }} onClick={handler}>Copy</button>
    </>
  );
}

export default App;
