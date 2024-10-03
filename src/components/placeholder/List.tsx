import React from "react";

const ListPlaceholder: React.FC = () => {
  // Create an array of 6 items to map over for the skeleton structure
  const skeletons = Array.from({ length: 6 });

  return (
    <section className="p-5 flex justify-center items-center relative">
      <div className="max-w-screen-2xl w-full flex flex-col">
        <div className="relative flex gap-5 w-full p-3 overflow-x-hidden">
          <div className="flex gap-5 w-max">
            {skeletons.map((_, index) => (
              <div key={index} className="w-56 gap-3 flex flex-col">
                <div className="w-full h-80 bg-gray-600 animate-pulse rounded-md" />
                <p className="w-2/3 h-5 bg-slate-500 animate-pulse rounded-md"></p>
                <p className="w-1/3 h-5 bg-slate-500 animate-pulse rounded-md"></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListPlaceholder;
