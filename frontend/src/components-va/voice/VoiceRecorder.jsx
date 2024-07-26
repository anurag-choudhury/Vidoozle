import React, { useState, useRef } from 'react';
import Call from '../../Call';
const VoiceRecorder = ({ onVoiceUpload }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorder = useRef(null);
    const chunks = useRef([]);

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder.current = new MediaRecorder(stream);
                mediaRecorder.current.ondataavailable = event => chunks.current.push(event.data);
                mediaRecorder.current.onstop = () => {
                    const blob = new Blob(chunks.current, { type: 'audio/webm' });
                    setAudioBlob(blob);
                    chunks.current = [];
                };
                mediaRecorder.current.start();
                setIsRecording(true);
            })
            .catch(err => console.error('Error accessing media devices.', err));
    };

    const stopRecording = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            setIsRecording(false);
        }
    };

    const handleUpload = event => {
        const file = event.target.files[0];
        setAudioBlob(file);
    };

    const handleSend = () => {
        if (audioBlob && typeof onVoiceUpload === 'function') {
            onVoiceUpload(audioBlob);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Record or Upload Voice</h2>
            <div className="flex justify-center space-x-4 mb-4">
                <button
                    onClick={startRecording}
                    disabled={isRecording}
                    className={`px-4 py-2 rounded-lg text-white ${isRecording ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition`}
                >
                    Start Recording
                </button>
                <button
                    onClick={stopRecording}
                    disabled={!isRecording}
                    className={`px-4 py-2 rounded-lg text-white ${!isRecording ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'} transition`}
                >
                    Stop Recording
                </button>
            </div>
            <div className="mb-4">
                <input
                    type="file"
                    accept="audio/*"
                    onChange={handleUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                />
            </div>
            {audioBlob ? (
                <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">Recorded/Uploaded Voice:</h3>
                    <audio
                        src={URL.createObjectURL(audioBlob)}
                        controls
                        className="w-full mt-2"
                    />
                    <button
                        onClick={handleSend}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                        Send to API
                    </button>
                </div>
            ) : (
                <div className="mt-6 flex justify-center">
                    <Call buttonLabel={"Talk to our AI"} className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition" />
                </div>
            )}
        </div>


    );
};

export default VoiceRecorder;
