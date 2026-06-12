const LANG_MAP = {
    "en": "English",
    "te": "Telugu",
    "hi": "Hindi",
    "ta": "Tamil",
    "kn": "Kannada",
    "ml": "Malayalam",
    "bn": "Bengali",
    "gu": "Gujarati",
    "mr": "Marathi",
    "pa": "Punjabi",
    "fr": "French",
    "de": "German",
    "es": "Spanish",
    "it": "Italian",
    "pt": "Portuguese",
    "ar": "Arabic",
    "zh": "Chinese",
    "ja": "Japanese",
    "ko": "Korean",
    "ru": "Russian",
    "sv": "Swedish",
    "no": "Norwegian",
    "hr": "Croatian"
};

async function translateText() {

    const text = document.getElementById("inputText").value;
    const target = document.getElementById("targetLang").value;

    if (!text.trim()) {
        alert("Please enter text");
        return;
    }

    try {
        const response = await fetch("/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text,
                target: target
            })
        });

        const data = await response.json();

        const chat = document.getElementById("chatContainer");

        chat.innerHTML += `
            <div class="user-message">
                ${text}
            </div>
        `;

    
          chat.innerHTML += `
<div class="bot-message">

    <div class="msg-text">
        ${data.translated}
    </div>

    <div class="actions">
        <button onclick="copyText(this)">📋 Copy</button>
        <button onclick="speakText(this)">🔊 Speak</button>
    </div>

    <div class="meta">
        🌍 ${data.detected}
        <br>
        😊 ${data.sentiment}
    </div>

</div>
`;

        document.getElementById("inputText").value = "";

        chat.scrollTop = chat.scrollHeight;

    } catch (error) {
        console.error(error);
        alert("Translation failed");
    }
}
function copyText(btn) {
    const text = btn.closest(".bot-message").querySelector(".msg-text").innerText;

    navigator.clipboard.writeText(text);
    alert("Copied!");
}

function speakText(btn) {
    const text = btn.closest(".bot-message").querySelector(".msg-text").innerText;

    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}
