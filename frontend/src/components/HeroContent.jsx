// src/components/HeroContent.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroContent() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-white/10 dark:hover:ring-white/20">
          Announcing our next round of funding.{' '}
          <a href="#" className="font-semibold text-indigo-600 dark:text-indigo-400">
            <span aria-hidden="true" className="absolute inset-0"></span>
            Read more <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
      <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">
        Data to enrich your online business
      </h1>
      <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <button
          onClick={() => navigate('/signin')}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
        >
          Get started
        </button>
        <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
          Learn more <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
