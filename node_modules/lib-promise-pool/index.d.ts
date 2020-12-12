export default async function PromisePool(
  arr: any[], // array of items to be iterated
  worker: (item: any,
  index: number) => Promise<any>,
  concurrency = 1,
  options: {
    stopOnErr?: boolean
  }): Promise<any[]>