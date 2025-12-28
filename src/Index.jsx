import { useState, useEffect, useRef } from "react";
import * as Easy from "./data/BasicWords";
import * as Medium from "./data/MediumWords";
import * as Hard from "./data/HardWords";

export default function Index() {
    const [storyType, setStoryType] = useState("Easy");
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [typed, setTyped] = useState("");
    const [duration, setDuration] = useState(60);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isTyping, setIsTyping] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [visibleLines, setVisibleLines] = useState(2);
    const [fontSize, setFontSize] = useState(16);

    // Analysis
    const [totalWordsTyped, setTotalWordsTyped] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [wrongWords, setWrongWords] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [cpm, setCpm] = useState(0);

    const timerRef = useRef(null);
    const textareaRef = useRef(null);
    const storyRef = useRef(null);

    // Story source
    const stories =
        storyType === "Easy"
            ? Object.values(Easy)
            : storyType === "Medium"
                ? Object.values(Medium)
                : Object.values(Hard);

    const story = stories[currentStoryIndex] || "";
    const storyLines = story.split("\n");

    const timeOptions = [
        { label: "30s", value: 30 },
        { label: "1 min", value: 60 },
        { label: "2 min", value: 120 },
        { label: "5 min", value: 300 },
        { label: "10 min", value: 600 },
    ];

    // ---------------- TIMER ----------------
    useEffect(() => {
        if (!isTyping) return;

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    finishTest(duration);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [isTyping, duration]);

    // ---------------- HANDLERS ----------------
    const startTyping = () => {
        if (!isTyping && !showPopup) setIsTyping(true);
    };

    const handleTyping = (e) => {
        startTyping();
        setTyped(e.target.value);

        const typedLines = e.target.value.split("\n").length;
        if (typedLines >= visibleLines && visibleLines < storyLines.length) {
            setVisibleLines((prev) => prev + 1);
        }
    };

    const resetAll = () => {
        clearInterval(timerRef.current);
        setTyped("");
        setIsTyping(false);
        setShowPopup(false);
        setTimeLeft(duration);
        setVisibleLines(2);
    };

    const handleTimeChange = (seconds) => {
        if (isTyping) return;
        setDuration(seconds);
        setTimeLeft(seconds);
    };

    const finishTest = (finalDuration) => {
        setIsTyping(false);

        const storyWords = story.trim().split(/\s+/);
        const typedWords = typed.trim().split(/\s+/);
        const total = typedWords.length;

        let correct = 0;
        typedWords.forEach((w, i) => {
            if (w === storyWords[i]) correct++;
        });

        const elapsedMinutes = finalDuration / 60;

        setTotalWordsTyped(total);
        setCorrectWords(correct);
        setWrongWords(total - correct);
        setAccuracy(((correct / total) * 100 || 0).toFixed(2));
        setWpm((correct / elapsedMinutes).toFixed(2));
        setCpm((typed.length / elapsedMinutes).toFixed(2));
        setShowPopup(true);
    };

    // ---------------- UI HELPERS ----------------
    const formatTime = (s) =>
        `${Math.floor(s / 60)
            .toString()
            .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

    const getHighlightedText = () => {
        const visibleText = storyLines.slice(0, visibleLines).join("\n");
        return visibleText.split("").map((char, i) => {
            let color = "";
            if (typed[i] === char) color = "green";
            else if (typed[i]) color = "red";
            return (
                <span key={i} style={{ color }}>
                    {char}
                </span>
            );
        });
    };

    // ---------------- RENDER ----------------
    return (
        <div className="space-y-4 px-4 sm:px-5 md:px-10 lg:px-20 xl:px-50 py-2">
            {/* SETTINGS */}
            <div className="flex flex-wrap gap-4 items-center justify-between shadow p-4 border border-gray-200">
                <div className="flex gap-2">
                    <select
                        value={storyType}
                        onChange={(e) => {
                            setStoryType(e.target.value);
                            resetAll();
                        }}
                        className="border border-gray-400 px-3 py-1"
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                    <select
                        value={currentStoryIndex}
                        onChange={(e) => {
                            setCurrentStoryIndex(+e.target.value);
                            resetAll();
                        }}
                        className="border border-gray-400 px-3 py-1"
                    >
                        {stories.map((_, i) => (
                            <option key={i} value={i}>
                                Lesson {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-2">
                    {timeOptions.map((t) => (
                        <button
                            key={t.value}
                            disabled={isTyping}
                            onClick={() => handleTimeChange(t.value)}
                            className={`px-3 py-1 border border-gray-400 ${duration === t.value ? "bg-black text-white" : ""
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <button onClick={() => setFontSize((f) => Math.max(12, f - 2))} className="bg-gray-200 h-7 w-7 flex items-center justify-center">−</button>
                        <span>{fontSize}px</span>
                        <button onClick={() => setFontSize((f) => Math.min(32, f + 2))} className="bg-gray-200 h-7 w-7 flex items-center justify-center">+</button>
                    </div>
                    <div className="font-bold">⏱ {formatTime(timeLeft)}</div>
                </div>

            </div>

            {/* STORY */}
            <div ref={storyRef} className="shadow p-6 h-80 overflow-y-auto border border-gray-200">
                <h2 className="text-xl font-bold mb-4">
                    Lesson {currentStoryIndex + 1}
                </h2>
                <p
                    style={{ fontSize, lineHeight: 1.6 }}
                    className="whitespace-pre-wrap"
                >
                    {getHighlightedText()}
                </p>
            </div>

            {/* INPUT */}
            <textarea
                ref={textareaRef}
                value={typed}
                onChange={handleTyping}
                disabled={showPopup}
                style={{ fontSize }}
                className="w-full h-80 p-4 shadow rounded-sm border border-gray-400 outline-none"
                placeholder="Start typing..."
            />

            {/* POPUP */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="w-fit max-w-[90%] rounded-xl bg-white py-6 px-15 shadow-2xl">
                        <h2 className="text-2xl font-bold text-center mb-6">
                            Typing Performance 🚀
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                            <p>Total: {totalWordsTyped}</p>
                            <p>Correct: {correctWords}</p>
                            <p>Wrong: {wrongWords}</p>
                            <p>Accuracy: {accuracy}%</p>
                            <p>WPM: {wpm}</p>
                            <p>CPM: {cpm}</p>
                        </div>

                        <button
                            onClick={resetAll}
                            className="w-full rounded-lg bg-black py-3 text-white font-semibold hover:bg-gray-800"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
