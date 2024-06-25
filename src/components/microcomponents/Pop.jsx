import React, { useState } from 'react';

const Popup = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();
  props.message?setMessage(props.message):setMessage(false);

  const openPopup = (msg) => {
    setMessage(msg);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50"  onClick={closePopup}>
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white p-8 max-w-sm mx-auto rounded-lg shadow-lg z-10">
            <div className="text-center">
              <p className="text-lg font-bold mb-4">{message}</p>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded focus:outline-none"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
