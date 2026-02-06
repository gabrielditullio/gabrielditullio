const platforms = [
  "GOOGLE ADS",
  "META ADS",
  "INSTAGRAM ADS",
  "FACEBOOK ADS",
  "TIKTOK ADS",
  "YOUTUBE ADS",
  "LINKEDIN ADS",
  "GOOGLE LEADS",
];

const PlatformMarquee = () => {
  return (
    <div className="py-4 bg-primary/5 border-y border-border overflow-hidden">
      <div className="marquee-track flex gap-12 whitespace-nowrap">
        {[...platforms, ...platforms].map((platform, i) => (
          <span
            key={`${platform}-${i}`}
            className="text-sm font-heading font-bold tracking-widest text-muted-foreground/60 uppercase flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            {platform}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PlatformMarquee;
