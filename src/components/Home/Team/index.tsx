import React from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  imgSrc: string;
  imgPosition?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Tursunboy Jumayev",
    role: "Loyiha kordinatori",
    imgSrc: "/team/tursunboy.JPG",
    imgPosition: "center 20%",
  },
  {
    name: "Dadaxanov Oqiljon",
    role: "Dasturchi",
    imgSrc: "/team/akilhan.jpg",
  },
  {
    name: "Shahnoza Karimova",
    role: "Tahliliy darslar kordinatori",
    imgSrc: "/team/shahnoza.JPG",
    imgPosition: "center top",
  },
  {
    name: "Guljahon Soatova",
    role: "Pedagoglar bilan ishlash bo'yicha mutaxassis",
    imgSrc: "/team/guljahon.JPG",
    imgPosition: "center top",
  },
  {
    name: "Tamanno To'rayeva",
    role: "PR va media",
    imgSrc: "/team/Tamanno.JPG",
    imgPosition: "center 20%",
  },
];

const Team = () => {
  return (
    <section className="bg-white" id="team">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 py-20">
        <h2 className="text-midnight_text text-4xl lg:text-5xl font-semibold mb-4">
          Bizning jamoa
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Loyihani amalga oshirayotgan professional jamoamiz bilan tanishing
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-[180px] h-[180px] mb-5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src={member.imgSrc}
                  alt={member.name}
                  fill
                  className="rounded-full border-4 border-gray-200 group-hover:border-primary transition-all duration-300 group-hover:scale-105 object-cover"
                  style={{ objectPosition: member.imgPosition || "center center" }}
                  sizes="180px"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 max-w-[220px]">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
