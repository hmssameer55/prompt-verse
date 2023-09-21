import Feed from '@components/Feed';
import React from 'react';

export default function Home() {
  return (
    <section className="w-full flex-center flex-col mt-4">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Unlock Your Creativity with AI-Powered Writing Prompts!
      </p>

      <Feed />
    </section>
  );
}
