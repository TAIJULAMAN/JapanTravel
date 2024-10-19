/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";


const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How many days will I spend in Japan?",
      answer: "Spending one week in Japan — 3 days in Tokyo, 3 in Kyoto, and 1 in Osaka — is common for first-time visitors who want to cover the highlights."
    },
    {
      question: "How much is a trip to Japan for 2 weeks?",
      answer: "On average, a foreign tourist spends about 15,000 yen a day, so a 2-week trip should cost about 210,000 yen."
    },
    {
      question: "What are the requirements to travel Japan?",
      answer: "You need a valid passport to enter Japan. If you are from a country without a Visa Waiver arrangement with Japan, you also have to apply for a Japanese tourist visa."
    },
    {
      question: "What season is the best to visit Japan?",
      answer: "In general, the best times to visit Japan are late spring and late autumn, when the scenery is gorgeous and the weather is mild and dry."
    },
    {
      question: "What places will be covered in the trip?",
      answer: "If you are visiting Japan for the first time, doing the Golden Route Tour, i.e., Tokyo-Osaka-Kyoto, is highly recommended, especially for a week-long trip."
    },
    {
      question: "How can I assure that the travel is safe?",
      answer: "Because of its low crime and violence rates, Japan is a very safe country to travel to, even if you are a solo traveler."
    }
  ];


  return (
    <section className="px-[20px] md:px-[100px] py-20  relative">
      <p className="text-center text-xl text-[#202020]" data-aos="fade-up" data-aos-duration="3000">
        Don't miss out on the fun! We will help you answer some questions that make you ponder.
      </p>
      <h2 className="text-center mt-4 mb-8 text-3xl md:text-6xl font-semibold text-[#A04747]" data-aos="fade-up" data-aos-duration="3000">
        FREQUENTLY ASK QUESTIONS
      </h2>
      <div>
        <img src="/rsz_grad2_black.png" className="absolute top-0 left-0  w-full pointer-events-none" />

        <ul className="mt-10 px-[20px]">
          {faqs.map((faq, index) => (
            <li key={index} className="border-b border-[#A04747] last:border-b-0">
              <div
                className="bg-white text-[#A04747] text-xl p-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <FaChevronDown className={`transition-transform duration-500 ${activeIndex === index ? 'rotate-180' : ''}`} />
              </div>
              <div
                className={`bg-gray-30 overflow-hidden transition-all duration-500 ${activeIndex === index ? 'max-h-screen p-4' : 'max-h-0 p-0'}`}
              >
                <p>{faq.answer}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Faq