'use client';
// ============================================================
// DEPLOY TO: src/components/shared/ChatWidget.jsx
// Then import + add <ChatWidget /> in src/app/layout.jsx
// ============================================================

import { useState, useRef, useEffect, useCallback } from 'react';

const INITIAL_QUICK_REPLIES = [
  'Which structure suits my company?',
  'How long does setup take?',
  'Tell me about GCC setup',
  'What is FDI Automatic Route?',
];

const QUICK_REPLIES_BY_INTENT = {
  structure: ['Private Limited (WOS)', 'Branch Office', 'Liaison Office', 'Book a consultation'],
  cost:      ['Get a detailed quote', "What's included?", 'Book free call'],
  time:      ['What do I need to provide?', 'Start the process', 'Book consultation'],
  gcc:       ['GCC cost estimate', 'SEZ benefits', 'Which city is best?'],
  default:   ['Tell me more', 'Book free consultation', 'Get the Starter Guide'],
};

function getQuickReplies(userText) {
  const t = userText.toLowerCase();
  if (t.includes('structure') || t.includes('which') || t.includes('type') || t.includes('form')) return QUICK_REPLIES_BY_INTENT.structure;
  if (t.includes('cost') || t.includes('fee') || t.includes('price') || t.includes('charg')) return QUICK_REPLIES_BY_INTENT.cost;
  if (t.includes('time') || t.includes('long') || t.includes('week') || t.includes('fast')) return QUICK_REPLIES_BY_INTENT.time;
  if (t.includes('gcc') || t.includes('captive') || t.includes('center') || t.includes('centre')) return QUICK_REPLIES_BY_INTENT.gcc;
  return QUICK_REPLIES_BY_INTENT.default;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen]             = useState(false);
  const [messages, setMessages]         = useState([]);
  const [input, setInput]               = useState('');
  const [isLoading, setIsLoading]       = useState(false);
  const [quickReplies, setQuickReplies] = useState(INITIAL_QUICK_REPLIES);
  const [showBadge, setShowBadge]       = useState(true);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData]         = useState({ name: '', company: '', email: '', timeline: '' });
  const [exchangeCount, setExchangeCount] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const historyRef     = useRef([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showLeadForm]);

  useEffect(() => {
    setTimeout(() => {
      setMessages([{
        role: 'bot',
        text: "Hi! I'm Arya. I help foreign companies navigate India entry — from choosing the right structure to staying fully compliant.

What brings you here today?",
        id: Date.now(),
      }]);
    }, 500);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setShowBadge(false);
    }
  }, [isOpen]);

  const addBotMessage = useCallback((text) => {
    setMessages(prev => [...prev, { role: 'bot', text, id: Date.now() }]);
  }, []);

  const sendMessage = useCallback(async (text) => {
    const userText = (text || input).trim();
    if (!userText || isLoading) return;
    setInput('');
    setQuickReplies([]);
    setShowLeadForm(false);
    setMessages(prev => [...prev, { role: 'user', text: userText, id: Date.now() }]);
    historyRef.current = [...historyRef.current, { role: 'user', content: userText }];
    setIsLoading(true);
    const newCount = exchangeCount + 1;
    setExchangeCount(newCount);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyRef.current }),
      });
      const data = await res.json();
      const reply = data.reply || "I'm having a technical issue. Please try again or visit indiacompanysetup.com/contact";
      historyRef.current = [...historyRef.current, { role: 'assistant', content: reply }];
      addBotMessage(reply);
      setQuickReplies(getQuickReplies(userText));
      if (!leadCaptured && newCount >= 3) {
        setTimeout(() => setShowLeadForm(true), 700);
      }
    } catch {
      addBotMessage("I'm having a brief technical issue. Please try again, or reach us directly at indiacompanysetup.com/contact");
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, exchangeCount, leadCaptured, addBotMessage]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const submitLead = () => {
    if (!leadData.name || !leadData.email) return;
    setShowLeadForm(false);
    setLeadCaptured(true);
    addBotMessage(`Thank you, ${leadData.name}! The India Entry Starter Guide is on its way to ${leadData.email}.

Our team will reach out within 1 business day. Feel free to ask anything else, or book a free 30-min consultation at indiacompanysetup.com/contact`);
    setQuickReplies(['Book free consultation', 'Ask another question']);
    if (typeof window !== 'undefined' && window._icsTrack) {
      window._icsTrack('chatbot_lead_captured', {
        lead_name: leadData.name,
        lead_email: leadData.email,
        lead_timeline: leadData.timeline,
      });
    }
  };

  const s = {
    toggle: {
      position: 'fixed', bottom: 88, right: 24, zIndex: 600,
      width: 54, height: 54, borderRadius: '50%',
      background: '#0B3D2E', border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 8px 28px rgba(11,61,46,.38)',
      transition: 'transform .2s, box-shadow .2s',
    },
    window: {
      position: 'fixed', bottom: 154, right: 24,
      width: 360, maxHeight: 560,
      background: '#FAFAF5',
      borderRadius: 18,
      boxShadow: '0 24px 64px rgba(11,61,46,.18), 0 4px 16px rgba(11,61,46,.10)',
      display: 'flex', flexDirection: 'column',
      zIndex: 599, overflow: 'hidden',
      transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(12px)',
      opacity: isOpen ? 1 : 0,
      pointerEvents: isOpen ? 'all' : 'none',
      transformOrigin: 'bottom right',
      transition: 'transform .25s cubic-bezier(.34,1.56,.64,1), opacity .2s ease',
    },
    header: {
      background: '#0B3D2E', padding: '14px 18px',
      display: 'flex', alignItems: 'center', gap: 11, flexShrink: 0,
    },
    avatar: {
      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
      background: 'rgba(255,255,255,.12)', border: '1.5px solid rgba(255,255,255,.22)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    messages: {
      flex: 1, overflowY: 'auto', padding: '14px 14px 6px',
      display: 'flex', flexDirection: 'column', gap: 9,
      scrollBehavior: 'smooth',
    },
    botBubble: {
      maxWidth: 'calc(100% - 38px)',
      padding: '9px 13px', borderRadius: '14px 14px 14px 3px',
      background: '#fff', border: '0.5px solid rgba(11,61,46,.1)',
      fontSize: 13.5, lineHeight: 1.55, color: '#17170f',
      whiteSpace: 'pre-wrap',
    },
    userBubble: {
      maxWidth: 'calc(100% - 38px)',
      padding: '9px 13px', borderRadius: '14px 14px 3px 14px',
      background: '#0B3D2E', color: '#fff',
      fontSize: 13.5, lineHeight: 1.55, alignSelf: 'flex-end',
      whiteSpace: 'pre-wrap',
    },
    qrArea: { display: 'flex', flexWrap: 'wrap', gap: 6, padding: '2px 14px 8px' },
    qrChip: {
      fontSize: 11.5, fontWeight: 500, padding: '5px 11px', borderRadius: 20,
      border: '1px solid #0B3D2E', color: '#0B3D2E', background: 'transparent',
      cursor: 'pointer', fontFamily: 'inherit', transition: 'background .12s, color .12s',
    },
    inputArea: {
      padding: '10px 12px', borderTop: '1px solid rgba(11,61,46,.1)',
      display: 'flex', gap: 8, alignItems: 'flex-end',
      background: '#fff', flexShrink: 0,
    },
    inputEl: {
      flex: 1, border: '1px solid rgba(11,61,46,.15)', borderRadius: 18,
      padding: '8px 13px', fontFamily: 'inherit', fontSize: 13.5, color: '#17170f',
      background: '#FAFAF5', resize: 'none', outline: 'none', maxHeight: 90, overflowY: 'auto',
      lineHeight: 1.4,
    },
    sendBtn: {
      width: 34, height: 34, flexShrink: 0, background: '#0B3D2E',
      border: 'none', borderRadius: '50%', display: 'flex',
      alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      transition: 'background .15s',
    },
    footer: {
      textAlign: 'center', padding: '5px', fontSize: 10.5,
      color: '#888', background: '#fff', borderTop: '0.5px solid rgba(11,61,46,.06)',
      flexShrink: 0,
    },
    leadForm: {
      margin: '0 14px 8px', padding: '13px', borderRadius: 12,
      background: '#fff', border: '0.5px solid rgba(11,61,46,.12)',
      fontSize: 13,
    },
    leadInput: {
      width: '100%', padding: '7px 10px', border: '1px solid rgba(11,61,46,.2)',
      borderRadius: 7, fontFamily: 'inherit', fontSize: 12.5, color: '#17170f',
      background: '#FAFAF5', marginBottom: 6, outline: 'none',
      boxSizing: 'border-box',
    },
    leadBtn: {
      width: '100%', padding: '8px', background: '#0B3D2E', color: '#fff',
      border: 'none', borderRadius: 7, fontFamily: 'inherit',
      fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 2,
    },
  };

  const BotIcon = () => (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24">
      <path d="M12 2a5 5 0 015 5v1h1a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V10a2 2 0 012-2h1V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v1h6V7a3 3 0 00-3-3zm-1 9a1 1 0 112 0v2a1 1 0 11-2 0v-2z" fill="rgba(255,255,255,.85)"/>
    </svg>
  );

  return (
    <>
      <div style={s.window} role="dialog" aria-label="India Entry AI Assistant">
        <div style={s.header}>
          <div style={s.avatar}><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2a5 5 0 015 5v1h1a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V10a2 2 0 012-2h1V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v1h6V7a3 3 0 00-3-3zm-1 9a1 1 0 112 0v2a1 1 0 11-2 0v-2z" fill="rgba(255,255,255,.85)"/></svg></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '.01em' }}>Arya — India Entry Advisor</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
              AI-powered · Backed by Ex-Big 4 team
            </div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 600, background: '#E8900A', color: '#fff', padding: '2px 8px', borderRadius: 20 }}>ICS</span>
        </div>

        <div style={s.messages}>
          {messages.map(msg =>
            msg.role === 'bot' ? (
              <div key={msg.id} style={{ display: 'flex', gap: 7, alignItems: 'flex-end' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#0B3D2E', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BotIcon /></div>
                <div style={s.botBubble}>{msg.text}</div>
              </div>
            ) : (
              <div key={msg.id} style={s.userBubble}>{msg.text}</div>
            )
          )}
          {isLoading && (
            <div style={{ display: 'flex', gap: 7, alignItems: 'flex-end' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#0B3D2E', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BotIcon /></div>
              <div style={{ ...s.botBubble, padding: '11px 14px' }}><TypingDots /></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {showLeadForm && !leadCaptured && (
          <div style={s.leadForm}>
            <div style={{ fontWeight: 600, color: '#0B3D2E', marginBottom: 9, fontSize: 12.5 }}>Get your free India Entry Starter Guide</div>
            <input style={s.leadInput} placeholder="Your name" value={leadData.name} onChange={e => setLeadData(p => ({ ...p, name: e.target.value }))} />
            <input style={s.leadInput} placeholder="Company & country" value={leadData.company} onChange={e => setLeadData(p => ({ ...p, company: e.target.value }))} />
            <input style={s.leadInput} type="email" placeholder="Work email" value={leadData.email} onChange={e => setLeadData(p => ({ ...p, email: e.target.value }))} />
            <select style={s.leadInput} value={leadData.timeline} onChange={e => setLeadData(p => ({ ...p, timeline: e.target.value }))}>
              <option value="">When are you planning India entry?</option>
              <option>Within 3 months</option>
              <option>3-6 months</option>
              <option>Just exploring</option>
            </select>
            <button style={s.leadBtn} onClick={submitLead}>Send me the guide</button>
            <div style={{ textAlign: 'center', marginTop: 6 }}>
              <button onClick={() => setShowLeadForm(false)} style={{ background: 'none', border: 'none', fontSize: 11, color: '#888', cursor: 'pointer', fontFamily: 'inherit' }}>No thanks, continue chatting</button>
            </div>
          </div>
        )}

        {quickReplies.length > 0 && !isLoading && (
          <div style={s.qrArea}>
            {quickReplies.map(qr => (
              <button key={qr} style={s.qrChip}
                onClick={() => { setQuickReplies([]); sendMessage(qr); }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0B3D2E'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0B3D2E'; }}>
                {qr}
              </button>
            ))}
          </div>
        )}

        <div style={s.inputArea}>
          <textarea ref={inputRef} style={s.inputEl} rows={1}
            placeholder="Ask about setting up in India..."
            value={input}
            onChange={e => {
              setInput(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 90) + 'px';
            }}
            onKeyDown={handleKey}
          />
          <button style={{ ...s.sendBtn, opacity: isLoading ? 0.5 : 1 }}
            onClick={() => sendMessage()} disabled={isLoading}
            onMouseEnter={e => e.currentTarget.style.background = '#155c44'}
            onMouseLeave={e => e.currentTarget.style.background = '#0B3D2E'}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div style={s.footer}>
          Powered by <a href="https://indiacompanysetup.com" style={{ color: '#0B3D2E' }}>indiacompanysetup.com</a> · PGA & Co. CA
        </div>
      </div>

      <button
        style={s.toggle}
        onClick={() => setIsOpen(o => !o)}
        aria-label={isOpen ? 'Close chat' : 'Open India Entry AI Assistant'}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.07)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(11,61,46,.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(11,61,46,.38)'; }}
      >
        {showBadge && !isOpen && (
          <span style={{ position: 'absolute', top: -2, right: -2, width: 17, height: 17, borderRadius: '50%', background: '#E8900A', border: '2px solid #FAFAF5', fontSize: 9, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
        )}
        {isOpen ? (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
        ) : (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 3C7.03 3 3 6.86 3 11.5c0 1.92.67 3.7 1.8 5.12L3 21l4.7-1.55A9.14 9.14 0 0012 20c4.97 0 9-3.86 9-8.5S16.97 3 12 3z" fill="white"/></svg>
        )}
      </button>
    </>
  );
}

function TypingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center', height: 16 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: '50%', background: '#0B3D2E', opacity: 0.45,
          animation: 'ics-typing 1.2s ease-in-out infinite',
          animationDelay: `${i * 0.2}s`,
          display: 'inline-block',
        }} />
      ))}
      <style>{`
        @keyframes ics-typing {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </span>
  );
}
