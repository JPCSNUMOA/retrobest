"use client";

import { useState } from "react";

import Image from 'next/image'
import gameboy from './assets/gameboy.png'
import gameboy_site from './assets/gameboy_website.png'
import lights from './assets/lights.png'
import mainlogo from './assets/logomain.png'




const Page = () => {

  const [voteId, setVoteId] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true); 

      try {
          const response = await fetch("/api/vote", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ voteId, candidateName }),
          });

          const data = await response.json();

          if (response.ok) {
              window.alert(data.message);
          } else {
              window.alert(data.message);
          }
      } catch (error) {
          window.alert("An error occurred. Please try again.");
          console.log(error)
      }
      finally {
            setLoading(false); // Stop loading
        }
  };


  return (
      <div className='overflow-auto lg:overflow-auto h-dvh lg:h-dvh w-dvw bg-black flex flex-col items-center xl:flex-row gap-5 pb-5 lg:gap-0'>
          <div className='xl:flex-1 flex flex-col justify-center lg:justify-around items items-center px-14 lg:pb-10 lg:h-5/6 h-auto'>
            <div className='hidden xl:block h-8 w-5/6 items-center'>
              <Image src={lights}/>
            </div>

            <div className='h-full lg:h-5/6'>
              <Image src={mainlogo}/>
            </div>

            <p className='font-medium text-start w-5/6 hidden xl:block text-white drop-shadow-[0_0_5px_rgba(255,255,255,1)]'>JPCS NU MOA</p>

          </div>
          <div className='xl:flex-1 flex flex-col items-center h-auto justify-center xl:justify-between px-10 xl:px-5 xl:pt-16 gap-5'>
              <p className='font-medium text-center w-[85%] lg:w-full text-white drop-shadow-[0_0_5px_rgba(255,255,255,1)] mx-2'>Vote now for the Best Dressed and help us crown the ultimate retro vintage style icon!</p>
              {loading && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-semibold text-gray-800">Processing your vote...</h2>
                        <div className="mt-4">
                            <div className="loader"></div> {/* Add your loading spinner here */}
                        </div>
                        <p className="mt-4 text-gray-600">Please wait while we process your vote.</p>
                    </div>
                </div>
            )}
              <form onSubmit={handleSubmit} className='relative h-[598px] w-[560px] hidden xl:flex flex-col items-center justify-start'>
                <Image className='absolute z-0' src={gameboy_site}/>
                <p className='absolute top-[25%] text-2xl font-bold text-center text-[#ffa5dc] drop-shadow-[0_0_10px_rgba(255,102,196,1)] w-3/6'>BEST DRESSED</p>
              
                    <input minLength="11" maxLength="11" value={voteId}  onChange={(e) => setVoteId(e.target.value)}
                            required placeholder='Enter Vote ID (2022-173628)' className='text-white absolute top-[35%] bg-[#242424] p-2 rounded-lg border-2 w-3/6  border-white z-10'/>
                    <input value={candidateName}  onChange={(e) => setCandidateName(e.target.value)}
                            required placeholder='Enter Candidate Name' className='text-white absolute top-[45%] bg-[#242424] p-2 rounded-lg border-2 w-3/6  border-white z-10'/>
                    <button type="submit" className='absolute top-[55%] text-white  bg-[#242424] px-1 rounded-lg border-2 w-[20%] border-white z-10'>Submit !</button>
              </form>
              <form onSubmit={handleSubmit} className='relative h-[545px]  w-[400px] flex xl:hidden flex-col items-center justify-start'>
                <Image className='object-cover absolute z-0' src={gameboy}/>
                <p className='absolute top-[15%] text-2xl font-bold text-center text-[#ffa5dc] drop-shadow-[0_0_10px_rgba(255,102,196,1)] w-3/6'>BEST DRESSED</p>

               
                  <input minLength="11" maxLength="11"  value={voteId} onChange={(e) => setVoteId(e.target.value)} required placeholder='Enter Vote ID' className='text-white absolute top-[22%] bg-[#242424] p-2 rounded-lg border-2 w-[60%]  border-white z-10'/>
                  <input value={candidateName}  onChange={(e) => setCandidateName(e.target.value)} required placeholder='Enter Candidate Name' className='text-white absolute top-[32%] bg-[#242424] p-2 rounded-lg border-2 w-[60%]  border-white z-10'/>
                  <button type="submit" className='absolute top-[42%] text-white  bg-[#242424] px-1 rounded-lg border-2 w-[20%]  border-white z-10'>Submit !</button>

              </form>
              <p className='font-medium text-center w-5/6 block xl:hidden text-white drop-shadow-[0_0_5px_rgba(255,255,255,1)]'>JPCS NU MOA Chapter</p>
          </div>
      </div>
  )
}

export default Page
