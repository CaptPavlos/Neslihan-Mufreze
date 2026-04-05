interface SectionMarkerProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionMarker({ children, className = "" }: SectionMarkerProps) {
  return (
    <span className={`section-marker ${className}`}>
      {children}
    </span>
  );
}
