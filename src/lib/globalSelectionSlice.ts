'use client';

import {
  Faq,
  FeaturedArtist,
  GlobalSelection,
  Menu,
  Page,
  RefundPolicy,
  SiteSetting,
  Tour,
  VipEvent,
} from '../types/public';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: GlobalSelection = {
  artists: undefined,
  eventReloadTime: 0,
  featuredArtists: undefined,
  generalFAQ: [],
  generalRefundPolicy: undefined,
  isLoading: false,
  menu: undefined,
  pages: undefined,
  reloadArtists: true,
  reloadEvents: true,
  reloadFeaturedArtists: true,
  reloadGeneralFaqs: true,
  reloadGeneralRefundPolicies: true,
  reloadMenu: true,
  reloadSettings: true,
  reloadTours: true,
  reloadVIPFAQs: true,
  reloadVIPRefundPolicies: true,
  settings: undefined,
  vipFAQ: [],
  vipRefundPolicy: undefined,
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
    setFeaturedArtists: (state, action: PayloadAction<FeaturedArtist[]>) => {
      state.featuredArtists = action.payload;
      return state;
    },
    setGeneralFAQ: (state, action: PayloadAction<Faq[]>) => {
      state.generalFAQ = action.payload;
      return state;
    },
    setGeneralRefundPolicy: (state, action: PayloadAction<RefundPolicy>) => {
      state.generalRefundPolicy = action.payload;
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
    setReloadFeaturedArtists: (state, action: PayloadAction<boolean>) => {
      state.reloadFeaturedArtists = action.payload;
      return state;
    },
    setReloadGeneralFAQs: (state, action: PayloadAction<boolean>) => {
      state.reloadGeneralFaqs = action.payload;
      return state;
    },
    setReloadGeneralRefundPolicies: (state, action: PayloadAction<boolean>) => {
      state.reloadGeneralRefundPolicies = action.payload;
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
    setReloadTours: (state, action: PayloadAction<boolean>) => {
      state.reloadTours = action.payload;
      return state;
    },
    setReloadVIPFAQs: (state, action: PayloadAction<boolean>) => {
      state.reloadVIPFAQs = action.payload;
      return state;
    },
    setReloadVIPRefundPolicies: (state, action: PayloadAction<boolean>) => {
      state.reloadVIPRefundPolicies = action.payload;
      return state;
    },
    setSettings: (state, action: PayloadAction<SiteSetting[]>) => {
      state.settings = action.payload;
      return state;
    },
    setTours: (state, action: PayloadAction<Tour[]>) => {
      state.tours = action.payload;
      return state;
    },
    setVIPFAQ: (state, action: PayloadAction<Faq[]>) => {
      state.vipFAQ = action.payload;
      return state;
    },
    setVIPRefundPolicy: (state, action: PayloadAction<RefundPolicy>) => {
      state.vipRefundPolicy = action.payload;
      return state;
    },
  },
});

export const {
  setArtists,
  setEventReloadTime,
  setEvents,
  setFeaturedArtists,
  setGeneralFAQ,
  setGeneralRefundPolicy,
  setIsLoading,
  setMenu,
  setPages,
  setReloadArtists,
  setReloadEvents,
  setReloadFeaturedArtists,
  setReloadGeneralFAQs,
  setReloadGeneralRefundPolicies,
  setReloadMenu,
  setReloadSettings,
  setReloadTours,
  setReloadVIPFAQs,
  setReloadVIPRefundPolicies,
  setSettings,
  setTours,
  setVIPFAQ,
  setVIPRefundPolicy,
} = globalSelectionSlice.actions;

export default globalSelectionSlice.reducer;
