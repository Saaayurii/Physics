"use client";

import { pricing } from "@/constants";
import Button from "./Button";
import { check } from "@/public/assets";
import Image from "next/image";
import { useForms } from "@/hooks/useForms";
import { 
  GeometryFormComponent, 
  PhysicsFormComponent, 
  ElectricFormComponent 
} from "./TaskForm";
import { TaskResponseComponent } from "@/app/(landing)/components/TaskResponse";

const PricingList = () => {
  const {
    geometryForm,
    physicsForm,
    electricForm,
    loadingStates,
    responses,
    getSubmitHandler,
  } = useForms();

  const renderForm = (id: string) => {
    switch (id) {
      case "0":
        return (
          <GeometryFormComponent 
            form={geometryForm}
            onSubmit={() => {}} // обработчик уже в getSubmitHandler
          />
        );
      case "1":
        return (
          <PhysicsFormComponent 
            form={physicsForm}
            onSubmit={() => {}} // обработчик уже в getSubmitHandler
          />
        );
      case "2":
        return (
          <ElectricFormComponent 
            form={electricForm}
            onSubmit={() => {}} // обработчик уже в getSubmitHandler
          />
        );
      default:
        return null;
    }
  };

  const renderResponse = (id: string) => {
    const response = responses[id];
    if (!response) return null;

    return <TaskResponseComponent response={response} />;
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