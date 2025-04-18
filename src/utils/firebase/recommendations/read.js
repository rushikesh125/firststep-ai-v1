import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../config";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import toast from "react-hot-toast";

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const careerRecommendationsSchema = {
  description: "Career recommendations based on assessment data",
  type: SchemaType.OBJECT,
  properties: {
    career_recommendations: {
      type: SchemaType.OBJECT,
      properties: {
        primaryCareerPaths: {
          type: SchemaType.ARRAY,
          description: "List of primary recommended career paths",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              career: {
                type: SchemaType.STRING,
                description: "The name of the career path"
              },
              matchScore: {
                type: SchemaType.NUMBER,
                description: "Compatibility score for this career path"
              },
              reasonForMatch: {
                type: SchemaType.STRING,
                description: "Explanation of why this career matches the assessment"
              },
              industryOutlook: {
                type: SchemaType.OBJECT,
                description: "Information about the industry outlook",
                properties: {
                  growthRate: {
                    type: SchemaType.STRING,
                    description: "Projected growth rate of the industry"
                  },
                  marketDemand: {
                    type: SchemaType.STRING,
                    description: "Current market demand for professionals"
                  },
                  futureProspects: {
                    type: SchemaType.STRING,
                    description: "Future prospects of the career path"
                  },
                  topRecruiters: {
                    type: SchemaType.ARRAY,
                    description: "Information about top recruiters in this field",
                    items: {
                      type: SchemaType.OBJECT,
                      properties: {
                        type: {
                          type: SchemaType.STRING,
                          description: "Type of recruiter or industry segment"
                        },
                        companies: {
                          type: SchemaType.ARRAY,
                          description: "List of major companies hiring in this field",
                          items: {
                            type: SchemaType.STRING
                          }
                        },
                        averagePackage: {
                          type: SchemaType.STRING,
                          description: "Average compensation package offered"
                        }
                      },
                      required: ["type", "companies", "averagePackage"]
                    }
                  }
                },
                required: ["growthRate", "marketDemand", "futureProspects", "topRecruiters"]
              },
              subFields: {
                type: SchemaType.ARRAY,
                description: "Specialized sub-fields within this career path",
                items: {
                  type: SchemaType.OBJECT,
                  properties: {
                    name: {
                      type: SchemaType.STRING,
                      description: "Name of the sub-field"
                    },
                    description: {
                      type: SchemaType.STRING,
                      description: "Description of the sub-field"
                    },
                    currentTrends: {
                      type: SchemaType.ARRAY,
                      description: "Current trends in this sub-field",
                      items: {
                        type: SchemaType.STRING
                      }
                    },
                    requiredSkills: {
                      type: SchemaType.OBJECT,
                      description: "Skills required for this sub-field",
                      properties: {
                        technical: {
                          type: SchemaType.ARRAY,
                          description: "Technical skills required",
                          items: {
                            type: SchemaType.OBJECT,
                            properties: {
                              skill: {
                                type: SchemaType.STRING,
                                description: "Name of the technical skill"
                              },
                              technologies: {
                                type: SchemaType.ARRAY,
                                description: "Related technologies or tools",
                                items: {
                                  type: SchemaType.STRING
                                }
                              },
                              proficiencyLevel: {
                                type: SchemaType.STRING,
                                description: "Required proficiency level"
                              }
                            },
                            required: ["skill", "technologies", "proficiencyLevel"]
                          }
                        },
                        soft: {
                          type: SchemaType.ARRAY,
                          description: "Soft skills required",
                          items: {
                            type: SchemaType.STRING
                          }
                        }
                      },
                      required: ["technical", "soft"]
                    },
                    preparationResources: {
                      type: SchemaType.OBJECT,
                      description: "Resources to prepare for this sub-field",
                      properties: {
                        courses: {
                          type: SchemaType.ARRAY,
                          description: "Recommended courses",
                          items: {
                            type: SchemaType.OBJECT,
                            properties: {
                              name: {
                                type: SchemaType.STRING,
                                description: "Name of the course"
                              },
                              platform: {
                                type: SchemaType.STRING,
                                description: "Platform offering the course"
                              },
                              duration: {
                                type: SchemaType.STRING,
                                description: "Duration of the course"
                              },
                              cost: {
                                type: SchemaType.STRING,
                                description: "Cost of the course"
                              },
                              certification: {
                                type: SchemaType.BOOLEAN,
                                description: "Whether certification is offered"
                              },
                              link: {
                                type: SchemaType.STRING,
                                description: "Link to the course"
                              }
                            },
                            required: ["name", "platform", "duration", "cost", "certification", "link"]
                          }
                        }
                      },
                      required: ["courses"]
                    }
                  },
                  required: ["name", "description", "currentTrends", "requiredSkills", "preparationResources"]
                }
              }
            },
            required: ["career", "matchScore", "reasonForMatch", "industryOutlook", "subFields"]
          }
        },
        secondaryCareerPaths: {
          type: SchemaType.ARRAY,
          description: "List of secondary recommended career paths",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              career: {
                type: SchemaType.STRING,
                description: "The name of the career path"
              },
              matchScore: {
                type: SchemaType.NUMBER,
                description: "Compatibility score for this career path"
              },
              reasonForMatch: {
                type: SchemaType.STRING,
                description: "Explanation of why this career matches the assessment"
              },
              industryOutlook: {
                type: SchemaType.OBJECT,
                description: "Information about the industry outlook",
                properties: {
                  growthRate: {
                    type: SchemaType.STRING,
                    description: "Projected growth rate of the industry"
                  },
                  marketDemand: {
                    type: SchemaType.STRING,
                    description: "Current market demand for professionals"
                  },
                  futureProspects: {
                    type: SchemaType.STRING,
                    description: "Future prospects of the career path"
                  },
                  topRecruiters: {
                    type: SchemaType.ARRAY,
                    description: "Information about top recruiters in this field",
                    items: {
                      type: SchemaType.OBJECT,
                      properties: {
                        type: {
                          type: SchemaType.STRING,
                          description: "Type of recruiter or industry segment"
                        },
                        companies: {
                          type: SchemaType.ARRAY,
                          description: "List of major companies hiring in this field",
                          items: {
                            type: SchemaType.STRING
                          }
                        },
                        averagePackage: {
                          type: SchemaType.STRING,
                          description: "Average compensation package offered"
                        }
                      },
                      required: ["type", "companies", "averagePackage"]
                    }
                  }
                },
                required: ["growthRate", "marketDemand", "futureProspects", "topRecruiters"]
              },
              subFields: {
                type: SchemaType.ARRAY,
                description: "Specialized sub-fields within this career path",
                items: {
                  type: SchemaType.OBJECT,
                  properties: {
                    name: {
                      type: SchemaType.STRING,
                      description: "Name of the sub-field"
                    },
                    description: {
                      type: SchemaType.STRING,
                      description: "Description of the sub-field"
                    },
                    currentTrends: {
                      type: SchemaType.ARRAY,
                      description: "Current trends in this sub-field",
                      items: {
                        type: SchemaType.STRING
                      }
                    },
                    requiredSkills: {
                      type: SchemaType.OBJECT,
                      description: "Skills required for this sub-field",
                      properties: {
                        technical: {
                          type: SchemaType.ARRAY,
                          description: "Technical skills required",
                          items: {
                            type: SchemaType.OBJECT,
                            properties: {
                              skill: {
                                type: SchemaType.STRING,
                                description: "Name of the technical skill"
                              },
                              technologies: {
                                type: SchemaType.ARRAY,
                                description: "Related technologies or tools",
                                items: {
                                  type: SchemaType.STRING
                                }
                              },
                              proficiencyLevel: {
                                type: SchemaType.STRING,
                                description: "Required proficiency level"
                              }
                            },
                            required: ["skill", "technologies", "proficiencyLevel"]
                          }
                        },
                        soft: {
                          type: SchemaType.ARRAY,
                          description: "Soft skills required",
                          items: {
                            type: SchemaType.STRING
                          }
                        }
                      },
                      required: ["technical", "soft"]
                    },
                    preparationResources: {
                      type: SchemaType.OBJECT,
                      description: "Resources to prepare for this sub-field",
                      properties: {
                        courses: {
                          type: SchemaType.ARRAY,
                          description: "Recommended courses",
                          items: {
                            type: SchemaType.OBJECT,
                            properties: {
                              name: {
                                type: SchemaType.STRING,
                                description: "Name of the course"
                              },
                              platform: {
                                type: SchemaType.STRING,
                                description: "Platform offering the course"
                              },
                              duration: {
                                type: SchemaType.STRING,
                                description: "Duration of the course"
                              },
                              cost: {
                                type: SchemaType.STRING,
                                description: "Cost of the course"
                              },
                              certification: {
                                type: SchemaType.BOOLEAN,
                                description: "Whether certification is offered"
                              },
                              link: {
                                type: SchemaType.STRING,
                                description: "Link to the course"
                              }
                            },
                            required: ["name", "platform", "duration", "cost", "certification", "link"]
                          }
                        }
                      },
                      required: ["courses"]
                    }
                  },
                  required: ["name", "description", "currentTrends", "requiredSkills", "preparationResources"]
                }
              }
            },
            required: ["career", "matchScore", "reasonForMatch", "industryOutlook", "subFields"]
          }
        },
        additionalInsights: {
          type: SchemaType.OBJECT,
          description: "Additional insights about career progression and work-life balance",
          properties: {
            careerProgression: {
              type: SchemaType.OBJECT,
              description: "Expected career progression over time",
              properties: {
                year1: {
                  type: SchemaType.OBJECT,
                  description: "Expected position after 1 year",
                  properties: {
                    role: {
                      type: SchemaType.STRING,
                      description: "Expected role"
                    },
                    focus: {
                      type: SchemaType.STRING,
                      description: "Focus areas"
                    },
                    expectedPackage: {
                      type: SchemaType.STRING,
                      description: "Expected compensation package"
                    }
                  },
                  required: ["role", "focus", "expectedPackage"]
                },
                year3: {
                  type: SchemaType.OBJECT,
                  description: "Expected position after 3 years",
                  properties: {
                    role: {
                      type: SchemaType.STRING,
                      description: "Expected role"
                    },
                    focus: {
                      type: SchemaType.STRING,
                      description: "Focus areas"
                    },
                    expectedPackage: {
                      type: SchemaType.STRING,
                      description: "Expected compensation package"
                    }
                  },
                  required: ["role", "focus", "expectedPackage"]
                },
                year5: {
                  type: SchemaType.OBJECT,
                  description: "Expected position after 5 years",
                  properties: {
                    role: {
                      type: SchemaType.STRING,
                      description: "Expected role"
                    },
                    focus: {
                      type: SchemaType.STRING,
                      description: "Focus areas"
                    },
                    expectedPackage: {
                      type: SchemaType.STRING,
                      description: "Expected compensation package"
                    }
                  },
                  required: ["role", "focus", "expectedPackage"]
                }
              },
              required: ["year1", "year3", "year5"]
            },
            workLifeBalance: {
              type: SchemaType.OBJECT,
              description: "Work-life balance information",
              properties: {
                averageWorkHours: {
                  type: SchemaType.STRING,
                  description: "Average work hours per week"
                },
                remoteOpportunities: {
                  type: SchemaType.STRING,
                  description: "Availability of remote work opportunities"
                },
                stressLevel: {
                  type: SchemaType.STRING,
                  description: "Typical stress level of the career"
                },
                tips: {
                  type: SchemaType.ARRAY,
                  description: "Tips for maintaining work-life balance",
                  items: {
                    type: SchemaType.STRING
                  }
                }
              },
              required: ["averageWorkHours", "remoteOpportunities", "stressLevel", "tips"]
            }
          },
          required: ["careerProgression", "workLifeBalance"]
        }
      },
      required: ["primaryCareerPaths", "secondaryCareerPaths", "additionalInsights"]
    }
  },
  required: ["career_recommendations"]
};

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: careerRecommendationsSchema,
  },
});

// Function to generate career path recommendations
const generateCareerPath = async (assessmentData) => {
  const aData = JSON.stringify(assessmentData);

  try {
    const result = await model.generateContent(
      `${aData} understand given data of user, and Generate career path for given schema`
    );
    return result.response.text();
  } catch (error) {
    console.error("Error Generating career recommendations:", error);
    throw error;
  }
};

// Function to get recommendations and store in Firestore
export const getRecommendations = async ({ uid, assessmentData }) => {
  try {
    // Get recommendations from Gemini with schema
    const recommendationsJson = await generateCareerPath(assessmentData);
    
    // Parse the JSON response
    let recommendations = null;
    try {
      recommendations = JSON.parse(recommendationsJson);
    } catch (err) {
      console.error("Error parsing AI response:", err);
      console.error("Raw response:", recommendationsJson);
      throw new Error("Failed to parse recommendations from AI response");
    }
    
    console.log("AI Response:", recommendations);
    
    // Store recommendations in the user document
    await setDoc(
      doc(db, `users/${uid}`),
      {
        recommendations,
        generatedAt: Timestamp.now(),
      },
      { merge: true }
    );
    
    toast.success("Roadmap Inserted in DB Successfully");
    return recommendations;
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw error;
  }
};

// Function to retrieve stored roadmap from Firestore
export const getRoadmap = async ({ uid }) => {
  const res = await getDoc(doc(db, `users/${uid}`));
  if (await res.exists()) {
    return res.data()?.recommendations;
  } else {
    return null;
  }
};

export { generateCareerPath };