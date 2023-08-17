  export const validateStringLength = (length: number, strings: string[]): boolean => {
    let returnBool = true;
    strings.forEach(element => {
      if (element.length <= length) returnBool = false;
    });
    return returnBool;
  }