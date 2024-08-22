import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";

const Forms = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form input:", input);

    const serviceID = "service_pmlubob";
    const templateID = "template_g3wpjai";
    const userID = "31uSRytfoc-6ujAhw";

    // Send data to EmailJS
    emailjs
      .send(serviceID, templateID, input, userID)
      .then((response) => {
        console.log("Email sent successfully:", response);
        setShowPopup(true);
        setInput({
          name: "",
          email: "",
          age: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send email. Please try again later.");
      });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  return (
    <>
      <section className="bg-black max-w-[700px] h-[700px] mx-auto flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-purple-500 py-4 px-4 flex flex-col max-w-[500px]"
            >
              <h2 className="text-white">Register today</h2>
              <p className="text-white mb-0">Fill in the data below</p>

              <input
                required
                onChange={handleChange}
                className="mt-3 p-2"
                placeholder="Name"
                type="text"
                name="name"
                value={input.name}
              />
              <input
                required
                onChange={handleChange}
                className="mt-3 p-2"
                placeholder="Email"
                type="email"
                name="email"
                value={input.email}
              />
              <input
                required
                onChange={handleChange}
                className="mt-3 p-2"
                placeholder="Age"
                type="number"
                name="age"
                value={input.age}
              />
              <input
                required
                onChange={handleChange}
                className="mt-3 p-2"
                placeholder="Password"
                type="password"
                name="password"
                value={input.password}
              />
              <button className="mt-3 p-2 bg-blue-500 text-white" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-bold">Form Submitted</h3>
            <p>Your data has been submitted successfully!</p>
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Forms;
