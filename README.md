# Tsukuru

minimal mdx static site generator

## Overview

Easy personal website creator with nextjs, shadcn and MDX. Example [site](https://github.com/harshithmullapudi/harshith.sh). This repository has the necessary nextjs app and the cli package to run the app.

## Setup

1. Create a new folder with tsukuru.json and the respective MDX files

```
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "name": "Harshith.sh",
  "description": "This is my personal blog",
  "navigation": [
    {
      "group": "Harshith",
      "pages": [ "about" ]
    },
    {
      "group": "Anime",
      "pages": [ "anime", "anime/naruto" ]
    }
  ],
  "socials": {
    "github": "https://github.com/harshithmullapudi"
  }
}
```

2. Run `npx @born4rhell/tsukuru setup` to setup the repo in local

3. Run `npx @born4rhell/tsukuru dev` to run the website in http://localhost:3000

## TODO

- [ ] fix mobile view
- [ ] dropdown feature on top nav
- [ ] easy vercel deployment
- [ ] theme support
