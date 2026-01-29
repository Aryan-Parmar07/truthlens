import React from 'react';
import { FileVideo, Search } from 'lucide-react';
import { Card, Badge, Button } from '../components/UI';
import { Link } from 'react-router-dom';

const History = () => {
  const history = [
    { id: '892', name: 'interview_clip.mp4', date: '2 mins ago', status: 'verified', score: 98 },
    { id: '891', name: 'ceo_announcement.mov', date: '1 hour ago', status: 'deepfake', score: 12 },
    { id: '890', name: 'cctv_footage_04.avi', date: '3 hours ago', status: 'verified', score: 94 },
    { id: '889', name: 'social_post_v2.mp4', date: 'Yesterday', status: 'suspicious', score: 45 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Verification History</h2>
        <div className="flex gap-2">
            <Button variant="outline" icon={Search}>Search...</Button>
        </div>
      </div>
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-white/5 text-zinc-500 text-xs uppercase font-mono border-b border-white/5">
                <tr>
                    <th className="px-6 py-4 font-medium">Filename</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Score</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
                {history.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-white font-medium flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded">
                                <FileVideo size={16} className="text-zinc-400"/>
                            </div>
                            {item.name}
                        </td>
                        <td className="px-6 py-4 text-zinc-500">{item.date}</td>
                        <td className="px-6 py-4"><Badge status={item.status} /></td>
                        <td className="px-6 py-4 text-white font-mono">{item.score}%</td>
                        <td className="px-6 py-4 text-right">
                            <Link to={`/results/${item.id}`} className="text-zinc-400 hover:text-white font-medium text-xs">View Report</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </Card>
    </div>
  );
};

export default History;