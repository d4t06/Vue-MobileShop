import * as productServices from '../services/productServices';
// import searchService from '../services/searchService';
const getAllAndStoring = async (piniaActions, query) => {

   try {
      const response = await productServices.getProducts(query);

      if (!response || response.status === 431) {
         piniaActions.storingProducts({
            products: '',
            status: "error",
         });
         console.log('action getProduct response undefine');

      }
      else {
         if (query.page === 1) {

            piniaActions.storingProducts({
               products: response.data,
               status: "successful",
               page: query.page,
               category: query.category
            });
         } else {

            // getMore
            piniaActions.getMoreProducts({
               products: response.data,
               status: "successful",
               page: query.page,
               category: query.category
            })
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

// const getSearchPage = async (dispatch, query) => {
//    // console.log("getSearchPage query = ", query)

//    try {
//       const key = query.category.split('search=')[1]; //search=iphone 14
//       const response = await searchService({ q: key, page: query.page, sort: query.sort });
//       dispatch({
//          products: response,
//          ...query,
//       });
//    } catch {
//       console.log('action getSearchPage response undefine');
//    }
// };

export { getAllAndStoring, getOne };
