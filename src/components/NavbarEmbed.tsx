'use client'
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter()

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    if (latestValue > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 mx-auto z-50 flex items-center px-6 backdrop-blur-md"
      
      animate={isScrolled ? "scrolled" : "top"}
      initial={false}
      variants={{
        top: {
          width: "95vw",
          y: 12,
          height: "70px", 
          borderRadius: "25px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          boxShadow: "0px 0px 0px rgba(0,0,0,0)",
          border: "1px solid rgba(229, 231, 235, 0.7)",
        },
        scrolled: {
          width: "87vw",
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
          <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200 shadow-md cursor-pointer"
          onClick={() => router.push("/dashboard")}
          >

            Back to Dashboard →
          </button>
        </div>

      </div>
    
    </motion.nav>
  );
}