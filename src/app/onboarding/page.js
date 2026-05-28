"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Phone,
  Check,
  Globe,
  ArrowLeft,
  Send,
  Upload,
  Image as ImageIcon,
  Paperclip,
  Trash2,
  Video,
  Search,
  MoreVertical,
  MessageSquare,
  Sparkles
} from "lucide-react";

export default function Onboarding() {
  const [step, setStep] = useState("PHONE"); // PHONE -> OWNER_NAME -> NAME -> CATEGORY -> AI_DECISION -> ABOUT -> SERVICES -> LOGO -> HERO_IMAGE -> GALLERY -> EMAIL -> ADDRESS -> THEME -> PAYMENT -> COMPLETED
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPayingLoading, setIsPayingLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi there! 👋 Welcome to WhatsSite website builder. Let's create a premium website for your business in 5 minutes!",
      time: "10:30 AM"
    },
    {
      sender: "bot",
      text: "First, what is your WhatsApp/Phone Number?",
      time: "10:30 AM"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFetchingAi, setIsFetchingAi] = useState(false);
  const [aiGeneratedData, setAiGeneratedData] = useState(null); // { about, services }

  // Generated Site State
  const [siteData, setSiteData] = useState({
    businessName: "",
    ownerName: "",
    slug: "",
    category: "",
    about: "",
    services: [],
    logoUrl: "",
    heroImageUrl: "",
    galleryUrls: [], // array of base64 strings
    phone: "",
    email: "",
    address: "",
    theme: "medical",
  });

  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Refs for tracking state without closures
  const siteDataRef = useRef(siteData);
  const stepRef = useRef(step);
  const aiGeneratedDataRef = useRef(aiGeneratedData);

  // Sync refs with state changes
  useEffect(() => {
    siteDataRef.current = siteData;
  }, [siteData]);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    aiGeneratedDataRef.current = aiGeneratedData;
  }, [aiGeneratedData]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Load default/pre-existing onboarding if any
  useEffect(() => {
    const saved = localStorage.getItem("whatssite_current_build");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSiteData(parsed);
        siteDataRef.current = parsed;
      } catch (e) {
        console.error(e);
      }
    }

    const savedStep = localStorage.getItem("whatssite_current_step");
    if (savedStep) {
      setStep(savedStep);
      stepRef.current = savedStep;
    }

    const savedMessages = localStorage.getItem("whatssite_chat_messages");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save/sync messages to localStorage
  useEffect(() => {
    if (messages && messages.length > 0) {
      localStorage.setItem("whatssite_chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Helper to update onboarding step and save to localStorage
  const updateStep = (newStep) => {
    stepRef.current = newStep;
    setStep(newStep);
    localStorage.setItem("whatssite_current_step", newStep);
  };

  // Save current build state to database
  const saveBuildState = async (updated) => {
    siteDataRef.current = updated;
    setSiteData(updated);

    // Also save to localStorage as backup
    localStorage.setItem("whatssite_current_build", JSON.stringify(updated));
    if (updated.slug) {
      localStorage.setItem(`whatssite_site_${updated.slug}`, JSON.stringify(updated));
    }

    // Save to database if slug exists
    if (updated.slug && updated.businessName) {
      try {
        const response = await fetch('/api/business', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        });

        if (!response.ok) {
          console.error('Failed to save to database');
        }
      } catch (error) {
        console.error('Error saving to database:', error);
      }
    }
  };

  const getSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const formatTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  // Canvas Image Compression Helper
  const compressImage = (file, maxWidth, maxHeight, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        callback(dataUrl);
      };
    };
  };

  // Upload image to ImageKit
  const uploadImageToCloud = async (base64Image, folder = 'whatssite') => {
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image, folder }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.url;
      } else {
        console.error('Failed to upload image');
        return base64Image; // Fallback to base64
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      return base64Image; // Fallback to base64
    }
  };

  // Fetch AI-generated bio and services from Groq API
  const fetchAiSuggestions = async (businessName, category) => {
    setIsFetchingAi(true);
    setIsTyping(true);
    const time = formatTime();

    // Show a bot thinking message immediately
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: `✨ Generating AI suggestions for "${category}"...`, time }
    ]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, category })
      });

      const data = await res.json();
      const { about, services } = data;

      if (about && Array.isArray(services)) {
        setAiGeneratedData({ about, services });
        const newTime = formatTime();
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `🤖 AI has drafted the following for your ${category} website:`, time: newTime },
          { sender: "bot", text: `📝 *About Us:*\n${about}`, time: newTime },
          { sender: "bot", text: `🛠️ *Services:*\n${services.join(", ")}.`, time: newTime },
          { sender: "bot", text: "Would you like to use these AI suggestions, or enter your own details manually?", time: newTime }
        ]);
        updateStep("AI_DECISION");
      } else {
        throw new Error("Invalid AI response");
      }
    } catch (err) {
      console.error("AI fetch error:", err);
      const newTime = formatTime();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Please write a short, classy description about your business (About Us section):", time: newTime }
      ]);
      updateStep("ABOUT");
    } finally {
      setIsFetchingAi(false);
      setIsTyping(false);
    }
  };

  const handleSendMessage = (textToSend = null) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    if (!textToSend) setInputValue("");

    // Add User Message
    const userMsg = {
      sender: "user",
      text: text,
      time: formatTime()
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      processBotLogic(text);
    }, 1200);
  };

  // Direct File Upload triggers
  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsTyping(true);

    // Set Max Dimensions based on Image Type
    const maxW = type === "logo" ? 150 : 800;
    const maxH = type === "logo" ? 150 : 600;

    compressImage(file, maxW, maxH, async (base64Data) => {
      // Upload to ImageKit
      const uploadedUrl = await uploadImageToCloud(base64Data, `whatssite/${type}`);

      setIsTyping(false);
      const time = formatTime();

      if (type === "logo") {
        const updated = { ...siteDataRef.current, logoUrl: uploadedUrl };
        await saveBuildState(updated);
        setMessages((prev) => [
          ...prev,
          { sender: "user", text: "📷 Uploaded Logo image", time },
          { sender: "bot", text: "Got it! Your logo has been saved. Now, let's select a hero banner image for your website homepage.", time }
        ]);
        updateStep("HERO_IMAGE");
      } else if (type === "hero") {
        const updated = { ...siteDataRef.current, heroImageUrl: uploadedUrl };
        await saveBuildState(updated);
        setMessages((prev) => [
          ...prev,
          { sender: "user", text: "📷 Uploaded Hero image", time },
          { sender: "bot", text: "Awesome hero banner! Website visual updated. Now, please upload 2-3 gallery images (portfolio, office photos, products) so customers can see your work.", time }
        ]);
        updateStep("GALLERY");
      }
    });
  };

  // Gallery multi-upload handler
  const handleGalleryUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset input so same file can be re-selected if needed
    e.target.value = "";

    setIsTyping(true);

    compressImage(file, 600, 450, async (base64Data) => {
      // Upload to ImageKit
      const uploadedUrl = await uploadImageToCloud(base64Data, 'whatssite/gallery');

      setIsTyping(false);
      const time = formatTime();

      const updatedList = [...siteDataRef.current.galleryUrls, uploadedUrl].slice(0, 4); // Limit to 4 images
      const updated = { ...siteDataRef.current, galleryUrls: updatedList };

      // Save to database
      await saveBuildState(updated);

      setMessages((prev) => [
        ...prev,
        { sender: "user", text: `📷 Uploaded gallery image (${updatedList.length}/4)`, time },
        { sender: "bot", text: `Added! You have ${updatedList.length} image(s) in your gallery. ${updatedList.length < 4 ? "Send another image to add more, or send 'done' to move to the next step." : "Gallery is full (4/4)! Type 'done' to proceed."}`, time }
      ]);
    });
  };

  const processBotLogic = (userText) => {
    setIsTyping(false);
    const botMsgs = [];
    const time = formatTime();

    // Check for Edit Commands or Quick Buttons
    const lowerText = userText.toLowerCase();

    // Command Router
    if (lowerText === "edit name" || lowerText === "change name") {
      updateStep("NAME");
      botMsgs.push({ sender: "bot", text: "Sure, let's change your Business Name. What is the new name?", time });
      setMessages((prev) => [...prev, ...botMsgs]);
      return;
    }
    if (lowerText === "edit category" || lowerText === "change category") {
      updateStep("CATEGORY");
      botMsgs.push({ sender: "bot", text: "What is your business category? (Clinic, Gym, Cafe, Salon, Real Estate)", time });
      setMessages((prev) => [...prev, ...botMsgs]);
      return;
    }
    if (lowerText === "edit about" || lowerText === "change about") {
      updateStep("ABOUT");
      botMsgs.push({ sender: "bot", text: "Let's update your business description (About Us section):", time });
      setMessages((prev) => [...prev, ...botMsgs]);
      return;
    }
    if (lowerText === "edit services" || lowerText === "change services") {
      updateStep("SERVICES");
      botMsgs.push({ sender: "bot", text: "Tell me the services you offer, separated by commas. You can add as many services as you want (e.g. Root Canal, Dental Implants, Teeth Whitening):", time });
      setMessages((prev) => [...prev, ...botMsgs]);
      return;
    }
    if (lowerText === "edit logo" || lowerText === "change logo") {
      updateStep("LOGO");
      botMsgs.push({ sender: "bot", text: "Please upload your business logo image:", time });
      setMessages((prev) => [...prev, ...botMsgs]);
      return;
    }
    if (lowerText === "edit hero image" || lowerText === "change hero image") {
      updateStep("HERO_IMAGE");
      botMsgs.push({ sender: "bot", text: "Please upload a new hero banner image:", time });
      setMessages((prev) => [...prev, ...botMsgs]);
      return;
    }
    if (lowerText === "edit gallery" || lowerText === "change gallery") {
      updateStep("GALLERY");
      botMsgs.push({ sender: "bot", text: "Let's update your gallery. Upload images, and type 'done' when you are finished:", time });
      setMessages((prev) => [...prev, ...botMsgs]);
      return;
    }
    if (lowerText === "edit theme" || lowerText === "change theme") {
      updateStep("THEME");
      botMsgs.push({ sender: "bot", text: "Please select a theme: medical, gym, restaurant, salon, realestate", time });
      setMessages((prev) => [...prev, ...botMsgs]);
      return;
    }
    if (lowerText === "edit contact" || lowerText === "change contact") {
      updateStep("PHONE");
      botMsgs.push({ sender: "bot", text: "What is your contact phone number?", time });
      setMessages((prev) => [...prev, ...botMsgs]);
      return;
    }

    // Step-by-Step Flow Logic
    switch (stepRef.current) {
      case "PHONE": {
        const cleanedPhone = userText.replace(/\D/g, "");
        if (cleanedPhone.length < 10) {
          botMsgs.push({ sender: "bot", text: "Please enter a valid 10-digit WhatsApp phone number:", time });
        } else {
          // Store phone and create a temp slug and draft business name to pass mongoose validation
          const tempSlug = "temp-" + cleanedPhone;
          const tempName = "Draft Business " + cleanedPhone;
          const updated = {
            ...siteDataRef.current,
            phone: cleanedPhone,
            slug: tempSlug,
            businessName: tempName,
            category: "Local Business"
          };
          saveBuildState(updated);
          updateStep("OWNER_NAME");
          botMsgs.push({ sender: "bot", text: "Got it! Your number has been registered. 📱", time });
          botMsgs.push({ sender: "bot", text: "Next, what is your full name (Business Owner/Developer Name)?", time });
        }
        break;
      }
      case "OWNER_NAME": {
        const updated = { ...siteDataRef.current, ownerName: userText };
        saveBuildState(updated);
        updateStep("NAME");
        botMsgs.push({ sender: "bot", text: `Pleasure to meet you, ${userText}! 🤝`, time });
        botMsgs.push({ sender: "bot", text: "Now, what is your Business Name?", time });
        break;
      }
      case "NAME": {
        const slug = getSlug(userText);
        if (!slug) {
          botMsgs.push({ sender: "bot", text: "Invalid business name. Please type a valid name:", time });
        } else {
          const updated = { ...siteDataRef.current, businessName: userText, slug: slug };
          saveBuildState(updated);
          updateStep("CATEGORY");
          botMsgs.push({ sender: "bot", text: `Perfect! "${userText}" — great business name! 🎯`, time });
          botMsgs.push({ sender: "bot", text: "Now, what is your Business Category? (e.g. Dental Clinic, Fitness Gym, Coffee Shop, Beauty Salon, Real Estate)", time });
        }
        break;
      }
      case "CATEGORY": {
        const updated = { ...siteDataRef.current, category: userText };
        saveBuildState(updated);
        setMessages((prev) => [...prev, ...botMsgs]);
        // Trigger AI generation after a brief delay
        setTimeout(() => {
          fetchAiSuggestions(updated.businessName, userText);
        }, 600);
        return; // Early return - fetchAiSuggestions will update step
      }
      case "AI_DECISION": {
        if (lowerText === "yes" || lowerText === "accept" || lowerText === "use ai" || lowerText === "use ai suggestions") {
          // Accept AI suggestions: skip ABOUT and SERVICES
          if (aiGeneratedDataRef.current) {
            const updated = { ...siteDataRef.current, about: aiGeneratedDataRef.current.about, services: aiGeneratedDataRef.current.services };
            saveBuildState(updated);
          }
          updateStep("LOGO");
          botMsgs.push({ sender: "bot", text: "✅ AI suggestions accepted! Your bio and services have been saved.", time });
          botMsgs.push({ sender: "bot", text: "Now let's add images to make your website look stunning. Please upload your business logo, or type 'skip' to use a default icon.", time });
        } else if (lowerText === "no" || lowerText === "manual" || lowerText === "enter manually") {
          updateStep("ABOUT");
          botMsgs.push({ sender: "bot", text: "No problem! Please write a short, classy description about your business (About Us section):", time });
        } else {
          botMsgs.push({ sender: "bot", text: "Please choose an option: tap 'Accept AI Suggestions' or 'Enter Manually' buttons below.", time });
        }
        break;
      }
      case "ABOUT": {
        const updated = { ...siteDataRef.current, about: userText };
        saveBuildState(updated);
        updateStep("SERVICES");
        botMsgs.push({ sender: "bot", text: `Got it! Now tell me the services you offer, separated by commas. You can add as many services as you want (e.g. Root Canal, Dental Implants, Teeth Whitening, Braces, Oral Surgery):`, time });
        break;
      }
      case "SERVICES": {
        const list = userText
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
        const updated = { ...siteDataRef.current, services: list };
        saveBuildState(updated);
        updateStep("LOGO");
        botMsgs.push({ sender: "bot", text: "Great services list! Let's add images to make it look classy.", time });
        botMsgs.push({ sender: "bot", text: "Please upload your business logo. You can click 'Upload Logo' or type 'skip' to use a default logo icon.", time });
        break;
      }
      case "LOGO": {
        if (lowerText === "skip") {
          botMsgs.push({ sender: "bot", text: "Logo skipped. Now please upload a hero banner image or type 'skip' to use default:", time });
          updateStep("HERO_IMAGE");
        } else {
          botMsgs.push({ sender: "bot", text: "Please use the 'Upload Logo' button or type 'skip' to move forward:", time });
        }
        break;
      }
      case "HERO_IMAGE": {
        if (lowerText === "skip") {
          botMsgs.push({ sender: "bot", text: "Hero banner image skipped. Now please upload 2-3 images for your photo gallery, or type 'skip' / 'done' to move forward:", time });
          updateStep("GALLERY");
        } else {
          botMsgs.push({ sender: "bot", text: "Please use the 'Upload Hero Image' button or type 'skip' to move forward:", time });
        }
        break;
      }
      case "GALLERY": {
        if (lowerText === "done" || lowerText === "skip") {
          botMsgs.push({ sender: "bot", text: "Gallery finalized! What is your contact email address?", time });
          updateStep("EMAIL");
        } else {
          botMsgs.push({ sender: "bot", text: "Please upload image files using the buttons, or type 'done' if you have finished uploading gallery images.", time });
        }
        break;
      }
      case "EMAIL": {
        const updated = { ...siteDataRef.current, email: userText };
        saveBuildState(updated);
        updateStep("ADDRESS");
        botMsgs.push({ sender: "bot", text: "What is your physical office address or shop location?", time });
        break;
      }
      case "ADDRESS": {
        const updated = { ...siteDataRef.current, address: userText };
        saveBuildState(updated);
        updateStep("THEME");
        botMsgs.push({ sender: "bot", text: "Awesome! Choose a layout theme by typing: medical, gym, restaurant, salon, realestate", time });
        break;
      }
      case "THEME": {
        const selectedTheme = userText.toLowerCase().replace(/\s+/g, "");
        const validThemes = ["medical", "gym", "restaurant", "salon", "realestate"];
        if (validThemes.includes(selectedTheme)) {
          const updated = { ...siteDataRef.current, theme: selectedTheme };
          saveBuildState(updated);
          botMsgs.push({ sender: "bot", text: `🎨 Theme "${selectedTheme}" selected! Your website is looking stunning.`, time });
          botMsgs.push({ sender: "bot", text: "🚀 Publishing your website instantly...", time });

          // Auto-publish without payment
          setTimeout(async () => {
            try {
              await fetch('/api/business', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  slug: siteDataRef.current.slug,
                  paymentId: 'FREE_PROMO',
                  paymentStatus: 'completed',
                }),
              });
            } catch (error) {
              console.error('Auto-publish failed:', error);
            }
            updateStep("COMPLETED");
            const innerTime = formatTime();
            setMessages((prev) => [
              ...prev,
              { sender: "bot", text: "🎉 Woohoo! Your professional website is now officially LIVE!", time: innerTime },
              { sender: "bot", text: `🔗 Your website: http://${siteDataRef.current.slug}.whatssite.in`, time: innerTime },
              { sender: "bot", text: "You can edit any section anytime from this chat using the controls below.", time: innerTime }
            ]);
          }, 1500);
        } else {
          botMsgs.push({ sender: "bot", text: "Please type a valid theme: medical, gym, restaurant, salon, realestate", time });
        }
        break;
      }
      case "PAYMENT": {
        botMsgs.push({ sender: "bot", text: "💳 Please complete the ₹199 payment to publish your website. Click the 'Go Live' button below.", time });
        break;
      }
      case "COMPLETED": {
        botMsgs.push({ sender: "bot", text: "Your site is live! Type 'edit services' or 'edit theme' to adjust any section.", time });
        break;
      }
      default:
        break;
    }

    setMessages((prev) => [...prev, ...botMsgs]);
  };

  // Payment success — called after Razorpay confirms payment
  const handlePaymentSuccess = async (paymentId) => {
    setShowPaymentModal(false);
    setIsPayingLoading(false);

    // Update payment status in database
    try {
      const response = await fetch('/api/business', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: siteDataRef.current.slug,
          paymentId: paymentId,
          paymentStatus: 'completed',
        }),
      });

      if (response.ok) {
        console.log('Payment status updated and website published!');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
    }

    updateStep("COMPLETED");
    const time = formatTime();
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: `💳 Payment ₹199 successful! (ID: ${paymentId})`, time },
      { sender: "bot", text: "🎉 Woohoo! Payment confirmed! Your professional website is now officially LIVE!", time },
      { sender: "bot", text: `🔗 Your website: http://${siteDataRef.current.slug}.whatssite.in`, time },
      { sender: "bot", text: "You can edit any section anytime from this chat using the controls below.", time }
    ]);
  };

  // Real Razorpay Checkout handler
  const handleRazorpayPayment = async () => {
    setIsPayingLoading(true);
    try {
      // 1. Load Razorpay script dynamically
      await new Promise((resolve, reject) => {
        if (window.Razorpay) { resolve(); return; }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

      // 2. Create server-side order
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName: siteDataRef.current.businessName, slug: siteDataRef.current.slug }),
      });
      const { orderId, amount, currency, error } = await res.json();
      if (error || !orderId) throw new Error(error || "Order creation failed");

      // 3. Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "WhatsSite",
        description: `Website publishing — ${siteDataRef.current.businessName}`,
        order_id: orderId,
        prefill: {
          name: siteDataRef.current.businessName,
          email: siteDataRef.current.email || "",
          contact: siteDataRef.current.phone || "",
        },
        theme: { color: "#00a884" },
        handler: (response) => {
          handlePaymentSuccess(response.razorpay_payment_id);
        },
        modal: {
          ondismiss: () => setIsPayingLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setIsPayingLoading(false);
        alert("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      setIsPayingLoading(false);
      alert("Could not initiate payment. Please try again.");
    }
  };

  const handleQuickThemeSelect = (themeId) => {
    if (stepRef.current === "THEME") {
      setInputValue(themeId);
      handleSendMessage(themeId);
    } else {
      const updated = { ...siteDataRef.current, theme: themeId };
      saveBuildState(updated);
      const time = formatTime();
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: `Switch theme to ${themeId}`, time },
        { sender: "bot", text: `Theme successfully updated to ${themeId}! Check the live website.`, time }
      ]);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#e1e2da] bg-gradient-to-tr from-[#d6d8d0] via-[#e1e2da] to-[#d6d8d0] flex items-center justify-center font-sans overflow-hidden select-none relative">

      {/* WhatsApp Green decorative background band at top */}
      <div className="absolute top-0 left-0 w-full h-[127px] bg-gradient-to-r from-emerald-600 to-teal-500 z-0 shadow-sm"></div>

      {/* Hidden file selectors */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileUpload(e, step === "LOGO" ? "logo" : "hero")}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={galleryInputRef}
        onChange={handleGalleryUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Center Container: Simulated WhatsApp Web Layout */}
      <div className="w-full max-w-[1396px] h-[95vh] bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex overflow-hidden z-10 relative border border-slate-200/40">

        {/* LEFT SIDEBAR: Mock WhatsApp Chats (Desktop-only) */}
        <div className="hidden md:flex flex-col w-[380px] shrink-0 bg-white border-r border-[#e9edef]">

          {/* Sidebar Profile Header */}
          <div className="h-[60px] bg-[#f0f2f5] px-4 py-3 flex items-center justify-between border-b border-[#e9edef]">
            <Link
              href="/"
              className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 font-extrabold px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs transition-all hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <div className="flex gap-4 text-[#54656f] items-center">
              <button title="Status Updates" className="hover:text-slate-800 transition-colors cursor-pointer hover:scale-105 active:scale-95">
                <Globe className="w-5 h-5" />
              </button>
              <button title="New Chat" className="hover:text-slate-800 transition-colors cursor-pointer hover:scale-105 active:scale-95">
                <MessageSquare className="w-5 h-5" />
              </button>
              <button title="Settings" className="hover:text-slate-800 transition-colors cursor-pointer hover:scale-105 active:scale-95">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Field Bar */}
          <div className="bg-white px-3 py-2 flex items-center border-b border-[#e9edef]">
            <div className="bg-[#f0f2f5] flex items-center gap-3 w-full px-3.5 py-2 rounded-xl">
              <Search className="w-4 h-4 text-[#677781]" />
              <input
                type="text"
                placeholder="Search or start new chat"
                disabled
                className="bg-transparent text-xs w-full focus:outline-none placeholder-[#677781] text-slate-700 font-semibold cursor-not-allowed"
              />
            </div>
          </div>

          {/* Chats Feed List */}
          <div className="flex-1 overflow-y-auto bg-white flex flex-col">

            {/* Active WhatsApp Bot Chat */}
            <div className="flex items-center gap-3.5 px-4.5 py-3.5 bg-[#f0f2f5] cursor-pointer border-b border-[#e9edef] transition-all relative">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white text-lg font-black shrink-0 relative shadow-md border border-emerald-400/20">
                🤖
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-extrabold text-sm text-slate-850 flex items-center gap-1.5">
                    WhatsSite Bot
                    <span className="bg-emerald-500 text-white rounded-full p-0.5 text-[7px]" title="Verified Creator Bot">✓</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-wide">Online</span>
                </div>
                <p className="text-xs text-slate-600 truncate font-bold">
                  {step === "COMPLETED" ? `🎉 Live at: ${siteData.slug}.whatssite.in` : "Building your premium website..."}
                </p>
              </div>
            </div>

            {/* Mock Chat 2: Customer Billing */}
            <div className="flex items-center gap-3.5 px-4.5 py-3 hover:bg-slate-50 cursor-not-allowed opacity-75 border-b border-[#f0f2f5] relative">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white text-lg font-black shrink-0">
                💳
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold text-sm text-slate-800">Billing Desk</span>
                  <span className="text-[10px] text-slate-400">10:14 AM</span>
                </div>
                <p className="text-xs text-slate-500 truncate">
                  ₹99 Website plan active. No pending invoices.
                </p>
              </div>
            </div>

            {/* Mock Chat 3: Support Helpdesk */}
            <div className="flex items-center gap-3.5 px-4.5 py-3 hover:bg-slate-50 cursor-not-allowed opacity-75 border-b border-[#f0f2f5] relative">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-black shrink-0">
                🙋‍♂️
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold text-sm text-slate-800">Support Desk</span>
                  <span className="text-[10px] text-slate-400">Yesterday</span>
                </div>
                <p className="text-xs text-slate-500 truncate">
                  Hi! Let us know if you need help connecting domains.
                </p>
              </div>
            </div>

            {/* Mock Chat 4: Domains Desk */}
            <div className="flex items-center gap-3.5 px-4.5 py-3 hover:bg-slate-50 cursor-not-allowed opacity-75 relative">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white text-lg font-black shrink-0">
                🌐
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold text-sm text-slate-800">Domains Desk</span>
                  <span className="text-[10px] text-slate-400">Monday</span>
                </div>
                <p className="text-xs text-slate-500 truncate">
                  Configure custom .in or .com domains for your business website.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE: The Main WhatsApp Chat Window */}
        <div className="flex-1 flex flex-col bg-[#efeae2] relative overflow-hidden h-full">

          {/* Chat Window Header */}
          <div className="h-[60px] bg-[#f0f2f5] px-4 py-3 flex items-center justify-between border-b border-[#e9edef] shrink-0">
            <div className="flex items-center gap-3">
              {/* Back link for mobile view */}
              <Link href="/" className="md:hidden p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-slate-800 mr-1 shadow-sm transition-all">
                <ArrowLeft className="w-4 h-4" />
              </Link>

              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white text-lg font-black shrink-0 relative shadow-inner">
                🤖
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h2 className="font-extrabold text-sm text-slate-850 flex items-center gap-1.5 leading-snug">
                  WhatsSite Bot
                  <span className="bg-emerald-500 text-white rounded-full p-0.5 text-[6.5px]">✓</span>
                </h2>
                <span className="text-[10px] text-emerald-600 font-bold block leading-none">
                  {isFetchingAi ? "✨ Generating AI suggestions..." : isTyping ? "typing..." : "Online"}
                </span>
              </div>
            </div>

            {/* Mock Call Action Icons */}
            <div className="flex gap-5 text-[#54656f] items-center">
              <button disabled className="hover:text-slate-800 transition-colors cursor-not-allowed opacity-40">
                <Video className="w-4.5 h-4.5" />
              </button>
              <button disabled className="hover:text-slate-800 transition-colors cursor-not-allowed opacity-40">
                <Phone className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-slate-300"></div>
              <button disabled className="hover:text-slate-800 transition-colors cursor-not-allowed opacity-40">
                <Search className="w-4.5 h-4.5" />
              </button>
              <button disabled className="hover:text-slate-800 transition-colors cursor-not-allowed opacity-40">
                <MoreVertical className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Messages Feed Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-3.5 relative">

            {/* CSS repeating background doodle mock overlay */}
            <div className="absolute inset-0 bg-[#efeae2]/95 z-0 pointer-events-none"></div>

            <div className="relative z-10 flex-1 flex flex-col gap-3.5">
              {messages.map((m, idx) => {
                const isBot = m.sender === "bot";
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg max-w-[85%] sm:max-w-[70%] shadow-sm text-xs sm:text-sm leading-relaxed relative ${isBot
                      ? "bg-white text-slate-800 self-start rounded-tl-none border border-white/50"
                      : "bg-[#dcf8c6] text-slate-800 self-end rounded-tr-none border border-[#dcf8c6]/50"
                      }`}
                  >
                    {/* Visual indicators for WhatsApp bubbles */}
                    {isBot ? (
                      <div className="absolute -left-2.5 top-0 w-3 h-3 bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}></div>
                    ) : (
                      <div className="absolute -right-2.5 top-0 w-3 h-3 bg-[#dcf8c6]" style={{ clipPath: "polygon(0 0, 0 100%, 100% 0)" }}></div>
                    )}
                    <p className="whitespace-pre-line font-medium">{m.text}</p>
                    <span className="block text-[8px] text-slate-400 text-right mt-1 font-bold uppercase tracking-wide">{m.time}</span>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="bg-white text-slate-800 p-3 rounded-lg rounded-tl-none max-w-[70px] self-start shadow-sm flex gap-1 items-center justify-center border border-slate-100 relative">
                  <div className="absolute -left-2.5 top-0 w-3 h-3 bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}></div>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                </div>
              )}

              {/* AI Fetching spinner overlay */}
              {isFetchingAi && (
                <div className="bg-white rounded-2xl p-4 border border-emerald-200 max-w-[85%] sm:max-w-[70%] self-start shadow-md flex items-center gap-3 relative z-20">
                  <div className="absolute -left-2.5 top-0 w-3 h-3 bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}></div>
                  <div className="w-7 h-7 border-[3px] border-emerald-500 border-t-transparent rounded-full animate-spin shrink-0"></div>
                  <div>
                    <p className="text-xs font-extrabold text-emerald-700">Groq AI is working...</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Drafting your business bio and service suggestions</p>
                  </div>
                </div>
              )}

              {/* AI_DECISION quick-reply buttons */}
              {step === "AI_DECISION" && !isFetchingAi && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 max-w-[85%] sm:max-w-[70%] self-start shadow-md flex flex-col gap-3 relative animate-fade-in z-20">
                  <div className="absolute -left-2.5 top-0 w-3 h-3 bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}></div>
                  <span className="text-xs text-slate-500 font-extrabold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> Choose your preference:
                  </span>
                  <button
                    onClick={() => handleSendMessage("yes")}
                    className="bg-brand-green hover:bg-brand-green-hover text-white py-3.5 px-5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:scale-102 cursor-pointer"
                  >
                    <Check className="w-4 h-4" /> ✨ Accept AI Suggestions
                  </button>
                  <button
                    onClick={() => handleSendMessage("manual")}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-all hover:scale-101 cursor-pointer"
                  >
                    ✏️ Enter Manually Instead
                  </button>
                </div>
              )}

              {/* Media upload overlays inside message feed container */}
              {step === "LOGO" && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 max-w-[85%] sm:max-w-[70%] self-start shadow-md flex flex-col gap-3 relative animate-fade-in z-20">
                  <div className="absolute -left-2.5 top-0 w-3 h-3 bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}></div>
                  <span className="text-xs text-slate-500 font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Choose Logo Option:
                  </span>
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="bg-brand-green hover:bg-brand-green-hover text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition-all hover:scale-102 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" /> Upload Business Logo
                  </button>
                  <button
                    onClick={() => handleSendMessage("skip")}
                    className="text-slate-450 hover:text-slate-650 font-bold text-xs py-1.5 rounded-lg hover:bg-slate-50 border transition-all text-center border-slate-100 cursor-pointer"
                  >
                    Skip / Use Default Icon
                  </button>
                </div>
              )}

              {step === "HERO_IMAGE" && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 max-w-[85%] sm:max-w-[70%] self-start shadow-md flex flex-col gap-3 relative animate-fade-in z-20">
                  <div className="absolute -left-2.5 top-0 w-3 h-3 bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}></div>
                  <span className="text-xs text-slate-500 font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Choose Banner Banner:
                  </span>
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="bg-brand-green hover:bg-brand-green-hover text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition-all hover:scale-102 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" /> Upload Hero Banner
                  </button>
                  <button
                    onClick={() => handleSendMessage("skip")}
                    className="text-slate-450 hover:text-slate-650 font-bold text-xs py-1.5 rounded-lg hover:bg-slate-50 border transition-all text-center border-slate-100 cursor-pointer"
                  >
                    Skip / Use Default Visuals
                  </button>
                </div>
              )}

              {step === "GALLERY" && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 max-w-[85%] sm:max-w-[70%] self-start shadow-md flex flex-col gap-3 relative animate-fade-in z-20">
                  <div className="absolute -left-2.5 top-0 w-3 h-3 bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}></div>
                  <span className="text-xs text-slate-500 font-extrabold">
                    Gallery Uploads ({siteData.galleryUrls.length}/4 images):
                  </span>

                  <button
                    onClick={() => galleryInputRef.current.click()}
                    className="bg-brand-green hover:bg-brand-green-hover text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition-all hover:scale-102 cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4" /> Upload Photo
                  </button>

                  <div className="flex gap-2.5">
                    <button
                      onClick={() => handleSendMessage("done")}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-extrabold text-xs transition-colors cursor-pointer"
                    >
                      Done (Proceed)
                    </button>
                    {siteData.galleryUrls.length > 0 && (
                      <button
                        onClick={() => saveBuildState({ ...siteData, galleryUrls: [] })}
                        title="Clear all photos"
                        className="p-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* PAYMENT Step - Go Live card */}
              {step === "PAYMENT" && (
                <div className="bg-white rounded-2xl p-4 border border-emerald-200 max-w-[85%] sm:max-w-[70%] self-start shadow-lg flex flex-col gap-3 relative animate-fade-in z-20">
                  <div className="absolute -left-2.5 top-0 w-3 h-3 bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}></div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🚀</span>
                    <span className="text-xs font-extrabold text-slate-700">Your website is ready!</span>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-semibold">One-time publishing fee</p>
                      <p className="text-2xl font-black text-emerald-600">₹199</p>
                      <p className="text-[10px] text-slate-400 font-semibold">Lifetime hosting included</p>
                    </div>
                    <div className="text-3xl">🌐</div>
                  </div>
                  <ul className="flex flex-col gap-1">
                    {["Custom domain-ready URL", "Mobile responsive design", "WhatsApp chat integration", "Lifetime free hosting"].map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-[10px] text-slate-600 font-semibold">
                        <Check className="w-3 h-3 text-emerald-500 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-3.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-102 cursor-pointer"
                  >
                    💳 Pay ₹199 &amp; Go Live!
                  </button>
                </div>
              )}

              {/* COMPLETED State - Quick command panels */}
              {step === "COMPLETED" && (
                <div className="bg-white/95 border border-slate-200/80 rounded-2xl p-4 self-start w-full max-w-[90%] sm:max-w-[70%] shadow-md flex flex-col gap-3.5 mt-2 animate-fade-in relative z-20">
                  <div className="absolute -left-2.5 top-0 w-3 h-3 bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}></div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-0.5">Quick Edit Controls</span>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => handleSendMessage("edit name")}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs transition-all cursor-pointer"
                    >
                      ✏️ Edit Name
                    </button>
                    <button
                      onClick={() => handleSendMessage("edit category")}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs transition-all cursor-pointer"
                    >
                      🗂️ Category
                    </button>
                    <button
                      onClick={() => handleSendMessage("edit about")}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs transition-all cursor-pointer"
                    >
                      📝 Edit About Us
                    </button>
                    <button
                      onClick={() => handleSendMessage("edit services")}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs transition-all cursor-pointer"
                    >
                      🛠️ Edit Services
                    </button>
                    <button
                      onClick={() => handleSendMessage("edit logo")}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs transition-all cursor-pointer"
                    >
                      📷 Edit Logo
                    </button>
                    <button
                      onClick={() => handleSendMessage("edit hero image")}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs transition-all cursor-pointer"
                    >
                      📷 Hero Banner
                    </button>
                    <button
                      onClick={() => handleSendMessage("edit gallery")}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs transition-all cursor-pointer"
                    >
                      🖼️ Edit Gallery
                    </button>
                    <button
                      onClick={() => handleSendMessage("edit theme")}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs transition-all cursor-pointer"
                    >
                      🎨 Change Theme
                    </button>
                    <button
                      onClick={() => handleSendMessage("edit contact")}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs transition-all col-span-2 text-center cursor-pointer"
                    >
                      📞 Edit Contact & Address
                    </button>
                    <Link
                      href={`/${siteData.slug || "sharma-dental"}`}
                      className="bg-brand-green hover:bg-brand-green-hover text-white font-extrabold py-3 px-4 rounded-xl text-xs text-center flex items-center justify-center gap-1.5 transition-all col-span-2 shadow"
                    >
                      🔗 View Live Website <Globe className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Theme State Helper Selection list */}
              {step === "THEME" && (
                <div className="bg-white/95 border border-slate-200/80 rounded-2xl p-4 self-start w-full max-w-[90%] sm:max-w-[70%] shadow-md flex flex-col gap-3.5 mt-2 animate-fade-in relative z-20">
                  <div className="absolute -left-2.5 top-0 w-3 h-3 bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}></div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-0.5">Click to Choose Theme Layout</span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {["medical", "gym", "restaurant", "salon", "realestate"].map((t) => (
                      <button
                        key={t}
                        onClick={() => handleQuickThemeSelect(t)}
                        className={`font-bold py-2.5 px-3.5 rounded-xl text-xs text-left flex items-center justify-between border transition-all cursor-pointer ${siteData.theme === t
                          ? "bg-emerald-50 border-brand-green text-brand-green-dark"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                          }`}
                      >
                        <span className="capitalize">{t}</span>
                        {siteData.theme === t && <Check className="w-3.5 h-3.5 text-brand-green" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            <div ref={chatEndRef} />
          </div>

          {/* Bottom Chat Input Form Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#f0f0f0] border-t border-slate-200 flex items-center gap-3 shrink-0 relative z-10"
          >
            <button
              type="button"
              onClick={() => {
                if (step === "LOGO" || step === "HERO_IMAGE") fileInputRef.current.click();
                else if (step === "GALLERY") galleryInputRef.current.click();
              }}
              className="p-2.5 text-slate-500 hover:text-slate-700 bg-white rounded-full border border-slate-200 shadow-sm transition-colors cursor-pointer"
            >
              <Paperclip className="w-4.5 h-4.5" />
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 bg-white rounded-full border border-slate-200 px-4.5 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold text-slate-800 placeholder-slate-400"
            />

            <button
              type="submit"
              className="w-12 h-12 bg-[#008f6c] hover:bg-[#007357] text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            >
              <Send className="w-4.5 h-4.5 ml-0.5" />
            </button>
          </form>

        </div>

      </div>

      {/* ========== PAYMENT MODAL ========== */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in">

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-5 text-white text-center relative">
              <div className="text-4xl mb-1">🌐</div>
              <h2 className="text-lg font-black">Publish Your Website</h2>
              <p className="text-xs text-emerald-100 font-semibold mt-0.5">One-time payment • Lifetime hosting</p>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="absolute top-3 right-3 w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white font-black text-sm transition-all cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Pricing breakdown */}
            <div className="p-5 flex flex-col gap-4">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-500 font-semibold">Website for</span>
                  <span className="text-xs font-extrabold text-slate-800">{siteData.businessName || "Your Business"}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-500 font-semibold">Theme</span>
                  <span className="text-xs font-extrabold text-slate-800 capitalize">{siteData.theme}</span>
                </div>
                <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between items-center">
                  <span className="text-sm font-extrabold text-slate-700">Total</span>
                  <span className="text-2xl font-black text-emerald-600">₹199</span>
                </div>
              </div>

              {/* Feature bullets */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: "🌐", label: "Live URL" },
                  { icon: "📱", label: "Mobile ready" },
                  { icon: "💬", label: "WhatsApp chat" },
                  { icon: "🔒", label: "Secure hosting" },
                  { icon: "♾️", label: "No renewal fee" },
                  { icon: "⚡", label: "Instant publish" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-xl px-2.5 py-2">
                    <span className="text-sm">{icon}</span>
                    <span className="text-[10px] font-bold text-emerald-700">{label}</span>
                  </div>
                ))}
              </div>

              {/* UPI / Payment simulation */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0">UPI</div>
                <div>
                  <p className="text-xs font-extrabold text-slate-700">Pay via UPI / Card / NetBanking</p>
                  <p className="text-[10px] text-slate-400 font-semibold">Razorpay secured checkout</p>
                </div>
              </div>

              {/* Pay button */}
              <button
                onClick={handleRazorpayPayment}
                disabled={isPayingLoading}
                className={`w-full text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${isPayingLoading
                  ? "bg-emerald-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 hover:scale-101"
                  }`}
              >
                {isPayingLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Opening Razorpay...
                  </>
                ) : (
                  <>💳 Pay ₹199 &amp; Publish Now</>
                )}
              </button>

              <p className="text-center text-[10px] text-slate-400 font-semibold">
                🔒 100% Secure • Instant activation • Money-back guarantee
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

