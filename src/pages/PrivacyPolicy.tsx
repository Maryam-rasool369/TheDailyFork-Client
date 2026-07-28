import type React from "react";

const PrivacyPolicy:React.FC = () => {
    return (
        <section className="mx-auto max-w-7xl px-6 py-16">
            <div className="">

                <h1 className="text-4xl font-bold text-ink">
                    Privacy Policy
                </h1>

                <p className="mt-3 text-sm text-gray-500">
                    Last Updated: January 1, 2026
                </p>

                <p className="mt-8 leading-8 text-gray-600">
                    At Indigo, we value your privacy and are committed to protecting
                    your personal information. This Privacy Policy explains how we
                    collect, use, store, and safeguard the information you provide
                    while using our website and services. By accessing or using
                    Indigo, you agree to the collection and use of your information
                    in accordance with this Privacy Policy.
                </p>

                <div className="mt-12 space-y-10">

                    {/* Section 1 */}
                    <div>
                        <h2 className="text-2xl font-semibold text-ink">
                            1. Information We Collect
                        </h2>

                        <p className="mt-4 leading-8 text-gray-600">
                            We may collect personal information that you voluntarily
                            provide when creating an account, updating your profile,
                            subscribing to newsletters, contacting support, or using our
                            services. This information may include your name, email
                            address, profile picture, and any content you choose to
                            publish on the platform.
                        </p>

                        <p className="mt-4 leading-8 text-gray-600">
                            We may also automatically collect technical information such
                            as your browser type, operating system, IP address, device
                            information, pages visited, session duration, and interaction
                            with our services to improve user experience and platform
                            performance.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h2 className="text-2xl font-semibold text-ink">
                            2. How We Use Your Information
                        </h2>

                        <p className="mt-4 leading-8 text-gray-600">
                            The information we collect helps us provide, improve, and
                            personalize our services. We may use your information to:
                        </p>

                        <ul className="mt-4 list-disc space-y-3 pl-6 leading-8 text-gray-600">
                            <li>Create and manage your account.</li>
                            <li>Authenticate your identity securely.</li>
                            <li>Display your published articles and profile.</li>
                            <li>Respond to customer support requests.</li>
                            <li>Send important account notifications.</li>
                            <li>Improve website functionality and user experience.</li>
                            <li>Detect fraud, abuse, or unauthorized access.</li>
                        </ul>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <h2 className="text-2xl font-semibold text-ink">
                            3. Cookies & Tracking Technologies
                        </h2>

                        <p className="mt-4 leading-8 text-gray-600">
                            Indigo uses cookies and similar technologies to remember your
                            preferences, maintain secure login sessions, analyze website
                            traffic, and improve overall performance. You may disable
                            cookies through your browser settings, although certain
                            features of the platform may not function correctly.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div>
                        <h2 className="text-2xl font-semibold text-ink">
                            4. Data Sharing
                        </h2>

                        <p className="mt-4 leading-8 text-gray-600">
                            We do not sell or rent your personal information to third
                            parties. Information may only be shared with trusted service
                            providers who assist us in operating the platform, processing
                            authentication, hosting services, analytics, or when required
                            by applicable law.
                        </p>
                    </div>

                    {/* Section 5 */}
                    <div>
                        <h2 className="text-2xl font-semibold text-ink">
                            5. Data Security
                        </h2>

                        <p className="mt-4 leading-8 text-gray-600">
                            We implement appropriate technical and organizational
                            safeguards to protect your personal information from
                            unauthorized access, disclosure, alteration, or destruction.
                            Although we strive to use commercially acceptable security
                            measures, no method of electronic storage or internet
                            transmission is completely secure.
                        </p>
                    </div>

                    {/* Section 6 */}
                    <div>
                        <h2 className="text-2xl font-semibold text-ink">
                            6. Your Rights
                        </h2>

                        <p className="mt-4 leading-8 text-gray-600">
                            Depending on your location and applicable laws, you may have
                            the right to access, update, correct, or delete your personal
                            information. You may also withdraw consent for certain data
                            processing activities or request a copy of the information we
                            hold about you.
                        </p>
                    </div>

                    {/* Section 7 */}
                    <div>
                        <h2 className="text-2xl font-semibold text-ink">
                            7. Third-Party Services
                        </h2>

                        <p className="mt-4 leading-8 text-gray-600">
                            Our platform may contain links to third-party websites,
                            authentication providers, or external services. We are not
                            responsible for the privacy practices or content of these
                            third-party platforms. We encourage you to review their
                            privacy policies before providing any personal information.
                        </p>
                    </div>

                    {/* Section 8 */}
                    <div>
                        <h2 className="text-2xl font-semibold text-ink">
                            8. Children's Privacy
                        </h2>

                        <p className="mt-4 leading-8 text-gray-600">
                            Indigo is not intended for children under the age of 13. We
                            do not knowingly collect personal information from children.
                            If we become aware that such information has been collected,
                            we will promptly remove it from our systems.
                        </p>
                    </div>

                    {/* Section 9 */}
                    <div>
                        <h2 className="text-2xl font-semibold text-ink">
                            9. Changes to This Privacy Policy
                        </h2>

                        <p className="mt-4 leading-8 text-gray-600">
                            We may update this Privacy Policy periodically to reflect
                            changes in technology, legal requirements, or our business
                            practices. Updated versions will be published on this page,
                            and the revised date will be updated accordingly.
                        </p>
                    </div>

                    {/* Section 10 */}
                    <div>
                        <h2 className="text-2xl font-semibold text-ink">
                            10. Contact Us
                        </h2>

                        <p className="mt-4 leading-8 text-gray-600">
                            If you have any questions, concerns, or requests regarding
                            this Privacy Policy or how your information is handled,
                            please contact our support team. We are committed to
                            protecting your privacy and responding to your inquiries in a
                            timely manner.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PrivacyPolicy;