// app/api/physics/route.ts
import { TaskAnalyzer, LibraryGenerator } from '@/lib/knowledgeBase';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mass, force, acceleration, velocity, time, description } = body;

    const parameters = { mass, force, acceleration, velocity, time };
    const pattern = TaskAnalyzer.analyzeTask(description, parameters, 'physics');

    if (!pattern) {
      return NextResponse.json({
        message: 'Не удалось определить тип задачи',
        suggestion: 'Пожалуйста, уточните описание задачи'
      }, { status: 400 });
    }

    const generatedFunction = LibraryGenerator.generateFunction(pattern, parameters);

    const savedTask = await prisma.task.create({
      data: {
        domain: 'physics',
        description,
        parameters: JSON.stringify(parameters),
        pattern: pattern.id,
        generatedCode: generatedFunction.code,
        result: generatedFunction.result,
        formula: generatedFunction.formula,
        unit: generatedFunction.unit
      }
    });

    const filename = `physics_${Date.now()}.js`;
    const libraryContent = LibraryGenerator.generateLibraryFile([generatedFunction], 'physics');

    return NextResponse.json({
      success: true,
      task: {
        id: savedTask.id,
        pattern: pattern.name,
        formula: generatedFunction.formula,
        result: generatedFunction.result,
        unit: generatedFunction.unit,
        description: generatedFunction.description,
        parameters
      },
      library: {
        filename,
        content: libraryContent,
        functionName: generatedFunction.functionName
      }
    });

  } catch (error: unknown) {
    console.error('Physics API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return NextResponse.json({
      message: 'Ошибка при обработке задачи',
      error: errorMessage
    }, { status: 500 });
  }
}
