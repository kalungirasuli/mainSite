// import { useEffect, useState } from 'react';

// const Install = () => {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);
//   const [showInstallButton, setShowInstallButton] = useState(false);
//   const [isAppInstalled, setIsAppInstalled] = useState(false);

//   useEffect(() => {
//     const handleBeforeInstallPrompt = (event) => {
//       // Prevent the browser from automatically prompting the user
//       event.preventDefault();
//       // Store the event so it can be used later
//       setDeferredPrompt(event);
//       // Show the install button
//       setShowInstallButton(true);
//     };

//     window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

//     const checkAppInstalled = () => {
//       const isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
//         window.navigator.standalone ||
//         document.referrer.includes('android-app://');
      
//       setIsAppInstalled(isInstalled);
//       setShowInstallButton(!isInstalled);
//     };

//     window.addEventListener('appinstalled', () => {
//       setIsAppInstalled(true);
//       setShowInstallButton(false);
//     });

//     checkAppInstalled();

//     return () => {
//       window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
//       window.removeEventListener('appinstalled', () => {
//         setIsAppInstalled(false);
//         setShowInstallButton(true);
//       });
//     };
//   }, []);

//   const handleInstallClick = () => {
//     if (deferredPrompt) {
//       // Show the installation prompt
//       deferredPrompt.prompt();

//       // Wait for the user to respond to the prompt
//       deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted the install prompt');
//           setIsAppInstalled(true);
//           setShowInstallButton(false);
//         } else {
//           console.log('User dismissed the install prompt');
//         }
//         // Reset the deferred prompt variable, as it can only be used once
//         setDeferredPrompt(null);
//       });
//     }
//   };

//   return (
//     <>
//       {/* Button to install the PWA */}
//       {!isAppInstalled && showInstallButton && (
//         <div className='absolute top-4 right-4 z-50 bg-blue p-3 rounded-lg shadow-lg'>
//           <button onClick={handleInstallClick} className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded'>
//             Install My PWA
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Install;
