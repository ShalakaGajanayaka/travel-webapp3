import { ArrowDownTrayIcon, ArrowUpTrayIcon, WalletIcon, UserIcon, ShieldExclamationIcon, QuestionMarkCircleIcon, DocumentTextIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const stats = [
  { id: 1, name: 'Deposit', icon: ArrowDownTrayIcon, nav: '/deposit' },
  { id: 2, name: 'Withdrawal', icon: ArrowUpTrayIcon, nav: '/withdrawal' },
  { id: 3, name: 'Link Wallet', icon: WalletIcon, nav: '/linkWallet' },
  { id: 4, name: 'Employee ID', icon: IdentificationIcon, nav: '/empId' },
  { id: 5, name: 'Support', icon: UserIcon, nav: '/support' },
  { id: 6, name: 'About us', icon: ShieldExclamationIcon, nav: '/about' },
  { id: 7, name: 'FAQs', icon: QuestionMarkCircleIcon, nav: '/faq' },
  { id: 8, name: 'T&C', icon: DocumentTextIcon, nav: '/tc' },
];

export default function Buttons() {
  const navigate = useNavigate();

  return (
<div>
      <dl className="grid grid-cols-2 gap-6 mb-6 sm:grid-cols-4">
        {stats.map((item) => (
          <div
            onClick={() => navigate(item.nav)}
            key={item.id}
            className="flex flex-col items-center justify-center p-6 transition bg-[#F9F7F7] rounded-xl shadow-lg cursor-pointer hover:bg-[#DBE2EF] hover:shadow-xl border border-[#3F72AF]"
          >
            <div className="p-4 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] rounded-full shadow-inner">
              <item.icon aria-hidden="true" className="text-white w-7 h-7" />
            </div>
            <p className="mt-3 text-base font-semibold text-[#112D4E]">{item.name}</p>
          </div>
        ))}
      </dl>
    </div>
  );
}