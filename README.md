# A collection of web apps

For Development

## General

- All responsive css code should be in the file with original style
let additional_class = className ? ' ' + className : ''

## Pages

- App flex-page to page container from proper positioning and add margin: auto; to the page css container (TODO: create a page class tag for proper formatting)
- Name Each page's CSS according to it's JS file (it's js file name in lower case i.e Moviepage.js === moviepage.css)

## Components

- password input with eye btn

- When creating componets If important parameter undefined throw error
e.g

```js
function InputCom({title,type,placeholder}){
    // TODO If any important title,type para undefined throw error
    return (
        <>
            <label htmlFor={type}> Email </label>
            <input id="email" placeholder="Enter your email" />
        </>
    )
}

```

## TODO

- in policy page add `users watchedlists will be use to create recommandations for other users`

## CSS

- Overflow-x:hidden on parent make child sticky inactive
- Use fixed pos for modals so it still covers all screen when scrolled passed screen top and is opened unlike pos absolute

```css
        --modal-bg: #000000de;
```
