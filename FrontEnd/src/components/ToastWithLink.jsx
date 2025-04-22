// components/ToastWithLink.jsx
import { Info } from "lucide-react";

export default function ToastWithLink({ msg, path }) {
  return (
    <div className=" flex items-center space-x-2 bg-white text-sm rounded px-2 py-3 shadow-xl border border-gray-200">
      <Info className="h-4"/>
      <span>{msg}</span>
      <a href={path} className="text-red-500  bg-white">
        Se connecter
      </a>
    </div>
  );
}
