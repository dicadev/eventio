const BlogPostPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <p>Blog post: {params.slug}</p>
    </div>
  )
}

export default BlogPostPage