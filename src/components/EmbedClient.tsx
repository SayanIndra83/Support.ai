"use client";

import { useState } from "react";
import Navbar from "./NavbarEmbed";
import { motion } from "motion/react";
import { Check, Copy, MessageSquare, Send, X } from "lucide-react";

function EmbedClient({ ownerId }: { ownerId: string }) {
  const embedCode = `<script \n  src="${process.env.NEXT_PUBLIC_BASE_URI}/chatBot.js" \n  data-owner-id="${ownerId}">\n</script>`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 overflow-x-hidden selection:bg-pink-100 selection:text-pink-900">
      <Navbar />

      <div
        className="absolute z-0 inset-0 pointer-events-none opacity-[0.35] mask-[radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
        style={{
          backgroundImage: `radial-gradient(#f472b6 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 sm:py-32">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col pt-4"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 mb-3">
              Add Support.ai to your site
            </h1>
            <p className="text-[15px] text-zinc-500 mb-10 leading-relaxed max-w-md">
              Deploy your AI agent in seconds. Copy the snippet below and paste it just before the closing <code className="bg-zinc-100 text-pink-600 px-1.5 py-0.5 rounded-md text-sm font-mono">&lt;/body&gt;</code> tag of your website.
            </p>

            <div className="relative bg-[#09090B] text-zinc-300 rounded-2xl p-5 shadow-xl ring-1 ring-zinc-900/5 mb-10 group">
              <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                </div>
                <button
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium cursor-pointer text-zinc-400 hover:text-white transition-colors"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <><Check size={14} className="text-emerald-400" /> Copied!</>
                  ) : (
                    <><Copy size={14} /> Copy snippet</>
                  )}
                </button>
              </div>
              
              <pre className="text-[13px] font-mono leading-relaxed overflow-x-auto text-zinc-300">
                <span className="text-pink-400">&lt;script</span><br />
                <span className="text-blue-300">  src=</span><span className="text-emerald-300">"{process.env.NEXT_PUBLIC_BASE_URI}/chatBot.js"</span><br />
                <span className="text-blue-300">  data-owner-id=</span><span className="text-emerald-300">"{ownerId}"</span><span className="text-pink-400">&gt;</span><br />
                <span className="text-pink-400">&lt;/script&gt;</span>
              </pre>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold ring-4 ring-white">1</div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Copy the script</h3>
                  <p className="text-[13px] text-zinc-500 mt-1">Use the copy button above to save the snippet.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold ring-4 ring-white">2</div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Inject into HTML</h3>
                  <p className="text-[13px] text-zinc-500 mt-1">Paste it at the bottom of your HTML document, inside the body.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold ring-4 ring-white">3</div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Ready to go</h3>
                  <p className="text-[13px] text-zinc-500 mt-1">Refresh your website and your chatbot will be live.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="relative w-full h-[600px] bg-white rounded-3xl ring-1 ring-zinc-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col"
          >
            <div className="h-12 bg-zinc-50 border-b border-zinc-100 flex items-center justify-center relative">
              <div className="absolute left-4 flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              </div>
              <div className="bg-white ring-1 ring-zinc-200/60 rounded-md px-16 md:px-24 py-1 text-[11px] font-medium text-zinc-400">
                your-website.com
              </div>
            </div>

            <div className="flex-1 bg-zinc-50/50 relative p-8">
              <div className="w-1/3 h-4 bg-zinc-200 rounded-full mb-4 opacity-50"></div>
              <div className="w-2/3 h-3 bg-zinc-200 rounded-full mb-2 opacity-30"></div>
              <div className="w-1/2 h-3 bg-zinc-200 rounded-full opacity-30"></div>

              <div className="absolute bottom-24 right-6 w-[320px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden ring-1 ring-zinc-100">
                
                <div className="bg-black text-white px-5 py-4 flex justify-between items-center">
                  <span className="text-[14px] font-semibold">Customer Support</span>
                  <X size={18} className="opacity-70 cursor-pointer hover:opacity-100 transition-opacity" />
                </div>

                <div className="bg-[#FAFAFA] h-[260px] p-4 flex flex-col gap-3">
                  <div className="bg-zinc-200 text-zinc-900 text-[13px] px-4 py-2.5 rounded-[16px_16px_16px_4px] mr-auto max-w-[85%] leading-relaxed">
                    Hi there! 👋 How can I help you today?
                  </div>
                  <div className="bg-black text-white text-[13px] px-4 py-2.5 rounded-[16px_16px_4px_16px] ml-auto max-w-[85%] leading-relaxed shadow-sm">
                    Do you offer cash on delivery?
                  </div>
                  
                  <div className="bg-zinc-200 px-4 py-3 rounded-[16px_16px_16px_4px] mr-auto w-fit flex gap-1 items-center mt-1">
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></motion.div>
                  </div>
                </div>

                <div className="bg-white border-t border-zinc-100 p-3 flex gap-3 items-center">
                  <div className="flex-1 bg-[#F4F4F5] rounded-full h-[40px] px-4 flex items-center text-[13px] text-zinc-400">
                    Type your message...
                  </div>
                  <div className="w-[40px] h-[40px] bg-black text-white rounded-full flex items-center justify-center shadow-sm cursor-pointer">
                    <Send size={16} className="ml-[-2px] mt-[2px]" />
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute bottom-6 right-6 w-[52px] h-[52px] bg-black text-white rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.15)] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              >
                <MessageSquare size={24} />
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default EmbedClient;