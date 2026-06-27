# Support.ai 💬

A modern, plug-and-play AI customer support agent for your website. Support.ai allows businesses to instantly deploy an intelligent chatbot trained on their own specific business data, FAQs, and policies.

---

## 🚀 Features

- **Zero-Config Integration:** Embed the chatbot into any website with a single `<script>` tag in under 60 seconds.
- **Dynamic Knowledge Base:** Control exactly what the AI knows through a beautiful admin dashboard.
- **Custom Business Profiles:** Configure your business name, support email, and identity.
- **Role-Based Access Control:** Secure routing and dashboard access for Admins, Users, and specific roles using ScaleKit.
- **Smart AI Responses:** Powered by the Google Gemini API to provide accurate, context-aware answers without hallucinating outside your boundaries.
- **Modern Aesthetic:** A premium, fully responsive UI built with Tailwind CSS and buttery-smooth Framer Motion animations.

---

## 🛠️ Tech Stack

**Frontend**
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Lucide React](https://lucide.dev/) — Icons

**Backend & Database**
- Next.js API Routes & Middleware
- [MongoDB](https://www.mongodb.com/) — Database
- [ScaleKit](https://scalekit.com/) — Authentication & Role-Based Authorization
- [Google Gemini API](https://deepmind.google/technologies/gemini/) — LLM / AI Engine

---

## 📦 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed, along with accounts for:
- [MongoDB](https://www.mongodb.com/)
- [ScaleKit](https://scalekit.com/)
- [Google AI Studio](https://aistudio.google.com/) (for the Gemini API key)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/support-ai.git
   cd support-ai
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following:

   ```env
   # Application
   NEXT_PUBLIC_BASE_URI=http://localhost:3000

   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication (ScaleKit)
   SCALEKIT_CLIENT_ID=your_scalekit_client_id
   SCALEKIT_CLIENT_SECRET=your_scalekit_client_secret
   SCALEKIT_ENVIRONMENT_URL=your_scalekit_env_url

   # AI
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 💻 Usage

1. **Sign In** — Log in to the application (authorization handled by ScaleKit).
2. **Configure Knowledge** — Navigate to the Dashboard and input your business name, support email, and custom knowledge base (refund policies, FAQs, etc.).
3. **Embed** — Go to the Integration page, copy your unique `<script>` tag, and paste it just before the closing `</body>` tag of your target website.
4. **Go Live** — The AI chatbot will immediately appear on your site and start answering customer queries based on your configuration.

---

## 🛡️ Middleware & Security

This project uses edge-compatible Next.js Middleware to handle secure, role-based routing. It ensures that authenticated users are directed to their specific dashboards and blocks unauthorized access to private API routes.

---

## 👨‍💻 Author

**Sayan Indra**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
