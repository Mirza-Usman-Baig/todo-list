"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function Todos() {
  interface Task {
    text1: string;
    id: number;
  }

  const [todos, setTodos] = useState<Task[]>([]);
  const [tasks, setTasks] = useState("");
  const [editedTaskText, setEditedTaskText] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const addTask = () => {
    if (tasks.trim() !== "") {
      setTodos([...todos, { text1: tasks, id: Date.now() }]);
      setTasks("");
    }
  };

  const startEditingTask = (id: number, text: string) => {
    setEditingTaskId(id);
    setEditedTaskText(text);
  };

  const editingTask = (): void => {
    if (editedTaskText.trim() !== "") {
      setTodos((prevTodos) =>
        prevTodos.map((task) =>
          task.id === editingTaskId ? { ...task, text1: editedTaskText } : task
        )
      );
      setEditingTaskId(null);
      setEditedTaskText("");
    }
  };

  const deleteTask = (id: number): void => {
    setTodos((prevTodos) => prevTodos.filter((task) => task.id !== id));
  };

  return (
    <div className="mx-auto">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div id="dialogbutton" className="flex justify-center mb-4">
          <Dialog>
            <DialogTrigger className="py-[6px] rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 px-28">
              <div className="flex justify-center items-center font-medium ">
                Add your todo
              </div>
            </DialogTrigger>
            <DialogContent className="rounded-md">
              <DialogHeader>
                <DialogTitle className="text-left -mt-1">
                  Enter your task
                </DialogTitle>
                <DialogDescription>
                  <input
                    value={tasks}
                    onChange={(e) => setTasks(e.target.value)}
                    className="mt-2 flex-1 px-3 py-2 rounded-md border w-full"
                    placeholder="Add your task"
                  />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end">
                <DialogClose asChild>
                  <Button className="ml-[85%] w-[15%]" onClick={addTask}>
                    Add
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {todos.map((task) => (
          <div
            className="flex items-center justify-between bg-gray-50 border rounded-md px-4 py-2 my-2"
            key={task.id}
          >
            <div className="flex items-center">
              <span className="flex-1 text-gray-800">{task.text1}</span>
            </div>
            <div className="flex items-center">
              <Dialog>
                <DialogTrigger className="bg-primary hover:bg-primary/90 text-white font-medium py-[3px] mr-2 w-auto rounded-md">
                  <div
                    onClick={() => startEditingTask(task.id, task.text1)}
                    className=" font-medium py-1 px-2 rounded-md mx -1 cursor-pointer"
                  >
                    Edit
                  </div>
                </DialogTrigger>
                <DialogContent className="rounded-md">
                  <DialogHeader>
                    <DialogTitle className="text-left -mt-1 mb-3">
                      Edit your task
                    </DialogTitle>
                    <DialogDescription>
                      {editingTaskId === task.id ? (
                        <input
                          type="text"
                          value={editedTaskText}
                          onChange={(e) => setEditedTaskText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              editingTask();
                            }
                          }}
                          className="flex-1 px-3 py-2 rounded-md border w-full "
                        />
                      ) : (
                        <span className="flex-1 text-gray-800">
                          {task.text1}
                        </span>
                      )}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex justify-end">
                    <DialogClose asChild>
                      <Button
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            editingTask();
                          }
                        }}
                        className="ml-[85%] w-[15%]"
                        onClick={editingTask}
                      >
                        Save
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-md"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
