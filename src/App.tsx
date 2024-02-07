import './App.css'
import { OPTLogin } from './components/OTPLogin'

function App() {

  function handleOPTLogin(value: string) {
    console.log("Succesfull: ", value)
  }

  return (
    <>
      <div>
        <OPTLogin onOTPSubmit={handleOPTLogin} />
      </div>
    </>
  )
}

export default App
