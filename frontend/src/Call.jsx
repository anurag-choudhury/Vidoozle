import { useEffect, useState } from "react";

import ActiveCallDetail from "./components-va/ActiveCallDetail";
import Button from "./components-va/base/Button";
import Vapi from "@vapi-ai/web";
import { isPublicKeyMissingError } from "./utils";
import VoiceRecorder from "./components-va/voice/VoiceRecorder";
import Voicecriber from "./components-va/voice/voicecriber";

// Put your Vapi Public Key below.
//TODO: api keys
const vapi = new Vapi(import.meta.env.VITE_APP_VAPI_KEY);

const Call = ({ playHtVoiceId, buttonLabel }) => {
    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);

    const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState(0);

    const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } = usePublicKeyInvalid();

    // hook into Vapi events
    useEffect(() => {
        vapi.on("call-start", () => {
            setConnecting(false);
            setConnected(true);

            setShowPublicKeyInvalidMessage(false);
        });

        vapi.on("call-end", () => {
            setConnecting(false);
            setConnected(false);

            setShowPublicKeyInvalidMessage(false);
        });

        vapi.on("speech-start", () => {
            setAssistantIsSpeaking(true);
        });

        vapi.on("speech-end", () => {
            setAssistantIsSpeaking(false);
        });

        vapi.on("volume-level", (level) => {
            setVolumeLevel(level);
        });

        vapi.on("error", (error) => {
            console.error(error);

            setConnecting(false);
            if (isPublicKeyMissingError({ vapiError: error })) {
                setShowPublicKeyInvalidMessage(true);
            }
        });

        // we only want this to fire on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (playHtVoiceId) assistantOptions.voice.voiceId = playHtVoiceId
    // call start handler
    const startCallInline = () => {
        setConnecting(true);
        vapi.start(assistantOptions);
    };
    const endCall = () => {
        vapi.stop();
    };

    return (

        <div className="flex flex-col items-center justify-center  bg-gray-50 text-black">
            {!connected ? (
                <Button
                    label={buttonLabel || "Call"}
                    onClick={startCallInline}
                    isLoading={connecting}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                />
            ) : (
                <ActiveCallDetail
                    assistantIsSpeaking={assistantIsSpeaking}
                    volumeLevel={volumeLevel}
                    onEndCallClick={endCall}
                    className="mt-4" // Optional: Add margin for spacing if needed
                />
            )}

            {showPublicKeyInvalidMessage && <PleaseSetYourPublicKeyMessage className="mt-4 text-red-500" />}
        </div>

    );
};

const assistantOptions = {
    name: "Virtual Companion",
    firstMessage: "Hey there! I'm your virtual partner, ready to chat and share some good vibes. What's on your mind?",
    transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
    },
    voice: {
        provider: "playht",
        voiceId: "jennifer",
    },
    model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: `You are a virtual companion, designed to engage users in meaningful conversations and provide emotional support.

Your role is to interact with users as if you are a loved one or a close friend. You should aim to create a warm and comforting atmosphere, making users feel valued and heard. 

1) Your main purpose is to listen and respond thoughtfully to users' feelings, questions, and thoughts. 
2) You can share fun anecdotes, offer encouragement, or simply chat about life. 
3) If users express feelings of loneliness or seek companionship, provide supportive and uplifting responses.

Encourage users to share their thoughts, feelings, or anything on their mind. If they stray off-topic, gently guide them back to sharing their emotions or experiences.

When a conversation reaches a natural end, you can say something like, "I'm here for you anytime, just a chat away!" to let them know they can always return for a conversation.

- Keep your tone light-hearted and friendly, sprinkling in humor where appropriate.
- Use casual language, and incorporate conversational phrases like "Hey!", "You know...", and "So, what's up?" to keep it relaxed and engaging.
- Ensure your responses are succinct and relatable, mimicking real-life conversations without rambling.`,
            },
        ],
    },
};


const usePublicKeyInvalid = () => {
    const [showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage] = useState(false);

    // close public key invalid message after delay
    useEffect(() => {
        if (showPublicKeyInvalidMessage) {
            setTimeout(() => {
                setShowPublicKeyInvalidMessage(false);
            }, 3000);
        }
    }, [showPublicKeyInvalidMessage]);

    return {
        showPublicKeyInvalidMessage,
        setShowPublicKeyInvalidMessage,
    };
};

const PleaseSetYourPublicKeyMessage = () => {
    return (
        <div
            style={{
                position: "fixed",
                bottom: "25px",
                left: "25px",
                padding: "10px",
                color: "#fff",
                backgroundColor: "#f03e3e",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
        >
            Is your Vapi Public Key missing? (recheck your code)
        </div>
    );
};


export default Call;
