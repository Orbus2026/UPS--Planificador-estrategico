import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, BrainCircuit, RefreshCw, FileText } from 'lucide-react';
import MetallicButton from '../base/MetallicButton';
import MetallicPanel from '../base/MetallicPanel';
import { useData } from '../../context/useData';
import { analyzeStrategy } from '../../lib/gemini';

const Copilot = () => {
    const { data, getSmartAlerts } = useData();
    const [isOpen, setIsOpen] = useState(false);
    
    const criticalAlerts = useMemo(() => {
        return getSmartAlerts().filter(a => a.type === 'warning');
    }, [getSmartAlerts]);

    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hola, soy tu Copiloto Estratégico. He cargado los datos del Plan UPS 2026. ¿En qué puedo apoyarte hoy?' }
    ]);

    // Proactive alert effect
    useEffect(() => {
        if (criticalAlerts.length > 0 && messages.length === 1) {
            const mostCritical = criticalAlerts[0];
            const timer = setTimeout(() => {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: `🚨 He detectado un riesgo en la iniciativa "${mostCritical.context.initiative.iniciativa}". El avance es muy bajo (${mostCritical.context.initiative.progress}%). ¿Te gustaría que analicemos una estrategia de recuperación?`
                }]);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [criticalAlerts, messages.length]);

    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;
        
        const userMessage = input.trim();
        const newMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setInput('');
        setIsTyping(true);

        // Prepare context for Gemini (summary of data)
        const contextSummary = {
            totalPsicologia: data.Psicologia.length,
            totalClinica: data.Clinica.length,
            avgProgressPsicologia: Math.round(data.Psicologia.reduce((acc, i) => acc + i.progress, 0) / (data.Psicologia.length || 1)),
            avgProgressClinica: Math.round(data.Clinica.reduce((acc, i) => acc + i.progress, 0) / (data.Clinica.length || 1)),
            strategicGoals: data.strategic?.goals || []
        };

        const aiResponse = await analyzeStrategy(userMessage, contextSummary);
        
        setIsTyping(false);
        setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: aiResponse 
        }]);
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
                    <div className="relative">
                        <Sparkles size={24} className="animate-pulse" />
                        {criticalAlerts.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-blue-600 animate-bounce" />
                        )}
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest">IA Copilot</span>
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
                                        <h4 className="font-black text-xs uppercase tracking-widest">IA Estratégica</h4>
                                        <p className="text-[9px] text-blue-100 font-bold uppercase">Asistente UPS Planner</p>
                                    </div>
                                </div>
                                <X className="cursor-pointer" size={20} onClick={() => setIsOpen(false)} />
                            </div>

                            {/* Chat Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
                                {messages.map((m, i) => (
                                    <Motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        key={i} 
                                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] font-medium leading-relaxed shadow-sm ${
                                            m.role === 'user' 
                                            ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-none' 
                                            : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-white/10'
                                        }`}>
                                            {m.content}
                                        </div>
                                    </Motion.div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-white/10 flex gap-2 items-center">
                                            <div className="flex gap-1">
                                                <Motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                                <Motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                                <Motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                            </div>
                                            <span className="text-[10px] uppercase font-black text-slate-400">Analizando...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => {
                                            setInput('Tengo un archivo llamado "Informe_Seguimiento_Trimestral.pdf". ¿A qué iniciativa debo subirlo como evidencia?');
                                        }}
                                        className="p-3 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-300 transition-colors"
                                        title="Sugerir vinculación de evidencia"
                                    >
                                        <FileText size={18} />
                                    </button>
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
