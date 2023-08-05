import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTagValue, deleteTag, editTag, getAllTags } from "../../../app/slices/adminSlice";
import useToaster from "../../../hooks/useToast";
import InputText from "../../Inputs/InputText"; 
import Swal from "sweetalert2";
import { FiEdit } from "react-icons/fi";

export const TagsManagmentTable = () => {

  const { register, setValue, watch } = useForm();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const toaster = useToaster();

  const tags: string[] | null = useSelector((state: any) => state.admin.tags);

  const [isModal, setIsModal] = useState<boolean>(false);
  const [isModalAddTag, setIsModalAddTag] = useState<boolean>(false);
  const [isTagError, setIsTagError] = useState<string | undefined>(undefined);
  const [isAddTagError, setIsAddTagError] = useState<string | undefined>(undefined);
  const [isTag, setIsTag] = useState<string>();
  const [isIndex, setIsIndex] = useState<number | undefined>();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const tag = watch("tag");
  const addTag = watch("addTag");

  useEffect(()=>{
    dispatch(getAllTags());
    if(isTag){
      setValue("tag",isTag)
    }
  },[dispatch, isTag, setValue])

  const handleModal = (tag: string, index: number | undefined) =>{
    setIsTag(tag);
    setIsIndex(index);
    setIsModal(!isModal)  
  }

  const handleModalAddTag = () =>{
    setIsModalAddTag(!isModalAddTag)  
  }

  const handleDelete = async (index: number | undefined) => {
    try{
      setIsTagError(undefined)
      if (index !== undefined) {
        await Swal.fire({
          title: 'Are you sure?',
          text: "You delete tag!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, verify it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
              await dispatch(deleteTag(index));
              await dispatch(getAllTags());
              Swal.fire({
                  title: 'deleted!',
                  text: 'Tag deleted.',
                  icon: 'success',
                  timer: 1000, 
                  timerProgressBar: true, 
                  didOpen: () => {
                    Swal.showLoading();
                  },
                  willClose: () => {
                    setIsModal(false)
                  },
              });
          }else{
            setIsModal(false)
          }
        })
        toaster.showToast("Tag change successful", { type: 'success' });
      }
    }catch(error: any){
      toaster.showToast(error.message, { type: 'error' });
    }
  };


  const handleEdit = async (index: number | undefined) => {
    try{
      setIsTagError(undefined)
      if (tag.trim().split(" ").length > 2) {
        setIsTagError("Tag must have a maximum of 2 wordss");
        return;
      }
      if (tag.length > 20){
        setIsTagError("Tag must have a maximum of 20 characters");
        return;
      }
     
      if (tag.length < 5){
        setIsTagError("Tag must have a minimum of 5 characters");
        return;
      }
      setIsModal(false)
      await Swal.fire({
          title: 'Are you sure?',
          text: "You edit tag!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, verify it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
              await dispatch(editTag({index, tag}))
              await dispatch(getAllTags());
              Swal.fire({
                  title: 'Edited!',
                  text: 'Tag edited.',
                  icon: 'success',
                  timer: 1000, 
                  timerProgressBar: true, 
                  didOpen: () => {
                    Swal.showLoading();
                  },
                  willClose: () => {
                    setIsModal(false)
                  },
              });
          }else{
            setIsTagError(undefined)
            setIsModal(true)
          }
      })
    }catch(error : any){
      toaster.showToast(error.message, { type: 'error' });
    }
  }

  const handleAddTag = async () => {
    try{
      setIsAddTagError(undefined)
      if (addTag.trim().split(" ").length > 2) {
        setIsAddTagError("Tag must have a maximum of 2 wordss");
        return;
      }
      if (addTag.length > 20){
        setIsAddTagError("Tag must have a maximum of 20 characters");
        return;
      }
     
      if (addTag.length < 5){
        setIsAddTagError("Tag must have a minimum of 5 characters");
        return;
      }
      setIsModalAddTag(false)
      await Swal.fire({
          title: 'Are you sure?',
          text: "You add tag!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, verify it!'
        }).then(async(result) => {
          if (result.isConfirmed) {
              await dispatch(addTagValue(addTag))
              await dispatch(getAllTags());
              Swal.fire({
                  title: 'Added!',
                  text: 'Tag added.',
                  icon: 'success',
                  timer: 1000, 
                  timerProgressBar: true, 
                  didOpen: () => {
                    Swal.showLoading();
                  },
                  willClose: () => {
                    setIsModalAddTag(false)
                  },
              });
          }else{
            setIsAddTagError(undefined)
            setIsModalAddTag(true)
          }
      })
    }catch(error : any){
      toaster.showToast(error.message, { type: 'error' });
    }
  }



  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between pb-4">
        <div className="relative">
          <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2"
            onClick={()=>handleModalAddTag()}
          >
            Add Trainer
          </button>  
        </div>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 pl-10 text-xl text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>
      <table className="w-full text-xl text-left text-gray-500 dark:text-gray-400">
        <thead className="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tags
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {tags && tags.length > 0 ? (
            tags
              .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
              .map((tag, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-6">{tag}</td>
                    <td className="px-6 py-6">
                          <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={()=>handleModal(tag,index)}
                          >
                            Click Here  
                          </button>  
                    </td>
                    <td className="px-6 py-6">
                      <div
                        className="w-1/5 font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                );
              })
          ) : (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td colSpan={3}>No Tag Available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center py-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 text-xl font-medium text-gray-900 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
        >
          Previous
        </button>
        <div className="mx-5 text-2xl flex items-center">
          {currentPage}
        </div>
        <button
          disabled={!tags || tags.length === 0 || tags.length <= currentPage * rowsPerPage}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className=" px-3 py-1 text-xl font-medium text-gray-900 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
        >
          Next
        </button>
      </div>
      {isModal &&
      <div id="tagModal" tabIndex={-1} className="flex overflow-y-auto overflow-x-hidden fixed  z-50 justify-center items-center w-full inset-0 h-screen bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
              <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                  <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                          Edit Tag
                      </h3>
                      <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="tagModal"
                      onClick={()=>handleModal("", undefined)}>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>
                  <form action="#">
                    <div className="mb-12">
                        <InputText label="Tag" name="tag" type="text" register={register} required error={isTagError} />
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                        <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" 
                        onClick={()=>handleModal("", undefined)}>
                            close
                        </button>
                        <button type="button" className="px-8 text-green-600 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xl py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
                        onClick={()=>handleEdit(isIndex)}>
                            <FiEdit className='me-4'/>
                            Edit
                        </button>
                    </div>
                  </form>
                  {/* <InputText label="Tag" name="tag" type="text" register={register} required error={errors.tag?.message} /> */}
              </div>
          </div>
      </div>
      }
    
      {isModalAddTag &&
      <div id="tagModal" tabIndex={-1} className="flex overflow-y-auto overflow-x-hidden fixed  z-50 justify-center items-center w-full inset-0 h-modal md:h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
              <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                  <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                          Edit Tag
                      </h3>
                      <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="tagModal"
                      onClick={()=>handleModalAddTag()}>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>
                  <form action="#">
                    <div className="mb-12">
                        <InputText label="Add Tag" name="addTag" type="text" register={register} required error={isAddTagError} />
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                        <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" 
                        onClick={()=>handleModalAddTag()}>
                            close
                        </button>
                        <button type="button" className="px-8 text-green-600 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xl py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
                        onClick={()=>handleAddTag()}>
                            <FiEdit className='me-4'/>
                            Add
                        </button>
                    </div>
                  </form>
                  {/* <InputText label="Tag" name="tag" type="text" register={register} required error={errors.tag?.message} /> */}
              </div>
          </div>
      </div>
      }
    </div>
  );
};
