export const SHARED_IMAGES = {
  hero: "/images/hero.webp",
  newsletter: "/images/newsletter.webp",

  faq: {
    background: "/images/faq-bg.webp",
  },
  contact: {
    image: "/images/contact.webp",
  },
};

export const FAQ = {
  title: { light: "Most asked", bold: "Questions!" },
  defaultOpenId: "services",
  items: [
    {
      id: "services",
      question: "What digital services do you offer?",
      answer:
        "We offer a range of creative and digital services, including branding, graphic design, website development, mobile app development, digital marketing, animation, and social media design.",
    },
    {
      id: "process",
      question: "How does your creative process work?",
      answer:
        "We start with a short discovery call, then move through concept, design, and revisions. You stay in the loop at every stage, and we only finalize once you are happy.",
    },
    {
      id: "brand-identity",
      question: "Can you create a brand identity from scratch?",
      answer:
        "Yes. From logo and color palette to typography and brand guidelines, we build a complete identity that fits your audience and goals.",
    },
    {
      id: "timeline",
      question: "How long does a typical project take?",
      answer:
        "It depends on the scope. A single design can take a few days, while a full brand launch usually takes a few weeks. We share a clear timeline before we start.",
    },
  ],
};

export const CONTACT = {
  title: "Have an idea\nin mind?",
  description:
    "Tell us what you need, and we'll help you figure out the next step.",
  image: { src: SHARED_IMAGES.contact.image, alt: "Abstract pink 3D ribbon" },
  submitLabel: "Send",
  successMessage: "Thank you! We will get back to you soon.",
  fields: [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      autoComplete: "given-name",
    },
    { name: "email", label: "Email", type: "email", autoComplete: "email" },
    { name: "phone", label: "Phone Number", type: "tel", autoComplete: "tel" },
    {
      name: "service",
      label: "Service",
      type: "select",
      options: [
        "Animation",
        "Video Editing",
        "Branding",
        "Ebook Design",
        "Illustration",
        "Social Media",
      ],
    },
    { name: "message", label: "Message", type: "textarea", fullWidth: true },
  ],
};

export const NEWSLETTER = {
  title: ["JOIN OUR NEWSLETTER TO", "STAY UP TO DATE!"],

  form: {
    placeholder: "Enter Your Email",
    buttonText: "Subscribe",
  },
};