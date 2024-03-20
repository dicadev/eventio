import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
}

const AboutPage = () => {
  return (
    <div>
      <h2>About</h2>
      <p>This is the about page</p>
    </div>
  )
}

export default AboutPage