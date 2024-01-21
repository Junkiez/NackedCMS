# Phantom CMS

Phantom CMS is an cms which provides on page text editing functionality for React components.

It bind data model to the database via provider like vercel/kv:

```jsx
import {createClient} from "@vercel/kv";
import {PhantomCMS} from "phantomcms";

const fc = new PhantomCMS(
    createClient({
        url: "https://<project-name>.kv.vercel-storage.com",
        token: "<token>",
    }),
    ...
);
```

Or any custom client with implemented get/set methods

```jsx
import {PhantomCMS} from "phantomcms";

const fc = new PhantomCMS(
    {
        get(key) {
            return JSON.parse(
                localStorage.getItem(key)
            );
        },
        set(key, value) {
            localStorage.setItem(
                key, 
                JSON.stringify(value)
            );
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
    const [data, editable, setEditable] = fc.useFantomEdit('sitename:homepage');
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

"data" is object of your provided content model, editable - boolean value to indicate edit is enabled (defaul: false), setEditable - function to enable or disable edit mode

When enable you can edit any connected text on page by clicking on it. Recommend to use in development envirement to provide copywriter ability to edit content in it visual environment but in production you should use only db where it was stored
