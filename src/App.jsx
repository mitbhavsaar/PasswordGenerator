import { useState,useCallback,useEffect,useRef } from 'react'



function App() {

const [length,setLength] = useState(8)
const [numAlow,setNumAllow] = useState(false)
const [charAllow,setCharAllow] = useState(false)
const [Password,setPassword] = useState("")

//useRef hook 
const PasswordRef = useRef(null)

const passwordGenerator = useCallback(() =>{
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if (numAlow) str += "0123456789" 
  if (charAllow) str += "@$*.{}:'_/,^#&"

  for (let i = 1; i <= length; i++){
    let char = Math.floor(Math.random() * str.length +1)
    pass += str.charAt(char)
    
  }
  setPassword(pass)
    
  
}, [length,numAlow,charAllow,setPassword])

const copyPasswordToClipBord = useCallback (() =>{
  PasswordRef.current?.select()
  window.navigator.clipboard.writeText(Password)
},[Password])

useEffect(() => {
  passwordGenerator()
}, [length,numAlow,charAllow,setPassword])
 
  return (
   <>
   <h1 className=' text-4xl text-center'>PasswordGenerator</h1>
  <div className=' w-full h-36 max-w-md mx-auto shadow-md rounded-lg px-4 my-10 text-black bg-violet-500 ' >

    <h1 className=' text-white text-center my-5'>passwordGenerator</h1>

    <div className=' className = " flex shadow rounded-lg overflow-hidden mb-4"'>
      <input type="text" 
      value={Password} 
      className=' outline-none w-full py-2 px-3 ' 
      placeholder='Password' 
      readOnly  
      ref={PasswordRef}/>

      <button onClick={copyPasswordToClipBord} 
      className=' outline-none bg-gray-600 text-white px-3 py-0.5 shrink-0'>copy</button>

    </div>

    <div className=' flex text-sm gap-x-2'>

      <div className=' flex items-center gap-x-1'>
      <input type="range" 
       min={6}
       max={100} 
       value={length} 
       className=' cursor-pointer'
       onChange={(e) => {setLength(e.target.value)}}/>

        <label className=' text-white'>Length:{length}</label>
      </div>

      <div className=' flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked ={numAlow} id='numberInput'
        onChange={ () =>{
        setNumAllow((prev) => !prev)
        }} />
        <label className=' text-white'>Number</label>
      </div>

      <div className=' flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked ={charAllow} id='characterInput'
        onChange={ () =>{
        setCharAllow((prev) => !prev)
        }} />
        <label className=' text-white' >Character</label>
      </div>

    </div>
  </div>
   
   </>
  )
}

export default App
