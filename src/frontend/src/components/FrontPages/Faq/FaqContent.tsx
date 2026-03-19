"use client";

import { Container } from "react-bootstrap";
import { Accordion } from "react-bootstrap";

const FaqContent = () => {
  // Static data for FAQ items
  const faqData = [
    {
      question: "What is Trezo?",
      answer:
        "Trezo is a comprehensive project management software designed to help teams streamline their workflow, collaborate effectively, and achieve project success.",
    },
    {
      question: "What features does Trezo offer?",
      answer:
        "Trezo offers features such as task management, time tracking, team collaboration tools, analytics, and integrations with other platforms.",
    },
    {
      question: "Is Trezo suitable for small businesses?",
      answer:
        "Yes, Trezo is designed to be flexible and scalable, making it suitable for small businesses and large enterprises alike.",
    },
    {
      question: "Can I customize Trezo to fit my team's specific needs?",
      answer:
        "Absolutely! Trezo allows extensive customization to match your team's specific workflow and requirements.",
    },
    {
      question: "Is Trezo cloud-based or on-premises?",
      answer:
        "Trezo is a cloud-based solution, providing easy access from anywhere with internet connectivity.",
    },
    {
      question: "Does Trezo integrate with other tools?",
      answer:
        "Yes, Trezo integrates seamlessly with popular tools like Slack, Google Workspace, Microsoft Teams, and more.",
    },
  ];

  return (
    <div className="faq-area position-relative z-1 pt-125">
      <Container>
        <div className="section-title mw-630">
          <span className="top-title">
            <span>FAQ’s</span>
          </span>
          <h2>Inspiring Feedback: What Users Love About Trezo Dashboard</h2>
        </div>

        <Accordion defaultActiveKey="0" className="faq-wrapper mw-740 m-auto">
          {faqData.map((item, index) => (
            <Accordion.Item
              eventKey={index.toString()}
              key={index}
              className="mb-3 border-0 bg-white"
            >
              <Accordion.Header>
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  {item.question}
                </div>
              </Accordion.Header>
              <Accordion.Body>{item.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
};

export default FaqContent;
