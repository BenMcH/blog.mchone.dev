import React from 'react'

export const ShareOnTwitter = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
            Like this blog post?
            <a href={`https://twitter.com/intent/tweet?text=Check out this blog post by @mchonedev that I just read! ${document.location}`}>
                    Share it on twitter!
            </a>
        </div>
    )

}
