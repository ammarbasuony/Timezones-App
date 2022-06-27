import React from "react";

// Icons
import { spinnerIcon } from "../helpers/icons";

const Loading = () => {
  return (
    <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 m-auto">
      <div class="w-full h-full text-center">
        <div class="flex h-full flex-col justify-between">
          {spinnerIcon()}
          <p class="text-slate-500 dark:text-gray-200 text-base font-medium mt-4">
            Loading Data ...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
