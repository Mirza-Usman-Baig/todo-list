"use client";
import Todos from "@/components/addTask";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
      
        
        <h1 className="text-center text-2xl font-extrabold mb-9" >Todo List App</h1>
        <div className="mb-40">
        <Todos />
        </div>
        
      
    </div>
  );
}
