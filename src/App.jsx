import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'

const LOGO_SRC = `${import.meta.env.BASE_URL}gauntlet-logo.png`

/* ─────────────────────────────────────────────
   Reusable Components
   ───────────────────────────────────────────── */

function Code({ label, children }) {
  return (
    <div className="code-block">
      {label && <div className="code-label">{label}</div>}
      <pre><code>{children}</code></pre>
    </div>
  )
}

function Step({ num, title, children }) {
  return (
    <div className="step">
      <div className="step-num" aria-hidden="true">{num}</div>
      <div className="step-body">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Slides
   ───────────────────────────────────────────── */

const slides = [

  // ══════════════════════════════════════════
  // PART I — THE HOOK (0–3)
  // ══════════════════════════════════════════

  // ── 0: Title ──
  {
    variant: 'title',
    render: () => (
      <>
        <h1>OpenClaw</h1>
        <div className="subtitle"><span className="gold">Your always-on employee(s)</span></div>
      </>
    ),
  },

  // ── 2: The Numbers ──
  {
    variant: 'content',
    render: () => (
      <>
        <div className="topic-label">The Numbers</div>
        <h2>The <span className="gold">fastest-growing</span> repository in GitHub history</h2>
        <div className="evidence">
          <div className="mini-chart">
            <svg viewBox="0 0 960 450" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Grid lines */}
              <line x1="60" y1="30" x2="900" y2="30" stroke="var(--gray-800)" strokeWidth="1" />
              <line x1="60" y1="120" x2="900" y2="120" stroke="var(--gray-800)" strokeWidth="1" />
              <line x1="60" y1="210" x2="900" y2="210" stroke="var(--gray-800)" strokeWidth="1" />
              <line x1="60" y1="300" x2="900" y2="300" stroke="var(--gray-800)" strokeWidth="1" />
              <line x1="60" y1="390" x2="900" y2="390" stroke="var(--gray-800)" strokeWidth="1" />

              {/* Y-axis labels */}
              <text x="50" y="35" textAnchor="end" fill="var(--gray-600)" fontSize="13" fontFamily="var(--font-sans)">350k</text>
              <text x="50" y="125" textAnchor="end" fill="var(--gray-600)" fontSize="13" fontFamily="var(--font-sans)">250k</text>
              <text x="50" y="215" textAnchor="end" fill="var(--gray-600)" fontSize="13" fontFamily="var(--font-sans)">150k</text>
              <text x="50" y="305" textAnchor="end" fill="var(--gray-600)" fontSize="13" fontFamily="var(--font-sans)">50k</text>
              <text x="50" y="395" textAnchor="end" fill="var(--gray-600)" fontSize="13" fontFamily="var(--font-sans)">0</text>

              {/* Area fill */}
              <polygon
                points="60,385 270,370 480,305 690,160 900,30 900,390 60,390"
                fill="url(#areaGrad)"
              />
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Line */}
              <polyline
                points="60,385 270,370 480,305 690,160 900,30"
                stroke="var(--gold)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity="0.7"
              />

              {/* Data points */}
              <circle cx="60" cy="385" r="4" fill="var(--gray-600)" />
              <circle cx="270" cy="370" r="4" fill="var(--gray-600)" />
              <circle cx="480" cy="305" r="4.5" fill="var(--gray-500)" />
              <circle cx="690" cy="160" r="5" fill="var(--gold)" opacity="0.7" />
              <circle cx="900" cy="30" r="6" fill="var(--gold)" />

              {/* Value labels */}
              <text x="690" y="145" textAnchor="middle" fill="var(--gray-400)" fontSize="14" fontWeight="500" fontFamily="var(--font-sans)">215k</text>
              <text x="900" y="60" textAnchor="middle" fill="var(--gold)" fontSize="16" fontWeight="600" fontFamily="var(--font-sans)">344k</text>

              {/* X-axis labels */}
              <text x="60" y="425" textAnchor="middle" fill="var(--gray-500)" fontSize="13" fontFamily="var(--font-sans)">Nov 2025</text>
              <text x="270" y="425" textAnchor="middle" fill="var(--gray-500)" fontSize="13" fontFamily="var(--font-sans)">Dec 2025</text>
              <text x="480" y="425" textAnchor="middle" fill="var(--gray-500)" fontSize="13" fontFamily="var(--font-sans)">Jan 2026</text>
              <text x="690" y="425" textAnchor="middle" fill="var(--gray-500)" fontSize="13" fontFamily="var(--font-sans)">Feb 2026</text>
              <text x="900" y="425" textAnchor="middle" fill="var(--gray-500)" fontSize="13" fontFamily="var(--font-sans)">Mar 2026</text>
            </svg>
          </div>
        </div>
      </>
    ),
  },

  // ── 7: The Evolution ──
  {
    variant: 'content',
    render: () => (
      <>
        <div className="topic-label">The Evolution</div>
        <h2>From conversation to <span className="gold">coworker</span></h2>
        <div className="evidence">
          <div className="evolution-timeline">
            <div className="evo-stage">
              <div className="evo-marker evo-marker--done" />
              <div className="evo-content">
                <h3>Chat</h3>
                <ul>
                  <li>Stateless Q&amp;A</li>
                  <li>No memory or tools</li>
                  <li>Forgets everything</li>
                </ul>
              </div>
            </div>
            <div className="evo-stage">
              <div className="evo-marker evo-marker--done" />
              <div className="evo-content">
                <h3>Workflows</h3>
                <ul>
                  <li>Chained LLM calls</li>
                  <li>Defined steps</li>
                  <li>Still ephemeral</li>
                </ul>
              </div>
            </div>
            <div className="evo-stage">
              <div className="evo-marker evo-marker--done" />
              <div className="evo-content">
                <h3>Harnesses</h3>
                <ul>
                  <li>Tool-using agents</li>
                  <li>File &amp; code access</li>
                  <li>Session-bound</li>
                </ul>
              </div>
            </div>
            <div className="evo-stage evo-stage--active">
              <div className="evo-marker evo-marker--active" />
              <div className="evo-content">
                <h3><span className="gold">Daemons</span></h3>
                <ul>
                  <li>Always-on</li>
                  <li>Survive restarts</li>
                  <li>Persistent memory</li>
                </ul>
              </div>
            </div>
            <div className="evo-stage evo-stage--future">
              <div className="evo-marker evo-marker--future" />
              <div className="evo-content">
                <h3>What&rsquo;s Next?</h3>
                <ul>
                  <li>Multi-agent societies</li>
                  <li>Self-directed goals</li>
                  <li>Agents hiring agents</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },

  // ── 8: Part II Section ──
  {
    variant: 'section',
    render: () => (
      <>
        <div className="section-number">Part II</div>
        <h2>Inside <span className="gold">OpenClaw</span></h2>
        <p className="section-tag">Architecture, memory, and the Markdown-first philosophy</p>
      </>
    ),
  },

  // ══════════════════════════════════════════
  // PART III — ARCHITECTURE (9–18)
  // ══════════════════════════════════════════

  // ── 9: Architecture ──
  {
    variant: 'content',
    render: () => (
      <>
        <div className="topic-label">Architecture</div>
        <h2>Six things that set OpenClaw <span className="gold">apart</span></h2>
        <div className="evidence">
          <div className="cards cards--2x3">
            <div className="card">
              <h3>Persistent Agents</h3>
              <p>Survive restarts. Pick up where you left off &mdash; even months later. No session limits.</p>
            </div>
            <div className="card">
              <h3>Markdown Memory</h3>
              <p>All state is plaintext files you can read, edit, and version-control. Nothing hidden.</p>
            </div>
            <div className="card">
              <h3>Skills &amp; Plugins</h3>
              <p>Hundreds of capabilities via ClawHub. Email, calendar, web scraping, dev tools, and more.</p>
            </div>
            <div className="card">
              <h3>Broad Integration</h3>
              <p>Any LLM backend. MCP protocol. Telegram, WhatsApp, local tools, external APIs.</p>
            </div>
            <div className="card">
              <h3>Open Architecture</h3>
              <p>Local Node.js service. Full system access. Skills are JS/TS code. Completely extensible.</p>
            </div>
            <div className="card">
              <h3>The Tradeoff</h3>
              <p>Flat permission model. Powerful but dangerous by default. Freedom demands responsibility.</p>
            </div>
          </div>
        </div>
      </>
    ),
  },

  // ── 18: Hub Diagram ──
  {
    variant: 'content',
    render: () => (
      <>
        <div className="topic-label">Mental Model</div>
        <h2>You are the <span className="gold">chief of staff</span></h2>
        <div className="diagram-hub">
          <div className="hub-core">You (Manager)</div>
          <div className="hub-stem" />
          <div className="hub-targets">
            <div className="hub-target-col">
              <div className="hub-target-stem" />
              <div className="hub-target-node">Budget Advisor</div>
            </div>
            <div className="hub-target-col">
              <div className="hub-target-stem" />
              <div className="hub-target-node">Project Builder</div>
            </div>
            <div className="hub-target-col">
              <div className="hub-target-stem" />
              <div className="hub-target-node">Travel Agent</div>
            </div>
            <div className="hub-target-col">
              <div className="hub-target-stem" />
              <div className="hub-target-node">Personal Chef</div>
            </div>
            <div className="hub-target-col">
              <div className="hub-target-stem" />
              <div className="hub-target-node">Creative Director</div>
            </div>
          </div>
        </div>
      </>
    ),
  },

  // ── 11: Memory File Tree ──
  {
    variant: 'content',
    render: () => (
      <>
        <div className="topic-label">Memory</div>
        <h2><span className="gold">Markdown</span> as Memory</h2>
        <div className="evidence">
          <div className="file-tree">
            <pre>
{`~/.openclaw/workspace/
├── `}<span className="primary">AGENTS.md</span>{'          '}<span className="comment"># agent behavior definitions</span>{`
├── `}<span className="primary">SOUL.md</span>{'            '}<span className="comment"># personality & rules</span>{`
├── `}<span className="primary">TOOLS.md</span>{'           '}<span className="comment"># available tool config</span>{`
├── `}<span className="primary">USER.md</span>{'            '}<span className="comment"># your preferences</span>{`
├── `}<span className="primary">MEMORY.md</span>{'          '}<span className="comment"># curated long-term knowledge</span>{`
├── daily/
│   └── `}<span className="primary">2026-03-15.md</span>{'  '}<span className="comment"># session transcript</span>{`
└── skills/
    └── email/
        └── `}<span className="primary">SKILL.md</span>{'   '}<span className="comment"># skill definition</span>
            </pre>
          </div>
        </div>
      </>
    ),
  },

  // ── 12: Two Kinds of Remembering ──
  {
    variant: 'content',
    render: () => (
      <>
        <div className="topic-label">Memory</div>
        <h2>Two kinds of <span className="gold">remembering</span></h2>
        <div className="two-col">
          <div className="col">
            <h3>Session Memory</h3>
            <ul>
              <li>daily/YYYY-MM-DD.md files</li>
              <li>Raw transcript of every interaction</li>
              <li>Auto-created each session, append-only</li>
            </ul>
          </div>
          <div className="col">
            <h3>Long-Term Memory</h3>
            <ul>
              <li>MEMORY.md &mdash; curated facts and preferences</li>
              <li>Survives restarts, persists indefinitely</li>
              <li>Effectively no context window limit</li>
            </ul>
          </div>
        </div>
        <div className="emphasis-box">
          <p>Open any file with a text editor. Your agent is version-controlled.</p>
        </div>
      </>
    ),
  },

  // ── 13: Identity is a File ──
  {
    variant: 'content',
    render: () => (
      <>
        <div className="topic-label">Memory</div>
        <h2>Identity is just <span className="gold">markdown</span></h2>
        <Code label="SOUL.md">{`# Agent Personality
name: Atlas
tone: direct, warm, slightly irreverent
expertise: software architecture, devops

# Rules
- Never commit to main without asking
- Always explain your reasoning
- If unsure, say so -- never fabricate`}</Code>
        <div className="emphasis-box">
          <p>SOUL.md defines personality. USER.md captures your preferences. Both are plaintext you control.</p>
        </div>
      </>
    ),
  },

  // ── 14: Part III Section ──
  {
    variant: 'section',
    render: () => (
      <>
        <div className="section-number">Part III</div>
        <h2>The <span className="gold">Skill</span> Economy</h2>
        <div className="section-tag">ClawHub, plugins, and the ecosystem that grew overnight</div>
      </>
    ),
  },

  // ── 15: Skills Funnel ──
  {
    variant: 'content',
    render: () => (
      <>
        <div className="topic-label">Skills</div>
        <h2>Skills are folders that teach agents <span className="gold">new capabilities</span></h2>
        <div className="diagram-funnel">
          <div className="funnel-bar funnel-bar--1">
            <span className="funnel-label">Built-in Skills</span>
            <span className="funnel-tag">Ship with install</span>
          </div>
          <div className="funnel-connector" />
          <div className="funnel-bar funnel-bar--2">
            <span className="funnel-label">ClawHub Registry</span>
            <span className="funnel-tag">Community marketplace</span>
          </div>
          <div className="funnel-connector" />
          <div className="funnel-bar funnel-bar--3">
            <span className="funnel-label">Custom Skills</span>
            <span className="funnel-tag">Your SKILL.md</span>
          </div>
          <div className="funnel-legend">From general to specialized &mdash; each layer extends the last</div>
        </div>
      </>
    ),
  },

  // ══════════════════════════════════════════
  // PART IV — SECURITY (19–23)
  // ══════════════════════════════════════════

  // ── 19: Part IV Section ──
  {
    variant: 'section',
    sectionStyle: 'danger',
    render: () => (
      <>
        <div className="section-number">Part IV</div>
        <h2>The <span className="gold">Price</span><br />of Freedom</h2>
        <div className="section-tag">Security, CVEs, and the flat-permission tradeoff</div>
      </>
    ),
  },

  // ── 22: Seven Hardening Rules ──
  {
    variant: 'content',
    render: () => (
      <>
        <div className="topic-label">Hardening</div>
        <h2>Seven rules for running OpenClaw <span className="gold">safely</span></h2>
        <div className="rule-list">
          <div className="rule-row">
            <div className="rule-label">Never run as root</div>
            <div className="rule-body">Create a dedicated, unprivileged user for OpenClaw</div>
          </div>
          <div className="rule-row">
            <div className="rule-label">Isolate in VM</div>
            <div className="rule-body">OrbStack, Docker --cap-drop, or WSL with restricted permissions</div>
          </div>
          <div className="rule-row">
            <div className="rule-label">Limit credentials</div>
            <div className="rule-body">Minimal API keys only. Prefer read-only or scoped tokens</div>
          </div>
          <div className="rule-row">
            <div className="rule-label">Restrict network</div>
            <div className="rule-body">Whitelist safe endpoints and domains. Block everything else</div>
          </div>
          <div className="rule-row">
            <div className="rule-label">Separate contexts</div>
            <div className="rule-body">Different agents for personal, work, and public tasks</div>
          </div>
          <div className="rule-row">
            <div className="rule-label">Audit regularly</div>
            <div className="rule-body">Run openclaw doctor. Monitor ClawHub sources. Remove untrusted skills</div>
          </div>
          <div className="rule-row rule-row--warning">
            <div className="rule-label">Never trust blindly</div>
            <div className="rule-body">Every ClawHub skill is third-party code running with your permissions</div>
          </div>
        </div>
      </>
    ),
  },

  // ── 23: IronClaw vs NemoClaw ──
  {
    variant: 'content',
    render: () => (
      <>
        <div className="topic-label">Hardening</div>
        <h2>Security concerns spawned <span className="gold">two new frameworks</span></h2>
        <div className="two-col">
          <div className="col">
            <h3>IronClaw (NEAR AI)</h3>
            <ul>
              <li>Rust/WASM sandbox for isolation</li>
              <li>Encrypted credentials at rest</li>
              <li>No telemetry, Apache-2.0 license</li>
              <li>Early 2026, smaller but growing community</li>
            </ul>
          </div>
          <div className="col">
            <h3>NemoClaw (NVIDIA)</h3>
            <ul>
              <li>Kernel-level sandbox (OpenShell)</li>
              <li>Centralized policy controls</li>
              <li>Enterprise-grade, NVIDIA-backed</li>
              <li>Alpha since March 2026</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },

  // ══════════════════════════════════════════
  // PART V — HANDS-ON (24–30)
  // ══════════════════════════════════════════

  // ── 24: Part V Section ──
  {
    variant: 'section',
    sectionStyle: 'success',
    render: () => (
      <>
        <div className="section-number">Part V</div>
        <h2>Hands on<br />the <span className="gold">Claw</span></h2>
        <p className="section-tag">Setup, multi-agent orchestration, and a live demo recipe</p>
      </>
    ),
  },

  // ══════════════════════════════════════════
  // PART VI — LANDSCAPE + CLOSE (31–35)
  // ══════════════════════════════════════════

  // ── 31: Part VI Section ──
  {
    variant: 'section',
    render: () => (
      <>
        <div className="section-number">Part VI</div>
        <h2>Know<br />Your <span className="gold">Options</span></h2>
        <p className="section-tag">OpenClaw in context &mdash; alternatives and the road ahead</p>
      </>
    ),
  },

  // ── 32: Comparison Table ──
  {
    variant: 'content',
    render: () => (
      <>
        <div className="topic-label">Comparison</div>
        <h2>Five <span className="gold">alternatives</span></h2>
        <div className="evidence">
          <table className="slide-table slide-table--plain">
            <thead>
              <tr>
                <th>Project</th>
                <th>Focus</th>
                <th>Strength</th>
                <th>Limitation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OpenClaw</td>
                <td>Full-featured JS agent</td>
                <td>Massive ecosystem, flexible</td>
                <td>No default sandbox</td>
              </tr>
              <tr>
                <td>IronClaw</td>
                <td>Rust security-first</td>
                <td>WASM sandbox, encrypted creds</td>
                <td>Smaller community</td>
              </tr>
              <tr>
                <td>NemoClaw</td>
                <td>Enterprise hardened</td>
                <td>Kernel sandbox, NVIDIA-backed</td>
                <td>Alpha, corporate focus</td>
              </tr>
              <tr>
                <td>NanoClaw</td>
                <td>Ultra-light prototype</td>
                <td>8 MB binary, minimal HW</td>
                <td>Limited features</td>
              </tr>
              <tr>
                <td>Claude Code</td>
                <td>AI coding assistant</td>
                <td>Polished, codebase-aware</td>
                <td>Proprietary, not general</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  // ── Final: Demo ──
  {
    variant: 'title',
    render: () => (
      <>
        <h1><span className="gold">Demo</span></h1>
      </>
    ),
  },

  // ── Final: Mascot + QR ──
  {
    variant: 'title',
    render: () => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4rem', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent('https://github.com/mattwoodco/openclaw/tree/multi-agent')}&color=ffffff&bgcolor=000000&format=svg`}
            alt="QR code to OpenClaw repo"
            style={{ width: '45vh', height: '45vh' }}
          />
          <span style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '1rem' }}>github.com/mattwoodco/openclaw</span>
        </div>
        <img src={`${import.meta.env.BASE_URL}diet-claw.jpeg`} alt="OpenClaw mascot" style={{ maxHeight: '55vh', width: 'auto' }} />
      </div>
    ),
  },

  // ── 29: Demo Setup ──
  {
    variant: 'content',
    render: () => (
      <>
        <div className="topic-label">Demo Recipe</div>
        <h2><span className="gold">Three</span> VMs, <span className="gold">three</span> agents, <span className="gold">three</span> ports</h2>
        <div className="evidence">
          <Code label="OrbStack Demo Setup">{`# VM1 -- Operations
openclaw gateway --port 18789
openclaw agents add ops --workspace ~/.openclaw/workspace-ops
openclaw agents set-identity --agent ops --name "Ops Agent"

# VM2 -- Research
openclaw gateway --port 18790
openclaw agents add research --workspace ~/.openclaw/workspace-research

# VM3 -- Writing
openclaw gateway --port 18791
openclaw agents add writer --workspace ~/.openclaw/workspace-writer`}</Code>
        </div>
      </>
    ),
  },

  // ── 30: Bind and Watch ──
  {
    variant: 'content',
    render: () => (
      <>
        <div className="topic-label">Demo Recipe</div>
        <h2>Watch them <em><span className="gold">talk</span></em></h2>
        <div className="evidence">
          <div className="steps">
            <Step num={1} title="Provision VMs">
              Create three Ubuntu VMs in OrbStack with networking enabled between them
            </Step>
            <Step num={2} title="Install and start">
              Install OpenClaw on each VM. Start gateways on ports 18789, 18790, 18791
            </Step>
            <Step num={3} title="Bind channels">
              Connect each agent to separate Telegram or communication channels
            </Step>
            <Step num={4} title="Orchestrate">
              Prompt one agent to delegate to others. Watch multi-instance coordination unfold
            </Step>
          </div>
        </div>
      </>
    ),
  },

]

/* ─────────────────────────────────────────────
   Deck
   ───────────────────────────────────────────── */

function App() {
  const [current, setCurrent] = useState(0)
  const total = slides.length
  const trackRef = useRef(null)
  const isScrolling = useRef(false)

  const go = useCallback((next) => {
    if (next < 0 || next >= total || next === current) return
    isScrolling.current = true
    setCurrent(next)
    trackRef.current?.scrollTo({
      left: next * window.innerWidth,
      behavior: 'smooth',
    })
  }, [current, total])

  // Sync state from scroll position (touch swipe / snap)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let timeout
    const onScroll = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        const idx = Math.round(track.scrollLeft / window.innerWidth)
        if (idx !== current && idx >= 0 && idx < total) {
          setCurrent(idx)
        }
        isScrolling.current = false
      }, 80)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      clearTimeout(timeout)
    }
  }, [current, total])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        go(current + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        go(current - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        go(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        go(total - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, total, go])

  const progress = ((current + 1) / total) * 100

  return (
    <div className="deck" role="region" aria-roledescription="slide deck" aria-label="OpenClaw Presentation">
      <div className="bg-grid" aria-hidden="true" />

      <img
        src={LOGO_SRC}
        alt=""
        aria-hidden="true"
        className="deck-logo"
      />

      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label="Slide progress"
        style={{ width: `${progress}%` }}
      />

      <div className="slides-track" ref={trackRef}>
        {slides.map((slide, i) => {
          const isActive = i === current
          let className = `slide slide--${slide.variant}`
          if (slide.sectionStyle) className += ` slide--${slide.sectionStyle}`

          return (
            <div
              key={`slide-${i}`}
              className={className}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${total}`}
              aria-hidden={!isActive}
            >
              {slide.render()}
            </div>
          )
        })}
      </div>

      <div className="slide-counter" aria-hidden="true">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      <div className="nav-hint" aria-hidden="true">
        <kbd>&larr;</kbd> <kbd>&rarr;</kbd> swipe or navigate
      </div>
    </div>
  )
}

export default App
