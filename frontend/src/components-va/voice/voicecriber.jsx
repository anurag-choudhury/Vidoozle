import React, { useState } from 'react';
import VoiceRecorder from './VoiceRecorder';
import Call from '../../Call';

const Voicecriber = () => {
    const [uploadedBlob, setUploadedBlob] = useState(null);
    const [currentClonedVoiceId, setcurrentClonedVoiceId] = useState(null);
    const handleVoiceUpload = async (file) => {
        //getting the list of cloned voices already present in the server

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                AUTHORIZATION: import.meta.env.VITE_PLAY_HT_AUTH,
                'X-USER-ID': import.meta.env.VITE_PLAY_HT_USERID
            }
        };
        let voiceIdToDlt;

        try {
            const response = await fetch("/api/v2/cloned-voices", options);

            // Check if response is okay (status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const res = await response.json(); // Await the parsing of the JSON response
            console.log(res);
            voiceIdToDlt = res[0].id; // Set the voice ID to delete later or use it as needed
        } catch (err) {
            console.error('Error:', err);
        }
        //delete the previously added voice
        const optionstodel = {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                AUTHORIZATION: import.meta.env.VITE_PLAY_HT_AUTH,
                'X-USER-ID': import.meta.env.VITE_PLAY_HT_USERID
            },
            body: JSON.stringify({ voice_id: voiceIdToDlt })
        };

        fetch('/api/v2/cloned-voices/', optionstodel)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
        //set the new clone voice
        const myHeaders = new Headers();
        myHeaders.append("X-USER-ID", import.meta.env.VITE_PLAY_HT_USERID);
        myHeaders.append("Authorization", import.meta.env.VITE_PLAY_HT_AUTH);
        // myHeaders.append("X-USER-ID", "RrwbWkiwmzTbmHweR9cLavmRHJH2");
        // myHeaders.append("Authorization", "Bearer 25c2400fc37c49078e2664891bec9ca5");

        const formdata = new FormData();
        formdata.append("sample_file", file);
        formdata.append("voice_name", "cl voice");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        fetch("/api/v2/cloned-voices/instant", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parse the response as JSON
            })
            .then((result) => {
                console.log(result); // Log the entire result object
                setcurrentClonedVoiceId(result.id); // Access the id from the parsed result
                // console.log(currentClonedVoiceId); // Log the cloned voice ID
            })
            .catch((error) => console.error('Error:', error));

    }
    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg ">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Voice Recorder and Cloner</h1>
            <VoiceRecorder onVoiceUpload={handleVoiceUpload} />
            {currentClonedVoiceId && (
                <div className="mt-6 flex justify-center">
                    <Call
                        playHtVoiceId={currentClonedVoiceId}
                        buttonLabel={"Talk to your cloned voice"}
                        className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                    />
                </div>
            )}
        </div>

    );
};

export default Voicecriber;
