import { OggPage } from './OggPage'
import { DataWindow } from './DataWindow'

export const parseOggPages = (arrayBuffer: ArrayBuffer): OggPage[] => {
    let dataWindow = new DataWindow(arrayBuffer)
    let page = new OggPage(dataWindow)
    const pages = [page]
    while (!page.isLastPage) {
      dataWindow = dataWindow.slide(page.pageSize)
      page = new OggPage(dataWindow)
      pages.push(page)
    }
    return pages
  }
  
  