import { useRouter } from "next/navigation";

const donationOptions = [
  {
    title: "Thursday Food Drive",
    description: "Support our weekly food distribution program",
    type: "food_drive",
    link: "/donate/thursday",
    image: "/images/donation_drive.png",
  },
  {
    title: "General Donation",
    description: "Support all our initiatives and programs",
    type: "general",
    link: "/donate/general",
    image: "/images/donation_general.png",
  },
];

const DonationOptions = () => {
  const router = useRouter();

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {donationOptions.map((option) => (
            <div
              key={option.type}
              className="card h-[500px] grid-cols-1 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => router.push(option.link)}
            >
              <img
                src={option.image}
                alt={option.title}
                className="w-full h-[80%] object-cover object-top rounded-t-xl"
              />
              <div className="p-6">
                <h3 className="card-title">{option.title}</h3>
                <p className="card-description">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationOptions;
