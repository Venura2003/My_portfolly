import { useState, useEffect, useRef } from 'react';
import { Workflow, Play, RotateCcw, ChevronRight, CheckCircle2, Zap, Shield, Database, Cpu, Globe } from 'lucide-react';

const STEP_DESCRIPTIONS = [
  'Client UI dispatching secure HTTPS request payload...',
  'API Gateway validating JWT token & rate-limiting...',
  'Executing business domain services & processing logic...',
  'Database executing ACID transaction & query indexing...',
];

export default function SystemFlowSimulator({ systemFlow, projectTitle, autoStart = true }) {
  const [activeStep, setActiveStep] = useState(-1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [latency, setLatency] = useState(16);
  const timerRef = useRef(null);
  const trackRef = useRef(null);
  const nodeRefs = useRef([]);

  // Auto-scroll track to keep the active node centered smoothly
  useEffect(() => {
    if (activeStep >= 0 && nodeRefs.current[activeStep]) {
      nodeRefs.current[activeStep].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [activeStep]);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setIsCompleted(false);
    setActiveStep(0);
    setLatency(Math.floor(Math.random() * 10) + 14); // 14ms - 24ms

    let current = 0;
    const totalNodes = systemFlow.length;

    const advanceStep = () => {
      if (current < totalNodes - 1) {
        current += 1;
        setActiveStep(current);
        timerRef.current = setTimeout(advanceStep, 700);
      } else {
        // Roundtrip response flow completed
        timerRef.current = setTimeout(() => {
          setIsSimulating(false);
          setIsCompleted(true);
          setActiveStep(-1);
          // Gently scroll back to show full flow summary
          if (trackRef.current) {
            trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          }
        }, 650);
      }
    };

    timerRef.current = setTimeout(advanceStep, 700);
  };

  // Optional auto-play on first load after a brief initial pause
  useEffect(() => {
    if (autoStart) {
      const autoTimer = setTimeout(() => {
        runSimulation();
      }, 500);
      return () => clearTimeout(autoTimer);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const getNodeIcon = (layer = '') => {
    const l = layer.toLowerCase();
    if (l.includes('client') || l.includes('ui') || l.includes('frontend') || l.includes('pwa')) {
      return <Globe size={13} className="node-icon" />;
    }
    if (l.includes('api') || l.includes('gateway') || l.includes('security')) {
      return <Shield size={13} className="node-icon" />;
    }
    if (l.includes('service') || l.includes('engine') || l.includes('logic') || l.includes('core')) {
      return <Cpu size={13} className="node-icon" />;
    }
    return <Database size={13} className="node-icon" />;
  };

  return (
    <div className="system-flow-wrapper simulator-active">
      {/* Prominent High-Visibility Hero Action Bar */}
      <div className="flow-hero-action-bar">
        <div className="flow-hero-info">
          <div className="flow-hero-badge">
            <span className="live-beacon-dot" />
            <span>REAL-TIME PACKET TRACER</span>
          </div>
          <p className="flow-hero-subtitle">
            Simulate live client requests traversing through security, logic engines, and databases.
          </p>
        </div>

        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className={`simulate-hero-btn ${isSimulating ? 'simulating' : ''} ${isCompleted ? 'completed' : ''}`}
          title="Click to simulate live system architecture packet flow"
        >
          {isSimulating ? (
            <>
              <span className="simulating-spinner" />
              <span>Tracing Layer {activeStep + 1} of {systemFlow.length}...</span>
            </>
          ) : isCompleted ? (
            <>
              <RotateCcw size={14} className="rerun-icon" />
              <span>Re-Run Flow ({latency}ms)</span>
            </>
          ) : (
            <>
              <Play size={14} fill="currentColor" />
              <span>CLICK TO SIMULATE FLOW ▶</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Auto-Scrolling Track of Architecture Nodes */}
      <div className="system-flow-track hide-scrollbar" ref={trackRef}>
        {systemFlow.map((node, idx) => {
          const isActive = activeStep === idx;
          const isPassed = activeStep > idx || isCompleted;

          return (
            <div
              key={idx}
              ref={el => (nodeRefs.current[idx] = el)}
              style={{ display: 'inline-flex', alignItems: 'center' }}
            >
              <div
                className={`system-flow-node ${isActive ? 'active-tracer-node' : ''} ${isPassed ? 'passed-tracer-node' : ''}`}
                onClick={() => {
                  setActiveStep(idx);
                  if (nodeRefs.current[idx]) {
                    nodeRefs.current[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                  }
                }}
                style={{ cursor: 'pointer' }}
                title={`Click to inspect ${node.layer}`}
              >
                <div className="system-node-layer">
                  {getNodeIcon(node.layer)}
                  <span>{node.layer}</span>
                  {isActive && <span className="node-live-tag">ACTIVE</span>}
                  {isPassed && <span className="node-ok-tag">✓</span>}
                </div>
                <p className="system-node-desc">{node.desc}</p>
                {isActive && <div className="node-glow-halo" />}
              </div>

              {idx < systemFlow.length - 1 && (
                <div className={`system-flow-arrow ${activeStep === idx ? 'arrow-active' : ''} ${isPassed ? 'arrow-passed' : ''}`}>
                  <ChevronRight size={18} />
                  {activeStep === idx && <span className="arrow-pulse-packet" />}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Live Tracer Console Output Line */}
      <div className="tracer-console-bar">
        <div className="tracer-console-label">
          <span className="console-dot" />
          <span>NETWORK TRACER:</span>
        </div>
        <div className="tracer-console-text">
          {isSimulating && activeStep >= 0 && (
            <span className="console-active-msg">
              ⚡ [{systemFlow[activeStep]?.layer?.toUpperCase()}] {STEP_DESCRIPTIONS[activeStep] || `Processing ${systemFlow[activeStep]?.desc}...`}
            </span>
          )}
          {isCompleted && (
            <span className="console-completed-msg">
              ✓ [HTTP 200 OK] Roundtrip completed in {latency}ms with ACID transaction isolation.
            </span>
          )}
          {!isSimulating && !isCompleted && (
            <span className="console-idle-msg">
              Press &quot;CLICK TO SIMULATE FLOW&quot; to auto-play request traversal across all nodes.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
