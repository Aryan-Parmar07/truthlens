import React from 'react';
import { Copy, Terminal } from 'lucide-react';
import { Card, Button, Badge } from '../components/UI';

const ApiAccess = () => {
    return (
        <div className="max-w-4xl space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Developer API</h2>
                <Badge status="active" />
            </div>

            <Card className="p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-white font-semibold">Production Secret Key</h3>
                        <p className="text-zinc-500 text-sm">Use this key to authenticate requests from your backend.</p>
                    </div>
                    <Button variant="danger">Roll Key</Button>
                </div>
                <div className="bg-black border border-white/10 p-4 rounded-lg flex justify-between items-center mb-6 font-mono text-sm">
                    <code className="text-emerald-500">pk_live_892348_truthlens_v2_x9s</code>
                    <Button variant="ghost" icon={Copy} className="h-8 w-8 p-0" />
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <div className="text-zinc-500 text-xs uppercase mb-1">Rate Limit</div>
                        <div className="text-white text-xl font-bold">1,000 <span className="text-sm font-normal text-zinc-500">req/min</span></div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <div className="text-zinc-500 text-xs uppercase mb-1">Monthly Usage</div>
                        <div className="text-white text-xl font-bold">14,291 <span className="text-sm font-normal text-zinc-500">reqs</span></div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <div className="text-zinc-500 text-xs uppercase mb-1">Errors</div>
                        <div className="text-emerald-500 text-xl font-bold">0.01%</div>
                    </div>
                </div>
            </Card>

            <Card className="p-0 overflow-hidden">
                <div className="p-4 bg-zinc-900 border-b border-white/5 flex items-center gap-2">
                    <Terminal size={14} className="text-zinc-400" />
                    <span className="text-xs text-zinc-400 font-mono">Quick Start</span>
                </div>
                <div className="p-6 bg-black font-mono text-xs text-zinc-300 overflow-x-auto">
                    <span className="text-purple-400">curl</span> -X POST https://api.truthlens.ai/v1/verify \<br/>
                    &nbsp;&nbsp;-H <span className="text-green-400">"Authorization: Bearer pk_live_..."</span> \<br/>
                    &nbsp;&nbsp;-F <span className="text-green-400">"file=@video.mp4"</span>
                </div>
            </Card>
        </div>
    );
};

export default ApiAccess;