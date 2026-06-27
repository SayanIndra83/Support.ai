'use client'
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Loader2, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Navbar({email} : {email : string}) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    if (latestValue > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });


  const handleLogin = () => {
    setLoading(true)
    window.location.href = `/api/auth/login`
  }

  let firstLetter
  if(email) firstLetter = email[0].toUpperCase();

  const profileDropDown = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handlePopUpOpen = (e:MouseEvent) =>{
        if(profileDropDown.current && !profileDropDown.current.contains(e.target as Node)){
            setOpen(false)
        }
    }

    document.addEventListener("mousedown", handlePopUpOpen)
    return ()=> document.removeEventListener("mousedown", handlePopUpOpen)
  }, [])

  const handleLogout = async () => {
    setLoading(true)
    try {
        const response = await axios.get(`/api/auth/logout`);
        router.push('/')
    } catch (error) {
        console.log("logout failed")
    }finally{setLoading(false)}
  }
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 mx-auto z-50 flex items-center px-6 backdrop-blur-md"
      initial={false}
      animate={isScrolled ? "scrolled" : "top"}
      
      variants={{
        top: {
          width: "92vw",
          y: 12,
          height: "70px", 
          borderRadius: "25px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          boxShadow: "0px 0px 0px rgba(0,0,0,0)",
          border: "1px solid rgba(229, 231, 235, 0.7)",
        },
        scrolled: {
          width: "85vw",
          y: 20,
          height: "64px",
          borderRadius: "50px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
          border: "1px solid rgba(229, 231, 235, 1)",
        },
      }}
      
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20, 
        mass: 0.8 
      }}
    >
      <div className="flex w-full justify-between items-center">
        
        <div className="flex items-baseline cursor-pointer"
        onClick={(e) =>router.push('/')}
        >
      <h2 className="font-bold text-xl md:text-2xl text-gray-900 tracking-normal">Support</h2>
      <span className="font-semibold text-base md:text-xl text-gray-500 ml-1">.ai</span>
</div>

        <div className="flex items-center gap-6">
          {email ? (
            <div className='relative' ref={profileDropDown}>
            <button className='h-9 w-9 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-103 transition cursor-pointer'
            onClick={() => setOpen(prev => !prev)}
            >
                {firstLetter}
            </button>

             <AnimatePresence>{open 
    && (
        <motion.div 
        initial={{
            opacity:0, y:-5, scale:0.98
        }}
        animate={{
            opacity:1, y:0, scale:1
        }}
        exit={{
            opacity:0, y:-5, scale:0.98
        }}
        transition={{
            duration:0.2
        }}
        className='p-2 absolute mt-3 right-0 flex flex-col z-[9999] w-44 bg-white border-zinc-200 border overflow-hidden items-center text-start text-black rounded-2xl'>

            <button 
            onClick={(e) =>router.push('/dashboard')}
            className='flex items-center justify-start gap-3 w-full rounded-2xl hover:bg-zinc-100 text-left text-sm py-3 pl-3 pr-4 cursor-pointer hover:translate-x-1 transition-all duration-300 font-semibold'><LayoutDashboard size={18} className='text-gray-900'/> DashBoard</button>
            <button className='flex items-center  gap-3 w-full justify-start rounded-2xl hover:bg-red-200 text-red-600 text-left text-sm py-3 pl-3 pr-4  cursor-pointer hover:translate-x-1 transition-all duration-300 font-semibold'
            onClick={handleLogout}
            disabled={loading}
            >
              {loading 
              
              ? (
                <>
                <Loader2 size={18} className='text-gray-500 font-bold animate-spin'/>Logging out...
                </>
              ) 
              
              : (
                <>
                <LogOut size={18} className='text-red-500'/>Logout
                </>
              )}
            </button>
        </motion.div>
        )}
        </AnimatePresence>
            </div>
          ) : (
          <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200 shadow-md cursor-pointer disabled:bg-gray-700"
          onClick={handleLogin}
          disabled={loading}
          >
            {loading ? (<Loader2 size={18} className='text-gray-300 animate-spin'/>) : ("Login →")}
          </button>)}
        </div>

      </div>
    
    </motion.nav>
  );
}