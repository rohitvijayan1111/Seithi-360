import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const existingScript = document.getElementById('google-translate-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    }

    const applyCustomStyles = () => {
        const translateFrame = document.querySelector('.goog-te-menu-frame');
        if (translateFrame) {
          const frameDocument = translateFrame.contentDocument || translateFrame.contentWindow.document;
      
          // Add custom styles to hide tooltips
          const style = document.createElement('style');
          style.textContent = `
            .goog-te-menu-frame {
              border: 2px solid #333 !important;
            }
            .goog-te-menu2 {
              background-color: #f0f0f0 !important;
            }
            body .goog-tooltip {
              display: none !important;
            }
            body .goog-tooltip:hover {
              display: none !important;
            }
            body .goog-te-banner-frame {
              display: none !important;
            }
          `;
          frameDocument.head.appendChild(style);
        }
      };
      

    const hideLanguageDropdown = () => {
      const selectedLanguage = document.querySelector('.goog-te-menu2-item-selected');
      if (selectedLanguage) {
        const translateElement = document.getElementById('google_translate_element');
        if (translateElement) {
          translateElement.style.display = 'none';  
        }
      }
    };

    const observeLanguageChange = () => {
      const translateFrame = document.querySelector('.goog-te-menu-frame');

      if (translateFrame) {
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type === 'childList') {
              hideLanguageDropdown();  
            }
          }
        });

        observer.observe(translateFrame, { childList: true, subtree: true });
      }
    };

    window.googleTranslateElementInit = function() {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          multilanguagePage: true,
        },
        'google_translate_element'
      );

      setTimeout(() => {
        applyCustomStyles();
        observeLanguageChange(); 
      }, 2000);
    };

    return () => {
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return <div id="google_translate_element" style={{ position: 'fixed', bottom: "1%", left:55 }}></div>;
};

export default GoogleTranslate;
