import * as productServices from '../services/productServices';
const getAllAndStoring = async (piniaActions, query) => {
   try {

      // if get at search page
      const [category, q] = query.category.split('='); //search=iphone 14

      piniaActions.storingProducts({
         status: 'loading',
      });
      
      const response = await productServices.getProducts({...query, category, q});

      if (!response || response.status === 431) {
         piniaActions.storingProducts({
            products: '',
            status: 'error',
         });
         console.log('action getProduct response undefine');
      } else {
         if (query.page === 1) {
            piniaActions.storingProducts({
               products: response.data,
               status: 'successful',
               page: query.page,
               category: query.category,
            });
         } else {
            // getMore
            piniaActions.getMoreProducts({
               products: response.data,
               status: 'successful',
               page: query.page,
               category: query.category,
            });
         }
      }
   } catch (error) {
      console.log('loi trong action', error);
   }
};

const getOne = async (dispatch, query) => {
   try {
      dispatch({ type: 'GET_ONE', category: query.category, href: query.href });
   } catch {
      console.log('action getProduct response undefine');
   }
};

export { getAllAndStoring, getOne };
