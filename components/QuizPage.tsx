"use client";

import { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the primary purpose of React's useState hook?",
      options: [
        "To manage component lifecycle",
        "To manage state in functional components",
        "To handle side effects",
        "To optimize performance",
      ],
      correctAnswer: 1,
      explanation: "useState is used to add state management to functional components in React.",
      difficulty: "Medium",
    },
    {
      id: 2,
      question: "Which HTML tag is used to define the structure of a webpage?",
      options: ["<body>", "<html>", "<head>", "<div>"],
      correctAnswer: 1,
      explanation: "The <html> tag is the root element that contains all other HTML elements.",
      difficulty: "Easy",
    },
    {
      id: 3,
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Style Sheets",
        "Colorful Style Sheets",
      ],
      correctAnswer: 1,
      explanation: "CSS stands for Cascading Style Sheets, used for styling web pages.",
      difficulty: "Easy",
    },
    {
      id: 4,
      question: "In JavaScript, which method is used to add an element to the end of an array?",
      options: ["append()", "add()", "push()", "insert()"],
      correctAnswer: 2,
      explanation: "The push() method adds one or more elements to the end of an array.",
      difficulty: "Medium",
    },
    {
      id: 5,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: 1,
      explanation:
        "Binary search has O(log n) time complexity as it eliminates half of the search space in each iteration.",
      difficulty: "Hard",
    },
  ];

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const getAnsweredCount = () => {
    return Object.keys(selectedAnswers).length;
  };

  if (showResults) {
    const score = calculateScore();
    const correctAnswers = questions.filter(
      (q) => selectedAnswers[q.id] === q.correctAnswer
    ).length;

    return (
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <Card className="bg-white border border-gray-200">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-black rounded-full flex items-center justify-center">
              {score >= 70 ? (
                <CheckCircle className="h-10 w-10 text-white" />
              ) : (
                <XCircle className="h-10 w-10 text-white" />
              )}
            </div>
            <CardTitle className="text-2xl text-black">Quiz Completed!</CardTitle>
            <p className="text-gray-600">Here are your results</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-black">{score}%</div>
              <p className="text-lg text-gray-600">
                {correctAnswers} out of {questions.length} questions correct
              </p>
              <Badge className={`text-white ${score >= 70 ? "bg-green-600" : "bg-red-600"}`}>
                {score >= 70 ? "Passed" : "Failed"}
              </Badge>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-black">Question Review</h3>
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-black">Question {index + 1}</h4>
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{question.question}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Your answer:</span>
                        <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                          {userAnswer !== undefined ? question.options[userAnswer] : "Not answered"}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">Correct answer:</span>
                          <span className="text-green-600">
                            {question.options[question.correctAnswer]}
                          </span>
                        </div>
                      )}
                      <p className="text-gray-600 italic">{question.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              <Button className="bg-black hover:bg-gray-800 text-white">Back to Course</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="px-4 py-6">
      {/* Quiz Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-black">Programming Fundamentals Quiz</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
            <Badge variant="outline" className="border-black text-black">
              {getAnsweredCount()}/{questions.length} answered
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Navigation */}
        <div className="lg:col-span-1">
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-black">Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 lg:grid-cols-2 gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                      currentQuestion === index
                        ? "bg-black text-white"
                        : selectedAnswers[questions[index].id] !== undefined
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}>
                    {index + 1}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Question */}
        <div className="lg:col-span-3">
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="border-black text-black">
                    Question {currentQuestion + 1}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={`${
                      currentQ.difficulty === "Easy"
                        ? "bg-green-100 text-green-800"
                        : currentQ.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}>
                    {currentQ.difficulty}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <Flag className="h-4 w-4 mr-2" />
                  Flag
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-black mb-4">{currentQ.question}</h3>

                <RadioGroup
                  value={selectedAnswers[currentQ.id]?.toString()}
                  onValueChange={(value) => handleAnswerSelect(currentQ.id, parseInt(value))}
                  className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer text-black">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="border-black text-black hover:bg-gray-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex items-center space-x-3">
                  {currentQuestion < questions.length - 1 ? (
                    <Button
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
                      className="bg-black hover:bg-gray-800 text-white">
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      className="bg-black hover:bg-gray-800 text-white"
                      disabled={getAnsweredCount() === 0}>
                      Submit Quiz
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
