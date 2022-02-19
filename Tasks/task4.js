const bem = {
    block: (block) => {
      return {
        build: () => `${block}`,
        element: (element) => {
          return {
            build: () => `${block}__${element}`,
            modifier: (modifier) => {
              return {
                build: () => `${block}__${element}-${modifier}`
              }
            }
          }
        }
      }
    }
  }