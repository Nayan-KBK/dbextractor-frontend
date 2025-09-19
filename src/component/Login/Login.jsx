import { useState } from 'react'
// import emailAnimation from '.././assets/Email.lottie'
import emailAnimation from '../../assets/Email.lottie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        const payload = {
            email: formData.email,
            password: formData.password,
        }
        e.preventDefault()

        try {
            const response = await axios.post(`${API_URL}/api/users/login`, payload)
            localStorage.setItem("role", response.data.role)
            localStorage.setItem("mail", formData.email)
            navigate('/email-extractor')
            setFormData({ email: '', password: '' })

        } catch (error) {
            console.error('❌ Login failed:', error.response?.data || error.message)
            alert(error.response?.data?.error || 'Login failed')
        } finally {
            setLoading(false)
        }
    }


    return (

        <>


            <div className={`bg-[url('./assets/loginBg.png')]   bg-cover bg-center h-screen w-full flex justify-center items-center text-white `}>


                <div className="sm:w-[80vw] w-[90vw] md:h-[80vh] h-[90vh] bg-white/20 backdrop-blur-[2px] border-white/60 border-1 rounded-4xl flex flex-col md:flex-row  md:justify-around  justify-center item-center overflow-y-hidden  ">


                    <div className="md:w-1/2 w-full h-[90vw] md:h-auto">
                        <DotLottieReact
                            src={emailAnimation}
                            autoplay
                            loop={true}
                            speed={0.7}

                        />
                    </div>





                    {/* <div className="flex flex-col justify-around  "> */} 


                    <div className="md:w-1/2 w-full flex flex-col justify-center  md:h-[80vh] h-fit mb-5">
                        <h2 className="text-3xl font-bold  text-center md:text-left mb-5"> Login</h2>

                        {/* <form className="space-y-4 " onSubmit={handleSubmit}>

                                <div className="flex flex-col">
                                    <label htmlFor="email">Email Id</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        className="p-2 rounded lg:w-1/2 w-2/3  placeholder-gray-400 text-black bg-white focus:outline-none focus:ring-0 text-sm "
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                   
                                </div>
                                <div className=" flex flex-col ">
                                  
                                    <label htmlFor="password">Password</label>
                                    <input
                                        required
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="p-2 rounded lg:w-1/2 w-2/3 placeholder-gray-400 text-black bg-white focus:outline-none focus:ring-0"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>



                                <button
                                    type="submit"
                                className={`lg:w-1/2 w-2/3 py-2 text-black bg-[#00E0C2] hover:shadow-lg rounded-md font-medium transition ${!loading ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                                        }`}
                                    disabled={loading}
                                >
                                    Login
                                </button>

                            </form> */}


                        <div className="flex justify-center md:justify-start items-center ">
                            <form className="space-y-4 w-2/3 max-w-md" onSubmit={handleSubmit}>
                                <div className="flex flex-col font-bold gap-y-2">
                                    <label htmlFor="email">Email Id</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        className="p-2 rounded placeholder-gray-400 text-black bg-white focus:outline-none focus:ring-0 text-sm"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex flex-col font-bold gap-y-2">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        required
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="p-2 rounded placeholder-gray-400 text-black bg-white focus:outline-none focus:ring-0"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full py-2 text-black bg-[#00E0C2] hover:shadow-lg rounded-md font-medium transition ${!loading ? 'cursor-pointer' : 'cursor-not-allowed opacity-50 '
                                        }`}
                                    disabled={loading}
                                >
                                   <p className='font-bold'> Login</p>
                                </button>
                            </form>
                        </div>


                    </div>


                    {/* </div> */}



                </div>


            </div>





        </>
    )
}
