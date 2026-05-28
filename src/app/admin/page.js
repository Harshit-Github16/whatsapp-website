"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Settings,
  Layers,
  Type,
  Image as ImageIcon,
  FileText,
  Check,
  LogOut,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Plus,
  Trash,
  Globe,
  RefreshCw,
  Palette,
  Eye,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Sparkles
} from "lucide-react";

export default function AdminDashboard() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Business data states
  const [businessData, setBusinessData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Editor navigation state
  const [activeTab, setActiveTab] = useState("general"); // general, theme, sections, content, images

  // New item helpers
  const [newService, setNewService] = useState("");

  // Preview Iframe key to force reload
  const [previewKey, setPreviewKey] = useState(0);

  // Check existing session on load
  useEffect(() => {
    // Check if business data exists in localStorage or check server session
    const saved = localStorage.getItem("whatssite_admin_business");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBusinessData(parsed);
        setOriginalData(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem("whatssite_admin_business");
      }
    }
  }, []);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginPhone.trim()) return;

    if (loginPhone.trim() !== loginPassword.trim()) {
      setAuthError("Incorrect password. Password must match your phone number.");
      return;
    }

    setAuthError("");
    setAuthLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: loginPhone })
      });

      const data = await res.json();

      if (res.ok) {
        setBusinessData(data.business);
        setOriginalData(data.business);
        localStorage.setItem("whatssite_admin_business", JSON.stringify(data.business));
        setIsAuthenticated(true);
      } else {
        setAuthError(data.error || "Login failed. Please check your number.");
      }
    } catch (err) {
      setAuthError("Network error. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {}
    localStorage.removeItem("whatssite_admin_business");
    setBusinessData(null);
    setOriginalData(null);
    setIsAuthenticated(false);
  };

  // Handle Input Changes
  const handleInputChange = (field, value) => {
    setBusinessData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle Save
  const handleSave = async () => {
    setSaveLoading(true);
    setSaveMessage("");

    try {
      const res = await fetch("/api/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...businessData,
          isPublished: true // ensure it stays published
        })
      });

      const data = await res.json();

      if (res.ok) {
        setBusinessData(data.business);
        setOriginalData(data.business);
        localStorage.setItem("whatssite_admin_business", JSON.stringify(data.business));
        setSaveMessage("✅ Changes saved & published successfully!");
        // Force preview iframe refresh
        setPreviewKey(prev => prev + 1);
        setTimeout(() => setSaveMessage(""), 4000);
      } else {
        setSaveMessage("❌ Error saving changes: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setSaveMessage("❌ Network error saving changes.");
    } finally {
      setSaveLoading(false);
    }
  };

  // Handle Section Order Updates
  const moveSection = (index, direction) => {
    const currentOrder = [...(businessData.sectionOrder || ["home", "about", "services", "gallery", "testimonials", "contact"])];
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= currentOrder.length) return;

    // Swap items
    const temp = currentOrder[index];
    currentOrder[index] = currentOrder[targetIndex];
    currentOrder[targetIndex] = temp;

    handleInputChange("sectionOrder", currentOrder);
  };

  // Service Management
  const addService = () => {
    if (!newService.trim()) return;
    const currentServices = [...(businessData.services || [])];
    currentServices.push(newService.trim());
    handleInputChange("services", currentServices);
    setNewService("");
  };

  const removeService = (index) => {
    const currentServices = [...(businessData.services || [])];
    currentServices.splice(index, 1);
    handleInputChange("services", currentServices);
  };

  // Upload helpers (Base64 file compressor)
  const handleImageUpload = async (e, type, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show inline saving status
    setSaveMessage("⏳ Uploading image to cloud...");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64Data = reader.result;
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Data, folder: `whatssite/${type}` })
        });
        
        const data = await res.json();
        if (res.ok && data.url) {
          if (type === "logo") {
            handleInputChange("logoUrl", data.url);
          } else if (type === "hero") {
            handleInputChange("heroImageUrl", data.url);
          } else if (type === "gallery" && index !== null) {
            const currentGallery = [...(businessData.galleryUrls || [])];
            currentGallery[index] = data.url;
            handleInputChange("galleryUrls", currentGallery);
          } else if (type === "gallery_add") {
            const currentGallery = [...(businessData.galleryUrls || [])];
            if (currentGallery.length < 4) {
              currentGallery.push(data.url);
              handleInputChange("galleryUrls", currentGallery);
            } else {
              alert("Maximum 4 gallery images allowed.");
            }
          }
          setSaveMessage("✅ Image uploaded. Click Save to publish.");
        } else {
          setSaveMessage("❌ Image upload failed.");
        }
      } catch (err) {
        setSaveMessage("❌ Upload network error.");
      }
    };
  };

  const removeGalleryImage = (index) => {
    const currentGallery = [...(businessData.galleryUrls || [])];
    currentGallery.splice(index, 1);
    handleInputChange("galleryUrls", currentGallery);
  };

  // RENDER: Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden p-4">
        {/* Sleek background blobs */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-100/50 rounded-full blur-3xl opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-teal-100/40 rounded-full blur-3xl opacity-50 pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="w-full max-w-md bg-white border border-slate-200/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl relative z-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline mb-4">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to landing page
            </Link>
            <div className="w-16 h-16 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-center text-brand-green mx-auto mb-4 shadow-sm">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">WhatsSite Admin Panel</h1>
            <p className="text-xs text-slate-550 font-medium mt-2">Enter your phone number & password to edit your website</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Phone Number</label>
              <input
                type="text"
                required
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                placeholder="e.g. 9928005564"
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-green text-slate-900 text-sm font-semibold rounded-2xl px-5 py-3.5 focus:outline-none transition-colors placeholder-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-green text-slate-900 text-sm font-semibold rounded-2xl px-5 py-3.5 focus:outline-none transition-colors placeholder-slate-400"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-650 font-bold bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                ⚠️ {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-brand-green hover:bg-brand-green-hover text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-brand-green/20 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="text-center text-[10px] text-slate-400 font-semibold mt-8">
            🔒 Secured dashboard session. Use the phone number linked to your website.
          </p>
        </div>
      </div>
    );
  }

  const sectionLabels = {
    home: "Hero Header",
    about: "About Story",
    services: "Key Services",
    gallery: "Business Gallery",
    testimonials: "Client Reviews",
    contact: "Inquiry & Map"
  };

  // RENDER: Dashboard Editor
  return (
    <div className="h-screen w-screen bg-slate-50 flex flex-col font-sans text-slate-700 overflow-hidden">
      
      {/* Top Header */}
      <header className="h-[65px] border-b border-slate-200 px-6 flex items-center justify-between bg-white shrink-0 relative z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-green/10 border border-brand-green/20 rounded-xl flex items-center justify-center text-brand-green font-black shadow-sm">
            W
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-900 leading-snug flex items-center gap-2">
              {businessData.businessName}
              <span className="bg-emerald-50 text-brand-green text-[9px] font-black px-2 py-0.5 rounded border border-emerald-255 uppercase tracking-wider">Editor Mode</span>
            </h1>
            <span className="text-[10px] text-slate-500 font-semibold block leading-none mt-0.5">
              Live Website: <a href={`/${originalData?.slug || businessData.slug}`} target="_blank" className="text-brand-green hover:underline">whatssite.in/{originalData?.slug || businessData.slug}</a>
            </span>
          </div>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-4">
          {saveMessage && (
            <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm animate-fade-in">
              {saveMessage}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saveLoading}
            className="bg-brand-green hover:bg-brand-green-hover text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
          >
            {saveLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            Save &amp; Publish
          </button>
          <button
            onClick={handleLogout}
            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Workspace: 2-Column Grid */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Settings Sidebar Editor (Scrollable) */}
        <div className="w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col shrink-0">
          
          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-200 px-2 py-1.5 gap-1 shrink-0 bg-white shadow-sm">
            {[
              { id: "general", label: "General", icon: Settings },
              { id: "theme", label: "Theme", icon: Palette },
              { id: "sections", label: "Sections", icon: Layers },
              { id: "content", label: "Content", icon: FileText },
              { id: "images", label: "Images", icon: ImageIcon }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-[10px] font-bold tracking-wide transition-all cursor-pointer ${
                  activeTab === id
                    ? "bg-slate-105 text-slate-900 shadow-inner"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Form scroll container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* TAB 1: General Info */}
            {activeTab === "general" && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2"><Settings className="w-4 h-4 text-brand-green" /> General Settings</h3>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1">Configure your primary business profile details</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Business Name</label>
                    <input
                      type="text"
                      value={businessData.businessName || ""}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 focus:outline-none transition-colors shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                      Website URL Slug <span className="text-slate-400 font-normal">(Address)</span>
                    </label>
                    <div className="flex rounded-xl shadow-sm overflow-hidden border border-slate-205 focus-within:border-brand-green transition-colors bg-white">
                      <span className="bg-slate-100 text-slate-500 text-[11px] font-bold px-3 flex items-center border-r border-slate-200 select-none">
                        whatssite.in/
                      </span>
                      <input
                        type="text"
                        value={businessData.slug || ""}
                        onChange={(e) => {
                          const val = e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-');
                          handleInputChange("slug", val);
                        }}
                        className="flex-1 bg-white text-slate-900 text-xs font-semibold px-3 py-3 focus:outline-none"
                        placeholder="my-url-slug"
                      />
                    </div>
                    <p className="text-[9px] text-slate-400 font-bold">
                      ⚠️ Note: Changing your slug will change your website address instantly.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Owner / Manager Name</label>
                    <input
                      type="text"
                      value={businessData.ownerName || ""}
                      onChange={(e) => handleInputChange("ownerName", e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 focus:outline-none transition-colors shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Business Category</label>
                    <input
                      type="text"
                      value={businessData.category || ""}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 focus:outline-none transition-colors shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                    <input
                      type="text"
                      value={businessData.phone || ""}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 focus:outline-none transition-colors shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Support</label>
                    <input
                      type="email"
                      value={businessData.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 focus:outline-none transition-colors shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Office Address</label>
                    <textarea
                      rows="3"
                      value={businessData.address || ""}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 focus:outline-none transition-colors resize-none shadow-sm"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Theme Layout Picker */}
            {activeTab === "theme" && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2"><Palette className="w-4 h-4 text-brand-green" /> Theme Layout</h3>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1">Select the styling and visual color preset of your page</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: "medical", label: "Medical & Health Care", desc: "Sleek blue & slate design for clinics and doctors", emoji: "🦷" },
                    { id: "gym", label: "Gym & Fitness Club", desc: "Aggressive styling with bold contrasts for high energy", emoji: "🏋️‍♂️" },
                    { id: "restaurant", label: "Restaurant & Bistro", desc: "Warm stone-white & amber layout for bakeries & food hubs", emoji: "☕" },
                    { id: "salon", label: "Salon & Spa Sanctuary", desc: "Soft blush-white & pink layout for grooming centers", emoji: "✨" },
                    { id: "realestate", label: "Real Estate Brokerage", desc: "Modern clean & teal preset for property agencies", emoji: "🏢" }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleInputChange("theme", t.id)}
                      className={`p-4.5 rounded-2xl border text-left flex items-start gap-4 transition-all cursor-pointer ${
                        businessData.theme === t.id
                          ? "bg-emerald-50 border-brand-green text-slate-900 shadow-md shadow-brand-green/5"
                          : "bg-white border-slate-200 hover:border-slate-350 text-slate-550"
                      }`}
                    >
                      <span className="text-3xl filter drop-shadow">{t.emoji}</span>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900 capitalize">{t.label}</h4>
                        <p className="text-[9.5px] text-slate-500 font-semibold mt-1 leading-normal">{t.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Section Reordering */}
            {activeTab === "sections" && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2"><Layers className="w-4 h-4 text-brand-green" /> Section Ordering</h3>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1">Reorder the layout sections of your website instantly</p>
                </div>

                <div className="space-y-3">
                  {(businessData.sectionOrder || ["home", "about", "services", "gallery", "testimonials", "contact"]).map((section, idx, arr) => (
                    <div
                      key={section}
                      className="bg-white border border-slate-200 rounded-2xl px-5 py-4.5 flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-50 border border-slate-205 flex items-center justify-center text-[10px] font-black text-slate-500">{idx + 1}</span>
                        <span className="text-xs font-bold text-slate-900 capitalize">{sectionLabels[section] || section}</span>
                      </div>

                      {/* Direction controls */}
                      <div className="flex gap-1">
                        <button
                          onClick={() => moveSection(idx, -1)}
                          disabled={idx === 0}
                          className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-sm"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveSection(idx, 1)}
                          disabled={idx === arr.length - 1}
                          className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-sm"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Content Editor (About, Services) */}
            {activeTab === "content" && (
              <div className="space-y-6 animate-fade-in">
                
                {/* About Editor */}
                <div className="space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2"><FileText className="w-4 h-4 text-brand-green" /> About Us Story</h3>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Story bio description</label>
                    <textarea
                      rows="6"
                      value={businessData.about || ""}
                      onChange={(e) => handleInputChange("about", e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 focus:outline-none transition-colors resize-none leading-relaxed shadow-sm"
                    ></textarea>
                  </div>
                </div>

                {/* Services Editor */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2"><Sparkles className="w-4 h-4 text-brand-green" /> Key Services</h3>
                  </div>

                  {/* Add service form */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Teeth Whitening"
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      className="flex-1 bg-white border border-slate-200 focus:border-brand-green text-slate-900 text-xs font-semibold rounded-xl px-4 py-2.5 focus:outline-none shadow-sm"
                    />
                    <button
                      onClick={addService}
                      className="bg-brand-green hover:bg-brand-green-hover text-white px-4.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>

                  {/* Services listing */}
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {(businessData.services || []).map((service, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-slate-900 shadow-sm"
                      >
                        <span className="font-semibold">{service}</span>
                        <button
                          onClick={() => removeService(idx)}
                          className="text-slate-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {(businessData.services || []).length === 0 && (
                      <p className="text-center text-[10px] text-slate-500 py-4 font-semibold">No custom services. Default template services will load.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Images & Uploads (Logo, Banner, Gallery) */}
            {activeTab === "images" && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2"><ImageIcon className="w-4 h-4 text-brand-green" /> Images &amp; Cloud Uploads</h3>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1">Upload and compress images using Cloudinary integration</p>
                </div>

                {/* Logo Editor */}
                <div className="space-y-3.5 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Business Logo</span>
                  {businessData.logoUrl && (
                    <div className="relative w-16 h-16 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center p-1">
                      <img src={businessData.logoUrl} alt="Logo" className="w-full h-full object-contain rounded" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "logo")}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200 file:cursor-pointer"
                  />
                </div>

                {/* Hero Banner Editor */}
                <div className="space-y-3.5 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Hero Header Banner</span>
                  {businessData.heroImageUrl && (
                    <div className="relative aspect-[16/9] rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                      <img src={businessData.heroImageUrl} alt="Hero" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "hero")}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200 file:cursor-pointer"
                  />
                </div>

                {/* Gallery Images Editor (Up to 4 images) */}
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Business Gallery (Max 4)</span>
                    <span className="text-[10px] text-slate-500 font-bold">{(businessData.galleryUrls || []).length}/4</span>
                  </div>

                  {/* Add gallery image slot */}
                  {(businessData.galleryUrls || []).length < 4 && (
                    <div className="p-3 border border-dashed border-slate-200 rounded-2xl bg-white shadow-sm">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "gallery_add")}
                        className="block w-full text-xs text-slate-505 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200 file:cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Gallery grid listing */}
                  <div className="grid grid-cols-2 gap-3.5">
                    {(businessData.galleryUrls || []).map((url, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[4/3] rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 group"
                      >
                        <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute top-2 right-2 w-7 h-7 bg-red-655/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow cursor-pointer"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Save Button sticky in settings sidebar */}
          <div className="p-4 bg-white border-t border-slate-200 flex flex-col gap-2 shrink-0 shadow-lg">
            <button
              onClick={handleSave}
              disabled={saveLoading}
              className="w-full bg-brand-green hover:bg-brand-green-hover text-white py-4.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-green/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {saveLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              Save Changes
            </button>
          </div>

        </div>

        {/* Right Side: Live Iframe Website Preview */}
        <div className="flex-1 bg-slate-100 flex flex-col relative h-full">
          
          {/* Preview Navigation Header */}
          <div className="h-[45px] bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 text-xs font-bold text-slate-550 shadow-sm">
            <span className="flex items-center gap-2 text-slate-700">
              <Eye className="w-4 h-4 text-brand-green animate-pulse" /> Live Website Preview
            </span>
            <div className="flex gap-4">
              <button
                onClick={() => setPreviewKey(prev => prev + 1)}
                className="hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer text-slate-550"
                title="Refresh preview frame"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refresh Preview
              </button>
               <a
                href={`/${originalData?.slug || businessData.slug}`}
                target="_blank"
                className="text-brand-green hover:text-brand-green-hover flex items-center gap-1 transition-all"
              >
                Open Tab <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Iframe Preview container */}
          <div className="flex-1 bg-slate-100 p-6 flex justify-center items-center overflow-hidden">
            {/* Classy Device Mock wrapper */}
            <div className="w-full h-full max-w-[1080px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
              <iframe
                key={previewKey}
                src={`/${originalData?.slug || businessData.slug}`}
                className="w-full h-full border-none select-none"
                title="Website live preview"
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
