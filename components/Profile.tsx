'use client';

import React, { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

export default function Profile(props) {
  const { name, desc, data, handleEdit, handleDelete } = props;

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.length > 0 ? (
          data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 font-semibold text-xl">
            No prompts yet
          </p>
        )}
      </div>
    </section>
  );
}
