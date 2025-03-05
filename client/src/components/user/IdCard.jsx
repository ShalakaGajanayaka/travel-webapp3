
import { ShareIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react';

export default function IdCard() {
    const { user } = useAuth();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (navigator.clipboard) {
            const invitationMessage = `Hey! Join me on Intrepid and get started with amazing features. Use my referral code: ${user.referralNumber} to sign up and enjoy exclusive benefits!`;

            navigator.clipboard.writeText(invitationMessage)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 2000);
                })
                .catch((err) => {
                    console.error('Failed to copy: ', err);
                });
        } else {
            console.error('Clipboard API is not supported in this environment.');
        }
    };


    return (
        <>
            <li
                key={user.email}
                className="flex flex-col col-span-1 text-center bg-[#F9F7F7] divide-y divide-gray-200 rounded-lg shadow-lg"
            >
                <div className="flex flex-col flex-1 p-8">
                    <img
                        alt="User Avatar"
                        src={'https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg'}
                        className="object-cover w-24 h-24 mx-auto rounded-full"
                    />
                    <h3 className="mt-6 text-lg font-medium text-[#112D4E]">{user.name}</h3>
                    <dl className="flex flex-col justify-between mt-1 grow">
                        <dd className="text-sm text-[#3F72AF]">Invite your friends now.</dd>
                        <dd className="text-sm text-[#3F72AF]">Stay connected and earn with us!</dd>
                        <dd className="mt-3">
                            <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-[#3F72AF] bg-[#DBE2EF] rounded-full ring-1 ring-inset ring-[#3F72AF]">
                                {user.referralNumber}
                            </span>
                        </dd>
                    </dl>
                </div>
                <div>
                    <div className="flex -mt-px divide-x divide-gray-200">
                        <div className="flex flex-1 w-0">
                            <a
                                className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-semibold text-[#3F72AF] border border-transparent rounded-bl-lg gap-x-3 hover:bg-[#DBE2EF] focus:outline-none"
                                onClick={handleCopy}
                            >
                                <ShareIcon aria-hidden="true" className="text-[#3F72AF] size-5" />
                                {copied ? 'Copied' : 'Copy and share'}
                            </a>
                        </div>
                    </div>
                </div>
            </li>
        </>

    )
}
