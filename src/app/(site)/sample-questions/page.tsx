import React from "react";
import SampleQuestions from "@/components/Home/SampleQuestions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Namuna savollari - EduX",
  description: "Olimpiada savollariga o'xshash namuna savollari bilan mashq qiling va bilimingizni sinab ko'ring",
};

export default function SampleQuestionsPage() {
  return (
    <main className="pt-24">
      <SampleQuestions />
    </main>
  );
}

