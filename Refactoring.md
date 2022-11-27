# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The major reason for this refactor is because nested if else confused not only to programmers making less of a readablity but also because why it is important to make your code stick to functional paradigm approaches.

My approach is more readable as each line what it is being used for. Intially a candidate value should be either dependant on the event or failsafe case the default value. Additionally, the purpose of getCryptoGeneratedHash function should be to check if the salt is already generated or needs to be generated and return the strigified value. This should be irrespective the purpose for which its being used/called.

Few Keypointers :

```bash
1. Constants should be seperated from functions if their usecases are not completely limited to their functions.
2. We should try to ensure the functions are pure functions. This even helps in memoizing them later.
3. The testcases should cover for every possible values irrespective of their datatypes. 
4. The testcase coverage should be always atleast 85% if mocking is used else should achieve 100% for functions.
```