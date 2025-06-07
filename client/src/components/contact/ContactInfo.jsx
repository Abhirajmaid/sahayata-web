import { Phone, Mail, MapPin } from "lucide-react";
import { Icon } from "@iconify/react";
import { contactInfo } from "@/src/data/contactData";

const ContactInfo = () => {
  return (
    <div className="card hover:-translate-y-2 transition-all duration-300">
      <p className="text-brand-primary italic mb-4 capitalize">get in touch</p>
      <h2 className="text-heading text-3xl mb-6">
        We are always ready to help you and answer your questions
      </h2>
      <p className="text-body mb-8">
        Feel free to get in touch with us through any of these channels. We're
        here to help!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="flex items-center text-gray-900 font-semibold mb-3">
            <Phone className="w-5 h-5 mr-2 text-brand-primary" />
            Call Center
          </h3>
          <p className="text-body">800 100 975 20 34</p>
          <p className="text-body">+ (123) 1800-234-5678</p>
        </div>

        <div>
          <h3 className="flex items-center text-gray-900 font-semibold mb-3">
            <MapPin className="w-5 h-5 mr-2 text-brand-primary" />
            Our Location
          </h3>
          <p className="text-body">USA, New York - 1060</p>
          <p className="text-body">Str. First Avenue 1</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <h3 className="flex items-center text-gray-900 font-semibold mb-3">
            <Mail className="w-5 h-5 mr-2 text-brand-primary" />
            Email
          </h3>
          <p className="text-body">contact@sahayata.org</p>
        </div>

        <div>
          <h3 className="text-gray-900 font-semibold mb-3">Social Network</h3>
          <div className="flex space-x-3">
            {contactInfo.social.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-brand-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1"
              >
                <Icon icon={social.icon} className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
