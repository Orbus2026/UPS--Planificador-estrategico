import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot } from 'lucide-react';
import MetallicButton from '../base/MetallicButton';
import MetallicPanel from '../base/MetallicPanel';

const Copilot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hola, soy tu Copiloto Estratégico. ¿En qué sección del Plan UPS 2026 necesitas apoyo hoy?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');

        // Mock Response
        setTimeout(() => {
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: `He analizado tu consulta sobre "${input}". Según los datos actuales, recomiendo priorizar la validación de evidencias en el segmento de Acreditación para evitar cuellos de botella el próximo mes.` 
            }]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Toggle */}
            {!isOpen && (
                <Motion.button
                    layoutId="copilot-panel"
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-8 right-8 p-6 bg-blue-600 rounded-[2rem] shadow-2xl shadow-blue-600/40 text-white z-50 flex items-center gap-3 active:scale-95 transition-all"
                    whileHover={{ scale: 1.05 }}
                >
                    <Sparkles size={24} className="animate-pulse" />
                    <span className="font-black text-xs uppercase tracking-widest">AI Copilot</span>
                </Motion.button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <Motion.div
                        layoutId="copilot-panel"
                        initial={{ opacity: 0, scale: 0.9, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 100 }}
                        className="fixed bottom-8 right-8 w-96 h-[500px] z-50 flex flex-col"
                    >
                        <MetallicPanel className="h-full !p-0 flex flex-col overflow-hidden" delay={0}>
                            {/* Header */}
                            <div className="p-6 bg-blue-600 text-white flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Bot size={20} />
                                    <div>
                                        <h4 className="font-black text-xs uppercase tracking-widest">Strategic AI</h4>
                                        <p className="text-[9px] text-blue-100 font-bold uppercase">UPS Planner Assistant</p>
                                    </div>
                                </div>
                                <X className="cursor-pointer" size={20} onClick={() => setIsOpen(false)} />
                            </div>

                            {/* Chat Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {messages.map((m, i) => (
                                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                                            m.role === 'user' 
                                            ? 'bg-blue-600 text-white rounded-tr-none' 
                                            : 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-white/10'
                                        }`}>
                                            {m.content}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Pregunta sobre la estrategia..."
                                        className="flex-1 bg-white dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    />
                                    <button 
                                        onClick={handleSend}
                                        className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </MetallicPanel>
                    </Motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Copilot;
