import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QRCodeCanvas } from 'qrcode.react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Building2, CalendarDays, Clock3, MapPin, ScanLine, ArrowDown, ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'; import './style.css';
const IDS = Array.from({ length: 250 }, (_, i) => `G${String(i + 1).padStart(3, '0')}`), tokenFor = id => `RUDRA-ENTRY-${id}-2026`, checkinsKey = 'rudra-demo-checkins', getCheckins = () => JSON.parse(localStorage.getItem(checkinsKey) || '{}');
function Skyline() { return <div className="scene" aria-hidden="true"><div className="moon" /><div className="city city-back"><i /><i /><i /><i /><i /></div><div className="city city-front"><i /><i /><i /><i /></div><div className="tower-wrap"><svg className="tower" viewBox="0 0 280 480" fill="none"><defs><linearGradient id="goldwall" x1="40" y1="0" x2="220" y2="460" gradientUnits="userSpaceOnUse"><stop stopColor="#ffe9a2" /><stop offset=".35" stopColor="#bd8b2d" /><stop offset="1" stopColor="#4d3516" /></linearGradient><linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8dc9ff" stopOpacity=".65" /><stop offset="1" stopColor="#071a39" /></linearGradient></defs><path d="M55 450V100L95 70V35L130 8V50L166 25V85L205 65V450Z" fill="url(#goldwall)" stroke="#f5d879" strokeWidth="2" /><path d="M68 450V116L105 87V57L123 43V75L151 51V101L191 81V450Z" fill="#092448" /><g className="windows">{Array.from({ length: 9 }, (_, r) => Array.from({ length: 4 }, (_, c) => <rect key={`${r}-${c}`} x={76 + c * 27} y={132 + r * 34} width="17" height="23" rx="1" fill="url(#glass)" stroke="#e4bb55" strokeWidth=".7" />))}</g><path d="M50 450H212M65 115L95 85M130 8V450" stroke="#f3d26c" strokeWidth="2" /><path d="M30 450H245" stroke="#d6b65a" strokeWidth="4" /><g className="crane"><path d="M210 55V0M210 8H270M238 8V48M207 8L180 25M218 45H252" stroke="#e8c45e" strokeWidth="3" /><path d="M238 48V90" stroke="#e8c45e" strokeWidth="2" /><rect x="232" y="90" width="12" height="16" fill="#b8892b" /></g></svg></div><div className="glow-ground" /></div> }
function Invitation() {
    const id = new URLSearchParams(location.search).get('id') || 'G001';
    const valid = IDS.includes(id);

    return (
        <main className="invitation">
            <section className="pass" id="pass">
                <div className="pass-kicker">
                    <ShieldCheck /> SECURE DIGITAL INVITATION
                </div>

                <h2>
                    Your evening.
                    <br />
                    <em>Your entry.</em>
                </h2>

                <p className="pass-sub">
                    Your personal access pass is ready. Keep it handy at the entrance.
                </p>

                {valid ? (
                    <div className="ticket">
                        <div className="ticket-head">
                            <span>RUDRA · GRAND LAUNCH</span>
                            <span>2026</span>
                        </div>

                        <div className="ticket-name">
                            GUEST <b>{id}</b>
                        </div>

                        <div className="qr">
                            <QRCodeCanvas
                                value={tokenFor(id)}
                                size={220}
                                includeMargin
                            />
                        </div>

                        <p className="ticket-caption">
                            SCAN AT THE ENTRANCE
                        </p>

                        <div className="ticket-footer">
                            <span>22 NOV · 7 PM</span>
                            <span>NAGPUR, INDIA</span>
                        </div>
                    </div>
                ) : (
                    <p className="invalid">
                        Guest invitation not found. Please check your invitation link.
                    </p>
                )}

                <p className="pass-instruction">
                    Present this QR code to the event volunteer for verification and entry.
                </p>
            </section>
        </main>
    );
}
function Scanner() { const [result, setResult] = useState(null), [manual, setManual] = useState(''), [active, setActive] = useState(false); useEffect(() => { if (!active) return; const scanner = new Html5QrcodeScanner('qr-reader', { fps: 10, qrbox: { width: 230, height: 230 }, rememberLastUsedCamera: true }, false); scanner.render(decoded => { scanner.clear().catch(() => { }); setActive(false); verify(decoded) }, () => { }); return () => scanner.clear().catch(() => { }) }, [active]); function verify(value) { const id = IDS.find(x => tokenFor(x) === value); if (!id) { setResult({ status: 'invalid', message: 'Invalid QR / guest token' }); return } const data = getCheckins(); if (data[id]) { setResult({ status: 'used', message: 'Already checked in', id, time: data[id] }); return } data[id] = new Date().toISOString(); localStorage.setItem(checkinsKey, JSON.stringify(data)); setResult({ status: 'ok', message: 'ENTRY APPROVED', id, time: data[id] }) } return <div className="tool"><header><div className="brand">RUDRA <small>ENTRY CONTROL</small></div><a href="/">Invitation</a></header><h1>Volunteer Scanner</h1><p>Scan a guest's QR pass or enter the token manually.</p><button className="primary" onClick={() => { setResult(null); setActive(!active) }}><ScanLine /> {active ? 'Stop scanner' : 'Start QR scanner'}</button><div id="qr-reader" className={active ? 'scanner' : 'scanner hidden'} /><div className="manual"><input placeholder="Paste QR token" value={manual} onChange={e => setManual(e.target.value)} /><button onClick={() => verify(manual.trim())}>Verify</button></div>{result && <div className={`result ${result.status}`}><h2>{result.status === 'ok' ? '✓ ENTRY APPROVED' : result.status === 'used' ? '⚠ ALREADY CHECKED IN' : '✕ INVALID QR'}</h2><p>{result.message}</p>{result.id && <p><b>Guest ID:</b> {result.id}</p>}{result.time && <p><b>Time:</b> {new Date(result.time).toLocaleString()}</p>}<button onClick={() => { setResult(null); setManual('') }}>Scan next guest</button></div>}<a className="back" href="/admin">Admin dashboard</a></div> }
function Admin() { const [checkins, setCheckins] = useState(getCheckins()); useEffect(() => { const t = setInterval(() => setCheckins(getCheckins()), 1500); return () => clearInterval(t) }, []); const count = Object.keys(checkins).length; return <div className="tool"><header><div className="brand">RUDRA <small>ADMIN DASHBOARD</small></div><a href="/scanner">Scanner</a></header><h1>Event Check-in</h1><div className="stats"><div><small>INVITED</small><strong>250</strong></div><div><small>CHECKED IN</small><strong>{count}</strong></div><div><small>REMAINING</small><strong>{250 - count}</strong></div></div><div className="progress"><span style={{ width: `${count / 250 * 100}%` }} /></div><p>{(count / 250 * 100).toFixed(1)}% attendance recorded</p><h2>Guest list</h2><div className="list">{IDS.map(id => <div key={id}><span>{id}</span><span>{checkins[id] ? `Checked in · ${new Date(checkins[id]).toLocaleTimeString()}` : 'Not arrived'}</span><i className={checkins[id] ? 'yes' : 'no'}>{checkins[id] ? '✓' : '—'}</i></div>)}</div><button onClick={() => { if (confirm('Clear demo check-ins on this browser?')) { localStorage.removeItem(checkinsKey); setCheckins({}) } }}>Reset demo check-ins</button><p className="note">Demo version: check-ins are stored only in this browser. Connect a shared database before volunteers scan on multiple devices.</p><a className="back" href="/">Guest invitation</a></div> }
function App() { const path = location.pathname; return path.startsWith('/scanner') ? <Scanner /> : path.startsWith('/admin') ? <Admin /> : <Invitation /> } createRoot(document.getElementById('root')).render(<App />);
