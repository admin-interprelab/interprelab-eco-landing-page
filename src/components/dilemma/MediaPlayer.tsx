
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward, FileText, Activity } from 'lucide-react';

const TranscriptSegment = ({ time, text, active, onClick }: { time: string, text: string, active: boolean, onClick: () => void }) => (
    <div 
        onClick={onClick}
        className={`p-4 rounded-lg transition-colors cursor-pointer mb-2 ${active ? 'bg-stone-800 border border-nobel-gold/30' : 'hover:bg-stone-800/50 border border-transparent'}`}
    >
        <div className="text-xs text-nobel-gold font-mono mb-1">{time}</div>
        <p className={`text-sm leading-relaxed ${active ? 'text-white' : 'text-stone-400'}`}>{text}</p>
    </div>
);

export const AudioPlayer = () => {
    const [playing, setPlaying] = useState(false);
    const [currentTimeSec, setCurrentTimeSec] = useState(0);
    const durationSec = 287; // 04:47

    useEffect(() => {
        let interval: number;
        if (playing) {
            interval = setInterval(() => {
                setCurrentTimeSec((prev) => {
                    if (prev >= durationSec) {
                        setPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [playing]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const progress = (currentTimeSec / durationSec) * 100;

    // Transcript data with mapped seconds for synchronization
    const transcriptData = [
        { time: "00:00", seconds: 0, text: "Today, we're pulling back the curtain on a crisis that's hiding in plain sight, right inside the multi-billion dollar remote interpreting industry." },
        { time: "00:43", seconds: 43, text: "Behind that professional image—the crisp shirts, the headsets—there is a system that is increasingly treating these certified experts like they are completely disposable." },
        { time: "01:22", seconds: 82, text: "For the exact same critical call, professionals overseas are sometimes paid as little as 10 cents a minute." },
        { time: "02:53", seconds: 173, text: "The same agreement protects auto workers with a $16/hr minimum wage. But for interpreters? Nothing. Zero protection." },
        { time: "03:43", seconds: 223, text: "It creates this unstoppable downward pressure, a race to the bottom that's pulling the entire profession down with it." }
    ];

    const getActiveSegmentIndex = () => {
        // Find the segment that started most recently relative to current time
        for (let i = transcriptData.length - 1; i >= 0; i--) {
            if (currentTimeSec >= transcriptData[i].seconds) {
                return i;
            }
        }
        return -1;
    };

    const activeIndex = getActiveSegmentIndex();
    const transcriptRef = useRef<HTMLDivElement>(null);

    // Scroll active segment into view
    useEffect(() => {
        if (activeIndex >= 0 && transcriptRef.current) {
            const activeElement = transcriptRef.current.children[activeIndex + 1] as HTMLElement; // +1 to account for header
             if(activeElement) {
                // simple scroll logic could go here, omitting for simplicity/stability to avoid jarring jumps
             }
        }
    }, [activeIndex]);

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const width = bounds.width;
        const percentage = Math.max(0, Math.min(1, x / width));
        setCurrentTimeSec(Math.floor(percentage * durationSec));
    };

    const jumpToTime = (seconds: number) => {
        setCurrentTimeSec(seconds);
        if (!playing) setPlaying(true);
    };

    return (
        <div className="bg-[#1C1917] rounded-xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col h-[500px]">
            {/* Header / Visualization Area */}
            <div className="bg-gradient-to-br from-stone-900 to-stone-800 p-6 flex flex-col justify-end relative h-48 border-b border-stone-800">
                <div className="absolute top-4 right-4 text-xs font-bold text-stone-600 bg-stone-900 px-2 py-1 rounded border border-stone-800">EPISODE 1</div>
                <div className="relative z-10">
                    <h3 className="font-serif text-2xl text-white mb-2">The Interpreter's Dilemma</h3>
                    <p className="text-xs text-stone-400 font-mono tracking-widest uppercase">Investigative Report • 04:47</p>
                </div>
                
                {/* Fake Waveform */}
                <div className="flex items-end gap-1 h-12 mt-4 opacity-50">
                    {[...Array(40)].map((_, i) => (
                         <div 
                            key={i} 
                            className={`w-1 bg-nobel-gold rounded-t-sm transition-all duration-300 ${playing ? 'animate-pulse' : ''}`}
                            style={{ 
                                height: `${20 + Math.random() * 80}%`,
                                opacity: i / 40 
                            }}
                         />
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="p-4 border-b border-stone-800 bg-stone-900">
                <div className="flex items-center justify-between mb-4">
                     <span className="text-xs text-stone-500 font-mono w-10 text-right">{formatTime(currentTimeSec)}</span>
                     <div 
                        className="flex-1 mx-4 h-1 bg-stone-700 rounded-full relative cursor-pointer group"
                        onClick={handleSeek}
                     >
                        <div className="absolute left-0 top-0 bottom-0 bg-nobel-gold rounded-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
                        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transition-all duration-100 opacity-0 group-hover:opacity-100" style={{ left: `${progress}%` }}></div>
                     </div>
                     <span className="text-xs text-stone-500 font-mono w-10">04:47</span>
                </div>
                
                <div className="flex items-center justify-center gap-6">
                    <button 
                        className="text-stone-400 hover:text-white transition-colors"
                        onClick={() => setCurrentTimeSec(Math.max(0, currentTimeSec - 15))}
                    >
                        <SkipBack size={20} />
                    </button>
                    <button 
                        onClick={() => setPlaying(!playing)}
                        className="w-12 h-12 rounded-full bg-white text-stone-900 flex items-center justify-center hover:bg-nobel-gold hover:text-white transition-all shadow-lg"
                    >
                        {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                    </button>
                    <button 
                        className="text-stone-400 hover:text-white transition-colors"
                        onClick={() => setCurrentTimeSec(Math.min(durationSec, currentTimeSec + 15))}
                    >
                        <SkipForward size={20} />
                    </button>
                </div>
            </div>

            {/* Transcript Scroll */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[#1C1917]" ref={transcriptRef}>
                 <div className="flex items-center gap-2 mb-4 text-stone-500 text-xs font-bold uppercase tracking-widest sticky top-0 bg-[#1C1917] py-2 z-10">
                    <FileText size={12} /> Transcript Highlights
                 </div>
                 {transcriptData.map((t, i) => (
                    <TranscriptSegment 
                        key={i} 
                        time={t.time} 
                        text={t.text} 
                        active={i === activeIndex} 
                        onClick={() => jumpToTime(t.seconds)}
                    />
                 ))}
            </div>
        </div>
    );
};
