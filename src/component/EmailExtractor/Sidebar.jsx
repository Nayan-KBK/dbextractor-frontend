import React, { useState } from 'react';
import Motherboard from '../../assets/motherboard.gif';
import { AlignJustify, Power, RotateCcwKey, Shell, UserPlus, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



const apiUrl = import.meta.env.VITE_API_URL;


export default function Sidebar({ setIsLoggedIn }) {

    const navigate = useNavigate();


    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState('');

    const role = localStorage.getItem("role")

    return (
        <div className="relative w-full lg:w-1/2  flex items-center justify-center bg-gray-100 overflow-hidden ">

            {/* Background Image */}

            <div className="w-full h-full overflow-hidden rounded-r-xl">

                {activeTab === 'create' && (
                    <CreateUserUI setActiveTab={setActiveTab} />
                )}
                {activeTab === 'forgot' && (
                    <ForgotPassword />
                )}
                {activeTab === '' && <img
                    src={Motherboard}
                    alt="Motherboard"
                    className="w-full h-full object-cover mx-auto"
                />}
            </div>


            {/* Toggle Button */}
            <button
                onClick={() => setShowForm(!showForm)}
                className="absolute top-4 right-4 z-50 bg-black bg-opacity-70 !text-white p-2 rounded-full cursor-pointer"
            >
                {showForm ? <X size={24} /> : <AlignJustify size={24} />}
            </button>

            {/* Transparent Drawer with custom size */}
            <div
                className={`h-full absolute top-0 right-0 w-[250px] backdrop-blur-md bg-white/30 z-40 shadow-lg rounded-l-xl transform transition-transform duration-500 ease-in-out ${showForm ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="mt-[15vh] flex flex-col items-end space-y-3 p-5 text-white text-xl">
                    <p className="backdrop-blur-md cursor-pointer rounded hover:text-blue-800 text-black p-2 w-full flex justify-end items-center gap-x-2" onClick={() => { setActiveTab(''); setShowForm(!showForm) }}>
                        <span>Home</span>
                        <Shell size={20} />
                    </p>


                    {role === 'admin' && <p className="backdrop-blur-md cursor-pointer rounded  hover:text-blue-800 text-black p-2 w-full flex justify-end items-center gap-x-2" onClick={() => { setActiveTab('create'); setShowForm(!showForm) }}>
                        <span>Create User</span>
                        <UserPlus size={20} />
                    </p>}


                    <p className="backdrop-blur-md cursor-pointer rounded hover:text-blue-800 text-black p-2 w-full flex justify-end items-center gap-x-2" onClick={() => { setActiveTab('forgot'); setShowForm(!showForm) }}>
                        <span>Forgot Password</span>
                        <RotateCcwKey size={20} />
                    </p>



                    <p className="backdrop-blur-md cursor-pointer rounded hover:text-blue-800 text-black p-2 w-full flex justify-end items-center gap-x-2" onClick={() => { setIsLoggedIn(false); localStorage.removeItem("mail"); navigate('/'); localStorage.removeItem('role') }}>
                        <span>Logout</span>
                        <Power size={20} />
                    </p>
                </div>
            </div>



        </div>
    );
}




function CreateUserUI({ setActiveTab }) {
    const [formData, setFormData] = useState({ email: '', password: '', Cpassword: '', otp: '' });
    const [otpRequested, setOtpRequested] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setotpVerified] = useState(false);
    const [loading, setLoading] = useState(false);




    const handleOtpChange = (value, index) => {
        if (!/^\d?$/.test(value)) return; // allow only single digit numbers
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };


    const handleCreateUserChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };




    const handleCreateUserSubmit = async () => {
        const { email, password, Cpassword } = formData;

        if (!email || !password || !Cpassword) {
            toast.error('Please fill all fields');
            return;
        }

        if (password !== Cpassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/api/users/register`, {
                email,
                password,
                role: 'user',
            });

            if (response.status === 201) {
                toast.success('User registered successfully');
                console.log('Registered:', response.data);
                setActiveTab("")
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Registration failed');
            console.error('Error:', error);
        }
    };

    const handleRequestOtp = async () => {
        try {
            setLoading(true)
            console.log('api fetch,', formData.email)
            const response = await axios.post(`${apiUrl}/api/users/send-otp`, { email: formData.email });
            console.log("response", response)
            if (response.status === 200) {
                setOtpSent(true);
                console.log('OTP Sent Successfully:', response.data.message);
                setLoading(false)
                toast.success('OTP sent to your email');

            }
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data?.error || 'Failed to send OTP');
            console.error('Error requesting OTP:', error.response?.data || error.message);
        }



    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        console.log("api fetch,", otp.join(''))
        try {
            const response = await axios.post(`${apiUrl}/api/users/verify-otp`, {
                email: formData.email,
                otp: otp.join('')
            });

            if (response.status === 200) {
                console.log('OTP Verified:', response.data.message);
                setotpVerified(true);
                toast.success('OTP Verified');
            }
        } catch (error) {
            console.error('OTP Verification Failed:', error.response?.data || error.message);
            toast.error(error.response?.data?.data || 'OTP Verification Failed');
        } finally {
            setLoading(false);

        }
    };

    return (
        <div className="relative p-10 bg-gray-200 h-full">



            <div className="flex flex-col max-w-md mx-auto  gap-y-5 px-6 ">
                <h2 className="text-2xl">Create User</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleCreateUserChange}
                    className="border border-blue-200 rounded px-4 py-2 "
                />



                {!otpVerified && <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            if (!otpRequested) {
                                handleRequestOtp();
                                setOtpRequested(true);
                            } else {
                                handleVerifyOtp();
                            }
                        }}
                        className={`bg-blue-500 text-white px-4 py-2 rounded cursor-pointer w-fit ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'} 
                                 text-white`}
                        disabled={loading}

                    >
                        {otpSent ? "Verify OTP" : "Request OTP"}
                    </button>

                    {otpSent && (
                        <div className="flex gap-2 ">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    className="w-8 h-10 text-center text-black text-xl border-b-2 border-gray-400 focus:outline-none"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e.target.value, index)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Backspace' && !otp[index] && index > 0) {
                                            document.getElementById(`otp-${index - 1}`)?.focus();
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>}






                {otpVerified &&
                    <>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleCreateUserChange}
                            className="border border-blue-200 rounded px-4 py-2"
                        />
                        <input
                            type="password"
                            name="Cpassword"
                            placeholder="Confirm Password"
                            value={formData.Cpassword}
                            onChange={handleCreateUserChange}
                            className="border border-blue-200 rounded px-4 py-2"
                        />

                        <button
                            className="bg-gray-500 text-white px-4 py-2 w-[40%] rounded hover:bg-gray-600"
                            onClick={handleCreateUserSubmit}
                            disabled={!formData.email || !formData.password}
                        >
                            Submit
                        </button>
                    </>}



            </div>

        </div>
    );
}





function ForgotPassword() {
    // const [email, setEmail] = useState('');
    const email = localStorage.getItem("mail")
    const [otpRequested, setOtpRequested] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [newCPassword, setnewCPassword] = useState('');

    const [loadsendOtp, setLoadSendOtp] = useState(false)

    const handleOtpChange = (value, index) => {
        if (!/^\d?$/.test(value)) return; // only allow digits
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        // Auto focus next
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleRequestOtp = async () => {
        console.log("call otp")
        setLoadSendOtp(true)
        if (!email) {
            toast.error("Email is required");
            return;
        }

        try {
            console.log("inside try")
            const res = await axios.post(`${apiUrl}/api/users/send-otp`, { email });
            console.log("after api", res)
            if (res.status === 200) {
                setOtpRequested(true);
                toast.success("OTP sent to your email");
            }
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to send OTP");
            console.error(err);
        }
        finally {
            setLoadSendOtp(false)
        }
    };

    const handleVerifyOtp = async () => {
        setLoadSendOtp(true)
        const enteredOtp = otp.join('');
        if (!email || !enteredOtp || !newPassword || !newCPassword) {
            toast.error("All fields are required");
            setLoadSendOtp(false)
            return;
        }

        if (newPassword !== newCPassword) {
            toast.error("Passwords do not match");
            setLoadSendOtp(false)
            return;
        }

        try {
            const res = await axios.post(`${apiUrl}/api/users/reset-password`, {
                email,
                otp: enteredOtp,
                newPassword,
            });

            if (res.status === 200) {
                toast.success("Password reset successful");
                setOtpRequested(false);
                setOtp(['', '', '', '', '', '']);
                setNewPassword('');
                setnewCPassword('');
                // setEmail('');
            }
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to reset password");

            console.error(err);
        }
        finally {
            setLoadSendOtp(false)
        }
    };

    return (

        <div className="relative flex flex-col  p-10  bg-gray-200 h-full">
            <div className="  px-4 space-y-5">

                <h2 className="text-2xl">Reset Password</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200 !mb-5 hover:cursor-not-allowed"
                    value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    disabled
                />

                {otpRequested && (
                    <>
                        <div className="flex gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    className="w-10 h-10 text-center text-xl border-b-2 border-gray-400 focus:outline-none"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e.target.value, index)}
                                />
                            ))}
                        </div>

                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            value={newCPassword}
                            onChange={(e) => setnewCPassword(e.target.value)}
                        />
                    </>
                )}

                <button
                    onClick={() => {
                        if (!otpRequested) {
                            handleRequestOtp();
                        } else {
                            handleVerifyOtp();
                        }
                    }}
                    // className="w-[35%] bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer "
                    disabled={loadsendOtp}
                    className={`w-[35%] py-2 rounded  transition 
                        ${loadsendOtp ? 'border border-gray-500 cursor-not-allowed' : 'bg-gray-400 hover:bg-gray-500 text-white cursor-pointer'}
                    `}
                >
                    {otpRequested ? 'Reset Password' : 'Request OTP'}
                </button>
            </div>
        </div>

    );
}
