"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from "@/app/components/others_ui/admin/AdminSidebar";
import AdminHeader from "@/app/components/others_ui/admin/AdminHeader";
import { ChevronDown, Lock, Bell, PieChart, Shield, Globe, Users, Briefcase } from 'lucide-react';

const ToggleSwitch = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
    <button
        onClick={onToggle}
        className={`w-14 h-7 rounded-full transition-all relative ${active ? 'bg-[#A10602]' : 'bg-gray-200'}`}
    >
        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${active ? 'left-8' : 'left-1'}`} />
    </button>
);

const SettingsField = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="flex flex-col gap-2 w-full max-w-[600px]">
        <label className="text-[14px] font-bold text-[#333]">{label}</label>
        {children}
    </div>
);

const SettingsInput = ({ value, placeholder, type = "text", onChange }: { value?: string | number, placeholder?: string, type?: string, onChange?: (e: any) => void }) => (
    <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-[56px] bg-[#F5F5F7] border border-[#E6E6EB] rounded-xl px-6 text-[14px] font-black text-[#333] focus:ring-1 focus:ring-[#A10602] outline-none transition-shadow"
    />
);

const SettingsSelect = ({ value }: { value: string }) => (
    <div className="relative w-full max-w-[600px]">
        <button className="w-full h-[56px] bg-[#F5F5F7] border border-[#E6E6EB] rounded-xl px-6 flex items-center justify-between text-[14px] font-black text-[#333]">
            {value} <ChevronDown size={18} className="text-[#A0A0A0]" />
        </button>
    </div>
);

export default function SettingsScreen() {
    const [activeTab, setActiveTab] = useState('General');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Live Payload State matching the exact openapi.json SystemSettingsUpdateRequest shape
    const [settings, setSettings] = useState<any>({
        pricing: { minimum_fare: 100 },
        features: { 
            rider_registration_enabled: true, 
            driver_registration_enabled: true, 
            partner_registration_enabled: true,
            motorcycle_trips_enabled: true,
            car_trips_enabled: true,
            email_notifications: true,
            system_alerts: true,
            ticket_alerts: true,
            two_factor_auth: true
        },
        limits: {},
        commission: { platform_commission_percentage: 20 },
        configuration: {
            platform_name: 'AnyRide',
            default_currency: 'CDF',
            default_language: 'English',
            time_zone: 'UTC'
        }
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const token = localStorage.getItem('admin_token');
                if (!token) return;
                const res = await fetch('https://anyride.techenex.online/api/v1/admin/settings', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const json = await res.json();
                if (json.data) {
                    // Merge live backend payload over defaults
                    setSettings((prev: any) => ({
                        pricing: { ...prev.pricing, ...json.data.pricing },
                        features: { ...prev.features, ...json.data.features },
                        limits: { ...prev.limits, ...json.data.limits },
                        commission: { ...prev.commission, ...json.data.commission },
                        configuration: { ...prev.configuration, ...json.data.configuration }
                    }));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleFeatureToggle = (key: string) => {
        setSettings((prev: any) => ({
            ...prev,
            features: {
                ...prev.features,
                [key]: !prev.features[key]
            }
        }));
    };

    const handleNestedChange = (category: string, key: string, val: string | number) => {
        setSettings((prev: any) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: val
            }
        }));
    };

    const saveChanges = async () => {
        setIsSaving(true);
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch('https://anyride.techenex.online/api/v1/admin/settings', {
                method: 'PATCH',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(settings)
            });
            if (res.ok) {
                alert("Settings successfully saved to the backend!");
            } else {
                alert("Failed to save settings to the backend.");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: 'General', label: 'General', icon: Globe },
        { id: 'User & Access', label: 'User & Access', icon: Users },
        { id: 'Trip & Pricing', label: 'Trip & Pricing', icon: PieChart },
        { id: 'Notifications', label: 'Notifications', icon: Bell },
        { id: 'Security', label: 'Security', icon: Shield },
    ];

    return (
        <div className="flex min-h-screen bg-[#F5F5F7] font-sans">
            <AdminSidebar />
            <main className="flex-1 w-full lg:ml-[300px] p-4 sm:p-6 lg:p-8 pb-20 overflow-x-hidden">
                <AdminHeader />
                <div className="bg-white rounded-[32px] p-6 md:p-10 border border-[#E6E6EB] shadow-sm flex flex-col gap-10 min-h-[850px] overflow-hidden">

                    <h2 className="text-[32px] font-black text-[#0B153D] tracking-tight">Settings</h2>

                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Sidebar Tabs */}
                        <div className="w-full lg:w-[240px] shrink-0">
                            <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-3 px-8 py-4 rounded-full text-[14px] font-bold transition-all whitespace-nowrap
                                            ${activeTab === tab.id ? 'bg-[#FFF4F4] text-[#A10602] font-black shadow-sm' : 'text-[#A0A0A0] hover:bg-[#F5F5F7]'}
                                        `}
                                    >
                                        <tab.icon size={18} /> {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Settings Content Area */}
                        <div className="flex-1 flex flex-col gap-10 animate-in fade-in slide-in-from-right-4 duration-500">

                            {activeTab === 'General' && (
                                <div className="flex flex-col gap-8">
                                    <h3 className="text-[24px] font-black text-[#0B153D]">General Information</h3>
                                    <SettingsField label="Platform Name"><SettingsInput value={settings.configuration.platform_name} onChange={(e) => handleNestedChange('configuration', 'platform_name', e.target.value)} /></SettingsField>
                                    <SettingsField label="Default currency"><SettingsInput value={settings.configuration.default_currency} onChange={(e) => handleNestedChange('configuration', 'default_currency', e.target.value)} /></SettingsField>
                                    <SettingsField label="Default language"><SettingsInput value={settings.configuration.default_language} onChange={(e) => handleNestedChange('configuration', 'default_language', e.target.value)} /></SettingsField>
                                    <SettingsField label="Time Zone"><SettingsInput value={settings.configuration.time_zone} onChange={(e) => handleNestedChange('configuration', 'time_zone', e.target.value)} /></SettingsField>
                                </div>
                            )}

                            {activeTab === 'User & Access' && (
                                <div className="flex flex-col gap-8">
                                    <h3 className="text-[24px] font-black text-[#0B153D]">Control who can do what</h3>
                                    {[
                                        { label: 'Enable Rider registration', key: 'rider_registration_enabled' },
                                        { label: 'Enable Driver registration', key: 'driver_registration_enabled' },
                                        { label: 'Enable Partner registration', key: 'partner_registration_enabled' },
                                    ].map(item => (
                                        <div key={item.key} className="flex items-center justify-between max-w-[600px] py-2">
                                            <span className="text-[15px] font-bold text-[#333]">{item.label}</span>
                                            <ToggleSwitch active={!!settings.features[item.key]} onToggle={() => handleFeatureToggle(item.key)} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'Trip & Pricing' && (
                                <div className="flex flex-col gap-8">
                                    <h3 className="text-[24px] font-black text-[#0B153D]">Core business control</h3>
                                    <SettingsField label="Commission Percentage (%)">
                                        <SettingsInput type="number" value={settings.commission.platform_commission_percentage} onChange={(e) => handleNestedChange('commission', 'platform_commission_percentage', Number(e.target.value))} />
                                    </SettingsField>
                                    <SettingsField label="Minimum Trip Fare (CDF)">
                                        <SettingsInput type="number" value={settings.pricing.minimum_fare} onChange={(e) => handleNestedChange('pricing', 'minimum_fare', Number(e.target.value))} />
                                    </SettingsField>
                                    {[
                                        { label: 'Enable Motorcycle Trips', key: 'motorcycle_trips_enabled' },
                                        { label: 'Enable Car Trips', key: 'car_trips_enabled' },
                                    ].map(item => (
                                        <div key={item.key} className="flex items-center justify-between max-w-[600px] py-2">
                                            <span className="text-[15px] font-bold text-[#333]">{item.label}</span>
                                            <ToggleSwitch active={!!settings.features[item.key]} onToggle={() => handleFeatureToggle(item.key)} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'Notifications' && (
                                <div className="flex flex-col gap-8">
                                    <h3 className="text-[24px] font-black text-[#0B153D]">Control system alerts</h3>
                                    {[
                                        { label: 'Email notifications', key: 'email_notifications' },
                                        { label: 'System alerts', key: 'system_alerts' },
                                        { label: 'Support ticket alerts', key: 'ticket_alerts' },
                                    ].map(item => (
                                        <div key={item.key} className="flex items-center justify-between max-w-[600px] py-2">
                                            <span className="text-[15px] font-bold text-[#333]">{item.label}</span>
                                            <ToggleSwitch active={!!settings.features[item.key]} onToggle={() => handleFeatureToggle(item.key)} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'Security' && (
                                <div className="flex flex-col gap-8">
                                    <h3 className="text-[24px] font-black text-[#0B153D]">Protect Admin access</h3>
                                    <div className="flex flex-col gap-6">
                                        <h4 className="text-[16px] font-black text-[#333] uppercase tracking-wide">Change Password</h4>
                                        <SettingsField label="Enter old password"><SettingsInput type="password" placeholder="enter old password" /></SettingsField>
                                        <SettingsField label="Enter new password"><SettingsInput type="password" placeholder="enter new password" /></SettingsField>
                                        <SettingsField label="Confirm new password"><SettingsInput type="password" placeholder="Confirm new password" /></SettingsField>
                                    </div>
                                    <div className="flex items-center justify-between max-w-[600px] py-4 border-t border-[#F5F5F7] mt-4">
                                        <div className="flex flex-col">
                                            <span className="text-[16px] font-black text-[#333]">Change Password</span>
                                            <span className="text-[15px] font-bold text-[#333] mt-2">Enable 2FA</span>
                                        </div>
                                        <ToggleSwitch active={!!settings.features.two_factor_auth} onToggle={() => handleFeatureToggle('two_factor_auth')} />
                                    </div>
                                </div>
                            )}

                            {/* Sticky Footer for current tab */}
                            <div className="flex gap-4 mt-auto pt-10 max-w-[600px]">
                                <button className="flex-1 h-[56px] bg-[#F5F5F7] text-[#333] rounded-xl font-black text-[14px]">Cancel</button>
                                <button 
                                    onClick={saveChanges}
                                    disabled={isLoading || isSaving}
                                    className="flex-[2] h-[56px] bg-[#02093A] text-white rounded-xl font-black text-[14px] shadow-xl active:scale-95 transition-all outline-none"
                                >
                                    {isSaving ? 'Saving Configurations...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
