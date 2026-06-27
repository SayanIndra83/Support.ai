'use client'

import { useEffect, useState } from "react"
import Navbar from "./NavbarDashboard"
import { motion } from "framer-motion"
import { Loader2, Save, Building2, Mail, Database } from "lucide-react"
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
        //    setBusinessName("")
        //    setSupportEmail("")
        //    setKnowledge("")
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
    }, [])

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-zinc-900">
            <Navbar />

            <div className="absolute top-0 left-0 w-full h-[300px] bg-linear-to-b from-zinc-100 to-transparent pointer-events-none z-0"></div>

            <div className="relative z-10 flex justify-center px-4 py-24 sm:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-3xl bg-white rounded-2xl ring-1 ring-zinc-900/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
                >
                    <div className="px-8 pt-8 pb-6 border-b border-zinc-100 bg-white">
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-950">Chatbot Configuration</h1>
                        <p className="text-zinc-500 text-sm mt-1.5">
                            Manage your AI's identity, contact information, and core knowledge base.
                        </p>
                    </div>

                    <div className="p-8 space-y-10">
                        
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <Building2 size={18} className="text-zinc-400" />
                                <h2 className="text-base font-semibold text-zinc-900 tracking-tight">Business Profile</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-zinc-50/50 p-5 rounded-xl ring-1 ring-zinc-900/5">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-medium text-zinc-700">Business Name</label>
                                    <input 
                                        type="text" 
                                        onChange={(e) => setBusinessName(e.target.value)}
                                        value={businessName}
                                        placeholder="e.g. Acme Corp"
                                        className="w-full rounded-lg bg-white ring-1 ring-zinc-200 px-4 py-2.5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900"
                                    />
                                </div>
                                <div className="space-y-2">
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
                                            className="w-full rounded-lg bg-white ring-1 ring-zinc-200 pl-10 pr-4 py-2.5 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Database size={18} className="text-zinc-400" />
                                    <h2 className="text-base font-semibold text-zinc-900 tracking-tight">Knowledge Base</h2>
                                </div>
                                <span className="text-[11px] font-medium px-2 py-1 bg-zinc-100 text-zinc-500 rounded-md">
                                    Supports plain text
                                </span>
                            </div>

                            <div className="space-y-2">
                                <p className="text-[13px] text-zinc-500 mb-3">
                                    Inject your specific business rules, refund policies, delivery timelines, and FAQs here. The AI will use this as its ground truth.
                                </p>
                                <textarea
                                    className="h-56 w-full rounded-xl bg-white ring-1 ring-zinc-200 px-4 py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900 resize-y"
                                    onChange={(e) => setKnowledge(e.target.value)}
                                    value={knowledge}
                                    placeholder={`Example:\n• Refund policy: 7 days return available\n• Delivery time: within 3-5 working days\n• Cash on Delivery is supported\n• Support hours: Mon-Fri, 9AM-5PM`}
                                />
                            </div>
                        </section>
                    </div>

                    <div className="px-8 py-5 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
                        <p className="text-[13px] text-zinc-500">
                            Changes apply immediately to your live widget.
                        </p>
                        
                        <button
                            onClick={handleSubmit}
                            disabled={loading || businessName === ""}
                            className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-950 px-6 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:active:scale-100 cursor-pointer"
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