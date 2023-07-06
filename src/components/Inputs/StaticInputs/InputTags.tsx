import React from "react";

type tagsProps = {
  tags: string[];
}

const InputTags = ({ tags }: tagsProps) => {


  return (
    <div className="my-2 flex justify-center text-3xl">
      <div className="w-full">
        <label className="text-xl">Tags</label>
        <div className=" text-gray-900 bg-gray-50 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 mt-2">
          <div className="m-2">
            <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2">
              {tags ? (
                tags.map((tag: string) => {
                  return (
                    <div
                      key={tag}
                      className="p-2 m-2 px-4 rounded-xl bg-slate-800 dark:bg-red-700  text-gray-200 dark:text-slate-200 flex justify-center items-center text-lg"
                    >
                      <div>{tag}</div>
                    </div>
                  );
                })
              ) : (
                <div className="text-xl">Option not here</div>
              )}
              {tags.length <= 0 && <div className="text-lg text-red-400 ms-5 mt-2">No Selected tags</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputTags;
