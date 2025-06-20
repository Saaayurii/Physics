import { UseFormReturn } from "react-hook-form";

// Типы
export interface BaseForm {
  description?: string;
}

export interface GeometryForm extends BaseForm {
  shape: string;
  parameters?: string;
  triangleParams?: {
    hasArea?: boolean;
    area?: number;
    hasHeight?: boolean;
    height?: number;
    hasBase?: boolean;
    base?: number;
    hasPerimeter?: boolean;
    perimeter?: number;
    findArea?: boolean;
    findHeight?: boolean;
    findBase?: boolean;
    findPerimeter?: boolean;
  };
}

export interface PhysicsForm extends BaseForm {
  mass?: number;
  force?: number;
  acceleration?: number;
  velocity?: number;
  time?: number;
  hasMass?: boolean;
  hasForce?: boolean;
  hasAcceleration?: boolean;
  hasVelocity?: boolean;
  hasTime?: boolean;
  findMass?: boolean;
  findForce?: boolean;
  findAcceleration?: boolean;
  findVelocity?: boolean;
  findTime?: boolean;
}

export interface ElectricForm extends BaseForm {
  circuitType?: string;
  voltage?: number;
  current?: number;
  resistance?: number;
  power?: number;
  hasVoltage?: boolean;
  hasCurrent?: boolean;
  hasResistance?: boolean;
  hasPower?: boolean;
  findVoltage?: boolean;
  findCurrent?: boolean;
  findResistance?: boolean;
  findPower?: boolean;
}

// Пропсы
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

// Компоненты
export const GeometryFormComponent = ({ form, onSubmit }: GeometryFormProps) => {
  const selectedShape = form.watch("shape");

  return (
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
      </div>

      {selectedShape === "triangle" && (
        <div className="space-y-4 p-4 border border-n-6 rounded-xl">
          <h3 className="font-medium">Параметры треугольника</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input type="checkbox" {...form.register("triangleParams.hasArea")} className="mr-2" />
              <label>Площадь (S)</label>
              {form.watch("triangleParams.hasArea") && (
                <input
                  {...form.register("triangleParams.area")}
                  placeholder="Значение"
                  className="ml-2 px-2 py-1 bg-n-7 border border-n-6 rounded"
                />
              )}
            </div>
            <div className="flex items-center">
              <input type="checkbox" {...form.register("triangleParams.hasHeight")} className="mr-2" />
              <label>Высота (h)</label>
              {form.watch("triangleParams.hasHeight") && (
                <input
                  {...form.register("triangleParams.height")}
                  placeholder="Значение"
                  className="ml-2 px-2 py-1 bg-n-7 border border-n-6 rounded"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input type="checkbox" {...form.register("triangleParams.hasBase")} className="mr-2" />
              <label>Основание (a)</label>
              {form.watch("triangleParams.hasBase") && (
                <input
                  {...form.register("triangleParams.base")}
                  placeholder="Значение"
                  className="ml-2 px-2 py-1 bg-n-7 border border-n-6 rounded"
                />
              )}
            </div>
            <div className="flex items-center">
              <input type="checkbox" {...form.register("triangleParams.hasPerimeter")} className="mr-2" />
              <label>Периметр (P)</label>
              {form.watch("triangleParams.hasPerimeter") && (
                <input
                  {...form.register("triangleParams.perimeter")}
                  placeholder="Значение"
                  className="ml-2 px-2 py-1 bg-n-7 border border-n-6 rounded"
                />
              )}
            </div>
          </div>

          <div className="pt-4">
            <h4 className="font-medium mb-2">Что нужно найти:</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" {...form.register("triangleParams.findArea")} className="mr-2" />
                <label>Площадь (S)</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" {...form.register("triangleParams.findHeight")} className="mr-2" />
                <label>Высоту (h)</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" {...form.register("triangleParams.findBase")} className="mr-2" />
                <label>Основание (a)</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" {...form.register("triangleParams.findPerimeter")} className="mr-2" />
                <label>Периметр (P)</label>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <textarea
          {...form.register("parameters")}
          placeholder="Или введите параметры вручную"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-2 focus:outline-none transition-colors resize-none h-24"
        />
      </div>

      
    </form>
  );
};

export const PhysicsFormComponent = ({ form, onSubmit }: PhysicsFormProps) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <input type="checkbox" {...form.register("hasMass")} className="mr-2" />
          <label>Масса (кг)</label>
          {form.watch("hasMass") && (
            <input
              {...form.register("mass")}
              placeholder="Значение"
              className="ml-2 px-2 py-1 bg-n-7 border border-n-6 rounded"
            />
          )}
        </div>
        <div className="flex items-center">
          <input type="checkbox" {...form.register("hasForce")} className="mr-2" />
          <label>Сила (Н)</label>
          {form.watch("hasForce") && (
            <input
              {...form.register("force")}
              placeholder="Значение"
              className="ml-2 px-2 py-1 bg-n-7 border border-n-6 rounded"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <input type="checkbox" {...form.register("hasAcceleration")} className="mr-2" />
          <label>Ускорение (м/с²)</label>
          {form.watch("hasAcceleration") && (
            <input
              {...form.register("acceleration")}
              placeholder="Значение"
              className="ml-2 px-2 py-1 bg-n-7 border border-n-6 rounded"
            />
          )}
        </div>
        <div className="flex items-center">
          <input type="checkbox" {...form.register("hasVelocity")} className="mr-2" />
          <label>Скорость (м/с)</label>
          {form.watch("hasVelocity") && (
            <input
              {...form.register("velocity")}
              placeholder="Значение"
              className="ml-2 px-2 py-1 bg-n-7 border border-n-6 rounded"
            />
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input type="checkbox" {...form.register("hasTime")} className="mr-2" />
        <label>Время (с)</label>
        {form.watch("hasTime") && (
          <input
            {...form.register("time")}
            placeholder="Значение"
            className="ml-2 px-2 py-1 bg-n-7 border border-n-6 rounded"
          />
        )}
      </div>

      <div className="pt-4">
        <h4 className="font-medium mb-2">Что нужно найти:</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" {...form.register("findMass")} className="mr-2" />
            <label>Массу</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" {...form.register("findForce")} className="mr-2" />
            <label>Силу</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" {...form.register("findAcceleration")} className="mr-2" />
            <label>Ускорение</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" {...form.register("findVelocity")} className="mr-2" />
            <label>Скорость</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" {...form.register("findTime")} className="mr-2" />
            <label>Время</label>
          </div>
        </div>
      </div>

      <div>
        <textarea
          {...form.register("description")}
          placeholder="Опишите задачу подробно"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors resize-none h-24"
        />
      </div>

    
    </form>
  );
};

export const ElectricFormComponent = ({ form, onSubmit }: ElectricFormProps) => {
  return (
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <input type="checkbox" {...form.register("hasVoltage")} className="mr-2" />
          <label>Напряжение (В)</label>
          {form.watch("hasVoltage") && (
            <input
              {...form.register("voltage")}
              placeholder="Значение"
              className="ml-2 px-2 py-1 bg-n-7 border border-n-6 rounded"
            />
          )}
        </div>
        <div className="flex items-center">
          <input type="checkbox" {...form.register("hasCurrent")} className="mr-2" />
          <label>Ток (А)</label>
          {form.watch("hasCurrent") && (
            <input
              {...form.register("current")}
              placeholder="Значение"
              className="ml-2 px-2 py-1 bg-n-7 border border-n-6 rounded"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <input type="checkbox" {...form.register("hasResistance")} className="mr-2" />
          <label>Сопротивление (Ом)</label>
          {form.watch("hasResistance") && (
            <input
              {...form.register("resistance")}
              placeholder="Значение"
              className="ml-2 px-2 py-1 bg-n-7 border border-n-6 rounded"
            />
          )}
        </div>
        <div className="flex items-center">
          <input type="checkbox" {...form.register("hasPower")} className="mr-2" />
          <label>Мощность (Вт)</label>
          {form.watch("hasPower") && (
            <input
              {...form.register("power")}
              placeholder="Значение"
              className="ml-2 px-2 py-1 bg-n-7 border border-n-6 rounded"
            />
          )}
        </div>
      </div>

      <div className="pt-4">
        <h4 className="font-medium mb-2">Что нужно найти:</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" {...form.register("findVoltage")} className="mr-2" />
            <label>Напряжение</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" {...form.register("findCurrent")} className="mr-2" />
            <label>Ток</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" {...form.register("findResistance")} className="mr-2" />
            <label>Сопротивление</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" {...form.register("findPower")} className="mr-2" />
            <label>Мощность</label>
          </div>
        </div>
      </div>

      <div>
        <textarea
          {...form.register("description")}
          placeholder="Опишите схему цепи"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors resize-none h-24"
        />
      </div>

      
    </form>
  );
};