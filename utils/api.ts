import axios from "axios";
import toast from "react-hot-toast";
import { GeometryForm, PhysicsForm, ElectricForm, TaskResponse } from "../types/form";

export const downloadFile = async (filename: string, content: string) => {
  try {
    const response = await axios.post('/api/download', {
      content,
      filename
    }, {
      responseType: 'blob'
    });

    const blob = new Blob([response.data], { type: 'application/javascript' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success("Файл скачан!");
  } catch (error) {
    toast.error("Ошибка при скачивании файла");
  }
};

export const submitGeometryTask = async (data: GeometryForm): Promise<TaskResponse> => {
  const response = await axios.post("/api/geometry", data);
  return response.data;
};

export const submitPhysicsTask = async (data: PhysicsForm): Promise<TaskResponse> => {
  const response = await axios.post("/api/physics", data);
  return response.data;
};

export const submitElectricTask = async (data: ElectricForm): Promise<TaskResponse> => {
  const response = await axios.post("/api/electric", data);
  return response.data;
};