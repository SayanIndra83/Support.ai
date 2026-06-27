'use client'

import { useRouter } from "next/navigation"
import Navbar from "./Navbar"
import { motion } from "framer-motion"
import { Bot, Zap, Shield, Clock } from "lucide-react"

function HomeClient({email} : {email: string}) {
    const router = useRouter()
    const handleLogin = () => {
        window.location.href = `/api/auth/login`
    }

    const features = [
        {
            title: "Plug & Play",
            desc: "Add the chatbot to your site with a single script tag.",
            icon: <Zap size={22} className="text-pink-500" />
        },
        {
            title: "Admin Controlled",
            desc: "You control exactly what the AI knows and answers.",
            icon: <Shield size={22} className="text-blue-700" />
        },
        {
            title: "Always Online",
            desc: "Your customers get instant support 24x7.",
            icon: <Clock size={22} className="text-green-700" />
        }
    ]

    return (
        <div className="z-10 relative min-h-screen bg-linear-to-br from-white via-zinc-50 to-zinc-100 text-zinc-900 overflow-x-hidden selection:bg-pink-100 selection:text-pink-900">
            <Navbar email={email} />
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-pink-100/50 blur-[120px] rounded-full pointer-events-none z-0"></div>
            <div
                className="absolute z-0 inset-0 pointer-events-none opacity-40 mask-[radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
                style={{ 
                    backgroundImage: `radial-gradient(#f472b6 1px, transparent 1px)`, 
                    backgroundSize: '24px 24px' 
                }}
            ></div>

            <section className="relative z-10 pt-40 pb-28 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                    
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="max-w-xl"
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-zinc-950">
                            AI Customer Support <br /> 
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-slate-600">
    Built for Modern Websites
</span>
                        </h1> 

                        <p className="mt-6 text-lg text-zinc-500 leading-relaxed max-w-lg">
                            Add a powerful AI Chatbot to your website in minutes. Let your customers get instant answers using your own business knowledge.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4" >
                            <button 
                                className="bg-zinc-950 text-white rounded-full px-7 py-3.5 cursor-pointer transition-all duration-300 font-medium hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-900/20 active:scale-95 disabled:opacity-60"
                                onClick={() => {
                                    if(email) router.push('/dashboard')
                                    else handleLogin()
                                }}
                            >
                                {email ? "Go to Dashboard →" : "Get Started →"}
                            </button>
                            <a
                                href={'#features'}
                                className="bg-white text-zinc-700 border border-zinc-200 rounded-full px-7 py-3.5 cursor-pointer hover:bg-zinc-50 hover:border-zinc-300 active:scale-95 transition-all duration-300 font-medium shadow-sm"
                            >
                                Know More ↓
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, type: "spring", bounce: 0.3 }}
                        className="relative lg:ml-auto w-full max-w-md"
                    >
                        <div className="absolute inset-0 bg-linear-to-tr from-pink-200/40 to-violet-200/40 blur-2xl rounded-3xl transform rotate-3 z-0"></div>

                        <div className="relative z-10 rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white overflow-hidden">
                            
                            <div className="bg-zinc-50/80 border-b border-zinc-100 px-4 py-3 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                </div>
                                <div className="mx-auto text-[11px] font-semibold text-green-600 uppercase tracking-wider">Live Preview...</div>
                                <div className="w-10"></div>
                            </div>

                            <div className="p-6 space-y-5 bg-linear-to-b from-white/40 to-zinc-50/60 pb-12 relative">
                                <div className="space-y-4">
                                    <motion.div 
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 }}
                                        className="bg-zinc-900 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm ml-auto w-fit shadow-sm max-w-[85%]"
                                    >
                                        Do you offer cash on delivery?
                                    </motion.div>
                                    
                                    <motion.div 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.4 }}
                                        className="bg-white border border-zinc-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 text-sm mr-auto w-fit max-w-[85%] text-zinc-700"
                                    >
                                        Yes, Cash on Delivery is available! Let me know if you need help checking out.
                                    </motion.div>
                                </div>

                            </div>
                        </div>

                        <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="absolute -bottom-6 -right-6 w-14 h-14 text-white bg-zinc-950 rounded-full flex items-center justify-center shadow-xl shadow-zinc-900/20 ring-4 z-50 ring-white border border-zinc-800"
                                >
                                    <Bot size={22} className="text-pink-300" />
                                </motion.div>
                    </motion.div>
                </div>
            </section>

            <section id="features" className="relative z-10 bg-white pb-32 pt-24 px-6 border-t border-zinc-100">
                <div className="max-w-6xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-950">
                            Why Businesses Choose Support.ai
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((f, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.15 }}
                                viewport={{ once: true, margin: "-50px" }}
                                key={idx}
                                className="group bg-zinc-50/50 rounded-3xl p-8 border border-zinc-200/60 shadow-sm hover:shadow-xl hover:shadow-pink-500/5 hover:border-pink-200/60 hover:bg-white transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 bg-white border border-zinc-200 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-zinc-900">{f.title}</h3>
                                <p className="mt-3 text-zinc-500 text-[15px] leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="border-t border-zinc-100 bg-zinc-50 py-10 text-center text-sm text-zinc-500">
                &copy; {new Date().getFullYear()} Support.ai | All rights reserved.
            </footer>
        </div>
    )
}

export default HomeClient