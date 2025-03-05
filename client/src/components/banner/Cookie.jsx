
export default function Cookie() {
    return (
        <div className="fixed inset-x-0 bottom-0 px-6 pb-6 pointer-events-none">
            <div className="max-w-xl p-6 bg-white shadow-lg pointer-events-auto rounded-xl ring-1 ring-gray-900/10">
                <p className="text-gray-900 text-sm/6">
                    This website uses cookies to supplement a balanced diet and provide a much deserved reward to the senses after
                    consuming bland but nutritious meals. Accepting our cookies is optional but recommended, as they are
                    delicious. See our{' '}
                    <a href="#" className="font-semibold text-indigo-600">
                        cookie policy
                    </a>
                    .
                </p>
                <div className="flex items-center mt-4 gap-x-5">
                    <button
                        type="button"
                        className="px-3 py-2 text-sm font-semibold text-white bg-gray-900 rounded-md shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                    >
                        Accept all
                    </button>
                    <button type="button" className="font-semibold text-gray-900 text-sm/6">
                        Reject all
                    </button>
                </div>
            </div>
        </div>
    )
}

