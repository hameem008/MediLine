
import { LucideProps } from "lucide-react";

export const TestTube = ({ size = 24, ...props }: LucideProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 2.2V2a.19.19 0 0 0-.08-.14.17.17 0 0 0-.09 0h-3a.17.17 0 0 0-.18.18v.16h3.35zm0 0V7M6 11h9" />
      <path d="M6.8 7H5.2a2 2 0 0 0-1.8 2v.5L7 22h10l3.5-12.5V9a2 2 0 0 0-1.8-2h-1.7" />
      <path d="M17 2.2V2a.19.19 0 0 1 .08-.14.17.17 0 0 1 .09 0h3a.17.17 0 0 1 .18.18v.16h-3.35zm0 0V7" />
    </svg>
  );
};

export default TestTube;
