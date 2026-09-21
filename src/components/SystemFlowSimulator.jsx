import { useState, useEffect, useRef } from 'react';
import { Workflow, Play, RotateCcw, ChevronRight, CheckCircle2, Zap, Shield, Database, Server, Cpu, Globe } from 'lucide-react';

const STEP_DESCRIPTIONS = [
  'Client UI dispatching secure HTTPS request payload...',
  'API Gateway validating JWT token & rate-limiting...',
  'Executing business domain services & processing logic...',
  'Database executing ACID transaction & query indexing...',
];

export default function SystemFlowSimulator({ systemFlow, projectTitle }) {
  const [activeStep, setActiveStep] = useState(-1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [latency, setLatency] = useState(16);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setIsCompleted(false);
    setActiveStep(0);
    setLatency(Math.floor(Math.random() * 12) + 14); // 14ms - 26ms

    let current = 0;
    const totalNodes = systemFlow.length;

    const advanceStep = () => {
      if (current < totalNodes - 1) {
        current += 1;
        setActiveStep(current);
        timerRef.current = setTimeout(advanceStep, 550);
      } else {
        // Reverse packet back to client (response flow)
        timerRef.current = setTimeout(() => {
          setIsSimulating(false);
          setIsCompleted(true);
          setActiveStep(-1);
        }, 500);
      }
    };

    timerRef.current = setTimeout(advanceStep, 550);
  };

  const resetSimulation = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsSimulating(false);
    setIsCompleted(false);
    setActiveStep(-1);
  };

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
      {/* Simulator Header & Action Controls */}
      <div className="system-flow-header">
        <div className="system-flow-title">
          <Workflow size={15} style={{ color: 'var(--gold)' }} />
          <span>System Architecture Flow</span>
        </div>

        <div className="simulator-controls">
          {isCompleted ? (
            <div className="simulation-success-badge" onClick={runSimulation} title="Click to re-run tracer">
              <span className="success-pulse-dot" />
              <CheckCircle2 size={13} />
              <span>200 OK · {latency}ms</span>
              <RotateCcw size={11} className="rerun-icon" />
            </div>
          ) : (
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className={`simulate-btn ${isSimulating ? 'simulating' : ''}`}
            >
              {isSimulating ? (
                <>
                  <span className="simulating-spinner" />
                  <span>Tracing Packet...</span>
                </>
              ) : (
                <>
                  <Zap size={12} className="zap-icon" />
                  <span>Simulate Live Request</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Interactive Track of Architecture Nodes */}
      <div className="system-flow-track">
        {systemFlow.map((node, idx) => {
          const isActive = activeStep === idx;
          const isPassed = activeStep > idx || isCompleted;

          return (
            <div key={idx} style={{ display: 'contents' }}>
              <div
                className={`system-flow-node ${isActive ? 'active-tracer-node' : ''} ${isPassed ? 'passed-tracer-node' : ''}`}
              >
                <div className="system-node-layer">
                  {getNodeIcon(node.layer)}
                  <span>{node.layer}</span>
                  {isActive && <span className="node-live-tag">PROCESSING</span>}
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
              ⚡ [{systemFlow[activeStep]?.layer?.toUpperCase()}] {STEP_DESCRIPTIONS[activeStep] || `Executing ${systemFlow[activeStep]?.desc}...`}
            </span>
          )}
          {isCompleted && (
            <span className="console-completed-msg">
              ✓ [HTTP 200 OK] Roundtrip completed in {latency}ms with ACID transaction isolation.
            </span>
          )}
          {!isSimulating && !isCompleted && (
            <span className="console-idle-msg">
              Click &quot;Simulate Live Request&quot; to trace a secure packet through all architecture layers.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
