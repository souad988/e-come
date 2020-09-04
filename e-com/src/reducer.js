
export const initialState = {
    basket:[],
    user:null,
}

export const totalToPay = (basket)=>basket.reduce((amount,item)=>amount+item.price,0);

const reducer=(state,action)=>{
    console.log(action);
    
    console.log(action.user);
    switch(action.type){
        case 'SET_USER':
            return{
                ...state,
                user:action.user,
            };
        case 'ADD_TO_BASKET':
            return{
                ...state,
                basket:[...state.basket,action.item],
            };
        
        case 'REMOVE_FROM_BASKET':
            const newBasket=[...state.basket];
            const index = newBasket.findIndex((newBasketItem)=>newBasketItem.id === action.idd);
            if(index >= 0){
                 newBasket.splice(index,1);
             }
            return{
                ...state,
                basket:newBasket,
                 
            };
     
        default:
            return state;
    }
}
export default reducer;