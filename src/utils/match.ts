const matched = (x: any) => ({
    on: () => matched(x),
    otherwise: () => x,
})
  
const match = <T>(x: T) => ({  
    on: (
        pred: (x: T) => boolean, 
        fn: (x: T) => any
    ) => (pred(x) ? matched(fn(x)) : match(x)),
    otherwise: (
        fn: (x: T) => any
    ) => fn(x),
})

export default match