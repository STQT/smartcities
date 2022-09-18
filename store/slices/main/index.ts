import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { Article, Theme, User } from "shared/types"
import { getFlows, getReadingNow } from "services/api"
import { AxiosListResponse } from "services/api/config"
import { AxiosResponse } from "axios"
import { clearAuthTokens } from "axios-jwt"

export interface MainState {
  user: User | null
  isLoggedIn: boolean

  flows: Theme[]
  selectedFlow: undefined | Theme

  readingNow: Article[]
}

const initialState: MainState = {
  user: null,
  isLoggedIn: false,

  flows: [],
  selectedFlow: undefined,

  readingNow: []
}

export const fetchFlows = createAsyncThunk("flows/fetchFlows", () =>
  getFlows().then((res: AxiosResponse<Theme[]>) => res.data)
)

export const fetchReadingNow = createAsyncThunk(
  "readingNow/fetchReadingNow",
  () =>
    getReadingNow().then((res: AxiosListResponse<Article>) => res.data.results)
)

export const mainSlice = createSlice({
  name: "main",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchFlows.fulfilled, (state, action) => {
      state.flows = action.payload
    })

    builder.addCase(fetchReadingNow.fulfilled, (state, action) => {
      state.readingNow = action.payload
    })
  },
  reducers: {
    setSelectedFlow: (state, action: PayloadAction<Theme>) => {
      state.selectedFlow = action.payload
    },

    clearSelectedFlow: (state) => {
      state.selectedFlow = undefined
    },

    setLoggedIn: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true
      state.user = action.payload

      window.localStorage.setItem("user", JSON.stringify(action.payload))
    },

    logOut: (state) => {
      window.localStorage.removeItem("user")
      clearAuthTokens()

      state.isLoggedIn = false
      state.user = null
    }
  }
})

// Action creators are generated for each case reducer function
export const { setSelectedFlow, setLoggedIn, logOut, clearSelectedFlow } =
  mainSlice.actions

export default mainSlice.reducer
