import { BehaviorSubject } from "rxjs";

const products = [
    {id: 1, name: "apple", image: "https://img.freepik.com/premium-vector/red-apple-vector-healthy-sweet-fruit_68708-3076.jpg", price: 1.3, stock: 4},
    {id: 2, name: "banana", image: "https://previews.123rf.com/images/rubynurbaidi/rubynurbaidi1710/rubynurbaidi171000009/88230917-illustration-of-cute-cartoon-banana.jpg", price: 1.6, stock: 2},
    {id: 3, name: "lemon", image: "https://t4.ftcdn.net/jpg/02/88/50/97/360_F_288509750_Rx3mpwXN4jaSrbQx1uirbUSMmcRWm8I4.jpg", price: 2.1, stock: 1},
    {id: 4, name: "ananas", image: "https://t3.ftcdn.net/jpg/01/80/31/64/360_F_180316434_mY7TCf3Yp1MqMCJ0fOITXYLpATSHPQI1.jpg", price: 3, stock: 0},
]

export const products$ = new BehaviorSubject(products);
const removeStock = (productId) => {
    const newProduct = products$.value.map(p => {
        if (p.id === productId) {
            p.stock -= 1
        }
        return p
    })
    products$.next(newProduct);
};

const addStock = (productId) => {
    const newProduct = products$.value.map(p => {
        if (p.id === productId) {
            p.stock += 1
        }
        return p
    })
    products$.next(newProduct);
};


export const checkout$ = new BehaviorSubject([]);
export const addToCheckout = (productId) => {
  const product = products$.value.find(p => p.id === productId)
  removeStock(productId)

  const existsProduct = checkout$.value.find(p => p.id === productId)

  if (!existsProduct) {
    checkout$.next([...checkout$.value, {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        count: 1
    }]);
  } else {
    const checkout = checkout$.value.map(p => {
        if (p.id === existsProduct.id) {
            existsProduct.count += 1
        }
        return p
      })
    checkout$.next(checkout);
  }
};

export const removeFromCheckout = (productId) => {
    const product = checkout$.value.find(p => p.id === productId)
    if(product.count - 1 <= 0) {
        const newCheckout = checkout$.value.filter(p => p.id !== productId)
        checkout$.next(newCheckout);
    } else {
        const checkout = checkout$.value.map(p => {
            if (p.id === productId) {
                p.count -= 1
            }
            return p
          })
        checkout$.next(checkout);
    }
    addStock(productId)
};
