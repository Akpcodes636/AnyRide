import React from 'react';
import WalletScreen from '@/app/components/others_ui/wallet_rider/WalletScreen';
import SpendingTrendsScreen from '@/app/components/others_ui/wallet_rider/SpendingTrendsScreen';
import FundWalletScreen from '@/app/components/others_ui/wallet_rider/FundWalletScreen';
import PayWithScreen from '@/app/components/others_ui/wallet_rider/PayWithScreen';
import AddCardScreen from '@/app/components/others_ui/wallet_rider/AddCardScreen';
import ManageAccountScreen from '@/app/components/others_ui/manage_account/ManageAccountScreen';
import ProfileInfoScreen from '@/app/components/others_ui/manage_account/ProfileInfoScreen';
import LoginSecurityScreen from '@/app/components/others_ui/manage_account/LoginSecurityScreen';
import SetPasswordScreen from '@/app/components/others_ui/manage_account/SetPasswordScreen';
import ResetPasswordScreen from '@/app/components/others_ui/manage_account/ResetPasswordScreen';
import NotificationsScreen from '@/app/components/others_ui/manage_account/NotificationsScreen';
import TermsConditionsScreen from '@/app/components/others_ui/manage_account/TermsConditionsScreen';
import LanguageScreen from '@/app/components/others_ui/manage_account/LanguageScreen';
import MyRidesScreen from '@/app/components/others_ui/my_rides/MyRidesScreen';
import SafetyScreen from '@/app/components/others_ui/safety/SafetyScreen';
import DriversVerificationScreen from '@/app/components/others_ui/safety/DriversVerificationScreen';
import SavedRidesScreen from '@/app/components/others_ui/saved_ride/SavedRidesScreen';
import DriveAndEarnScreen from '@/app/components/others_ui/rider_to_driver/DriveAndEarnScreen';
import WhereToEarnScreen from '@/app/components/others_ui/rider_to_driver/WhereToEarnScreen';
import GettingStartedScreen from '@/app/components/others_ui/rider_to_driver/GettingStartedScreen';
import TripHistoryScreen from '@/app/components/others_ui/trip_history/TripHistoryScreen';
import VerificationsScreen from '@/app/components/others_ui/trip_history/VerificationsScreen';
import DrivingLicenseScreen from '@/app/components/others_ui/trip_history/DrivingLicenseScreen';
import NationalIdScreen from '@/app/components/others_ui/trip_history/NationalIdScreen';
import ProfilePhotoScreen from '@/app/components/others_ui/trip_history/ProfilePhotoScreen';
import MyVehiclesEmptyScreen from '@/app/components/others_ui/my_vehicles/MyVehiclesEmptyScreen';
import AddNewVehicleModalStep1 from '@/app/components/others_ui/my_vehicles/AddNewVehicleModalStep1';
import AddNewVehicleModalStep2 from '@/app/components/others_ui/my_vehicles/AddNewVehicleModalStep2';
import VehicleUnderReviewScreen from '@/app/components/others_ui/my_vehicles/VehicleUnderReviewScreen';
import MyVehiclesListScreen from '@/app/components/others_ui/my_vehicles/MyVehiclesListScreen';
import ReviewHistoryScreen from '@/app/components/others_ui/reviews/ReviewHistoryScreen';

export default function AdditionalUIPage() {
    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto py-10 pt-32 space-y-24">
                <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Additional UI Screens</h1>

                {/* Wallet Screen Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        1. Wallet Screen
                    </h2>
                    <WalletScreen />
                </section>

                {/* Spending Trends Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        2. Spending Trends
                    </h2>
                    <SpendingTrendsScreen />
                </section>

                {/* Fund Wallet Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        3. Fund Wallet
                    </h2>
                    <FundWalletScreen />
                </section>

                {/* Pay With Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        4. Pay With
                    </h2>
                    <PayWithScreen />
                </section>

                {/* Add Card Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        5. Add Card
                    </h2>
                    <AddCardScreen />
                </section>

                {/* Manage Account Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        6. Manage Account
                    </h2>
                    <ManageAccountScreen />
                </section>

                {/* Profile Info Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        7. Profile Info
                    </h2>
                    <ProfileInfoScreen />
                </section>

                {/* Login Security Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        8. Login & Security
                    </h2>
                    <LoginSecurityScreen />
                </section>

                {/* Set Password Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        9. Set Password
                    </h2>
                    <SetPasswordScreen />
                </section>

                {/* Reset Password Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        10. Reset Password
                    </h2>
                    <ResetPasswordScreen />
                </section>

                {/* Notifications Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        11. Notifications
                    </h2>
                    <NotificationsScreen />
                </section>

                {/* Terms and Conditions Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        12. Terms & Conditions
                    </h2>
                    <TermsConditionsScreen />
                </section>

                {/* Language Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        13. Language
                    </h2>
                    <LanguageScreen />
                </section>

                {/* My Rides Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        14. My Rides
                    </h2>
                    <MyRidesScreen />
                </section>

                {/* Safety Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        15. Safety
                    </h2>
                    <SafetyScreen />
                </section>

                {/* Driver's Verification Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        16. Driver's Verification
                    </h2>
                    <DriversVerificationScreen />
                </section>

                {/* Saved Rides Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        17. Saved Rides
                    </h2>
                    <SavedRidesScreen />
                </section>

                {/* Drive and Earn Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        18. Drive and Earn
                    </h2>
                    <DriveAndEarnScreen />
                </section>

                {/* Where to Earn Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        19. Where to Earn
                    </h2>
                    <WhereToEarnScreen />
                </section>

                {/* Getting Started Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        20. Before Getting Started
                    </h2>
                    <GettingStartedScreen />
                </section>

                {/* Trip History Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        21. Your Trip History
                    </h2>
                    <TripHistoryScreen />
                </section>

                {/* Verifications Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        22. Verifications
                    </h2>
                    <VerificationsScreen />
                </section>

                {/* Driving License Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        23. Driving License
                    </h2>
                    <DrivingLicenseScreen />
                </section>

                {/* National ID Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        24. National ID / Passport
                    </h2>
                    <NationalIdScreen />
                </section>

                {/* Profile Photo Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        25. Verify Profile Photo
                    </h2>
                    <ProfilePhotoScreen />
                </section>

                {/* My Vehicles Empty Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        26. My Vehicles (Empty)
                    </h2>
                    <MyVehiclesEmptyScreen />
                </section>

                {/* Add New Vehicle Modal Step 1 */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        27. Add New Vehicle Modal (Step 1)
                    </h2>
                    <AddNewVehicleModalStep1 />
                </section>

                {/* Add New Vehicle Modal Step 2 */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        28. Add New Vehicle Modal (Step 2)
                    </h2>
                    <AddNewVehicleModalStep2 />
                </section>

                {/* Vehicle Under Review Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        29. Vehicle Under Review
                    </h2>
                    <VehicleUnderReviewScreen />
                </section>

                {/* My Vehicles List Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        30. My Vehicles (List View)
                    </h2>
                    <MyVehiclesListScreen />
                </section>

                {/* Review History Component */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-400 max-w-5xl mx-auto px-4 md:px-8">
                        31. Review History
                    </h2>
                    <ReviewHistoryScreen />
                </section>

                {/* Future UI components will be inherited/rendered here */}
                <p className="text-center text-gray-500 italic mt-12 pb-20">
                    More UI screens will be added below...
                </p>
            </main>
        </div>
    );
}

