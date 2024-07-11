import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import week from './images/week.jpg';
import ok from './images/ok.jpg';
import good from './images/good.jpg';
import vgood from './images/vgood.jpg';
import excellent from './images/excellent.jpg';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(2);
  const [isNumber, setIsNumber] = useState(true);
  const [isCharacter, setIsCharacter] = useState(true);
  const [img, setImg] = useState(week);
  const [des, setDes] = useState('');
  const passRef = useRef(null);

  const handler = useCallback(() => {
    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    passRef.current?.select();
  }, [password]);

  const generate = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLPMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (isNumber) str += '1234567890';
    if (isCharacter) str += '!@#$%^&*(){}:<>][|.<>';

    for (let i = 0; i < length; i++) {
      let ram = Math.floor(Math.random() * str.length);
      pass += str.charAt(ram);
    }

    setPassword(pass);
    if (length > 9) {
      setImg(excellent);
      setDes('Excellent Password');
    } else if (length < 3) {
      setImg(week);
      setDes('Very Weak Password');
    } else if (length < 5) {
      setImg(ok);
      setDes('Weak Password');
    } else if (length < 7) {
      setImg(good);
      setDes('Good Password');
    } else {
      setImg(vgood);
      setDes('Very Good Password');
    }
  }, [length, isCharacter, isNumber]);

  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <>
      <div className='heading'>
        <h1>Password Generator</h1>
        <p>Create strong and secure passwords to keep your account safe online.</p>
      </div>

      <div className='hero'>
        <div className='main'>
          <input value={password} type='text' ref={passRef} readOnly />
          <button onClick={handler}>Copy</button>
        </div>
        <div className='setting'>
          <div className='field'>
            <label>Password Length: {length}</label>
            <input
              onChange={(e) => setLength(parseInt(e.target.value))}
              value={length}
              type='range'
              min={1}
              max={15}
            />
          </div>
          <div className='addons'>
            <label>123</label>
            <input
              checked={isNumber}
              onChange={() => setIsNumber((prev) => !prev)}
              type='checkbox'
            />
            <label>#$&</label>
            <input
              checked={isCharacter}
              onChange={() => setIsCharacter((prev) => !prev)}
              type='checkbox'
            />
          </div>
        </div>
      </div>
      <div className='op'>
        <p>{des}</p>
        <img src={img} alt='' />
      </div>
    </>
  );
}

export default App;
