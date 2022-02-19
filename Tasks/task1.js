let createColorManager= (defaultColor) => {
    const defaultColors = ['green', 'blue', 'yellow', 'red', 'brown'];
    defaultColors.unshift(defaultColor) // Add default color to beginning of array
    const uniqueColors = new Set(defaultColors); // Remove potential duplicate colors
    const colorOptions = Array.from(uniqueColors); // Final color options array
    let counter = 0;
    let colorManager = {
      get: () => colorOptions[counter],
      next: ()=> {
        counter++
        if(counter > colorOptions.length-1) counter = 0;
      },
      prev: ()=> {
        counter--
        if(counter < 0) counter = colorOptions.length-1;
      },
      reset: ()=> counter = 0
    }
    return colorManager;
  };

  const colorManager = createColorManager('purple')