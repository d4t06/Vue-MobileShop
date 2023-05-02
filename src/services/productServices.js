import axios from "axios";

const request = axios.create({
   baseURL: "http://localhost:3000/api",
});

export const getProducts = async (querys) => {
   console.log("getProducts service querys", querys);

   const { filters = '', sort = '', category = 'dtdd', ...rest } = querys;

   if (!querys) {
      console.log("product service missing query");
      return;
   }

   try {
      const response = await request.get(`/products/${category}`, {
         params: {
            ...rest,
            ...filters, //{brand:['samsung','iphone'], price:[0,3]}
            ...sort, //{column:cur_price, type:asc}
         },
      });
      return response;
   } catch (error) {
      console.log("loi getProducts services", { message: error });
   }
};

export const getSuggest = async (category) => {

   if (!category) {
      console.log("getSuggested service missing category");
      return;
   }
   try {
      const response = await request.get(`/products/suggest`, {
         params: {
            ...category,
         },
      });
      return response;
   } catch (error) {
      console.log("loi getProducts services", { message: error });
   }
};

export const getProductDetail = async (querys) => {
   if (!querys) {
      console.log("product service missing query");
   }
   const { category, href } = querys;
   try {
      const response = await request.get(`/products/${category}/${href}`, {
         params: {},
      });
      return response;
   } catch (error) {
      console.log("loi getProductDetail services", { message: error });
   }
};

export const search = async (q) => {
   try {
      const response = await request.get(`/products/search`, {
         params: {
            ...q,
         },
      });

      return response;
   } catch (error) {
      console.log("loi getProducts services", error);
   }
};

export const buyProduct = async (data) => {
   if (!data) {
      console.log("data missing !");
      return;
   }
   try {
      request.post("/products", {
         body: {
            ...data,
         },
      });
   } catch (error) {
      console.log("buy product fail, ", error);
   }
};
