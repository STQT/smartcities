import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { clearAuthTokens } from "axios-jwt"
import { AxiosResponse } from "axios"

import { Post, Theme, User } from "shared/types"

import { AxiosListResponse } from "services/api/config"
import { BASE } from "services/api"

export interface MainState {
  user: User | null
  isLoggedIn: boolean

  flows: Theme[]

  readingNow: Post[]
}

const initialState: MainState = {
  user: null,
  isLoggedIn: false,
  flows: [],
  readingNow: []
}

export const fetchFlows = createAsyncThunk("flows/fetchFlows", () =>
  BASE.getFlows().then((res: AxiosResponse<Theme[]>) => res.data)
)

export const fetchReadingNow = createAsyncThunk(
  "readingNow/fetchReadingNow",
  () =>
    BASE.getReadingNow().then(
      (res: AxiosListResponse<Post>) => res.data.results
    )
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
export const { setLoggedIn, logOut } = mainSlice.actions

export default mainSlice.reducer
