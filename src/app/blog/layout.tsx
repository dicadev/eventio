import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
}

const BlogPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h1>Blog</h1>
      <p>Welcome to the blog</p>
      {children}
    </>
  )
}

export default BlogPage