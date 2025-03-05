import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  { question: "How can I withdraw or reset my account?", answer: "To withdraw or reset your account, you must ensure that all assigned journeys are completed. Once completed, you will be eligible to withdraw or reset your account." },
  { question: "Can I register multiple accounts with the same phone number?", answer: "No, each phone number can only be registered to one account." },
  { question: "Can I bind the same wallet to another platform account?", answer: "No, re-binding the same wallet to another platform account is not allowed. Appropriate action will be taken." },
  { question: "How can I ensure the security of my account and withdrawal passwords?", answer: "It is important to keep your account and withdrawal passwords confidential. The platform will not be liable for any damages caused due to negligence in protecting your passwords." },
  { question: "Can changes or cancellations be made after accepting an assigned journey?", answer: "No. Once an assigned journey has been accepted, changes, cancellations, or abandonment are strictly prohibited." },
  { question: "What are the consequences of inappropriate use of the account?", answer: "Any inappropriate use of the account will result in legal action." },
  { question: "Do I need to verify the deposit address before making a funds transfer?", answer: "Yes, it is advised to verify the deposit address with customer service before making any funds transfer." },
  { question: "Will Intrepid.Expert be responsible for errors in transferring funds to the wrong deposit address?", answer: "No, Intrepid.Expert will not be held responsible for any errors resulting from transferring funds to the wrong deposit address." },
  { question: "What is the time limit to complete an assigned journey deal?", answer: "Assigned journey deals must be completed within one day of acceptance. If unable to complete within one day, inform customer service immediately." },
  { question: "How many Ultimate Journeys can a Daily assign contain?", answer: "Daily assigns may contain 0-3 Ultimate Journeys." },
  { question: "How many posts can an Ultimate Journey contain?", answer: "Each Ultimate Journey may contain 1-3 posts." },
  { question: "What rewards can I expect from upgrading my Membership Level?", answer: "An upgrade on Membership Level will reward an Ultimate Journey." },
  { question: "Can I postpone the completion of an assigned journey?", answer: "Any delay in completion must be approved by the Merchant. The platform will calculate the amount of the delay fee to be paid according to the delay fee given by the Merchant." },
  { question: "What happens if I fail to complete the assigned journey within the given time frame?", answer: "Failure to complete the assigned journey within the given time frame will result in the account being temporarily or permanently frozen, depending on the severity of the violation. The amount in the account cannot be withdrawn during the freeze period." },
  { question: "Can I delete my account anytime?", answer: "Accounts can only be deleted when they are completed and have a balance of $0." },
  { question: "Can the platform modify or update the terms and conditions?", answer: "Yes, the platform reserves the right to modify or update the terms and conditions at any time without prior notice. It is the user's responsibility to review the terms periodically." },
  { question: "What is the minimum age requirement to use the platform?", answer: "Users must be at least 21 years old to use the platform." },
  { question: "Can the platform require additional verification steps?", answer: "Yes, the platform may require additional verification steps, such as identity verification or address verification, before allowing users to use certain features." },
  { question: "What are the responsibilities of users when using the platform?", answer: "Users must comply with all applicable laws and regulations when using the platform." },
  { question: "Can the platform terminate or suspend user accounts?", answer: "Yes, the platform may terminate or suspend user accounts at any time, with or without cause." },
  { question: "Is the platform responsible for any loss or damage related to assigned journey arrangements?", answer: "The platform is not responsible for any loss or damage resulting from the use of the platform or any assigned journey through the platform." },
  { question: "What information should users provide when registering an account?", answer: "Users must provide accurate and up-to-date information when registering an account and using the platform." },
  { question: "How does the platform handle personal information?", answer: "The platform may collect and use personal information in accordance with its privacy policy." },
  { question: "How can I withdraw my funds?", answer: "Before proceeding with withdrawal, please ensure that you have bound your withdrawal address on the platform. To withdraw your funds, go to the 'Withdrawal' section in the menu interface. Click the 'Withdrawal' button, enter the desired amount and your withdrawal password, then proceed with the withdrawal. The withdrawal duration is within 20 minutes and follows the platform's operating hours." },
  { question: "What is the Platform Agent Mode?", answer: "Users of this platform have the opportunity to earn additional dynamic commissions by referring new users. By becoming an agent, you can enjoy a 30% commission from the earnings of your referred users. The system will automatically provide you with this commission advantage." },
  { question: "What are the platform's operating hours?", answer: "The platform operates from 10:00 to 22:00. During this time, users can accept assigned journeys and access the platform's features." }
];

export default function Index() {
  return (
    <div className="px-6 py-12 rounded-lg bg-gray-50 sm:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900">Frequently Asked Questions</h2>
        <p className="mt-2 text-center text-gray-600">Find answers to common questions about our platform.</p>
        
        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <Disclosure key={index} as="div" className="py-4 border-b border-gray-200">
              {({ open }) => (
                <>
                  <dt>
                    <DisclosureButton className="flex items-center justify-between w-full font-medium text-left text-gray-900 hover:text-blue-600">
                      <span className="text-lg">{faq.question}</span>
                      <span className="flex items-center ml-4">
                        {open ? (
                          <MinusSmallIcon className="w-6 h-6 text-blue-500" aria-hidden="true" />
                        ) : (
                          <PlusSmallIcon className="w-6 h-6 text-gray-500" aria-hidden="true" />
                        )}
                      </span>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel as="dd" className="mt-2 text-base text-gray-700">
                    {faq.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  )
}