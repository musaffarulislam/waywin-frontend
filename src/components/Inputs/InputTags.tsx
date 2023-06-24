import { ThunkDispatch } from "@reduxjs/toolkit";
import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../app/slices/trainerSlice";

type tagsProps = {
  onTagsChange: (tags: string[]) => void;
  error?: string;
}

const InputTags = ({ onTagsChange, error }: tagsProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  
  useEffect(() => {
    onTagsChange(selectedTags);
  }, [selectedTags, onTagsChange]);
  
  useEffect(()=>{
    dispatch(getTags())
  },[dispatch])
  
  const tags: string[] = useSelector((state: any) => state.trainer.tags)
  
  const handleChange = (tag: string) => {
    const tagValue = tag;
    setSelectedTags((prevSelectedTags: string[]) => {
      if (prevSelectedTags.includes(tagValue)) {
        return prevSelectedTags.filter(
          (tag: any) => tag !== tagValue
        );
      } else {
        return [...prevSelectedTags, tagValue];
      }
    });
    onTagsChange(selectedTags)
  };



  return (
    <div className="my-2 flex justify-center text-3xl">
      <div className="w-full md:w-10/12 lg:w-8/12">
        <label className="text-2xl">Tags</label>
        <div className=" text-gray-900 bg-gray-50 rounded-lg dark:bg-slate-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 p-2 mt-2">
          <div className="m-2">
            <label className="text-xl">Selected Tags</label>
            <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2">
              {selectedTags ? (
                selectedTags.map((tag: string) => {
                  return (
                    <div
                      key={tag}
                      className="p-2 m-2 px-4 rounded-xl bg-slate-800 dark:bg-red-700  text-gray-200 dark:text-slate-200 flex justify-center items-center text-lg"
                      onClick={() => handleChange(tag)}
                    >
                      <div>{tag}</div>
                    </div>
                  );
                })
              ) : (
                <div className="text-xl">Option not here</div>
              )}
              {selectedTags.length <= 0 && <div className="text-xl text-red-400 ms-5 mt-2">No Selected tags</div>}
            </div>
          </div>
          <div className="m-2">
            <label className="text-xl">Unselected Tags</label>
            <div  className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 ">
              {tags ? (
                tags.map((tag: string) => {
                  return !selectedTags.includes(tag) && (
                      <div key={tag} className="p-1 m-2 ms-0 px-4 rounded-xl  bg-slate-200 dark:bg-slate-400 text-gray-900 flex justify-center items-center text-lg"
                        onClick={() => handleChange(tag)}>
                          <div>{tag}</div>
                        </div>
                    )
                })
              ) : (
                <div className="text-xl">Loading tags...</div>
              )}
              {selectedTags.length === tags.length && <div className="text-xl text-red-400 ms-5 mt-2">No Unelected tags</div>}
            </div>
          </div>
        </div>
        {error && <p className="text-lg text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default InputTags;
