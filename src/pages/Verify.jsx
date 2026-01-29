import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, Camera, ScanFace, Video, X, Zap } from 'lucide-react'; // Fixed imports
import { Card, Button } from '../components/UI';

// Local Badge component for this specific page style
const Badge = ({ children, color = "zinc" }) => (
    <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-white/10 bg-white/5 text-zinc-400">
        {children}
    </span>
);

const Verify = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('upload'); // 'upload' | 'camera'
    const [status, setStatus] = useState('idle'); // 'idle' | 'scanning'
    const [scanProgress, setScanProgress] = useState(0);
    const [demoResult, setDemoResult] = useState('real'); 
    
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);

    const startCamera = async () => {
        setMode('camera');
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            if (videoRef.current) videoRef.current.srcObject = mediaStream;
        } catch (err) {
            console.error("Camera denied:", err);
            alert("Camera access denied. Please allow permissions.");
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setMode('upload');
    };

    const startScan = useCallback((resultType = 'real') => {
        setDemoResult(resultType);
        setStatus('scanning');
        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            setScanProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    navigate(`/results/123?outcome=${resultType}`);
                    if (stream) {
                        stream.getTracks().forEach(track => track.stop());
                        setStream(null);
                    } 
                }, 500);
            }
        }, 40);
    }, [navigate, stream]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop: () => startScan('real') 
    });

    return (
        <div className="max-w-3xl mx-auto py-10 space-y-6">
            {status === 'idle' && (
                <div className="flex justify-center gap-4 mb-8">
                    <button 
                        onClick={stopCamera}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${mode === 'upload' ? 'bg-white text-black' : 'bg-white/5 text-zinc-400 hover:text-white'}`}
                    >
                        File Upload
                    </button>
                    <button 
                        onClick={startCamera}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${mode === 'camera' ? 'bg-white text-black' : 'bg-white/5 text-zinc-400 hover:text-white'}`}
                    >
                        <Camera size={16} /> Live Liveness
                    </button>
                </div>
            )}

            {status === 'idle' ? (
                mode === 'upload' ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        {...getRootProps()} 
                        className={`relative border border-dashed rounded-3xl h-96 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 group
                        ${isDragActive ? 'border-white bg-white/5' : 'border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900'}`}
                    >
                        <input {...getInputProps()} />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                        
                        <div className="z-10 flex flex-col items-center space-y-6">
                            <div className="w-20 h-20 bg-[#111] rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                <UploadCloud size={32} className="text-white" />
                            </div>
                            <div className="text-center">
                                <h2 className="text-xl font-semibold text-white mb-2">Upload Evidence</h2>
                                <p className="text-zinc-500 text-sm max-w-xs mx-auto">Drop MP4, MOV, or AVI files.</p>
                            </div>
                            
                            {/* DEMO BUTTONS */}
                            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                <Button variant="primary" onClick={() => startScan('real')}>Verify (Real)</Button>
                                <button onClick={() => startScan('fake')} className="px-3 py-2 text-[10px] text-zinc-600 hover:text-rose-500 font-mono opacity-50 hover:opacity-100">
                                    [DEV: FAKE]
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-96 bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                         <video 
                            ref={videoRef} 
                            autoPlay 
                            muted 
                            playsInline 
                            className="w-full h-full object-cover opacity-80"
                            onLoadedMetadata={() => videoRef.current && videoRef.current.play()} 
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-64 h-64 border-2 border-white/20 rounded-full flex items-center justify-center relative">
                                <ScanFace size={48} className="text-white/20" />
                            </div>
                        </div>
                        <div className="absolute bottom-8 inset-x-0 flex justify-center gap-4 z-20">
                             <Button variant="primary" onClick={() => startScan('real')}>Scan Face</Button>
                        </div>
                    </motion.div>
                )
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Card className="h-96 flex flex-col items-center justify-center relative bg-black/80 backdrop-blur-xl border-emerald-500/20">
                        <div className="relative w-40 h-40 mb-8">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="#333" strokeWidth="6" fill="transparent" />
                                <circle 
                                    cx="80" cy="80" r="70" 
                                    stroke={demoResult === 'fake' ? '#f43f5e' : '#10b981'} 
                                    strokeWidth="6" 
                                    fill="transparent" 
                                    strokeDasharray="440" 
                                    strokeDashoffset={440 - (440 * scanProgress) / 100} 
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-white">{scanProgress}%</span>
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-white text-xl font-medium animate-pulse">
                                {scanProgress < 50 ? 'Extracting Frames...' : 'Detecting Artifacts...'}
                            </h3>
                            <div className="flex gap-2 justify-center mt-4">
                                <Badge>{mode === 'camera' ? 'LIVE FEED' : 'VIDEO FILE'}</Badge>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
};

export default Verify;