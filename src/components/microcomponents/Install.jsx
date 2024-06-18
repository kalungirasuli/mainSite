import { useEffect, useState } from 'react';

const Install= () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the browser from automatically prompting the user
      event.preventDefault();
      // Store the event so it can be used later
      setDeferredPrompt(event);
      // Show the install button
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if the PWA can be installed manually
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      setShowInstallButton(false); // Hide the install button once installed
    });

    // Check if PWA can be installed on page load
    const isPWAInstallable = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (document.referrer.startsWith('android-app://') || isStandalone) {
        setShowInstallButton(false);
      }
    };

    window.addEventListener('load', isPWAInstallable);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', () => {
        console.log('PWA was installed');
        setShowInstallButton(false);
      });
      window.removeEventListener('load', isPWAInstallable);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the installation prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        // Reset the deferred prompt variable, as it can only be used once
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className='absolute top-[400px] right-[50px] z-[900] bg-white p-5 shadow-xl rounded-lg'>
      {/* Your application content */}
      <h1>Welcome to My PWA!</h1>
      
      {/* Button to install the PWA */}
      {showInstallButton && (
        <button onClick={handleInstallClick}>
          Install My PWA
        </button>
      )}
    </div>
  );
};

export default Install;
