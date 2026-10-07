export function IronworksAppIcon({ className = "size-9 rounded-[9px]" }: { className?: string }) {
  return (
    <span className={`flex shrink-0 items-center justify-center bg-ink ${className}`}>
      <svg aria-hidden viewBox="8 8 48 48" className="size-[60%] text-on-ink" fill="currentColor">
        <path d="M8 8H56V20H44A6 6 0 0 0 38 26V38A6 6 0 0 0 44 44H56V56H8V44H20A6 6 0 0 0 26 38V26A6 6 0 0 0 20 20H8Z" />
      </svg>
    </span>
  );
}
