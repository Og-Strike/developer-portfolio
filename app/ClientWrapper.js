'use client';

import { useMusicPermission } from "./context/MusicPermissionContext";
import React, { useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import SplashScreen from "./components/homepage/SplashScreen";


export default function ClientLayout({ children }) {
  const [showContent, setShowContent] = useState(false);
    const { allowMusic, setAllowMusic } = useMusicPermission();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (allowMusic === null) {
      setShowPopup(true);
    }
  }, [allowMusic]);

  const handleAllow = () => {
    setAllowMusic(true);
    setShowPopup(false);
  };

  const handleDeny = () => {
    setAllowMusic(false);
    setShowPopup(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!showContent && <SplashScreen onFinish={() => setShowContent(true)} />}

      {showContent && (
        <>
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <div className="bg-[#0d1224] border border-[#1b2c68a0] rounded-lg p-6 max-w-md w-full z-50">
                <h3 className="text-xl font-bold text-[#16f2b3] mb-4">Music Playback</h3>
                <p className="text-gray-300 mb-6">
                  Would you like to enable background music for this website? 
                  It will automatically play when you navigate between pages.
                </p>
                <div className="flex justify-end space-x-4">
                  <button 
                    onClick={handleDeny}
                    className="px-4 py-2 rounded-lg border border-gray-600 text-white hover:bg-red-500 transition-colors"
                  >
                    No Thanks
                  </button>
                  <button 
                    onClick={handleAllow}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white hover:from-pink-600 hover:to-violet-700 transition-colors"
                  >
                    Allow Music
                  </button>
                </div>
              </div>
            </div>
          )}
        <div className="fade-in">

          <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
            <Navbar />
            {children}
            <ScrollToTop />
            <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>
          </main>
          <Footer />
        </div>
        </>
      )}

      <style jsx>{`
        .fade-in {
          animation: dissolveIn 1s ease-in forwards;
        }

        @keyframes dissolveIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

    </>
  );
}
