const sum = (a, b, c) => {
    if (b === undefined) {
      return (b, c) => {
        if (c === undefined) {
          return (c) => a + b + c;
        }
        return a + b + c;
      }
    }
  
    if (c === undefined) {
      return (c) => a + b + c;
    }
  
    return a + b + c;
  }
  
  //console.log(sum(2, 4, 6)) // 12
  //console.log(sum(2)(4)(6)) // 12
  //console.log(sum(2, 4)(6)) // 12
  //console.log(sum(2)(4, 6)) // 12