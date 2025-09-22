import React, { useState } from 'react'
import EmialCredentials from '../component/EmailExtractor/EmialCredentials'
import EmailExtractor from '../component/EmailExtractor/EmailExtractor'

export default function EmailExtractorPage() {


  const [emails, setEmails] = useState([]);
  const [nextBtnHit,setNextBtnHit] = useState(0)
  const [prevBtnHit,setPrevBtnHit] = useState(0)


  const [summary, setSummary] = useState({
    totalEmails: 0,
    totalPages: 0,
    currentPage: 0,
  });
  return (
    <>
      <EmialCredentials emails={emails} setEmails={setEmails} setSummary={setSummary} nextBtnHit={nextBtnHit} setNextBtnHit={setNextBtnHit} setPrevBtnHit={setPrevBtnHit} prevBtnHit={prevBtnHit}/>
      <EmailExtractor emails={emails } summary={summary} nextBtnHit={nextBtnHit} setNextBtnHit={setNextBtnHit} setPrevBtnHit={setPrevBtnHit} prevBtnHit={prevBtnHit}/>
    </>
  )
}
