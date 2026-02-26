'use client';

import { useState, useEffect } from 'react';
import {
    Users, Package, Store, Activity,
    Settings, ShieldAlert, CheckCircle2,
    Search, Filter, ExternalLink, RefreshCcw, Percent, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const MOCK_PLATFORM_STATS = [
    { label: 'Total Users', value: '1,280', delta: '+45 this week', icon: Users, color: 'text-primary' },
    { label: 'Total Products', value: '4,500', delta: '+120 new', icon: Package, color: 'text-secondary' },
    { label: 'Approved Suppliers', value: '85', delta: '4 pending', icon: Store, color: 'text-success' },
    { label: 'Weekly GMV', value: '$850k', delta: '+15%', icon: Activity, color: 'text-accent' },
];

// PENDING_APPROVALS mock removed, fetching dynamically below

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('users');
    const [pendingUsers, setPendingUsers] = useState<any[]>([]);
    const [pendingProducts, setPendingProducts] = useState<any[]>([]);
    const [approvedProducts, setApprovedProducts] = useState<any[]>([]);
    const [markup, setMarkup] = useState<number>(1.05);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('bev-token');
            const headers = { Authorization: `Bearer ${token}` };

            // Fetch Pending Users
            const usersRes = await fetch('http://localhost:3005/users?status=PENDING_APPROVAL', { headers });
            if (usersRes.ok) {
                const data = await usersRes.json();
                setPendingUsers(data.filter((u: any) => u.role !== 'ADMIN'));
            }

            // Fetch All Products
            const productsRes = await fetch('http://localhost:3005/admin/config/all-products', { headers });
            if (productsRes.ok) {
                const data = await productsRes.json();
                setPendingProducts(data.filter((p: any) => p.status === 'PENDING'));
                setApprovedProducts(data.filter((p: any) => p.status === 'APPROVED'));
            }

            // Fetch Markup
            const markupRes = await fetch('http://localhost:3005/admin/config/markup', { headers });
            if (markupRes.ok) {
                const data = await markupRes.json();
                setMarkup(data.markup);
            }
        } catch (err) {
            console.error('Failed to fetch dashboard data', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateMarkup = async () => {
        if (!confirm(`Update global markup rating to ${markup}?`)) return;
        try {
            const token = localStorage.getItem('bev-token');
            await fetch('http://localhost:3005/admin/config/markup', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ percentage: markup })
            });
            alert('Markup updated successfully');
        } catch (e) {
            alert('Failed to update markup');
        }
    };

    const handleApproveProduct = async (id: string) => {
        try {
            const token = localStorage.getItem('bev-token');
            const res = await fetch(`http://localhost:3005/admin/config/products/${id}/approve`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const updatedProduct = pendingProducts.find(p => p.id === id);
                setPendingProducts(prev => prev.filter(p => p.id !== id));
                if (updatedProduct) setApprovedProducts(prev => [{ ...updatedProduct, status: 'APPROVED' }, ...prev]);
            }
        } catch (e) {
            alert('Failed to approve');
        }
    };

    const handleRejectProduct = async (id: string) => {
        const reason = prompt('Reason for rejection:');
        if (!reason) return;
        try {
            const token = localStorage.getItem('bev-token');
            const res = await fetch(`http://localhost:3005/admin/config/products/${id}/reject`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ reason })
            });
            if (res.ok) {
                setPendingProducts(prev => prev.filter(p => p.id !== id));
            }
        } catch (e) {
            alert('Failed to reject');
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-poppins font-black tracking-tight">Platform Governance</h1>
                    <p className="text-foreground/60">Global control panel for users, inventory, and system health.</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={fetchDashboardData} variant="outline" className="rounded-full gap-2 border-foreground/10 hover:bg-primary/5 hover:text-primary transition-all group">
                        <RefreshCcw className={cn("w-4 h-4", isLoading && "animate-spin text-primary")} />
                        Sync Data
                    </Button>
                    <Button className="rounded-full gap-2 shadow-xl shadow-destructive/20 bg-destructive hover:bg-destructive/90 text-white">
                        <ShieldAlert className="w-4 h-4" />
                        System Logs
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_PLATFORM_STATS.map((stat, i) => (
                    <div key={i} className="bg-surface border border-border/50 p-6 rounded-[2rem] hover:shadow-xl transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center transition-transform group-hover:scale-110")}>
                                <stat.icon className={cn("w-5 h-5", stat.color)} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-success">{stat.delta}</span>
                        </div>
                        <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest leading-none">{stat.label}</p>
                        <p className="text-3xl font-black mt-2">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Pending Actions */}
                <div className="lg:col-span-2 bg-surface border border-border/50 rounded-[2.5rem] overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-border/50 flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-success" />
                            Approval Queue
                        </h2>
                        <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-full">
                            {['users', 'products', 'approved', 'settings'].map(tab => (
                                <button
                                    key={tab}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tight transition-all",
                                        activeTab === tab ? "bg-white text-foreground shadow-sm" : "text-foreground/40 hover:text-foreground"
                                    )}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="divide-y divide-border/50 min-h-[200px] relative">
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-surface/50 backdrop-blur-sm z-10">
                                <div className="animate-spin text-primary">
                                    <RefreshCcw className="w-8 h-8" />
                                </div>
                            </div>
                        )}

                        {activeTab === 'users' && pendingUsers.length === 0 && !isLoading && (
                            <div className="p-12 text-center text-foreground/40 font-bold">
                                No pending users found.
                            </div>
                        )}
                        {activeTab === 'users' && pendingUsers.map((user) => (
                            <div key={user.id} className="p-8 flex items-center justify-between hover:bg-muted/10 transition-colors group relative">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center font-black text-foreground/40 text-xs shadow-inner overflow-hidden">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            user.role?.[0]?.toUpperCase() || 'U'
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{user.name || user.email}</h3>
                                        <div className="flex items-center gap-2 text-xs text-foreground/40 mt-1">
                                            <Badge variant="outline" className="text-[10px] font-mono">{user.role}</Badge>
                                            <span>•</span>
                                            <span>{user.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant="accent" className="animate-pulse">{user.status.replace('_', ' ')}</Badge>
                                    <Button variant="outline" size="sm" className="rounded-full px-5 h-10 font-black border-foreground/10 hover:bg-primary/5 hover:text-primary transition-all">Review</Button>
                                </div>
                            </div>
                        ))}

                        {activeTab === 'products' && pendingProducts.length === 0 && !isLoading && (
                            <div className="p-12 text-center text-foreground/40 font-bold">
                                No pending products found.
                            </div>
                        )}
                        {activeTab === 'products' && pendingProducts.map((product) => (
                            <div key={product.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-muted/10 transition-colors group relative gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center overflow-hidden border border-border/50 bg-white">
                                        {product.images?.length > 0 ? (
                                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                                        ) : (
                                            <Package className="w-6 h-6 text-foreground/20" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{product.name}</h3>
                                        <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/40 mt-1">
                                            <Badge variant="outline" className="text-[10px]">{product.category}</Badge>
                                            <span className="font-mono text-primary">${product.price} (/w markup)</span>
                                            <span>Stock: {product.stock}</span>
                                        </div>
                                        {product.adminNotes && (
                                            <p className="flex items-center gap-1 text-[11px] text-destructive/80 font-bold mt-2 bg-destructive/10 px-2 py-1 rounded w-fit">
                                                <AlertCircle size={12} /> {product.adminNotes}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button onClick={() => handleApproveProduct(product.id)} size="sm" className="bg-success text-success-foreground hover:bg-success/90 rounded-full px-6 font-black h-10">
                                        Approve
                                    </Button>
                                    <Button onClick={() => handleRejectProduct(product.id)} variant="outline" size="sm" className="rounded-full px-6 text-destructive border-destructive/20 hover:bg-destructive/10 font-black h-10">
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {activeTab === 'approved' && approvedProducts.length === 0 && !isLoading && (
                            <div className="p-12 text-center text-foreground/40 font-bold">
                                No approved products found.
                            </div>
                        )}
                        {activeTab === 'approved' && approvedProducts.map((product) => (
                            <div key={product.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-muted/10 transition-colors group relative gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center overflow-hidden border border-border/50 bg-white">
                                        {product.images?.length > 0 ? (
                                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                                        ) : (
                                            <Package className="w-6 h-6 text-foreground/20" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{product.name}</h3>
                                        <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/40 mt-1">
                                            <Badge variant="outline" className="text-[10px]">{product.category}</Badge>
                                            <span className="font-mono text-primary">${product.price} (Live Price)</span>
                                            <span>Stock: {product.stock}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="bg-success/10 text-success border-success/20 animate-pulse h-10 px-4">APPROVED</Badge>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.open(`/categories?q=${encodeURIComponent(product.name)}`, '_blank')}
                                        className="rounded-full px-5 h-10 font-black border-foreground/10 hover:bg-primary/5 hover:text-primary transition-all flex items-center gap-2"
                                    >
                                        <ExternalLink size={16} /> View Listing
                                    </Button>
                                    <Button onClick={() => handleRejectProduct(product.id)} variant="outline" size="sm" className="rounded-full px-6 text-destructive border-destructive/20 hover:bg-destructive/10 font-black h-10">
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {activeTab === 'settings' && (
                            <div className="p-8 space-y-8 max-w-2xl">
                                <div>
                                    <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                                        <Percent className="w-5 h-5 text-primary" />
                                        Global Markup Percentage
                                    </h3>
                                    <p className="text-sm text-foreground/40 mb-6">
                                        This percentage is multiplied against supplier prices when they create products or offers. 1.05 = 5%, 1.25 = 25%.
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={markup}
                                            onChange={(e) => setMarkup(parseFloat(e.target.value))}
                                            className="h-12 bg-background border border-border rounded-xl px-4 font-black w-40 text-lg"
                                        />
                                        <Button onClick={handleUpdateMarkup} className="h-12 px-8 rounded-xl font-black">Save Configuration</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {pendingUsers.length > 5 && activeTab === 'users' && (
                        <div className="p-6 bg-muted/10 text-center border-t border-border/50">
                            <Button variant="ghost" className="text-primary font-bold text-sm hover:scale-105 transition-transform">View full audit queue ({pendingUsers.length - 5} more)</Button>
                        </div>
                    )}
                </div>

                {/* System Health / Shortcuts */}
                <div className="space-y-6">
                    <div className="bg-surface border border-border/50 p-8 rounded-[2.5rem] space-y-6">
                        <h3 className="text-xl font-bold">System Status</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Payment API', status: 'Healthy', color: 'bg-success' },
                                { name: 'Excel Engine', status: 'Healthy', color: 'bg-success' },
                                { name: 'Prisma DB', status: 'Healthy', color: 'bg-success' },
                                { name: 'Mail Server', status: 'Degraded', color: 'bg-accent' },
                            ].map(sys => (
                                <div key={sys.name} className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-foreground/60">{sys.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-foreground/40">{sys.status}</span>
                                        <div className={cn("w-2 h-2 rounded-full", sys.color)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full rounded-2xl h-12 border-foreground/10">Run Diagnostics</Button>
                    </div>

                    <div className="bg-surface border border-border/50 p-8 rounded-[2.5rem] space-y-4">
                        <h3 className="text-xl font-bold">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="ghost" className="h-20 flex-col rounded-2xl border border-border/50 hover:bg-primary/5 hover:text-primary gap-1">
                                <Users className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase">Users</span>
                            </Button>
                            <Button variant="ghost" className="h-20 flex-col rounded-2xl border border-border/50 hover:bg-secondary/5 hover:text-secondary gap-1">
                                <Package className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase">Catalog</span>
                            </Button>
                            <Button variant="ghost" className="h-20 flex-col rounded-2xl border border-border/50 hover:bg-success/5 hover:text-success gap-1">
                                <Filter className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase">Filters</span>
                            </Button>
                            <Button variant="ghost" className="h-20 flex-col rounded-2xl border border-border/50 hover:bg-accent/5 hover:text-accent gap-1">
                                <Settings className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase">Settings</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
