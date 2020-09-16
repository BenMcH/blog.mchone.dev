import React, {useState, useEffect} from 'react'
import {document} from 'browser-monads';

export const ShareOnTwitter = () => {
    const [link, setLink] = useState('');

    const doc = document || null;

    useEffect(() => {
        setLink(doc ? doc.location : '');
    }, [doc]);

    return (
        <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
            Like this blog post?
            <a href={`https://twitter.com/intent/tweet?text=Check out this blog post by @mchonedev that I just read! ${link}`}>
                    Share it on twitter!
            </a>
        </div>
    )

}
