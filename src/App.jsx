import { useCallback, useState , useEffect , useRef} from 'react'

import './App.css'

function App() {
  const passwordRef = useRef(null);
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  


  const copypass = useCallback(()=>{
    window.navigator.clipboard.writeText(password),
    
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 990);

  }, [password])



  const passGen = useCallback(()=>{
    let pass =""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnnm"

    if(numberAllowed) str+="1234567890"
    if(charAllowed) str+="!@#$%^&*()_+~[]{}\|?/"

    for(let i = 0 ; i < length ; i++){

      let char = Math.floor(Math.random() * str.length + 1 );
      
      pass += str.charAt(char);

    }
    setPassword(pass);

  },[length, numberAllowed, charAllowed, setPassword]);

  useEffect(()=>{
    passGen()
      }, [length, numberAllowed, charAllowed,
      passGen])
      

  return (
    <>

<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-pink-500">
        <h1 className="text-4xl text-center text-pink-500">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4  text-black">
          <input 
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button 
            className="flex text-sm gap-x-2 p-2 bg-blue-500 text-white"
            onClick={copypass}
          >
            Copy
          </button>
        </div>
    
    <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1" >      
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          
        />
        <label> Length: {length}</label>

      </div>
    </div>
    <div className="flex items-center gap-x-1">
        <input
        type="checkbox" 
        defaultChecked={numberAllowed} 
        id="numberInput"
        onChange={()=>{
         setNumberAllowed ((prev)=>!prev);}}
        />
        <label>Numbers</label>
    </div>
    <div className="flex items-center gap-x-1">
        <input
        type="checkbox" 
        defaultChecked={numberAllowed} 
        id="numberInput"
        onChange={()=>{
         setCharAllowed ((prev)=>!prev);}}
        />
        <label>Characters</label>
    </div>
  </div>

    </>

  )
} 

export default App
