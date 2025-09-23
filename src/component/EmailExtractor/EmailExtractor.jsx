import React, { useState, useMemo, useEffect } from "react";
import { Button, Table } from "antd";
import "antd/dist/reset.css";


import InboxIcon from '../../assets/inbox.png';
import InboxSent from '../../assets/sent.png';
import InboxTrash from '../../assets/trash.png';
import InboxSpam from '../../assets/spam.png';
import InboxFolder from '../../assets/folder.png';


import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { MoveLeft } from "lucide-react";

import LoginAnimation from '../../assets/animations/Loading.lottie'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';




export default function EmailExtractor({ emails, summary, setNextBtnHit, setPrevBtnHit, setCredentialPanel, nextBtnHit, CredentialPanel }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50); // default 50 per page



    const [uniqueContacts, setUniqueContacts] = useState([]);

    useEffect(() => {
        const contacts = getUniqueContacts(emails);
        setUniqueContacts(contacts);
    }, [emails]);

    const uniqueColumns = [
        { title: "Sr. No", dataIndex: "key", key: "key", width: 80 },
        { title: "Name", dataIndex: "name", key: "name", render: (text) => text || "-", width: 500 },
        { title: "Email", dataIndex: "email", key: "email" },
    ];




    const folderCounts = useMemo(() => {
        const counts = {};
        emails.forEach(e => {
            counts[e.folder] = (counts[e.folder] || 0) + 1;
        });
        return counts;
    }, [emails]);

    const columns = [
        {
            title: "Sr No",
            key: "sr",
            width: 80,
            render: (text, record, index) => {
                // continuous numbering across all pages
                return (currentPage - 1) * pageSize + index + 1;
            },
        },

        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => text || "-",
            width: 'auto',
        },
        {
            title: "UID",
            dataIndex: "uid",
            key: "uid",
            width: 80,
        },
        {
            title: "From",
            dataIndex: "from",
            key: "from",
            // ellipsis: true,
        },
        {
            title: "To",
            dataIndex: "to",
            key: "to",
            // ellipsis: true,
        },
        {
            title: "Subject",
            dataIndex: "subject",
            key: "subject",
            // ellipsis: true,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (text) => new Date(text).toLocaleString(),
            width: 180,
        },
        {
            title: "Folder",
            dataIndex: "folder",
            key: "folder",
            ellipsis: true,
            render: (text) => {
                if (!text) return "";
                return text === "INBOX" ? "INBOX" : text.split(".").pop();
            },
        },

    ];

    const dataSource = emails.map((item, index) => ({
        ...item,
        key: `${item.uid}-${index}`,
    }));








    const downloadEmailsAsExcel = (emails) => {
        if (!emails || emails.length === 0) {
            alert("No emails to download!");
            return;
        }

        // Transform emails
        const transformed = emails.map((mail, index) => ({
            "Sr No": index + 1,
            From: mail.from,
            To: mail.to,
            Subject: mail.subject || "(No Subject)",
            Date: new Date(mail.date).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }),
            Folder:
                mail.folder === "INBOX"
                    ? "Inbox"
                    : mail.folder.split(".")[1]
        }));

        const worksheet = XLSX.utils.json_to_sheet(transformed);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Emails");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

        const file = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(file, "emails.xlsx");
    };

    const parseContact = (raw) => {
        raw = raw.trim();
        // Match "Name <email>" or just "email"
        const match = raw.match(/^(?:"?([^"]*)"?\s)?<?([^<>]+)>?$/);
        if (match) {
            let name = match[1]?.trim() || "";
            const email = match[2].trim().toLowerCase();
            // If name is empty, take part before @
            if (!name && email.includes("@")) {
                name = email.split("@")[0];
            }
            return { name, email };
        }
        const email = raw.toLowerCase();
        return { name: email.split("@")[0], email };
    };

    const getUniqueContacts = (emails) => {
        const contactsMap = new Map();

        emails.forEach((mail) => {
            // from
            if (mail.from) {
                const { name, email } = parseContact(mail.from);
                if (!contactsMap.has(email)) contactsMap.set(email, name);
            }

            // to (may have multiple)
            if (mail.to) {
                mail.to.split(",").forEach((raw) => {
                    const { name, email } = parseContact(raw);
                    if (email && !contactsMap.has(email)) contactsMap.set(email, name);
                });
            }

            // Optional: handle cc
            if (mail.cc) {
                mail.cc.split(",").forEach((raw) => {
                    const { name, email } = parseContact(raw);
                    if (email && !contactsMap.has(email)) contactsMap.set(email, name);
                });
            }

            // Optional: handle bcc
            if (mail.bcc) {
                mail.bcc.split(",").forEach((raw) => {
                    const { name, email } = parseContact(raw);
                    if (email && !contactsMap.has(email)) contactsMap.set(email, name);
                });
            }
        });

        // Convert Map to array for Ant Design Table
        return Array.from(contactsMap, ([email, name], index) => ({
            key: index + 1,
            name: name || "-",
            email,
        }));
    };

    // Unique state for this table
    const [uniqueCurrentPage, setUniqueCurrentPage] = useState(1);
    const [uniquePageSize, setUniquePageSize] = useState(50);

    // Add continuous numbering for Sr. No across pages
    const pagedData = dataSource.map((item, index) => ({
        ...item,
        key: (uniqueCurrentPage - 1) * uniquePageSize + index + 1,
    }));









    // console.log('uniqueContacts------------->', uniqueContacts);






    const exportToExcel = () => {
        // Use the already parsed uniqueContacts array
        const exportData = uniqueContacts.map((item, index) => ({
            "Sr. No": index + 1,
            Name: item.name,
            Email: item.email,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Unique Contacts");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "unique_contacts.xlsx");
    };









    // console.log("emails--------->", emails)


    return (

        <>
            {/* {summary.totalEmails === 0 && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="w-1/2 ">
                    <DotLottieReact
                        src={LoginAnimation}
                        autoplay
                        loop={true}
                        speed={0.8}
                    />
                </div>
            </div>} */}

            <div className="w-[90vw] mx-auto rounded-xl min-h-[86vh] mt-[10vh]">
                <h2 className="text-xl font-semibold mb-4">Fetched Emails</h2>


                <div className="flex justify-between">

                    <div className="flex flex-wrap gap-2 mb-4 text-sm">
                        {Object.keys(folderCounts).length > 0 ? (
                            Object.entries(folderCounts).map(([folder, count]) => {
                                const folderKey = folder.toLowerCase();

                                const iconMap = {
                                    inbox: InboxIcon,
                                    "inbox.sent": InboxSent,
                                    "inbox.trash": InboxTrash,
                                    "inbox.spam": InboxSpam,
                                    "inbox.drafts": InboxFolder,
                                };

                                const iconSrc = iconMap[folderKey] || InboxFolder;
                                const exactFolder = folder === "INBOX" ? "INBOX" : folder.split(".").pop();

                                return (
                                    <span
                                        key={folder}
                                        className="px-4 py-2 bg-blue-100 rounded flex items-center gap-2"
                                    >
                                        <img
                                            src={typeof iconSrc === "string" ? iconSrc : iconSrc.src}
                                            alt={folder}
                                            className="w-5 h-5 object-contain"
                                            onError={(e) => (e.target.src = InboxFolder)}
                                        />
                                        <span className="capitalize">{exactFolder}:</span>
                                        <strong>{count}</strong>
                                    </span>
                                );
                            })
                        ) : (
                            <span className="px-4 py-2 bg-gray-100 rounded flex items-center gap-2">
                                <img
                                    src={InboxFolder}
                                    alt="No Folder"
                                    className="w-5 h-5 object-contain"
                                    onError={(e) => (e.target.src = InboxFolder)}
                                />
                                <span>No Folder</span>
                            </span>
                        )}
                    </div>


                    <Button type="primary" onClick={() => downloadEmailsAsExcel(emails)}>
                        Download Emails
                    </Button>

                </div>








                {/* Top summary */}

                <div className="flex justify-between mt-5">

                    <div className="flex gap-6 mb-4 text-lg font-medium">
                        <span>Total Emails: {summary.totalEmails}</span>
                        <span>Total Pages: {summary.totalPages}</span>
                        <span>Current Page: {summary.currentPage}</span>
                    </div>
                    <div className="flex gap-4 my-4">
                        {/* Prev button */}
                        <Button
                            type="default"
                            disabled={summary.currentPage <= 1}
                            onClick={() => setPrevBtnHit((prev) => prev + 1)}
                        >
                            Prev
                        </Button>

                        {/* Next button */}
                        <Button
                            disabled={
                                summary.totalPages <= summary.currentPage
                            }
                            type="default"
                            onClick={() => {
                                setNextBtnHit(prev => prev + 1);
                                console.log("Next Btn Hit:", nextBtnHit + 1);
                            }}
                        >
                            Next
                        </Button>
                    </div>

                </div>



                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        current: currentPage,
                        pageSize,
                        showSizeChanger: true,  // ✅ allows user to change page size
                        pageSizeOptions: ["50", "100", "200", "500", "1000"], // ✅ dropdown options
                        onChange: (page, size) => {
                            setCurrentPage(page);
                            setPageSize(size); // ✅ update dynamically
                        },
                    }}
                    scroll={{ y: 500 }}
                />

                <div className="h-[1px] w-full my-10 bg-gradient-to-r from-transparent via-gray-900 to-transparent"></div>

                {/* unique mails */}



                <div className="flex justify-between">


                    <div className="flex gap-6 mb-4 text-lg font-medium">
                        <span>Total Unique Emails: {uniqueContacts.length}</span>
                        <span>Total Pages: {summary.totalPages}</span>
                        <span>Current Page: {summary.currentPage}</span>
                    </div>

                    <Button type="primary" className="mb-4" onClick={exportToExcel}>
                        Download Excel
                    </Button>
                </div>

                <Table
                    columns={uniqueColumns}
                    dataSource={uniqueContacts}
                    pagination={{
                        current: uniqueCurrentPage,
                        pageSize: uniquePageSize,
                        showSizeChanger: true,
                        pageSizeOptions: ["50", "100", "200", "500", "1000"],
                        onChange: (page, size) => {
                            setUniqueCurrentPage(page);
                            setUniquePageSize(size);
                        },
                    }}
                    scroll={{ y: 500 }}
                />

            </div >

        </>
    );
}
