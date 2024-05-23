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