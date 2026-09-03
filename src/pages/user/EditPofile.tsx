import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useProfile } from "../../hooks/useProfile";
import { usePasswordChange } from "../../hooks/usePasswordChange";
import { useAuth } from "../../hooks/useAuth";
import { DEFAULT_AVATAR } from "../../common/constants";
import {
    updateProfileSchema,
    verifyPasswordSchema,
    changePasswordSchema,
    type UpdateProfileFormData,
    type VerifyPasswordFormData,
    type ChangePasswordFormData,
} from "../../validations/profile.validation";

const EditProfile: React.FC = () => {
    const { profile, loading, updateProfile } = useProfile();
    const { isVerified, verifying, changing, verify, changePassword, reset: resetVerification } = usePasswordChange();
    const { signOut } = useAuth();

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        register: registerProfile,
        handleSubmit: handleProfileSubmit,
        reset: resetProfileForm,
        formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
    } = useForm<UpdateProfileFormData>({
        resolver: zodResolver(updateProfileSchema),
    });

    const {
        register: registerVerify,
        handleSubmit: handleVerifySubmit,
        formState: { errors: verifyErrors },
    } = useForm<VerifyPasswordFormData>({
        resolver: zodResolver(verifyPasswordSchema),
    });

    const {
        register: registerNewPassword,
        handleSubmit: handleNewPasswordSubmit,
        reset: resetPasswordForm,
        formState: { errors: newPasswordErrors },
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
    });

    useEffect(() => {
        if (profile) {
            resetProfileForm({
                firstName: profile.firstName,
                lastName: profile.lastName ?? "",
                gender: profile.gender ?? undefined,
                birthday: profile.birthday ? profile.birthday.slice(0, 10) : "",
                phoneNumber: profile.phoneNumber ?? "",
                bio: profile.bio ?? "",
            });
            setImagePreview(profile.profileImage);
        }
    }, [profile, resetProfileForm]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const onProfileSubmit = async (data: UpdateProfileFormData) => {
        await updateProfile(data, imageFile ?? undefined);
        setImageFile(null);
    };

    const onVerifySubmit = async (data: VerifyPasswordFormData) => {
        await verify(data.currentPassword);
    };

    const onChangePasswordSubmit = async (data: ChangePasswordFormData) => {
        await changePassword(data.newPassword);
        resetPasswordForm();
        resetVerification();
        signOut(); // force re-login after password change, per requirement
    };

    if (loading) {
        return <p className="py-20 text-center text-gray-500">Loading profile...</p>;
    }

    return (
        <section className="bg-cloud py-10">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm lg:p-10">

                {/* Heading */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-ink">Profile Settings</h1>
                    <p className="mt-3 text-gray-500">
                        Manage your personal information and account security.
                    </p>
                </div>

                {/* Profile form */}
                <form onSubmit={handleProfileSubmit(onProfileSubmit)}>

                    {/* Avatar */}
                    <div className="mt-10 flex flex-col items-center">
                        <img
                            src={imagePreview || DEFAULT_AVATAR}
                            alt="Profile"
                            className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                        />
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
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Personal Information */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold text-ink">Personal Information</h2>

                        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    {...registerProfile("firstName")}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
                                />
                                {profileErrors.firstName && (
                                    <p className="mt-1 text-sm text-red-600">{profileErrors.firstName.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    {...registerProfile("lastName")}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    {...registerProfile("gender")}
                                    defaultValue=""
                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
                                >
                                    <option value="" disabled>Select gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">Birthday</label>
                                <input
                                    type="date"
                                    {...registerProfile("birthday")}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+92 300 1234567"
                                    {...registerProfile("phoneNumber")}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
                                />
                                {profileErrors.phoneNumber && (
                                    <p className="mt-1 text-sm text-red-600">{profileErrors.phoneNumber.message}</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    value={profile?.email ?? ""}
                                    readOnly
                                    className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500 outline-none"
                                />
                                <p className="mt-2 text-sm text-gray-500">Email address cannot be changed.</p>
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">Bio</label>
                                <textarea
                                    rows={3}
                                    placeholder="Tell readers a bit about yourself..."
                                    {...registerProfile("bio")}
                                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
                                />
                                {profileErrors.bio && (
                                    <p className="mt-1 text-sm text-red-600">{profileErrors.bio.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={isProfileSubmitting}
                            className="rounded-xl bg-purple px-8 py-3 font-semibold text-white transition hover:bg-purple/90 disabled:opacity-50"
                        >
                            {isProfileSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>

                {/* Divider */}
                <div className="my-12 border-t border-gray-200" />

                {/* Password & Security */}
                <div>
                    <h2 className="text-2xl font-semibold text-ink">Password & Security</h2>
                    <p className="mt-2 text-gray-500">
                        Verify your current password before creating a new one.
                    </p>

                    {!isVerified && (
                        <form onSubmit={handleVerifySubmit(onVerifySubmit)} className="mt-8">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    placeholder="Enter your current password"
                                    {...registerVerify("currentPassword")}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple"
                                >
                                    {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {verifyErrors.currentPassword && (
                                <p className="mt-1 text-sm text-red-600">{verifyErrors.currentPassword.message}</p>
                            )}

                            <button
                                type="submit"
                                disabled={verifying}
                                className="mt-5 rounded-xl bg-purple px-6 py-3 font-semibold text-white transition hover:bg-purple/90 disabled:opacity-50"
                            >
                                {verifying ? "Verifying..." : "Verify Password"}
                            </button>
                        </form>
                    )}

                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            isVerified ? "mt-8 max-h-175 opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-4">
                            <h3 className="font-semibold text-green-700">✓ Password Verified</h3>
                            <p className="mt-1 text-sm text-green-600">
                                Your current password has been verified. You can now create a new password.
                            </p>
                        </div>

                        <form onSubmit={handleNewPasswordSubmit(onChangePasswordSubmit)}>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Enter your new password"
                                        {...registerNewPassword("newPassword")}
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple"
                                    >
                                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {newPasswordErrors.newPassword && (
                                    <p className="mt-1 text-sm text-red-600">{newPasswordErrors.newPassword.message}</p>
                                )}
                            </div>

                            <div className="mt-6">
                                <label className="mb-2 block text-sm font-medium text-gray-700">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your new password"
                                        {...registerNewPassword("confirmPassword")}
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {newPasswordErrors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600">{newPasswordErrors.confirmPassword.message}</p>
                                )}
                            </div>

                            <div className="mt-12 flex flex-col-reverse gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={resetVerification}
                                    className="rounded-xl border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={changing}
                                    className="rounded-xl bg-purple px-8 py-3 font-semibold text-white transition hover:bg-purple/90 hover:shadow-lg disabled:opacity-50"
                                >
                                    {changing ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditProfile;