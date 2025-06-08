"use client";

import { pricing } from "@/constants";
import Button from "./Button";
import { check } from "@/public/assets";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import axios from "axios";

// Схемы валидации для каждого типа задач
const geometrySchema = z.object({
  shape: z.string().min(1, "Выберите фигуру"),
  parameters: z.string().min(1, "Введите параметры фигуры"),
});

const physicsSchema = z.object({
  mass: z.string().min(1, "Введите массу"),
  force: z.string().optional(),
  acceleration: z.string().optional(),
  velocity: z.string().optional(),
  time: z.string().optional(),
  description: z.string().min(10, "Опишите задачу (минимум 10 символов)"),
});

const electricSchema = z.object({
  voltage: z.string().optional(),
  current: z.string().optional(),
  resistance: z.string().optional(),
  power: z.string().optional(),
  circuitType: z.string().min(1, "Выберите тип цепи"),
  description: z.string().min(10, "Опишите схему цепи (минимум 10 символов)"),
});

type GeometryForm = z.infer<typeof geometrySchema>;
type PhysicsForm = z.infer<typeof physicsSchema>;
type ElectricForm = z.infer<typeof electricSchema>;

// Типы для ответов API
interface TaskResponse {
  success: boolean;
  task: {
    id: string;
    pattern: string;
    formula: string;
    result: number | null;
    unit: string;
    description: string;
    parameters: any;
  };
  library: {
    filename: string;
    content: string;
    functionName: string;
  };
}

const PricingList = () => {
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

  const downloadFile = async (filename: string, content: string) => {
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

  const onSubmitGeometry = async (data: GeometryForm) => {
    try {
      setLoading("0", true);
      const response = await axios.post("/api/geometry", data);
      setResponse("0", response.data);
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
      const response = await axios.post("/api/physics", data);
      setResponse("1", response.data);
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
      const response = await axios.post("/api/electric", data);
      setResponse("2", response.data);
      toast.success("Задача по электрическим цепям решена!");
      electricForm.reset();
    } catch (error) {
      toast.error("Ошибка при решении задачи");
    } finally {
      setLoading("2", false);
    }
  };

  const renderGeometryForm = () => (
    <form onSubmit={geometryForm.handleSubmit(onSubmitGeometry)} className="space-y-4 mt-6">
      <div>
        <select
          {...geometryForm.register("shape")}
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-2 focus:outline-none transition-colors"
        >
          <option value="">Выберите фигуру</option>
          <option value="triangle">Треугольник</option>
          <option value="circle">Круг</option>
          <option value="rectangle">Прямоугольник</option>
          <option value="trapezoid">Трапеция</option>
          <option value="parallelogram">Параллелограмм</option>
        </select>
        {geometryForm.formState.errors.shape && (
          <p className="text-red-500 text-sm mt-1">{geometryForm.formState.errors.shape.message}</p>
        )}
      </div>
      
      <div>
        <textarea
          {...geometryForm.register("parameters")}
          placeholder="Введите параметры (например: сторона a = 5см, сторона b = 3см)"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-2 focus:outline-none transition-colors resize-none h-24"
        />
        {geometryForm.formState.errors.parameters && (
          <p className="text-red-500 text-sm mt-1">{geometryForm.formState.errors.parameters.message}</p>
        )}
      </div>
    </form>
  );

  const renderPhysicsForm = () => (
    <form onSubmit={physicsForm.handleSubmit(onSubmitPhysics)} className="space-y-4 mt-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            {...physicsForm.register("mass")}
            placeholder="Масса (кг)"
            className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <input
            {...physicsForm.register("force")}
            placeholder="Сила (Н)"
            className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            {...physicsForm.register("acceleration")}
            placeholder="Ускорение (м/с²)"
            className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <input
            {...physicsForm.register("velocity")}
            placeholder="Скорость (м/с)"
            className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <input
          {...physicsForm.register("time")}
          placeholder="Время (с)"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors"
        />
      </div>
      
      <div>
        <textarea
          {...physicsForm.register("description")}
          placeholder="Опишите задачу подробно (например: тело массой 2 кг движется с ускорением...)"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors resize-none h-24"
        />
        {physicsForm.formState.errors.description && (
          <p className="text-red-500 text-sm mt-1">{physicsForm.formState.errors.description.message}</p>
        )}
      </div>
    </form>
  );

  const renderElectricForm = () => (
    <form onSubmit={electricForm.handleSubmit(onSubmitElectric)} className="space-y-4 mt-6">
      <div>
        <select
          {...electricForm.register("circuitType")}
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors"
        >
          <option value="">Тип цепи</option>
          <option value="series">Последовательная</option>
          <option value="parallel">Параллельная</option>
          <option value="mixed">Смешанная</option>
        </select>
        {electricForm.formState.errors.circuitType && (
          <p className="text-red-500 text-sm mt-1">{electricForm.formState.errors.circuitType.message}</p>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            {...electricForm.register("voltage")}
            placeholder="Напряжение (В)"
            className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <input
            {...electricForm.register("current")}
            placeholder="Сила тока (А)"
            className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            {...electricForm.register("resistance")}
            placeholder="Сопротивление (Ом)"
            className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <input
            {...electricForm.register("power")}
            placeholder="Мощность (Вт)"
            className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors"
          />
        </div>
      </div>
      
      <div>
        <textarea
          {...electricForm.register("description")}
          placeholder="Опишите схему цепи и что нужно найти"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors resize-none h-24"
        />
        {electricForm.formState.errors.description && (
          <p className="text-red-500 text-sm mt-1">{electricForm.formState.errors.description.message}</p>
        )}
      </div>
    </form>
  );

  const renderResponse = (id: string) => {
    const response = responses[id];
    if (!response) return null;

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

  const renderForm = (id: string) => {
    switch (id) {
      case "0":
        return renderGeometryForm();
      case "1":
        return renderPhysicsForm();
      case "2":
        return renderElectricForm();
      default:
        return null;
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

  return (
    <div className="flex gap-[1rem] max-lg:flex-wrap">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto py-14 my-4 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3"
        >
          <h4 className="h4 mb-4">{item.title}</h4>
          
          <p className="body-2 min-h-[4rem] mb-3 text-n-1/50">
            {item.description}
          </p>
          
          <ul>
            {item.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start py-5 border-t border-n-6"
              >
                <Image src={check} width={24} height={24} alt="Check" />
                <p className="body-2 ml-4">{feature}</p>
              </li>
            ))}
          </ul>

          {/* Форма для ввода данных */}
          {renderForm(item.id)}
          
          <div className="mt-6">
            <Button
              onClick={getSubmitHandler(item.id)}
              className="mb-6"
              white={!!item.price}
              disabled={loadingStates[item.id]}
            >
              {loadingStates[item.id] ? "Обработка..." : "Формировать"}
            </Button>
          </div>

          {/* Отображение результата */}
          {renderResponse(item.id)}
        </div>
      ))}
    </div>
  );
};

export default PricingList;