"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Question {
  id: number;
  subject: string;
  grade: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    subject: "Matematika",
    grade: "9-sinf",
    question: "Agar x² - 5x + 6 = 0 bo'lsa, x ning qiymatlari nechaga teng?",
    options: ["x = 2 va x = 3", "x = 1 va x = 6", "x = -2 va x = -3", "x = 2 va x = -3"],
    correctAnswer: 0,
  },
  {
    id: 2,
    subject: "Fizika",
    grade: "10-sinf",
    question: "Erkin tushish tezlanishi qancha (m/s²)?",
    options: ["8.8", "9.8", "10.8", "11.8"],
    correctAnswer: 1,
  },
  {
    id: 3,
    subject: "Kimyo",
    grade: "8-sinf",
    question: "Suvning kimyoviy formulasi qanday?",
    options: ["H₂O₂", "H₂O", "HO", "H₃O"],
    correctAnswer: 1,
  },
  {
    id: 4,
    subject: "Biologiya",
    grade: "7-sinf",
    question: "Fotosintez jarayonida nimalar ishtirok etadi?",
    options: ["Faqat suv", "Faqat yorug'lik", "Suv, yorug'lik va karbonat angidrid", "Faqat kislorod"],
    correctAnswer: 2,
  },
];

const SampleQuestions = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = sampleQuestions[selectedQuestion];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    setSelectedQuestion((prev) => (prev + 1) % sampleQuestions.length);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Namuna savollari
          </h2>
          <p className="text-lg text-gray-600">
            Olimpiada savollariga o'xshash namuna savollari bilan mashq qiling
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Question Navigation */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {sampleQuestions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => {
                  setSelectedQuestion(index);
                  setSelectedAnswer(null);
                  setShowAnswer(false);
                }}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedQuestion === index
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-blue-100"
                }`}
              >
                {q.subject}
              </button>
            ))}
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                {currentQuestion.subject}
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
                {currentQuestion.grade}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              {currentQuestion.question}
            </h3>

            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = index === currentQuestion.correctAnswer;
                const isSelected = index === selectedAnswer;
                
                let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all ";
                
                if (showAnswer) {
                  if (isCorrect) {
                    buttonClass += "border-green-500 bg-green-50 text-green-900";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += "border-red-500 bg-red-50 text-red-900";
                  } else {
                    buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                  }
                } else {
                  buttonClass += "border-gray-200 hover:border-blue-500 hover:bg-blue-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showAnswer}
                    className={buttonClass}
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1 font-medium">{option}</span>
                      {showAnswer && isCorrect && (
                        <Icon icon="solar:check-circle-bold" className="text-green-500 text-2xl" />
                      )}
                      {showAnswer && isSelected && !isCorrect && (
                        <Icon icon="solar:close-circle-bold" className="text-red-500 text-2xl" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showAnswer && (
              <div className={`p-4 rounded-xl mb-6 ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? "bg-green-100 border-2 border-green-500"
                  : "bg-red-100 border-2 border-red-500"
              }`}>
                <p className="font-medium text-lg">
                  {selectedAnswer === currentQuestion.correctAnswer
                    ? "✅ To'g'ri javob! Ajoyib!"
                    : "❌ Noto'g'ri. To'g'ri javob: " + String.fromCharCode(65 + currentQuestion.correctAnswer)}
                </p>
              </div>
            )}

            <button
              onClick={handleNextQuestion}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Keyingi savol
              <Icon icon="solar:arrow-right-bold" className="text-xl" />
            </button>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Ko'proq mashq qilishni xohlaysizmi?
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105">
              Barcha savollarni ko'rish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SampleQuestions;

