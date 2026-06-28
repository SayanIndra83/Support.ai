'use client'

import { useEffect, useState } from "react"
import Navbar from "./NavbarDashboard"
import { motion } from "framer-motion"
import { Loader2, Save, Building2, Mail, Database, Settings2, Hash } from "lucide-react"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { ApiResponse } from "@/app/types/ApiResponse"

function DashboardClient({ownerId} : {ownerId : string}) {
    const [businessName, setBusinessName] = useState("")
    const [supportEmail, setSupportEmail] = useState("")
    const [knowledge, setKnowledge] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        try {
           const response = await axios.post(`/api/update-settings`, {
            ownerId, businessName, supportEmail, knowledge
           }) 
           toast.success(response.data.message || "Changes saved successfully")
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            toast.error(axiosError?.response?.data.message ?? "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`/api/get-settings/${ownerId}`);
                if (response.data.settings) {
                    setBusinessName(response.data.settings.businessName || "")
                    setSupportEmail(response.data.settings.supportEmail || "")
                    setKnowledge(response.data.settings.knowledge || "")
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchSettings()
    }, [ownerId])

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 overflow-x-hidden">
            <Navbar />

             <div
        className="absolute z-0 inset-0 pointer-events-none opacity-[0.35] mask-[radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
        style={{
          backgroundImage: `radial-gradient(#f472b6 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      ></div>
            <div className="absolute top-0 left-0 w-full h-[400px] bg-linear-to-b from-zinc-100/50 to-transparent pointer-events-none z-0"></div>

            <div className="relative z-10 flex justify-center px-4 py-24 sm:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-4xl bg-white rounded-[2rem] ring-1 ring-zinc-900/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden"
                >
                    <div className="px-8 sm:px-10 pt-10 pb-8 border-b border-zinc-100 bg-white flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 flex items-center gap-3">
                                <div className="p-2 bg-zinc-100 rounded-xl">
                                    <Settings2 size={22} className="text-zinc-600" />
                                </div>
                                Configuration
                            </h1>
                            <p className="text-zinc-500 text-[15px] mt-3 max-w-lg leading-relaxed">
                                Manage your AI's identity, contact information, and core knowledge base.
                            </p>
                        </div>
                        
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 ring-1 ring-zinc-200/60 text-[13px] font-mono text-zinc-500 shadow-sm">
                           <Hash size={14} className="text-pink-400"/>
                           <span className="truncate max-w-[120px] text-emerald-300">{ownerId.slice(-10)}</span>
                        </div>
                    </div>

                    <div className="p-8 sm:p-10 space-y-12">
                        
                        <section>
                            <div className="flex items-center gap-2 mb-5">
                                <Building2 size={18} className="text-zinc-400" />
                                <h2 className="text-base font-semibold text-zinc-900 tracking-tight">Business Profile</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50/50 p-6 rounded-2xl ring-1 ring-zinc-900/5">
                                <div className="space-y-2.5">
                                    <label className="text-[13px] font-medium text-zinc-700">Business Name</label>
                                    <input 
                                        type="text" 
                                        onChange={(e) => setBusinessName(e.target.value)}
                                        value={businessName}
                                        placeholder="e.g. Acme Corp"
                                        className="w-full rounded-xl bg-white ring-1 ring-zinc-200 px-4 py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900 shadow-sm"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="text-[13px] font-medium text-zinc-700 flex items-center gap-1.5">
                                        Support Email
                                    </label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                                        <input 
                                            type="email"
                                            onChange={(e) => setSupportEmail(e.target.value)}
                                            value={supportEmail}
                                            placeholder="support@example.com"
                                            className="w-full rounded-xl bg-white ring-1 ring-zinc-200 pl-10 pr-4 py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900 shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2">
                                    <Database size={18} className="text-zinc-400" />
                                    <h2 className="text-base font-semibold text-zinc-900 tracking-tight">Knowledge Base</h2>
                                </div>
                                <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 bg-zinc-100 text-zinc-500 rounded-md">
                                    Plain Text
                                </span>
                            </div>

                            <div className="space-y-3">
                                <p className="text-[13px] text-zinc-500 mb-4 leading-relaxed max-w-3xl">
                                    Inject your specific business rules, refund policies, delivery timelines, and FAQs here. The AI will use this as its absolute ground truth when answering customers.
                                </p>
                                <textarea
                                    className="h-64 w-full rounded-2xl bg-white ring-1 ring-zinc-200 px-5 py-4 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900 resize-y shadow-sm leading-relaxed"
                                    onChange={(e) => setKnowledge(e.target.value)}
                                    value={knowledge}
                                    placeholder={`Example:\n• Refund policy: 7 days return available\n• Delivery time: within 3-5 working days\n• Cash on Delivery is supported\n• Support hours: Mon-Fri, 9AM-5PM`}
                                />
                            </div>
                        </section>
                    </div>

                    <div className="px-8 sm:px-10 py-6 bg-zinc-50/80 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5 text-[13px] text-zinc-500">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Changes apply immediately to your live widget
                        </div>
                        
                        <button
                            onClick={handleSubmit}
                            disabled={loading || businessName === ""}
                            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-8 py-3 text-[13px] font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:active:scale-100 cursor-pointer shadow-sm hover:shadow-md"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin text-zinc-400" />
                                    <span>Saving changes...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={16} className="text-zinc-400 group-hover:text-zinc-300 transition-colors" />
                                    <span>Save Configuration</span>
                                </>
                            )}
                        </button>
                    </div>

                </motion.div>
            </div>
        </div>
    )
}

export default DashboardClient