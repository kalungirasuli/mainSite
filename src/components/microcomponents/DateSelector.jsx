import React, { useState } from 'react';

const DoctorAvailabilityForm = () => {
  const [daysChecked, setDaysChecked] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const [availability, setAvailability] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const [currentHours, setCurrentHours] = useState({
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
    Sunday: '',
  });

  const handleCheck = (day) => {
    setDaysChecked({ ...daysChecked, [day]: !daysChecked[day] });
  };

  const handleHourChange = (day, hour) => {
    setCurrentHours({ ...currentHours, [day]: hour });
  };

  const handleAddHour = (day) => {
    const newHour = currentHours[day].trim();
    if (newHour && !availability[day].includes(newHour)) {
      setAvailability({
        ...availability,
        [day]: [...availability[day], newHour],
      });
      setCurrentHours({ ...currentHours, [day]: [...availability[day], newHour] });
    }
  };

  const handleRemoveHour = (day, hour) => {
    setAvailability({
      ...availability,
      [day]: availability[day].filter((h) => h !== hour),
    });
  };

  return (
    <div className="p-4">
      {Object.keys(availability).map((day) => (
        <div key={day} className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleCheck(day)}
              checked={daysChecked[day]}
            />
            {day}
          </label>
          {daysChecked[day] && (
            <div className="mt-2">
              
                <input
                  type="text"
                  className="border p-1 rounded"
                  placeholder="Add available hour"
                  onChange={(e) => handleHourChange(day, e.target.value)}
                />
                <button
                 type='button'
                  className="ml-2 bg-blue text-white px-2 py-1 rounded"
                  onClick={() => handleAddHour(day)}
                >
                  Add Hour
                </button>
              <div className="mt-2 flex flex-wrap gap-2">
                {availability[day].map((hour) => (
                  <div
                    key={hour}
                    className="flex items-center justify-between gap-3 bg-gray-100 p-2 rounded mt-1 w-[max-content]"
                  >
                    <span>{hour}</span>
                    <button
                    type='button'
                      className="text-red-500 text-[20px]"
                      onClick={() => handleRemoveHour(day, hour)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DoctorAvailabilityForm;
