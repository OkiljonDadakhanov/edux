import React from "react";
import Hero from "@/components/Home/Hero";
import Courses from "@/components/Home/Courses";
import Mentor from "@/components/Home/Mentor";
import Team from "@/components/Home/Team";
// import Testimonial from "@/components/Home/Testimonials";
import Newsletter from "@/components/Home/Newsletter";
import Stat from "@/components/Stat/index";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "EduX — Onlayn ta'lim va video darslar",
  description:
    "Matematika, fizika, kimyo va biologiya bo'yicha tahliliy video darslar, podkastlar va namuna savollar — barchasi bir joyda.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Stat />
      <Courses />
      
      {/* <Testimonial /> */}
      <Team />
      <Mentor />
      <Newsletter />
    </main>
  );
}