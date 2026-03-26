import React, { useEffect, useRef, useState } from 'react'
import EmialCredentials from '../component/EmailExtractor/EmialCredentials'
import EmailExtractor from '../component/EmailExtractor/EmailExtractor'

export default function EmailExtractorPage() {


  const [emails, setEmails] = useState([]);
  const [nextBtnHit, setNextBtnHit] = useState(0)
  const [prevBtnHit, setPrevBtnHit] = useState(0)
  const [CredentialPanel, setCredentialPanel] = useState(true)



  const extractorRef = useRef(null);


  const scrollToExtractor = () => {
    extractorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  const [summary, setSummary] = useState({
    totalEmails: 0,
    totalPages: 0,
    currentPage: 0,
  });


  const [timer, setTimer] = useState(0);       // seconds elapsed
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Start / stop timer
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  // Called by CredentialPanel when fetch starts
  const startTimer = () => {
    setTimer(0);
    setIsTimerRunning(true);
  };

  // Called when fetch ends
  const stopTimer = () => {
    setIsTimerRunning(false);
  };
  return (
    <>
      {/* {CredentialPanel ? */}


      <EmialCredentials emails={emails} setEmails={setEmails} setSummary={setSummary} nextBtnHit={nextBtnHit} setNextBtnHit={setNextBtnHit} setPrevBtnHit={setPrevBtnHit} prevBtnHit={prevBtnHit} setCredentialPanel={setCredentialPanel} scrollToExtractor={scrollToExtractor} startTimer={startTimer} stopTimer={stopTimer} />
      {/* : */}

      <div ref={extractorRef}>

        <EmailExtractor emails={emails} summary={summary} nextBtnHit={nextBtnHit} setNextBtnHit={setNextBtnHit} setPrevBtnHit={setPrevBtnHit} prevBtnHit={prevBtnHit} setCredentialPanel={setCredentialPanel} CredentialPanel={CredentialPanel} timer={timer}
        />
      </div>
      {/* } */}
    </>
  )
}
