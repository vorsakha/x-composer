import { ExpandableCard } from "@/app/app/threads/lib/expandable-card";

export default function Threads() {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-center text-2xl font-bold font-mono py-2 text-primary">
        All Threads
      </h2>
      <ExpandableCard />
    </div>
  );
}
