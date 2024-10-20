import { Card, CardContent } from "@/components/ui/card";
import ThreadForm from "./lib/thread-form";

export default function Compose() {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-center text-2xl font-bold font-mono py-2 text-primary">
        Thread Composer
      </h2>
      <Card>
        <CardContent className="pt-6">
          <ThreadForm />
        </CardContent>
      </Card>
    </div>
  );
}
