import Layout from '../../components/Layout'

export default function Contact() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <p className="mb-4">
        If you have any questions or feedback, please don't hesitate to reach out to us:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Phone: 03495474869</li>
        <li>Email: mk6783336@gmail.com</li>
      </ul>
      {/* Add a contact form here */}
    </Layout>
  )
}

