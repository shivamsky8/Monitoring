import type from './type'

export const Increment = () => ({
    type: type.INCREMENT

});

export const storeData = (apiData) => ({
    type : type.SAVE_DATA,
    apiData
})