import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  const [messageFromServer, setMessageFromServer] = useState("");
  // Fetch users on component mount
  useEffect(() => {
    fetchHello();
  }, []);

  const fetchHello = async () => {
    try {
      const response = await fetch("/api/demo");
      const data = (await response.json()) as DemoResponse;
      setMessageFromServer(data.message);
    } catch (error) {
      console.error("Error fetching hello:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Restaurant Dashboard App
          </h1>
          <p className="text-slate-600 max-w-md mx-auto">
            A modern restaurant management dashboard built with React,
            TypeScript, and TailwindCSS
          </p>
          <p className="mt-4 text-slate-600 max-w-md">{messageFromServer}</p>
        </div>

        <div className="space-y-4">
          <Link to="/dashboard">
            <Button
              size="lg"
              className="bg-dashboard-yellow hover:bg-dashboard-yellow/90 text-white font-semibold px-8 py-3 rounded-lg"
            >
              View Dashboard
            </Button>
          </Link>
          <p className="text-sm text-slate-500">
            Navigate to the restaurant dashboard to manage orders and view
            analytics
          </p>
        </div>
      </div>
    </div>
  );
}
