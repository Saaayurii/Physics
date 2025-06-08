// app/api/geometry/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { TaskAnalyzer, LibraryGenerator } from '@/lib/knowledgeBase';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { shape, parameters } = body;

    // Парсим параметры
    const parsedParams = parseGeometryParameters(parameters, shape);

    // Формируем описание задачи
    const description = `Найти площадь ${shape} с параметрами: ${parameters}`;
    const pattern = TaskAnalyzer.analyzeTask(description, parsedParams, 'geometry');

    if (!pattern) {
      return NextResponse.json({
        message: 'Не удалось определить тип геометрической задачи',
        suggestion: 'Проверьте правильность ввода параметров'
      }, { status: 400 });
    }

    // Генерируем функцию
    const generatedFunction = LibraryGenerator.generateFunction(pattern, parsedParams);

    // Сохраняем в базу данных
    const savedTask = await prisma.task.create({
      data: {
        domain: 'geometry',
        description,
        parameters: JSON.stringify(parsedParams),
        pattern: pattern.id,
        generatedCode: generatedFunction.code,
        result: generatedFunction.result,
        formula: generatedFunction.formula,
        unit: generatedFunction.unit
      }
    });

    // Генерируем библиотечный файл
    const libraryContent = LibraryGenerator.generateLibraryFile([generatedFunction], 'geometry');

    return NextResponse.json({
      success: true,
      task: {
        id: savedTask.id,
        pattern: pattern.name,
        formula: generatedFunction.formula,
        result: generatedFunction.result,
        unit: generatedFunction.unit,
        description: generatedFunction.description,
        parameters: parsedParams
      },
      library: {
        filename: `geometry_${Date.now()}.js`,
        content: libraryContent,
        functionName: generatedFunction.functionName
      }
    });

  } catch (error: unknown) {
    console.error('Geometry API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return NextResponse.json({
      message: 'Ошибка при обработке геометрической задачи',
      error: errorMessage
    }, { status: 500 });
  }
}

// Хелпер для парсинга параметров
const parseGeometryParameters = (paramString: string, shape: string) => {
  const params: { [key: string]: number } = {};
  const normalizedString = paramString.toLowerCase();
  const numbers = paramString.match(/\d+(?:\.\d+)?/g) || [];

  switch (shape) {
    case 'triangle':
      if (normalizedString.includes('основание') || normalizedString.includes('base')) {
        params.base = parseFloat(numbers[0] || '0');
        params.height = parseFloat(numbers[1] || '0');
      }
      break;
    case 'circle':
      if (normalizedString.includes('радиус') || normalizedString.includes('radius')) {
        params.radius = parseFloat(numbers[0] || '0');
      }
      break;
    case 'rectangle':
      params.length = parseFloat(numbers[0] || '0');
      params.width = parseFloat(numbers[1] || '0');
      break;
  }

  return params;
};
