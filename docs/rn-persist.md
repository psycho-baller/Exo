# 2024-03-25

- I am trying to persist the data using Tanstack. I noticed that there are a lot of duplications in the queryClientProvider. I want to move that code to the [package/app](../package/app) directory but for now I will just try to make persist work.

## If I want to move the shit:

run this to add it to the app package and remove it everywhere else

```bash
pnpm add @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
```
