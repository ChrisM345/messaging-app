import { useState } from "react";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value.trim());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value.trim());
    if (password != e.target.value.trim()) {
      setError("Passwords must match");
    } else {
      setError("");
    }
  };
  return (
    <>
      <div className="flex-col text-center items-center">
        <h2>Sign Up Form</h2>
        <form className="">
          <label className="block">Username</label>
          <input
            onChange={handleUsernameChange}
            className="border rounded-md w-4/6 mt-1 p-1 text-center"
            value={username}
            type="text"
          />

          <label className="block">Password</label>
          <input
            onChange={handlePasswordChange}
            className="border rounded-md w-4/6 mt-1 p-1 text-center"
            value={password}
            type="password"
          />
          <label className="block">Confirm Password</label>
          <input
            onChange={handleConfirmPasswordChange}
            className="border rounded-md w-4/6 mt-1 p-1 text-center"
            value={confirmPassword}
            type="password"
          />
          <button
            className="mt-1 w-4/6 bg-indigo-700 text-white p-2 rounded-md hover:bg-indigo-400 transition"
            type="submit"
          >
            Sign up
          </button>
        </form>
        {error != "" && <div className="errorSection">Error: {error}</div>}
      </div>
    </>
  );
};

export default SignupPage;
