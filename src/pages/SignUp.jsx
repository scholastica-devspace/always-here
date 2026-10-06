import Grid from '@mui/material/Grid';
import Image from '../components/Image';
import Sign from '../assets/signup-img.png'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { BiError } from "react-icons/bi";
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link } from 'react-router-dom';

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';




const SignUp = () => {
    const auth = getAuth();

    //Data Storing
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    // Error Storing
    const [emailError, setEmailError] = useState('')
    const [nameError, setNameError] = useState('')
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

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setEmailError("");
    }

    const handleName = (e) => {
        setName(e.target.value);
        setNameError("")
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setPasswordError("")
    }

    const handleSignUp = () => {

        if (!email) {
            setEmailError("Enter Your Email");
        } else if (!emailRegex.test(email)) {
            setEmailError("Enter Valid Email");
        }
        if (!name) {
            setNameError("Enter Your Name");
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
        if (email && emailRegex.test(email) && name && password && lowercaseRegex.test(password) && uppercaseRegex.test(password) && digitRegex.test(password) && specialRegex.test(password) && charactersRegex.test(password)) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    sendEmailVerification(auth.currentUser)

                    toast.success("Registration Successful")
                    setTimeout(() => {

                        navigate('/home')

                    }, 2000)


                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode)
                    if (errorCode.includes("auth/email-already-in-use")) {
                        setEmailError("Email Already In Use")
                    } else if (errorCode.includes("auth/weak-password")) {
                        setPasswordError("Ensure the password is at least 8 characters long")
                    }
                });
        }
    }

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

                        <h2 className='pb-4 font-nunito font-bold text-[34.4px] text-primary'>Get started with easily register</h2>

                        <p className='pb-10 font-nunito font-normal text-f20 text-black/50'>Free register <span className='font-nunito font-normal text-f20 text-light/50'>and</span> you can enjoy it</p>

                        <TextField onChange={handleEmail} className='w-[70%]!' id="outlined-basic" label="Email Address" variant="outlined" />
                        {
                            emailError && <p className='font-nunito font-bold text-[16px] text-red-500 py-3 w-[70%] flex items-center gap-2'><BiError />{emailError}</p>
                        }

                        <TextField onChange={handleName} className='w-[70%] mt-5!' id="outlined-basic" label="Full name" variant="outlined" />
                        {
                            nameError && <p className='font-nunito font-bold text-[16px] text-red-500 py-3 w-[70%] flex items-center gap-2'><BiError />{nameError}</p>
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

                        <Button onClick={handleSignUp} className='w-[70%] bg-theme! capitalize! rounded-full! py-5!  mt-12.75! mb-8.75! font-nunito! font-semibold! text-f20! text-white!' variant="contained">sign up</Button>

                        <p className='ml-25 font-sans font-normal text-[13.34px] text-dark'>Already  have an account ? <span className='font-sans font-bold text-[13.34px] text-accent cursor-pointer'><Link to='/login'> Sign In</Link></span></p>

                    </div>
                </div>
            </Grid>
            <Grid size={6}>
                <Image className='w-full h-screen object-cover' src={Sign} alt='Sign up illustration' />
            </Grid>
        </Grid>
    )
}

export default SignUp