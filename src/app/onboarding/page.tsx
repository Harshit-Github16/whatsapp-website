'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Image as ImageIcon, RotateCcw, Check, Phone, ShieldCheck, HelpCircle } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  mediaUrl?: string;
  timestamp: string;
}

// Preset mock media attachments
const MOCK_ATTACHMENTS = [
  { name: 'Modern Office', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80' },
  { name: 'Minimal Workspace', url: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&auto=format&fit=crop&q=80' },
  { name: 'Luxury Interior', url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&auto=format&fit=crop&q=80' },
  { name: 'Medical Stethoscope', url: 'https://images.unsplash.com/photo-1584515901367-f134706ef532?w=600&auto=format&fit=crop&q=80' },
  { name: 'Gourmet Meal', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=80' },
  { name: 'Gym Weights', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80' }
];

export default function OnboardingSimulator() {
  const [phoneNumber, setPhoneNumber] = useState('+15550199');
  const [inputMessage, setInputMessage] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStep, setSessionStep] = useState<string>('WELCOME');
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome messages
  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: '👋 Welcome to SiteBuilder WhatsApp Bot!\n\nI will help you build and publish a professional website in minutes.\n\nReply with *START* to begin!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend: string, mediaUrlToSend?: string) => {
    if (!textToSend.trim() && !mediaUrlToSend) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      sender: 'user',
      text: textToSend,
      mediaUrl: mediaUrlToSend || undefined,
      timestamp
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setSelectedMedia(null);
    setIsLoading(true);

    try {
      // Simulate Twilio webhook request format
      const form = new FormData();
      form.append('From', `whatsapp:${phoneNumber}`);
      form.append('Body', textToSend);
      if (mediaUrlToSend) {
        form.append('NumMedia', '1');
        form.append('MediaUrl0', mediaUrlToSend);
      } else {
        form.append('NumMedia', '0');
      }

      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        body: form
      });

      if (!res.ok) {
        throw new Error('API server returned error status');
      }

      const xmlText = await res.text();
      
      // Parse XML response (TwiML)
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const botText = xmlDoc.getElementsByTagName('Message')[0]?.textContent || '';

      const botMsg: ChatMessage = {
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);

      // Simple heuristic updates for the step indicator
      if (botText.includes('Business Name')) setSessionStep('NAME');
      else if (botText.includes('Business Category')) setSessionStep('CATEGORY');
      else if (botText.includes('Business Logo')) setSessionStep('LOGO');
      else if (botText.includes('gallery images')) setSessionStep('GALLERY');
      else if (botText.includes('Contact Phone Number')) setSessionStep('PHONE');
      else if (botText.includes('Email Address')) setSessionStep('EMAIL');
      else if (botText.includes('Business Address')) setSessionStep('ADDRESS');
      else if (botText.includes('3 services')) setSessionStep('SERVICES');
      else if (botText.includes('About Us')) setSessionStep('ABOUT');
      else if (botText.includes('Visual Theme')) setSessionStep('THEME');
      else if (botText.includes('CONGRATULATIONS')) setSessionStep('COMPLETED');
      else if (botText.includes('Management Menu')) setSessionStep('EDIT_MENU');
      else if (botText.includes('Edit Business Name')) setSessionStep('EDIT_NAME');
      else if (botText.includes('Change Visual Theme')) setSessionStep('EDIT_THEME');
      else if (botText.includes('Update Logo')) setSessionStep('EDIT_LOGO');
      else if (botText.includes('Edit Services')) setSessionStep('EDIT_SERVICES');
      else if (botText.includes('Edit About Us Text')) setSessionStep('EDIT_ABOUT');
      else if (botText.includes('Edit Contact Details')) setSessionStep('EDIT_CONTACT');
      else if (botText.includes('Edit Contact Phone')) setSessionStep('EDIT_CONTACT_PHONE');
      else if (botText.includes('Edit Contact Email')) setSessionStep('EDIT_CONTACT_EMAIL');
      else if (botText.includes('Edit Contact Address')) setSessionStep('EDIT_CONTACT_ADDRESS');
      else if (botText.includes('Update Gallery Images')) setSessionStep('EDIT_GALLERY');
      else if (botText.includes('Add Gallery Image')) setSessionStep('EDIT_GALLERY_ADD');
      else if (botText.includes('Manage Testimonials')) setSessionStep('EDIT_TESTIMONIALS');
      else if (botText.includes('Manage Blog Articles')) setSessionStep('EDIT_BLOGS');
      else if (botText.includes('Manage FAQs')) setSessionStep('EDIT_FAQ');

    } catch (err) {
      console.error('Simulator network error:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: '⚠️ Network Error: Could not reach `/api/whatsapp` route. Make sure your server is running.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSession = async () => {
    handleSendMessage('RESET');
    setSessionStep('WELCOME');
  };

  // Fast chips trigger
  const getChipsForStep = () => {
    switch (sessionStep) {
      case 'WELCOME':
        return ['START'];
      case 'CATEGORY':
        return ['1', '2', '3', '4', '5', '6'];
      case 'LOGO':
        return ['SKIP'];
      case 'GALLERY':
        return ['DONE', 'SKIP'];
      case 'PHONE':
        return ['SAME'];
      case 'ADDRESS':
        return ['SKIP'];
      case 'THEME':
        return ['1', '2', '3', '4', '5', '6'];
      case 'COMPLETED':
        return ['RESET'];
      case 'EDIT_MENU':
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'RESTART'];
      case 'EDIT_THEME':
        return ['1', '2', '3', '4', '5', '6'];
      case 'EDIT_LOGO':
        return ['DELETE', 'B'];
      case 'EDIT_GALLERY':
        return ['1', '2', 'B'];
      case 'EDIT_TESTIMONIALS':
        return ['1', '2', 'B'];
      case 'EDIT_FAQ':
        return ['1', '2', 'B'];
      case 'EDIT_BLOGS':
        return ['1', '2', 'B'];
      case 'EDIT_CONTACT':
        return ['1', '2', '3', 'B'];
      case 'EDIT_CONTACT_PHONE':
        return ['SAME'];
      case 'EDIT_CONTACT_ADDRESS':
        return ['SKIP'];
      case 'EDIT_BLOGS_ADD_IMAGE':
        return ['SKIP'];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 py-3 px-6 shadow-md border-b border-emerald-500/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded text-xs">LOCAL SIMULATOR</span>
            <h1 className="text-lg font-bold tracking-tight">WhatsApp Onboarding Sandbox</h1>
          </div>
          <p className="text-xs text-emerald-100 max-w-xl text-center md:text-right">
            Test your website creation bot instantly from your browser. This simulator simulates the webhooks sent by Twilio when users text on WhatsApp.
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Debug Settings & Step Guide */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
            <h2 className="text-md font-semibold flex items-center gap-2 text-emerald-400">
              <ShieldCheck size={18} />
              Simulator Configuration
            </h2>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">WhatsApp Phone Number</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-emerald-500 font-mono text-emerald-300"
                  />
                </div>
                <button
                  onClick={handleResetSession}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-lg transition text-sm flex items-center justify-center gap-1.5 border border-slate-700"
                  title="Reset state machine"
                >
                  <RotateCcw size={15} />
                  Reset
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Changing phone numbers creates a separate onboarding session.
              </p>
            </div>

            <hr className="border-slate-800 my-1" />

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Onboarding Session State</span>
                <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono text-[10px] font-semibold border border-emerald-500/20">
                  {sessionStep}
                </span>
              </div>

              {/* Steps timeline visual */}
              <div className="flex flex-col gap-2.5 text-xs text-slate-400 mt-1 bg-slate-950/50 p-3 rounded-lg border border-slate-950">
                <div className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] ${
                    ['WELCOME', 'NAME', 'CATEGORY'].includes(sessionStep) ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500'
                  }`}>1</span>
                  <span>Welcome & Business Name</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] ${
                    ['LOGO', 'GALLERY'].includes(sessionStep) ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500'
                  }`}>2</span>
                  <span>Logo & Media Upload</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] ${
                    ['PHONE', 'EMAIL', 'ADDRESS'].includes(sessionStep) ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500'
                  }`}>3</span>
                  <span>Contact Information</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] ${
                    ['SERVICES', 'ABOUT', 'THEME'].includes(sessionStep) ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500'
                  }`}>4</span>
                  <span>Content & Aesthetics Selection</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick-reply chip list */}
          {getChipsForStep().length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <HelpCircle size={14} />
                Step Quick Replies:
              </span>
              <div className="flex flex-wrap gap-2">
                {getChipsForStep().map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSendMessage(chip)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition duration-150 transform active:scale-95 shadow-sm"
                  >
                    Send "{chip}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tips block */}
          <div className="text-xs text-slate-500 bg-slate-900/40 p-4 border border-slate-800/60 rounded-xl leading-relaxed">
            <span className="font-semibold text-slate-400 block mb-1">💡 Sandbox Testing Instructions:</span>
            To simulate image attachments on steps like <code className="bg-slate-950 px-1 rounded text-emerald-400">LOGO</code> or <code className="bg-slate-950 px-1 rounded text-emerald-400">GALLERY</code>:
            <ol className="list-decimal pl-4 mt-1 flex flex-col gap-1">
              <li>Click the image attach icon in the chat input.</li>
              <li>Select a mock photo from the presets popover.</li>
              <li>Type an optional message and press Send.</li>
            </ol>
          </div>
        </div>

        {/* Right Column: WhatsApp Mockup Phone */}
        <div className="lg:col-span-8 flex justify-center">
          <div className="w-full max-w-[450px] bg-slate-950 rounded-[40px] p-3 border-4 border-slate-800 shadow-2xl relative flex flex-col overflow-hidden aspect-[9/18] min-h-[680px]">
            {/* Phone speaker/camera notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-32 bg-slate-800 rounded-b-xl z-20"></div>

            {/* WhatsApp Interface Wrapper */}
            <div className="flex-1 rounded-[32px] overflow-hidden flex flex-col relative bg-[#0b141a]">
              {/* WhatsApp Header */}
              <div className="bg-[#1f2c34] text-white px-4 pt-6 pb-3 flex items-center justify-between border-b border-[#2a3942] z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    WA
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">WebAppBot Site Builder</h3>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-track-transparent">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed shadow ${
                        msg.sender === 'user'
                          ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none'
                          : 'bg-[#202c33] text-[#e9edef] rounded-tl-none'
                      }`}
                    >
                      {msg.mediaUrl && (
                        <div className="mb-2 rounded-lg overflow-hidden border border-slate-700 max-h-36">
                          <img src={msg.mediaUrl} alt="Attached Media" className="w-full h-full object-cover" />
                        </div>
                      )}
                      
                      {/* Formatted Text rendering with *bold* support */}
                      <p className="whitespace-pre-wrap">
                        {msg.text.split('\n').map((line, lIdx) => (
                          <span key={lIdx} className="block">
                            {line.split(' ').map((word, wIdx) => {
                              if (word.startsWith('*') && word.endsWith('*')) {
                                return <strong key={wIdx} className="text-white font-bold">{word.slice(1, -1)} </strong>;
                              }
                              return word + ' ';
                            })}
                          </span>
                        ))}
                      </p>
                      
                      <div className="text-[9px] text-slate-400 text-right mt-1.5 flex items-center justify-end gap-1">
                        <span>{msg.timestamp}</span>
                        {msg.sender === 'user' && <Check size={10} className="text-emerald-400" />}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="mr-auto items-start max-w-[80%] flex flex-col">
                    <div className="bg-[#202c33] text-slate-300 rounded-2xl rounded-tl-none px-4 py-2 text-[13px] shadow">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-150"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-300"></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Area */}
              <div className="bg-[#1f2c34] p-3 flex flex-col gap-2 border-t border-[#2a3942]">
                {/* Media preset tray (visible when click image attach) */}
                {selectedMedia && (
                  <div className="bg-[#202c33] rounded-lg p-2 flex items-center justify-between border border-[#2a3942]">
                    <div className="flex items-center gap-2">
                      <img src={selectedMedia} alt="Selected attachment" className="w-10 h-10 object-cover rounded" />
                      <span className="text-xs text-slate-300">Attachment Ready</span>
                    </div>
                    <button
                      onClick={() => setSelectedMedia(null)}
                      className="text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20"
                    >
                      Remove
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <button
                      onClick={() => {
                        // Cycle through presets or pick random preset
                        const randomIdx = Math.floor(Math.random() * MOCK_ATTACHMENTS.length);
                        setSelectedMedia(MOCK_ATTACHMENTS[randomIdx].url);
                      }}
                      className={`p-2 rounded-full transition ${
                        selectedMedia ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-[#202c33]'
                      }`}
                      title="Attach mock photo"
                    >
                      <ImageIcon size={18} />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage(inputMessage, selectedMedia || undefined);
                      }
                    }}
                    placeholder="Type message here..."
                    className="flex-1 bg-[#2a3942] border-none rounded-xl px-4 py-2 text-sm text-[#e9edef] focus:outline-none placeholder-slate-400"
                  />

                  <button
                    onClick={() => handleSendMessage(inputMessage, selectedMedia || undefined)}
                    disabled={!inputMessage.trim() && !selectedMedia}
                    className="bg-[#00a884] hover:bg-[#008f72] disabled:opacity-40 disabled:hover:bg-[#00a884] text-white p-2.5 rounded-full transition shadow-md flex items-center justify-center"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
