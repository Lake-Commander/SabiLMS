'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuizQuestion from '@/components/QuizQuestion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Sparkles, AlertCircle, BookOpen } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  course_id: string;
}

interface QuizData {
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
}

interface LessonClientProps {
  lesson: Lesson;
  initialCompleted: boolean;
  courseId: string;
  lessonId: string;
  prevLessonId?: string;
  nextLessonId?: string;
}

export default function LessonClient({ 
  lesson, 
  initialCompleted, 
  courseId, 
  lessonId, 
  prevLessonId, 
  nextLessonId 
}: LessonClientProps) {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [completed, setCompleted] = useState(initialCompleted);

  const router = useRouter();

  const handleGenerateQuiz = async () => {
    setQuizLoading(true);
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: lesson.id }),
      });
      const data = await res.json();
      if (data.questions) {
        setQuiz(data);
      }
    } catch (error) {
      console.error('Failed to generate quiz', error);
      alert('Failed to generate quiz. Please try again.');
    } finally {
      setQuizLoading(false);
    }
  };

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmitQuiz = async () => {
    if (!quiz) return;

    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) correctCount++;
    });

    const rawScore = (correctCount / quiz.questions.length) * 100;
    const finalScore = Math.round(rawScore);
    setScore(finalScore);
    setShowResults(true);

    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          lessonId,
          completed: true,
          score: finalScore,
          answers: answers
        }),
      });
      setCompleted(true);
      router.refresh();
    } catch (error) {
      console.error('Failed to save progress', error);
    }
  };

  const handleMarkCompleted = async () => {
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          lessonId,
          completed: true
        }),
      });
      setCompleted(true);
      router.refresh();
    } catch (error) {
      console.error('Failed to save progress', error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 text-[var(--black)] pb-20">
      
      {/* Back Navigator pill */}
      <Link 
        href={`/dashboard/courses/${courseId}`} 
        className="inline-flex items-center gap-2 border-2 border-black bg-[var(--white)] px-4 py-2 font-mono text-[11px] font-black uppercase tracking-wider rounded-lg shadow-[2px_2px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_#111111] transition-all text-black"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Syllabus
      </Link>

      {/* Lesson Heading Summary panel */}
      <div className="p-6 bg-[var(--white)] border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-black dark:text-white" /> active_syllabus_node
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight leading-tight">
            {lesson.title}
          </h1>
        </div>
        
        {completed && (
          <span className="sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-[var(--green)] text-black rounded-md font-mono text-[10px] font-black uppercase tracking-wide shadow-[2px_2px_0px_#111111]">
            <CheckCircle className="h-4 w-4" /> Completed ✓
          </span>
        )}
      </div>

      {/* Central Markdown Reading Field */}
      <article className="p-6 sm:p-8 bg-[#FBF8F1] dark:bg-slate-900 border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] prose max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:font-black prose-headings:text-black dark:prose-headings:text-white prose-p:text-xs prose-p:font-medium prose-p:leading-relaxed text-[var(--black)]">
        <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
      </article>

      {/* QUIZ WORKSPACE GRID BLOCK */}
      <div className="border-t-4 border-dashed border-black/20 pt-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-lg font-black uppercase tracking-tight">
            Knowledge Verification Matrix
          </h2>
          {!quiz && !completed && (
            <button
              onClick={handleMarkCompleted}
              className="font-mono text-[11px] font-black uppercase tracking-wide text-[var(--blue)] border-b-2 border-black dark:border-white pb-0.5 cursor-pointer"
            >
              Skip evaluation layout →
            </button>
          )}
        </div>

        {!quiz ? (
          <div className="bg-[var(--white)] border-2 border-black rounded-xl p-8 text-center shadow-[4px_4px_0px_#111111]">
            <span className="text-2xl border border-black p-1 bg-white rounded-md inline-block shadow-[1.5px_1.5px_0px_#111111]">📝</span>
            <h3 className="font-display font-black text-xs uppercase mt-4 tracking-wide">Test Your Knowledge</h3>
            <p className="text-xs text-gray-500 font-medium max-w-sm mx-auto mt-1">Generate an automated, platform-specific questionnaire snapshot calibrated directly to this material.</p>
            <button
              onClick={handleGenerateQuiz}
              disabled={quizLoading}
              className="mt-6 inline-flex items-center gap-2 border-2 border-black bg-[var(--green)] text-black px-5 py-3 font-mono text-xs font-black uppercase tracking-wider rounded-lg shadow-[4px_4px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#111111] disabled:opacity-50 cursor-pointer select-none"
            >
              <Sparkles className="w-4 h-4" />
              {quizLoading ? 'Compiling evaluation parameters...' : 'Generate AI Quiz'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {quiz.questions.map((q, idx) => (
              <QuizQuestion
                key={idx}
                question={q.question}
                options={q.options}
                correctIndex={q.correctIndex}
                selectedOption={answers[idx] ?? null}
                onAnswer={(optIdx) => handleAnswer(idx, optIdx)}
                showResult={showResults}
              />
            ))}

            {/* Quiz Submit button link control */}
            {!showResults && (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(answers).length < quiz.questions.length}
                className="w-full inline-flex items-center justify-center border-2 border-black bg-[var(--blue)] text-white px-5 py-3.5 font-mono text-xs font-black uppercase tracking-widest rounded-lg shadow-[4px_4px_0px_#111111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_#111111] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer select-none"
              >
                Submit Verification Logs →
              </button>
            )}

            {/* Score Results Card Board Banner */}
            {showResults && (
              <div className={`p-5 border-2 border-black rounded-xl shadow-[4px_4px_0px_#111111] flex items-center gap-4 ${
                score! >= 60 ? 'bg-[var(--green-light)] text-black' : 'bg-amber-100 text-black'
              }`}>
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <h4 className="font-mono text-xs font-black uppercase tracking-wide">
                    Evaluation Matrix Log: {score}% Complete
                  </h4>
                  <p className="text-xs font-medium mt-0.5">
                    {score! >= 60 
                      ? 'Compilers accepted input. Index threshold passed successfully.' 
                      : 'Review the technical content details to satisfy the 60% baseline qualification filter.'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sibling Node Pagination Router Footer Row */}
      <div className="flex items-center justify-between gap-4 mt-12 pt-6 border-t-2 border-dashed border-black/20">
        {prevLessonId ? (
          <Link
            href={`/dashboard/courses/${courseId}/lesson/${prevLessonId}`}
            className="inline-flex items-center justify-center border-2 border-black bg-white text-black px-4 py-2.5 font-mono text-[11px] font-black uppercase tracking-wider rounded-lg shadow-[3px_3px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[2px_2px_0px_#111111] transition-all"
          >
            ← Previous Node
          </Link>
        ) : (
          <div />
        )}

        {nextLessonId && (
          <Link
            href={`/dashboard/courses/${courseId}/lesson/${nextLessonId}`}
            className="inline-flex items-center justify-center border-2 border-black bg-[var(--orange)] text-black px-4 py-2.5 font-mono text-[11px] font-black uppercase tracking-wider rounded-lg shadow-[3px_3px_0px_#111111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[2px_2px_0px_#111111] transition-all"
          >
            Next Node →
          </Link>
        )}
      </div>
    </div>
  );
}