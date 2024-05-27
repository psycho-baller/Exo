# 2024-03-25

- I am trying to persist the data using Tanstack. I noticed that there are a lot of duplications in the queryClientProvider. I want to move that code to the [package/app](../package/app) directory but for now I will just try to make persist work.

## If I want to move the shit:

run this to add it to the app package and remove it everywhere else

```bash
pnpm add @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
```

# 2024-05-26

- Facing a lot of issues with persist because the cache for the reminderdate was in a different format from the one in the db rn, and it refuses to use the DB one. So yeah turns out there is no problem w my code. Just the cache :)