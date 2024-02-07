import './styles.css'
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface IOPTLoginProps {
  length?: number;
  onOTPSubmit: (value: string) => void;
}

export function OPTLogin({ length = 4, onOTPSubmit }: IOPTLoginProps) {
  const [otp, setOtp] = useState(new Array(length).fill(""))

  const inputRefs = useRef<HTMLInputElement[] | null[]>([])

  function handleChange(index: number, e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value

    if (isNaN(Number(value))) {
      return;
    }

    const newOtp = [...otp]

    newOtp[index] = value.substring(value.length - 1)

    setOtp(newOtp)

    const combinedOTP = newOtp.join("")

    if (combinedOTP.length === length) {
      onOTPSubmit(combinedOTP)
    }

    if (value && index < length - 1) {
      const emptyInputIndex = newOtp.indexOf("")

      if (inputRefs.current[emptyInputIndex]) {
        inputRefs.current[emptyInputIndex]?.focus()
      }
      
    }
  }

  function handleClick(index: number) {
    inputRefs.current[index]?.setSelectionRange(1, 1)

    if (index > 0 && !otp[index -1]) {
      inputRefs.current[otp.indexOf("")]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  useEffect(() => {
    if(inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  return (
    <div className='OTPContainer'>
      {otp.map((value, index) => {
        return (
          <input 
            className="OTPInput"
            key={index} 
            value={value} 
            ref={(input) => inputRefs.current[index] = input}
            onChange={(e) => handleChange(index, e)} 
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            />
        )
      })}
    </div>
  )
}