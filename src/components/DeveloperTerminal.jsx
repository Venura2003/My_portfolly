import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles, ExternalLink, ShieldCheck, Check, Code, Phone, Mail } from 'lucide-react';

const INITIAL_WELCOME = [
  {
    type: 'banner',
    text: `
 ██╗   ██╗███████╗███╗   ██╗██╗   ██╗██████╗  █████╗ 
 ██║   ██║██╔════╝████╗  ██║██║   ██║██╔══██╗██╔══██╗
 ██║   ██║█████╗  ██╔██╗ ██║██║   ██║██████╔╝███████║
 ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║██║   ██║██╔══██╗██╔══██║
  ╚████╔╝ ███████╗██║ ╚████║╚██████╔╝██║  ██║██║  ██║
   ╚═══╝  ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
`,
  },
  {
    type: 'system',
    text: '🚀 Welcome to Venura OS Interactive Terminal [v2.4.0-prod]',
  },
  {
    type: 'system',
    text: 'Type "help" to view available commands, or click any command chip below.',
  },
];

const AVAILABLE_COMMANDS = [
  { cmd: 'help', desc: 'Display all available terminal commands' },
  { cmd: 'projects', desc: 'List all 7 enterprise & client production systems' },
  { cmd: 'skills', desc: 'View categorized technical skills & tech stacks' },
  { cmd: 'about', desc: 'Read bio, role & engineering philosophy' },
  { cmd: 'experience', desc: 'Display professional career history & timeline' },
  { cmd: 'contact', desc: 'Get direct email, phone, and WhatsApp contact lines' },
  { cmd: 'cv', desc: 'Download / view official Resume (PDF)' },
  { cmd: 'sudo hire venura', desc: '⚡ High-priority recruitment offer fast-track' },
  { cmd: 'whoami', desc: 'Display active user session and privilege level' },
  { cmd: 'clear', desc: 'Clear the terminal output screen' },
  { cmd: 'exit', desc: 'Close the developer terminal' },
];

export default function DeveloperTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState(INITIAL_WELCOME);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [copied, setCopied] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Global Keyboard Shortcut: Ctrl + K or Cmd + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [history, isOpen]);

  const executeCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Add to command history
    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIdx(-1);

    const userEntry = { type: 'input', text: rawCmd };

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (cmd === 'exit') {
      setIsOpen(false);
      setInputVal('');
      return;
    }

    let responseEntry = null;

    switch (cmd) {
      case 'help':
        responseEntry = {
          type: 'help',
          data: AVAILABLE_COMMANDS,
        };
        break;

      case 'about':
        responseEntry = {
          type: 'output',
          text: `
👨‍💻 VENURA WICKRAMASINGHA
Role: Full Stack Software Engineer
Location: Sri Lanka 🇱🇰
Education: 4th Year SE Undergraduate @ SLIIT
Current Position: Ceylon Innovation Services

"I architect resilient, high-throughput enterprise systems, modern web portals, 
and low-latency mobile platforms — obsessing over real-world performance, 
offline resilience, and clean software architecture."
`,
        };
        break;

      case 'skills':
        responseEntry = {
          type: 'skills',
          data: [
            { category: 'Enterprise Backend', items: ['.NET Core (C#)', 'Java Spring Boot', 'ASP.NET Core Web API', 'EF Core', 'RESTful APIs'] },
            { category: 'Frontend Architecture', items: ['React 18', 'TypeScript', 'Vite', 'HTML5/CSS3', 'Tailwind'] },
            { category: 'Cross-Platform & Mobile', items: ['Flutter Web/Mobile', 'Dart', 'PWA (Progressive Web Apps)'] },
            { category: 'Databases & Infrastructure', items: ['SQL Server', 'MySQL', 'On-Premise Enterprise Servers', 'ACID Transactions'] },
          ],
        };
        break;

      case 'projects':
        responseEntry = {
          type: 'projects',
          data: [
            { id: 1, title: 'Supermarket ERP & POS', type: 'Web Enterprise', tech: 'Flutter Web, .NET, MySQL', status: 'Office Server Hosted' },
            { id: 2, title: 'Leaf Intel (Tea Collection)', type: 'AgriTech Web', tech: 'Flutter Web, .NET, SQL', status: 'Office Server Hosted' },
            { id: 3, title: 'Lunudehi Official Band Site', type: 'Creative Web', tech: 'React, Vite, 100% SEO', status: 'Live (lunudehiband.com)' },
            { id: 4, title: 'Super Sonic Auto Trading', type: 'Automotive ERP', tech: 'Pre-Bid Calc, .NET, SQL', status: 'Office Server Hosted' },
            { id: 5, title: 'Knight Web Production', type: 'Corporate Agency', tech: 'React, TypeScript', status: 'Company Server Hosted' },
            { id: 6, title: 'Gym Management SaaS', type: 'Commercial SaaS', tech: 'React, Spring Boot, SQL', status: 'Live in Production (Team)' },
            { id: 7, title: 'Super Sonic Sales POS', type: 'Retail PWA', tech: 'Flutter Web, ASP.NET Core', status: 'Production-Grade PWA' },
          ],
        };
        break;

      case 'experience':
        responseEntry = {
          type: 'output',
          text: `
💼 PROFESSIONAL EXPERIENCE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Ceylon Innovation Services | Jan 2026 – Present
   • Role: Full Stack Software Engineer
   • Independently architected production-grade Supermarket ERP & POS Platform.
   • Built agricultural Leaf Intel tea collection system & automotive trading systems.
   • Stack: Flutter Web, .NET, MySQL, On-Premise Enterprise Servers.

2. Independent Team / Freelance | March 2026 – Present
   • Role: Collaborative Full Stack Developer
   • Collaboratively engineered Gym Management SaaS platform currently active in live production.
   • Stack: React, Java Spring Boot, SQL Database.

3. SLIIT — Sri Lanka Institute of Information Technology | 2023 – Present
   • 4th Year Software Engineering Undergraduate.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,
        };
        break;

      case 'contact':
        responseEntry = {
          type: 'contact',
          data: {
            email: 'uthsaravenura@gmail.com',
            phone: '+94 70 723 8483',
            whatsapp: 'https://wa.me/94707238483?text=Hi%20Venura,%20I%20saw%20your%20portfolio%20terminal!',
            linkedin: 'https://www.linkedin.com/in/venura-wickramasingha-b8935739a/',
            github: 'https://github.com/Venura2003',
          },
        };
        break;

      case 'cv':
      case 'resume':
        window.open('/cv.html', '_blank');
        responseEntry = {
          type: 'output',
          text: '📄 Opening official Resume (cv.html) in a new browser tab...',
        };
        break;

      case 'whoami':
        responseEntry = {
          type: 'output',
          text: `
Session: visitor@guest-workstation
Role: Tech Recruiter / Engineering Leader [Priority Access]
Permissions: READ-ONLY (execute "sudo hire venura" for elevated privileges)
Location: Earth (Internet Connected)
`,
        };
        break;

      case 'sudo hire venura':
      case 'sudo hire':
        responseEntry = {
          type: 'easter_egg',
          text: `
🎉 [PRIVILEGES ELEVATED: CHIEF EXECUTIVE / TECH RECRUITER MODE]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Authenticating candidate: Venura Wickramasingha...
Analyzing technical score:
  • Real-World Production Systems Delivered : 7+ Systems [PASSED]
  • Tech Stack Versatility (.NET, Flutter, Spring Boot, React) : 100% [PASSED]
  • On-Premise Enterprise Infrastructure & Architecture : VERIFIED [PASSED]

RESULT: CANDIDATE MEETS & EXCEEDS CRITERIA FOR SOFTWARE ENGINEER (SE/ASE)! 🚀
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ready to discuss hiring / an offer?
Direct WhatsApp line connected below:
`,
          link: 'https://wa.me/94707238483?text=Hi%20Venura,%20I%20executed%20sudo%20hire%20on%20your%20terminal!%20Let%20us%20schedule%20an%20interview.',
        };
        break;

      default:
        responseEntry = {
          type: 'error',
          text: `Command not found: "${rawCmd}". Type "help" to see available commands.`,
        };
        break;
    }

    setHistory((prev) => [...prev, userEntry, responseEntry]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIdx < commandHistory.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('uthsaravenura@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* ── Floating Terminal Launcher Badge ────────────────────────────── */}
      <div
        className="terminal-launcher-badge"
        onClick={() => setIsOpen(true)}
        title="Open Developer Terminal (Ctrl+K)"
      >
        <span className="terminal-badge-pulse" />
        <TerminalIcon size={14} className="terminal-badge-icon" />
        <span className="terminal-badge-text">TERMINAL</span>
        <span className="terminal-badge-key">Ctrl+K</span>
      </div>

      {/* ── Terminal Modal Window ────────────────────────────────────────── */}
      {isOpen && (
        <div className="terminal-modal-backdrop" onClick={() => setIsOpen(false)}>
          <div className="terminal-window" onClick={(e) => e.stopPropagation()}>
            {/* Window Header */}
            <div className="terminal-header">
              <div className="terminal-traffic-lights">
                <button
                  className="traffic-dot dot-close"
                  onClick={() => setIsOpen(false)}
                  title="Close (Esc)"
                />
                <button
                  className="traffic-dot dot-min"
                  onClick={() => setIsOpen(false)}
                  title="Minimize"
                />
                <button
                  className="traffic-dot dot-max"
                  onClick={() => setHistory([])}
                  title="Clear Screen"
                />
              </div>

              <div className="terminal-title">
                <TerminalIcon size={13} style={{ color: 'var(--gold)' }} />
                <span>venura@terminal: ~ (zsh)</span>
              </div>

              <div className="terminal-actions">
                <button
                  onClick={() => setIsOpen(false)}
                  className="terminal-close-btn"
                  aria-label="Close terminal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="terminal-body hide-scrollbar" onClick={() => inputRef.current?.focus()}>
              {history.map((item, index) => {
                if (item.type === 'banner') {
                  return (
                    <pre key={index} className="terminal-banner">
                      {item.text}
                    </pre>
                  );
                }

                if (item.type === 'system') {
                  return (
                    <div key={index} className="terminal-line system-line">
                      {item.text}
                    </div>
                  );
                }

                if (item.type === 'input') {
                  return (
                    <div key={index} className="terminal-line input-line">
                      <span className="terminal-prompt">guest@venura:~$</span>
                      <span className="terminal-cmd-text">{item.text}</span>
                    </div>
                  );
                }

                if (item.type === 'help') {
                  return (
                    <div key={index} className="terminal-help-grid">
                      <div className="terminal-help-title">AVAILABLE COMMANDS:</div>
                      {item.data.map((c, i) => (
                        <div
                          key={i}
                          className="terminal-help-row"
                          onClick={() => executeCommand(c.cmd)}
                          title={`Click to run "${c.cmd}"`}
                        >
                          <span className="terminal-help-cmd">{c.cmd}</span>
                          <span className="terminal-help-desc">{c.desc}</span>
                        </div>
                      ))}
                    </div>
                  );
                }

                if (item.type === 'skills') {
                  return (
                    <div key={index} className="terminal-skills-container">
                      <div className="terminal-help-title">TECHNICAL ARCHITECTURE STACK:</div>
                      {item.data.map((cat, i) => (
                        <div key={i} className="terminal-skill-block">
                          <div className="terminal-skill-cat">📁 {cat.category}</div>
                          <div className="terminal-skill-pills">
                            {cat.items.map((item, j) => (
                              <span key={j} className="terminal-skill-pill">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                if (item.type === 'projects') {
                  return (
                    <div key={index} className="terminal-projects-container">
                      <div className="terminal-help-title">PRODUCTION SYSTEMS DELIVERED (7 PROJECTS):</div>
                      <div className="terminal-project-table">
                        {item.data.map((p) => (
                          <div key={p.id} className="terminal-project-row">
                            <span className="terminal-proj-id">0{p.id}.</span>
                            <div className="terminal-proj-info">
                              <div className="terminal-proj-title">
                                {p.title} <span className="terminal-proj-type">[{p.type}]</span>
                              </div>
                              <div className="terminal-proj-tech">⚡ {p.tech}</div>
                            </div>
                            <span className="terminal-proj-status">{p.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (item.type === 'contact') {
                  return (
                    <div key={index} className="terminal-contact-card">
                      <div className="terminal-help-title">DIRECT COMMUNICATION CHANNELS:</div>
                      <div className="terminal-contact-links">
                        <a
                          href={item.data.whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          className="terminal-contact-btn whatsapp"
                        >
                          💬 WhatsApp Direct Chat
                        </a>
                        <button onClick={copyEmail} className="terminal-contact-btn">
                          {copied ? <Check size={14} color="#4ade80" /> : <Mail size={14} />}
                          {copied ? 'Email Copied!' : 'Copy Email (uthsaravenura@gmail.com)'}
                        </button>
                        <a href={`tel:${item.data.phone}`} className="terminal-contact-btn">
                          <Phone size={14} /> Call {item.data.phone}
                        </a>
                      </div>
                    </div>
                  );
                }

                if (item.type === 'easter_egg') {
                  return (
                    <div key={index} className="terminal-easter-card">
                      <pre className="terminal-easter-text">{item.text}</pre>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="terminal-hire-btn"
                        >
                          <Sparkles size={16} /> SEND OFFER / SCHEDULE INTERVIEW ON WHATSAPP
                        </a>
                      )}
                    </div>
                  );
                }

                if (item.type === 'error') {
                  return (
                    <div key={index} className="terminal-line error-line">
                      ❌ {item.text}
                    </div>
                  );
                }

                return (
                  <pre key={index} className="terminal-line output-line">
                    {item.text}
                  </pre>
                );
              })}

              {/* Active Command Input Line */}
              <div className="terminal-input-wrapper">
                <span className="terminal-prompt">guest@venura:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-text-input"
                  placeholder="Type a command (e.g. help, projects, sudo hire)..."
                  autoFocus
                  spellCheck="false"
                  autoComplete="off"
                />
                <button
                  onClick={() => executeCommand(inputVal)}
                  className="terminal-submit-btn"
                  title="Execute command (Enter)"
                >
                  <CornerDownLeft size={14} />
                </button>
              </div>

              <div ref={bottomRef} />
            </div>

            {/* Quick Command Chips Footer */}
            <div className="terminal-footer-chips">
              <span className="terminal-chip-label">Quick Run:</span>
              {['help', 'projects', 'skills', 'contact', 'cv', 'sudo hire venura', 'clear'].map(
                (cmd) => (
                  <button
                    key={cmd}
                    onClick={() => executeCommand(cmd)}
                    className={`terminal-chip ${cmd.includes('sudo') ? 'chip-gold' : ''}`}
                  >
                    {cmd}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
