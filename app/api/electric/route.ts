// app/api/electric/route.ts
import { TaskAnalyzer, LibraryGenerator } from '@/lib/knowledgeBase';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { voltage, current, resistance, power, circuitType, description } = body;

    const parameters = {
      voltage: parseFloat(voltage) || null,
      current: parseFloat(current) || null,
      resistance: parseFloat(resistance) || null,
      power: parseFloat(power) || null
    };

    const pattern = TaskAnalyzer.analyzeTask(description, parameters, 'electrical');

    if (!pattern) {
      return NextResponse.json({
        message: 'Не удалось определить тип электрической задачи',
        suggestion: 'Укажите, что нужно найти: напряжение, ток, сопротивление или мощность'
      }, { status: 400 });
    }

    const generatedFunction = LibraryGenerator.generateFunction(pattern, parameters);

    const savedTask = await prisma.task.create({
      data: {
        domain: 'electrical',
        description,
        parameters: JSON.stringify(parameters),
        pattern: pattern.id,
        generatedCode: generatedFunction.code,
        result: generatedFunction.result,
        formula: generatedFunction.formula,
        unit: generatedFunction.unit
      }
    });

    const filename = `electrical_${Date.now()}.js`;
    const libraryContent = LibraryGenerator.generateLibraryFile([generatedFunction], 'electrical');

    return NextResponse.json({
      success: true,
      task: {
        id: savedTask.id,
        pattern: pattern.name,
        formula: generatedFunction.formula,
        result: generatedFunction.result,
        unit: generatedFunction.unit,
        description: generatedFunction.description,
        parameters,
        circuitType
      },
      library: {
        filename,
        content: libraryContent,
        functionName: generatedFunction.functionName
      }
    });

  } catch (error) {
    console.error('Electrical API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return NextResponse.json({
      message: 'Ошибка при обработке электрической задачи',
      error: errorMessage
    }, { status: 500 });
  }
}
