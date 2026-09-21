import Grid from '@mui/material/Grid';
import Image from '../components/Image';
import Sign from '../assets/signup-img.png'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const SignUp = () => {
    return (
        <Grid container>
            <Grid size={6}>
                <div className='flex h-full justify-end items-center'>
                    <div className='w-150'>

                        <h2 className='pb-4 font-nunito font-bold text-[34.4px] text-primary'>Get started with easily register</h2>

                        <p className='pb-10 font-nunito font-normal text-f20 text-black/50'>Free register <span className='font-nunito font-normal text-f20 text-light/50'>and</span> you can enjoy it</p>

                        <TextField className='w-[70%] mb-8.5!' id="outlined-basic" label="Email Address" variant="outlined" />

                        <TextField className='w-[70%] mb-8.5!' id="outlined-basic" label="Full name" variant="outlined" />

                        <TextField className='w-[70%] mb-12.75!' id="outlined-basic" label="Password" variant="outlined" />

                        <Button className='w-[70%] bg-theme! capitalize! rounded-full! py-5! mb-8.75! font-nunito! font-semibold! text-f20! text-white!' variant="contained">sign up</Button>

                        <p className='font-sans font-normal text-[13.34px] text-dark'>Already  have an account ?<span className='font-sans font-bold text-[13.34px] text-accent'>  Sign In</span></p>

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