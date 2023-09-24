interface Author {
    _id: string;
    name: string;
    image: string;
    email: string;
  }

  interface Post {
    author: Author;
    _id: string;
    prompt: string;
    tag: string;
  }

  interface PromptCardProps {
    post: Post
    handleEdit?: () => void
    handleDelete?: () => void
    handleTagClick?: (tag: string) => void
    handleProfileClick?: (authorId: string) => void
  }
  
  interface ProfileProps {  
    name: string;
    desc: string;
    data: Post[];
    handleEdit?: (post: any) => void;
    handleDelete?: (post: any) => void;
  }

  interface MobileNavProps {
    session: any;
    providers: any;
    toggleDropdown: boolean;
    setToggleDropdown: (toggleDropdown: boolean) => void;
  }
  
  interface FormProps {
    type: string;
    post: {
      prompt: string;
      tag: string;
    };
    setPost: (post: { prompt: string; tag: string }) => void;
    submitting: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  }


  export type { Author, Post, PromptCardProps, ProfileProps, MobileNavProps, FormProps }