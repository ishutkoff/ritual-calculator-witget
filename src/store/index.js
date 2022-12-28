import {createStore} from 'vuex'
import axios from 'axios'
import {CREMATION, BURIAL, PRODUCT, SERVICE} from "../common/constants.js";

export default createStore({
    state() {
        return {
            shopId: null,
            serviceType: BURIAL,
            productsList: [],
            servicesList: [],
            categoriesList: [],
            orderList: []
        }
    },

    actions: {
        async fetchShopData({dispatch, state}) {
            const res = await axios.get(`${import.meta.env.VITE_URL}/shops/${state.shopId}`)
            const shop = await res.data
            for (const product of shop.products) {
                await dispatch('fetchProduct', product)
            }
            for (const service of shop.services) {
                await dispatch('fetchService', service)
            }
        },
        async fetchProduct({commit}, productId) {
            const res = await axios.get(
                `${import.meta.env.VITE_URL}/products/${productId}`
            )
            const product = await res.data
            commit('pushProduct', product)
        },
        async fetchService({commit}, serviceId) {
            const res = await axios.get(
                `${import.meta.env.VITE_URL}/services/${serviceId}`
            )
            const service = await res.data
            commit('pushService', service)
        },
        async fetchAllCategories({commit, state}) {
            const res = await axios.get(`${import.meta.env.VITE_URL}/categories/?shop_id=${state.shopId}`)
            const categories = await res.data
            commit('pushCategories', categories)
        },
    },
    mutations: {
        setType(state, type) {
            state.serviceType = type
            state.orderList = []
        },
        setShopId(state, shopId) {
            state.shopId = shopId
        },
        pushProduct(state, product) {
            state.productsList.push(product)
        },
        pushService(state, service) {
            state.servicesList.push(service)
        },
        pushCategories(state, categories) {
            state.categoriesList = categories
        },
        removeFromOrder(state, itemId) {
            console.log(itemId)
            const index = state.orderList.findIndex(item =>item && item._id ===itemId)
            console.log(index)
            state.orderList[index] = undefined
        },
        pushToOrderList(state, item) {
            if (item.type === PRODUCT) {
                state.orderList[item.index] = this.getters.getProductById(item._id)
            }
            else if (item.type === SERVICE) {
                state.orderList[item.index] = this.getters.getServiceById(item._id)
            }
        },
    },
    getters: {
        getProductsCategories(state, getters) {
            let categories = state.categoriesList.filter(category => !category.forServices)
            for (const [index, category] of categories.entries()) {
                categories[index].products = getters.getProductsForCategory(category._id)
            }
            return categories.filter(category => category.products.length > 0)
        },
        getServicesCategories(state, getters) {
            let categories = state.categoriesList.filter(category => category.forServices)
            for (const [index, category] of categories.entries()) {
                categories[index].services = getters.getServicesForCategory(category._id)
            }
            return categories.filter(category => category.services.length > 0)
        },
        getProductsForCategory: state => categoryId => {
            return state.productsList.filter(product => product.category === categoryId && product[state.serviceType])
        },
        getProductsWithOutCategory(state){
            return state.productsList.filter(product => !product.category && product[state.serviceType])
        },
        getServicesWithOutCategory(state){
            return state.servicesList.filter(service => !service.category && service[state.serviceType])
        },
        getServicesForCategory: state => categoryId => {
            return state.servicesList.filter(service => service.category === categoryId && service[state.serviceType])
        },
        getServiceById: state => serviceId => {
            console.log(serviceId)
            return state.servicesList.find(service => service._id === serviceId)
        },
        getProductById: state => productId => {
            return state.productsList.find(product => product._id === productId)
        },
        getOrderList(state){
            return state.orderList.filter(item => item)
        },
        getSum(state, getters){
            let sum = 0
            for(let item of getters.getOrderList){
                sum+= item.price
            }
            return sum.toLocaleString('ru')
        }
    }
})