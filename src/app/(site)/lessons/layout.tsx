import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tahliliy darslar - EduX",
  description:
    "Malakali ekspertlar ishtirokidagi tahliliy va amaliy video darslar",
};

export default function LessonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

