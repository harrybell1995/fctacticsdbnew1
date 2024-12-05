import React from 'react';

export const Advertise = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-16 md:mt-0">
      <h1 className="text-3xl font-bold mb-6">Advertise with Us</h1>
      
      <div className="prose dark:prose-invert">
        <p>
          Reach thousands of football enthusiasts, coaches, and analysts through strategic 
          advertising placements on Football Tactics Library.
        </p>

        <h2>Why Advertise With Us?</h2>
        <ul>
          <li>Access to a highly engaged audience of football professionals and enthusiasts</li>
          <li>Targeted exposure to the football coaching and analysis community</li>
          <li>Multiple advertising formats and placement options</li>
          <li>Competitive pricing and flexible campaign options</li>
        </ul>

        <h2>Advertising Options</h2>
        <ul>
          <li>Display advertisements</li>
          <li>Sponsored content</li>
          <li>Newsletter promotions</li>
          <li>Custom partnership opportunities</li>
        </ul>

        <h2>Our Audience</h2>
        <p>
          Our platform attracts football professionals, coaches, analysts, and enthusiasts 
          from around the world. Our users are highly engaged with football tactics, 
          strategy, and analysis content.
        </p>

        <h2>Contact Us</h2>
        <p>
          For advertising inquiries and rate cards, please contact our advertising team at:{' '}
          <a href="mailto:ads@footballtactics.com" className="text-primary-500">
            ads@footballtactics.com
          </a>
        </p>
      </div>
    </div>
  );
};