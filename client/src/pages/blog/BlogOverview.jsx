'use client'

import { StarIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom';
import blogData from '../../data/blog';

const product = {
  rating: 3.9,
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function BlogOverview() {
  const { id } = useParams();
  const destination = blogData.find((item) => item.id === parseInt(id));

  return (
    <>
      <div className="px-6 py-6 border-b border-[#3F72AF] bg-[#112D4E] shadow-lg sm:flex sm:items-center sm:justify-between sm:px-8 lg:px-10 rounded-t-lg">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold text-[#F9F7F7] sm:truncate">{destination.name}</h1>
        </div>
      </div>
      <div className="px-6 mt-8 sm:px-8 lg:px-10 bg-[#DBE2EF] min-h-screen rounded-lg shadow-md">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5 bg-[#F9F7F7] p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center border-b pb-4 border-[#3F72AF]">
                <h1 className="text-2xl font-semibold text-[#112D4E]">{destination.name}</h1>
                <p className="text-lg font-medium text-[#3F72AF]">{destination.country}</p>
              </div>
              <div className="flex items-center mt-4">
                <p className="text-sm text-[#3F72AF]">{product.rating}<span className="sr-only"> out of 5 stars</span></p>
                <div className="flex items-center ml-2">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                        'w-5 h-5'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 lg:col-span-7 lg:mt-0">
              <div className="rounded-lg overflow-hidden shadow-lg border border-[#3F72AF]">
                <img
                  alt={destination.name}
                  src={destination.image}
                  className="object-cover w-full h-96"
                />
              </div>
            </div>
          </div>
          <div className="mt-10 bg-[#F9F7F7] p-6 rounded-lg shadow-md border border-[#3F72AF]">
            <h2 className="text-lg font-medium text-[#112D4E] border-b pb-2 border-[#3F72AF]">Description</h2>
            <div
              dangerouslySetInnerHTML={{ __html: destination.description }}
              className="mt-4 text-sm text-gray-700"
            />
          </div>
          <div className="mt-8 bg-[#F9F7F7] p-6 rounded-lg shadow-md border border-[#3F72AF]">
            <h2 className="text-lg font-medium text-[#112D4E] border-b pb-2 border-[#3F72AF]">Top Attractions</h2>
            <ul className="pl-5 mt-4 space-y-1 text-sm text-gray-700 list-disc">
              {destination.top_attractions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center mt-8">
            <a
              href={`https://www.google.com/maps/search/?q=${destination.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-[#3F72AF] rounded-md shadow-md hover:bg-[#112D4E] transition duration-300"
            >
              Explore on Google Maps
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
