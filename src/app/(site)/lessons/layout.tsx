import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tahliliy darslar - EduX",
  description: "Fan olimpiadalariga puxta tayyorgarlik ko'rish maqsadida malakali ekspertlar ishtirokidagi jonli va tahliliy darslar",
};

export default function LessonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

