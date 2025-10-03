import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EnhancedFertilizerRecommendations from "@/components/EnhancedFertilizerRecommendations";
import DetailedFertilizerRecommendations from "@/components/DetailedFertilizerRecommendations";
import LLMEnhancedFertilizerRecommendations from "@/components/LLMEnhancedFertilizerRecommendations";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormData {
  fieldName: string;
  fieldSize: string;
  sizeUnit: string;
  cropType: string;
  soilPH: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  soilType: string;
  temperature: string;
  humidity: string;
  soilMoisture: string;
}

interface EnhancedRecommendation {
  primaryFertilizer: {
    name: string;
    amount: string;
    reason: string;
    applicationMethod: string;
  };
  secondaryFertilizer: {
    name: string;
    amount: string;
    reason: string;
    applicationMethod: string;
  };
  organicOptions: Array<{
    name: string;
    amount: string;
    benefits: string;
    applicationTiming: string;
  }>;
  applicationTiming: {
    primary: string;
    secondary: string;
    organic: string;
  };
  costEstimate: {
    primary: string;
    secondary: string;
    organic: string;
    total: string;
  };
  soilConditionAnalysis: {
    phStatus: string;
    nutrientDeficiency: string[];
    moistureStatus: string;
    recommendations: string[];
  };
  mlPrediction: {
    fertilizer: string;
    confidence: number;
  };
}

const Recommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const {
    recommendations,
    formData,
    llmEnhancedData,
    isLLMEnhanced,
    useDetailedView,
  } = location.state || {};

  const handleBack = () => {
    navigate("/dashboard", { state: { activeTab: "recommendations" } });
  };

  // Handle case where neither old nor new format data is available
  if (!recommendations && !llmEnhancedData) {
    navigate("/dashboard");
    return null;
  }

  // Determine which component to render based on data type
  const shouldUseLLMComponent =
    isLLMEnhanced && llmEnhancedData?.llmEnhancedResult;
  const shouldUseDetailedView = useDetailedView || false;
  const displayFormData = llmEnhancedData || formData;
  const farmName =
    llmEnhancedData?.farm?.name || formData?.fieldName || "Unknown Farm";

  // If detailed view is requested, use the detailed component
  if (shouldUseDetailedView && recommendations && displayFormData) {
    return (
      <DetailedFertilizerRecommendations
        recommendations={recommendations}
        formData={displayFormData}
        isFromHistory={false}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header with Back Button */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              onClick={handleBack}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 bg-white hover:bg-gray-50 border border-gray-200 text-black hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="whitespace-nowrap">{t("common.back")}</span>
            </Button>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {t("recommendations.title")}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {shouldUseLLMComponent
                ? "AI-Enhanced Recommendations"
                : t("recommendations.subtitle")}{" "}
              - {farmName}
            </p>
          </div>
        </div>

        {/* AgriCure Logo and Brand */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src="/logo.png"
              alt="AgriCure Logo"
              className="h-12 w-12 sm:h-16 sm:w-16"
            />
            <h2 className="text-2xl sm:text-3xl font-bold text-grass-600">
              AgriCure
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 text-center max-w-md">
            {shouldUseLLMComponent
              ? "Advanced ML + LLM Powered Agricultural Intelligence"
              : "ML-Powered Agricultural Solutions for Smart Farming"}
          </p>
        </div>

        {/* Recommendations Content */}
        {shouldUseLLMComponent ? (
          <LLMEnhancedFertilizerRecommendations data={llmEnhancedData} />
        ) : (
          <EnhancedFertilizerRecommendations
            recommendations={recommendations}
            formData={displayFormData}
          />
        )}
      </div>
    </div>
  );
};

export default Recommendations;
