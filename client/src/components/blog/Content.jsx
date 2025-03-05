import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blogData from '../../data/blog';
import Loading from '../../components/loadingscreen/Loading';

export default function BlogContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#112D4E]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mt-5 bg-[#F9F7F7] py-10 px-6 rounded-xl shadow-lg border border-[#3F72AF]">
      <div className="max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-[#112D4E]">Trending Destinations</h2>
        </div>

        <div className="grid grid-cols-2 mt-6 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {blogData.map((product) => (
            <div key={product.id} className="relative group p-4 bg-[#DBE2EF] rounded-lg shadow-md hover:shadow-xl transition">
              <div className="w-full h-56 overflow-hidden bg-gray-200 rounded-md group-hover:opacity-80 lg:h-72 xl:h-80">
                <img alt={product.name} src={product.image} className="object-cover w-full h-full rounded-md" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#3F72AF] hover:text-[#112D4E] transition">
                <Link to={`/blog-overview/${product.id}`}>
                  {product.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-[#112D4E] font-medium">{product.currency}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
