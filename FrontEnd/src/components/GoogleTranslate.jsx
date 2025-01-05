import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const existingScript = document.getElementById("google-translate-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.async = true;
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }

    const applyCustomStyles = () => {
      const style = document.createElement("style");
      style.textContent = `
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          margin-top: 0 !important;
        }
        #google_translate_element {
          top: 4%;
          right: 115px;
        }
        @media (max-width: 768px) {
          #google_translate_element {
            top: 10%;
            right: 10px;
          }
        }
      `;
      document.head.appendChild(style);
    };

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          multilanguagePage: true,
        },
        "google_translate_element"
      );

      setTimeout(() => {
        applyCustomStyles();
      }, 2000);
    };

    return () => {
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        top: "8%",
        right: "180px",
        width:"100px"
      }}
    ></div>
  );
};

export default GoogleTranslate;
