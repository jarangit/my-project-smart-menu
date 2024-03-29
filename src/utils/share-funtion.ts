import { ChangeEvent } from "react";

export const shareFunctionUtils = {
  handleImageChange: (e: ChangeEvent<HTMLInputElement>, callback: (fileContent: string) => void) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      callback(reader.result as string)
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  },
}