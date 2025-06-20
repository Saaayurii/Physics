import { UseFormReturn } from "react-hook-form";
import { useState } from "react";

// Обновленные интерфейсы типов форм
interface GeometryForm {
  shape: string;
  inputParameters: string[];
  outputParameters: string[];
  parameterValues: { [key: string]: number };
}

interface PhysicsForm {
  inputParameters: string[];
  outputParameters: string[];
  parameterValues: { [key: string]: number };
  description: string;
}

interface ElectricForm {
  circuitType: string;
  inputParameters: string[];
  outputParameters: string[];
  parameterValues: { [key: string]: number };
  description: string;
}

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

// Конфигурация параметров для геометрии
const SHAPE_PARAMETERS = {
  triangle: {
    available: ['area', 'perimeter', 'base', 'height'],
    labels: {
      area: 'Площадь (S)',
      perimeter: 'Периметр (P)', 
      base: 'Основание (a)',
      height: 'Высота (h)'
    }
  },
  circle: {
    available: ['area', 'perimeter', 'radius'],
    labels: {
      area: 'Площадь (S)',
      perimeter: 'Периметр (P)',
      radius: 'Радиус (r)'
    }
  },
  rectangle: {
    available: ['area', 'perimeter', 'length', 'width'],
    labels: {
      area: 'Площадь (S)',
      perimeter: 'Периметр (P)',
      length: 'Длина (a)',
      width: 'Ширина (b)'
    }
  },
  trapezoid: {
    available: ['area', 'perimeter', 'base1', 'base2', 'height'],
    labels: {
      area: 'Площадь (S)',
      perimeter: 'Периметр (P)',
      base1: 'Основание 1 (a)',
      base2: 'Основание 2 (b)', 
      height: 'Высота (h)'
    }
  },
  parallelogram: {
    available: ['area', 'perimeter', 'base', 'height', 'side'],
    labels: {
      area: 'Площадь (S)',
      perimeter: 'Периметр (P)',
      base: 'Основание (a)',
      height: 'Высота (h)',
      side: 'Сторона (b)'
    }
  }
};

// Конфигурация параметров для физики
const PHYSICS_PARAMETERS = {
  available: ['mass', 'force', 'acceleration', 'velocity', 'time', 'distance', 'work', 'power', 'energy'],
  labels: {
    mass: 'Масса (m)',
    force: 'Сила (F)',
    acceleration: 'Ускорение (a)',
    velocity: 'Скорость (v)',
    time: 'Время (t)',
    distance: 'Расстояние (s)',
    work: 'Работа (A)',
    power: 'Мощность (P)',
    energy: 'Энергия (E)'
  }
};

// Конфигурация параметров для электричества
const ELECTRIC_PARAMETERS = {
  available: ['voltage', 'current', 'resistance', 'power', 'energy', 'time', 'charge'],
  labels: {
    voltage: 'Напряжение (U)',
    current: 'Сила тока (I)',
    resistance: 'Сопротивление (R)',
    power: 'Мощность (P)',
    energy: 'Энергия (W)',
    time: 'Время (t)',
    charge: 'Заряд (Q)'
  }
};

export const GeometryFormComponent = ({ form, onSubmit }: GeometryFormProps) => {
  const [selectedShape, setSelectedShape] = useState<string>('');
  const [inputParams, setInputParams] = useState<string[]>([]);
  const [outputParams, setOutputParams] = useState<string[]>([]);

  const handleShapeChange = (shape: string) => {
    setSelectedShape(shape);
    setInputParams([]);
    setOutputParams([]);
    form.setValue('shape', shape);
    form.setValue('inputParameters', []);
    form.setValue('outputParameters', []);
  };

  const handleParameterToggle = (param: string, isInput: boolean) => {
    if (isInput) {
      const newInputs = inputParams.includes(param) 
        ? inputParams.filter(p => p !== param)
        : [...inputParams, param];
      setInputParams(newInputs);
      form.setValue('inputParameters', newInputs);
      
      if (newInputs.includes(param)) {
        const newOutputs = outputParams.filter(p => p !== param);
        setOutputParams(newOutputs);
        form.setValue('outputParameters', newOutputs);
      }
    } else {
      const newOutputs = outputParams.includes(param)
        ? outputParams.filter(p => p !== param)
        : [...outputParams, param];
      setOutputParams(newOutputs);
      form.setValue('outputParameters', newOutputs);
      
      if (newOutputs.includes(param)) {
        const newInputs = inputParams.filter(p => p !== param);
        setInputParams(newInputs);
        form.setValue('inputParameters', newInputs);
      }
    }
  };

  const availableParams = selectedShape ? SHAPE_PARAMETERS[selectedShape as keyof typeof SHAPE_PARAMETERS] : null;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
      <div>
        <label className="block text-n-1 text-sm font-medium mb-2">Выберите фигуру</label>
        <select
          {...form.register("shape")}
          onChange={(e) => handleShapeChange(e.target.value)}
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

      {availableParams && (
        <div className="bg-n-8 rounded-xl p-6 border border-n-6">
          <h3 className="text-n-1 text-lg font-semibold mb-4">Настройка параметров задачи</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-n-2 font-medium mb-3 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Входные параметры
              </h4>
              <div className="space-y-2">
                {availableParams.available.map(param => (
                  <label key={`input-${param}`} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={inputParams.includes(param)}
                      onChange={() => handleParameterToggle(param, true)}
                      className="mr-3 rounded border-n-6 bg-n-7 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-n-2">{availableParams.labels[param as keyof typeof availableParams.labels]}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-n-2 font-medium mb-3 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Выходные параметры
              </h4>
              <div className="space-y-2">
                {availableParams.available.map(param => (
                  <label key={`output-${param}`} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={outputParams.includes(param)}
                      onChange={() => handleParameterToggle(param, false)}
                      className="mr-3 rounded border-n-6 bg-n-7 text-green-500 focus:ring-green-500"
                    />
                    <span className="text-n-2">{availableParams.labels[param as keyof typeof availableParams.labels]}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {inputParams.length > 0 && (
            <div className="mt-6">
              <h4 className="text-n-2 font-medium mb-3">Введите значения (для демонстрации)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inputParams.map(param => (
                  <div key={param}>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder={`${availableParams.labels[param as keyof typeof availableParams.labels]} (необязательно)`}
                      onChange={(e) => {
                        const currentValues = form.getValues('parameterValues') || {};
                        form.setValue('parameterValues', {
                          ...currentValues,
                          [param]: parseFloat(e.target.value) || 0
                        });
                      }}
                      className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-2 focus:outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {inputParams.length > 0 && outputParams.length > 0 && (
            <div className="mt-6 p-4 bg-n-7 rounded-lg border border-n-6">
              <h4 className="text-n-1 font-medium mb-2">Предпросмотр задачи:</h4>
              <p className="text-n-2 text-sm">
                <span className="text-blue-400">Дано:</span> {inputParams.map(p => availableParams.labels[p as keyof typeof availableParams.labels]).join(', ')}
              </p>
              <p className="text-n-2 text-sm">
                <span className="text-green-400">Найти:</span> {outputParams.map(p => availableParams.labels[p as keyof typeof availableParams.labels]).join(', ')}
              </p>
            </div>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={!selectedShape || inputParams.length === 0 || outputParams.length === 0}
        className="w-full py-3 px-6 bg-gradient-to-r from-color-2 to-color-1 text-n-1 font-medium rounded-xl transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Синтезировать решение
      </button>
    </form>
  );
};

export const PhysicsFormComponent = ({ form, onSubmit }: PhysicsFormProps) => {
  const [inputParams, setInputParams] = useState<string[]>([]);
  const [outputParams, setOutputParams] = useState<string[]>([]);

  const handleParameterToggle = (param: string, isInput: boolean) => {
    if (isInput) {
      const newInputs = inputParams.includes(param) 
        ? inputParams.filter(p => p !== param)
        : [...inputParams, param];
      setInputParams(newInputs);
      form.setValue('inputParameters', newInputs);
      
      if (newInputs.includes(param)) {
        const newOutputs = outputParams.filter(p => p !== param);
        setOutputParams(newOutputs);
        form.setValue('outputParameters', newOutputs);
      }
    } else {
      const newOutputs = outputParams.includes(param)
        ? outputParams.filter(p => p !== param)
        : [...outputParams, param];
      setOutputParams(newOutputs);
      form.setValue('outputParameters', newOutputs);
      
      if (newOutputs.includes(param)) {
        const newInputs = inputParams.filter(p => p !== param);
        setInputParams(newInputs);
        form.setValue('inputParameters', newInputs);
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
      <div className="bg-n-8 rounded-xl p-6 border border-n-6">
        <h3 className="text-n-1 text-lg font-semibold mb-4">Настройка параметров задачи</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-n-2 font-medium mb-3 flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Входные параметры
            </h4>
            <div className="space-y-2">
              {PHYSICS_PARAMETERS.available.map(param => (
                <label key={`input-${param}`} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={inputParams.includes(param)}
                    onChange={() => handleParameterToggle(param, true)}
                    className="mr-3 rounded border-n-6 bg-n-7 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-n-2">{PHYSICS_PARAMETERS.labels[param as keyof typeof PHYSICS_PARAMETERS.labels]}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-n-2 font-medium mb-3 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Выходные параметры
            </h4>
            <div className="space-y-2">
              {PHYSICS_PARAMETERS.available.map(param => (
                <label key={`output-${param}`} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={outputParams.includes(param)}
                    onChange={() => handleParameterToggle(param, false)}
                    className="mr-3 rounded border-n-6 bg-n-7 text-green-500 focus:ring-green-500"
                  />
                  <span className="text-n-2">{PHYSICS_PARAMETERS.labels[param as keyof typeof PHYSICS_PARAMETERS.labels]}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {inputParams.length > 0 && (
          <div className="mt-6">
            <h4 className="text-n-2 font-medium mb-3">Введите значения (для демонстрации)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inputParams.map(param => (
                <div key={param}>
                  <input
                    type="number"
                    step="0.01"
                    placeholder={`${PHYSICS_PARAMETERS.labels[param as keyof typeof PHYSICS_PARAMETERS.labels]} (необязательно)`}
                    onChange={(e) => {
                      const currentValues = form.getValues('parameterValues') || {};
                      form.setValue('parameterValues', {
                        ...currentValues,
                        [param]: parseFloat(e.target.value) || 0
                      });
                    }}
                    className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {inputParams.length > 0 && outputParams.length > 0 && (
          <div className="mt-6 p-4 bg-n-7 rounded-lg border border-n-6">
            <h4 className="text-n-1 font-medium mb-2">Предпросмотр задачи:</h4>
            <p className="text-n-2 text-sm">
              <span className="text-blue-400">Дано:</span> {inputParams.map(p => PHYSICS_PARAMETERS.labels[p as keyof typeof PHYSICS_PARAMETERS.labels]).join(', ')}
            </p>
            <p className="text-n-2 text-sm">
              <span className="text-green-400">Найти:</span> {outputParams.map(p => PHYSICS_PARAMETERS.labels[p as keyof typeof PHYSICS_PARAMETERS.labels]).join(', ')}
            </p>
          </div>
        )}
      </div>
      
      <div>
        <textarea
          {...form.register("description")}
          placeholder="Опишите физическую задачу подробно (необязательно)"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-1 focus:outline-none transition-colors resize-none h-24"
        />
        {form.formState.errors.description && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={inputParams.length === 0 || outputParams.length === 0}
        className="w-full py-3 px-6 bg-gradient-to-r from-color-1 to-color-2 text-n-1 font-medium rounded-xl transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Синтезировать решение
      </button>
    </form>
  );
};

export const ElectricFormComponent = ({ form, onSubmit }: ElectricFormProps) => {
  const [selectedCircuitType, setSelectedCircuitType] = useState<string>('');
  const [inputParams, setInputParams] = useState<string[]>([]);
  const [outputParams, setOutputParams] = useState<string[]>([]);

  const handleCircuitChange = (circuitType: string) => {
    setSelectedCircuitType(circuitType);
    form.setValue('circuitType', circuitType);
  };

  const handleParameterToggle = (param: string, isInput: boolean) => {
    if (isInput) {
      const newInputs = inputParams.includes(param) 
        ? inputParams.filter(p => p !== param)
        : [...inputParams, param];
      setInputParams(newInputs);
      form.setValue('inputParameters', newInputs);
      
      if (newInputs.includes(param)) {
        const newOutputs = outputParams.filter(p => p !== param);
        setOutputParams(newOutputs);
        form.setValue('outputParameters', newOutputs);
      }
    } else {
      const newOutputs = outputParams.includes(param)
        ? outputParams.filter(p => p !== param)
        : [...outputParams, param];
      setOutputParams(newOutputs);
      form.setValue('outputParameters', newOutputs);
      
      if (newOutputs.includes(param)) {
        const newInputs = inputParams.filter(p => p !== param);
        setInputParams(newInputs);
        form.setValue('inputParameters', newInputs);
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
      <div>
        <label className="block text-n-1 text-sm font-medium mb-2">Тип цепи</label>
        <select
          {...form.register("circuitType")}
          onChange={(e) => handleCircuitChange(e.target.value)}
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors"
        >
          <option value="">Выберите тип цепи</option>
          <option value="series">Последовательная</option>
          <option value="parallel">Параллельная</option>
          <option value="mixed">Смешанная</option>
        </select>
        {form.formState.errors.circuitType && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.circuitType.message}</p>
        )}
      </div>

      <div className="bg-n-8 rounded-xl p-6 border border-n-6">
        <h3 className="text-n-1 text-lg font-semibold mb-4">Настройка параметров задачи</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-n-2 font-medium mb-3 flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Входные параметры
            </h4>
            <div className="space-y-2">
              {ELECTRIC_PARAMETERS.available.map(param => (
                <label key={`input-${param}`} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={inputParams.includes(param)}
                    onChange={() => handleParameterToggle(param, true)}
                    className="mr-3 rounded border-n-6 bg-n-7 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-n-2">{ELECTRIC_PARAMETERS.labels[param as keyof typeof ELECTRIC_PARAMETERS.labels]}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-n-2 font-medium mb-3 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Выходные параметры
            </h4>
            <div className="space-y-2">
              {ELECTRIC_PARAMETERS.available.map(param => (
                <label key={`output-${param}`} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={outputParams.includes(param)}
                    onChange={() => handleParameterToggle(param, false)}
                    className="mr-3 rounded border-n-6 bg-n-7 text-green-500 focus:ring-green-500"
                  />
                  <span className="text-n-2">{ELECTRIC_PARAMETERS.labels[param as keyof typeof ELECTRIC_PARAMETERS.labels]}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {inputParams.length > 0 && (
          <div className="mt-6">
            <h4 className="text-n-2 font-medium mb-3">Введите значения (для демонстрации)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inputParams.map(param => (
                <div key={param}>
                  <input
                    type="number"
                    step="0.01"
                    placeholder={`${ELECTRIC_PARAMETERS.labels[param as keyof typeof ELECTRIC_PARAMETERS.labels]} (необязательно)`}
                    onChange={(e) => {
                      const currentValues = form.getValues('parameterValues') || {};
                      form.setValue('parameterValues', {
                        ...currentValues,
                        [param]: parseFloat(e.target.value) || 0
                      });
                    }}
                    className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {inputParams.length > 0 && outputParams.length > 0 && (
          <div className="mt-6 p-4 bg-n-7 rounded-lg border border-n-6">
            <h4 className="text-n-1 font-medium mb-2">Предпросмотр задачи:</h4>
            <p className="text-n-2 text-sm">
              <span className="text-blue-400">Дано:</span> {inputParams.map(p => ELECTRIC_PARAMETERS.labels[p as keyof typeof ELECTRIC_PARAMETERS.labels]).join(', ')}
            </p>
            <p className="text-n-2 text-sm">
              <span className="text-green-400">Найти:</span> {outputParams.map(p => ELECTRIC_PARAMETERS.labels[p as keyof typeof ELECTRIC_PARAMETERS.labels]).join(', ')}
            </p>
            {selectedCircuitType && (
              <p className="text-n-2 text-sm">
                <span className="text-yellow-400">Тип цепи:</span> {selectedCircuitType === 'series' ? 'Последовательная' : selectedCircuitType === 'parallel' ? 'Параллельная' : 'Смешанная'}
              </p>
            )}
          </div>
        )}
      </div>
      
      <div>
        <textarea
          {...form.register("description")}
          placeholder="Опишите схему цепи и особенности задачи (необязательно)"
          className="w-full px-4 py-3 bg-n-7 border border-n-6 rounded-xl text-n-1 focus:border-color-3 focus:outline-none transition-colors resize-none h-24"
        />
        {form.formState.errors.description && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!selectedCircuitType || inputParams.length === 0 || outputParams.length === 0}
        className="w-full py-3 px-6 bg-gradient-to-r from-color-3 to-color-1 text-n-1 font-medium rounded-xl transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Синтезировать решение
      </button>
    </form>
  );
};
