import Speech from "speak-tts";

export const speak = async text => {
  const speech = new Speech();
  if (speech.hasBrowserSupport()) {
    try {
      const data = await speech.init({
        lang: "en-GB",
        voice: "Google UK English Male",
        splitSentences: true
      });

      console.log("Speech is ready, voices are available", data);
      await speech.speak({
        text
      });
    } catch (e) {
      console.error("An error occured while initializing : ", e);
    }
  }
};
