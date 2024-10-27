import ThreadForm from "@/app/app/lib/thread-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Compose({ params }: { params: { id: string } }) {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-center text-2xl font-bold font-mono py-2 text-primary">
        Thread Composer
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>Edit Thread</CardTitle>
        </CardHeader>
        <CardContent>
          <ThreadForm selectedThreadId={params.id} />
        </CardContent>
      </Card>
    </div>
  );
}