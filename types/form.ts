import { z } from "zod";

// Схемы валидации для каждого типа задач
export const geometrySchema = z.object({
  shape: z.string().min(1, "Выберите фигуру"),
  parameters: z.string().min(1, "Введите параметры фигуры"),
});

export const physicsSchema = z.object({
  mass: z.string().min(1, "Введите массу"),
  force: z.string().optional(),
  acceleration: z.string().optional(),
  velocity: z.string().optional(),
  time: z.string().optional(),
  description: z.string().min(10, "Опишите задачу (минимум 10 символов)"),
});

export const electricSchema = z.object({
  voltage: z.string().optional(),
  current: z.string().optional(),
  resistance: z.string().optional(),
  power: z.string().optional(),
  circuitType: z.string().min(1, "Выберите тип цепи"),
  description: z.string().min(10, "Опишите схему цепи (минимум 10 символов)"),
});

// Типы форм
export type GeometryForm = z.infer<typeof geometrySchema>;
export type PhysicsForm = z.infer<typeof physicsSchema>;
export type ElectricForm = z.infer<typeof electricSchema>;

// Типы для ответов API
export interface TaskResponse {
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