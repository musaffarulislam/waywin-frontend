import React, { useEffect, useState } from 'react'
import InputServices from '../Inputs/StaticInputs/InputServices';
import InputTextarea from '../Inputs/StaticInputs/InputTextarea';
import InputTags from '../Inputs/StaticInputs/InputTags';
import InputMode from '../Inputs/StaticInputs/InputMode';
import Swal from 'sweetalert2'
import { MdVerified } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { trainerVerify } from '../../app/slices/adminSlice';
import { AiFillCloseCircle } from 'react-icons/ai';

type optionProps = {
    onModal: ((option: boolean) => void);
    trainer: any;
  };

export const FormModalTrainer = ({onModal, trainer}: optionProps) => {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [isVerify, setIsVerify] = useState<boolean>(trainer.isVerified)

    useEffect(() => {
      // console.log('isVerify useEffect:', isVerify);
    }, [isVerify]);

    const handleVerify = async () => {
        onModal(false)
        await Swal.fire({
            title: 'Are you sure?',
            text: "You verified in this trainer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, verify it!'
          }).then((result) => {
            if (result.isConfirmed) {
                setIsVerify(true);
                dispatch(trainerVerify(trainer._id))
                Swal.fire({
                    title: 'Verified!',
                    text: 'trainer verified.',
                    icon: 'success',
                    timer: 1000, 
                    timerProgressBar: true, 
                    didOpen: () => {
                      Swal.showLoading();
                    },
                    willClose: () => {
                      onModal(false)
                    },
                });
            }else{
                onModal(true)
            }
        })
        
    }

    const handleUnVerify = async () => {
        onModal(false)
        console.log("2isVerify 1: ",isVerify)
        await Swal.fire({
            title: 'Are you sure?',
            text: "You Unverified in this trainer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, unverify it!'
          }).then((result) => {
            if (result.isConfirmed) {
                setIsVerify(false);
                dispatch(trainerVerify(trainer._id))
                Swal.fire({
                    title: 'Unverified!',
                    text: 'trainer Unverified.',
                    icon: 'success',
                    timer: 1000, 
                    timerProgressBar: true, 
                    didOpen: () => {
                      Swal.showLoading();
                    },
                    willClose: () => {
                      onModal(false)
                    },
                });
            }else{
                onModal(true)
            }
        })
        
    }

  return (
    <form action="#">
        <div className="mb-12">
            <InputServices services={trainer?.profile?.services} />
            <InputTextarea label="Description" name="description" description={trainer?.profile?.description}/>
            <InputTags tags={trainer?.profile?.tags} /> 
            <div className='mt-2'>
                <label htmlFor="experience" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Experience</label>
                <input type="number" value={trainer?.profile?.experience} name="experience" id="experience" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 cursor-not-allowed" placeholder="0" disabled  /
                >
            </div>
            <InputMode mode={trainer?.profile?.mode} />
        </div>
        <div className="flex items-center justify-center space-x-4">
            <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={()=>onModal(false)}>
                close
            </button>
            {!isVerify ?
            <button type="button" className="px-8 text-green-600 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xl py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
            onClick={handleVerify}>
                <MdVerified className='me-4'/>
                Verify
            </button>
            :
            <button type="button" className="px-8 text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xl py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={handleUnVerify}>
                <AiFillCloseCircle className='me-4'/>
                Unverify
            </button>
            }
        </div>
    </form>
  )
}
