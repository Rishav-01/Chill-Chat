import React, { useState } from "react";
import GenderCheckBox from "../components/GenderCheckBox";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckBoxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up to <span className="text-blue-500">Chill Chat</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
            />
          </div>

          {/* Gender checkbox */}
          <GenderCheckBox
            onCheckBoxChange={handleCheckBoxChange}
            selectedGender={inputs.gender}
          />

          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-300 mt-2 inline-block"
          >
            Already have an account ?
          </Link>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="btn btn-block btn-sm mt-2"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
