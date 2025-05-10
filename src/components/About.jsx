import { useEffect, useRef, useState } from "react";

const About = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [language, setLanguage] = useState("en");

    const [volume, setVolume] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1);
    const [preset, setPreset] = useState("default");

    const fullText = `
Jayden's, NAIROBI’S PREMIER SHOPPING MALL.
EXPERIENCE Lifestyle.
Jaydens, Nairobi's premier shopping mall is East Africa's finest shopping, leisure and pleasure destination for
millions of resident and international visitors. With lots of daily, weekly and monthly entertainment options for the
whole family; Jaydens is the only shopping mall in East Africa that has shoppers engaged in exciting and enlightening
events for all.
With over 80 stores and a variety of art and craft kiosks all open from 9:00 a.m. to 8:00 p.m. as well as entertainment
outlets and restaurants that are open till midnight seven days a week; Jaydens upholds the standards to
keep our shoppers happy and give them the best variety.
Jaydens Shopping Mall attracts a highly cosmopolitan and sophisticated clientele, and reaches a well-defined and
attractive demographic audience.
Located in the heart of Westlands along Mwanzi Road, Jaydens Shopping Mall is easily accessible from the city
center and Nairobi environs. Shoppers are assured of an enjoyable and convenient shopping experience in a relaxed
atmosphere; all under one roof. Jaydens has ample parking for over 550 cars.

About Jaydens: Jaydens Shopping Mall is East Africa’s Leading destination for shopping and leisure.
Contacts: Phone: 020-3746172/3 Mobile: 0715/0780-557775 Email: info@Jaydens.co.ke
    `;

    const [customText, setCustomText] = useState(fullText);
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const contentRef = useRef(null);

    const getFilteredVoices = () =>
        voices.filter((v) => v.lang.toLowerCase().startsWith(language));

    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem("ttsSettings"));
        if (savedSettings) {
            setVolume(savedSettings.volume);
            setPitch(savedSettings.pitch);
            setRate(savedSettings.rate);
            setPreset(savedSettings.preset);
            setLanguage(savedSettings.language);
        }
    }, []);

    useEffect(() => {
        const loadVoices = () => {
            const allVoices = window.speechSynthesis.getVoices();
            setVoices(allVoices);
        };
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "ttsSettings",
            JSON.stringify({
                volume,
                pitch,
                rate,
                preset,
                language,
                selectedVoiceName: selectedVoice?.name || null,
            })
        );
    }, [volume, pitch, rate, preset, language, selectedVoice]);

    const handlePresetChange = (value) => {
        setPreset(value);
        switch (value) {
            case "slow":
                setRate(0.8);
                setPitch(1);
                break;
            case "expressive":
                setRate(1.3);
                setPitch(1.4);
                break;
            case "fast":
                setRate(1.8);
                setPitch(1);
                break;
            default:
                setRate(1);
                setPitch(1);
        }
    };

    const handleSpeak = () => {
        window.speechSynthesis.cancel();
        setHighlightedIndex(null);
        if (!selectedVoice || !customText.trim()) return;

        const utterance = new SpeechSynthesisUtterance(customText);
        utterance.voice = selectedVoice;
        utterance.volume = volume;
        utterance.pitch = pitch;
        utterance.rate = rate;

        utterance.onboundary = (event) => {
            if (event.name === "word") {
                setHighlightedIndex(event.charIndex);
                scrollToWord(event.charIndex);
            }
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            setHighlightedIndex(null);
        };

        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    };

    const handlePreview = () => {
        const utterance = new SpeechSynthesisUtterance("This is a preview of your selected voice settings.");
        utterance.voice = selectedVoice;
        utterance.volume = volume;
        utterance.pitch = pitch;
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
    };

    const scrollToWord = (charIndex) => {
        if (!contentRef.current) return;
        const range = document.createRange();
        const textNode = contentRef.current.firstChild;
        if (!textNode) return;

        range.setStart(textNode, charIndex);
        range.setEnd(textNode, charIndex + 1);

        const rect = range.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
            window.scrollTo({
                top: window.scrollY + rect.top - 100,
                behavior: "smooth",
            });
        }
    };

    const renderHighlightedText = () => {
        if (highlightedIndex === null) return customText;

        return (
            <>
                {customText.split("").map((char, index) => (
                    <span
                        key={index}
                        className={index === highlightedIndex ? "bg-yellow-300" : ""}
                    >
                        {char}
                    </span>
                ))}
            </>
        );
    };

    return (
        <div className="bg-primary text-white py-10">
            <div className="container mx-auto px-4 space-y-10">
            
                {/* About Us Section */}
                <section className="mb-10" >
                    <h2 className="text-3xl font-bold mb-4">About Us</h2>
                    <p className="text-lg">{fullText}</p>
                </section>
                <br />

                {/* Vision and Mission Section */}
                <section className="row mb-10">
                    {/* Vision Card */}
                    <div className="col-md-5 mx-4 justify-content-center card shadow-xl">
                        <h3 className="text-2xl font-bold">🌟 Our Vision</h3>
                        <p className="mt-2">
                            At <strong>Jayden’s Mall</strong>, we’re redefining what it means to be a shopping destination.
                            Our vision is to become the region’s most vibrant, inclusive, and sustainable lifestyle hub—where
                            innovation meets community and every visit feels like coming home.
                        </p>
                    </div>

                    {/* Mission Card */}
                    <div className="col-md-5 m-2 justify-content-center card">
                        <h3 className="text-2xl font-bold">🎯 Our Mission</h3>
                        <p className="mt-2">
                            Our mission is to deliver unparalleled shopping, dining, and entertainment experiences that reflect
                            the diversity and dynamism of Nairobi. By creating a community-centric space, we are dedicated to
                            enriching the lives of our visitors, fostering innovation, and promoting sustainable practices
                            throughout our operations.
                        </p>
                    </div>
                </section>
                <br />

                {/* Controls Section */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="font-medium block mb-1">Language:</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value="en">English</option>
                            <option value="sw">Swahili</option>
                            <option value="fr">French</option>
                        </select>
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Voice:</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={selectedVoice?.name || ""}
                            onChange={(e) => {
                                const voice = voices.find((v) => v.name === e.target.value);
                                setSelectedVoice(voice);
                            }}
                        >
                            {getFilteredVoices().map((voice, i) => (
                                <option key={i} value={voice.name}>
                                    {voice.name} ({voice.lang})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Preset:</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={preset}
                            onChange={(e) => handlePresetChange(e.target.value)}
                        >
                            <option value="default">Default</option>
                            <option value="slow">Slow and Clear</option>
                            <option value="expressive">Expressive</option>
                            <option value="fast">Fast</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>Volume: {volume.toFixed(1)}</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                        />
                        <label>Pitch: {pitch.toFixed(1)}</label>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={pitch}
                            onChange={(e) => setPitch(parseFloat(e.target.value))}
                        />
                        <label>Rate: {rate.toFixed(1)}</label>
                        <input
                            type="range"
                            min="0.1"
                            max="3"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(parseFloat(e.target.value))}
                        />
                    </div>
                </div>
            </div>

            {/* Buttons at the bottom */}
            <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 space-x-4">
                <button
                    onClick={handleSpeak}
                    className="bg-green-500 text-white p-3 rounded-lg"
                    disabled={isSpeaking}
                >
                    {isSpeaking ? "Speaking..." : "Start Speaking"}
                </button>
                <button
                    onClick={handlePreview}
                    className="bg-blue-500 text-white p-3 rounded-lg"
                >
                    Preview Voice
                </button>
            </div>
        </div>
    );
};

export default About;
