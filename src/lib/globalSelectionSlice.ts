'use client';

import { Faq, GlobalSelection, Menu, Page, SiteSetting, VipEvent } from '../types/public';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: GlobalSelection = {
  artists: undefined,
  eventReloadTime: 0,
  generalFAQ: [],
  isLoading: false,
  menu: undefined,
  pages: undefined,
  reloadArtists: true,
  reloadEvents: true,
  reloadGeneralFaqs: true,
  reloadMenu: true,
  reloadSettings: true,
  reloadVIPFAQs: true,
  settings: undefined,
  vipFAQ: [],
};

export const globalSelectionSlice = createSlice({
  initialState,
  name: 'globalStateSelection',
  reducers: {
    setArtists: (state, action: PayloadAction<Page[]>) => {
      state.artists = action.payload;
      return state;
    },
    setEventReloadTime: (state, action: PayloadAction<number>) => {
      state.eventReloadTime = action.payload;
      return state;
    },
    setEvents: (state, action: PayloadAction<VipEvent[]>) => {
      state.events = action.payload;
      return state;
    },
    setGeneralFAQ: (state, action: PayloadAction<Faq[]>) => {
      state.generalFAQ = action.payload;
      return state;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      return state;
    },
    setMenu: (state, action: PayloadAction<Menu>) => {
      state.menu = action.payload;
      return state;
    },
    setPages: (state, action: PayloadAction<Page[]>) => {
      state.pages = action.payload;
      return state;
    },
    setReloadArtists: (state, action: PayloadAction<boolean>) => {
      state.reloadArtists = action.payload;
      return state;
    },
    setReloadEvents: (state, action: PayloadAction<boolean>) => {
      state.reloadEvents = action.payload;
      return state;
    },
    setReloadGeneralFAQs: (state, action: PayloadAction<boolean>) => {
      state.reloadGeneralFaqs = action.payload;
      return state;
    },
    setReloadMenu: (state, action: PayloadAction<boolean>) => {
      state.reloadMenu = action.payload;
      return state;
    },
    setReloadSettings: (state, action: PayloadAction<boolean>) => {
      state.reloadSettings = action.payload;
      return state;
    },
    setReloadVIPFAQs: (state, action: PayloadAction<boolean>) => {
      state.reloadVIPFAQs = action.payload;
      return state;
    },
    setSettings: (state, action: PayloadAction<SiteSetting[]>) => {
      state.settings = action.payload;
      return state;
    },
    setVIPFAQ: (state, action: PayloadAction<Faq[]>) => {
      state.vipFAQ = action.payload;
      return state;
    },
  },
});

export const {
  setArtists,
  setEventReloadTime,
  setEvents,
  setGeneralFAQ,
  setIsLoading,
  setMenu,
  setPages,
  setReloadArtists,
  setReloadEvents,
  setReloadGeneralFAQs,
  setReloadMenu,
  setReloadSettings,
  setReloadVIPFAQs,
  setSettings,
  setVIPFAQ,
} = globalSelectionSlice.actions;

export default globalSelectionSlice.reducer;
