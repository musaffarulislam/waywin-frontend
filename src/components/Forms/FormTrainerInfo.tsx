import { useSelector } from "react-redux";
import InputServices from "../Inputs/StaticInputs/InputServices"; 
import InputTextareaUser from "../Inputs/StaticInputs/InputTextareaUser";
import InputModeUser from "../Inputs/StaticInputs/InputModeUser";
import InputTagsUser from "../Inputs/StaticInputs/InputTagsUser";




const FormTrainerInfo = () => {
  
  const trainerInfo = useSelector((state: any)=> state.user.trainerInfo)
  const services: string[] = trainerInfo?.profile?.services || [];  

  if (services.length === 0) { 
    return <p>No services available.</p>;  
  }

  return ( 
    <form className="rounded flex flex-col justify-center w-3/4 md:w-full"> 
      <div className="w-full text-2xl flex items-center justify-center">
        <div className="w-full md:w-10/12 lg:w-8/12 ">
          <InputTextareaUser label="Description" name="description" description={trainerInfo?.profile?.description}/>
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-12">
            <InputServices services={services} />
            <InputModeUser mode={trainerInfo?.profile?.mode} />
          </div>
          <div className="mt-8">
            <InputTagsUser tags={trainerInfo?.profile?.tags} /> 
          </div>
        </div>
      </div>
    </form> 
  );
};

export default FormTrainerInfo;
