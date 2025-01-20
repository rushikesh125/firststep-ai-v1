"use client";

import React, { useEffect, useState } from "react";
import {
  MapPin,
  Star,
  BookOpen,
  Trophy,
  Code,
  Briefcase,
  GraduationCap,
  Target,
  ArrowRight,
  Building2,
  Users,
  DollarSign,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Clock,
  Award,
  Heart,
  Sparkles,
  Loader2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import {
  getRecommendations,
  getRoadmap,
} from "@/utils/firebase/recommendations/read";
import { getUserAssessment } from "@/utils/firebase/assessment/read";
import toast from "react-hot-toast";

// Reusable Components
const MatchScoreBadge = ({ score }) => (
  <div className="flex items-center gap-2 bg-violet-50 text-violet-700 px-4 py-2 rounded-full">
    <Star className="w-5 h-5 fill-violet-500 text-violet-500" />
    <span className="font-semibold">{score}% Match</span>
  </div>
);

const StatsCard = ({ icon: Icon, label, value, prefix }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200">
    <div className="flex items-start gap-3">
      <div className="p-2 bg-violet-50 rounded-lg">
        <Icon className="w-5 h-5 text-violet-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-gray-900">
          {prefix}
          {value}
        </p>
      </div>
    </div>
  </div>
);

const TimelineItem = ({ year, data, isLast }) => (
  <div className="relative">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center">
        <Trophy className="w-6 h-6 text-violet-600" />
      </div>
      <div>
        <p className="text-sm text-violet-600 font-medium">Year {year}</p>
        <h3 className="text-lg font-semibold text-gray-900">{data.role}</h3>
        <p className="text-gray-600">{data.focus}</p>
        <p className="text-sm font-medium text-violet-600 mt-1">
          {data.expectedPackage}
        </p>
      </div>
    </div>
    {!isLast && (
      <div className="absolute left-6 top-12 bottom-0 w-[1px] bg-violet-100" />
    )}
  </div>
);

const AccordionItem = ({ title, children, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-50 rounded-lg">
            <Icon className="w-5 h-5 text-violet-600" />
          </div>
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

const SkillCard = ({ skill, technologies, proficiencyLevel }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200">
    <h4 className="font-medium text-gray-900 mb-2">{skill}</h4>
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-violet-50 text-violet-600 text-sm rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        Proficiency:{" "}
        <span className="text-violet-600 font-medium">{proficiencyLevel}</span>
      </p>
    </div>
  </div>
);

// const CourseCard = ({ course }) => (
//   <div className="bg-white p-4 rounded-xl border border-gray-200">
//     <div className="flex items-start justify-between">
//       <div>
//         <h4 className="font-medium text-gray-900">{course.name}</h4>
//         <p className="text-sm text-gray-500">{course.platform}</p>
//       </div>
//       {course.certification && (
//         <div className="p-1 bg-green-50 rounded">
//           <Award className="w-4 h-4 text-green-600" />
//         </div>
//       )}
//     </div>
//     <div className="mt-3 space-y-2">
//       <div className="flex items-center gap-2 text-sm text-gray-500">
//         <Clock className="w-4 h-4" />
//         <span>{course.duration}</span>
//       </div>
//       <div className="flex items-center gap-2 text-sm text-gray-500">
//         <DollarSign className="w-4 h-4" />
//         <span>{course.cost}</span>
//       </div>
//     </div>
//   </div>
// );

// Safe list rendering component

const CourseCard = ({ course }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-violet-200 transition-all group relative">
    <div className="flex items-start justify-between">
      <div>
        <h4 className="font-medium text-gray-900">{course.name}</h4>
        <p className="text-sm text-gray-500">{course.platform}</p>
      </div>
      {course.certification && (
        <div className="p-1 bg-green-50 rounded">
          <Award className="w-4 h-4 text-green-600" />
        </div>
      )}
    </div>

    <div className="mt-3 space-y-2">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        <span>{course.duration}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <DollarSign className="w-4 h-4" />
        <span>{course.cost}</span>
      </div>
    </div>

    {course.link && (
      <a
        href={course.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-between p-2 bg-violet-50 rounded-lg text-violet-600 hover:bg-violet-100 transition-colors group-hover:bg-violet-100"
      >
        <span className="text-sm font-medium">View Course</span>
        <div className="flex items-center gap-1">
          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            {course.platform}
          </span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </a>
    )}

    {/* Hover effect overlay */}
    <div className="absolute inset-0 bg-violet-50 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity pointer-events-none" />
  </div>
);

const SafeList = ({ items = [], render }) => {
  if (!items || !Array.isArray(items)) return null;
  return items.map(render);
};

// Loading Component
const LoadingState = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center space-y-4">
      <Loader2 className="w-8 h-8 text-violet-600 animate-spin mx-auto" />
      <p className="text-gray-600">Loading career roadmap...</p>
    </div>
  </div>
);

// Main Component
const Roadmap = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const user = useSelector((state) => state.user);

  // // Set client-side flag
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // Fetch recommendations
  // useEffect(() => {
  //   const fetchRecommendations = async () => {
  //     if (!isClient || !user?.uid) return;

  //     try {
  //       setIsLoading(true);
  //       const assessmentData =await getUserAssessment({uid:user?.uid})
  //       const text = await getRecommendations({ uid: user.uid,assessmentData:assessmentData });
  //       toast.success("Roadmap Generated Successfully")
  //       setRoadmapData(text);
  //     } catch (err) {
  //       console.error('Error fetching recommendations:', err);
  //       setError('Failed to load recommendations. Please try again later.');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchRecommendations();
  // }, [isClient, user?.uid]);
  useEffect(() => {
    (async () => {
      setIsLoading(true)
      try {
        const res = await getRoadmap({ uid: user?.uid });
        setRoadmapData(res);
        console.log("res:::", res);
      } catch (error) {
        console.log('error',error);
        toast.error(error)
        setError("roadmap is not generated please generate roadmap form assessment")
      }finally{
        setIsLoading(false)
      }
    })();
  }, [user]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <XCircle className="w-8 h-8 text-red-500 mx-auto" />
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!roadmapData || !roadmapData.primaryCareerPaths?.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto" />
          <p className="text-gray-600">
            No recommendations available. Please complete the assessment first.
          </p>
        </div>
      </div>
    );
  }

  const career = roadmapData.primaryCareerPaths[0];
  const { additionalInsights } = roadmapData;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Career Roadmap 📍
          </h1>
          <p className="text-gray-600">
            Your personalized path to success in{" "}
            {career?.career || "your field"}
          </p>
        </div>
        {career?.matchScore && <MatchScoreBadge score={career.matchScore} />}
      </div>

      {/* Quick Stats */}
      {career?.industryOutlook && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            icon={TrendingUp}
            label="Industry Growth"
            value={career.industryOutlook.growthRate || "N/A"}
          />
          <StatsCard
            icon={Building2}
            label="Market Demand"
            value={career.industryOutlook.marketDemand || "N/A"}
          />
          <StatsCard
            icon={DollarSign}
            label="Top Package"
            value={
              career.industryOutlook.topRecruiters?.[0]?.averagePackage || "N/A"
            }
          />
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Career Path */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progression Timeline */}
          {additionalInsights?.careerProgression && (
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Career Progression
              </h2>
              <div className="space-y-8">
                {Object.entries(additionalInsights.careerProgression).map(
                  ([year, data], index, arr) => (
                    <TimelineItem
                      key={year}
                      year={year.replace("year", "")}
                      data={data}
                      isLast={index === arr.length - 1}
                    />
                  )
                )}
              </div>
            </div>
          )}

          {/* Required Skills */}
          {/* {career?.subFields?.[0]?.requiredSkills?.technical && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Required Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SafeList
                  items={career.subFields[0].requiredSkills.technical}
                  render={(skill, idx) => <SkillCard key={idx} {...skill} />}
                />
              </div>
            </div>
          )} */}

          {/* Learning Resources */}
          {/* {career?.subFields?.[0]?.preparationResources?.courses && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recommended Courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SafeList
                  items={career.subFields[0].preparationResources.courses}
                  render={(course, idx) => (
                    <CourseCard key={idx} course={course} />
                  )}
                />
              </div>
            </div>
          )} */}


{/* Required Skills Section */}
{career?.subFields && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Required Skills
              </h2>
              <div className="space-y-6">
                {career.subFields.map((subField, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="text-md font-medium text-violet-600 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      {subField.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {subField.description}
                    </p>

                    {/* Technical Skills */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {subField.requiredSkills?.technical?.map(
                        (skill, skillIdx) => (
                          <SkillCard key={skillIdx} {...skill} />
                        )
                      )}
                    </div>

                    {/* Soft Skills */}
                    {subField.requiredSkills?.soft?.length > 0 && (
                      <div className="bg-violet-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-violet-900 mb-2">
                          Soft Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {subField.requiredSkills.soft.map(
                            (skill, skillIdx) => (
                              <span
                                key={skillIdx}
                                className="px-3 py-1 bg-violet-100 text-violet-600 text-sm rounded-full"
                              >
                                {skill}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Current Trends */}
                    {subField.currentTrends?.length > 0 && (
                      <div className="bg-violet-50/50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-violet-900 mb-2">
                          Current Trends
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {subField.currentTrends.map((trend, trendIdx) => (
                            <span
                              key={trendIdx}
                              className="px-3 py-1 bg-white text-violet-600 text-sm rounded-full border border-violet-100"
                            >
                              {trend}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Learning Resources Section */}
          {career?.subFields && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recommended Courses
                </h2>
                <div className="text-sm text-violet-600">
                  {career.subFields.reduce(
                    (total, subField) =>
                      total +
                      (subField.preparationResources?.courses?.length || 0),
                    0
                  )}{" "}
                  courses available
                </div>
              </div>

              {career.subFields.map((subField, subFieldIdx) => (
                <div key={subFieldIdx} className="space-y-4">
                  <h3 className="text-md font-medium text-violet-600 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {subField.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subField.preparationResources?.courses?.map(
                      (course, courseIdx) => (
                        <CourseCard
                          key={`${subFieldIdx}-${courseIdx}`}
                          course={course}
                        />
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Column - Additional Info */}
        <div className="space-y-4">
          {/* Industry Info */}
          {career?.industryOutlook && (
            <AccordionItem title="Industry Outlook" icon={Target}>
              <div className="space-y-4">
                <p className="text-gray-600">
                  {career.industryOutlook.futureProspects}
                </p>
                <div className="space-y-4">
                  <SafeList
                    items={career.industryOutlook.topRecruiters}
                    render={(recruiter, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-lg border border-gray-200"
                      >
                        <h4 className="font-medium text-gray-900 mb-2">
                          {recruiter.type}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            <SafeList
                              items={recruiter.companies}
                              render={(company, idx) => (
                                <span
                                  key={idx}
                                  className="text-sm text-gray-600"
                                >
                                  {company}
                                </span>
                              )}
                            />
                          </div>
                          <p className="text-sm text-violet-600 font-medium">
                            {recruiter.averagePackage}
                          </p>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            </AccordionItem>
          )}

          {/* Work-Life Balance */}
          {additionalInsights?.workLifeBalance && (
            <AccordionItem title="Work-Life Balance" icon={Heart}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">Working Hours</p>
                    <p className="font-medium text-gray-900">
                      {additionalInsights.workLifeBalance.averageWorkHours}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500">Remote Work</p>
                    <p className="font-medium text-gray-900">
                      {additionalInsights.workLifeBalance.remoteOpportunities}
                    </p>
                  </div>
                </div>
                <div className="bg-violet-50 p-4 rounded-lg">
                  <h4 className="font-medium text-violet-900 mb-2">Pro Tips</h4>
                  <ul className="space-y-2">
                    <SafeList
                      items={additionalInsights.workLifeBalance.tips}
                      render={(tip, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-violet-700"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>{tip}</span>
                        </li>
                      )}
                    />
                  </ul>
                </div>
              </div>
            </AccordionItem>
          )}

          {/* Higher Education */}
          {additionalInsights?.higherEducation?.options && (
            <AccordionItem title="Higher Education" icon={GraduationCap}>
              <div className="space-y-4">
                <SafeList
                  items={additionalInsights.higherEducation.options}
                  render={(option, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-lg border border-gray-200"
                    >
                      <h4 className="font-medium text-gray-900 mb-2">
                        {option.degree}
                      </h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>Duration: {option.duration || "N/A"}</p>
                        <p>Cost: {option.averageCost || "N/A"}</p>
                        {option.universities && (
                          <div>
                            <p className="text-gray-500">Top Universities:</p>
                            <p>{option.universities.join(", ")}</p>
                          </div>
                        )}
                        {option.entranceExams && (
                          <div>
                            <p className="text-gray-500">Required Exams:</p>
                            <p>{option.entranceExams.join(", ")}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                />
              </div>
            </AccordionItem>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
