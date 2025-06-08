import { UseFormReturn } from "react-hook-form";
import { GeometryForm, PhysicsForm, ElectricForm } from "../../../types/form";

interface GeometryFormProps {
  form: UseFormReturn<GeometryForm>;
  onSubmit: (data: GeometryForm) => void;
}

interface PhysicsFormProps {
  form: UseFormReturn<PhysicsForm>;
  onSubmit: (data: PhysicsForm) => void;
}

interface ElectricFormProps {
  form: UseFormReturn<ElectricForm>;
  onSubmit: (data: ElectricForm) => void;
}

export const GeometryFormComponent = ({ form, onSubmit }: GeometryFormProps) => (
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
    <div>
      <select
        {...form.register("shape")}
        className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-2 focus:outline-none transition-colors"
      >
        <option value="">Выберите фигуру</option>
        <option value="triangle">Треугольник</option>
        <option value="circle">Круг</option>
        <option value="rectangle">Прямоугольник</option>
        <option value="trapezoid">Трапеция</option>
        <option value="parallelogram">Параллелограмм</option>
      </select>
      {form.formState.errors.shape && (
        <p className="text-red-500 text-sm mt-1">{form.formState.errors.shape.message}</p>
      )}
    </div>
    
    <div>
      <textarea
        {...form.register("parameters")}
        placeholder="Введите параметры (например: сторона a = 5см, сторона b = 3см)"
        className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-2 focus:outline-none transition-colors resize-none h-24"
      />
      {form.formState.errors.parameters && (
        <p className="text-red-500 text-sm mt-1">{form.formState.errors.parameters.message}</p>
      )}
    </div>
  </form>
);

export const PhysicsFormComponent = ({ form, onSubmit }: PhysicsFormProps) => (
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <input
          {...form.register("mass")}
          placeholder="Масса (кг)"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors"
        />
      </div>
      <div>
        <input
          {...form.register("force")}
          placeholder="Сила (Н)"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors"
        />
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div>
        <input
          {...form.register("acceleration")}
          placeholder="Ускорение (м/с²)"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors"
        />
      </div>
      <div>
        <input
          {...form.register("velocity")}
          placeholder="Скорость (м/с)"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors"
        />
      </div>
    </div>

    <div>
      <input
        {...form.register("time")}
        placeholder="Время (с)"
        className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors"
      />
    </div>
    
    <div>
      <textarea
        {...form.register("description")}
        placeholder="Опишите задачу подробно (например: тело массой 2 кг движется с ускорением...)"
        className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors resize-none h-24"
      />
      {form.formState.errors.description && (
        <p className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</p>
      )}
    </div>
  </form>
);

export const ElectricFormComponent = ({ form, onSubmit }: ElectricFormProps) => (
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
    <div>
      <select
        {...form.register("circuitType")}
        className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors"
      >
        <option value="">Тип цепи</option>
        <option value="series">Последовательная</option>
        <option value="parallel">Параллельная</option>
        <option value="mixed">Смешанная</option>
      </select>
      {form.formState.errors.circuitType && (
        <p className="text-red-500 text-sm mt-1">{form.formState.errors.circuitType.message}</p>
      )}
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div>
        <input
          {...form.register("voltage")}
          placeholder="Напряжение (В)"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors"
        />
      </div>
      <div>
        <input
          {...form.register("current")}
          placeholder="Сила тока (А)"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors"
        />
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div>
        <input
          {...form.register("resistance")}
          placeholder="Сопротивление (Ом)"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors"
        />
      </div>
      <div>
        <input
          {...form.register("power")}
          placeholder="Мощность (Вт)"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors"
        />
      </div>
    </div>
    
    <div>
      <textarea
        {...form.register("description")}
        placeholder="Опишите схему цепи и что нужно найти"
        className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors resize-none h-24"
      />
      {form.formState.errors.description && (
        <p className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</p>
      )}
    </div>
  </form>
);