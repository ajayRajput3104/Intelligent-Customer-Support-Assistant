import { ArrowLeft } from "lucide-react";
// import Link from 'next/link'; // Removed to resolve compilation issue
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-muted/50">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">About Our AI Assistant</CardTitle>
          <CardDescription>
            Intelligent, Instant, and Here to Help
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p>
            This application is an advanced AI-powered customer support
            assistant designed to understand your questions and provide quick,
            accurate, and helpful responses.
          </p>
          <p>
            It analyzes the category and sentiment of your query to deliver the
            most relevant information, whether you have a technical issue, a
            billing question, or just a general inquiry.
          </p>
          {/* Using a standard anchor tag to ensure navigation works */}
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chat
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
