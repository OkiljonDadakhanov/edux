import React from "react";
import Hero from "@/components/Home/Hero";
import Courses from "@/components/Home/Courses";
import Mentor from "@/components/Home/Mentor";
import Testimonial from "@/components/Home/Testimonials";
import Newsletter from "@/components/Home/Newsletter";
import Stat from "@/components/Stat/index";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "EduX - Olimpiadalarga tayyorgarlik platformasi",
  description: "O'zbekistondagi eng yaxshi olimpiadalarga tayyorgarlik platformasi. Matematika, Fizika, Kimyo va Biologiya fanlaridan professional darslar.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Stat />
      <Courses />
      
      <Testimonial />
      <Mentor />
      <Newsletter />
    </main>
  );
}