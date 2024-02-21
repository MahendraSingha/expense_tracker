import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";


export const postData = createAsyncThunk('postData', async (obj) => {
    console.log(obj, 'obj99')
    const { data } = await axios.post("http://localhost:8000/transaction_details", obj)
    console.log(data, 'data11')
    return data;
})

export const allExpenseData = createAsyncThunk('allExpenseData', async () => {
    // console.log("filterDate", filterDate)
    const { data } = await axios.get('http://localhost:8000/transaction_details')
    console.log(data, 'getData')
    return data
})

export const deleteExpData = createAsyncThunk('deleteExpData', async (id, { dispatch }) => {
    console.log(id, 'id')
    const data = await axios.delete(`http://localhost:8000/transaction_details/${id}`)
    dispatch(allExpenseData())
    // return data
    return id
})

export const singleExpDetails = createAsyncThunk('singleExpDetails', async (id) => {
    const { data } = await axios.get(`http://localhost:8000/transaction_details/${id}`)
    console.log(data, 'getDetails')
    return data
})

export const updateData = createAsyncThunk('updateData', async (newData, { dispatch }) => {
    console.log(newData, 'newData')
    const { data } = await axios.put(`http://localhost:8000/transaction_details/${newData.id}`, (newData.obj))
    console.log(data, 'dataPut')
    dispatch(allExpenseData())
    return data
})



export const transactionData = createSlice({
    name: 'transactionData',
    initialState: {
        allTransactionData: [],
        loading: false,
        error: null,
        singleData: {},
        // filterUsers: [],
        // listOnTransType: [],
        // filterUserByDate: [],
        // filterUserByOtherData: [],
        filterUsers: [],

        isFilter: false
    },
    reducers: {
        filter: (state, action) => {
            console.log(action.payload, 'action000')
            // state.filterUsers = state.allTransactionData.filter((data) => Object.keys(action.payload).every(key => data[key] === action.payload[key]))


            // state.filterUsers = state.allTransactionData.filter((data) => Object.keys(action.payload).every(key =>{
            //     if (key === 'startDate' && key === 'endDate'){
            //         return data.date >= action.payload.startdate && data.date <= action.payload.endDate
            //     }else{
            //         return data[key] === action.payload[key]
            //     }
            // }))
            const startdate = action.payload.startDate
            const endDate = action.payload.endDate

            // if (startdate && endDate) {
            //     state.isFilter = true
            // } else if (action.payload.transaction_type) {
            //     state.isFilter = true
            // } else if (action.payload.country_name) {
            //     state.isFilter = true
            // } else if (startdate && endDate && action.payload.transaction_type && action.payload.country_name) {
            //     state.isFilter = true
            // }
            // if (startdate && endDate && action.payload.transaction_type && action.payload.country_name) {
            //     state.isFilter = true
            // }

            // state.filterUserByDate = state.allTransactionData.filter((data) => data.date >= startdate && data.date <= endDate)
            // state.filterUserByOtherData = state.allTransactionData.filter((data) => data.transaction_type === action.payload.transaction_type && data.country_name === action.payload.country_name)

            // state.filterUsers = [...state.filterUsers, ...state.filterUserByOtherData]


            /////////////////////////////////
            if (startdate && endDate) {
                state.isFilter = true
                state.filterUsers = state.allTransactionData.filter((data) => data.date >= startdate && data.date <= endDate)
            }
            if (action.payload.transaction_type) {
                state.isFilter = true
                state.filterUsers = state.allTransactionData.filter((data) => data.transaction_type === action.payload.transaction_type)
            }
            if (action.payload.country_name) {
                state.isFilter = true
                state.filterUsers = state.allTransactionData.filter((data) => data.country_name === action.payload.country_name)
            }
            if (startdate && endDate && action.payload.transaction_type) {
                state.isFilter = true
                state.filterUsers = state.allTransactionData.filter((data) => data.date >= startdate && data.date <= endDate && data.transaction_type === action.payload.transaction_type)
            }
            if (startdate && endDate && action.payload.country_name) {
                state.isFilter = true
                state.filterUsers = state.allTransactionData.filter((data) => data.date >= startdate && data.date <= endDate && data.country_name === action.payload.country_name)
            }
            if (action.payload.transaction_type && action.payload.country_name) {
                state.isFilter = true
                state.filterUsers = state.allTransactionData.filter((data) => data.transaction_type === action.payload.transaction_type && data.country_name === action.payload.country_name)
            }
            if (startdate && endDate && action.payload.transaction_type && action.payload.country_name) {
                state.isFilter = true
                state.filterUsers = state.allTransactionData.filter((data) => data.date >= startdate && data.date <= endDate && data.transaction_type === action.payload.transaction_type && data.country_name === action.payload.country_name)
            }
            //////////////////////////////////


            // if (startdate && endDate || startdate && endDate && action.payload.transaction_type || startdate && endDate && action.payload.transaction_type && action.payload.country_name) {
            //     state.isFilter = true
            //     state.filterUsers =
            //         state.allTransactionData.filter((data) => data.date >= startdate && data.date <= endDate)
            //         ||
            //         state.allTransactionData.filter((data) => data.date >= startdate && data.date <= endDate && data.transaction_type === action.payload.transaction_type)
            //         ||
            //         state.allTransactionData.filter((data) => data.date >= startdate && data.date <= endDate && data.transaction_type === action.payload.transaction_type && data.country_name === action.payload.country_name)

            // }




            // else if (action.payload.country_name) {
            //     state.isFilter = true
            //     state.filterUsers = state.allTransactionData.filter((data) => data.country_name === action.payload.country_name)
            // } else {
            //     state.isFilter = true
            //     state.filterUsers = state.allTransactionData.filter((data) => data.date >= startdate && data.date <= endDate && data.transaction_type === action.payload.transaction_type && data.country_name === action.payload.country_name)
            // }



            // if (startdate && endDate && action.payload.transaction_type && action.payload.country_name) {
            //     state.isFilter = true
            // }
            // state.filterUsers = state.allTransactionData.filter((data) => data.date >= startdate && data.date <= endDate && data.transaction_type === action.payload.transaction_type && data.country_name === action.payload.country_name)
        },

    },
    extraReducers: (builder) => {
        builder.addCase(postData.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(postData.fulfilled, (state, action) => {
            console.log(action?.payload, 'post000')
            state.loading = false;
            state.allTransactionData.push(action.payload)
        })
        builder.addCase(postData.rejected, (state, action) => {
            state.loading = true;
            state.error = action.payload;
        })

        //get expense data
        builder.addCase(allExpenseData.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(allExpenseData.fulfilled, (state, action) => {
            state.loading = false;
            state.allTransactionData = [...action.payload]
        })
        builder.addCase(allExpenseData.rejected, (state, action) => {
            state.loading = true;
            state.error = action.payload;
        })

        //delete data
        builder.addCase(deleteExpData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteExpData.fulfilled, (state, action) => {
            console.log(action.payload, 'id000')
            state.loading = false;
            const filterData = state.filterUsers.filter((user) => user.id !== action.payload)
            state.filterUsers = filterData

        })
        builder.addCase(deleteExpData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })


        //get single exp data details
        builder.addCase(singleExpDetails.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(singleExpDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.singleData = action.payload
        })
        builder.addCase(singleExpDetails.rejected, (state, action) => {
            state.loading = true;
            state.error = action.payload;
        })

        //update
        builder.addCase(updateData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateData.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.filterUsers.findIndex((user) => user.id === action.payload.id)
            console.log(index, 'ind')
            state.filterUsers.splice(index, 1, action.payload)


        })
        builder.addCase(updateData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})
export const { filter } = transactionData.actions
export default transactionData.reducer