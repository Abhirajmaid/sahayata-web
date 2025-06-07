import { CTA } from "@/src/components";
import {
  About,
  Companies,
  Coordinator,
  EventsGallery,
  Hero,
  InfiniteImageSlider,
  Team,
} from "@/src/components/Home";

export default function Home() {
  return (
    <div className="mt-[100px]">
      <Hero />
      <Team />
      <Companies />
      <div className="max-w-[1400px] m-auto mb-[150px] mt-[200px]">
        <About />
        <Coordinator />
        <EventsGallery />
      </div>
      <InfiniteImageSlider />
      <CTA />
    </div>
  );
}
