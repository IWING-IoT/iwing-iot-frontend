import {
  TCategory,
  TCategoryDetails,
  TDeploymentDeviceDetails,
  TEntry,
  TMapPin,
  TMessage,
} from "./type";

export const categoryData: TCategoryDetails = {
  name: "Test Category",
  mainAttribute: "name",
  description: "This is a test category",
  entryDefinitions: [
    {
      id: "1",
      accessorKey: "name",
      type: "string",
    },
    {
      id: "2",
      accessorKey: "Note",
      type: "string",
    },
    {
      id: "3",
      accessorKey: "Image",
      type: "image",
    },
    {
      id: "4",
      accessorKey: "Ref",
      type: "category_reference",
      category: {
        id: "1",
        name: "TemperatureSensor",
      },
    },
  ],
  attributeEntries: [
    {
      id: "1",
      name: "TemperatureSensor",
      Note: "Monitors room temperature",
      Image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA60lEQVR4nO3QQQ3AIADAQMDdxCAE17OwvsiSOwVN57PP4Jt1O+BPzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCl7vUgIHrtqVVAAAAABJRU5ErkJggg==",
      Ref: {
        id: "1",
        name: "Entry 1",
      },
    },
    {
      id: "2",
      name: "HumiditySensor",
      Note: "Tracks ambient humidity levels",
      Image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA5klEQVR4nO3QQQkAIADAQLV/Z63gXiLcJRibe3BrvQ74iVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWYFZgVmBWcEBil4Bx/GEGnoAAAAASUVORK5CYII=",
      Ref: {
        id: "2",
        name: "ENtry 2",
      },
    },
    {
      id: "3",
      name: "LightSensor",
      Note: "Measures light intensity",
      Image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAA60lEQVR4nO3QQQ3AIADAQMDdxCAE17OwvsiSOwVN57PP4Jt1O+BPzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCswKzArMCl7vUgIHrtqVVAAAAABJRU5ErkJggg==",
      Ref: {
        id: "3",
        name: "Entry 3",
      },
    },
  ],
};

export const allCategories: TCategory[] = [
  {
    id: "1",
    name: "Category 1",
  },
  {
    id: "2",
    name: "Category 2",
  },
  {
    id: "3",
    name: "Category 3",
  },
];

export const allEntries: TEntry[] = [
  {
    id: "1",
    name: "Entry 1",
  },
  {
    id: "2",
    name: "Entry 2",
  },
  {
    id: "3",
    name: "Entry 3",
  },
];

export const oldCode: string = `
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`;

export const newCode: string = `
#include <iostream>

class HelloWorld {
public:
    void printMessage() {
        std::cout << "Hello, World!" << std::endl;
    }
};

int main() {
    HelloWorld helloWorld;
    helloWorld.printMessage();
    return 0;
}`;

export const cardContent = [
  {
    heading: "Temperature",
    metric: "35 °C",
  },
  {
    heading: "Temperature",
    metric: "35",
  },
  {
    heading: "Temperature",
    metric: "35",
  },
  {
    heading: "Temperature",
    metric: "35",
  },
];
