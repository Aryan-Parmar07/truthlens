import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Share2, Download, FileVideo, ShieldCheck, AlertOctagon, Check, Link as LinkIcon } from 'lucide-react';
import { Card, Badge, Button } from '../components/UI';

const Results = () => {
    const [searchParams] = useSearchParams();
    // Default to 'real' if no param, but allows our Hackathon secret button to work
    const outcome = searchParams.get('outcome') || 'real';
    const isFake = outcome === 'fake';

    const [watermarkEnabled, setWatermarkEnabled] = useState(false);
    const [downloading, setDownloading] = useState(false);

    // Mock download delay
    const handleDownload = () => {
        setDownloading(true);
        setTimeout(() => setDownloading(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <h2 className="text-3xl font-bold text-white">Verification Report</h2>
                        <Badge status={isFake ? 'deepfake' : 'verified'} />
                    </div>
                    <p className="text-zinc-500 text-sm font-mono">ID: SHA-256-8F92 • {new Date().toLocaleTimeString()}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" icon={Share2}>Share</Button>
                    <Button 
                        variant="primary" 
                        icon={downloading ? Check : Download} 
                        onClick={handleDownload}
                    >
                        {downloading ? "Downloaded" : "Export PDF"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* LEFT: Score & Action */}
                <div className="col-span-12 md:col-span-4 space-y-6">
                    <Card className="p-8 text-center relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-full h-1 ${isFake ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                        <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-6">Confidence Score</div>
                        <div className="relative inline-block">
                             <div className="text-8xl font-bold text-white tracking-tighter">
                                {isFake ? '12' : '98'}<span className="text-3xl text-zinc-600">%</span>
                             </div>
                        </div>
                        <p className="mt-6 text-zinc-400 text-sm leading-relaxed">
                            {isFake 
                                ? "Critical Alert: Synthetic patterns detected in facial landmarks." 
                                : "Success: No manipulation artifacts detected. Media is organic."}
                        </p>
                    </Card>

                    {/* Hackathon Feature: Trust Watermark */}
                    {!isFake && (
                        <Card className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-white font-semibold flex items-center gap-2">
                                        <ShieldCheck size={16} className="text-emerald-500"/> Trust Watermark
                                    </h3>
                                    <p className="text-zinc-500 text-xs mt-1">Embed a cryptographic seal.</p>
                                </div>
                                <div 
                                    className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${watermarkEnabled ? 'bg-emerald-500' : 'bg-zinc-800'}`}
                                    onClick={() => setWatermarkEnabled(!watermarkEnabled)}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${watermarkEnabled ? 'translate-x-4' : ''}`} />
                                </div>
                            </div>
                            <div className="h-32 bg-black rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center">
                                <span className="text-zinc-700 font-mono text-xs">PREVIEW_WINDOW</span>
                                {watermarkEnabled && (
                                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/80 backdrop-blur border border-emerald-500/30 px-2 py-1 rounded text-[10px] text-emerald-400 shadow-lg animate-in fade-in zoom-in">
                                        <ShieldCheck size={10} /> Verified by Proof.
                                    </div>
                                )}
                            </div>
                        </Card>
                    )}
                </div>

                {/* RIGHT: Evidence Panel */}
                <div className="col-span-12 md:col-span-8 space-y-6">
                    <Card className="p-0 overflow-hidden">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-zinc-900/30">
                            <h3 className="text-white text-sm font-semibold">Frame Analysis</h3>
                            {isFake ? (
                                <span className="text-[10px] bg-rose-500/10 text-rose-500 px-2 py-1 rounded border border-rose-500/20">3 Anomalies Found</span>
                            ) : (
                                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/20">All Frames Clear</span>
                            )}
                        </div>
                        <div className="grid grid-cols-3 gap-1 p-1 bg-[#111]">
                            {[1, 2, 3].map((frame) => (
                                <div key={frame} className="aspect-video bg-black relative group cursor-pointer overflow-hidden">
                                    <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                                        <FileVideo className="text-zinc-700 opacity-50" size={32} />
                                    </div>
                                    
                                    {/* Conditional Overlay */}
                                    {isFake ? (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white bg-rose-500/80 px-1.5 rounded">
                                                ANOMALY_{frame}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-500 group-hover:text-emerald-500 transition-colors">
                                            FRAME_{1420 + frame}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        {/* Timeline */}
                        <div className="p-4 bg-zinc-900/30 border-t border-white/5">
                             <div className="h-8 flex items-end gap-0.5">
                                {Array.from({length: 60}).map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`flex-1 rounded-sm ${isFake && Math.random() > 0.9 ? 'bg-rose-500 h-full' : 'bg-zinc-800 h-2'}`}
                                    />
                                ))}
                             </div>
                             <div className="flex justify-between mt-2 text-[10px] text-zinc-600 font-mono uppercase">
                                <span>00:00</span>
                                <span>{isFake ? 'Anomalies Detected' : 'Scan Complete'}</span>
                                <span>00:14</span>
                             </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Results;