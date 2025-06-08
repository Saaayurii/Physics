import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { 
  GeometryForm, 
  PhysicsForm, 
  ElectricForm, 
  TaskResponse,
  geometrySchema,
  physicsSchema,
  electricSchema 
} from "../types/form";
import { 
  submitGeometryTask, 
  submitPhysicsTask, 
  submitElectricTask 
} from "@/utils/api";

export const useForms = () => {
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
  const [responses, setResponses] = useState<{[key: string]: TaskResponse}>({});

  // Формы для каждого типа задач
  const geometryForm = useForm<GeometryForm>({
    resolver: zodResolver(geometrySchema),
    defaultValues: {
      shape: "",
      parameters: "",
    },
  });

  const physicsForm = useForm<PhysicsForm>({
    resolver: zodResolver(physicsSchema),
    defaultValues: {
      mass: "",
      force: "",
      acceleration: "",
      velocity: "",
      time: "",
      description: "",
    },
  });

  const electricForm = useForm<ElectricForm>({
    resolver: zodResolver(electricSchema),
    defaultValues: {
      voltage: "",
      current: "",
      resistance: "",
      power: "",
      circuitType: "",
      description: "",
    },
  });

  const setLoading = (id: string, loading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [id]: loading }));
  };

  const setResponse = (id: string, response: TaskResponse) => {
    setResponses(prev => ({ ...prev, [id]: response }));
  };

  const onSubmitGeometry = async (data: GeometryForm) => {
    try {
      setLoading("0", true);
      const response = await submitGeometryTask(data);
      setResponse("0", response);
      toast.success("Задача по геометрии решена!");
      geometryForm.reset();
    } catch (error) {
      toast.error("Ошибка при решении задачи");
    } finally {
      setLoading("0", false);
    }
  };

  const onSubmitPhysics = async (data: PhysicsForm) => {
    try {
      setLoading("1", true);
      const response = await submitPhysicsTask(data);
      setResponse("1", response);
      toast.success("Задача по физике решена!");
      physicsForm.reset();
    } catch (error) {
      toast.error("Ошибка при решении задачи");
    } finally {
      setLoading("1", false);
    }
  };

  const onSubmitElectric = async (data: ElectricForm) => {
    try {
      setLoading("2", true);
      const response = await submitElectricTask(data);
      setResponse("2", response);
      toast.success("Задача по электрическим цепям решена!");
      electricForm.reset();
    } catch (error) {
      toast.error("Ошибка при решении задачи");
    } finally {
      setLoading("2", false);
    }
  };

  const getSubmitHandler = (id: string) => {
    switch (id) {
      case "0":
        return geometryForm.handleSubmit(onSubmitGeometry);
      case "1":
        return physicsForm.handleSubmit(onSubmitPhysics);
      case "2":
        return electricForm.handleSubmit(onSubmitElectric);
      default:
        return () => {};
    }
  };

  return {
    geometryForm,
    physicsForm,
    electricForm,
    loadingStates,
    responses,
    getSubmitHandler,
    setLoading,
    setResponse,
  };
};