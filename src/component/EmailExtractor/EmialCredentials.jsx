import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";

import { message } from "antd";




const backendURL = import.meta.env.VITE_API_URL;

export default function EmailCredentials({ setEmails, setSummary, nextBtnHit, prevBtnHit, setCredentialPanel }) {

    // console.log("backendURL---------->",backendURL)

    // ✅ antd v5 hook
    const [messageApi, contextHolder] = message.useMessage();

    const [currentFetchedPage, setCurrentFetchedPage] = useState(null)









    const [formData, setFormData] = useState({
        userEmail: "",
        userPassword: "",
        provider: "select",
        host: "",
        port: "",
        tls: true,
        page: 1,
        pageSize: 5000,
        enabled: false,
    });


    // global change handler for all inputs
    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };






    // console.log("currentFetchedPage by nayan",currentFetchedPage)
    const fetchHeaders = async () => {
        setCredentialPanel(false)
        setEmails([]);
        setSummary({
            totalEmails: 0,
            totalPages: 0,
            currentPage: 0,
        });


        message.success("Emails fetched Starting!!!");

        messageApi.success("Emails fetched Starting!!!");


        console.log("inside fetchHeaders ")
        let mailHost = "";
        let mailPort = "";

        // if user provided custom host/port
        if (formData.provider === "select") {
            mailHost = formData.host;
            mailPort = formData.port || 993;
        } else {
            mailPort = 993; // default IMAP SSL port
            if (formData.provider === "gmail") {
                mailHost = "imap.gmail.com";
            } else if (formData.provider === "hostinger") {
                mailHost = "imap.hostinger.com";
            } else if (formData.provider === "one") {
                mailHost = "imap.one.com";
            } else if (formData.provider === "godaddy") {
                mailHost = "imap.secureserver.net";
            }
        }

        // payload for backend
        const payload = {
            email: formData.userEmail,
            password: formData.userPassword,
            host: mailHost,
            port: mailPort,
            page: formData.page,
            tls: formData.tls,
            pageSize: formData.pageSize,
        };

        setCurrentFetchedPage(Number(formData.page));

        console.log("payload------------->", payload)

        try {
            const response = await fetch(`${backendURL}/api/email/fetch-headers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch emails");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                // split chunks (assuming backend separates JSON objects with \n)
                let parts = buffer.split("\n");
                buffer = parts.pop(); // keep last incomplete part

                for (const part of parts) {
                    if (part.trim()) {
                        try {
                            const json = JSON.parse(part);



                            // ✅ store summary info
                            if (
                                typeof json.totalEmails !== "undefined" &&
                                typeof json.totalPages !== "undefined" &&
                                typeof json.currentPage !== "undefined"
                            ) {

                                setSummary({
                                    totalEmails: json.totalEmails,
                                    totalPages: json.totalPages,
                                    currentPage: json.currentPage,
                                });




                            }

                            // ✅ append chunk emails to state
                            if (json.mails && Array.isArray(json.mails)) {
                                setEmails((prev) => [...prev, ...json.mails]);
                            }
                        } catch (err) {
                            console.warn("Failed to parse chunk:", part, err);
                        }
                    }
                }
            }
            messageApi.success("Emails fetched End !");

            // handle leftover
            if (buffer.trim()) {
                try {
                    const json = JSON.parse(buffer);
                    if (json.mails && Array.isArray(json.mails)) {
                        setEmails((prev) => [...prev, ...json.mails]);
                    }
                } catch (err) {
                    console.warn("Failed to parse leftover buffer:", buffer, err);
                }

                // message.success("Emails fetched End !");
            }
        } catch (err) {
            // message.error("Failed to fetch emails!");
            messageApi.error("Failed to fetch emails !");

            console.error("Error fetching emails:", err);
        }



    };



    const fetchNextPage = async () => {

        console.log("inside here")

        setEmails([]);
        setSummary({
            totalEmails: 0,
            totalPages: 0,
            currentPage: 0,
        });


        message.success("Emails fetched Starting!!!");

        messageApi.success("Emails fetched Starting!!!");


        console.log("inside fetchHeaders ")
        let mailHost = "";
        let mailPort = "";

        // if user provided custom host/port
        if (formData.provider === "select") {
            mailHost = formData.host;
            mailPort = formData.port || 993;
        } else {
            mailPort = 993; // default IMAP SSL port
            if (formData.provider === "gmail") {
                mailHost = "imap.gmail.com";
            } else if (formData.provider === "hostinger") {
                mailHost = "imap.hostinger.com";
            } else if (formData.provider === "one") {
                mailHost = "imap.one.com";
            } else if (formData.provider === "godaddy") {
                mailHost = "imap.secureserver.net";
            }
        }

        // payload for backend
        console.log(":currentFetchedPage--------->", currentFetchedPage)
        console.log(":type of currentFetchedPage--------->", typeof (currentFetchedPage))
        const payload = {
            email: formData.userEmail,
            password: formData.userPassword,
            host: mailHost,
            port: mailPort,
            page: currentFetchedPage + 1,
            tls: formData.tls,
            pageSize: formData.pageSize,
        };
        setCurrentFetchedPage(currentFetchedPage + 1)


        // console.log("payload------------->", payload)

        try {
            const response = await fetch(`${backendURL}/api/email/fetch-headers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch emails");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                // split chunks (assuming backend separates JSON objects with \n)
                let parts = buffer.split("\n");
                buffer = parts.pop(); // keep last incomplete part

                for (const part of parts) {
                    if (part.trim()) {
                        try {
                            const json = JSON.parse(part);



                            // ✅ store summary info
                            if (
                                typeof json.totalEmails !== "undefined" &&
                                typeof json.totalPages !== "undefined" &&
                                typeof json.currentPage !== "undefined"
                            ) {
                                // console.log("summury josn logs------------->".json)

                                setSummary({
                                    totalEmails: json.totalEmails,
                                    totalPages: json.totalPages,
                                    currentPage: json.currentPage,
                                });



                            }

                            // ✅ append chunk emails to state
                            if (json.mails && Array.isArray(json.mails)) {
                                setEmails((prev) => [...prev, ...json.mails]);
                            }
                        } catch (err) {
                            console.warn("Failed to parse chunk:", part, err);
                        }
                    }
                }
            }
            messageApi.success("Emails fetched End !");

            // handle leftover
            if (buffer.trim()) {
                try {
                    const json = JSON.parse(buffer);
                    if (json.mails && Array.isArray(json.mails)) {
                        setEmails((prev) => [...prev, ...json.mails]);
                    }
                } catch (err) {
                    console.warn("Failed to parse leftover buffer:", buffer, err);
                }

                // message.success("Emails fetched End !");
            }
        } catch (err) {
            // message.error("Failed to fetch emails!");
            messageApi.error("Failed to fetch emails !");

            console.error("Error fetching emails:", err);
        }



    };

    const NextBtnHit = useRef(nextBtnHit);

    useEffect(() => {
        if (NextBtnHit.current !== nextBtnHit) {
            fetchNextPage();
            NextBtnHit.current = nextBtnHit;
        }
    }, [nextBtnHit]);









    const fetchPrevPage = async () => {
        if (currentFetchedPage <= 1) return; // prevent going below 1

        console.log("inside fetchPrevPage");

        setEmails([]);
        setSummary({
            totalEmails: 0,
            totalPages: 0,
            currentPage: 0,
        });

        message.success("Emails fetched Starting!!!");
        messageApi.success("Emails fetched Starting!!!");

        let mailHost = "";
        let mailPort = "";

        if (formData.provider === "select") {
            mailHost = formData.host;
            mailPort = formData.port || 993;
        } else {
            mailPort = 993;
            if (formData.provider === "gmail") {
                mailHost = "imap.gmail.com";
            } else if (formData.provider === "hostinger") {
                mailHost = "imap.hostinger.com";
            } else if (formData.provider === "one") {
                mailHost = "imap.one.com";
            } else if (formData.provider === "godaddy") {
                mailHost = "imap.secureserver.net";
            }
        }

        const payload = {
            email: formData.userEmail,
            password: formData.userPassword,
            host: mailHost,
            port: mailPort,
            page: currentFetchedPage - 1,
            tls: formData.tls,
            pageSize: formData.pageSize,
        };

        setCurrentFetchedPage(currentFetchedPage - 1);

        try {
            const response = await fetch(`${backendURL}/api/email/fetch-headers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to fetch emails");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                let parts = buffer.split("\n");
                buffer = parts.pop();

                for (const part of parts) {
                    if (part.trim()) {
                        try {
                            const json = JSON.parse(part);

                            if (
                                typeof json.totalEmails !== "undefined" &&
                                typeof json.totalPages !== "undefined" &&
                                typeof json.currentPage !== "undefined"
                            ) {
                                setSummary({
                                    totalEmails: json.totalEmails,
                                    totalPages: json.totalPages,
                                    currentPage: json.currentPage,
                                });
                            }

                            if (json.mails && Array.isArray(json.mails)) {
                                setEmails((prev) => [...prev, ...json.mails]);
                            }
                        } catch (err) {
                            console.warn("Failed to parse chunk:", part, err);
                        }
                    }
                }
            }
            messageApi.success("Emails fetched End !");

            if (buffer.trim()) {
                try {
                    const json = JSON.parse(buffer);
                    if (json.mails && Array.isArray(json.mails)) {
                        setEmails((prev) => [...prev, ...json.mails]);
                    }
                } catch (err) {
                    console.warn("Failed to parse leftover buffer:", buffer, err);
                }
            }
        } catch (err) {
            messageApi.error("Failed to fetch emails !");
            console.error("Error fetching emails:", err);
        }
    };

    // Handle prevBtnHit changes
    const PrevBtnHitRef = useRef(prevBtnHit);

    useEffect(() => {
        if (PrevBtnHitRef.current !== prevBtnHit) {
            fetchPrevPage();
            PrevBtnHitRef.current = prevBtnHit;
        }
    }, [prevBtnHit]);








    return (

        <div className="w-[90vw]  mx-auto shadow-md rounded-xl min-h-[86vh] flex flex-col lg:flex-row mt-[2vh]">
            {/* Left Form Section */}
            {contextHolder}
            <div className="form w-full lg:w-1/2 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none bg-white relative">
                <div className="flex flex-col justify-center p-6 sm:p-10 gap-y-5">
                    <h2 className="text-2xl font-normal">Enter Email Credentials</h2>

                    {/* Email */}
                    <input
                        type="email"
                        name="userEmail"
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded border border-blue-100 focus:outline-none focus:ring-0 focus:border-blue-300"
                        value={formData.userEmail}
                        onChange={handleChange}
                    />

                    {/* Password */}
                    <input
                        type="password"
                        name="userPassword"
                        placeholder="Password"
                        className="w-full px-4 py-2 rounded border border-blue-100 focus:outline-none focus:ring-0 focus:border-blue-300"
                        value={formData.userPassword}
                        onChange={handleChange}
                    />

                    {/* Page */}
                    <input
                        type="number"
                        name="page"
                        placeholder="Page (e.g. 221)"
                        className="w-full px-4 py-2 rounded border border-blue-100 focus:outline-none focus:ring-0 focus:border-blue-300"
                        value={formData.page}
                        onChange={handleChange}
                    />

                    {/* Page Size */}
                    <input
                        type="number"
                        name="pageSize"
                        placeholder="Page Size (e.g. 10000)"
                        className="w-full px-4 py-2 rounded border border-blue-100 focus:outline-none focus:ring-0 focus:border-blue-300"
                        value={formData.pageSize}
                        onChange={handleChange}
                    />

                    {/* Provider / Manual host toggle */}
                    <div className="flex flex-col relative">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm text-gray-700">Select from Dropdown</span>

                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="enabled"
                                    className="sr-only peer"
                                    checked={formData.enabled}
                                    onChange={handleChange}
                                />
                                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-full"></div>
                            </label>

                            <span className="text-sm text-gray-700">Manually Type</span>
                        </div>

                        {!formData.enabled && (
                            <select
                                name="provider"
                                className="border border-blue-100 rounded w-[70%] sm:w-[40%] cursor-pointer focus:outline-none focus:ring-0 focus:border-blue-300 px-1 py-2 text-[14px]"
                                value={formData.provider}
                                onChange={handleChange}
                            >
                                <option value="select" disabled>
                                    Select Mail Provider
                                </option>
                                <option value="one">One.com</option>
                                <option value="gmail">Gmail</option>
                                <option value="hostinger">Hostinger</option>
                                <option value="godaddy">GoDaddy</option>
                            </select>
                        )}

                        {formData.enabled && (
                            <div className="space-y-2 flex flex-col">
                                <input
                                    type="text"
                                    name="host"
                                    placeholder='Host (e.g. "imap.secureserver.net")'
                                    value={formData.host}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded px-2 py-1 w-full sm:w-2/3"
                                />
                                <input
                                    type="number"
                                    name="port"
                                    placeholder="Port (e.g. 993)"
                                    value={formData.port}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded px-2 py-1 w-full sm:w-2/3"
                                />
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="tls"
                                        checked={formData.tls}
                                        onChange={handleChange}
                                        id="tlsCheckbox"
                                    />
                                    <label htmlFor="tlsCheckbox">Enable TLS</label>
                                </div>
                            </div>
                        )}

                        {formData.provider === "gmail" && (
                            <p className="mt-2 sm:mt-0 sm:absolute right-0 sm:w-1/2 border-yellow-400 px-2 border-dotted text-[12px]">
                                <span className="text-red-500">Note: </span>
                                For Gmail, use an App Password instead of regular account
                                password.
                                <br />
                                <span
                                    className="text-blue-500 cursor-pointer"
                                    onClick={() => navigate("/tutorial")}
                                >
                                    How to create an App Password?
                                </span>
                            </p>
                        )}
                    </div>

                    <button
                        className={`px-6 py-2 rounded w-[60%] sm:w-[40%] text-white ${!formData.userEmail ||
                            !formData.userPassword ||
                            (
                                formData.provider === "select" &&
                                (formData.host === "" || formData.port === "")
                            )
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                            }`}
                        onClick={() => {
                            // console.log("Submitting:", formData);
                            fetchHeaders()
                        }}
                        disabled={
                            !formData.userEmail ||
                            !formData.userPassword ||
                            (
                                formData.provider === "select" &&
                                (formData.host === "" || formData.port === "")
                            )
                        }
                    >
                        Start
                    </button>

                </div>
            </div>

            <Sidebar />
        </div>
    );
}
