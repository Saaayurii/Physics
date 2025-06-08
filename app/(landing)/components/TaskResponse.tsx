import  Button from "./Button";
import { TaskResponse } from "../../../types/form";
import { downloadFile } from "@/utils/api";

interface TaskResponseComponentProps {
  response: TaskResponse;
}

export const TaskResponseComponent = ({ response }: TaskResponseComponentProps) => {
  return (
    <div className="mt-6 p-4 bg-n-7 border border-n-6 rounded-xl">
      <h5 className="text-lg font-semibold text-n-1 mb-3">Результат решения</h5>
      
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-n-3">Тип задачи:</span>
          <span className="text-n-1 ml-2">{response.task.pattern}</span>
        </div>
        
        <div>
          <span className="text-n-3">Формула:</span>
          <span className="text-n-1 ml-2 font-mono">{response.task.formula}</span>
        </div>
        
        <div>
          <span className="text-n-3">Описание:</span>
          <p className="text-n-1 mt-1">{response.task.description}</p>
        </div>
        
        {response.task.result && (
          <div>
            <span className="text-n-3">Результат:</span>
            <span className="text-n-1 ml-2">{response.task.result} {response.task.unit}</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <Button
          onClick={() => downloadFile(response.library.filename, response.library.content)}
          className="mb-6"
          white
        >
          Скачать JS файл 
        </Button>
      </div>
    </div>
  );
};