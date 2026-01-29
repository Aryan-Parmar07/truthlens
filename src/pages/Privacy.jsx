import React from 'react';
import { ShieldCheck, Lock, Server } from 'lucide-react';
import { Card } from '../components/UI';

const Privacy = () => {
    return (
        <div className="max-w-4xl space-y-6">
            <h2 className="text-2xl font-bold text-white">Compliance & Privacy</h2>
            
            <div className="grid grid-cols-2 gap-6">
                <Card className="p-6 border-l-4 border-l-emerald-500">
                    <ShieldCheck size={32} className="text-emerald-500 mb-4" />
                    <h3 className="text-white font-semibold mb-2">Zero-Retention Policy</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                        We process video buffers strictly in-memory. Files are permanently purged from our GPU clusters immediately after analysis is complete.
                    </p>
                </Card>
                <Card className="p-6 border-l-4 border-l-blue-500">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold mb-4 text-xs">GDPR</div>
                    <h3 className="text-white font-semibold mb-2">GDPR & CCPA Ready</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                        Our data processing pipeline is fully compliant with EU and California data protection regulations.
                    </p>
                </Card>
            </div>

            <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Server size={20} className="text-zinc-400" />
                    <h3 className="text-white font-semibold">Data Processing Regions</h3>
                </div>
                <div className="space-y-4">
                    {['US East (N. Virginia)', 'EU West (Ireland)', 'Asia Pacific (Tokyo)'].map((region) => (
                        <div key={region} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <span className="text-sm text-zinc-300">{region}</span>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
                                <span className="text-xs text-emerald-500 font-medium">Operational</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Privacy;