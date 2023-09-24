import React from 'react';
import PromptCard from './PromptCard';
import { ProfileProps,Post } from '@interface/types';

export default function Profile(props: ProfileProps) {
  const { name, desc, data, handleEdit, handleDelete } = props;

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.length > 0 ? (
          data.map((post : Post) => (
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
