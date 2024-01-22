# Phantom CMS

Phantom CMS is an cms which provides on page text editing functionality for React components.

It bind data model to the any database via [Unstorage](https://unstorage.unjs.io) provider:

```jsx
import {createStorage} from "unstorage";
import {PhantomCMS} from "phantomcms";

const fc = new PhantomCMS(
    createStorage({
        driver: vercelKVDriver({
                url: "https://<project-name>.kv.vercel-storage.com",
                token: "<token>",
        }),
    }),
    ...
);
```

Or custom client with implemented getItem/setItem methods

```jsx
import { Redis } from "@upstash/redis";
import {PhantomCMS} from "phantomcms";

const fc = new PhantomCMS(
    {
        redis: Redis.fromEnv(),
        async getItem(key) {
            return await this.redis.get(key)
        },
        async setItem(key, value) {
            return await this.redis.set(key, value)
        }
    },
    ...
);
```

Second argument provide your content model (with sample values):

```jsx
import {PhantomCMS} from "phantomcms";

const fc = new PhantomCMS(
    provider,
    {
        'sitename:homepage': {
            header: 'Hello, world!',
            navbar: [
                'link 1',
                'link 2',
                'link 3',
            ],
            cta: {
                header: 'Cta',
                content: 'Hello, world',
            }
        }
    }
);
```

Then in your react page call hook:

```jsx
export default function Home() {
    const [data, editable, setEditable] = fc.useFantomEdit('sitename:homepage', true, false);
    return (
        <>
            <h1>{data.header}</h1>
            <nav>
                {data.navbar.map(i=><a>{i}</a>)}
            </nav>
            <div>
                <h2>{data.cta.header}</h2>
                <p>{data.cta.content}</p>
            </div>
            <button onClick={() => setEditable(!editable)}>
                {editable ? 'Disable edit' : 'Enable edit'}
            </button>
        </>
    )
}
```

"data" is object of your provided content model, "editable" - boolean value to indicate edit is enabled (default: false, can be set as second param), "setEditable" - function to enable or disable edit mode

third param - indicates ability to edit images:

```jsx
import {PhantomCMS,PhantomImage} from "phantomcms";

const fc = new PhantomCMS(
    provider,
    {
        'sitename:homepage': {
            image: '/images/hero.png',
            image2: 'https://images.com/hero.png',
            ...
        }
    }
);

export default function Home() {
    const [data, editable, setEditable] = fc.useFantomEdit('sitename:homepage', false, true);
    return (
        <>
            ...
            <PhantomImage src={data.image} style={{borderRadius:"100%"}} className="h-32" alt="pic"/>
            ...
        </>
    )
}
```

You also can use PhantomImage without image editing enabled.
To handle this, editing of raw url or image path not available.
For example:

```jsx
... 
url: 'https://example.com' // plain text, not editor component
path: '/images/header.png' // plain text | image editing component if enabled
text: 'You can find it here: https://example.com' // editable
```

When enabled editing you can edit any connected text (or image) on page by clicking on it.
Commit to storage runs on edit disable (!).
Recommend to use in development to provide copywriter ability to edit content in it native visual environment.

In production, you can use direct access to content by:

```jsx
export default async function Home() {
    // if use nextjs (highly recommended)
    const data = await fc.getContent('sitename:homepage');

    // in common react
    const data = fc.useContent('sitename:homepage');
    return !data ? <Loading/> : <>...</>;
}
```

I'll think about unify this by checking process.env.production variable in future versions
