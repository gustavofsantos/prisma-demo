function range(start, finish) {
  const arr = new Array(finish - start);
  for (let i = start; i < finish; i++) {
    arr.push(i);
  }

  return arr;
}

describe("Scratchpad", () => {
  it("should run", () => {
    function fizzBuzz(num: number) {
      if (num % 3 === 0 && num % 5 === 0) return "FizzBuzz";
      if (num % 3 === 0) return "Fizz";
      if (num % 5 === 0) return "Buzz";
      return String(num);
    }

    const array = range(1, 100).map(fizzBuzz);
    console.log(array);
  });

  it.only("reduce works!", () => {
    const add = (x, y) => x + y;
    const sum = range(1, 6).reduce(add);

    console.log("the sum is", sum);
  });
});
