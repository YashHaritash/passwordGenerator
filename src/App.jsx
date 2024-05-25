import { useState ,useCallback, useEffect, useRef} from 'react'


function App() {
  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState("");

  const passRef = useRef(null);
  const copy = ()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if(charAllowed) str+= "!@#$%^&*()_+-=[]{}"

    for(let i=0;i<length;i++){
      let char = Math.floor(Math.random()*(str.length+1));
      pass+=str[char]; 
    }

    setPassword(pass);

  },[length,numberAllowed,charAllowed])

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 h-24'>
        <input type="text" value={password} className='rounded-xl p-1 m-3 w-72 text-black' readOnly ref={passRef}/>
        <button className='bg-orange-400 text-white rounded-xl p-1 m-3 w-20 hover:bg-orange-700' onClick={copy}>Copy</button>

        <div className='flex justify-evenly'>
          <span className='flex'><input type="range" min={8} max={99} className='mx-2' onChange={(e)=>{
            setLength(e.target.value);
          }}/><p className='text-white'>Length {length}</p></span>
          
          <span className='flex'><input type="checkbox" className='m-2' onChange={
            ()=>{
              setNumberAllowed(prev=>!prev);
            }
          }/><p> Number</p></span>
          <span className='flex'><input type="checkbox" className='m-2' onChange={
              ()=>{
                setCharAllowed(prev=>!prev);
              }

          }/><p> Character</p></span>
        </div>
      </div>
    </>
  )
}

export default App
