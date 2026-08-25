import React, { useState } from "react";
import { Camera, Eye, EyeOff } from "lucide-react";

const EditProfile: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordVerified, setPasswordVerified] = useState(false);

  return (
    <section className="bg-cloud py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm lg:p-10">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-ink">
            Profile Settings
          </h1>

          <p className="mt-3 text-gray-500">
            Manage your personal information and account security.
          </p>
        </div>

        {/* Avatar */}
        <div className="mt-10 flex flex-col items-center">

          <div className="relative">

            <img
              src="https://i.pravatar.cc/300?img=32"
              alt="Profile"
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
            />

          </div>

          <label
            htmlFor="avatar"
            className="mt-5 cursor-pointer font-medium text-purple transition hover:underline"
          >
            Change Photo
          </label>

          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Personal Information */}
        <div className="mt-12">

          <h2 className="text-2xl font-semibold text-ink">
            Personal Information
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* First Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                First Name
              </label>

              <input
                type="text"
                defaultValue="Maryam"
                placeholder="Enter your first name"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-purple
                  focus:ring-2
                  focus:ring-purple/20
                "
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Last Name
              </label>

              <input
                type="text"
                defaultValue="Rasool"
                placeholder="Enter your last name"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-purple
                  focus:ring-2
                  focus:ring-purple/20
                "
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                defaultValue="maryam@example.com"
                readOnly
                className="
                  w-full
                  cursor-not-allowed
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-100
                  px-4
                  py-3
                  text-gray-500
                  outline-none
                "
              />

              <p className="mt-2 text-sm text-gray-500">
                Email address cannot be changed.
              </p>
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="my-12 border-t border-gray-200" />

        {/* Password & Security */}
        <div>

          <h2 className="text-2xl font-semibold text-ink">
            Password & Security
          </h2>

          <p className="mt-2 text-gray-500">
            Verify your current password before creating a new one.
          </p>
          {/* Current Password */}
          <div className="mt-8">

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Current Password
            </label>

            <div className="relative">

              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter your current password"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-3
                  pr-12
                  outline-none
                  transition
                  focus:border-purple
                  focus:ring-2
                  focus:ring-purple/20
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrentPassword(!showCurrentPassword)
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  hover:text-purple
                "
              >
                {showCurrentPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

            {/* Verify Button */}

            {!passwordVerified && (
              <button
                type="button"
                onClick={() => setPasswordVerified(true)}
                className="
                  mt-5
                  rounded-xl
                  bg-purple
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-purple/90
                "
              >
                Verify Password
              </button>
            )}

          </div>

          {/* Password Fields */}

          <div
            className={`
              overflow-hidden
              transition-all
              duration-500
              ease-in-out
              ${passwordVerified
                ? "mt-8 max-h-175 opacity-100"
                : "max-h-0 opacity-0"
              }
            `}
          >

            {/* Success Message */}

            <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-4">

              <h3 className="font-semibold text-green-700">
                ✓ Password Verified
              </h3>

              <p className="mt-1 text-sm text-green-600">
                Your current password has been verified. You can now
                create a new password.
              </p>

            </div>

            {/* New Password */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                New Password
              </label>

              <div className="relative">

                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    py-3
                    pr-12
                    outline-none
                    transition
                    focus:border-purple
                    focus:ring-2
                    focus:ring-purple/20
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(!showNewPassword)
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    hover:text-purple
                  "
                >
                  {showNewPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm Password */}

            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <div className="relative">

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    py-3
                    pr-12
                    outline-none
                    transition
                    focus:border-purple
                    focus:ring-2
                    focus:ring-purple/20
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    hover:text-purple
                  "
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-12 flex flex-col-reverse gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:justify-end">

            {/* Cancel */}
            <button
              type="button"
              className="
                rounded-xl
                border
                border-gray-300
                px-8
                py-3
                font-semibold
                text-gray-700
                transition
                hover:border-gray-400
                hover:bg-gray-100
              "
            >
              Cancel
            </button>

            {/* Save Changes */}
            <button
              type="submit"
              className="
                rounded-xl
                bg-purple
                px-8
                py-3
                font-semibold
                text-white
                transition
                hover:bg-purple/90
                hover:shadow-lg
              "
            >
              Save Changes
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default EditProfile;