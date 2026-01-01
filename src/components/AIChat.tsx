import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, Loader2, MinusCircle } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { triggerHaptic } from '../utils/haptics'

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '')

const SYSTEM_PROMPT = `
You are IVY, the AI Design Assistant for IVR Interiors. Your goal is to help potential clients explore our services and feel inspired to start their design journey with us.

Brand Identity:
- Name: IVR Interiors
- Focus: Industrial aesthetics merged with organic luxury. "Legacy Crafting."
- Founder: I. Venkataraju (over 15 years experience in Hyderabad).
- Tagline: "Crafting Legacy."

Services to Highlight:
1. Modular Kitchens: Premium materials, smart storage, ergonomic designs.
2. Wardrobes: Bespoke, walk-in closets, maximum functionality.
3. TV Units: Contemporary, integrated storage, sleek cable management.
4. False Ceilings: Elegant designs, cove lighting, modern patterns.
5. Full Renovation: Flooring, painting, electrical, end-to-end.
6. Custom Carpentry: Unique furniture and woodwork.

Tone & Style:
- Professional, sophisticated, yet warm and welcoming.
- Use interior design terminology where appropriate but keep it accessible.
- Be helpful and proactive. If they ask about pricing, explain that it depends on materials and dimensions, but offer a consultation.
- Mention our experience (15+ years) and client base (500+ projects).

Constraints:
- Keep responses concise (2-4 sentences usually).
- Always encourage visiting our gallery or contacting us for a detailed site visit.
- If you don't know something specific (like exact current pricing for a specific wood), suggest a consultation.
`

interface Message {
    role: 'user' | 'bot'
    text: string
}

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', text: "Hello! I'm Ivy, your AI assistant from IVR Interiors. How can I help you transform your space today?" }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMessage = input.trim()
        setInput('')
        setMessages(prev => [...prev, { role: 'user', text: userMessage }])
        setIsLoading(true)
        triggerHaptic('light')

        try {
            // Create model with system instruction
            const model = genAI.getGenerativeModel({
                model: "gemini-flash-latest",
                systemInstruction: "You are Ivy, an intelligent and helpful AI assistant for the Cave Interiors website. You are professional, friendly, and knowledgeable about interior design, furniture, and home decor. Your goal is to assist users with their inquiries, provide design advice, and help them navigate the website. Keep your responses concise and helpful."
            })

            // Build conversation history for context
            const conversationHistory = messages.slice(1).map(msg =>
                `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
            ).join('\n')

            // Combine system prompt + history + new message
            const fullPrompt = `${SYSTEM_PROMPT}\n\nConversation so far:\n${conversationHistory}\n\nUser: ${userMessage}\n\nAssistant:`

            const result = await model.generateContent(fullPrompt)
            const response = await result.response
            const text = response.text()

            setMessages(prev => [...prev, { role: 'bot', text }])
        } catch (error) {
            console.error('Gemini Error:', error)
            setMessages(prev => [...prev, { role: 'bot', text: "I'm having a bit of trouble connecting right now. Please try again or reach out via our contact form!" }])
        } finally {
            setIsLoading(false)
        }
    }

    const quickActions = [
        "What services do you offer?",
        "Tell me about wardrobes",
        "Where are you located?",
        "How do I get a quote?"
    ]

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-sans">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 45 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setIsOpen(true)
                            triggerHaptic('medium')
                        }}
                        className="w-12 h-12 bg-brand-green text-charcoal rounded-full flex items-center justify-center shadow-2xl overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                        <MessageSquare className="w-6 h-6 relative z-10" />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute -top-1 -right-1 w-3 h-3 bg-brand-red rounded-full border-2 border-charcoal"
                        />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && !isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.5, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.5 }}
                        className="bg-charcoal border border-white/10 w-[350px] md:w-[400px] h-[550px] shadow-2xl flex flex-col overflow-hidden"
                        style={{ borderRadius: '0' }}
                    >
                        {/* Header */}
                        <div className="bg-grey-surface p-4 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-green/10 border border-brand-green/30 flex items-center justify-center">
                                    <Bot className="text-brand-green w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white text-sm font-bold tracking-wider">IVY ASSISTANT</h4>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
                                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Online Now</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsMinimized(true)}
                                    className="text-white/40 hover:text-white transition-colors"
                                >
                                    <MinusCircle size={20} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/40 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-3 text-sm ${msg.role === 'user'
                                        ? 'bg-brand-green text-charcoal font-medium'
                                        : 'bg-grey-surface text-white/80 border border-white/5'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-grey-surface p-3 border border-white/5">
                                        <Loader2 className="w-5 h-5 text-brand-green animate-spin" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions */}
                        {messages.length === 1 && (
                            <div className="p-4 pt-0 flex flex-wrap gap-2">
                                {quickActions.map((action, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setInput(action)
                                        }}
                                        className="text-[11px] bg-white/5 border border-white/10 px-3 py-1.5 hover:bg-brand-green hover:text-charcoal transition-all text-white/60 uppercase tracking-wider font-bold"
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-4 bg-grey-surface border-t border-white/10">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask Ivy anything..."
                                    className="w-full bg-charcoal border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-green/50 placeholder:text-white/20"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-2 text-brand-green hover:text-white transition-colors disabled:opacity-50"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Minimized State Bar */}
            <AnimatePresence>
                {isOpen && isMinimized && (
                    <motion.button
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        onClick={() => setIsMinimized(false)}
                        className="bg-brand-green text-charcoal px-6 py-3 font-bold text-xs uppercase tracking-widest flex items-center gap-3 shadow-2xl"
                    >
                        <MessageSquare size={16} />
                        Chat with Ivy
                        <X
                            size={14}
                            className="ml-2 hover:scale-125 transition-transform"
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsOpen(false)
                            }}
                        />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AIChat
