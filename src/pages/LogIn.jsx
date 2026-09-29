import Grid from '@mui/material/Grid';
import Image from '../components/Image';
import Log from '../assets/login-img.png'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { BiError } from "react-icons/bi";
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';



const LogIn = () => {

  //Data Storing
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Error Storing
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  //Regex 
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const lowercaseRegex = /^(?=.*[a-z])/
  const uppercaseRegex = /(?=.*[A-Z])/
  const digitRegex = /(?=.*\d)/
  const specialRegex = /(?=.*[@$!%*?&])/
  const charactersRegex = /[A-Za-z\d@$!%*?&]{8,}$/

  //Eye Icon

  const [showPassword, setShowPassword] = useState(true)

  const handleSignUp = () => {

    if (!email) {
      setEmailError("Enter Your Email");
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter Valid Email");
    }
    if (!password) {
      setPasswordError("Enter Your Password");
    } else if (!lowercaseRegex.test(password)) {
      setPasswordError("Ensure at least one lowercase letter");
    } else if (!uppercaseRegex.test(password)) {
      setPasswordError("Ensure at least one uppercase letter");
    } else if (!digitRegex.test(password)) {
      setPasswordError("Ensure at least one digit");
    } else if (!specialRegex.test(password)) {
      setPasswordError("Ensure at least one special character");
    } else if (!charactersRegex.test(password)) {
      setPasswordError("Ensure the password is at least 8 characters long");
    }
    if (email && emailRegex.test(email) && password && lowercaseRegex.test(password) && uppercaseRegex.test(password) && digitRegex.test(password) && specialRegex.test(password) && charactersRegex.test(password)) {
      console.log("account created");

    }

  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("")
  }


  return (
    <Grid container>
      <Grid size={6}>
        <div className='flex h-full justify-end items-center'>
          <div className='w-150'>

            <h2 className='pb-4 font-sans font-bold text-[33.34px] text-dark'>Login to your account!</h2>

            <div className='w-[40%] py-5 px-6 rounded-lg flex gap-x-5 items-center justify-center border border-gray-300 my-9'>
              <FcGoogle className='text-4xl' />
              <p className='font-sans font-semibold text-[13.34px] text-dark '>Login with Google </p>


            </div>

            

            <TextField onChange={handleEmail} className='w-[70%]!' id="outlined-basic" label="Email Address" variant="outlined" />
            {
              emailError && <p className='font-nunito font-bold text-[16px] text-red-500 py-3 w-[70%] flex items-center gap-2'><BiError />{emailError}</p>
            }

            <TextField onChange={handlePassword} className='w-[70%] mt-5!' id="outlined-password" label="Password" variant="outlined" type={showPassword ? "password" : "text"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}
                        edge="end" >
                        {showPassword ? <LuEyeClosed /> : <LuEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {
              passwordError && <p className='font-nunito font-bold text-[16px] text-red-500 py-3 w-[70%] flex items-center gap-2'><BiError />{passwordError}</p>
            }

            <Button onClick={handleSignUp} className='w-[70%] bg-theme! capitalize! rounded-lg! py-5!  mt-12.75! mb-8.75! font-nunito! font-semibold! text-f20! text-white!' variant="contained">Login to Continue</Button>

            <p className='ml-27 font-sans font-normal text-[13.34px] text-dark'>Don’t have an account ? <span className='font-sans font-bold text-[13.34px] text-accent cursor-pointer'> <Link to="/">Sign Up</Link></span></p>

          </div>
        </div>
      </Grid>
      <Grid size={6}>
        <Image className='w-full h-screen object-cover' src={Log} alt='Log In illustration' />
      </Grid>
    </Grid>
  )
}

export default LogIn