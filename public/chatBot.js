(function () {
    const scriptTag = document.currentScript;
    const ownerId = scriptTag?.getAttribute("data-owner-id");

    if (!ownerId) {
        console.error("Chatbot: Owner ID not found.");
        return;
    }

    const api_url = `https://support-ai-pi-two.vercel.app/api/chat/${ownerId}`;

    const style = document.createElement("style");
    style.innerHTML = `
        .ai-chat-widget * {
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        
        .ai-chat-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background: #000;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            z-index: 999999;
        }
        .ai-chat-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
        }

        .ai-chat-window {
            position: fixed;
            bottom: 90px;
            right: 24px;
            width: 350px;
            height: 500px;
            max-height: calc(100vh - 120px);
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 12px 40px rgba(0,0,0,0.12), 0 0 2px rgba(0,0,0,0.08);
            display: none;
            flex-direction: column;
            overflow: hidden;
            z-index: 999999;
            transform-origin: bottom right;
            animation: chat-pop-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .ai-chat-window.open {
            display: flex;
        }
        @keyframes chat-pop-up {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .ai-chat-header {
            background: #000;
            color: #fff;
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            font-size: 15px;
        }
        .ai-chat-close {
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
            display: flex;
            align-items: center;
        }
        .ai-chat-close:hover { opacity: 1; }

        .ai-chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #FAFAFA;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .ai-chat-messages::-webkit-scrollbar { width: 6px; }
        .ai-chat-messages::-webkit-scrollbar-track { background: transparent; }
        .ai-chat-messages::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }

        .ai-chat-bubble {
            max-width: 85%;
            padding: 12px 16px;
            font-size: 14px;
            line-height: 1.5;
            animation: bubble-pop 0.2s ease forwards;
        }
        @keyframes bubble-pop {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .ai-chat-bubble.user {
            align-self: flex-end;
            background: #000;
            color: #fff;
            border-radius: 16px 16px 4px 16px;
        }
        .ai-chat-bubble.ai {
            align-self: flex-start;
            background: #E4E4E7;
            color: #18181B;
            border-radius: 16px 16px 16px 4px;
        }

        .ai-chat-input-area {
            display: flex;
            padding: 16px;
            background: #fff;
            border-top: 1px solid #E4E4E7;
            gap: 12px;
            align-items: center;
        }
        .ai-chat-input {
            flex: 1;
            padding: 12px 16px;
            background: #F4F4F5;
            border: 1px solid transparent;
            border-radius: 24px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s, background 0.2s;
        }
        .ai-chat-input:focus {
            background: #fff;
            border-color: #000;
        }
        .ai-chat-send {
            width: 40px;
            height: 40px;
            border: none;
            background: #000;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s, opacity 0.2s;
        }
        .ai-chat-send:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .ai-chat-send:not(:disabled):hover {
            transform: scale(1.05);
        }

        .ai-typing {
            display: flex;
            gap: 4px;
            padding: 12px 16px;
            background: #E4E4E7;
            border-radius: 16px 16px 16px 4px;
            align-self: flex-start;
            width: fit-content;
        }
        .ai-dot {
            width: 6px;
            height: 6px;
            background: #71717A;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out both;
        }
        .ai-dot:nth-child(1) { animation-delay: -0.32s; }
        .ai-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    const wrapper = document.createElement("div");
    wrapper.className = "ai-chat-widget";

    const button = document.createElement("div");
    button.className = "ai-chat-btn";
    button.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
    wrapper.appendChild(button);

    const box = document.createElement("div");
    box.className = "ai-chat-window";
    box.innerHTML = `
        <div class="ai-chat-header">
            <span>Customer Support</span>
            <div class="ai-chat-close" id="ai-chat-close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
        </div>
        <div class="ai-chat-messages" id="ai-chat-messages">
            <div class="ai-chat-bubble ai">Hi there! 👋 How can I help you today?</div>
        </div>
        <div class="ai-chat-input-area">
            <input type="text" class="ai-chat-input" id="ai-chat-input" placeholder="Type your message..." autocomplete="off" />
            <button class="ai-chat-send" id="ai-chat-send">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
        </div>
    `;
    wrapper.appendChild(box);
    document.body.appendChild(wrapper);

    const input = document.querySelector("#ai-chat-input");
    const sendBtn = document.querySelector("#ai-chat-send");
    const chat = document.querySelector("#ai-chat-messages");

    button.onclick = () => box.classList.toggle("open");
    document.querySelector("#ai-chat-close").onclick = () => box.classList.remove("open");

    function addMessage(text, from) {
        const bubble = document.createElement("div");
        bubble.className = `ai-chat-bubble ${from}`;
        bubble.textContent = text;
        chat.appendChild(bubble);
        chat.scrollTop = chat.scrollHeight;
    }

    async function handleSend() {
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, "user");
        input.value = "";
        input.focus();

        const typing = document.createElement("div");
        typing.className = "ai-typing";
        typing.innerHTML = `<div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div>`;
        chat.appendChild(typing);
        chat.scrollTop = chat.scrollHeight;

        try {
            const res = await fetch(api_url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text })
            });

            const data = await res.json();
            chat.removeChild(typing);
            addMessage(data || "Sorry, I didn't understand that.", "ai");
        } catch (error) {
            chat.removeChild(typing);
            addMessage("Something went wrong. Please try again.", "ai");
        }
    }

    sendBtn.onclick = handleSend;
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSend();
    });

})();