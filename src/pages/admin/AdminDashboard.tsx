import { useState, useEffect } from 'react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { handleFirestoreError, OperationType } from '../../lib/firebase';
import { Utensils, Ticket, Eye, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    menuCount: 0,
    promoCount: 0,
    activePromos: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const menuSnap = await getCountFromServer(collection(db, 'menus'));
        const promoSnap = await getCountFromServer(collection(db, 'promos'));
        
        setStats({
          menuCount: menuSnap.data().count,
          promoCount: promoSnap.data().count,
          activePromos: promoSnap.data().count, // Simple mock for now
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
        handleFirestoreError(err, OperationType.GET, 'dashboard_stats');
      }
    }
    fetchStats();
  }, []);

  const chartData = [
    { name: 'Senin', orders: 45 },
    { name: 'Selasa', orders: 52 },
    { name: 'Rabu', orders: 38 },
    { name: 'Kamis', orders: 65 },
    { name: 'Jumat', orders: 85 },
    { name: 'Sabtu', orders: 120 },
    { name: 'Minggu', orders: 110 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-display">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome to your dashboard, here is what is happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mr-4">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Menu</p>
            <p className="text-2xl font-bold text-gray-900">{stats.menuCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mr-4">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Promos</p>
            <p className="text-2xl font-bold text-gray-900">{stats.activePromos}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mr-4">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Page Views</p>
            <p className="text-2xl font-bold text-gray-900">12,450</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mr-4">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">WA Clicks</p>
            <p className="text-2xl font-bold text-gray-900">1,240</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Weekly Order Intent (WhatsApp Clicks)</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
              <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="orders" fill="#d62828" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
