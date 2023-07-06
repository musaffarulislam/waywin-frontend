import React from "react";

type tagsProps = {
  tags: string[];
}

const InputTagsUser = ({ tags }: tagsProps) => {


  return (
    <div className="my-2 flex justify-center text-3xl">
      <div className="w-full">
        <div className=" text-gray-900 bg-transparent rounded-lg dark:text-white p-2 mt-2">
          <div className="m-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {tags ? (
                tags.map((tag: string) => {
                  return (
                    <div
                      key={tag}
                      className="p-3 m-2 px-4 rounded-xl bg-slate-800  text-gray-200 dark:text-slate-200 flex justify-center items-center text-lg sm:text-xl"
                    >
                      <div>{tag}</div>
                    </div>
                  );
                })
              ) : (
                <div className="text-xl">Option not here</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputTagsUser;
