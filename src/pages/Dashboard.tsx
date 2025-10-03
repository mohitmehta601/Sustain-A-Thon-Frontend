import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/DashboardHeader";
import EnhancedFarmOverview from "@/components/EnhancedFarmOverview";
import RealTimeSoilAnalysis from "@/components/RealTimeSoilAnalysis";
import EnhancedFertilizerForm from "@/components/EnhancedFertilizerForm";
import EnhancedFertilizerRecommendations from "@/components/EnhancedFertilizerRecommendations";
import LLMEnhancedFertilizerRecommendations from "@/components/LLMEnhancedFertilizerRecommendations";
import {
  predictFertilizer,
  FERTILIZER_INFO,
  CROP_TYPES,
  SOIL_TYPES,
} from "@/services/fertilizerMLService";
import { authService } from "@/services/authService";
import { recommendationService } from "@/services/recommendationService";
import { UserProfile } from "@/services/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormData {
  selectedFarmId: string;
  soilPH: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  temperature: string;
  humidity: string;
  soilMoisture: string;
  mlPrediction?: string;
  llmEnhancedResult?: any; // LLM enhanced prediction result
  farm?: any;
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

const Dashboard = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [recommendations, setRecommendations] =
    useState<EnhancedRecommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { user: currentUser, error } = await authService.getCurrentUser();

      if (error || !currentUser) {
        navigate("/login");
        return;
      }

      setUser(currentUser);

      const { data: profile, error: profileError } =
        await authService.getUserProfile(currentUser.id);
      if (!profileError && profile) {
        setUserProfile(profile);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const generateEnhancedRecommendations = async (data: {
    selectedFarmId: string;
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
  }): Promise<EnhancedRecommendation> => {
    const pH = parseFloat(data.soilPH);
    const nitrogen = parseFloat(data.nitrogen);
    const phosphorus = parseFloat(data.phosphorus);
    const potassium = parseFloat(data.potassium);
    const moisture = parseFloat(data.soilMoisture);
    const fieldSize = parseFloat(data.fieldSize);

    const convertToHectares = (size: number, unit: string): number => {
      switch (unit) {
        case "acres":
          return size * 0.404686;
        case "bigha":
          return size * 0.1338;
        case "hectares":
        default:
          return size;
      }
    };

    const hectares = convertToHectares(fieldSize, data.sizeUnit);

    const mlInput = {
      temperature: parseFloat(data.temperature),
      humidity: parseFloat(data.humidity),
      moisture: parseFloat(data.soilMoisture),
      soilType: parseInt(data.soilType),
      cropType: parseInt(data.cropType),
      nitrogen: nitrogen,
      potassium: potassium,
      phosphorus: phosphorus,
    };

    const mlPrediction = await predictFertilizer(mlInput);

    const phStatus = pH < 6.0 ? t("soilStatus.acidic") : pH > 7.5 ? t("soilStatus.alkaline") : t("soilStatus.optimal");
    const moistureStatus =
      moisture < 40 ? t("soilStatus.low") : moisture > 80 ? t("soilStatus.high") : t("soilStatus.optimal");

    const nutrientDeficiency = [];
    if (nitrogen < 30) nutrientDeficiency.push(t("nutrients.nitrogen"));
    if (phosphorus < 15) nutrientDeficiency.push(t("nutrients.phosphorus"));
    if (potassium < 120) nutrientDeficiency.push(t("nutrients.potassium"));

    const cropName =
      Object.keys(CROP_TYPES).find(
        (key) =>
          CROP_TYPES[key as keyof typeof CROP_TYPES] === parseInt(data.cropType)
      ) || t("mlModel.unknown");
    const soilName =
      Object.keys(SOIL_TYPES).find(
        (key) =>
          SOIL_TYPES[key as keyof typeof SOIL_TYPES] === parseInt(data.soilType)
      ) || t("mlModel.unknown");

    const primaryFertilizerInfo =
      FERTILIZER_INFO[mlPrediction.fertilizer as keyof typeof FERTILIZER_INFO];

    const primaryFertilizer = {
      name: mlPrediction.fertilizer,
      amount: `${Math.round(100 * hectares)} kg`,
      reason: primaryFertilizerInfo
        ? primaryFertilizerInfo.description
        : `ML model recommends this fertilizer for ${cropName} in ${soilName} soil`,
      applicationMethod: primaryFertilizerInfo
        ? primaryFertilizerInfo.application
        : t("fertilizer.standardApplication"),
    };

    let secondaryFertilizer;
    if (nutrientDeficiency.includes(t("nutrients.phosphorus"))) {
      secondaryFertilizer = {
        name: t("fertilizer.dap"),
        amount: `${Math.round(50 * hectares)} kg`,
        reason: t("fertilizer.phosphorusDeficiency"),
        applicationMethod: t("fertilizer.basalDose"),
      };
    } else if (nutrientDeficiency.includes(t("nutrients.potassium"))) {
      secondaryFertilizer = {
        name: t("fertilizer.potassiumSulfate"),
        amount: `${Math.round(40 * hectares)} kg`,
        reason: t("fertilizer.potassiumDeficiency"),
        applicationMethod: t("fertilizer.fruitDevelopment"),
      };
    } else {
      secondaryFertilizer = {
        name: t("fertilizer.organicCompost"),
        amount: `${Math.round(1000 * hectares)} kg`,
        reason: t("fertilizer.improvesStructure"),
        applicationMethod: t("fertilizer.incorporateSoil"),
      };
    }

    const primaryCost = Math.round(hectares * 4000);
    const secondaryCost = Math.round(hectares * 2500);
    const organicCost = Math.round(hectares * 2000);
    const totalCost = primaryCost + secondaryCost + organicCost;

    return {
      primaryFertilizer,
      secondaryFertilizer,
      organicOptions: [
        {
          name: "Vermicompost",
          amount: `${Math.round(1000 * hectares)} kg`,
          benefits:
            "Rich in nutrients, improves soil structure and water retention",
          applicationTiming: "Apply 3-4 weeks before planting",
        },
        {
          name: "Neem Cake",
          amount: `${Math.round(200 * hectares)} kg`,
          benefits: "Natural pest deterrent and slow-release nitrogen source",
          applicationTiming: "Apply at the time of land preparation",
        },
        {
          name: "Bone Meal",
          amount: `${Math.round(150 * hectares)} kg`,
          benefits: "Excellent source of phosphorus and calcium",
          applicationTiming: "Apply as basal dose before sowing",
        },
      ],
      applicationTiming: {
        primary:
          "Apply 1-2 weeks before planting for optimal nutrient availability",
        secondary:
          "Apply during active growth phase or as recommended for specific fertilizer",
        organic: "Apply 3-4 weeks before planting to allow decomposition",
      },
      costEstimate: {
        primary: `₹${primaryCost.toLocaleString("en-IN")}`,
        secondary: `₹${secondaryCost.toLocaleString("en-IN")}`,
        organic: `₹${organicCost.toLocaleString("en-IN")}`,
        total: `₹${totalCost.toLocaleString("en-IN")}`,
      },
      soilConditionAnalysis: {
        phStatus,
        nutrientDeficiency,
        moistureStatus,
        recommendations: [
          phStatus !== "Optimal"
            ? `Adjust soil pH using ${pH < 6.0 ? "lime" : "sulfur"}`
            : "Maintain current pH levels",
          moistureStatus === "Low"
            ? "Increase irrigation frequency"
            : moistureStatus === "High"
            ? "Improve drainage"
            : "Maintain current moisture levels",
          nutrientDeficiency.length > 0
            ? `Address ${nutrientDeficiency.join(", ")} deficiency`
            : "Nutrient levels are adequate",
          "Regular soil testing every 6 months is recommended",
          "Consider crop rotation to maintain soil health",
        ].filter(Boolean),
      },
      mlPrediction,
    };
  };

  const handleFormSubmit = async (data: FormData & { farm: any }) => {
    setIsGenerating(true);

    try {
      setFormData(data);

      // Check if we have LLM-enhanced results
      if (data.llmEnhancedResult) {
        // Use LLM-enhanced recommendations
        if (user) {
          const recommendationData = {
            user_id: user.id,
            field_name: data.farm.name,
            field_size: data.farm.size,
            field_size_unit: data.farm.unit,
            crop_type: data.farm.crop_type,
            soil_type: data.farm.soil_type,
            soil_ph: parseFloat(data.soilPH),
            nitrogen: parseFloat(data.nitrogen),
            phosphorus: parseFloat(data.phosphorus),
            potassium: parseFloat(data.potassium),
            temperature: parseFloat(data.temperature),
            humidity: parseFloat(data.humidity),
            soil_moisture: parseFloat(data.soilMoisture),
            primary_fertilizer:
              data.llmEnhancedResult.primary_fertilizer?.name ||
              data.mlPrediction ||
              "Unknown",
            secondary_fertilizer:
              data.llmEnhancedResult.secondary_fertilizer?.name || "None",
            ml_prediction: data.mlPrediction || "Unknown",
            confidence_score: 92,
            cost_estimate: data.llmEnhancedResult.cost_estimate?.total || "₹0",
            status: "pending" as const,
          };

          const { error: saveError } =
            await recommendationService.createRecommendation(
              recommendationData
            );
          if (saveError) {
            console.error("Error saving recommendation:", saveError);
            toast({
              title: "Warning",
              description: "Recommendation generated but not saved to history",
              variant: "destructive",
            });
          }
        }

        // Navigate with LLM-enhanced data
        navigate("/recommendations", {
          state: {
            llmEnhancedData: data,
            isLLMEnhanced: true,
          },
        });
      } else {
        // Fallback to legacy enhanced recommendations
        const formDataForRecommendations = {
          selectedFarmId: data.selectedFarmId,
          fieldName: data.farm.name,
          fieldSize: data.farm.size.toString(),
          sizeUnit: data.farm.unit,
          cropType: data.farm.crop_type,
          soilPH: data.soilPH,
          nitrogen: data.nitrogen,
          phosphorus: data.phosphorus,
          potassium: data.potassium,
          soilType: data.farm.soil_type,
          temperature: data.temperature,
          humidity: data.humidity,
          soilMoisture: data.soilMoisture,
        };

        const enhancedRecommendations = await generateEnhancedRecommendations(
          formDataForRecommendations
        );

        if (user) {
          const recommendationData = {
            user_id: user.id,
            field_name: data.farm.name,
            field_size: data.farm.size,
            field_size_unit: data.farm.unit,
            crop_type: data.farm.crop_type,
            soil_type: data.farm.soil_type,
            soil_ph: parseFloat(data.soilPH),
            nitrogen: parseFloat(data.nitrogen),
            phosphorus: parseFloat(data.phosphorus),
            potassium: parseFloat(data.potassium),
            temperature: parseFloat(data.temperature),
            humidity: parseFloat(data.humidity),
            soil_moisture: parseFloat(data.soilMoisture),
            primary_fertilizer: enhancedRecommendations.primaryFertilizer.name,
            secondary_fertilizer:
              enhancedRecommendations.secondaryFertilizer.name,
            ml_prediction: enhancedRecommendations.mlPrediction.fertilizer,
            confidence_score: 92,
            cost_estimate: enhancedRecommendations.costEstimate.total,
            status: "pending" as const,
          };

          const { error: saveError } =
            await recommendationService.createRecommendation(
              recommendationData
            );
          if (saveError) {
            console.error("Error saving recommendation:", saveError);
            toast({
              title: "Warning",
              description: "Recommendation generated but not saved to history",
              variant: "destructive",
            });
          }
        }

        navigate("/recommendations", {
          state: {
            recommendations: enhancedRecommendations,
            formData: formDataForRecommendations,
            isLLMEnhanced: false,
            useDetailedView: true, // Use the new detailed view by default
          },
        });
      }

      setRecommendations(null); // Clear old recommendations
      toast({
        title: "Success!",
        description: "Fertilizer recommendations generated successfully",
      });
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleProfileUpdate = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grass-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        user={user}
        userProfile={userProfile}
        onProfileUpdate={handleProfileUpdate}
      />

      <div className="container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 py-3 xs:py-4 sm:py-6 md:py-8">
        <div className="mb-3 xs:mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 xs:mb-2 leading-tight">
            {t("dashboard.title")}
          </h1>
          <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-relaxed">
            {t("dashboard.subtitle")}
          </p>
        </div>

        <Tabs
          defaultValue="overview"
          className="space-y-3 xs:space-y-4 sm:space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 h-auto gap-0.5 xs:gap-1 sm:gap-2 p-1 bg-gray-100 rounded-lg">
            <TabsTrigger
              value="overview"
              className="text-xs xs:text-sm sm:text-base px-1 xs:px-2 sm:px-3 md:px-4 py-2.5 xs:py-3 sm:py-3 font-medium whitespace-nowrap data-[state=active]:bg-grass-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all duration-200 hover:bg-grass-50"
            >
              <span className="hidden xs:inline">
                {t("dashboard.overview")}
              </span>
              <span className="xs:hidden">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="soil-analysis"
              className="text-xs xs:text-sm sm:text-base px-1 xs:px-2 sm:px-3 md:px-4 py-2.5 xs:py-3 sm:py-3 font-medium whitespace-nowrap data-[state=active]:bg-grass-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all duration-200 hover:bg-grass-50"
            >
              <span className="hidden sm:inline">
                {t("dashboard.soilAnalysis")}
              </span>
              <span className="sm:hidden">Soil Analysis</span>
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="text-xs xs:text-sm sm:text-base px-1 xs:px-2 sm:px-3 md:px-4 py-2.5 xs:py-3 sm:py-3 font-medium whitespace-nowrap data-[state=active]:bg-grass-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md transition-all duration-200 hover:bg-grass-50"
            >
              <span className="hidden xs:inline">
                {t("dashboard.recommendations")}
              </span>
              <span className="xs:hidden">Recs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="overview"
            className="space-y-3 xs:space-y-4 sm:space-y-6"
          >
            <EnhancedFarmOverview user={user} />
          </TabsContent>

          <TabsContent
            value="soil-analysis"
            className="space-y-3 xs:space-y-4 sm:space-y-6"
          >
            <RealTimeSoilAnalysis />
          </TabsContent>

          <TabsContent
            value="recommendations"
            className="space-y-3 xs:space-y-4 sm:space-y-6"
          >
            <EnhancedFertilizerForm onSubmit={handleFormSubmit} user={user} />
            {isGenerating && (
              <div className="flex items-center justify-center py-6 xs:py-8">
                <div className="animate-spin rounded-full h-6 xs:h-7 sm:h-8 w-6 xs:w-7 sm:w-8 border-b-2 border-grass-600"></div>
                <span className="ml-2 xs:ml-3 text-xs xs:text-sm sm:text-base font-medium">
                  {t("form.generating")}
                </span>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
