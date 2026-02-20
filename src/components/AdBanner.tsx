interface AdBannerProps {
  slot?: string;
  format?: 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
}

export default function AdBanner({ slot = "XXXXXXXXXX", format = "horizontal", className = "" }: AdBannerProps) {
  const dimensions = {
    horizontal: "min-h-[90px]",
    rectangle: "min-h-[250px]",
    vertical: "min-h-[600px]",
  };

  return (
    <div className={`w-full flex items-center justify-center bg-muted/50 border border-border rounded-lg ${dimensions[format]} ${className}`}>
      {/* 
        Replace with your actual AdSense code:
        <ins className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true" />
      */}
      <span className="text-xs text-muted-foreground">Advertisement</span>
    </div>
  );
}
