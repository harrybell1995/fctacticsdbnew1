import React from 'react';

export const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-16 md:mt-0">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
      
      <div className="prose dark:prose-invert">
        <p>
          This Cookie Policy explains how Football Tactics Library uses cookies and similar 
          technologies to recognize you when you visit our website.
        </p>

        <h2>What are cookies?</h2>
        <p>
          Cookies are small data files that are placed on your computer or mobile device when 
          you visit a website. Cookies are widely used by website owners in order to make 
          their websites work, or to work more efficiently, as well as to provide reporting 
          information.
        </p>

        <h2>How do we use cookies?</h2>
        <p>We use cookies for the following purposes:</p>
        <ul>
          <li>To enable certain functions of the website</li>
          <li>To provide analytics</li>
          <li>To store your preferences</li>
          <li>To enable advertisement delivery, including behavioral advertising</li>
        </ul>

        <h2>Types of cookies we use</h2>
        <h3>Essential cookies</h3>
        <p>
          These cookies are necessary for the website to function and cannot be switched off 
          in our systems.
        </p>

        <h3>Analytics cookies</h3>
        <p>
          These cookies allow us to count visits and traffic sources so we can measure and 
          improve the performance of our site.
        </p>

        <h3>Advertising cookies</h3>
        <p>
          These cookies may be set through our site by our advertising partners to build a 
          profile of your interests and show you relevant adverts on other sites.
        </p>

        <h2>How to control cookies</h2>
        <p>
          You can set your browser to refuse all cookies or to indicate when a cookie is 
          being sent. However, some website features or services may not function properly 
          without cookies.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about our use of cookies, please contact us at:{' '}
          <a href="mailto:privacy@footballtactics.com" className="text-primary-500">
            privacy@footballtactics.com
          </a>
        </p>
      </div>
    </div>
  );
};