import React, { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import accenture from "../../assets/accenture.png";
import apple from "../../assets/apple.png";
import hexaware from "../../assets/hexaware.png";
import infosys from "../../assets/infosys.png";
import kpmg from "../../assets/kpmg.png";
import tcs from "../../assets/tcs.jpg";
import section from "../../assets/section.png";
import { IoFlashOutline } from "react-icons/io5";
import { CiMedal } from "react-icons/ci";
import { Collapse } from "antd";
import { Link } from "react-router-dom";
import extractorTools from "../../assets/extractor-tools.png";
import { BsShieldCheck } from "react-icons/bs";
import emailextractor from '../../assets/email-address-extractor.png'
import logo from '../../assets/online-db-logo.png';



const Home = () => {
    const [open, setOpen] = useState(false);
    const { Panel } = Collapse;

    const logos = [infosys, tcs, kpmg, hexaware, apple, accenture];

    const handleNavClick = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setOpen(false); // close mobile menu if open
        }
    };

    return (
        <>
            {/* Header */}
            <div className="shadow-md">
                <div className="container mx-auto px-4">
                    <div className="flex w-full h-14 items-center justify-between">
                        {/* Logo */}



                        <Link
                            to="/"
                            className="flex items-center cursor-pointer"
                            onClick={() => {
                                setShowButton(true);
                            }}
                        >
                            <img src={logo} alt="Online DB Extractor Logo" className="h-8 md:h-10" />
                        </Link>


                        {/* Nav Links (Desktop) */}
                        <div className="hidden md:flex justify-center items-center gap-6 w-1/3">
                            <p className="cursor-pointer hover:text-orange-400 transition-colors" onClick={() => handleNavClick("about")}>
                                About Us
                            </p>
                            <p className="cursor-pointer hover:text-orange-400 transition-colors" onClick={() => handleNavClick("how-it-works")}>
                                How It Works
                            </p>
                            <p className="cursor-pointer hover:text-orange-400 transition-colors" onClick={() => handleNavClick("faq")}>
                                FAQ
                            </p>

                        </div>

                        {/* Buttons (Desktop) */}
                        <div className="hidden md:flex gap-4">
                            <Link to="/login">
                                <button className="bg-gray-300 rounded-lg px-5 py-2 cursor-pointer">Login</button>
                            </Link>
                            <Link to="/login">
                                <button className="bg-black !text-white border border-black rounded-lg px-5 py-2 cursor-pointer">
                                    Create An Account
                                </button>
                            </Link>
                        </div>

                        {/* Mobile Menu Icon */}
                        <div className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
                            {open ? <RxCross2 size={24} /> : <RxHamburgerMenu size={24} />}
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {open && (
                    <div className="md:hidden">
                        <div className="flex flex-col items-center gap-4 px-4 py-4">
                            <p className="cursor-pointer" onClick={() => handleNavClick("about")}>
                                About Us
                            </p>
                            <p className="cursor-pointer" onClick={() => handleNavClick("how-it-works")}>
                                How It Works
                            </p>
                            <p className="cursor-pointer" onClick={() => handleNavClick("faq")}>
                                FAQ
                            </p>
                            <div className="flex flex-col justify-center sm:flex-row gap-4 w-full mt-2">
                                <Link to="/login">
                                    <button className="bg-gray-400 rounded-lg px-5 py-2 w-full cursor-pointer">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/login">
                                    <button className="bg-black !text-white border border-black rounded-lg px-5 py-2 w-full cursor-pointer ">
                                        Create An Account
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* first Section */}
            <div className="my-8 md:my-16 container mx-auto flex md:flex-row flex-col items-center justify-center text-center py-8 md:py-0">
                <div className="content w-full h-full flex flex-col justify-center">
                    <h2 className="text-xl md:text-2xl font-normal mb-3 text-gray-600">
                        Bulk Email Finder
                    </h2>
                    <p className="text-gray-700 md:text-[3rem] sm:text-[2.5rem] text-[2rem] font-bold flex flex-col">
                        <span className="text-orange-500">Enhance your prospect list</span>
                        <span className="-mt-1">with verified email contacts.</span>
                    </p>
                </div>
            </div>



            {/* Trusted Section */}
            {/* <div className="container mx-auto text-center px-4 my-6"> */}
            <div className="container mx-auto text-center px-4 my-8 md:my-10">

                <h2 className="text-2xl md:text-4xl font-bold mb-14">
                    Trusted by 50K+ professionals across different industries
                </h2>

                <div className="overflow-hidden">
                    <div className="flex w-max animate-marquee space-x-10 mt-4">
                        {logos.concat(logos).map((logo, idx) => (
                            <div
                                key={idx}
                                className="flex justify-center  items-center flex-shrink-0"
                            >
                                <img
                                    src={logo}
                                    alt={`logo-${idx}`}
                                    className="h-16 md:h-14 object-contain border border-gray-200 bg-white px-2 py-2"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>`






            {/* About Us Section */}
            <div
                id="about"
                className="my-10 container mx-auto flex flex-col md:flex-row items-start md:items-center gap-10 px-4"
            >
                {/* Left Content */}
                <div className="md:w-1/2 text-left">
                    <div className="text-sm md:text-base font-normal mb-3 text-gray-600">
                        About us
                    </div>

                    <h2 className="text-2xl md:text-4xl font-bold mb-4">
                        No more manual search for email addresses.
                    </h2>

                    <p className="text-base md:text-lg text-gray-700">
                        Discover verified contact details for your prospects in bulk—fast.
                        Online DB Extractor helps you enrich your list with precise, validated contact data in minutes.
                    </p>
                </div>

                {/* Right Image */}
                <div className="md:w-1/2 flex justify-start md:justify-center">
                    <img
                        src={extractorTools}
                        alt="Email Extractor"
                        className="w-[95%] md:w-[80%] rounded-lg shadow-md"
                    />
                </div>
            </div>








            {/* 3rd section- How It Works */}


            <div id="how-it-works" className="container mx-auto my-20 px-4">
                <h2 className="text-2xl md:text-4xl font-semibold text-center mb-8">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-md mb-3 text-2xl">
                            <IoFlashOutline />
                        </div>
                        <h3 className="font-semibold text-xl mb-2">Speed and convenience</h3>
                        <p className="text-gray-600 text-lg">
                            Enter the login credentials of email and select the email provider.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-md mb-3 text-2xl">
                            <CiMedal />
                        </div>
                        <h3 className="font-semibold text-xl mb-2">High accuracy</h3>
                        <p className="text-gray-600 text-lg">
                            Get your email list with 100% genuine and verified data.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-md mb-3 text-2xl">
                            <BsShieldCheck />
                        </div>
                        <h3 className="font-semibold text-xl mb-2">Secure and Reliable</h3>
                        <p className="text-gray-600 text-lg">
                            We ensure data privacy and secure handling of your information.
                        </p>
                    </div>
                </div>
            </div>


            <div className=" w-full h-px my-2 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />





            {/* 4th Section */}
            <div className="my-10 container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
                {/* Text Content */}
                <div className="content w-full md:w-1/2 text-left">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4">
                        Get bulk <span className="text-orange-500">email addresses</span> & streamline lead generation
                    </h2>

                    <p className="text-base md:text-lg leading-relaxed">
                        Online DB Extractor is built to make it easier to find potential clients, partners, or job candidates.
                        Start a batch email search and receive accurate data in real time.
                        Each email address undergoes a real-time verification check to ensure validity,
                        providing you with a reliable contact list for your sales or recruitment campaigns.
                        <br />
                        Launch batch email searches and access accurate data instantly.
                        Every email address goes through a live status check to ensure it's valid.
                        You’ll get a dependable list of contacts for your sales or hiring campaigns.
                    </p>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center mt-8 mb-16 md:my-0">
                    {/* Top Gradient Divider - Mobile Only */}
                    <div className="w-full h-px my-2 bg-gradient-to-r from-transparent via-gray-300 to-transparent md:hidden" />

                    <img
                        src={emailextractor}
                        alt="section"
                        className="w-full md:w-[80%] h-[300px] md:h-[400px] object-cover"
                    />

                    {/* Bottom Gradient Divider - Mobile Only */}
                    <div className="w-full h-px my-2 bg-gradient-to-r from-transparent via-gray-300 to-transparent md:hidden" />
                </div>





            </div>






            {/* 5th Section */}
            <div className="w-full -mt-12 md:my-18 p-8 mx-auto px-4 text-left md:text-center bg-gray-200">
                <h2 className="text-2xl md:text-4xl font-bold mb-3">
                    The most popular <span className="text-orange-500">email-finding</span> service.
                </h2>

                <p className="max-w-2xl text-base md:text-lg md:mx-auto mb-6">
                    Over 50k users trust Online DB Extractor to find verified email addresses.
                    Start your first Bulk Email Finding task today and begin connecting with the right contacts.
                </p>

                <div className="flex justify-center md:justify-center">
                    <Link to="/login">
                        <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-semibold py-2 px-6 rounded-md transition duration-300">
                            Get Started
                        </button>
                    </Link>
                </div>

            </div>





            {/*6th section- FAQ */}
            <div
                id="faq"
                className="container mt- mx-auto flex md:flex-row flex-col items-center justify-center text-center pt-8 md:pt-12z pb-10 px-4"

            >
                <div className="content w-full md:mb-0">
                    {/* Heading */}
                    <h2 className="text-2xl md:text-4xl font-bold mb-6">FAQ</h2>

                    {/* Accordion */}
                    <Collapse accordion expandIconPosition="end" className="w-full text-left">
                        <Panel
                            header="Q: How do I find emails in bulk?"
                            key="1"
                            className="text-lg"
                        >
                            <p className="text-normal">
                                To find bulk email addresses for free, simply enter login credentials
                                of email from which you want the email list. Online DB Extractor will
                                handle the rest—finding email addresses and enriching the data with
                                valuable details.
                            </p>
                        </Panel>
                        <Panel
                            header="Q: How long will it take to find contacts in bulk?"
                            key="2"
                            className="text-lg"
                        >
                            <p className="text-normal">
                                After entering your credential to Online DB Extractor, the tool will
                                instantly begin searching for their email addresses. On average, it
                                takes around 3 minutes to generate and verify a bulk email list for
                                full contacts.
                            </p>
                        </Panel>
                        <Panel
                            header="Q: How can I get thousands of email addresses?"
                            key="3"
                            className="text-lg"
                        >
                            <p className="text-normal">
                                To start searching email addresses for leads, the following are
                                required: have an account with Online DB Extractor and login
                                credentials of emails from which you want to export the data. In
                                order to get a thousand email addresses, you should purchase a
                                Starter subscription plan.
                            </p>
                        </Panel>
                        <Panel
                            header="Q: What is the accuracy of the Online DB Extractor?"
                            key="4"
                            className="text-lg"
                        >
                            <p className="text-normal">
                                The Online DB Extractor uses one of the most comprehensive databases
                                of public email addresses available on the web to find accurate
                                contact information. All email addresses are verified through
                                Hunter’s email verification system before being delivered. If an
                                address is marked as Valid, it's safe to use for cold outreach. For
                                other results, the Online DB Extractor provides a confidence score to
                                indicate the likelihood of accuracy. Our internal benchmarks show
                                that Hunter’s email-finding algorithm delivers top-quality
                                data—identifying more valid email addresses than any other tool
                                tested.
                            </p>
                        </Panel>
                    </Collapse>
                </div>
            </div>


            {/* Footer  */}

            <footer className="bg-gray-300 text-black py-6 mt-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-4">
                        {/* Logo */}

                        {/* <Link
                            to="/"
                            onClick={() => window.scrollTo(0, 0)}
                            className="font-bold text-lg md:text-xl text-orange-500 cursor-pointer"
                        >
                            onlinedbextractor
                        </Link> */}

                        <Link
                            to="/"
                            onClick={() => window.scrollTo(0, 0)}
                            className="flex items-center gap-2 font-bold text-lg md:text-xl text-orange-500 cursor-pointer"
                        >
                            <img src={logo} alt="Online DB Extractor Logo" className="h-8 md:h-10" />
                          
                        </Link>

                        {/* Footer Links */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-center md:text-left">

                            <p className="cursor-pointer hover:text-orange-400 transition-colors" onClick={() => handleNavClick("about")}>
                                About Us
                            </p>
                            <p className="cursor-pointer hover:text-orange-400 transition-colors" onClick={() => handleNavClick("how-it-works")}>
                                How It Works
                            </p>
                            <p className="cursor-pointer hover:text-orange-400 transition-colors" onClick={() => handleNavClick("faq")}>
                                FAQ
                            </p>
                        </div>

                        {/* Copyright */}
                        <p className="text-xs sm:text-sm text-black text-center md:text-right">
                            © {new Date().getFullYear()} onlinedbextractor. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

        </>
    );
};

export default Home;
