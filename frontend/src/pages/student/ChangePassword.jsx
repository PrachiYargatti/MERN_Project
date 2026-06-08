import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AppNavbar from "../../components/AppNavbar";
import config from "../../services/config";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = sessionStorage.getItem("token");

  const changePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const URL = `${config.BASE_URL}/student/change-password`;

      await axios.put(
        URL,
        {
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            token,
          },
        }
      );

      toast.success("Password changed successfully");

      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
        "Password update failed"
      );
    }
  };

  return (
    <>
      <AppNavbar />

      <div className="container mt-5 col-md-4">
        <h4 className="mb-3">Change Password</h4>

        <input
          type="password"
          className="form-control mb-2"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={changePassword}
        >
          Change Password
        </button>
      </div>
    </>
  );
}

export default ChangePassword;