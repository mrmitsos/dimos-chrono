import { Article } from "../types/article";

export const mockArticles: Article[] = [
  {
    slug: "build-custom-pagination-reactjs",
    title: "Build A Custom Pagination Component In Reactjs From Scratch",
    summary:
      "Learn how to build a custom pagination component in ReactJS from scratch. Follow this step-by-step guide to integrate Pagination component in your ReactJS project.",
    content: `
# Build A Custom Pagination Component In Reactjs From Scratch

Pagination is a crucial feature in modern web applications. In this comprehensive guide, we'll build a fully functional, reusable pagination component from scratch.

## Why Build Custom Pagination?

While there are many libraries available, building your own pagination component gives you:

- **Full control** over styling and behavior
- **Better understanding** of how pagination works
- **Lightweight solution** without extra dependencies
- **Customization** to fit your exact needs

## Getting Started

First, let's set up our project structure...

\`\`\`javascript
import React, { useState } from 'react';

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return (
    <div className="pagination">
      {/* Pagination UI here */}
    </div>
  );
};

export default Pagination;
\`\`\`

## Implementation Details

We'll break this down into manageable steps...

### Step 1: Calculate Total Pages
### Step 2: Handle Page Changes
### Step 3: Add Navigation Buttons
### Step 4: Style the Component

## Conclusion

You now have a fully functional pagination component that you can use in any React project!
    `,
    date: "2024-03-15",
    readTime: "9 min read",
    image: "/images/articles/pagination component in reactjs.jpg",
    isFeatured: true,
    author: {
      name: "Dimos",
      image: "/images/profile/dimos1.jpg",
    },
    tags: ["React", "JavaScript", "Tutorial"],
  },
  {
    slug: "create-loading-screen-reactjs",
    title: "Creating Beautiful Loading Screens in React",
    summary:
      "Discover how to create engaging loading screens that enhance user experience. Learn animation techniques and best practices.",
    content: `
# Creating Beautiful Loading Screens in React

Loading screens are often overlooked, but they're crucial for user experience. Let's create something beautiful!

## Why Loading Screens Matter

A well-designed loading screen can:
- Keep users engaged during wait times
- Communicate that the app is working
- Reflect your brand personality

## Building the Component

We'll use Framer Motion for smooth animations...

\`\`\`javascript
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Loading animation */}
    </motion.div>
  );
};
\`\`\`

## Advanced Techniques

Let's add skeleton screens and progressive loading...

## Conclusion

Great loading screens make your app feel professional and polished!
    `,
    date: "2024-03-10",
    readTime: "7 min read",
    image: "/images/articles/create loading screen in react js.jpg",
    isFeatured: true,
    author: {
      name: "Dimos",
      image: "/images/profile/developer-pic-1.png",
    },
    tags: ["React", "UX", "Animation"],
  },
  {
    slug: "react-portals-modal-component",
    title: "Create Modal Component In React Using React Portals",
    summary:
      "Master React Portals to build accessible, reusable modal components. Learn best practices for modal management.",
    content: `
# Create Modal Component In React Using React Portals

React Portals provide an elegant way to render modals outside the DOM hierarchy. Let's build one!

## Understanding React Portals

Portals let you render children into a DOM node that exists outside the parent component...

## Implementation

Here's how to create a professional modal component...

## Accessibility Considerations

We'll add keyboard navigation, focus trapping, and ARIA attributes...
    `,
    date: "2024-02-28",
    readTime: "8 min read",
    image: "/images/articles/create modal component in react using react portals.png",
    isFeatured: false,
    tags: ["React", "Advanced", "Accessibility"],
  },
  {
    slug: "form-validation-custom-hook",
    title: "Form Validation In Reactjs: Build A Reusable Custom Hook",
    summary:
      "Create a powerful custom hook for form validation. Handle inputs and errors elegantly with this reusable solution.",
    content: `
# Form Validation In Reactjs: Build A Reusable Custom Hook

Form validation doesn't have to be complicated. Let's build a custom hook that makes it simple!

## The Problem with Form Validation

Forms are everywhere, but validation logic often gets messy...

## Building useFormValidation Hook

We'll create a hook that handles all common validation scenarios...

## Usage Examples

See how easy form validation becomes with our custom hook...
    `,
    date: "2024-02-20",
    readTime: "10 min read",
    image: "/images/articles/form validation in reactjs using custom react hook.png",
    isFeatured: false,
    tags: ["React", "Hooks", "Forms"],
  },
  {
    slug: "smooth-scrolling-reactjs",
    title: "Implementing Smooth Scrolling in ReactJS",
    summary:
      "Add smooth, buttery scrolling to your React applications. Learn multiple techniques for the best user experience.",
    content: `
# Implementing Smooth Scrolling in ReactJS

Smooth scrolling can dramatically improve how your site feels. Let's implement it!

## Native CSS Approach

The simplest way using scroll-behavior...

## JavaScript Solutions

For more control, we'll use JavaScript...

## Framer Motion Integration

Combine with animations for amazing effects...
    `,
    date: "2024-02-15",
    readTime: "6 min read",
    image: "/images/articles/smooth scrolling in reactjs.png",
    isFeatured: false,
    tags: ["React", "UX", "CSS"],
  },
];

// Helper functions for filtering
export const getFeaturedArticles = (): Article[] => {
  return mockArticles.filter((article) => article.isFeatured);
};

export const getAllArticles = (): Article[] => {
  return mockArticles;
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return mockArticles.find((article) => article.slug === slug);
};