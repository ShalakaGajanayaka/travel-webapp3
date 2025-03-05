import React from 'react'
import ErrorPage from '../errorpage/ErrorPage'

export default function Index() {
  return (
    <>
    <div className="px-6 py-6 border-b border-[#3F72AF] bg-[#112D4E] sm:flex sm:items-center sm:justify-between sm:px-8 lg:px-10 shadow-lg">
        <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold text-white sm:truncate">Terms & Conditions</h1>
        </div>
      </div>
      <div className="px-4 mt-6 sm:px-6 lg:px-8">
      <div className="px-4 mt-6 sm:px-6 lg:px-8">
        <div className="px-6 py-16 rounded-lg shadow-md bg-gray-50 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Terms & Conditions</h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Welcome to <span className="font-semibold text-indigo-600">Intrepid.Expert</span>. These terms outline the rules and regulations for using our platform.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mt-10 space-y-8 text-lg text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900">1. Account Registration</h2>
              <ul className="pl-6 mt-2 space-y-2 list-disc">
                <li>Users must be at least 21 years old to register.</li>
                <li>Each phone number can only be linked to one account.</li>
                <li>Re-binding the same wallet to multiple accounts is prohibited.</li>
                <li>Keep account credentials confidential; unauthorized access is not the platform's liability.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">2. Platform Usage</h2>
              <ul className="pl-6 mt-2 space-y-2 list-disc">
                <li>Users must comply with applicable laws when using the platform.</li>
                <li>Travel Journeys are randomly allocated and cannot be changed.</li>
                <li>Fraudulent activity, multiple account creation, or system manipulation is strictly prohibited.</li>
                <li>The platform reserves the right to terminate accounts violating these terms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">3. Travel Journeys</h2>
              <ul className="pl-6 mt-2 space-y-2 list-disc">
                <li>All Travel Journeys must be completed before withdrawal.</li>
                <li>Accounts must maintain a balance of at least 50 to accept new Travel Journeys.</li>
                <li>Daily Travel Journeys may include Ultimate Journeys, which must be completed in one day.</li>
                <li>Failure to complete assigned journeys may result in permanent account suspension.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">4. Withdrawals</h2>
              <ul className="pl-6 mt-2 space-y-2 list-disc">
                <li>Withdrawals can only be requested after completing all assigned Travel Journeys.</li>
                <li>Users must verify their KYC before making withdrawals.</li>
                <li>Withdrawal requests are processed within 20 minutes during operating hours.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">5. Liability & Disputes</h2>
              <ul className="pl-6 mt-2 space-y-2 list-disc">
                <li>The platform is not responsible for losses due to unauthorized access or incomplete tasks.</li>
                <li>Users must maintain sufficient funds to complete assigned Travel Journeys.</li>
                <li>The platform may take legal action against fraudulent activity.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">6. Modifications & Termination</h2>
              <ul className="pl-6 mt-2 space-y-2 list-disc">
                <li>These terms may be updated at any time without prior notice.</li>
                <li>Violation of terms may result in account suspension or termination.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">7. Governing Law & Jurisdiction</h2>
              <ul className="pl-6 mt-2 space-y-2 list-disc">
                <li>These terms are governed by the jurisdiction where Intrepid.Expert is registered.</li>
                <li>Any disputes shall be resolved in the courts of that jurisdiction.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
