import { ArrowPathIcon, CalendarIcon, TruckIcon } from '@heroicons/react/24/outline';

const perks = [
  { name: '10-year all-inclusive warranty', description: 'We’ll replace it with a new one', icon: CalendarIcon },
  { name: 'Free shipping on returns', description: 'Send it back for free', icon: ArrowPathIcon },
  { name: 'Free, contactless delivery', description: 'The shipping is on us', icon: TruckIcon },
];

export default function Incentives() {
  return (
    <div className="bg-[#F9F7F7] py-8 px-6 rounded-xl shadow-lg border border-[#3F72AF]">
      <h2 className="text-lg font-semibold text-[#112D4E] text-center mb-6">Our Perks</h2>
      <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl sm:grid-cols-3 lg:flex lg:justify-center">
        {perks.map((perk, perkIdx) => (
          <div key={perkIdx} className="flex items-center bg-[#DBE2EF] p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="p-3 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] rounded-full shadow-inner">
              <perk.icon aria-hidden="true" className="w-8 h-8 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-[#112D4E]">{perk.name}</h3>
              <p className="text-sm text-[#3F72AF]">{perk.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}