import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Language = "en" | "hi" | "pa";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Translation data
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.howItWorks": "How It Works",
    "nav.login": "Login",
    "nav.signup": "Get Started",
    "nav.start": "Start",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.subtitle":
      "Comprehensive soil analysis and fertilizer recommendations powered by real-time data and ML",
    "dashboard.overview": "Farm Overview",
    "dashboard.soilAnalysis": "Real-time Soil Analysis",
    "dashboard.fertilizerForm": "Fertilizer Recommendation",
    "dashboard.recommendations": "Recommendations",
    "dashboard.profile": "Profile",
    "dashboard.overallSoilHealth": "Overall Soil Health",
    "dashboard.soilMoisture": "Soil Moisture",
    "dashboard.temperature": "Temperature",
    "dashboard.humidity": "Humidity",
    "dashboard.npkLevels": "NPK Levels (Real-time)",
    "dashboard.npkDescription": "Current nutrient levels from sensors",
    "dashboard.nitrogen": "Nitrogen (N)",
    "dashboard.phosphorus": "Phosphorus (P)",
    "dashboard.potassium": "Potassium (K)",
    "dashboard.lastUpdated": "Last updated",
    "dashboard.registeredFarms": "Registered Farms",
    "dashboard.farmsDescription": "Overview of all your farm properties",
    "dashboard.addFarm": "Add Farm",
    "dashboard.noFarmsYet": "No farms added yet.",
    "dashboard.editFarm": "Edit Farm",
    "dashboard.saveFarm": "Save Farm",
    "dashboard.updateFarm": "Update Farm",
    "dashboard.northField": "North Field",
    "dashboard.southField": "South Field",
    "dashboard.eastField": "East Field",
    "dashboard.hectares": "hectares",
    "dashboard.twoHoursAgo": "2 hours ago",
    "dashboard.fourHoursAgo": "4 hours ago",
    "dashboard.oneHourAgo": "1 hour ago",
    "dashboard.health": "Health",
    "dashboard.size": "Size",
    "dashboard.recommendationHistory": "Fertilizer Recommendation History",
    "dashboard.recommendationHistoryDescription":
      "Past recommendations and their application status",
    "dashboard.recommendationDetails": "Recommendation Details",
    "dashboard.appliedQuestion": "Have you applied the fertilizer?",
    "dashboard.viewFullReport": "View Full Report",
    "dashboard.loadingRecommendations": "Loading recommendations...",
    "dashboard.primary": "Primary",
    "dashboard.secondary": "Secondary",
    "dashboard.noRecommendationsYet": "No Recommendations Yet",
    "dashboard.startCreatingRecommendations":
      "Start by creating your first fertilizer recommendation in the ML Recommendations tab.",
    "dashboard.connectedToThingSpeak": "Connected to ThingSpeak",
    "dashboard.usingDemoData": "Using Demo Data",
    "dashboard.refreshData": "Refresh Data",
    "dashboard.soilPH": "Soil pH",
    "dashboard.npkLevelsTrend": "NPK Levels Trend (24h)",
    "dashboard.historicalNutrientLevels": "Historical nutrient levels",
    "dashboard.environmentalConditions": "Environmental Conditions",
    "dashboard.temperatureHumidityMoisture":
      "Temperature, humidity, and moisture levels",
    "dashboard.completeFormForRecommendations":
      "Please complete the enhanced fertilizer form to get detailed recommendations.",
    "dashboard.mlModelPrediction": "ML Model Prediction",
    "dashboard.aiPoweredRecommendation":
      "AI-powered fertilizer recommendation based on your soil and crop data",
    "dashboard.fieldAnalysisSummary": "Field Analysis Summary",
    "dashboard.recommendationsFor": "Recommendations for",
    "dashboard.cropType": "Crop Type",
    "dashboard.soilType": "Soil Type",
    "dashboard.soil": "Soil",
    "dashboard.soilConditionAnalysis": "Soil Condition Analysis",
    "dashboard.detailedSoilAnalysis":
      "Detailed analysis of your soil conditions",
    "dashboard.currentStatus": "Current Status",
    "dashboard.phStatus": "pH Status",
    "dashboard.moistureStatus": "Moisture Status",
    "dashboard.nutrientDeficiencies": "Nutrient Deficiencies",
    "dashboard.noneDetected": "None detected",
    "dashboard.primaryFertilizer": "Primary Fertilizer",
    "dashboard.secondaryFertilizer": "Secondary Fertilizer",
    "dashboard.reason": "Reason",
    "dashboard.applicationMethod": "Application Method",
    "dashboard.organicAlternatives": "Organic Alternatives",
    "dashboard.sustainableOptions":
      "Sustainable options for long-term soil health improvement",
    "dashboard.timing": "Timing",
    "dashboard.applicationTiming": "Application Timing",
    "dashboard.organicOptions": "Organic Options",
    "dashboard.costEstimate": "Cost Estimate",
    "dashboard.totalEstimate": "Total Estimate",
    "dashboard.for": "For",
    "dashboard.farmerDashboard": "Farmer Dashboard",

    // Profile
    "profile.failedToLoad": "Failed to load profile data",
    "profile.profileUpdated": "Profile Updated",
    "profile.profileUpdateSuccess":
      "Your profile has been successfully updated.",
    "profile.failedToUpdate": "Failed to update profile",
    "profile.loadingProfile": "Loading profile...",
    "profile.editProfile": "Edit Profile",
    "profile.updatePersonalInfo":
      "Update your personal information and farm details",
    "profile.fullName": "Full Name",
    "profile.enterFullName": "Enter your full name",
    "profile.email": "Email",
    "profile.enterEmail": "Enter your email",
    "profile.farmLocation": "Farm Location",
    "profile.cityStateCountry": "City, State, Country",
    "profile.phoneNumber": "Phone Number",
    "profile.farmSize": "Farm Size",
    "profile.unit": "Unit",
    "profile.hectares": "Hectares",
    "profile.acres": "Acres",
    "profile.bigha": "Bigha",
    "profile.saving": "Saving...",
    "profile.saveChanges": "Save Changes",

    // Forms
    "form.fieldName": "Field Name",
    "form.fieldSize": "Field Size",
    "form.cropType": "Crop Type",
    "form.soilPH": "Soil pH",
    "form.nitrogen": "Nitrogen (N)",
    "form.phosphorus": "Phosphorus (P)",
    "form.potassium": "Potassium (K)",
    "form.soilType": "Soil Type",
    "form.temperature": "Temperature",
    "form.humidity": "Humidity",
    "form.soilMoisture": "Soil Moisture",
    "form.submit": "Get Recommendations",
    "form.generating": "Generating Recommendations...",
    "form.reset": "Reset Form",
    "form.fieldInfo": "Field Information",
    "form.cropSoilInfo": "Crop & Soil Information",
    "form.environmentalConditions": "Environmental Conditions",
    "form.autoFillWithSensorData": "Auto-fill with Sensor Data",
    "form.sensorDataUnavailable": "Sensor Data Unavailable",
    "form.autoFilled": "Auto-filled",
    "form.formFilledWithSensorData":
      "Form has been filled with real-time sensor data",
    "form.noDataAvailable": "No Data Available",
    "form.realTimeSensorDataNotAvailable":
      "Real-time sensor data is not available",
    "form.sowingDate": "Sowing Date",
    "form.selectSowingDate": "Select the date when you sowed/planted the crop",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.yes": "Yes",
    "common.no": "No",
    "common.back": "Back",

    // Language switcher
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.punjabi": "ਪੰਜਾਬੀ",
    "language.select": "Select Language",

    // Auth pages
    "auth.welcomeBack": "Welcome Back",
    "auth.signInAccount": "Sign in to your AgriCure account",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.login": "Login",
    "auth.backToHome": "Back to Home",
    "auth.loginSuccess": "Login Successful",
    "auth.loginFailed": "Login Failed",
    "auth.invalidCredentials": "Invalid email or password",
    "auth.signup": "Sign Up",
    "auth.createAccount": "Create Account",
    "auth.signupAccount": "Create your AgriCure account",
    "auth.fullName": "Full Name",
    "auth.confirmPassword": "Confirm Password",
    "auth.farmLocation": "Farm Location",
    "auth.accountCreated": "Account Created Successfully",
    "auth.welcomeToAgriCure":
      "Welcome to AgriCure! You can now sign in to your account.",
    "auth.signupFailed": "Signup Failed",
    "auth.failedToCreateAccount": "Failed to create account",
    "auth.passwordsDoNotMatch": "Passwords do not match",
    "auth.haveAccount": "Don't have an account?",
    "auth.signupHere": "Sign up here",
    "auth.alreadyHaveAccount": "Already have an account?",
    "auth.signInHere": "Sign in here",

    // Hero Section
    "hero.title": "Smart Farming for",
    "hero.titleHighlight": "Better Yields",
    "hero.subtitle":
      "Get personalized fertilizer recommendations based on your soil analysis. Maximize your crop yields with data-driven farming decisions.",
    "hero.startTrial": "Start Free Trial",
    "hero.viewDemo": "View Demo",
    "hero.accuracyRate": "Accuracy Rate",
    "hero.yieldIncrease": "Yield Increase",
    "hero.cropTypesSupported": "Crop Types Supported",

    // Features Section
    "features.title": "Everything You Need for Smart Farming",
    "features.subtitle":
      "Our comprehensive platform provides all the tools and insights you need to optimize your farming operations.",
    "features.preciseAnalysis.title": "Precise Soil Analysis",
    "features.preciseAnalysis.description":
      "Get detailed insights into your soil's pH, nitrogen, phosphorus, potassium, and moisture levels for accurate recommendations.",
    "features.smartRecommendations.title": "Smart Fertilizer Recommendations",
    "features.smartRecommendations.description":
      "Receive personalized fertilizer suggestions based on your specific soil conditions and crop requirements.",
    "features.yieldTracking.title": "Yield Tracking",
    "features.yieldTracking.description":
      "Monitor your crop performance and track improvements over time with our comprehensive analytics dashboard.",
    "features.mobileDesign.title": "Mobile-First Design",
    "features.mobileDesign.description":
      "Access your farm data anywhere, anytime with our responsive design optimized for mobile devices.",
    "features.expertSupport.title": "Expert Support",
    "features.expertSupport.description":
      "Get guidance from agricultural experts and connect with a community of successful farmers.",
    "features.dataSecurity.title": "Data Security",
    "features.dataSecurity.description":
      "Your farm data is protected with enterprise-grade security and privacy measures.",

    // CTA Section
    "cta.title": "Ready to Transform Your Farming?",
    "cta.subtitle":
      "Join thousands of farmers who are already using smart technology to increase their yields and reduce costs.",
    "cta.getStarted": "Get Started Free",
    "cta.alreadyMember": "Already a Member?",

    // How It Works Section
    "howItWorks.title": "How AgriCure Works",
    "howItWorks.subtitle":
      "From sensor deployment to actionable recommendations in four simple steps",
    "howItWorks.step": "STEP",
    "howItWorks.deploySensors.title": "Deploy Sensors",
    "howItWorks.deploySensors.description":
      "Install IoT sensors across your fields to monitor soil conditions in real-time.",
    "howItWorks.streamData.title": "Stream Data to Cloud",
    "howItWorks.streamData.description":
      "Sensor data is automatically transmitted to our secure cloud platform for processing.",
    "howItWorks.mlRecommends.title": "ML Recommends Dosage",
    "howItWorks.mlRecommends.description":
      "Our AI analyzes your data and generates precise fertilizer recommendations.",
    "howItWorks.applyDashboard.title": "Apply via Dashboard",
    "howItWorks.applyDashboard.description":
      "Receive actionable insights through your dashboard or Variable Rate Application system.",

    // Footer
    "footer.tagline":
      "Empowering farmers with smart technology for sustainable and profitable agriculture.",
    "footer.product": "Product",
    "footer.features": "Features",
    "footer.pricing": "Pricing",
    "footer.api": "API",
    "footer.support": "Support",
    "footer.helpCenter": "Help Center",
    "footer.contactUs": "Contact Us",
    "footer.community": "Community",
    "footer.company": "Company",
    "footer.about": "About",
    "footer.blog": "Blog",
    "footer.careers": "Careers",
    "footer.copyright": "© 2025 AgriCure. All rights reserved.",

    // 404 Page
    "notFound.title": "Page Not Found",
    "notFound.description":
      "Oops! The page you're looking for doesn't exist or has been moved.",
    "notFound.goBack": "Go Back",
    "notFound.returnHome": "Return to Home",

    // Recommendations Page
    "recommendations.title": "Fertilizer Recommendations",
    "recommendations.subtitle": "AI-powered recommendations for your field",
  },
  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.features": "विशेषताएं",
    "nav.howItWorks": "कैसे काम करता है",
    "nav.login": "लॉगिन",
    "nav.signup": "शुरू करें",
    "nav.start": "शुरू",

    // Dashboard
    "dashboard.title": "डैशबोर्ड",
    "dashboard.subtitle":
      "रीयल-टाइम डेटा और ML द्वारा संचालित व्यापक मिट्टी विश्लेषण और उर्वरक सिफारिशें",
    "dashboard.overview": "खेत का अवलोकन",
    "dashboard.soilAnalysis": "रीयल-टाइम मिट्टी विश्लेषण",
    "dashboard.fertilizerForm": "उर्वरक सिफारिश",
    "dashboard.recommendations": "सिफारिशें",
    "dashboard.profile": "प्रोफ़ाइल",
    "dashboard.overallSoilHealth": "समग्र मिट्टी स्वास्थ्य",
    "dashboard.soilMoisture": "मिट्टी की नमी",
    "dashboard.temperature": "तापमान",
    "dashboard.humidity": "आर्द्रता",
    "dashboard.npkLevels": "एनपीके स्तर (रीयल-टाइम)",
    "dashboard.npkDescription": "सेंसर से वर्तमान पोषक तत्व स्तर",
    "dashboard.nitrogen": "नाइट्रोजन (N)",
    "dashboard.phosphorus": "फास्फोरस (P)",
    "dashboard.potassium": "पोटैशियम (K)",
    "dashboard.lastUpdated": "अंतिम अपडेट",
    "dashboard.registeredFarms": "पंजीकृत खेत",
    "dashboard.farmsDescription": "आपके सभी खेत संपत्तियों का अवलोकन",
    "dashboard.addFarm": "खेत जोड़ें",
    "dashboard.noFarmsYet": "अभी तक कोई खेत नहीं जोड़ा गया।",
    "dashboard.editFarm": "खेत संपादित करें",
    "dashboard.saveFarm": "खेत सहेजें",
    "dashboard.updateFarm": "खेत अपडेट करें",
    "dashboard.northField": "उत्तर खेत",
    "dashboard.southField": "दक्षिण खेत",
    "dashboard.eastField": "पूर्व खेत",
    "dashboard.hectares": "हेक्टेयर",
    "dashboard.twoHoursAgo": "2 घंटे पहले",
    "dashboard.fourHoursAgo": "4 घंटे पहले",
    "dashboard.oneHourAgo": "1 घंटे पहले",
    "dashboard.health": "स्वास्थ्य",
    "dashboard.size": "आकार",
    "dashboard.recommendationHistory": "उर्वरक सिफारिश इतिहास",
    "dashboard.recommendationHistoryDescription":
      "पिछली सिफारिशें और उनकी अनुप्रयोग स्थिति",
    "dashboard.recommendationDetails": "सिफारिश विवरण",
    "dashboard.appliedQuestion": "क्या आपने उर्वरक लगाया है?",
    "dashboard.viewFullReport": "पूर्ण रिपोर्ट देखें",
    "dashboard.loadingRecommendations": "सिफारिशें लोड हो रही हैं...",
    "dashboard.primary": "प्राथमिक",
    "dashboard.secondary": "द्वितीयक",
    "dashboard.noRecommendationsYet": "अभी तक कोई सिफारिश नहीं",
    "dashboard.startCreatingRecommendations":
      "एमएल सिफारिश टैब में अपनी पहली उर्वरक सिफारिश बनाकर शुरू करें।",
    "dashboard.connectedToThingSpeak": "ThingSpeak से जुड़ा हुआ",
    "dashboard.usingDemoData": "डेमो डेटा का उपयोग कर रहा है",
    "dashboard.refreshData": "डेटा रिफ्रेश करें",
    "dashboard.soilPH": "मिट्टी का pH",
    "dashboard.npkLevelsTrend": "एनपीके स्तर प्रवृत्ति (24 घंटे)",
    "dashboard.historicalNutrientLevels": "ऐतिहासिक पोषक तत्व स्तर",
    "dashboard.environmentalConditions": "पर्यावरणीय स्थितियां",
    "dashboard.temperatureHumidityMoisture": "तापमान, आर्द्रता और नमी स्तर",
    "dashboard.completeFormForRecommendations":
      "विस्तृत सिफारिशें प्राप्त करने के लिए कृपया उन्नत उर्वरक फॉर्म पूरा करें।",
    "dashboard.mlModelPrediction": "एमएल मॉडल भविष्यवाणी",
    "dashboard.aiPoweredRecommendation":
      "आपके मिट्टी और फसल डेटा के आधार पर एआई-संचालित उर्वरक सिफारिश",
    "dashboard.fieldAnalysisSummary": "खेत विश्लेषण सारांश",
    "dashboard.recommendationsFor": "के लिए सिफारिशें",
    "dashboard.cropType": "फसल का प्रकार",
    "dashboard.soilType": "मिट्टी का प्रकार",
    "dashboard.soil": "मिट्टी",
    "dashboard.soilConditionAnalysis": "मिट्टी की स्थिति विश्लेषण",
    "dashboard.detailedSoilAnalysis":
      "आपकी मिट्टी की स्थितियों का विस्तृत विश्लेषण",
    "dashboard.currentStatus": "वर्तमान स्थिति",
    "dashboard.phStatus": "pH स्थिति",
    "dashboard.moistureStatus": "नमी स्थिति",
    "dashboard.nutrientDeficiencies": "पोषक तत्व की कमी",
    "dashboard.noneDetected": "कोई नहीं मिला",
    "dashboard.primaryFertilizer": "प्राथमिक उर्वरक",
    "dashboard.secondaryFertilizer": "द्वितीयक उर्वरक",
    "dashboard.reason": "कारण",
    "dashboard.applicationMethod": "अनुप्रयोग विधि",
    "dashboard.organicAlternatives": "जैविक विकल्प",
    "dashboard.sustainableOptions":
      "दीर्घकालिक मिट्टी स्वास्थ्य सुधार के लिए टिकाऊ विकल्प",
    "dashboard.timing": "समय",
    "dashboard.applicationTiming": "अनुप्रयोग समय",
    "dashboard.organicOptions": "जैविक विकल्प",
    "dashboard.costEstimate": "लागत अनुमान",
    "dashboard.totalEstimate": "कुल अनुमान",
    "dashboard.for": "के लिए",
    "dashboard.farmerDashboard": "किसान डैशबोर्ड",

    // Profile
    "profile.failedToLoad": "प्रोफ़ाइल डेटा लोड करने में विफल",
    "profile.profileUpdated": "प्रोफ़ाइल अपडेट किया गया",
    "profile.profileUpdateSuccess":
      "आपका प्रोफ़ाइल सफलतापूर्वक अपडेट किया गया है।",
    "profile.failedToUpdate": "प्रोफ़ाइल अपडेट करने में विफल",
    "profile.loadingProfile": "प्रोफ़ाइल लोड हो रहा है...",
    "profile.editProfile": "प्रोफ़ाइल संपादित करें",
    "profile.updatePersonalInfo":
      "अपनी व्यक्तिगत जानकारी और खेत के विवरण अपडेट करें",
    "profile.fullName": "पूरा नाम",
    "profile.enterFullName": "अपना पूरा नाम दर्ज करें",
    "profile.email": "ईमेल",
    "profile.enterEmail": "अपना ईमेल दर्ज करें",
    "profile.farmLocation": "खेत का स्थान",
    "profile.cityStateCountry": "शहर, राज्य, देश",
    "profile.phoneNumber": "फ़ोन नंबर",
    "profile.farmSize": "खेत का आकार",
    "profile.unit": "इकाई",
    "profile.hectares": "हेक्टेयर",
    "profile.acres": "एकड़",
    "profile.bigha": "बीघा",
    "profile.saving": "सहेज रहा है...",
    "profile.saveChanges": "परिवर्तन सहेजें",

    // Forms
    "form.fieldName": "खेत का नाम",
    "form.fieldSize": "खेत का आकार",
    "form.cropType": "फसल का प्रकार",
    "form.soilPH": "मिट्टी का pH",
    "form.nitrogen": "नाइट्रोजन (N)",
    "form.phosphorus": "फास्फोरस (P)",
    "form.potassium": "पोटैशियम (K)",
    "form.soilType": "मिट्टी का प्रकार",
    "form.temperature": "तापमान",
    "form.humidity": "आर्द्रता",
    "form.soilMoisture": "मिट्टी की नमी",
    "form.submit": "सिफारिशें प्राप्त करें",
    "form.generating": "सिफारिशें तैयार की जा रही हैं...",
    "form.reset": "फॉर्म रीसेट करें",
    "form.fieldInfo": "खेत की जानकारी",
    "form.cropSoilInfo": "फसल और मिट्टी की जानकारी",
    "form.environmentalConditions": "पर्यावरणीय स्थितियां",
    "form.autoFillWithSensorData": "सेंसर डेटा से स्वतः भरें",
    "form.sensorDataUnavailable": "सेंसर डेटा उपलब्ध नहीं है",
    "form.autoFilled": "स्वतः भरा गया",
    "form.formFilledWithSensorData":
      "फॉर्म को रीयल-टाइम सेंसर डेटा से भर दिया गया है",
    "form.noDataAvailable": "कोई डेटा उपलब्ध नहीं है",
    "form.realTimeSensorDataNotAvailable":
      "रीयल-टाइम सेंसर डेटा उपलब्ध नहीं है",
    "form.sowingDate": "बुवाई की तारीख",
    "form.selectSowingDate": "वह तारीख चुनें जब आपने फसल बोई/लगाई थी",

    // Common
    "common.loading": "लोड हो रहा है...",
    "common.error": "त्रुटि",
    "common.success": "सफलता",
    "common.save": "सहेजें",
    "common.cancel": "रद्द करें",
    "common.edit": "संपादित करें",
    "common.delete": "हटाएं",
    "common.yes": "हाँ",
    "common.no": "नहीं",
    "common.back": "वापस",

    // Language switcher
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.punjabi": "ਪੰਜਾਬੀ",
    "language.select": "भाषा चुनें",

    // Auth pages
    "auth.welcomeBack": "वापसी पर स्वागत है",
    "auth.signInAccount": "अपने AgriCure खाते में साइन इन करें",
    "auth.email": "ईमेल",
    "auth.password": "पासवर्ड",
    "auth.login": "लॉगिन",
    "auth.backToHome": "होम पर वापस जाएं",
    "auth.loginSuccess": "लॉगिन सफल",
    "auth.loginFailed": "लॉगिन विफल",
    "auth.invalidCredentials": "अमान्य ईमेल या पासवर्ड",
    "auth.signup": "साइन अप",
    "auth.createAccount": "खाता बनाएं",
    "auth.signupAccount": "अपना AgriCure खाता बनाएं",
    "auth.fullName": "पूरा नाम",
    "auth.confirmPassword": "पासवर्ड की पुष्टि करें",
    "auth.farmLocation": "खेत का स्थान",
    "auth.accountCreated": "खाता सफलतापूर्वक बनाया गया",
    "auth.welcomeToAgriCure":
      "AgriCure में आपका स्वागत है! अब आप अपने खाते में साइन इन कर सकते हैं।",
    "auth.signupFailed": "साइन अप विफल",
    "auth.failedToCreateAccount": "खाता बनाने में विफल",
    "auth.passwordsDoNotMatch": "पासवर्ड मेल नहीं खाते",
    "auth.haveAccount": "खाता नहीं है?",
    "auth.signupHere": "यहां साइन अप करें",
    "auth.alreadyHaveAccount": "पहले से ही खाता है?",
    "auth.signInHere": "यहां साइन इन करें",

    // Hero Section
    "hero.title": "बेहतर उपज के लिए",
    "hero.titleHighlight": "स्मार्ट खेती",
    "hero.subtitle":
      "अपने मिट्टी विश्लेषण के आधार पर व्यक्तिगत उर्वरक सिफारिशें प्राप्त करें। डेटा-संचालित खेती निर्णयों के साथ अपनी फसल की पैदावार को अधिकतम करें।",
    "hero.startTrial": "मुफ्त परीक्षण शुरू करें",
    "hero.viewDemo": "डेमो देखें",
    "hero.accuracyRate": "सटीकता दर",
    "hero.yieldIncrease": "उपज में वृद्धि",
    "hero.cropTypesSupported": "फसल प्रकार समर्थित",

    // Features Section
    "features.title": "स्मार्ट खेती के लिए आपको जो कुछ चाहिए",
    "features.subtitle":
      "हमारा व्यापक प्लेटफॉर्म आपको अपने खेती संचालन को अनुकूलित करने के लिए आवश्यक सभी उपकरण और अंतर्दृष्टि प्रदान करता है।",
    "features.preciseAnalysis.title": "सटीक मिट्टी विश्लेषण",
    "features.preciseAnalysis.description":
      "सटीक सिफारिशों के लिए अपनी मिट्टी के pH, नाइट्रोजन, फास्फोरस, पोटैशियम और नमी के स्तर के बारे में विस्तृत जानकारी प्राप्त करें।",
    "features.smartRecommendations.title": "स्मार्ट उर्वरक सिफारिशें",
    "features.smartRecommendations.description":
      "अपनी विशिष्ट मिट्टी की स्थिति और फसल आवश्यकताओं के आधार पर व्यक्तिगत उर्वरक सुझाव प्राप्त करें।",
    "features.yieldTracking.title": "उपज ट्रैकिंग",
    "features.yieldTracking.description":
      "हमारे व्यापक विश्लेषण डैशबोर्ड के साथ अपने फसल प्रदर्शन की निगरानी करें और समय के साथ सुधार को ट्रैक करें।",
    "features.mobileDesign.title": "मोबाइल-फर्स्ट डिज़ाइन",
    "features.mobileDesign.description":
      "मोबाइल उपकरणों के लिए अनुकूलित हमारे रेस्पॉन्सिव डिज़ाइन के साथ कहीं भी, कभी भी अपने खेत के डेटा तक पहुंचें।",
    "features.expertSupport.title": "विशेषज्ञ समर्थन",
    "features.expertSupport.description":
      "कृषि विशेषज्ञों से मार्गदर्शन प्राप्त करें और सफल किसानों के समुदाय से जुड़ें।",
    "features.dataSecurity.title": "डेटा सुरक्षा",
    "features.dataSecurity.description":
      "आपका खेत डेटा एंटरप्राइज-ग्रेड सुरक्षा और गोपनीयता उपायों के साथ संरक्षित है।",

    // CTA Section
    "cta.title": "अपनी खेती को बदलने के लिए तैयार हैं?",
    "cta.subtitle":
      "हजारों किसानों में शामिल हों जो पहले से ही अपनी उपज बढ़ाने और लागत कम करने के लिए स्मार्ट तकनीक का उपयोग कर रहे हैं।",
    "cta.getStarted": "मुफ्त में शुरू करें",
    "cta.alreadyMember": "पहले से ही सदस्य हैं?",

    // How It Works Section
    "howItWorks.title": "AgriCure कैसे काम करता है",
    "howItWorks.subtitle":
      "सेंसर तैनाती से लेकर कार्रवाई योग्य सिफारिशों तक चार सरल चरणों में",
    "howItWorks.step": "चरण",
    "howItWorks.deploySensors.title": "सेंसर तैनात करें",
    "howItWorks.deploySensors.description":
      "रीयल-टाइम में मिट्टी की स्थिति की निगरानी के लिए अपने खेतों में IoT सेंसर स्थापित करें।",
    "howItWorks.streamData.title": "डेटा को क्लाउड में स्ट्रीम करें",
    "howItWorks.streamData.description":
      "सेंसर डेटा स्वचालित रूप से प्रसंस्करण के लिए हमारे सुरक्षित क्लाउड प्लेटफॉर्म पर प्रेषित किया जाता है।",
    "howItWorks.mlRecommends.title": "ML खुराक की सिफारिश करता है",
    "howItWorks.mlRecommends.description":
      "हमारा AI आपके डेटा का विश्लेषण करता है और सटीक उर्वरक सिफारिशें उत्पन्न करता है।",
    "howItWorks.applyDashboard.title": "डैशबोर्ड के माध्यम से लागू करें",
    "howItWorks.applyDashboard.description":
      "अपने डैशबोर्ड या Variable Rate Application सिस्टम के माध्यम से कार्रवाई योग्य अंतर्दृष्टि प्राप्त करें।",

    // Footer
    "footer.tagline":
      "टिकाऊ और लाभदायक कृषि के लिए स्मार्ट तकनीक के साथ किसानों को सशक्त बनाना।",
    "footer.product": "उत्पाद",
    "footer.features": "विशेषताएं",
    "footer.pricing": "मूल्य निर्धारण",
    "footer.api": "API",
    "footer.support": "समर्थन",
    "footer.helpCenter": "सहायता केंद्र",
    "footer.contactUs": "संपर्क करें",
    "footer.community": "समुदाय",
    "footer.company": "कंपनी",
    "footer.about": "हमारे बारे में",
    "footer.blog": "ब्लॉग",
    "footer.careers": "करियर",
    "footer.copyright": "© 2025 AgriCure. सर्वाधिकार सुरक्षित।",

    // 404 Page
    "notFound.title": "पृष्ठ नहीं मिला",
    "notFound.description":
      "उफ्फ! जिस पृष्ठ को आप खोज रहे हैं वह मौजूद नहीं है या स्थानांतरित कर दिया गया है।",
    "notFound.goBack": "वापस जाएं",
    "notFound.returnHome": "होम पर वापस जाएं",
  },
  pa: {
    // Navigation
    "nav.home": "ਹੋਮ",
    "nav.features": "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
    "nav.howItWorks": "ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    "nav.login": "ਲੌਗਿਨ",
    "nav.signup": "ਸ਼ੁਰੂ ਕਰੋ",
    "nav.start": "ਸ਼ੁਰੂ",

    // Dashboard
    "dashboard.title": "ਡੈਸ਼ਬੋਰਡ",
    "dashboard.subtitle":
      "ਰੀਅਲ-ਟਾਈਮ ਡੇਟਾ ਅਤੇ ML ਦੁਆਰਾ ਸੰਚਾਲਿਤ ਵਿਆਪਕ ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਖਾਦ ਸਿਫਾਰਸ਼ਾਂ",
    "dashboard.overview": "ਖੇਤ ਦਾ ਜਾਇਜ਼ਾ",
    "dashboard.soilAnalysis": "ਰੀਅਲ-ਟਾਈਮ ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ",
    "dashboard.fertilizerForm": "ਖਾਦ ਸਿਫਾਰਸ਼",
    "dashboard.recommendations": "ਸਿਫਾਰਸ਼ਾਂ",
    "dashboard.profile": "ਪ੍ਰੋਫਾਈਲ",
    "dashboard.overallSoilHealth": "ਸਮੁੱਚੀ ਮਿੱਟੀ ਸਿਹਤ",
    "dashboard.soilMoisture": "ਮਿੱਟੀ ਦੀ ਨਮੀ",
    "dashboard.temperature": "ਤਾਪਮਾਨ",
    "dashboard.humidity": "ਨਮੀ",
    "dashboard.npkLevels": "ਐਨਪੀਕੇ ਪੱਧਰ (ਰੀਅਲ-ਟਾਈਮ)",
    "dashboard.npkDescription": "ਸੈਂਸਰ ਤੋਂ ਮੌਜੂਦਾ ਪੋਸ਼ਕ ਤੱਤ ਪੱਧਰ",
    "dashboard.nitrogen": "ਨਾਈਟ੍ਰੋਜਨ (N)",
    "dashboard.phosphorus": "ਫਾਸਫੋਰਸ (P)",
    "dashboard.potassium": "ਪੋਟਾਸ਼ੀਅਮ (K)",
    "dashboard.lastUpdated": "ਆਖਰੀ ਅਪਡੇਟ",
    "dashboard.registeredFarms": "ਰਜਿਸਟਰਡ ਖੇਤ",
    "dashboard.farmsDescription": "ਤੁਹਾਡੇ ਸਾਰੇ ਖੇਤ ਜਾਇਦਾਦਾਂ ਦਾ ਜਾਇਜ਼ਾ",
    "dashboard.addFarm": "ਖੇਤ ਜੋੜੋ",
    "dashboard.noFarmsYet": "ਹਾਲੇ ਤੱਕ ਕੋਈ ਖੇਤ ਨਹੀਂ ਜੋੜਿਆ ਗਿਆ।",
    "dashboard.editFarm": "ਖੇਤ ਸੰਪਾਦਿਤ ਕਰੋ",
    "dashboard.saveFarm": "ਖੇਤ ਸੇਵ ਕਰੋ",
    "dashboard.updateFarm": "ਖੇਤ ਅੱਪਡੇਟ ਕਰੋ",
    "dashboard.northField": "ਉੱਤਰ ਖੇਤ",
    "dashboard.southField": "ਦੱਖਣ ਖੇਤ",
    "dashboard.eastField": "ਪੂਰਬ ਖੇਤ",
    "dashboard.hectares": "ਹੈਕਟੇਅਰ",
    "dashboard.twoHoursAgo": "2 ਘੰਟੇ ਪਹਿਲਾਂ",
    "dashboard.fourHoursAgo": "4 ਘੰਟੇ ਪਹਿਲਾਂ",
    "dashboard.oneHourAgo": "1 ਘੰਟਾ ਪਹਿਲਾਂ",
    "dashboard.health": "ਸਿਹਤ",
    "dashboard.size": "ਆਕਾਰ",
    "dashboard.recommendationHistory": "ਖਾਦ ਸਿਫਾਰਸ਼ ਇਤਿਹਾਸ",
    "dashboard.recommendationHistoryDescription":
      "ਪਿਛਲੀਆਂ ਸਿਫਾਰਸ਼ਾਂ ਅਤੇ ਉਹਨਾਂ ਦੀ ਐਪਲੀਕੇਸ਼ਨ ਸਥਿਤੀ",
    "dashboard.recommendationDetails": "ਸਿਫਾਰਸ਼ ਵੇਰਵੇ",
    "dashboard.appliedQuestion": "ਕੀ ਤੁਸੀਂ ਖਾਦ ਲਗਾਈ ਹੈ?",
    "dashboard.viewFullReport": "ਪੂਰੀ ਰਿਪੋਰਟ ਵੇਖੋ",
    "dashboard.loadingRecommendations": "ਸਿਫਾਰਸ਼ਾਂ ਲੋਡ ਹੋ ਰਹੀਆਂ ਹਨ...",
    "dashboard.primary": "ਪ੍ਰਾਇਮਰੀ",
    "dashboard.secondary": "ਸੈਕੰਡਰੀ",
    "dashboard.noRecommendationsYet": "ਅਜੇ ਤੱਕ ਕੋਈ ਸਿਫਾਰਸ਼ ਨਹੀਂ",
    "dashboard.startCreatingRecommendations":
      "ਐਮਐਲ ਸਿਫਾਰਸ਼ ਟੈਬ ਵਿੱਚ ਆਪਣੀ ਪਹਿਲੀ ਖਾਦ ਸਿਫਾਰਸ਼ ਬਣਾਉਣ ਨਾਲ ਸ਼ੁਰੂ ਕਰੋ।",
    "dashboard.connectedToThingSpeak": "ThingSpeak ਨਾਲ ਜੁੜਿਆ ਹੋਇਆ",
    "dashboard.usingDemoData": "ਡੈਮੋ ਡੇਟਾ ਵਰਤ ਰਿਹਾ ਹੈ",
    "dashboard.refreshData": "ਡੇਟਾ ਰਿਫਰੈਸ਼ ਕਰੋ",
    "dashboard.soilPH": "ਮਿੱਟੀ ਦਾ pH",
    "dashboard.npkLevelsTrend": "ਐਨਪੀਕੇ ਪੱਧਰ ਰੁਝਾਨ (24 ਘੰਟੇ)",
    "dashboard.historicalNutrientLevels": "ਇਤਿਹਾਸਕ ਪੋਸ਼ਕ ਤੱਤ ਪੱਧਰ",
    "dashboard.environmentalConditions": "ਪਰਿਆਵਰਣੀ ਸਥਿਤੀਆਂ",
    "dashboard.temperatureHumidityMoisture": "ਤਾਪਮਾਨ, ਨਮੀ ਅਤੇ ਨਮੀ ਪੱਧਰ",
    "dashboard.completeFormForRecommendations":
      "ਵਿਸਤ੍ਰਿਤ ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਉੱਨਤ ਖਾਦ ਫਾਰਮ ਪੂਰਾ ਕਰੋ।",
    "dashboard.mlModelPrediction": "ਐਮਐਲ ਮਾਡਲ ਭਵਿੱਖਬਾਣੀ",
    "dashboard.aiPoweredRecommendation":
      "ਤੁਹਾਡੇ ਮਿੱਟੀ ਅਤੇ ਫਸਲ ਡੇਟਾ ਦੇ ਆਧਾਰ ਤੇ ਏਆਈ-ਸੰਚਾਲਿਤ ਖਾਦ ਸਿਫਾਰਸ਼",
    "dashboard.fieldAnalysisSummary": "ਖੇਤ ਵਿਸ਼ਲੇਸ਼ਣ ਸਾਰਾਂਸ਼",
    "dashboard.recommendationsFor": "ਲਈ ਸਿਫਾਰਸ਼ਾਂ",
    "dashboard.cropType": "ਫਸਲ ਦਾ ਕਿਸਮ",
    "dashboard.soilType": "ਮਿੱਟੀ ਦਾ ਕਿਸਮ",
    "dashboard.soil": "ਮਿੱਟੀ",
    "dashboard.soilConditionAnalysis": "ਮਿੱਟੀ ਦੀ ਸਥਿਤੀ ਵਿਸ਼ਲੇਸ਼ਣ",
    "dashboard.detailedSoilAnalysis":
      "ਤੁਹਾਡੀਆਂ ਮਿੱਟੀ ਦੀਆਂ ਸਥਿਤੀਆਂ ਦਾ ਵਿਸਤ੍ਰਿਤ ਵਿਸ਼ਲੇਸ਼ਣ",
    "dashboard.currentStatus": "ਮੌਜੂਦਾ ਸਥਿਤੀ",
    "dashboard.phStatus": "pH ਸਥਿਤੀ",
    "dashboard.moistureStatus": "ਨਮੀ ਸਥਿਤੀ",
    "dashboard.nutrientDeficiencies": "ਪੋਸ਼ਕ ਤੱਤਾਂ ਦੀ ਕਮੀ",
    "dashboard.noneDetected": "ਕੋਈ ਨਹੀਂ ਮਿਲਿਆ",
    "dashboard.primaryFertilizer": "ਪ੍ਰਾਇਮਰੀ ਖਾਦ",
    "dashboard.secondaryFertilizer": "ਸੈਕੰਡਰੀ ਖਾਦ",
    "dashboard.reason": "ਕਾਰਨ",
    "dashboard.applicationMethod": "ਐਪਲੀਕੇਸ਼ਨ ਵਿਧੀ",
    "dashboard.organicAlternatives": "ਜੈਵਿਕ ਵਿਕਲਪ",
    "dashboard.sustainableOptions":
      "ਲੰਬੇ ਸਮੇਂ ਦੇ ਮਿੱਟੀ ਸਿਹਤ ਸੁਧਾਰ ਲਈ ਟਿਕਾਊ ਵਿਕਲਪ",
    "dashboard.timing": "ਸਮਾਂ",
    "dashboard.applicationTiming": "ਐਪਲੀਕੇਸ਼ਨ ਸਮਾਂ",
    "dashboard.organicOptions": "ਜੈਵਿਕ ਵਿਕਲਪ",
    "dashboard.costEstimate": "ਲਾਗਤ ਅਨੁਮਾਨ",
    "dashboard.totalEstimate": "ਕੁੱਲ ਅਨੁਮਾਨ",
    "dashboard.for": "ਲਈ",
    "dashboard.farmerDashboard": "ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ",

    // Profile
    "profile.failedToLoad": "ਪ੍ਰੋਫਾਈਲ ਡੇਟਾ ਲੋਡ ਕਰਨ ਵਿੱਚ ਅਸਫਲ",
    "profile.profileUpdated": "ਪ੍ਰੋਫਾਈਲ ਅਪਡੇਟ ਕੀਤਾ ਗਿਆ",
    "profile.profileUpdateSuccess":
      "ਤੁਹਾਡਾ ਪ੍ਰੋਫਾਈਲ ਸਫਲਤਾਪੂਰਵਕ ਅਪਡੇਟ ਕੀਤਾ ਗਿਆ ਹੈ।",
    "profile.failedToUpdate": "ਪ੍ਰੋਫਾਈਲ ਅਪਡੇਟ ਕਰਨ ਵਿੱਚ ਅਸਫਲ",
    "profile.loadingProfile": "ਪ੍ਰੋਫਾਈਲ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    "profile.editProfile": "ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ",
    "profile.updatePersonalInfo":
      "ਆਪਣੀ ਨਿੱਜੀ ਜਾਣਕਾਰੀ ਅਤੇ ਖੇਤ ਦੇ ਵੇਰਵੇ ਅਪਡੇਟ ਕਰੋ",
    "profile.fullName": "ਪੂਰਾ ਨਾਮ",
    "profile.enterFullName": "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ",
    "profile.email": "ਈਮੇਲ",
    "profile.enterEmail": "ਆਪਣਾ ਈਮੇਲ ਦਰਜ ਕਰੋ",
    "profile.farmLocation": "ਖੇਤ ਦਾ ਸਥਾਨ",
    "profile.cityStateCountry": "ਸ਼ਹਿਰ, ਰਾਜ, ਦੇਸ਼",
    "profile.phoneNumber": "ਫੋਨ ਨੰਬਰ",
    "profile.farmSize": "ਖੇਤ ਦਾ ਆਕਾਰ",
    "profile.unit": "ਯੂਨਿਟ",
    "profile.hectares": "ਹੈਕਟੇਅਰ",
    "profile.acres": "ਏਕੜ",
    "profile.bigha": "ਬੀਘਾ",
    "profile.saving": "ਸੇਵ ਕਰ ਰਿਹਾ ਹੈ...",
    "profile.saveChanges": "ਬਦਲਾਅ ਸੇਵ ਕਰੋ",

    // Forms
    "form.fieldName": "ਖੇਤ ਦਾ ਨਾਮ",
    "form.fieldSize": "ਖੇਤ ਦਾ ਆਕਾਰ",
    "form.cropType": "ਫਸਲ ਦਾ ਕਿਸਮ",
    "form.soilPH": "ਮਿੱਟੀ ਦਾ pH",
    "form.nitrogen": "ਨਾਈਟ੍ਰੋਜਨ (N)",
    "form.phosphorus": "ਫਾਸਫੋਰਸ (P)",
    "form.potassium": "ਪੋਟਾਸ਼ੀਅਮ (K)",
    "form.soilType": "ਮਿੱਟੀ ਦਾ ਕਿਸਮ",
    "form.temperature": "ਤਾਪਮਾਨ",
    "form.humidity": "ਨਮੀ",
    "form.soilMoisture": "ਮਿੱਟੀ ਦੀ ਨਮੀ",
    "form.submit": "ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ",
    "form.generating": "ਸਿਫਾਰਸ਼ਾਂ ਤਿਆਰ ਕੀਤੀਆਂ ਜਾ ਰਹੀਆਂ ਹਨ...",
    "form.reset": "ਫਾਰਮ ਰੀਸੈਟ ਕਰੋ",
    "form.fieldInfo": "ਖੇਤ ਦੀ ਜਾਣਕਾਰੀ",
    "form.cropSoilInfo": "ਫਸਲ ਅਤੇ ਮਿੱਟੀ ਦੀ ਜਾਣਕਾਰੀ",
    "form.environmentalConditions": "ਪਰਿਆਵਰਣੀ ਸਥਿਤੀਆਂ",
    "form.autoFillWithSensorData": "ਸੈਂਸਰ ਡੇਟਾ ਨਾਲ ਆਟੋ-ਭਰੋ",
    "form.sensorDataUnavailable": "ਸੈਂਸਰ ਡੇਟਾ ਉਪਲਬਧ ਨਹੀਂ ਹੈ",
    "form.autoFilled": "ਆਟੋ-ਭਰਿਆ ਗਿਆ",
    "form.formFilledWithSensorData":
      "ਫਾਰਮ ਨੂੰ ਰੀਅਲ-ਟਾਈਮ ਸੈਂਸਰ ਡੇਟਾ ਨਾਲ ਭਰ ਦਿੱਤਾ ਗਿਆ ਹੈ",
    "form.noDataAvailable": "ਕੋਈ ਡੇਟਾ ਉਪਲਬਧ ਨਹੀਂ ਹੈ",
    "form.realTimeSensorDataNotAvailable": "ਰੀਅਲ-ਟਾਈਮ ਸੈਂਸਰ ਡੇਟਾ ਉਪਲਬਧ ਨਹੀਂ ਹੈ",
    "form.sowingDate": "ਬੀਜਣ ਦੀ ਮਿਤੀ",
    "form.selectSowingDate": "ਉਹ ਮਿਤੀ ਚੁਣੋ ਜਦੋਂ ਤੁਸੀਂ ਫਸਲ ਬੀਜੀ/ਲਗਾਈ ਸੀ",

    // Common
    "common.loading": "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    "common.error": "ਗਲਤੀ",
    "common.success": "ਸਫਲਤਾ",
    "common.save": "ਸੇਵ ਕਰੋ",
    "common.cancel": "ਰੱਦ ਕਰੋ",
    "common.edit": "ਸੰਪਾਦਿਤ ਕਰੋ",
    "common.delete": "ਹਟਾਓ",
    "common.yes": "ਹਾਂ",
    "common.no": "ਨਹੀਂ",
    "common.back": "ਵਾਪਸ",

    // Language switcher
    "language.english": "English",
    "language.hindi": "हिंदी",
    "language.punjabi": "ਪੰਜਾਬੀ",
    "language.select": "ਭਾਸ਼ਾ ਚੁਣੋ",

    // Auth pages
    "auth.welcomeBack": "ਵਾਪਸੀ ਤੇ ਸਵਾਗਤ ਹੈ",
    "auth.signInAccount": "ਆਪਣੇ AgriCure ਖਾਤੇ ਵਿੱਚ ਸਾਈਨ ਇਨ ਕਰੋ",
    "auth.email": "ਈਮੇਲ",
    "auth.password": "ਪਾਸਵਰਡ",
    "auth.login": "ਲੌਗਿਨ",
    "auth.backToHome": "ਹੋਮ ਤੇ ਵਾਪਸ ਜਾਓ",
    "auth.loginSuccess": "ਲੌਗਿਨ ਸਫਲ",
    "auth.loginFailed": "ਲੌਗਿਨ ਅਸਫਲ",
    "auth.invalidCredentials": "ਅਵੈਧ ਈਮੇਲ ਜਾਂ ਪਾਸਵਰਡ",
    "auth.signup": "ਸਾਈਨ ਅਪ",
    "auth.createAccount": "ਖਾਤਾ ਬਣਾਓ",
    "auth.signupAccount": "ਆਪਣਾ AgriCure ਖਾਤਾ ਬਣਾਓ",
    "auth.fullName": "ਪੂਰਾ ਨਾਮ",
    "auth.confirmPassword": "ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
    "auth.farmLocation": "ਖੇਤ ਦਾ ਸਥਾਨ",
    "auth.accountCreated": "ਖਾਤਾ ਸਫਲਤਾਪੂਰਵਕ ਬਣਾਇਆ ਗਿਆ",
    "auth.welcomeToAgriCure":
      "AgriCure ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ! ਹੁਣ ਤੁਸੀਂ ਆਪਣੇ ਖਾਤੇ ਵਿੱਚ ਸਾਈਨ ਇਨ ਕਰ ਸਕਦੇ ਹੋ।",
    "auth.signupFailed": "ਸਾਈਨ ਅਪ ਅਸਫਲ",
    "auth.failedToCreateAccount": "ਖਾਤਾ ਬਣਾਉਣ ਵਿੱਚ ਅਸਫਲ",
    "auth.passwordsDoNotMatch": "ਪਾਸਵਰਡ ਮੇਲ ਨਹੀਂ ਖਾਂਦੇ",
    "auth.haveAccount": "ਖਾਤਾ ਨਹੀਂ ਹੈ?",
    "auth.signupHere": "ਇੱਥੇ ਸਾਈਨ ਅਪ ਕਰੋ",
    "auth.alreadyHaveAccount": "ਪਹਿਲਾਂ ਤੋਂ ਹੀ ਖਾਤਾ ਹੈ?",
    "auth.signInHere": "ਇੱਥੇ ਸਾਈਨ ਇਨ ਕਰੋ",

    // Hero Section
    "hero.title": "ਬਿਹਤਰ ਫਸਲਾਂ ਲਈ",
    "hero.titleHighlight": "ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ",
    "hero.subtitle":
      "ਆਪਣੇ ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ ਦੇ ਆਧਾਰ ਤੇ ਨਿੱਜੀ ਖਾਦ ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ। ਡੇਟਾ-ਆਧਾਰਿਤ ਖੇਤੀਬਾੜੀ ਫੈਸਲਿਆਂ ਨਾਲ ਆਪਣੀ ਫਸਲ ਦੀ ਪੈਦਾਵਾਰ ਨੂੰ ਵੱਧ ਤੋਂ ਵੱਧ ਕਰੋ।",
    "hero.startTrial": "ਮੁਫਤ ਟਰਾਇਲ ਸ਼ੁਰੂ ਕਰੋ",
    "hero.viewDemo": "ਡੇਮੋ ਦੇਖੋ",
    "hero.accuracyRate": "ਸ਼ੁੱਧਤਾ ਦਰ",
    "hero.yieldIncrease": "ਫਸਲ ਵਾਧਾ",
    "hero.cropTypesSupported": "ਫਸਲ ਦੀਆਂ ਕਿਸਮਾਂ ਸਮਰਥਿਤ",

    // Features Section
    "features.title": "ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ ਲਈ ਤੁਹਾਨੂੰ ਜੋ ਕੁਝ ਚਾਹੀਦਾ ਹੈ",
    "features.subtitle":
      "ਸਾਡਾ ਵਿਆਪਕ ਪਲੇਟਫਾਰਮ ਤੁਹਾਨੂੰ ਆਪਣੇ ਖੇਤੀਬਾੜੀ ਕਾਰਜਾਂ ਨੂੰ ਅਨੁਕੂਲ ਬਣਾਉਣ ਲਈ ਲੋੜੀਂਦੇ ਸਾਰੇ ਟੂਲ ਅਤੇ ਸੂਝ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।",
    "features.preciseAnalysis.title": "ਸ਼ੁੱਧ ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ",
    "features.preciseAnalysis.description":
      "ਸ਼ੁੱਧ ਸਿਫਾਰਸ਼ਾਂ ਲਈ ਆਪਣੀ ਮਿੱਟੀ ਦੇ pH, ਨਾਈਟ੍ਰੋਜਨ, ਫਾਸਫੋਰਸ, ਪੋਟਾਸ਼ੀਅਮ ਅਤੇ ਨਮੀ ਦੇ ਪੱਧਰਾਂ ਬਾਰੇ ਵਿਸਤ੍ਰਿਤ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ।",
    "features.smartRecommendations.title": "ਸਮਾਰਟ ਖਾਦ ਸਿਫਾਰਸ਼ਾਂ",
    "features.smartRecommendations.description":
      "ਆਪਣੀਆਂ ਵਿਸ਼ੇਸ਼ ਮਿੱਟੀ ਦੀਆਂ ਸਥਿਤੀਆਂ ਅਤੇ ਫਸਲ ਦੀਆਂ ਲੋੜਾਂ ਦੇ ਆਧਾਰ ਤੇ ਨਿੱਜੀ ਖਾਦ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ।",
    "features.yieldTracking.title": "ਫਸਲ ਟਰੈਕਿੰਗ",
    "features.yieldTracking.description":
      "ਸਾਡੇ ਵਿਆਪਕ ਵਿਸ਼ਲੇਸ਼ਣ ਡੈਸ਼ਬੋਰਡ ਨਾਲ ਆਪਣੇ ਫਸਲ ਦੇ ਪ੍ਰਦਰਸ਼ਨ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ ਅਤੇ ਸਮੇਂ ਦੇ ਨਾਲ ਸੁਧਾਰਾਂ ਨੂੰ ਟਰੈਕ ਕਰੋ।",
    "features.mobileDesign.title": "ਮੋਬਾਇਲ-ਫਰਸਟ ਡਿਜ਼ਾਈਨ",
    "features.mobileDesign.description":
      "ਮੋਬਾਇਲ ਡਿਵਾਈਸਾਂ ਲਈ ਅਨੁਕੂਲਿਤ ਸਾਡੇ ਰਿਸਪਾਂਸਿਵ ਡਿਜ਼ਾਈਨ ਨਾਲ ਕਿਤੇ ਵੀ, ਕਦੇ ਵੀ ਆਪਣੇ ਖੇਤ ਦੇ ਡੇਟਾ ਤੱਕ ਪਹੁੰਚ ਕਰੋ।",
    "features.expertSupport.title": "ਵਿਸ਼ੇਸ਼ਜ ਸਹਾਇਤਾ",
    "features.expertSupport.description":
      "ਖੇਤੀਬਾੜੀ ਵਿਸ਼ੇਸ਼ਜਾਂ ਤੋਂ ਮਾਰਗਦਰਸ਼ਨ ਪ੍ਰਾਪਤ ਕਰੋ ਅਤੇ ਸਫਲ ਕਿਸਾਨਾਂ ਦੇ ਭਾਈਚਾਰੇ ਨਾਲ ਜੁੜੋ।",
    "features.dataSecurity.title": "ਡੇਟਾ ਸੁਰੱਖਿਆ",
    "features.dataSecurity.description":
      "ਤੁਹਾਡਾ ਖੇਤ ਡੇਟਾ ਐਂਟਰਪ੍ਰਾਈਜ਼-ਗ੍ਰੇਡ ਸੁਰੱਖਿਆ ਅਤੇ ਗੋਪਨੀਯਤਾ ਉਪਾਵਾਂ ਨਾਲ ਸੁਰੱਖਿਅਤ ਹੈ।",

    // CTA Section
    "cta.title": "ਆਪਣੀ ਖੇਤੀਬਾੜੀ ਨੂੰ ਬਦਲਣ ਲਈ ਤਿਆਰ ਹੋ?",
    "cta.subtitle":
      "ਹਜ਼ਾਰਾਂ ਕਿਸਾਨਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ ਜੋ ਪਹਿਲਾਂ ਤੋਂ ਹੀ ਆਪਣੀ ਫਸਲ ਵਧਾਉਣ ਅਤੇ ਲਾਗਤ ਘਟਾਉਣ ਲਈ ਸਮਾਰਟ ਤਕਨਾਲੋਜੀ ਦੀ ਵਰਤੋਂ ਕਰ ਰਹੇ ਹਨ।",
    "cta.getStarted": "ਮੁਫਤ ਵਿੱਚ ਸ਼ੁਰੂ ਕਰੋ",
    "cta.alreadyMember": "ਪਹਿਲਾਂ ਤੋਂ ਹੀ ਮੈਂਬਰ ਹੋ?",

    // How It Works Section
    "howItWorks.title": "AgriCure ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    "howItWorks.subtitle":
      "ਸੈਂਸਰ ਤੈਨਾਤੀ ਤੋਂ ਕਾਰਵਾਈ ਯੋਗ ਸਿਫਾਰਸ਼ਾਂ ਤੱਕ ਚਾਰ ਸਧਾਰਨ ਕਦਮਾਂ ਵਿੱਚ",
    "howItWorks.step": "ਕਦਮ",
    "howItWorks.deploySensors.title": "ਸੈਂਸਰ ਤੈਨਾਤ ਕਰੋ",
    "howItWorks.deploySensors.description":
      "ਰੀਅਲ-ਟਾਈਮ ਵਿੱਚ ਮਿੱਟੀ ਦੀਆਂ ਸਥਿਤੀਆਂ ਦੀ ਨਿਗਰਾਨੀ ਲਈ ਆਪਣੇ ਖੇਤਾਂ ਵਿੱਚ IoT ਸੈਂਸਰ ਸਥਾਪਤ ਕਰੋ।",
    "howItWorks.streamData.title": "ਡੇਟਾ ਨੂੰ ਕਲਾਊਡ ਵਿੱਚ ਸਟ੍ਰੀਮ ਕਰੋ",
    "howItWorks.streamData.description":
      "ਸੈਂਸਰ ਡੇਟਾ ਆਪਣੇ ਆਪ ਸੁਰੱਖਿਅਤ ਕਲਾਊਡ ਪਲੇਟਫਾਰਮ ਤੇ ਪ੍ਰੋਸੈਸਿੰਗ ਲਈ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ।",
    "howItWorks.mlRecommends.title": "ML ਖੁਰਾਕ ਦੀ ਸਿਫਾਰਸ਼ ਕਰਦਾ ਹੈ",
    "howItWorks.mlRecommends.description":
      "ਸਾਡਾ AI ਤੁਹਾਡੇ ਡੇਟਾ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਦਾ ਹੈ ਅਤੇ ਸ਼ੁੱਧ ਖਾਦ ਸਿਫਾਰਸ਼ਾਂ ਤਿਆਰ ਕਰਦਾ ਹੈ।",
    "howItWorks.applyDashboard.title": "ਡੈਸ਼ਬੋਰਡ ਰਾਹੀਂ ਲਾਗੂ ਕਰੋ",
    "howItWorks.applyDashboard.description":
      "ਆਪਣੇ ਡੈਸ਼ਬੋਰਡ ਜਾਂ Variable Rate Application ਸਿਸਟਮ ਰਾਹੀਂ ਕਾਰਵਾਈ ਯੋਗ ਸੂਝਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।",

    // Footer
    "footer.tagline":
      "ਟਿਕਾਊ ਅਤੇ ਲਾਭਦਾਇਕ ਖੇਤੀਬਾੜੀ ਲਈ ਸਮਾਰਟ ਤਕਨਾਲੋਜੀ ਨਾਲ ਕਿਸਾਨਾਂ ਨੂੰ ਸਸ਼ਕਤ ਬਣਾਉਣਾ।",
    "footer.product": "ਉਤਪਾਦ",
    "footer.features": "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
    "footer.pricing": "ਕੀਮਤ",
    "footer.api": "API",
    "footer.support": "ਸਹਾਇਤਾ",
    "footer.helpCenter": "ਸਹਾਇਤਾ ਕੇਂਦਰ",
    "footer.contactUs": "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    "footer.community": "ਭਾਈਚਾਰਾ",
    "footer.company": "ਕੰਪਨੀ",
    "footer.about": "ਸਾਡੇ ਬਾਰੇ",
    "footer.blog": "ਬਲੌਗ",
    "footer.careers": "ਕਰੀਅਰ",
    "footer.copyright": "© 2025 AgriCure. ਸਾਰੇ ਅਧਿਕਾਰ ਸੁਰੱਖਿਅਤ।",

    // 404 Page
    "notFound.title": "ਪੰਨਾ ਨਹੀਂ ਮਿਲਿਆ",
    "notFound.description":
      "ਉਫ਼! ਜਿਸ ਪੰਨੇ ਨੂੰ ਤੁਸੀਂ ਖੋਜ ਰਹੇ ਹੋ ਉਹ ਮੌਜੂਦ ਨਹੀਂ ਹੈ ਜਾਂ ਸਥਾਨਾਂਤਰਿਤ ਕਰ ਦਿੱਤਾ ਗਿਆ ਹੈ।",
    "notFound.goBack": "ਵਾਪਸ ਜਾਓ",
    "notFound.returnHome": "ਹੋਮ ਤੇ ਵਾਪਸ ਜਾਓ",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
