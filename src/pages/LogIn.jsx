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
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner'






const LogIn = () => {

  const auth = getAuth();
  const navigate = useNavigate();

  //Data Storing
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Error Storing
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loader, setLoader] = useState(false)


  //Regex 
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const lowercaseRegex = /^(?=.*[a-z])/
  const uppercaseRegex = /(?=.*[A-Z])/
  const digitRegex = /(?=.*\d)/
  const specialRegex = /(?=.*[@$!%*?&])/
  const charactersRegex = /[A-Za-z\d@$!%*?&]{8,}$/

  //Eye Icon
  const [showPassword, setShowPassword] = useState(true)

  //Forget Password
  const [popup, setPopup] = useState(false)
  const [resetemail, setResetEmail] = useState('')
  const [resetEmailError, setResetEmailError] = useState('');


  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("")
  }

  const handleResetEmail = (e) => {
    setResetEmail(e.target.value);
    setResetEmailError("");
  }

  const handleLogIn = () => {

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

      setLoader(true)

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (userCredential.user.emailVerified) {
            toast.success("Login Successful")
            setTimeout(() => {

              navigate('/home')

            }, 2000)

          } else {
            toast.error("Verify Your Email")

          }
        })

        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode)
          setLoader(false)

          if (errorCode.includes("auth/invalid-credential")) {
            toast.error("Invalid Credential")
          } else if (errorCode.includes("auth/too-many-requests")) {
            toast.error("Try Later.")
          }

        });

    }

  }

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/home')

      }).catch((error) => {
        const errorCode = error.code;


      });

  }

  const handleSubmit = () => {

    if (!resetemail) {
      toast.error("Please enter your email address");
      return;
    }

    const error = validateEmail(resetemail);

    if (error) {
      toast.error(error);
      return;
    }

    sendPasswordResetEmail(auth, resetemail)
      .then(() => {
        toast.success("Check Your Email")
        setPopup(false)
        setResetEmail("");

      })
      .catch((error) => {
        console.log(error.code);
        toast.error("Something went wrong. Please try again.");
      });

  }

  const validateEmail = (value) => {
    if (!value) {
      return "Enter Your Email";
    } else if (!emailRegex.test(value)) {
      return "Enter Valid Email";
    }

    return "";
  };


  return (
    <Grid container>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Grid size={6}>
        <div className='flex h-full justify-end items-center'>
          <div className='w-150'>

            <h2 className='pb-4 font-sans font-bold text-[33.34px] text-dark'>Login to your account!</h2>

            <div onClick={handleGoogle} className='w-[40%] py-5 px-6 rounded-lg flex gap-x-4 items-center justify-center border border-gray-300 my-9 cursor-pointer'>
              <FcGoogle className='text-3xl' />
              <p className='font-sans font-semibold text-[13.34px] text-dark '>Login with Google </p>


            </div>



            <TextField onChange={handleEmail} className='cursor-pointer w-[70%]!' id="outlined-basic" label="Email Address" variant="outlined" />
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


            {
              loader ?

                <div className='flex justify-center w-[70%] py-3'>
                  <ThreeDots
                    visible={true}
                    height="70"
                    width="70"
                    color="#5F35F5"
                    radius="5"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>

                :

                <Button onClick={handleLogIn} className='w-[70%] bg-theme! capitalize! rounded-lg! py-5!  mt-12.75! mb-2.75! font-nunito! font-semibold! text-f20! text-white!' variant="contained">Login to Continue</Button>

            }

            <p onClick={() => setPopup(true)} className='mt-5 mb-9 font-nunito font-bold text-[18px] text-theme cursor-pointer w-[70%] flex justify-center '>Forgotten Password ?</p>

            {
              popup &&
              <div className='absolute top-0 left-0 z-10 w-full h-screen bg-black/50 flex justify-center items-center'>

                <div className='flex flex-col justify-center items-center gap-y-5 w-150 h-100 bg-white rounded-md p-10'>

                  <h2 className='font-sans font-bold text-[33.34px] text-dark'>Reset Password</h2>

                  <TextField onChange={handleResetEmail} value={resetemail} className='cursor-pointer w-[70%]!' id="outlined-basic" label="Email Address" variant="outlined" error={Boolean(resetEmailError)}
                    helperText={resetEmailError} />

                  <div className='flex gap-x-5 my-3'>
                    <Button onClick={() => setPopup(false)} className='bg-theme! capitalize! rounded-lg! py-1! font-nunito! font-semibold! text-f20! text-white!' variant="contained">Cancel</Button>
                    <Button onClick={handleSubmit} className='bg-theme! capitalize! rounded-lg! py-1 font-nunito! font-semibold! text-f20! text-white!' variant="contained">Continue</Button>
                  </div>

                </div>
              </div>
            }


            <p className='gap-2 font-sans font-normal text-[13.34px] text-dark w-[70%] flex justify-center'>Don’t have an account ? <span className='font-sans font-bold text-[13.34px] text-accent cursor-pointer'> <Link to="/">Sign Up</Link></span></p>

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