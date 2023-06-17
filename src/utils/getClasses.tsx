export const getClasses = (classes : string[]) => {
    return classes
      .filter((item: string) => item !== "")
      .join(" ")
      .trim();
  };
  