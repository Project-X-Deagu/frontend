import React, { useState, useEffect } from "react";

const TypingEffect = ({ text, onComplete }) => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setTypedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      } else {
        clearInterval(typingInterval);
        if (onComplete) {
          onComplete();
        }
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentIndex, text, onComplete]);

  return (
    <div>
      <p
        dangerouslySetInnerHTML={{ __html: typedText.replace(/\n/g, "<br>") }}
      />
    </div>
  );
};

const TypingEffectExample = () => {
  const titleSentences = ["너 내 동료가 돼라&#x2757", " ", " ", " ", " "];
  const mainSentences = [" ", "> 상단에 손을 올려보세요."];

  const [isTitleTypingFinished, setTitleTypingFinished] = useState(false);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "40vh",
        transform: "translateY(-50%)",
      }}
    >
      <h1>
        {isTitleTypingFinished ? (
          "DODODOC Typing"
        ) : (
          <TypingEffect
            text={titleSentences.join("")}
            onComplete={() => setTitleTypingFinished(true)}
          />
        )}
      </h1>
      {isTitleTypingFinished && (
        <TypingEffect text={mainSentences.join("<br />")} />
      )}
    </div>
  );
};

export default TypingEffectExample;
