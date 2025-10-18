export function Darr({ className }: { className?: string }) {
  return (
    <div
      className={`border border-lavender size-[25px] rounded-full flex items-center justify-center ${
        className ? className : ''
      }`}
    >
      &darr;
    </div>
  );
}
