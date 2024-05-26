The AI auditor service will aim to audit smart contracts and return a security score based on how secure the contract is

Get code snippets
- We will need code examples for both vulnerable and clean code
- We will scrape this data from vulnerability reports we have for solidity

Train a model to recognize the vulnerabilities
- Model will be given a prompt with the form
```
prompt: code snippet
completion: vulnerability description
```

https://huggingface.co/google/codegemma-7b
https://huggingface.co/meta-llama/Llama-2-7b-chat-hf


The most straightforward way forward may be to fine-tune a standard LLM model

Another way will be to make use of a RAG. Now that we have code examples and descriptions of all the code snippet vulnerabilities, we can create vector embeddings for our code snippets and when we quiery a new piece of code. When we then submit a smart cotract for analysis, it will first break the contract up into functions, search the vector embeddings for a similar vector, then we will add the similar vectors into the context of our query to the LLM. The LLM will then consider the context and hopefully give us a report of where our code is faulty.

When a code reviewer then updates comments or makes sure that the code is vulnerbale as we say it is, this will be a "code snippet" That we can add back into our vector DB, which means it will be considered in future iterations of code.

The main questions that we need to solve are:
- How can we ensure that vector embeddings are good and will correctly match faulty and non faulty code rather than just hallucinate
- How will we tell our LLM to consider the context as "similar faulty code you can use to write a response"

Models that can be used for code similarity embedding:
- code-search-babbage-{doc, query}-001
- 