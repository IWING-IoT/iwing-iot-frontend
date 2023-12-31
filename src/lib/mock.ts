import {
  TCategory,
  TCategoryDetails,
  TDeploymentDeviceDetails,
  TEntry,
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

export const deploymentDevicesData: TDeploymentDeviceDetails[] = [
  {
    id: "100",
    type: "standalone",
    name: "device01",
    associate: [
      {
        id: "1",
        name: "Olivia Rhye",
      },
      {
        id: "2",
        name: "Dog A",
      },
    ],
    alias: "alias_of_device",
    status: "active",
    battery: "100",
    temperature: "53",
    lastCommunuication: "2024-01-02T18:11:17.821Z",
    JWT: "JWT",
  },
  {
    id: "200",
    type: "gateway",
    name: "device02",
    associate: [
      {
        id: "3",
        name: "Olivia Rhye",
      },
      {
        id: "4",
        name: "Dog A",
      },
    ],
    alias: "alias_of_device",
    status: "active",
    battery: "100",
    temperature: "53",
    lastCommunuication: "2023-10-05T14:48:00.000Z",
    JWT: "JWT",
  },
  {
    id: "300",
    type: "node",
    name: "device03",
    associate: [
      {
        id: "5",
        name: "Olivia Rhye",
      },
      {
        id: "6",
        name: "Dog A",
      },
    ],
    alias: "alias_of_device",
    status: "active",
    battery: "100",
    temperature: "53",
    lastCommunuication: "2023-10-05T14:48:00.000Z",
    JWT: "testJWT",
  },
];
