interface KnowledgePattern {
  id: string;
  name: string;
  keywords: string[];
  formula: string;
  parameters: string[];
  result: string;
  unit: string;
  description: string;
  template: string;
}

interface KnowledgeCategory {
  patterns: KnowledgePattern[];
}

type KnowledgeDomain = Record<string, KnowledgeCategory>;

interface KnowledgeBase {
  [domain: string]: KnowledgeDomain;
}

interface CalculationResult {
  code: string;
  formula: string;
  result: number | null;
  unit: string;
  description: string;
  functionName: string;
}
export const knowledgeBase: KnowledgeBase = {
  physics: {
    motion: {
      patterns: [
        {
          id: 'force_calculation',
          name: 'Расчет силы',
          keywords: ['сила', 'force', 'масса', 'mass', 'ускорение', 'acceleration'],
          formula: 'F = m * a',
          parameters: ['mass', 'acceleration'],
          result: 'force',
          unit: 'Н',
          description: 'Второй закон Ньютона: сила равна произведению массы на ускорение',
          template: `export const calculateForce = (mass: number, acceleration: number): number => {
  if (!mass || !acceleration) {
    throw new Error('Требуются масса и ускорение');
  }
  return mass * acceleration;
};`
        },
        {
          id: 'acceleration_calculation',
          name: 'Расчет ускорения',
          keywords: ['ускорение', 'acceleration', 'сила', 'force', 'масса', 'mass'],
          formula: 'a = F / m',
          parameters: ['force', 'mass'],
          result: 'acceleration',
          unit: 'м/с²',
          description: 'Ускорение равно отношению силы к массе',
          template: `export const calculateAcceleration = (force: number, mass: number): number => {
  if (!force || !mass) {
    throw new Error('Требуются сила и масса');
  }
  return force / mass;
};`
        },
        {
          id: 'velocity_calculation',
          name: 'Расчет скорости',
          keywords: ['скорость', 'velocity', 'ускорение', 'acceleration', 'время', 'time'],
          formula: 'v = a * t',
          parameters: ['acceleration', 'time'],
          result: 'velocity',
          unit: 'м/с',
          description: 'Скорость равна произведению ускорения на время',
          template: `export const calculateVelocity = (acceleration: number, time: number): number => {
  if (!acceleration || !time) {
    throw new Error('Требуются ускорение и время');
  }
  return acceleration * time;
};`
        },
        {
          id: 'distance_calculation',
          name: 'Расчет расстояния',
          keywords: ['расстояние', 'distance', 'скорость', 'velocity', 'время', 'time'],
          formula: 's = v * t',
          parameters: ['velocity', 'time'],
          result: 'distance',
          unit: 'м',
          description: 'Расстояние равно произведению скорости на время',
          template: `export const calculateDistance = (velocity: number, time: number): number => {
  if (!velocity || !time) {
    throw new Error('Требуются скорость и время');
  }
  return velocity * time;
};`
        },
         {
          id: 'kinetic_energy',
          name: 'Кинетическая энергия',
          keywords: ['энергия', 'energy', 'кинетическая', 'kinetic', 'масса', 'mass', 'скорость', 'velocity'],
          formula: 'E = (m * v²) / 2',
          parameters: ['mass', 'velocity'],
          result: 'energy',
          unit: 'Дж',
          description: 'Кинетическая энергия равна половине произведения массы на квадрат скорости',
          template: `export const calculateKineticEnergy = (mass: number, velocity: number): number => {
  if (!mass || !velocity) {
    throw new Error('Требуются масса и скорость');
  }
  return (mass * velocity * velocity) / 2;
};`
        },
        {
          id: 'potential_energy',
          name: 'Потенциальная энергия',
          keywords: ['энергия', 'energy', 'потенциальная', 'potential', 'масса', 'mass', 'высота', 'height'],
          formula: 'E = m * g * h',
          parameters: ['mass', 'height'],
          result: 'energy',
          unit: 'Дж',
          description: 'Потенциальная энергия равна произведению массы, ускорения свободного падения и высоты',
          template: `export const calculatePotentialEnergy = (mass: number, height: number): number => {
  if (!mass || !height) {
    throw new Error('Требуются масса и высота');
  }
  const g = 9.81; // ускорение свободного падения
  return mass * g * height;
};`
        },
        {
          id: 'momentum_calculation',
          name: 'Расчет импульса',
          keywords: ['импульс', 'momentum', 'масса', 'mass', 'скорость', 'velocity'],
          formula: 'p = m * v',
          parameters: ['mass', 'velocity'],
          result: 'momentum',
          unit: 'кг·м/с',
          description: 'Импульс тела равен произведению массы тела на его скорость',
          template: `export const calculateMomentum = (mass: number, velocity: number): number => {
  if (!mass || !velocity) {
    throw new Error('Требуются масса и скорость');
  }
  return mass * velocity;
};`
        }
   
      ]
    }
  },
  
  
  geometry: {
    shapes: {
      patterns: [
        {
          id: 'triangle_area',
          name: 'Площадь треугольника',
          keywords: ['треугольник', 'triangle', 'площадь', 'area', 'основание', 'высота'],
          formula: 'S = (a * h) / 2',
          parameters: ['base', 'height'],
          result: 'area',
          unit: 'см²',
          description: 'Площадь треугольника равна половине произведения основания на высоту',
          template: `export const calculateTriangleArea = (base: number, height: number): number => {
  if (!base || !height) {
    throw new Error('Требуются основание и высота');
  }
  return (base * height) / 2;
};`
        },
        {
          id: 'circle_area',
          name: 'Площадь круга',
          keywords: ['круг', 'circle', 'площадь', 'area', 'радиус', 'radius'],
          formula: 'S = π * r²',
          parameters: ['radius'],
          result: 'area',
          unit: 'см²',
          description: 'Площадь круга равна произведению π на квадрат радиуса',
          template: `export const calculateCircleArea = (radius: number): number => {
  if (!radius) {
    throw new Error('Требуется радиус');
  }
  return Math.PI * radius * radius;
};`
        },
        {
          id: 'rectangle_area',
          name: 'Площадь прямоугольника',
          keywords: ['прямоугольник', 'rectangle', 'площадь', 'area', 'длина', 'ширина'],
          formula: 'S = a * b',
          parameters: ['length', 'width'],
          result: 'area',
          unit: 'см²',
          description: 'Площадь прямоугольника равна произведению длины на ширину',
          template: `export const calculateRectangleArea = (length: number, width: number): number => {
  if (!length || !width) {
    throw new Error('Требуются длина и ширина');
  }
  return length * width;
};`
        },
        {
          id: 'trapezoid_area',
          name: 'Площадь трапеции',
          keywords: ['трапеция', 'trapezoid', 'площадь', 'area', 'основание', 'base', 'высота', 'height'],
          formula: 'S = (a + b) * h / 2',
          parameters: ['base1', 'base2', 'height'],
          result: 'area',
          unit: 'см²',
          description: 'Площадь трапеции равна полусумме оснований, умноженной на высоту',
          template: `export const calculateTrapezoidArea = (base1: number, base2: number, height: number): number => {
  if (!base1 || !base2 || !height) {
    throw new Error('Требуются оба основания и высота');
  }
  return ((base1 + base2) * height) / 2;
};`
        },
        {
          id: 'sphere_volume',
          name: 'Объем сферы',
          keywords: ['сфера', 'sphere', 'объем', 'volume', 'радиус', 'radius'],
          formula: 'V = (4/3) * π * r³',
          parameters: ['radius'],
          result: 'volume',
          unit: 'см³',
          description: 'Объем сферы равен четырем третьим произведения π на куб радиуса',
          template: `export const calculateSphereVolume = (radius: number): number => {
  if (!radius) {
    throw new Error('Требуется радиус');
  }
  return (4 / 3) * Math.PI * Math.pow(radius, 3);
};`
        },
        {
          id: 'cylinder_volume',
          name: 'Объем цилиндра',
          keywords: ['цилиндр', 'cylinder', 'объем', 'volume', 'радиус', 'radius', 'высота', 'height'],
          formula: 'V = π * r² * h',
          parameters: ['radius', 'height'],
          result: 'volume',
          unit: 'см³',
          description: 'Объем цилиндра равен произведению площади основания на высоту',
          template: `export const calculateCylinderVolume = (radius: number, height: number): number => {
  if (!radius || !height) {
    throw new Error('Требуются радиус и высота');
  }
  return Math.PI * radius * radius * height;
};`
        }
      ]
    }
  },
  
  electrical: {
    circuits: {
      patterns: [
        {
          id: 'ohms_law_voltage',
          name: 'Закон Ома - напряжение',
          keywords: ['напряжение', 'voltage', 'ток', 'current', 'сопротивление', 'resistance'],
          formula: 'U = I * R',
          parameters: ['current', 'resistance'],
          result: 'voltage',
          unit: 'В',
          description: 'Напряжение равно произведению тока на сопротивление',
          template: `export const calculateVoltage = (current: number, resistance: number): number => {
  if (!current || !resistance) {
    throw new Error('Требуются ток и сопротивление');
  }
  return current * resistance;
};`
        },
        {
          id: 'ohms_law_current',
          name: 'Закон Ома - ток',
          keywords: ['ток', 'current', 'напряжение', 'voltage', 'сопротивление', 'resistance'],
          formula: 'I = U / R',
          parameters: ['voltage', 'resistance'],
          result: 'current',
          unit: 'А',
          description: 'Ток равен отношению напряжения к сопротивлению',
          template: `export const calculateCurrent = (voltage: number, resistance: number): number => {
  if (!voltage || !resistance) {
    throw new Error('Требуются напряжение и сопротивление');
  }
  return voltage / resistance;
};`
        },
        {
          id: 'power_calculation',
          name: 'Расчет мощности',
          keywords: ['мощность', 'power', 'напряжение', 'voltage', 'ток', 'current'],
          formula: 'P = U * I',
          parameters: ['voltage', 'current'],
          result: 'power',
          unit: 'Вт',
          description: 'Мощность равна произведению напряжения на ток',
          template: `export const calculatePower = (voltage: number, current: number): number => {
  if (!voltage || !current) {
    throw new Error('Требуются напряжение и ток');
  }
  return voltage * current;
};`
        },
         {
          id: 'resistance_series',
          name: 'Сопротивление последовательное',
          keywords: ['сопротивление', 'resistance', 'последовательное', 'series', 'цепь', 'circuit'],
          formula: 'R = R₁ + R₂ + ... + Rₙ',
          parameters: ['resistances'],
          result: 'totalResistance',
          unit: 'Ом',
          description: 'Общее сопротивление последовательно соединенных резисторов равно сумме их сопротивлений',
          template: `export const calculateSeriesResistance = (...resistances: number[]): number => {
  if (!resistances || resistances.length === 0) {
    throw new Error('Требуются сопротивления');
  }
  return resistances.reduce((sum, r) => sum + r, 0);
};`
        },
        {
          id: 'resistance_parallel',
          name: 'Сопротивление параллельное',
          keywords: ['сопротивление', 'resistance', 'параллельное', 'parallel', 'цепь', 'circuit'],
          formula: '1/R = 1/R₁ + 1/R₂ + ... + 1/Rₙ',
          parameters: ['resistances'],
          result: 'totalResistance',
          unit: 'Ом',
          description: 'Общее сопротивление параллельно соединенных резисторов',
          template: `export const calculateParallelResistance = (...resistances: number[]): number => {
  if (!resistances || resistances.length === 0) {
    throw new Error('Требуются сопротивления');
  }
  const reciprocalSum = resistances.reduce((sum, r) => sum + 1 / r, 0);
  return 1 / reciprocalSum;
};`
        },
        {
          id: 'capacitance_series',
          name: 'Емкость последовательная',
          keywords: ['емкость', 'capacitance', 'последовательная', 'series', 'конденсатор', 'capacitor'],
          formula: '1/C = 1/C₁ + 1/C₂ + ... + 1/Cₙ',
          parameters: ['capacitances'],
          result: 'totalCapacitance',
          unit: 'Ф',
          description: 'Общая емкость последовательно соединенных конденсаторов',
          template: `export const calculateSeriesCapacitance = (...capacitances: number[]): number => {
  if (!capacitances || capacitances.length === 0) {
    throw new Error('Требуются емкости');
  }
  const reciprocalSum = capacitances.reduce((sum, c) => sum + 1 / c, 0);
  return 1 / reciprocalSum;
};`
        }
      ]
    }
  }
};

export class TaskAnalyzer {
  static analyzeTask(description: string, parameters: Record<string, any>, domain?: string): KnowledgePattern | null {
    const allPatterns = this.getAllPatterns();
    const domainPatterns = domain ? knowledgeBase[domain] : allPatterns;
    
    let bestMatch: KnowledgePattern | null = null;
    let bestScore = 0;
    
    for (const category in domainPatterns) {
      const categoryData = domainPatterns[category];
      const patterns = 'patterns' in categoryData ? categoryData.patterns : categoryData;
      
      if (Array.isArray(patterns)) {
        for (const pattern of patterns) {
          const score = this.calculateMatchScore(description, parameters, pattern);
          if (score > bestScore) {
            bestScore = score;
            bestMatch = pattern;
          }
        }
      }
    }
    
    return bestMatch;
  }
  
  static calculateMatchScore(description: string, parameters: Record<string, any>, pattern: KnowledgePattern): number {
    let score = 0;
    const text = description.toLowerCase();
    
    // Проверяем ключевые слова
    for (const keyword of pattern.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        score += 2;
      }
    }
    
    // Проверяем параметры
    const availableParams = Object.keys(parameters).filter(key => parameters[key]);
    const requiredParams = pattern.parameters;
    
    const matchingParams = availableParams.filter(param => 
      requiredParams.some(req => param.toLowerCase().includes(req.toLowerCase()))
    );
    
    score += matchingParams.length * 3;
    
    return score;
  }
  
   static getAllPatterns(): Record<string, KnowledgePattern[]> {
    const allPatterns: Record<string, KnowledgePattern[]> = {};
    
    for (const domain in knowledgeBase) {
      for (const category in knowledgeBase[domain]) {
        if (!allPatterns[category]) {
          allPatterns[category] = [];
        }
        const categoryData = knowledgeBase[domain][category];
        const patterns = 'patterns' in categoryData ? categoryData.patterns : categoryData;
        allPatterns[category] = allPatterns[category].concat(patterns);
      }
    }
    
    return allPatterns;
  }
}

export class LibraryGenerator {
  static generateFunction(pattern: KnowledgePattern, parameters: Record<string, any>): CalculationResult {
    const result = this.calculateResult(pattern, parameters);
    
    return {
      code: pattern.template,
      formula: pattern.formula,
      result: result,
      unit: pattern.unit,
      description: pattern.description,
      functionName: this.extractFunctionName(pattern.template)
    };
  }
  
  static calculateResult(pattern: KnowledgePattern, parameters: Record<string, any>): number | null {
    try {
      // Создаем функцию из шаблона и выполняем расчет
      const func = new Function('return ' + pattern.template.replace('export const ', ''))();
      const paramValues = pattern.parameters.map(param => {
        const value = this.findParameterValue(param, parameters);
        return parseFloat(value) || 0;
      });
      
      return func(...paramValues);
    } catch (error) {
      return null;
    }
  }
  
  static findParameterValue(paramName: string, parameters: Record<string, any>): any {
    const paramMap: Record<string, any> = {
      'mass': parameters.mass,
      'acceleration': parameters.acceleration,
      'force': parameters.force,
      'velocity': parameters.velocity,
      'time': parameters.time,
      'base': parameters.base,
      'height': parameters.height,
      'radius': parameters.radius,
      'length': parameters.length,
      'width': parameters.width,
      'voltage': parameters.voltage,
      'current': parameters.current,
      'resistance': parameters.resistance,
      'power': parameters.power
    };
    
    return paramMap[paramName] || parameters[paramName];
  }
  
  static extractFunctionName(template: string): string {
    const match = template.match(/const\s+(\w+)\s*=/);
    return match ? match[1] : 'generatedFunction';
  }
  
  static generateLibraryFile(functions: CalculationResult[], domain: string): string {
    const header = `// Generated ${domain} library
// Auto-generated by Structural Program Synthesis System
// Generated at: ${new Date().toISOString()}

`;
    
    const functionsCode = functions.map(func => func.code).join('\n\n');
    
    const exports = `
// Export all functions
export {
  ${functions.map(func => func.functionName).join(',\n  ')}
};
`;
    
    return header + functionsCode + exports;
  }
}