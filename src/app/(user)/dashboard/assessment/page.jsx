"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Brain, 
  CheckCircle, 
  Clock,
  ArrowRight,
  ArrowLeft,
  Target,
  Flower,
  MapPin,
  Star
} from 'lucide-react';

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showProgress, setShowProgress] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const router = useRouter();

  const questions = [
    {
      id: 1,
      type: 'scale',
      question: "How comfortable are you with learning new technologies?",
      options: [1, 2, 3, 4, 5],
      labels: ['Not at all', 'Very Comfortable']
    },
    {
      id: 2,
      type: 'multiple',
      question: "What type of work environment do you prefer?",
      options: [
        "Fast-paced startup",
        "Established corporation",
        "Remote work",
        "Hybrid setup"
      ]
    },
    {
      id: 3,
      type: 'scale',
      question: "How important is work-life balance to you?",
      options: [1, 2, 3, 4, 5],
      labels: ['Not important', 'Very important']
    },
    {
      id: 4,
      type: 'multiple',
      question: "Which skills would you like to develop?",
      options: [
        "Technical/Programming",
        "Leadership/Management",
        "Creative/Design",
        "Analysis/Problem Solving"
      ]
    },
    {
      id: 5,
      type: 'scale',
      question: "How do you feel about public speaking?",
      options: [1, 2, 3, 4, 5],
      labels: ['Very uncomfortable', 'Very comfortable']
    },
    {
      id: 6,
      type: 'multiple',
      question: "What motivates you the most?",
      options: [
        "Learning new skills",
        "Financial rewards",
        "Recognition",
        "Making an impact"
      ]
    },
    {
      id: 7,
      type: 'scale',
      question: "How do you prefer to solve problems?",
      options: [1, 2, 3, 4, 5],
      labels: ['Independently', 'In a team']
    },
    {
      id: 8,
      type: 'multiple',
      question: "Which industry interests you the most?",
      options: [
        "Technology",
        "Healthcare",
        "Finance",
        "Creative Arts"
      ]
    },
    {
      id: 9,
      type: 'scale',
      question: "How important is mentorship in your career?",
      options: [1, 2, 3, 4, 5],
      labels: ['Not important', 'Very important']
    },
    {
      id: 10,
      type: 'multiple',
      question: "What's your preferred way of learning?",
      options: [
        "Hands-on practice",
        "Reading/Research",
        "Video tutorials",
        "One-on-one mentoring"
      ]
    }
  ];

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    setShowCompletion(true);
  };

  const handleViewRoadmap = () => {
    router.push('/dashboard/roadmap');
  };

  const renderScale = (question) => (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-gray-500">
        <span>{question.labels[0]}</span>
        <span>{question.labels[1]}</span>
      </div>
      <div className="flex justify-between gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className={`w-full h-16 rounded-xl border-2 transition-all duration-200 ${
              answers[currentQuestion] === option
                ? 'border-violet-600 bg-violet-50 text-violet-600'
                : 'border-gray-200 hover:border-violet-200 hover:bg-violet-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  const renderMultiple = (question) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {question.options.map((option) => (
        <button
          key={option}
          onClick={() => handleAnswer(option)}
          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
            answers[currentQuestion] === option
              ? 'border-violet-600 bg-violet-50 text-violet-600'
              : 'border-gray-200 hover:border-violet-200 hover:bg-violet-50'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );

  if (showCompletion) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
          {/* Success Animation */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-violet-100 rounded-full blur-2xl opacity-60 animate-pulse" />
            <div className="relative w-24 h-24 mx-auto bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Flower className="w-12 h-12 text-white animate-bounce" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Assessment Completed! 🎉
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Great job completing your assessment! Your personalized career roadmap is now ready for you to explore.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleViewRoadmap}
              className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              View Your Career Roadmap
            </button>
            
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Your responses have been saved
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-6 bg-violet-50 rounded-xl p-6">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-violet-600" />
            What's Next?
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-violet-600 mt-1 flex-shrink-0" />
              Explore your personalized career roadmap
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-violet-600 mt-1 flex-shrink-0" />
              Review recommended learning paths and resources
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-violet-600 mt-1 flex-shrink-0" />
              Track your progress towards your career goals
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      {showProgress && (
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                <Brain className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Career Assessment</h2>
                <p className="text-sm text-gray-500">Discover your perfect career path</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>~10 mins</span>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="text-sm font-medium text-violet-600">
                {currentQuestion + 1}/{questions.length}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-violet-600 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-8">
          {questions[currentQuestion].question}
        </h3>

        {questions[currentQuestion].type === 'scale' 
          ? renderScale(questions[currentQuestion])
          : renderMultiple(questions[currentQuestion])
        }

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors ${
              currentQuestion === 0 ? 'invisible' : ''
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
          
          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              Submit Assessment
              <Star className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-violet-600 hover:bg-violet-50 transition-colors"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tips Card */}
      <div className="mt-6 bg-violet-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-5 h-5 text-violet-600" />
          <h3 className="font-medium text-gray-900">Assessment Tips</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-violet-600" />
            Answer honestly for the most accurate results
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-violet-600" />
            Take your time to consider each question
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-violet-600" />
            Trust your initial instincts
          </li>
        </ul>
      </div>
    </div>
  );
};
 
export default Assessment;