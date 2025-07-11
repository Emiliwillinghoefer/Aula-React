export const ProgressRing = (props: { progress: number }) => {
  return (
    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
      {/* Background circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="hsl(240 5% 26%)"
        strokeWidth="2"
        fill="transparent"
        className="opacity-20"
      />
      {/* Progress circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="hsl(263 70% 50%)"
        strokeWidth="3"
        fill="transparent"
        strokeDasharray={`${props.progress * 2.827} 282.7`}
        className={`transition-all duration-1000`}
        strokeLinecap="round"
      />
    </svg>
  );
};
