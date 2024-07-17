
import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import bcrypt from 'bcryptjs';
import {  toast } from 'react-toastify';
import { AuthContext } from "../Provider/AuthProvider";


const Register = () => {
    const {setToken} = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();
    const [errmge, setErrmsg] = useState();
    const [passErr, setPassErr] = useState()
    const navigate = useNavigate();


    // const {mutateAsync} = useMutation({
    //     mutationFn: async userData =>{
    //         const {data}= await axiosSecure.put('/user', userData)
    //         return data
    //     },
    //     onSuccess: () => {
    //         alert('success, wait for admin aproved') 
    //     }
    //  })

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => { 
        setErrmsg('');
        setPassErr('');

        if (data.pin.length < 5) {
            setPassErr('Password must be 5 characters or longer');
            return;
        } else if (isNaN(data.pin)) {
            setPassErr('Password must contain only numbers');
            return;
        } else {
            setErrmsg('');
            setPassErr('');

        try{
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(data.pin, salt);

            console.log(
                hashedPassword
            );
            axiosSecure.post('/addUser', { ...data, pin: hashedPassword, role: 'pending',balance:0 })
            .then(async (res) => {
                console.log(res);
                toast.success('User added successfully! Wait for admin confirmation.');
                setToken(data)
                const token = localStorage.getItem('token')
                if (token) {
                    reset();
                    navigate('/');
                }

            })
            .catch((error) => {
                console.log(error);
                // setErrmsg('An error occurred. Please try again.');
            });
        }
        catch (err){
            console.log(err)
        }
    
       
    }

}


    // const onSubmit = async (data) => {
    //     setErrMsg('');
    //     setPassErr('');

    //     if (data.password.length < 5) {
    //         setPassErr('Password must be 5 characters or longer');
    //         return;
    //     } else if (isNaN(data.password)) {
    //         setPassErr('Password must contain only numbers');
    //         return;
    //     } else {
    //         setPassErr('');
    //         setErrMsg('');
    //         try {

    //             const salt = bcrypt.genSaltSync(10);
    //             const hashedPassword = bcrypt.hashSync(data.password, salt);

    //             console.log(
    //                 hashedPassword
    //             );
    //             axiosPublic.post('/addUser', { ...data, password: hashedPassword, role: 'pending',balance:0 })
    //                 .then(async (res) => {
    //                     console.log(res);
    //                     toast.success('User added successfully! Wait for admin confirmation.');
    //                     setToken(data)
    //                     const token = localStorage.getItem('token')
    //                     if (token) {
    //                         reset();
    //                         navigate('/');
    //                     }

    //                 })
    //                 .catch((error) => {
    //                     console.log(error);
    //                     setErrMsg('An error occurred. Please try again.');
    //                 });
    //         } catch (error) {
    //             console.log(error);
    //             setErrMsg('An error occurred during password hashing. Please try again.');
    //         }
    //     }
    // };
    return (

        <div className="border mb-5 lg:w-[500px] w-[300px] mx-auto py-14 mt-10 bg-slate-100 rounded-lg">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-3xl text-center  font-bold">Register now!</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" {...register("name", { required: true })} placeholder="enter your name" className="input input-bordered" required />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">pinNumber</span>
                            </label>
                            <input type="text" name="pin" {...register("pin", { required: true })} placeholder="enter your pin number" className="input input-bordered" required />
                              <h1>{errmge}</h1>
                              <h1>{passErr}</h1>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"  name="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" required />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Mobile Number</span>
                            </label>
                            <input type="number" name="number" {...register("number", { required: true })} placeholder="enter your number" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn bg-cyan-200" type="submit" value="Sign Up" />
                        </div>

                    </form>
                    <p className='text-center pb-4'><small>New Here ?</small><Link to="/login">Create an account</Link></p>

                </div>
            </div>
        </div>
    );
};

export default Register;