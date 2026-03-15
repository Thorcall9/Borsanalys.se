"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SubscriptionSuccess() {
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (searchParams.get('prenumeration') === 'klar') {
      setShowModal(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    const newPath = window.location.pathname;
    window.history.replaceState(null, '', newPath);
    setShowModal(false);
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-md w-full text-center p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-serif mb-4">Tack för ditt intresse!</h2>
        <div className="text-muted text-sm sm:text-base text-left space-y-3">
          <p>Hej!</p>
          <p>Tack för ditt intresse för Börsanalys. Det gläder mig att du vill ta del av de insikter jag delar med mig av.</p>
          <p>Min ambition är att leverera analyser som ger mervärde i din investeringsresa. Håll utkik i inkorgen – nästa analys är redan under arbete.</p>
          <p>
            Med vänlig hälsning,
            <br />
            <strong>Carl Fredrik</strong>
            <br />
            <a href="https://borsanalys.se" className="text-primary hover:underline">borsanalys.se</a>
          </p>
        </div>
        <button
          onClick={handleClose}
          className="mt-6 px-6 py-2 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition-colors w-full sm:w-auto"
        >
          Stäng
        </button>
      </div>
    </div>
  );
}
