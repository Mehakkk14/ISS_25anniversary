const Timeline = () => {
  const milestones = [
    {
      year: '1998',
      title: 'First Module Launch',
      description: 'Zarya, the first ISS module, launched from Kazakhstan, marking the beginning of construction.',
    },
    {
      year: '2000',
      title: 'First Crew Arrives',
      description: 'Expedition 1 crew members became the first residents of the ISS, beginning continuous human presence.',
    },
    {
      year: '2011',
      title: 'Assembly Complete',
      description: 'The ISS reached its full configuration after 13 years of complex assembly in orbit.',
    },
    {
      year: '2020',
      title: 'Commercial Crew Era',
      description: 'SpaceX Demo-2 mission marked the beginning of commercial crew transportation to the ISS.',
    },
    {
      year: '2023',
      title: '25 Years of Discovery',
      description: 'Celebrating a quarter-century of groundbreaking research and international cooperation.',
    },
  ];

  return (
    <section id="timeline" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ISS Timeline
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Key milestones in the extraordinary journey of the International Space Station.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative pl-8 pb-12 last:pb-0">
              {/* Vertical Line */}
              {index !== milestones.length - 1 && (
                <div className="absolute left-0 top-8 bottom-0 w-0.5 bg-border"></div>
              )}

              {/* Dot */}
              <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background transform -translate-x-1.5"></div>

              {/* Content */}
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
                <div className="text-primary font-bold text-lg mb-2">{milestone.year}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {milestone.title}
                </h3>
                <p className="text-muted-foreground">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
