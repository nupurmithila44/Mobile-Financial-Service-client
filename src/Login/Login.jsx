import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link,  useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";


const Login = () => {
      // const [showPass,setShowPass]=useState(false)
      const [errMsg,setErrMsg]=useState('')
      const [passErr,setPassErr]=useState('')
      const [emailErr,setEmailErr]=useState('')
      const {signIn}=useContext(AuthContext);
      const navigate=useNavigate()
      const { register, handleSubmit, reset } = useForm();
  
  
  
      const onSubmit = async (data) => {
          setErrMsg('')
          setPassErr('')
          setEmailErr('')
  
          if(data.pin.length<5){
              setPassErr('Password must be 5 characters or longer')
              return
          }
          else if (isNaN(data.pin)) {
              setPassErr('Password must contain only numbers');
              return;
          }
          // else if(!data.captcha){
          //     setPassErr('')
          //     setErrMsg('Type the Captcha')
          //     return
          // }
          // else if(!validateCaptcha(data.captcha)){
          //     setPassErr('')
          //     setErrMsg('Captcha not matched')
          //     return
          // }
          else {
              setPassErr('');
              setErrMsg('');
              try {
                  const res = await signIn(data.email, data.pin);
                  if (res && res.message === 'Login successful') {
                      toast.success('Login Success');
                      console.log(res.user.role)
                      setTimeout(() => {
                          if (res.user.role === 'pending' || res.user.role === 'user') {
                              navigate("/");
                          } else if (res.user.role === 'agent') {
                              navigate("/agentHome");
                          } else if (res.user.role ==='admin') {
                              navigate("/adminHome");
                          }
                          
                      }, 1500);
                  }
                  else {
                      setErrMsg(res.response.data.message)
                  }
  
                                 
              } catch (error) {
                  console.error('Login error:', error);
                  setErrMsg('An error occurred. Please try again.');
              }
          }
      };
  
      // useEffect(() => {
      //     loadCaptchaEnginge(6); 
      // }, []);






    return (
        <div className="hero min-h-72 bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className=" w-full  shadow-2xl bg-base-100">
            <h1 className="text-3xl text-blue-900 font-bold text-center mt-4">Sign In From</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" required />
               <h1>{emailErr}</h1>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                
                <input type="pin" {...register("pin", { required: true })}  name="pin" placeholder="password" className="input input-bordered" required />
                <h1>{passErr}</h1>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Sign In" />
              </div>
            </form>
            <p className='text-center pb-4'><small>New Here ?</small><Link to="/Register">Create an account</Link></p>
           
          </div>
        </div>
      </div>
    );
};

export default Login;