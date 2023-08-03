import { TrainerManagmentTable } from './TrainerManagmentTable'

export const MainContent = () => {
  return (
    <div className="p-4 sm:ml-96 pt-16">
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
      <TrainerManagmentTable />
    </div>
  </div>
  )
}
