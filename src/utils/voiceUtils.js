function getSpeechRecognitionConstructor() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function isVoiceRecognitionSupported() {
  return Boolean(getSpeechRecognitionConstructor());
}

export function startVoiceRecognition({
  language = "en-IN",
  onResult,
  onError,
  onStart,
  onEnd,
}) {
  const SpeechRecognition = getSpeechRecognitionConstructor();

  if (!SpeechRecognition) {
    throw new Error(
      "Voice input is not supported in this browser. Please type your symptoms instead."
    );
  }

  const recognition = new SpeechRecognition();

  recognition.lang = language;
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    if (onStart) onStart();
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;

    if (onResult) onResult(transcript);
  };

  recognition.onerror = (event) => {
    if (onError) {
      onError(event.error || "Unable to recognise voice input.");
    }
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  recognition.start();

  return recognition;
}