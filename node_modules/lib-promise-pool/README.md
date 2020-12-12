# lib-promise-pool
A nodejs library for executing the job concurrently while controlling the rate of concurrency

## Installation
> npm i lib-promise-pool -S

## Sample Usage
```js
import PromisePool from 'lib-promise-pool'

async function worker(d, i) {
    // console.log(d, i) //=> 1,1    2,2   3,3
    return new Promise(res => setTimeout(() => res(d), d * 1000));
}

const data = [1, 2, 3];

const start = Date.now();
await PromisePool(data, worker, 1);
const end = Date.now();

const diff = end - start

console.log(diff) // 6

// If concurrency is changed to 2
console.log(diff) // 4

// If concurrency is changed to 3
console.log(diff) // 3

```

## Documentation
**PromisePool(array, worker, concurrency=1, options = {stopOnErr: false})**   

| Param                 | Description   |
| :-------------------- | :-----------  |
| `array`               | Array containing input data to worker |
| `worker`              | Async worker function |
| `concurrency`         | Number of concurrent jobs to be executed |
| `options`             | Options for controlling the execution of jobs |
| `options.stopOnErr`   | Whether to stop executing the rest of the promises if a failure is detected. *Defaults to false* |


## Test
> npm run test

## Coverage Report
> npm run coverage

## Contributions
This is open-source, which makes it obvious for any PRs, but I would request you to add necessary test-cases for the same 
