const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  // If we haven't reached the birth month yet, or if it's the birth month
  // but the day hasn't passed, subtract a year.
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export const aboutData = {
  name: "Adi Putra",
  age: calculateAge("2003-04-17"),
  location: "Malaysia",
  role: "Front-End Developer/Design Engineer",
  experience: "1+ Years",
  bio: "I handle full-stack workflows, front-end design is where I thrive. Code and design belong together whether that's pixel-perfect web interfaces design and user experience.",
  socials: [
    { name: "GitHub", url: "https://github.com/PaimanUwU", icon: "Github" },
    { name: "LinkedIn", url: "#", icon: "Linkedin" },
    { name: "Email", url: "mailto:your@email.com", icon: "Mail" },
  ],
  techStack: [
    "Astro",
    "TypeScript",
    "React",
    "Laravel",
    "Figma",
    "TailwindCSS",
    "Neovim",
    "MacOS",
    "Arch Linux",
    "Docker",
    "TypeScript",
    "Framer Motion",
    "Rust",
    // "Zsh",
    "Tmux",
    "Git",
    "Node.js",
  ],
  skills: ["React", "TypeScript", "Astro", "TailwindCSS", "Laravel", "PHP"],
  services: ["Front-End Development", "UI/UX Design"],
  stats: [
    { label: "Code and Design Experience", value: "3+ years" },
    { label: "Projects Completed", value: "2" },
  ],
  education: [
    {
      degree: "Bachelor in Computer Science (Honours)",
      institution: "UiTM Shah Alam",
      duration: "3 Years",
      year: "2025 - 2027",
      status: "Degree",
    },
    {
      degree: "Diploma in Computer Science",
      institution: "UiTM Segamat",
      duration: "2.5 Years",
      year: "2020 - 2023",
      status: "Diploma",
    },
  ],
  work: [
    {
      role: "Freelance Developer",
      company: "Self-Employed",
      duration: "3 Months",
      year: "2025",
      description:
        "Developed custom web applications using Laravel and PostgreSQL.",
    },
    {
      role: "Software Engineer Intern",
      company: "MOSTI (Ministry of Science, Technology and Innovation)",
      duration: "6 Months",
      year: "2024 - 2025",
      description:
        "Contributed to internal systems and digital initiative projects.",
    },
  ],
};
