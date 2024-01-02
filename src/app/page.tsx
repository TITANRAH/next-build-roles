import Image from "next/image";
import { LeftPanel } from '@/components';

export default function Home() {
  return (
    <div className="grid grid-flow-col h-screen">
      <div className="col-span-1">
        <LeftPanel/>
      </div>
      <div className="col-span-4 bg-green-500">
        <span >RightPanel</span>
      </div>
    </div>
  );
}
