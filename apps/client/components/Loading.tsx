import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin mb-2" />
      <span className="text-sm">Loading...</span>
    </div>
  );
};

export default Loading;
