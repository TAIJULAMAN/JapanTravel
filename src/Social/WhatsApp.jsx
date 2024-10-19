import { FaWhatsapp } from "react-icons/fa";

const Whatsapp = () => {
  const whatsappNumber = "+818041364488";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 hover:rotate-12 duration-300 ease-in-out"
    >
      <FaWhatsapp size={32} className="animate-bounce" />
    </a>
  );
};

export default Whatsapp;
