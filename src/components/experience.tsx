
const experienceLog = [
    {
        date: "2023-09-01",
        event: "Joined XYZ Corp as Software Engineer Intern",
        details: "Developed backend services and contributed to a major microservices migration project."
    },
    {
        date: "2023-05-15",
        event: "Graduated from University of Technology",
        details: "Bachelor of Science in Computer Science, specialized in AI and Machine Learning."
    },
    {
        date: "2022-06-01",
        event: "Started role as a Freelance Web Developer",
        details: "Built and maintained web applications for various clients using modern web technologies."
    },
     {
        date: "2021-08-20",
        event: "Won 1st Place at National Hackathon 'CodeBreak'",
        details: "Led a team to build a cybersecurity tool that identifies network vulnerabilities in real-time."
    }
]

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <h2 className="text-3xl font-bold mb-8 text-primary">
        <span className="text-foreground/80">~/</span>experience.log $
      </h2>
      <div className="relative border-l-2 border-primary/30 pl-8 space-y-12">
        {experienceLog.map((entry, index) => (
             <div key={index} className="relative">
                 <div className="absolute -left-10 h-4 w-4 bg-primary rounded-full border-4 border-background" />
                 <p className="text-sm text-primary/80 mb-1 font-semibold">{`[${entry.date}]`}</p>
                 <h3 className="text-xl font-bold text-foreground">{entry.event}</h3>
                 <p className="text-muted-foreground mt-1">{entry.details}</p>
             </div>
        ))}
      </div>
    </section>
  );
}
