import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ThreadForm from "@/app/app/lib/thread-form";

export default function Compose() {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-center text-2xl font-bold font-mono py-2 text-primary">
        Thread Composer
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>New Thread</CardTitle>
        </CardHeader>
        <CardContent>
          <ThreadForm />
        </CardContent>
      </Card>
    </div>
  );
}
