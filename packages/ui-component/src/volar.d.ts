
// For this project development
import '@vue/runtime-core';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // GlobalComponents for Volar
    SopBasicInfo: typeof import('./components/SopBasicInfo')['SopBasicInfo']
    SopCard: typeof import('./components/SopCard')['SopCard']
    SopCover: typeof import('./components/SopCover')['SopCover']
    SopDataTable: typeof import('./components/SopDataTable')['SopDataTable']
    SopDataTableItem: typeof import('./components/SopDataTableItem')['SopDataTableItem']
    SopDialog: typeof import('./components/SopDialog')['SopDialog']
    SopDrawer: typeof import('./components/SopDrawer')['SopDrawer']
    SopFilterForm: typeof import('./components/SopFilterForm')['SopFilterForm']
    SopLayoutMain: typeof import('./components/SopLayoutMain')['SopLayoutMain']
    SopPageHeader: typeof import('./components/SopPageHeader')['SopPageHeader']
    SopStatus: typeof import('./components/SopStatus')['SopStatus']
    SopTheHeader: typeof import('./components/SopTheHeader')['SopTheHeader']
    SopTheSidebar: typeof import('./components/SopTheSidebar')['SopTheSidebar']
  }
}

export {};
